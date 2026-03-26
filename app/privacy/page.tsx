import type { Metadata } from "next";
import LegalPageTemplate from "@/components/LegalPageTemplate";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How QDROdl collects, uses, and protects information when you use qdrodl.app.",
};

export default function PrivacyPage() {
  return (
    <LegalPageTemplate title="Privacy Policy">
      <p className="text-sm text-slate-400">
        <strong className="text-stone-50">Effective date:</strong> March 26,
        2026. This is a template for your counsel to review and replace with
        final language.
      </p>

      <section>
        <h2>Introduction</h2>
        <p>
          QDROdl (“we,” “us”) operates qdrodl.app (the “Site”) and related
          services (the “Services”). This Privacy Policy describes how we
          handle information when you visit the Site, create an account, use our
          intake or document tools, or contact us.
        </p>
      </section>

      <section>
        <h2>Information we collect</h2>
        <ul>
          <li>
            <strong>Contact and account data</strong> — such as name, email, and
            credentials you provide when registering or signing in.
          </li>
          <li>
            <strong>Case and intake information</strong> — details you submit
            through forms (e.g., parties, plans, case facts) needed to prepare
            QDRO-related documents.
          </li>
          <li>
            <strong>Payment data</strong> — processed by our payment provider;
            we generally do not store full card numbers on our servers.
          </li>
          <li>
            <strong>Technical data</strong> — such as IP address, device/browser
            type, and cookies or similar technologies used for security and
            basic analytics.
          </li>
        </ul>
      </section>

      <section>
        <h2>How we use information</h2>
        <p>We use the information above to:</p>
        <ul>
          <li>Provide, operate, and improve the Services;</li>
          <li>Process payments and fulfill orders;</li>
          <li>Communicate with you about your account or transactions;</li>
          <li>Comply with law and protect rights and safety.</li>
        </ul>
      </section>

      <section>
        <h2>Sharing</h2>
        <p>
          We may share information with service providers (e.g., hosting,
          email, payments, analytics) who assist us under appropriate
          agreements, and when required by law or to protect QDROdl and our
          users. We do not sell your personal information as a standalone
          product.
        </p>
      </section>

      <section>
        <h2>Retention & security</h2>
        <p>
          We retain information as long as needed for the purposes above and as
          required by law. We use reasonable administrative, technical, and
          organizational measures to protect data; no method of transmission
          over the Internet is 100% secure.
        </p>
      </section>

      <section>
        <h2>Your choices</h2>
        <p>
          Depending on your location, you may have rights to access, correct,
          delete, or export certain data, or to object to or restrict certain
          processing. Contact us using the information on the Site to make a
          request.
        </p>
      </section>

      <section>
        <h2>Children</h2>
        <p>
          The Services are not directed to children under 13 (or the minimum
          age in your jurisdiction). We do not knowingly collect their personal
          information.
        </p>
      </section>

      <section>
        <h2>Changes</h2>
        <p>
          We may update this policy from time to time. We will post the revised
          version on this page and update the effective date.
        </p>
      </section>

      <section>
        <h2>Contact</h2>
        <p>
          For privacy questions, contact us through the support or contact
          method published on qdrodl.app.
        </p>
      </section>
    </LegalPageTemplate>
  );
}
