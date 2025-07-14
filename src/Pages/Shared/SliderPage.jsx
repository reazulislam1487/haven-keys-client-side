// import React from "react";
// import Slider from "react-slick";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";
// import { useNavigate } from "react-router";
// const SliderPage = () => {
//   const navigate = useNavigate();
//   const settings = {
//     dots: true,
//     infinite: true,
//     slidesToShow: 1,
//     slidesToScroll: 1,
//     autoplay: true,
//     speed: 1500,
//     autoplaySpeed: 4000,
//     cssEase: "ease-in-out",
//   };
//   const slides = [
//     {
//       img: "https://i.ibb.co/YBmvcC3n/Runners-sutadimages.jpg",
//       heading: "Welcome to Marathon Pulse",
//       subheading:
//         "Track races, join global events, and run towards a healthier, stronger you.",
//       buttonText: "Get Started",
//     },
//     {
//       img: "https://i.ibb.co/nMvMyyS0/Runner.jpg",
//       heading: "Join the Runners' Community",
//       subheading:
//         "Connect with fellow runners, share your journey, and find your pace in a global movement.",
//       buttonText: "Join Now",
//     },
//     {
//       img: "https://i.ibb.co/rfQSJ46s/London-Marathon-Alan-Kean.jpg",
//       heading: "Upcoming Marathons & Events",
//       subheading:
//         "Stay updated with upcoming races, training tips, and personalized challenges.",
//       buttonText: "Explore Events",
//     },
//   ];
//   const handleNavigate = () => {
//     navigate("/marathons");
//   };
//   return (
//     <Slider className="mb-20 overflow-hidden " {...settings}>
//       {slides.map((slide, index) => (
//         <div key={index}>
//           <div className="w-full h-[calc(100vh-5rem)] relative">
//             <img
//               className="w-full h-full object-cover brightness-90"
//               src={slide.img}
//               alt={`Slide ${index + 1}`}
//             />
//             <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-black/60 flex items-center justify-center text-center text-white px-4">
//               <div className="max-w-3xl space-y-6">
//                 <h2 className="text-4xl md:text-6xl font-extrabold leading-tight drop-shadow-lg tracking-wide">
//                   {slide.heading}
//                 </h2>
//                 <p className="text-lg md:text-xl drop-shadow-sm">
//                   {slide.subheading}
//                 </p>
//                 <button
//                   onClick={handleNavigate}
//                   className="bg-green-500 hover:bg-green-600 text-white py-3 px-8 rounded-full transition shadow-lg hover:shadow-xl hover:scale-105 duration-300"
//                 >
//                   {slide.buttonText}
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       ))}
//     </Slider>
//   );
// };
// export default SliderPage;

// import React from "react";
// import Slider from "react-slick";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";
// import { useNavigate } from "react-router";

// const SliderPage = () => {
//   const navigate = useNavigate();

//   const settings = {
//     dots: true,
//     infinite: true,
//     slidesToShow: 1,
//     slidesToScroll: 1,
//     autoplay: true,
//     speed: 1200,
//     autoplaySpeed: 4500,
//     cssEase: "ease-in-out",
//     arrows: false,
//   };

//   const slides = [
//     {
//       img: "https://i.ibb.co/YBmvcC3n/Runners-sutadimages.jpg",
//       heading: "Fuel Your Passion",
//       subheading: "Run freely, run fiercely — your journey starts here.",
//       buttonText: "Get Started",
//     },
//     {
//       img: "https://i.ibb.co/nMvMyyS0/Runner.jpg",
//       heading: "Stronger Together",
//       subheading: "Find your tribe in the heartbeat of marathoners.",
//       buttonText: "Join Community",
//     },
//     {
//       img: "https://i.ibb.co/prjnLz9K/csm-Frau-Herz-Halbmarathon-ac03e1362f.jpg",
//       heading: "Challenge Every Mile",
//       subheading: "Push limits. Discover marathons. Celebrate growth.",
//       buttonText: "Explore Races",
//     },
//   ];

//   const handleNavigate = () => {
//     navigate("/marathons");
//   };

//   return (
//     <Slider className="mb-20 overflow-hidden" {...settings}>
//       {slides.map((slide, index) => (
//         <div key={index}>
//           <div className="relative w-full h-[calc(100vh-5rem)]">
//             <img
//               src={slide.img}
//               alt={`Slide ${index + 1}`}
//               className="w-full h-full object-cover brightness-75"
//             />
//             <div className="absolute inset-0 bg-gradient-to-br from-sky-900/60 via-emerald-800/40 to-black/60 flex items-center justify-center px-4">
//               <div className="backdrop-blur-md bg-white/10 rounded-2xl p-6 sm:p-10 max-w-3xl text-white text-center space-y-6 shadow-xl">
//                 <h2 className="text-3xl sm:text-5xl lg:text-6xl font-bold uppercase tracking-wide text-emerald-300 drop-shadow">
//                   {slide.heading}
//                 </h2>
//                 <p className="text-base sm:text-lg lg:text-xl text-sky-100 font-light drop-shadow-md">
//                   {slide.subheading}
//                 </p>
//                 <button
//                   onClick={handleNavigate}
//                   className="bg-gradient-to-r from-emerald-500 to-sky-500 text-white px-8 py-3 rounded-full font-semibold tracking-wide shadow-lg hover:from-sky-500 hover:to-emerald-500 hover:scale-105 transition duration-300"
//                 >
//                   {slide.buttonText}
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       ))}
//     </Slider>
//   );
// };

// export default SliderPage;
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
    speed: 1200,
    autoplaySpeed: 4500,
    cssEase: "ease-in-out",
    arrows: false,
  };

  const slides = [
    {
      img: "https://i.ibb.co/YBmvcC3n/Runners-sutadimages.jpg",
      heading: "Fuel Your Passion",
      subheading: "Run freely, run fiercely — your journey starts here.",
      buttonText: "Get Started",
    },
    {
      img: "https://i.ibb.co/nMvMyyS0/Runner.jpg",
      heading: "Stronger Together",
      subheading: "Find your tribe in the heartbeat of marathoners.",
      buttonText: "Join Community",
    },
    {
      img: "https://cdn.pixabay.com/photo/2020/06/21/12/18/race-5324594_1280.jpg",
      heading: "Challenge Every Mile",
      subheading: "Push limits. Discover marathons. Celebrate growth.",
      buttonText: "Explore Races",
    },
  ];

  const handleNavigate = () => {
    navigate("/marathons");
  };

  return (
    <Slider className="mb-3 overflow-hidden" {...settings}>
      {slides.map((slide, index) => (
        <div key={index}>
          <div className="relative w-full h-[calc(100vh-12rem)]">
            <img
              src={slide.img}
              alt={`Slide ${index + 1}`}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-br from-black/30 via-black/10 to-black/30 flex items-center justify-center px-4">
              <div className="backdrop-blur-sm bg-white/10 rounded-2xl p-6 sm:p-10 max-w-3xl text-white text-center space-y-6 shadow-xl">
                <h2 className="text-3xl sm:text-5xl lg:text-5xl font-bold uppercase tracking-wide text-emerald-200 drop-shadow">
                  {slide.heading}
                </h2>
                <p className="text-base sm:text-lg lg:text-xl text-sky-100 font-light drop-shadow-sm">
                  {slide.subheading}
                </p>
                <button
                  onClick={handleNavigate}
                  className="bg-gradient-to-r from-emerald-500 to-sky-500 text-white px-8 py-3 rounded-full font-semibold tracking-wide shadow-lg hover:from-sky-500 hover:to-emerald-500 hover:scale-105 transition duration-300"
                >
                  {slide.buttonText}
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </Slider>
  );
};

export default SliderPage;
