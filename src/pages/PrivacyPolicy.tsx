import { Card, CardContent } from "@/components/ui/card";
import { Helmet } from "react-helmet-async";

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-white text-gray-800">
      <Helmet>
        <title>Privacy Policy | CAP 360</title>
        <meta
          name="description"
          content="Read the privacy policy for CAP 360 to understand how we collect, use, and protect your information."
        />
        <link rel="canonical" href="https://cap360.in/privacy-policy" />
        <meta property="og:title" content="Privacy Policy | CAP 360" />
        <meta
          property="og:description"
          content="Read the privacy policy for CAP 360 to understand how we collect, use, and protect your information."
        />
        <meta property="og:url" content="https://cap360.in/privacy-policy" />
        <meta property="og:type" content="website" />
      </Helmet>

      {/* Hero Section */}
      <section
        className="relative text-white py-16 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=1470&q=80')"
        }}
      >
        <div className="absolute inset-0 bg-black/70"></div>
        <div className="relative max-w-5xl mx-auto px-4 text-center">
          <h1 className="text-4xl lg:text-5xl font-bold mb-4">Privacy Policy</h1>
          <p className="text-lg text-gray-300">
            Your privacy is important to us. Learn how we protect your personal information.
          </p>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-16">
        <div className="max-w-5xl mx-auto px-4 space-y-8">
          <Card>
            <CardContent className="p-6 space-y-6">
             <p className="text-gray-700">
  CAP 360 (“we”, “us”, “our”) operates https://cap360.in. We want you to feel confident 
  that whenever you interact with CAP 360, your personal data is treated with care 
  and handled responsibly. Your privacy matters to us, and we are committed to 
  protecting it.
</p>

              
              <div>
                <h2 className="text-2xl font-semibold text-heading-teal mb-2">
                  Information We Collect
                </h2>
              <p className="text-gray-700">
  CAP 360 protects your personal information in compliance with all applicable 
  data protection laws and internal privacy standards. We also maintain strong 
  technical and organizational safeguards to prevent unauthorized access, 
  accidental loss, alteration, misuse, disclosure or destruction of your data. 
  Your trust is important — and we continuously work to keep your data secure.
</p>
              </div>

              <div>
                <h2 className="text-2xl font-semibold text-heading-teal mb-2">
                  How We Use Your Information
                </h2>
                <ul className="list-disc ml-6 text-gray-700 space-y-2">
                  <li>To provide and improve our services</li>
                  <li>To respond to inquiries and communication</li>
                  <li>To send service or promotional updates (only with your consent)</li>
                  <li>To analyze website usage and performance</li>
                </ul>
              </div>

              <div>
                <h2 className="text-2xl font-semibold text-heading-teal mb-2">
                  Cookies & Tracking Technologies
                </h2>
                <p className="text-gray-700">
                  We use cookies to enhance user experience and analyze site interactions. You can
                  manage cookie preferences in your browser settings.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-semibold text-heading-teal mb-2">Data Security</h2>
                <p className="text-gray-700">
                  We implement secure practices to protect your personal data, though no method is
                  100% guaranteed. We continuously improve our security protocols.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-semibold text-heading-teal mb-2">
                  Third-Party Disclosure
                </h2>
                <p className="text-gray-700">
                  We do not sell or rent your data. We may share information only with trusted
                  providers who assist our operations or to comply with legal obligations.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-semibold text-heading-teal mb-2">Your Rights</h2>
                <p className="text-gray-700">
                  You may request to update, access, or delete your personal information anytime by
                  contacting us.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-semibold text-heading-teal mb-2">Policy Updates</h2>
                <p className="text-gray-700">
                  This policy may be updated occasionally. Please review this page periodically for
                  changes.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-semibold text-heading-teal mb-2">Contact Us</h2>
                <p className="text-gray-700">
                  If you have questions about this Privacy Policy, please contact us at:
                  <br />
                  📩 info@cap360.in
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default PrivacyPolicy;
