import { Card, CardContent } from "@/components/ui/card";
import { Helmet } from "react-helmet-async";

const DataDeletion = () => {
  return (
    <div className="min-h-screen bg-white text-gray-800">
      <Helmet>
        <title>Data Deletion Policy | CAP 360</title>
        <meta
          name="description"
          content="Instructions for users who want CAP 360 to delete their personal data from our systems."
        />
        <link rel="canonical" href="https://www.cap360.in/data-deletion" />
      </Helmet>

      {/* Hero Section */}
      <section
        className="relative text-white py-16 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=1470&q=80')"
        }}
      >
        <div className="absolute inset-0 bg-black/70" />
        <div className="relative max-w-5xl mx-auto px-4 text-center">
          <h1 className="text-4xl lg:text-5xl font-bold mb-3">
            Data Deletion Policy
          </h1>
          <p className="text-gray-300 max-w-2xl mx-auto">
            How to request deletion of your personal data collected by CAP 360.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-16">
        <div className="max-w-5xl mx-auto px-4">
          <Card>
            <CardContent className="p-6 space-y-6">
              <p className="text-gray-700">
                CAP 360 respects your right to privacy and gives you full control
                over your personal data. This page explains how you can request
                deletion of your information from our systems.
              </p>

              <h2 className="text-2xl font-semibold text-heading-teal">
                1. Types of Data We May Store
              </h2>
              <p className="text-gray-700">
                Depending on how you interact with us, we may store:
              </p>
              <ul className="list-disc ml-6 text-gray-700 space-y-1">
                <li>Contact details (name, email, phone number)</li>
                <li>Career information shared for resume or consultation</li>
                <li>Communication history (emails, WhatsApp/chat messages)</li>
                <li>Basic analytics data related to website usage</li>
              </ul>

              <h2 className="text-2xl font-semibold text-heading-teal">
                2. How to Request Data Deletion
              </h2>
              <p className="text-gray-700">
                If you would like us to delete your personal data, please send a
                request using any of the following options:
              </p>
              <ul className="list-disc ml-6 text-gray-700 space-y-1">
                <li>
                  Email us at{" "}
                  <span className="font-semibold">info@cap360.in</span> with the
                  subject line <span className="italic">“Data Deletion Request”</span>.
                </li>
                <li>
                  Mention the email address and/or phone number you used while
                  interacting with CAP 360 so we can identify your records.
                </li>
              </ul>
              <p className="text-gray-700">
                Once we verify your identity, we will delete your data from our
                active systems unless we are legally required to retain it.
              </p>

              <h2 className="text-2xl font-semibold text-heading-teal">
                3. WhatsApp & Third-Party Platforms
              </h2>
              <p className="text-gray-700">
                If you interact with CAP 360 via WhatsApp or other Meta products,
                some data may also be stored by those platforms. We will delete
                data from our own tools and databases, but you may also need to
                review and manage your privacy settings directly within WhatsApp,
                Facebook, or Instagram according to their policies.
              </p>

              <h2 className="text-2xl font-semibold text-heading-teal">
                4. Data We May Need to Retain
              </h2>
              <p className="text-gray-700">
                In some cases, we may be required by law or for legitimate
                business reasons (for example, invoices, tax records, or fraud
                prevention) to retain limited information even after a deletion
                request. Such data will be stored securely and only for the
                minimum period required.
              </p>

              <h2 className="text-2xl font-semibold text-heading-teal">
                5. Response Time
              </h2>
              <p className="text-gray-700">
                We aim to respond to all verified data deletion requests within{" "}
                <span className="font-semibold">30 days</span>. You will receive a
                confirmation once your request has been completed.
              </p>

              <h2 className="text-2xl font-semibold text-heading-teal">
                6. Contact
              </h2>
              <p className="text-gray-700">
                For any questions about this Data Deletion Policy, please contact:
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

export default DataDeletion;
