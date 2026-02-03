---
title: "Building a Self-Healing Kubernetes Cluster with Custom Operators"
excerpt: "Learn to build Kubernetes operators that automatically detect and fix common cluster issues, reducing manual intervention and improving uptime."
date: 2026-02-03
author: "Peter Kaskonas"
coverImage: "../../assets/img/self-healing-kubernetes-custom-operators.jpg"
tags: ["kubernetes", "devops", "automation", "operators", "golang"]
draft: false
---

# Building a Self-Healing Kubernetes Cluster with Custom Operators

Our Kubernetes cluster used to wake me up at 3 AM about twice a week. Pod crashed. Database connection pool exhausted. Memory leak in the API service. Every time, the fix was the same: restart the pod, clear some cache, adjust a resource limit.

After the fifth time fixing the exact same issue by hand, I built a custom Kubernetes operator to do it for me. That was eight months ago. I haven't been paged for that issue since.

Self-healing infrastructure isn't about AI or machine learning. It's about codifying the boring, repetitive fixes you do manually and letting the cluster handle them automatically. Custom operators are how you do this in Kubernetes.

## Why Built-in Kubernetes Self-Healing Isn't Enough

Kubernetes already has self-healing features:
- ReplicaSets restart crashed pods
- Liveness probes detect unhealthy containers
- Resource limits prevent runaway processes

These handle the simple cases. But production systems fail in complex ways that basic probes can't detect:

**Connection pool exhaustion.** Your app is running, health check returns 200, but it can't handle new requests because all database connections are stuck. Kubernetes thinks everything is fine.

**Memory leaks.** Your pod slowly consumes more memory over days. It hasn't hit the limit yet, so Kubernetes doesn't restart it. But it's getting slower and will eventually OOM.

**Cascading failures.** One service fails, causing increased load on another, which fails, causing a cascade. By the time Kubernetes notices, half your cluster is down.

**Configuration drift.** Someone manually scaled a deployment during an incident. The HPA is fighting with the manual replica count. Resources are wasted but nothing is "broken."

**External dependency failures.** Your database is slow. Your app keeps timing out and restarting. Kubernetes keeps trying, making the problem worse instead of backing off.

These problems need custom logic. That's what operators provide.

## What a Kubernetes Operator Actually Is

An operator is just a control loop that watches Kubernetes resources and takes actions based on what it sees.

The pattern is simple:
1. Watch for events (pod crashed, metric threshold exceeded, resource created)
2. Evaluate if action is needed (is this the third crash in 5 minutes?)
3. Take action (restart pod, scale up, send alert)
4. Repeat

Kubernetes itself is built this way. The ReplicaSet controller watches pods and maintains the desired replica count. The HPA controller watches metrics and adjusts replicas. Your custom operator does the same thing for your specific failure modes.

## Real Example: The Database Connection Pool Operator

Let me show you a real operator I built that solved an actual production problem.

**The problem:** Our API service would occasionally exhaust its database connection pool. Health checks passed (the pod was running), but it couldn't serve requests. Manual fix: restart the pod.

**The operator:** Watch for this specific failure pattern and restart automatically.

Here's the core logic using the Kubernetes Go client:

```go
package main

import (
    "context"
    "fmt"
    "time"
    
    corev1 "k8s.io/api/core/v1"
    metav1 "k8s.io/apimachinery/pkg/apis/meta/v1"
    "k8s.io/client-go/kubernetes"
    "k8s.io/client-go/rest"
)

type ConnectionPoolOperator struct {
    clientset *kubernetes.Clientset
    namespace string
}

func (o *ConnectionPoolOperator) Run(ctx context.Context) {
    ticker := time.NewTicker(30 * time.Second)
    defer ticker.Stop()
    
    for {
        select {
        case <-ctx.Done():
            return
        case <-ticker.C:
            o.checkAndHeal()
        }
    }
}

func (o *ConnectionPoolOperator) checkAndHeal() {
    // Get all pods with our app label
    pods, err := o.clientset.CoreV1().Pods(o.namespace).List(
        context.TODO(),
        metav1.ListOptions{
            LabelSelector: "app=api-service",
        },
    )
    if err != nil {
        fmt.Printf("Error listing pods: %v\n", err)
        return
    }
    
    for _, pod := range pods.Items {
        // Check if pod has connection pool exhaustion symptoms
        if o.hasConnectionPoolIssue(pod) {
            fmt.Printf("Detected connection pool issue in pod %s, restarting\n", pod.Name)
            
            // Delete the pod (ReplicaSet will recreate it)
            err := o.clientset.CoreV1().Pods(o.namespace).Delete(
                context.TODO(),
                pod.Name,
                metav1.DeleteOptions{},
            )
            if err != nil {
                fmt.Printf("Error deleting pod: %v\n", err)
            }
            
            // Record event for visibility
            o.recordEvent(pod, "ConnectionPoolExhausted", "Automatically restarted pod due to connection pool exhaustion")
        }
    }
}

func (o *ConnectionPoolOperator) hasConnectionPoolIssue(pod corev1.Pod) bool {
    // Check multiple signals:
    // 1. Pod is running (not already crashed)
    if pod.Status.Phase != corev1.PodRunning {
        return false
    }
    
    // 2. Recent restart count is low (not in crash loop)
    for _, status := range pod.Status.ContainerStatuses {
        if status.RestartCount > 3 {
            return false // Already being restarted, don't interfere
        }
    }
    
    // 3. Check custom metrics (this is where you'd integrate with Prometheus)
    // For example: active_connections / max_connections > 0.95
    metrics := o.getMetricsForPod(pod)
    if metrics.ConnectionPoolUtilization > 0.95 {
        return true
    }
    
    return false
}

func (o *ConnectionPoolOperator) getMetricsForPod(pod corev1.Pod) PodMetrics {
    // Query Prometheus for pod metrics
    // This is simplified - real implementation would use Prometheus client
    return PodMetrics{
        ConnectionPoolUtilization: 0.97, // Example value
    }
}

func (o *ConnectionPoolOperator) recordEvent(pod corev1.Pod, reason, message string) {
    event := &corev1.Event{
        ObjectMeta: metav1.ObjectMeta{
            Name:      fmt.Sprintf("%s.%d", pod.Name, time.Now().Unix()),
            Namespace: o.namespace,
        },
        InvolvedObject: corev1.ObjectReference{
            Kind:      "Pod",
            Name:      pod.Name,
            Namespace: pod.Namespace,
            UID:       pod.UID,
        },
        Reason:  reason,
        Message: message,
        Type:    "Normal",
        FirstTimestamp: metav1.Time{Time: time.Now()},
        LastTimestamp:  metav1.Time{Time: time.Now()},
    }
    
    o.clientset.CoreV1().Events(o.namespace).Create(
        context.TODO(),
        event,
        metav1.CreateOptions{},
    )
}

type PodMetrics struct {
    ConnectionPoolUtilization float64
}

func main() {
    // Create in-cluster config
    config, err := rest.InClusterConfig()
    if err != nil {
        panic(err)
    }
    
    clientset, err := kubernetes.NewForConfig(config)
    if err != nil {
        panic(err)
    }
    
    operator := &ConnectionPoolOperator{
        clientset: clientset,
        namespace: "production",
    }
    
    fmt.Println("Starting connection pool operator...")
    operator.Run(context.Background())
}
```

This operator runs in the cluster, checks pods every 30 seconds, and automatically restarts any pod showing connection pool exhaustion symptoms.

**Key decisions in this design:**

1. **Check multiple signals:** Don't restart based on one metric. We check that the pod is running, not already in a crash loop, and has high connection pool utilization.

2. **Record events:** Every automated action creates a Kubernetes event. You can see what the operator did with `kubectl get events`.

3. **Simple is better:** This runs every 30 seconds. That's fine. You don't need real-time event streaming for most self-healing scenarios.

## The Memory Leak Detector Operator

Here's another real operator that detects memory leaks before they cause OOM kills:

```go
func (o *MemoryLeakOperator) detectMemoryLeak(pod corev1.Pod) bool {
    // Get memory usage history for this pod
    history := o.getMemoryHistory(pod)
    
    // Need at least 12 data points (6 hours at 30-second intervals)
    if len(history) < 12 {
        return false
    }
    
    // Calculate trend: is memory consistently increasing?
    var increases int
    for i := 1; i < len(history); i++ {
        if history[i] > history[i-1] {
            increases++
        }
    }
    
    // If memory increased in 80% of samples, likely a leak
    if float64(increases)/float64(len(history)) > 0.8 {
        // Check if we're approaching the limit
        currentMemory := history[len(history)-1]
        memoryLimit := o.getMemoryLimit(pod)
        
        if currentMemory > memoryLimit*0.85 {
            return true
        }
    }
    
    return false
}
```

This detects slow memory leaks by tracking memory usage over time. If memory consistently increases and approaches the limit, restart the pod before it OOMs.

**Why this matters:** OOM kills are violent. They can corrupt data, leave connections hanging, and cause cascading failures. Gracefully restarting before the OOM is much safer.

## Using Kubebuilder for Complex Operators

For simple operators, writing raw Go is fine. But for complex logic, use [Kubebuilder](https://kubebuilder.io/).

Kubebuilder generates the boilerplate for watching resources, handling events, and managing state. You just write the reconciliation logic.

Here's a Kubebuilder operator that implements circuit breaking for external dependencies:

```go
// api/v1/circuitbreaker_types.go
type CircuitBreaker struct {
    metav1.TypeMeta   `json:",inline"`
    metav1.ObjectMeta `json:"metadata,omitempty"`
    
    Spec   CircuitBreakerSpec   `json:"spec,omitempty"`
    Status CircuitBreakerStatus `json:"status,omitempty"`
}

type CircuitBreakerSpec struct {
    // Target deployment to protect
    TargetDeployment string `json:"targetDeployment"`
    
    // Failure threshold (errors per minute)
    FailureThreshold int `json:"failureThreshold"`
    
    // How long to keep circuit open
    OpenDuration metav1.Duration `json:"openDuration"`
    
    // Action to take when circuit opens
    Action string `json:"action"` // "scale-to-zero" or "route-to-fallback"
}

type CircuitBreakerStatus struct {
    State        string      `json:"state"` // "closed", "open", "half-open"
    ErrorRate    int         `json:"errorRate"`
    LastTripped  metav1.Time `json:"lastTripped,omitempty"`
}

// controllers/circuitbreaker_controller.go
func (r *CircuitBreakerReconciler) Reconcile(ctx context.Context, req ctrl.Request) (ctrl.Result, error) {
    var cb v1.CircuitBreaker
    if err := r.Get(ctx, req.NamespacedName, &cb); err != nil {
        return ctrl.Result{}, client.IgnoreNotFound(err)
    }
    
    // Get current error rate from metrics
    errorRate := r.getErrorRate(cb.Spec.TargetDeployment)
    
    // Update status
    cb.Status.ErrorRate = errorRate
    
    // State machine logic
    switch cb.Status.State {
    case "closed":
        if errorRate > cb.Spec.FailureThreshold {
            // Trip the circuit
            cb.Status.State = "open"
            cb.Status.LastTripped = metav1.Now()
            
            // Take action
            if cb.Spec.Action == "scale-to-zero" {
                r.scaleDeployment(cb.Spec.TargetDeployment, 0)
            }
            
            r.recordEvent(cb, "CircuitTripped", "Error threshold exceeded")
        }
        
    case "open":
        // Check if it's time to try half-open
        openDuration := time.Since(cb.Status.LastTripped.Time)
        if openDuration > cb.Spec.OpenDuration.Duration {
            cb.Status.State = "half-open"
            
            if cb.Spec.Action == "scale-to-zero" {
                r.scaleDeployment(cb.Spec.TargetDeployment, 1)
            }
        }
        
    case "half-open":
        if errorRate < cb.Spec.FailureThreshold/2 {
            // Success, close the circuit
            cb.Status.State = "closed"
            r.scaleDeployment(cb.Spec.TargetDeployment, -1) // Restore original scale
            r.recordEvent(cb, "CircuitClosed", "Service recovered")
        } else if errorRate > cb.Spec.FailureThreshold {
            // Still failing, back to open
            cb.Status.State = "open"
            cb.Status.LastTripped = metav1.Now()
            r.scaleDeployment(cb.Spec.TargetDeployment, 0)
        }
    }
    
    // Update the status
    if err := r.Status().Update(ctx, &cb); err != nil {
        return ctrl.Result{}, err
    }
    
    // Requeue after 30 seconds
    return ctrl.Result{RequeueAfter: 30 * time.Second}, nil
}
```

Deploy this with a custom resource:

```yaml
apiVersion: healing.example.com/v1
kind: CircuitBreaker
metadata:
  name: api-circuit-breaker
spec:
  targetDeployment: api-service
  failureThreshold: 50  # errors per minute
  openDuration: 5m
  action: scale-to-zero
```

Now when your API service starts failing (maybe the database is down), the circuit breaker automatically scales it to zero, preventing it from making the problem worse. After 5 minutes, it tries one replica to see if the issue is resolved.

## The Limitations Nobody Talks About

Custom operators are powerful, but they're not magic. Here's what can go wrong:

**Operators can make things worse.** I've seen operators get into fight loops where they keep restarting pods faster than they can recover. Always include backoff logic and circuit breakers in your operators themselves.

**They're another thing to maintain.** You're writing code that runs in production and has the power to delete pods. It needs tests, monitoring, and on-call support just like your applications.

**They can hide problems.** If your operator automatically restarts pods with memory leaks, you might never fix the actual leak. Self-healing shouldn't replace root cause analysis.

**They need good observability.** You must be able to see what your operators are doing. Log every action. Create metrics. Record Kubernetes events.

## What You Should Actually Build

Don't build operators for everything. Start with the problems that wake you up repeatedly:

**Start here:**
- Restart pods with specific error patterns
- Clear caches when they get too large
- Rotate credentials before they expire
- Scale down unused resources

**Don't start here:**
- Complex ML-based anomaly detection
- Predicting failures before they happen
- Fully autonomous incident response
- Anything that requires perfect accuracy

Simple operators that handle well-understood failure modes are incredibly valuable. Complex operators that try to be too smart cause more problems than they solve.

## My Actual Production Operators

Here's what I run:

1. **Connection pool operator:** Restarts pods with exhausted connection pools (shown above)
2. **Certificate rotation operator:** Rotates TLS certificates 7 days before expiry
3. **Stale cache operator:** Clears Redis caches when they exceed size thresholds
4. **Zombie pod operator:** Deletes pods stuck in Terminating state for > 5 minutes
5. **Cost optimization operator:** Scales down dev/staging deployments outside business hours

These five operators have eliminated about 70% of our routine manual interventions. They're simple, focused, and they just work.

## The Bottom Line

Self-healing Kubernetes isn't about building Skynet. It's about codifying the boring fixes you do manually and letting the cluster handle them.

Start small. Pick one problem that wakes you up repeatedly. Write an operator that fixes it automatically. Test it thoroughly. Deploy it. Monitor it.

Then pick the next problem.

After a year of this, you'll have a cluster that fixes most issues before you even notice them. You'll sleep better. Your team will be more productive. And you'll wonder why you spent so long fixing the same problems by hand.

The goal isn't zero human intervention. The goal is human intervention only for the interesting problems, not the ones you've solved twenty times before.