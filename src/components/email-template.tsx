import * as React from "react";

interface EmailTemplateProps {
  name: string;
  email: string;
  message: string;
}

export const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
  name,
  email,
  message,
}) => (
  <div className="w-96 rounded-lg border border-gray-300 p-6 font-sans text-gray-800">
    <h2 className="mb-4 text-xl font-bold">Email Template</h2>
    <p className="mb-2">
      <span className="font-semibold">Name:</span> {name}
    </p>
    <p className="mb-2">
      <span className="font-semibold">Email:</span> {email}
    </p>
    <p className="mb-2">
      <span className="font-semibold">Message:</span> {message}
    </p>
  </div>
);
