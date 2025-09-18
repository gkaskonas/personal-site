// Google Analytics utility functions
declare global {
    interface Window {
        gtag: (
            command: 'config' | 'event' | 'js' | 'set',
            targetId: string | Date,
            config?: Record<string, any>
        ) => void;
    }
}

export const GA_TRACKING_ID = 'G-T89P9DYYS3';

// Track page views
export const pageview = (url: string) => {
    if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('config', GA_TRACKING_ID, {
            page_location: url,
        });
    }
};

// Track custom events
export const event = ({
    action,
    category,
    label,
    value,
}: {
    action: string;
    category: string;
    label?: string;
    value?: number;
}) => {
    if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('event', action, {
            event_category: category,
            event_label: label,
            value: value,
        });
    }
};

// Track contact form submissions
export const trackContactForm = () => {
    event({
        action: 'submit',
        category: 'Contact',
        label: 'Contact Form Submission',
    });
};

// Track button clicks
export const trackButtonClick = (buttonName: string) => {
    event({
        action: 'click',
        category: 'Button',
        label: buttonName,
    });
};

// Track external link clicks
export const trackExternalLink = (url: string) => {
    event({
        action: 'click',
        category: 'External Link',
        label: url,
    });
};
