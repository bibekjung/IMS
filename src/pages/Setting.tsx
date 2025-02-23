"use client";

export default function SettingPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 space-y-6 p-6">
      <h1 className="text-3xl font-bold mb-6">User Policy</h1>
      <div className="max-w-3xl space-y-6 text-gray-700">
        <section>
          <h2 className="text-2xl font-semibold">Introduction</h2>
          <p>
            Welcome to our User Policy page. By using our platform, you agree to
            the terms outlined in this document. Please read the following
            policies carefully.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold">Privacy Policy</h2>
          <p>
            We value your privacy and ensure that your personal data is
            protected. We do not share your information with third parties
            unless required by law. For more details, read our full privacy
            policy.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold">Terms of Use</h2>
          <p>
            Our platform is intended for users who follow the community
            guidelines. By using the platform, you agree not to engage in any
            activity that violates these terms.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold">User Responsibilities</h2>
          <ul className="list-disc pl-6">
            <li>Provide accurate information when creating an account.</li>
            <li>Keep your account details confidential.</li>
            <li>Respect other users and follow our guidelines.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold">Contact Us</h2>
          <p>
            If you have any questions regarding the policies or need further
            clarification, please contact our support team at
            support@example.com.
          </p>
        </section>
      </div>
    </div>
  );
}
