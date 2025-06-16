import Footer from "@/components/footer";
import {Card, CardContent} from "@/components/ui/card";

const TermsAndConditionsPage: React.FC = () => {
  return (
    <div>
      <div className="container mx-auto max-w-6xl px-4 py-8">
        {/* Title and Dates */}
        <h1 className="text-4xl font-bold mb-4">
          {import.meta.env.VITE_APP_NAME} Sourcing Academy – Terms and
          Conditions
        </h1>
        <p className="text-base leading-relaxed mb-8 text-justify">
          Effective Date: 09-06-2025 <br />
          Last Updated: 09-06-2025
        </p>

        {/* Introduction */}
        <Card className="mb-6 border-0 shadow-none">
          <CardContent className="px-0">
            <p className="text-justify">
              Welcome to {import.meta.env.VITE_APP_NAME} Sourcing Academy, the
              official Learning Management System (LMS) developed and managed by
              the Learning and Development Strategic Business Unit (SBU) of ICS
              Outsourcing Limited. {import.meta.env.VITE_APP_NAME}
              Sourcing Academy is designed to deliver structured, high-quality
              training programs for individuals seeking to develop personal and
              professional competencies across various domains.
            </p>
            <p className="mt-4 text-justify">
              By accessing or using {import.meta.env.VITE_APP_NAME} Sourcing
              Academy, you agree to abide by the following Terms and Conditions.
              Please read them carefully before using the platform. If you do
              not agree to these terms, you should not use the platform.
            </p>
          </CardContent>
        </Card>

        {/* 1. Definitions */}
        <Card className="mb-6 border-0 shadow-none">
          <CardContent className="px-0">
            <h2 className="text-2xl font-semibold mb-3">1. Definitions</h2>
            <p className="mb-3 text-justify">
              <strong>
                “{import.meta.env.VITE_APP_NAME} Sourcing Academy” or “The
                Platform”:
              </strong>{" "}
              The LMS created and managed by the Learning and Development SBU of{" "}
              {import.meta.env.VITE_APP_NAME}
              Outsourcing Limited.
            </p>
            <p className="mb-3 text-justify">
              <strong>
                {import.meta.env.VITE_APP_NAME} Outsourcing Limited:
              </strong>{" "}
              The parent organization and owner of{" "}
              {import.meta.env.VITE_APP_NAME} Sourcing Academy.
            </p>
            <p className="mb-3 text-justify">
              <strong>“User”, “You”, or “Learner”:</strong> Any individual
              accessing or using the platform, whether an internal employee,
              external client, or enrolled participant.
            </p>
            <p className="mb-3 text-justify">
              <strong>Content:</strong> All educational materials, including but
              not limited to training videos, reading resources, assessments,
              assignments, downloadable materials, and certificates.
            </p>
            <p className="text-justify">
              <strong>SBU:</strong> Strategic Business Unit responsible for the
              platform's administration and content delivery.
            </p>
          </CardContent>
        </Card>

        {/* 2. Purpose of the Platform */}
        <Card className="mb-6 border-0 shadow-none">
          <CardContent className="px-0">
            <h2 className="text-2xl font-semibold mb-3">
              2. Purpose of the Platform
            </h2>
            <p className="text-justify mb-2">
              {import.meta.env.VITE_APP_NAME} Sourcing Academy is intended to:
            </p>
            <ul className="list-disc list-inside text-justify mb-2">
              <li>Deliver professional and personal development training.</li>
              <li>
                Provide access to tailored, high-quality instructional content
                created or licensed by {import.meta.env.VITE_APP_NAME}{" "}
                Outsourcing Limited.
              </li>
              <li>
                Empower individuals and organizations to build relevant skills
                in leadership, sourcing, procurement, business development, and
                other relevant domains.
              </li>
            </ul>
          </CardContent>
        </Card>

        {/* 3. Eligibility for Use */}
        <Card className="mb-6 border-0 shadow-none">
          <CardContent className="px-0">
            <h2 className="text-2xl font-semibold mb-3">
              3. Eligibility for Use
            </h2>
            <p className="text-justify mb-2">
              Access to {import.meta.env.VITE_APP_NAME} Sourcing Academy is open
              to:
            </p>
            <ul className="list-disc list-inside text-justify mb-2">
              <li>
                Internal users: Employees and staff of{" "}
                {import.meta.env.VITE_APP_NAME} Outsourcing Limited.
              </li>
              <li>
                External users: Clients, partners, or individuals who register
                independently or through their organizations.
              </li>
            </ul>
            <p className="text-justify">You must:</p>
            <ul className="list-disc list-inside text-justify">
              <li>
                Be at least 18 years old or have verifiable consent from a
                parent/guardian.
              </li>
              <li>Provide truthful and accurate registration information.</li>
            </ul>
          </CardContent>
        </Card>

        {/* 4. User Registration and Responsibilities */}
        <Card className="mb-6 border-0 shadow-none">
          <CardContent className="px-0">
            <h2 className="text-2xl font-semibold mb-3">
              4. User Registration and Responsibilities
            </h2>
            <p className="text-justify mb-2">
              To access the platform, you must:
            </p>
            <ul className="list-disc list-inside text-justify mb-2">
              <li>Create a personal user account.</li>
              <li>Keep your login credentials secure and confidential.</li>
              <li>
                Ensure your profile information remains accurate and up to date.
              </li>
            </ul>
            <p className="text-justify">
              You are responsible for all actions taken under your account.
              Misuse may result in suspension or termination of access.
            </p>
          </CardContent>
        </Card>

        {/* 5. Permitted Use */}
        <Card className="mb-6 border-0 shadow-none">
          <CardContent className="px-0">
            <h2 className="text-2xl font-semibold mb-3">5. Permitted Use</h2>
            <p className="text-justify mb-2">
              You agree to use {import.meta.env.VITE_APP_NAME} Sourcing Academy:
            </p>
            <ul className="list-disc list-inside text-justify mb-2">
              <li>For educational and training purposes only.</li>
              <li>In a lawful, respectful, and professional manner.</li>
            </ul>
            <p className="text-justify mb-2">You must not:</p>
            <ul className="list-disc list-inside text-justify">
              <li>
                Share or redistribute platform content without permission.
              </li>
              <li>
                Attempt to gain unauthorized access to other users' accounts or
                platform systems.
              </li>
              <li>
                Use the platform for any illegal, fraudulent, or harmful
                purpose.
              </li>
            </ul>
          </CardContent>
        </Card>

        {/* 6. Intellectual Property Rights */}
        <Card className="mb-6 border-0 shadow-none">
          <CardContent className="px-0">
            <h2 className="text-2xl font-semibold mb-3">
              6. Intellectual Property Rights
            </h2>
            <p className="text-justify mb-2">
              All materials made available on {import.meta.env.VITE_APP_NAME}{" "}
              Sourcing Academy are the property of{" "}
              {import.meta.env.VITE_APP_NAME} Outsourcing Limited or are
              provided under license. This includes:
            </p>
            <ul className="list-disc list-inside text-justify mb-2">
              <li>
                Videos, slides, written guides, assessments, tools, logos, and
                branding materials.
              </li>
            </ul>
            <p className="text-justify mb-2">You may:</p>
            <ul className="list-disc list-inside text-justify mb-2">
              <li>View and access for personal educational use.</li>
            </ul>
            <p className="text-justify">You may not:</p>
            <ul className="list-disc list-inside text-justify">
              <li>
                Download, copy, modify, resell, distribute, or use the content
                for commercial purposes without prior written consent.
              </li>
            </ul>
          </CardContent>
        </Card>

        {/* 7. Privacy and Data Protection */}
        <Card className="mb-6 border-0 shadow-none">
          <CardContent className="px-0">
            <h2 className="text-2xl font-semibold mb-3">
              7. Privacy and Data Protection
            </h2>
            <p className="text-justify">
              Your privacy is important to us. By using{" "}
              {import.meta.env.VITE_APP_NAME} Sourcing Academy, you agree to the
              collection and use of your personal information in accordance with
              our Privacy Policy (link to be inserted). This includes:
            </p>
            <ul className="list-disc list-inside text-justify mb-2">
              <li>Registration details.</li>
              <li>Learning activity, performance, and progress tracking.</li>
              <li>Communication preferences and course feedback.</li>
            </ul>
            <p className="text-justify">
              All data is handled securely and is not sold or shared with
              unauthorized parties.
            </p>
          </CardContent>
        </Card>

        {/* 8. Course Completion and Certification */}
        <Card className="mb-6 border-0 shadow-none">
          <CardContent className="px-0">
            <h2 className="text-2xl font-semibold mb-3">
              8. Course Completion and Certification
            </h2>
            <p className="text-justify mb-2">
              {import.meta.env.VITE_APP_NAME} Sourcing Academy offers
              certificates for selected training programs. Issuance of
              certificates is subject to:
            </p>
            <ul className="list-disc list-inside text-justify mb-2">
              <li>Full participation in the course.</li>
              <li>
                Completion of assessments or other specified course
                requirements.
              </li>
            </ul>
            <p className="text-justify">
              Certificates are issued solely by {import.meta.env.VITE_APP_NAME}{" "}
              Outsourcing Limited and are valid for professional development
              purposes. They do not confer academic credit unless otherwise
              stated.
            </p>
          </CardContent>
        </Card>

        {/* 9. Suspension or Termination of Access */}
        <Card className="mb-6 border-0 shadow-none">
          <CardContent className="px-0">
            <h2 className="text-2xl font-semibold mb-3">
              9. Suspension or Termination of Access
            </h2>
            <p className="text-justify">
              {import.meta.env.VITE_APP_NAME} Outsourcing Limited reserves the
              right to:
            </p>
            <ul className="list-disc list-inside text-justify mb-2">
              <li>
                Suspend or terminate any account that violates these Terms and
                Conditions.
              </li>
              <li>
                Revoke issued certificates in cases of fraud, plagiarism, or
                misconduct.
              </li>
              <li>
                Restrict access to users whose behavior is deemed harmful or
                disruptive.
              </li>
            </ul>
          </CardContent>
        </Card>

        {/* 10. Platform Availability and Modifications */}
        <Card className="mb-6 border-0 shadow-none">
          <CardContent className="px-0">
            <h2 className="text-2xl font-semibold mb-3">
              10. Platform Availability and Modifications
            </h2>
            <p className="text-justify">
              While {import.meta.env.VITE_APP_NAME} Outsourcing Limited strives
              to ensure the LMS is continuously available and up to date:
            </p>
            <ul className="list-disc list-inside text-justify mb-2">
              <li>
                We may modify, suspend, or update any feature, content, or
                course without prior notice.
              </li>
              <li>Platform maintenance may occasionally disrupt access.</li>
              <li>
                We are not liable for any temporary unavailability or loss of
                access due to technical issues.
              </li>
            </ul>
          </CardContent>
        </Card>

        {/* 11. Disclaimers and Limitation of Liability */}
        <Card className="mb-6 border-0 shadow-none">
          <CardContent className="px-0">
            <h2 className="text-2xl font-semibold mb-3">
              11. Disclaimers and Limitation of Liability
            </h2>
            <p className="text-justify mb-2">
              {import.meta.env.VITE_APP_NAME} Sourcing Academy is provided “as
              is” without warranties of any kind.
            </p>
            <p className="text-justify mb-2">
              We do not guarantee that every course will meet your expectations
              or professional needs.
            </p>
            <p className="text-justify">
              {import.meta.env.VITE_APP_NAME} Outsourcing Limited is not liable
              for any indirect, incidental, or consequential damages resulting
              from your use of the platform.
            </p>
          </CardContent>
        </Card>

        {/* 12. Governing Law and Dispute Resolution */}
        <Card className="mb-6 border-0 shadow-none">
          <CardContent className="px-0">
            <h2 className="text-2xl font-semibold mb-3">
              12. Governing Law and Dispute Resolution
            </h2>
            <p className="text-justify mb-2">
              These Terms and Conditions are governed by the laws of the Federal
              Republic of Nigeria. Any disputes arising shall be resolved:
            </p>
            <ul className="list-disc list-inside text-justify">
              <li>First through informal negotiation.</li>
              <li>
                If unresolved, through formal arbitration or litigation in a
                competent court in Nigeria.
              </li>
            </ul>
          </CardContent>
        </Card>

        {/* 13. Contact Information */}
        <Card className="mb-6 border-0 shadow-none">
          <CardContent className="px-0">
            <h2 className="text-2xl font-semibold mb-3">
              13. Contact Information
            </h2>
            <p className="text-justify">
              For support, questions, or concerns related to{" "}
              {import.meta.env.VITE_APP_NAME} Sourcing Academy, please contact:
              <br />
              {import.meta.env.VITE_APP_NAME} Outsourcing Limited – Learning and
              Development SBU
              <br />
              Email:{" "}
              <a
                href="mailto:learning@icsoutsourcing.com"
                className="text-blue-600 underline"
              >
                learning@icsoutsourcing.com
              </a>
            </p>
          </CardContent>
        </Card>

        {/* <Separator className="my-8" /> */}
      </div>
      <Footer />
    </div>
  );
};

export default TermsAndConditionsPage;
