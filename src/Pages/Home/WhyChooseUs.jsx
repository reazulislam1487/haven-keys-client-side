// components/WhyChooseUs.jsx
import React from "react";
import { FaHome, FaShieldAlt, FaClock, FaHandshake } from "react-icons/fa";
import { motion } from "framer-motion";

const features = [
  {
    icon: <FaHome />,
    title: "Verified Listings",
    desc: "All properties are verified to ensure trust and transparency.",
  },
  {
    icon: <FaShieldAlt />,
    title: "Secure Payments",
    desc: "We use encrypted payment gateways to keep your transactions safe.",
  },
  {
    icon: <FaClock />,
    title: "24/7 Support",
    desc: "Our support team is available around the clock for your help.",
  },
  {
    icon: <FaHandshake />,
    title: "Trusted Agents",
    desc: "Connect with experienced and verified real estate agents.",
  },
];

const WhyChooseUs = () => {
  return (
    <section className="max-w-7xl mx-auto px-4 py-14">
      <h2 className="text-4xl font-bold text-center text-[#2D2D2D] mb-12">
        Why Choose Us
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {features.map((feature, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.05 }}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="bg-[#F8F8F8] border border-gray-200 rounded-xl p-6 text-center shadow-sm hover:shadow-md transition"
          >
            <div className="text-3xl text-[#FF6F3C] mb-4">{feature.icon}</div>
            <h3 className="text-lg font-semibold text-[#2D2D2D] mb-2">
              {feature.title}
            </h3>
            <p className="text-[#6B7280] text-sm">{feature.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default WhyChooseUs;
