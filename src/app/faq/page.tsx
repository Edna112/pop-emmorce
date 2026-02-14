export default function FAQPage() {
  const faqs = [
    {
      q: "How do I reserve or adopt a puppy?",
      a: "Browse our available puppies, then use the \"Contact Breeder\" button on the puppy's page to get in touch. Our breeders will guide you through the process, answer questions, and arrange a visit or adoption.",
    },
    {
      q: "Are your breeders verified?",
      a: "Yes. We work with verified, responsible breeders who prioritize puppy health and well-being. Each breeder is vetted to meet our standards for care and transparency.",
    },
    {
      q: "What is included with my puppy?",
      a: "Puppies typically come with a health guarantee, vaccinations (as noted on each listing), microchipping where indicated, and breeder support. Exact details are listed on each puppy's page.",
    },
    {
      q: "Do you ship puppies?",
      a: "Shipping and delivery options depend on the breeder and your location. Contact the breeder for the specific puppy you're interested in to discuss options.",
    },
    {
      q: "How can I contact you?",
      a: "You can reach us via the Contact page, by email at yorkiecharmm@gmail.com, or by phone at (208) 315-5967. We're happy to help with any questions.",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold mb-4">Frequently Asked Questions</h1>
          <p className="text-gray-600 text-lg mb-12">
            Common questions about our puppies and process. Can&apos;t find your answer? <a href="/contact" className="text-[#FF6B35] hover:underline">Contact us</a>.
          </p>
          <div className="space-y-6">
            {faqs.map((faq, i) => (
              <div key={i} className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-2">{faq.q}</h2>
                <p className="text-gray-600">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
