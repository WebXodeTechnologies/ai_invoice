import React, { useState } from "react";
import { FAQS } from "../../utils/data";
import { ChevronDown } from "lucide-react";

const FaqItem = ({ faq, isOpen, onClick }) => {
  return (
    <div className="border border-gray-200 rounded-xl overflow-hidden bg-white transition-all duration-300 hover:shadow-md">
      
      {/* Question */}
      <button
        onClick={onClick}
        className="w-full flex items-center justify-between p-5 sm:p-6 hover:bg-gray-50 cursor-pointer transition"
      >
        <span className="text-left text-base sm:text-lg font-medium text-gray-900">
          {faq.question}
        </span>

        <ChevronDown
          className={`w-5 h-5 text-gray-500 transition-transform duration-300 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {/* Answer */}
      {isOpen && (
        <div className="px-5 sm:px-6 pb-5 text-gray-600 text-sm sm:text-base leading-relaxed border-t border-gray-100">
          {faq.answer}
        </div>
      )}
    </div>
  );
};

const Faq = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const handleClick = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-16 sm:py-20 lg:py-28 bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-gray-600 text-base sm:text-lg max-w-2xl mx-auto">
            Everything you need to know about the product and billing.
          </p>
        </div>

        {/* FAQ List */}
        <div className="space-y-4">
          {FAQS.map((faq, index) => (
            <FaqItem
              key={index}
              faq={faq}
              isOpen={openIndex === index}
              onClick={() => handleClick(index)}
            />
          ))}
        </div>

      </div>
    </section>
  );
};

export default Faq;