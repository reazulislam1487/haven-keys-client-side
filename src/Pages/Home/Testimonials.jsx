import React from "react";
import Slider from "react-slick";
import { motion } from "framer-motion";
import { FaQuoteLeft } from "react-icons/fa";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const testimonials = [
  {
    name: "Sarah Khan",
    feedback:
      "Amazing service! I found my dream home within a week. Highly recommended.",
    location: "Dhaka, Bangladesh",
    image: "https://randomuser.me/api/portraits/women/65.jpg",
  },
  {
    name: "Tanvir Hasan",
    feedback:
      "The agents were super helpful and responsive. Great experience overall.",
    location: "Chattogram, Bangladesh",
    image: "https://randomuser.me/api/portraits/men/44.jpg",
  },
  {
    name: "Nadia Rahman",
    feedback:
      "Easy to use platform, and the advertised properties are very reliable.",
    location: "Khulna, Bangladesh",
    image: "https://randomuser.me/api/portraits/women/47.jpg",
  },
];

const Testimonials = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 700,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    arrows: false,
    adaptiveHeight: true,
    pauseOnHover: true,
  };

  return (
    <section className="max-w-7xl mx-auto px-4 py-16  rounded-xl">
      <h2 className="text-4xl font-extrabold text-center text-[#1F2937] mb-14 tracking-tight leading-snug">
        What Our Clients Say
      </h2>

      <Slider {...settings} className="max-w-3xl mx-auto px-2">
        {testimonials.map((item, i) => (
          <motion.div
            key={i}
            className="bg-white bg-opacity-60 backdrop-blur-lg rounded-3xl p-10 shadow-2xl mx-4"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <FaQuoteLeft className="text-3xl text-[#FF6F3C] mb-4" />
            <p className="text-lg text-gray-700 mb-10 italic leading-relaxed">
              “{item.feedback}”
            </p>

            <div className="flex items-center gap-4">
              <img
                src={item.image}
                alt={item.name}
                className="w-14 h-14 rounded-full object-cover border-2 border-[#FF6F3C] shadow-md"
              />
              <div>
                <h4 className="font-semibold text-[#1F2937] text-lg">
                  {item.name}
                </h4>
                <p className="text-sm text-gray-500">{item.location}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </Slider>
    </section>
  );
};

export default Testimonials;
