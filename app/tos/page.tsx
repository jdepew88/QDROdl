import type { Metadata } from "next";
import LegalPageTemplate from "@/components/LegalPageTemplate";

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "Terms governing use of QDROdl and qdrodl.app. Template for legal review.",
};

export default function TermsOfServicePage() {
  return (
    <LegalPageTemplate title="Terms of Service">
      <p className="text-sm text-slate-400">
        <strong className="text-stone-50">Effective date:</strong> March 26,
        2026. This is a template for your counsel to review and replace with
        final language.
      </p>

      <section>
        <h2>Agreement</h2>
        <p>
          These Terms of Service (“Terms”) govern your access to and use of
          qdrodl.app and related services (the “Services”) operated by QDROdl
          (“we,” “us”). By using the Services, you agree to these Terms.
        </p>
      </section>

      <section>
        <h2>Not legal advice</h2>
        <p>
          The Services provide tools and document preparation assistance. We
          are not a law firm and do not provide legal advice. You are
          responsible for consulting qualified counsel for your situation and
          for reviewing all documents before filing or signing.
        </p>
      </section>

      <section>
        <h2>Eligibility & accounts</h2>
        <p>
          You must provide accurate information and keep your account
          credentials secure. You are responsible for activity under your
          account. We may suspend or terminate accounts that violate these Terms
          or create risk.
        </p>
      </section>

      <section>
        <h2>Orders, fees, and payment</h2>
        <p>
          Fees for paid features are as shown at checkout or on the Site. You
          authorize us and our payment processors to charge your selected
          payment method. Unless stated otherwise, fees are non-refundable
          except as required by law or as we specify in writing.
        </p>
      </section>

      <section>
        <h2>Acceptable use</h2>
        <p>You agree not to:</p>
        <ul>
          <li>Use the Services unlawfully or to misrepresent facts or identity;</li>
          <li>Attempt to access systems or data you are not authorized to use;</li>
          <li>Interfere with or overload the Services;</li>
          <li>Reverse engineer or scrape the Services except as permitted by law.</li>
        </ul>
      </section>

      <section>
        <h2>Intellectual property</h2>
        <p>
          The Site, software, branding, and content we provide are owned by
          QDROdl or our licensors. You receive a limited, non-exclusive
          license to use the Services for their intended purpose. Outputs you
          lawfully generate for your own case are yours subject to these Terms
          and any third-party rights.
        </p>
      </section>

      <section>
        <h2>Disclaimers</h2>
        <p>
          THE SERVICES ARE PROVIDED “AS IS” AND “AS AVAILABLE,” WITHOUT
          WARRANTIES OF ANY KIND, WHETHER EXPRESS OR IMPLIED, INCLUDING
          MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND
          NON-INFRINGEMENT, TO THE FULLEST EXTENT PERMITTED BY LAW.
        </p>
      </section>

      <section>
        <h2>Limitation of liability</h2>
        <p>
          TO THE FULLEST EXTENT PERMITTED BY LAW, QDRODL AND ITS AFFILIATES AND
          SUPPLIERS WILL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL,
          CONSEQUENTIAL, OR EXEMPLARY DAMAGES, OR FOR LOST PROFITS, DATA, OR
          GOODWILL. OUR AGGREGATE LIABILITY FOR CLAIMS ARISING OUT OF THE
          SERVICES WILL NOT EXCEED THE GREATER OF (A) THE AMOUNTS YOU PAID US
          FOR THE SERVICES GIVING RISE TO THE CLAIM IN THE TWELVE MONTHS BEFORE
          THE CLAIM OR (B) ONE HUNDRED U.S. DOLLARS.
        </p>
      </section>

      <section>
        <h2>Indemnity</h2>
        <p>
          You will defend and indemnify QDROdl against claims, damages, losses,
          and expenses (including reasonable attorneys’ fees) arising from
          your use of the Services, your content, or your violation of these
          Terms or law, to the extent permitted by law.
        </p>
      </section>

      <section>
        <h2>Governing law & disputes</h2>
        <p>
          These Terms are governed by the laws of the State of California,
          excluding conflict-of-law rules, unless a different jurisdiction is
          required by applicable law. Courts in the selected venue (to be
          finalized by counsel) have exclusive jurisdiction, subject to
          mandatory consumer protections where applicable.
        </p>
      </section>

      <section>
        <h2>Changes</h2>
        <p>
          We may modify these Terms by posting an updated version on the Site.
          Continued use after the effective date may constitute acceptance.
          Material changes may require additional notice where required by law.
        </p>
      </section>

      <section>
        <h2>Contact</h2>
        <p>
          For questions about these Terms, contact us through the method
          published on qdrodl.app.
        </p>
      </section>
    </LegalPageTemplate>
  );
}
