// components/Testimonials.jsx
import React from "react";
import Slider from "react-slick";
import { motion } from "framer-motion";
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
    autoplaySpeed: 4000,
    arrows: false,
    adaptiveHeight: true,
    pauseOnHover: true,
  };

  return (
    <section className="max-w-7xl mx-auto px-4 py-14">
      <h2 className="text-4xl font-bold text-center text-[#2D2D2D] mb-12 tracking-tight">
        What Our Clients Say
      </h2>
      <Slider {...settings} className="max-w-3xl mx-auto">
        {testimonials.map((item, i) => (
          <motion.div
            key={i}
            className="bg-white bg-opacity-10 backdrop-blur-md rounded-xl p-8 shadow-lg mx-4"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-md text-[#4A5568] mb-8 italic leading-relaxed">
              “{item.feedback}”
            </p>

            <div className="flex items-center gap-5">
              <img
                src={item.image}
                alt={item.name}
                className="w-16 h-16 rounded-full object-cover border-4 border-[#FF6F3C]"
              />
              <div>
                <h4 className="font-semibold text-[#2D2D2D] text-lg">
                  {item.name}
                </h4>
                <p className="text-sm text-[#6B7280]">{item.location}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </Slider>
    </section>
  );
};

export default Testimonials;
