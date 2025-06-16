import React from "react";
import {Card, CardContent} from "@/components/ui/card";
import Footer from "@/components/footer";

const PrivacyPolicyPage: React.FC = () => {
  return (
    <div>
      <div className="container mx-auto max-w-6xl px-4 py-8">
        <h1 className="text-4xl text-left font-bold mb-6">
          {import.meta.env.VITE_APP_NAME} LMS Privacy Policy
        </h1>
        <p className="text-base leading-relaxed mb-8 text-justify">
          At {import.meta.env.VITE_APP_NAME} LMS, we are committed to
          protecting your privacy and ensuring the responsible handling of your
          personal information. This Privacy Policy outlines how we collect,
          use, and manage your Personal Data when you engage with our learning
          platform.
        </p>

        {/* Section 1: Data Controller */}
        <Card className="mb-6 border-0 shadow-none">
          <CardContent className="px-0">
            <h2 className="text-2xl font-semibold mb-3">1. Data Controller</h2>
            <p className="mb-3 text-justify">
              Unless otherwise specified (e.g., where you are enrolled in a
              degree or certification program administered by a partnering
              institution), {import.meta.env.VITE_APP_NAME} LMS is the data
              controller of the Personal Data collected through our platform.
              This means {import.meta.env.VITE_APP_NAME} LMS determines the
              purposes and means of processing your data.
            </p>
            <p className="text-justify">
              In certain cases - such as when you enroll in a program managed
              directly by an academic or professional institution,{" "}
              {import.meta.env.VITE_APP_NAME} LMS may act as a data
              processor, processing your information on behalf of that
              institution in accordance with their instructions.
            </p>
          </CardContent>
        </Card>

        {/* Section 2: What Personal Data We Collect */}
        <Card className="mb-6 border-0 shadow-none">
          <CardContent className="px-0">
            <h2 className="text-2xl font-semibold mb-3">
              2. What Personal Data We Collect
            </h2>
            <p className="mb-4 text-justify">
              We collect and process various types of Personal Data to deliver
              and improve our services. This may include:
            </p>
            <ul className="list-disc list-inside text-justify">
              <li>
                Account registration details, such as your full name, email
                address, and password.
              </li>
              <li>
                Course enrollment and participation data, including progress,
                quiz performance, certification, and completion history.
              </li>
              <li>
                Communication data, such as your responses to surveys or emails.
              </li>
              <li>
                Identity verification information, where applicable (e.g.,
                government-issued ID or photo verification).
              </li>
              <li>
                Usage data, including your interactions with the platform, IP
                address, device information, and browsing behavior.
              </li>
            </ul>
          </CardContent>
        </Card>

        {/* Section 3: How We Use Personal Data */}
        <Card className="mb-6 border-0 shadow-none">
          <CardContent className="px-0">
            <h2 className="text-2xl font-semibold mb-3">
              3. How We Use Personal Data
            </h2>
            <p className="mb-4 text-justify">
              We use your Personal Data for the following purposes:
            </p>
            <ul className="list-disc list-inside text-justify">
              <li>
                To provide and manage access to our platform and learning
                content.
              </li>
              <li>
                To ensure platform security, monitor performance, and
                troubleshoot technical issues.
              </li>
              <li>
                To conduct research and analysis aimed at improving course
                content, learner experience, and platform functionality.
              </li>
              <li>
                To communicate with you, including responding to inquiries,
                providing updates, and delivering service-related notifications.
              </li>
              <li>
                To support our partners, such as content providers, with
                insights about engagement (in aggregated or anonymized form).
              </li>
              <li>
                To deliver relevant marketing, subject to your consent where
                required.
              </li>
              <li>
                To comply with legal obligations and enforce our Terms of
                Service.
              </li>
            </ul>
          </CardContent>
        </Card>

        {/* Section 4: Sharing of Personal Data */}
        <Card className="mb-6 border-0 shadow-none">
          <CardContent className="px-0">
            <h2 className="text-2xl font-semibold mb-3">
              4. Sharing of Personal Data
            </h2>
            <p className="mb-4 text-justify">
              We may share your Personal Data with:
            </p>
            <ul className="list-disc list-inside text-justify">
              <li>
                Our content creators, instructors, and academic partners, where
                necessary to provide course-related services or certification.
              </li>
              <li>
                Service providers and third-party tools that support platform
                functionality, analyt{import.meta.env.VITE_APP_NAME}, payment
                processing, customer support, and communication.
              </li>
              <li>
                Regulatory authorities, when required by law or in response to
                legal proceedings.
              </li>
            </ul>
            <p className="text-justify">
              We ensure all third parties adhere to appropriate confidentiality
              and data protection standards.
            </p>
          </CardContent>
        </Card>

        {/* Section 5: Your Rights */}
        <Card className="mb-6 border-0 shadow-none">
          <CardContent className="px-0">
            <h2 className="text-2xl font-semibold mb-3">5. Your Rights</h2>
            <p className="mb-4 text-justify">
              You have rights in relation to your Personal Data, which may
              include:
            </p>
            <ul className="list-disc list-inside text-justify mb-4">
              <li>Access: Request a copy of the data we hold about you.</li>
              <li>
                Correction: Ask us to rectify inaccurate or incomplete data.
              </li>
              <li>
                Deletion: Request the deletion of your data under certain
                conditions.
              </li>
              <li>
                Objection: Object to our processing of your data in certain
                circumstances (e.g., direct marketing).
              </li>
              <li>
                Portability: Request your data in a structured, machine-readable
                format.
              </li>
              <li>
                Restriction: Ask us to temporarily suspend processing while a
                request is being investigated.
              </li>
            </ul>
            <p className="text-justify">
              To exercise any of these rights, please contact us at{" "}
              <a
                href="mailto:learning@icsoutsouricng.com"
                className="text-blue-600 underline"
              >
                learning@icsoutsouricng.com
              </a>
            </p>
          </CardContent>
        </Card>

        {/* Section 6: Updates to This Policy */}
        <Card className="mb-6 border-0 shadow-none">
          <CardContent className="px-0">
            <h2 className="text-2xl font-semibold mb-3">
              6. Updates to This Policy
            </h2>
            <p className="text-justify">
              We may update this Privacy Policy periodically to reflect changes
              in our services or applicable laws. We encourage you to review
              this page regularly. Any material changes will be communicated
              directly through our platform or via email.
            </p>
          </CardContent>
        </Card>
      </div>
      <Footer />
    </div>
  );
};

export default PrivacyPolicyPage;
