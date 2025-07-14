import React, { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import runnerImage from "/runner.png";

const faqs = [
  {
    question: "How do I register for a marathon on Marathon Zone?",
    answer:
      "Simply sign up on our website, go to the Marathons page, and choose the event you’d like to join.",
  },
  {
    question: "Is Marathon Zone suitable for beginners?",
    answer:
      "Absolutely! We have marathons and fun runs for all levels, from beginners to seasoned runners.",
  },
  {
    question: "Can I track my registration and race history?",
    answer:
      "Yes, you can view your registered events and performance history from your Dashboard.",
  },
  {
    question: "Are there any virtual marathon options?",
    answer:
      "Yes, we organize virtual marathons that you can join from anywhere with GPS tracking.",
  },
  {
    question: "How do I stay informed about upcoming marathons?",
    answer:
      "Subscribe to our newsletter or follow us on social media to get regular updates and announcements.",
  },
];

const FAQSection = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    if (index === activeIndex) {
      setActiveIndex(null); // Close if already open
    } else {
      setActiveIndex(index); // Open the clicked one
    }
  };

  return (
    <section className="flex flex-col-reverse lg:flex-row items-center justify-between gap-12 px-4 py-16 bg-white">
      {/* Left - Image with gradient & quote */}
      <div className="flex-1 relative w-full h-[450px] lg:h-[500px] rounded-2xl overflow-hidden shadow-2xl group">
        {/* Background Image */}
        <img
          src={runnerImage}
          alt="Runner"
          className="w-full h-full object-cover scale-100 group-hover:scale-105 transition-transform duration-1000 ease-in-out"
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/40 via-blue-100/10 to-transparent transition duration-700  rounded-2xl" />

        {/* Border Glow Layer */}
        <div className="absolute inset-0 border-2 border-blue-600 rounded-2xl opacity-30 group-hover:opacity-70 transition duration-700 pointer-events-none animate-pulse" />

        {/* Quote Text */}
        <div className="absolute inset-0 flex flex-col justify-center items-start px-6 md:px-10 text-white">
          <h3 className="text-xl md:text-3xl font-bold mb-3 drop-shadow-lg group-hover:text-blue-200 transition duration-300">
            Run Strong, Stay Committed
          </h3>
          <p className="text-sm md:text-base max-w-sm drop-shadow-md leading-relaxed group-hover:text-blue-100 transition duration-300">
            "Joining a marathon isn’t just a race, it’s a journey of self-belief
            and endurance."
          </p>
        </div>
      </div>

      {/* Right - FAQs */}
      <div className="flex-1 max-w-xl">
        <h4 className="text-blue-600 uppercase font-semibold tracking-widest mb-2">
          || Common Questions ||
        </h4>
        <h2 className="text-4xl font-bold text-gray-900 mb-8 leading-snug">
          Everything You{" "}
          <span className="text-blue-600 italic">Need to Know.</span>
        </h2>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="border border-blue-100 rounded-xl overflow-hidden shadow-sm transition-all duration-300 bg-white"
            >
              <button
                className="w-full flex justify-between items-center px-5 py-4 text-left font-medium text-gray-800 hover:bg-blue-50 transition"
                onClick={() => toggleFAQ(index)}
              >
                <span className="italic">{faq.question}</span>
                {activeIndex === index ? (
                  <ChevronUp className="text-blue-600" />
                ) : (
                  <ChevronDown className="text-blue-600" />
                )}
              </button>

              <div
                className={`px-5 transition-all duration-500 ease-in-out ${
                  activeIndex === index
                    ? "max-h-[300px] py-3 opacity-100"
                    : "max-h-0 py-0 opacity-0"
                } overflow-hidden`}
              >
                <p className="text-gray-600 text-sm leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
