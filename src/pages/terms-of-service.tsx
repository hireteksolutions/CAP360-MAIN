import { Card, CardContent } from "@/components/ui/card";
import { Helmet } from "react-helmet-async";

const TermsAndConditions = () => {
  return (
    <div className="min-h-screen bg-white text-gray-800">
      <Helmet>
        <title>Terms & Conditions | CAP 360</title>
        <meta
          name="description"
          content="Terms & Conditions governing the use of CAP 360 website and career development services."
        />
        <link rel="canonical" href="https://www.cap360.in/terms-of-service" />
      </Helmet>

      {/* Hero Section */}
      <section
        className="relative text-white py-16 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1521791055366-0d553872125f?auto=format&fit=crop&w=1470&q=80')"
        }}
      >
        <div className="absolute inset-0 bg-black/70"></div>
        <div className="relative max-w-5xl mx-auto px-4 text-center">
          <h1 className="text-4xl lg:text-5xl font-bold mb-3">
            Terms & Conditions
          </h1>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Please read these terms carefully before using our website and services.
          </p>
        </div>
      </section>

      {/* Terms Content */}
      <section className="py-16">
        <div className="max-w-5xl mx-auto px-4 space-y-8">
          <Card>
            <CardContent className="p-6 space-y-6">

              <p className="text-gray-700">
                By accessing and using this website, you accept these Terms & Conditions
                without limitation or reservation.
              </p>

              <h2 className="text-2xl font-semibold text-heading-teal">
                Ownership & Intellectual Property
              </h2>
              <p className="text-gray-700">
                Unless otherwise stated, all content on this site — including text, graphics, media,
                layout, and design — is owned by CAP 360. All trademarks referenced belong to their
                respective owners. You may not copy, distribute, modify, repost, or use materials for
                commercial purposes without written permission from CAP 360.
              </p>

              <h2 className="text-2xl font-semibold text-heading-teal">
                Permitted Use
              </h2>
              <p className="text-gray-700">
                You may download and display one copy of site materials solely for personal and
                non-commercial use, provided copyright notices remain intact.
              </p>

              <h2 className="text-2xl font-semibold text-heading-teal">
                No Warranties
              </h2>
              <p className="text-gray-700">
                This website and its content are provided on an “as-is” basis. CAP 360 provides no
                warranties regarding site accuracy, availability, suitability, or performance.
              </p>

              <h2 className="text-2xl font-semibold text-heading-teal">
                Limitation of Liability
              </h2>
              <p className="text-gray-700">
                CAP 360 is not liable for any direct, indirect, incidental, or consequential damages,
                including loss of business, data, revenue, or professional opportunities, arising out
                of your use of this website.
              </p>

              <h2 className="text-2xl font-semibold text-heading-teal">
                Third-Party Links
              </h2>
              <p className="text-gray-700">
                Our website may include links to external websites for convenience. CAP 360 does not
                control these sites and accepts no responsibility for their content, policies, or
                services. Accessing third-party links is at your own risk.
              </p>

              <h2 className="text-2xl font-semibold text-heading-teal">
                Governing Law
              </h2>
              <p className="text-gray-700">
                These Terms are governed by the laws of India. Any disputes shall be subject to the
                exclusive jurisdiction of courts located in New Delhi, India.
              </p>

              <h2 className="text-2xl font-semibold text-heading-teal">
                User Submissions
              </h2>
              <p className="text-gray-700">
                Any information submitted through the website is assumed to be lawful and
                non-confidential unless stated otherwise in our Privacy Policy. You agree not to
                submit materials that infringe legal rights or confidentiality.
              </p>

              <h2 className="text-2xl font-semibold text-heading-teal">
                Unauthorized Idea Submissions
              </h2>
              <p className="text-gray-700">
                CAP 360 does not evaluate unsolicited business proposals or ideas submitted outside of
                an established professional agreement. Any such submissions may be used or disclosed
                without obligation or compensation.
              </p>

              <h2 className="text-2xl font-semibold text-heading-teal">
                Updates to Terms
              </h2>
              <p className="text-gray-700">
                CAP 360 may update these Terms periodically. Continued use of the website signifies
                acceptance of the latest version.
              </p>

              <h2 className="text-2xl font-semibold text-heading-teal">
                Contact Us
              </h2>
              <p className="text-gray-700">
                For any concerns or legal questions regarding these Terms, contact us at:
                <br />
                📩 info@cap360.in
                <br />
                📍 H - 7, Lajpat Nagar 3, New Delhi, India
              </p>

            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default TermsAndConditions;
