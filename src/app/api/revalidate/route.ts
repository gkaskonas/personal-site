import { CreateInvalidationCommand, CloudFrontClient } from "@aws-sdk/client-cloudfront";
import { revalidatePath } from 'next/cache'

export async function POST(req: Request) {

    const distributionId = process.env.CLOUDFRONT_DISTRIBUTION_ID;
    if (!distributionId) {
        return Response.json(
            { ok: false, error: "Server misconfigured: CLOUDFRONT_DISTRIBUTION_ID is not set" },
            { status: 500 },
        );
    }

    // Uses the default AWS credential/provider chain (ideal for SST/Lambda IAM roles).
    // If you run locally, set AWS_ACCESS_KEY_ID / AWS_SECRET_ACCESS_KEY / AWS_REGION.
    const client = new CloudFrontClient({
        region: process.env.AWS_REGION ?? "us-east-1",
    });

    const cmd = new CreateInvalidationCommand({
        DistributionId: distributionId,
        InvalidationBatch: {
            CallerReference: `${Date.now()}`,
            Paths: {
                Quantity: 1,
                Items: ["/blog/*"],
            },
        },
    });

    try {
        const res = await client.send(cmd);
        revalidatePath("/blog");

        return Response.json({
            ok: true,
            invalidationId: res.Invalidation?.Id ?? null,
            status: res.Invalidation?.Status ?? null,
            paths: ["/blog/*"],
        });
    } catch (err) {
        const message = err instanceof Error ? err.message : "CloudFront invalidation failed";
        return Response.json({ ok: false, error: message }, { status: 500 });
    }
}

export async function GET() {
    return Response.json({ ok: false, error: "Method Not Allowed" }, { status: 405 });
}


