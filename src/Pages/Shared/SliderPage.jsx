import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useNavigate } from "react-router";

const SliderPage = () => {
  const navigate = useNavigate();

  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    speed: 800,
    autoplaySpeed: 4000,
    cssEase: "ease-in-out",
    arrows: false,
  };

  const slides = [
    {
      heading: "Live Luxuriously",
      subheading: "Discover homes that reflect your ambitions.",
      buttonText: "Explore Listings",
    },
    {
      heading: "Find Your Haven",
      subheading: "Where comfort meets modern elegance.",
      buttonText: "Start Your Search",
    },
    {
      heading: "Invest in Dreams",
      subheading: "Your next address could be your best decision.",
      buttonText: "Browse Properties",
    },
  ];

  const bgImage =
    "https://images.unsplash.com/photo-1582407947304-fd86f028f716?fm=jpg&q=60&w=3000";

  const handleNavigate = () => {
    navigate("/properties");
  };

  return (
    <div
      className="h-[calc(100vh-5rem)] w-full bg-cover bg-center bg-fixed relative"
      style={{ backgroundImage: `url('${bgImage}')` }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/60 z-0" />

      {/* Fixed Middle Text Container */}
      <div className="absolute inset-0 z-10 flex items-center justify-center px-4">
        <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl p-8 md:p-12 max-w-2xl text-center text-white shadow-2xl">
          <Slider {...settings}>
            {slides.map((slide, index) => (
              <div key={index}>
                <h2 className="text-3xl md:text-5xl font-bold mb-4 uppercase">
                  {slide.heading}
                </h2>
                <p className="text-gray-300 text-lg mb-6 leading-relaxed">
                  {slide.subheading}
                </p>
                <button
                  onClick={handleNavigate}
                  className="bg-white text-black px-6 py-3 rounded-full font-semibold hover:scale-105 transition-transform"
                >
                  {slide.buttonText}
                </button>
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </div>
  );
};

export default SliderPage;
