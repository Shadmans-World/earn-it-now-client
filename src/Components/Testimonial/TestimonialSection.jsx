import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "./testimonial.css";

import { Pagination } from "swiper/modules"; // Correct import for Pagination in Swiper v8+

const TestimonialSection = () => {
  const testimonials = [
    {
      name: "Emma Johnson",
      photo:
        "https://i.ibb.co/yQMmfyk/cheerful-male-employer-glad-to-have-interview-with-2021-08-31-06-04-48-utc-scaled.jpg",
      quote:
        "This platform has completely transformed the way I work. Highly recommend it!",
    },
    {
      name: "Liam Smith",
      photo:
        "https://i.ibb.co/yQMmfyk/cheerful-male-employer-glad-to-have-interview-with-2021-08-31-06-04-48-utc-scaled.jpg",
      quote:
        "An amazing experience! The user interface is so intuitive and easy to use.",
    },
    {
      name: "Olivia Brown",
      photo:
        "https://i.ibb.co/yQMmfyk/cheerful-male-employer-glad-to-have-interview-with-2021-08-31-06-04-48-utc-scaled.jpg",
      quote:
        "The customer service team was so helpful. I had all my queries resolved quickly!",
    },
    {
      name: "Noah Davis",
      photo:
        "https://i.ibb.co/yQMmfyk/cheerful-male-employer-glad-to-have-interview-with-2021-08-31-06-04-48-utc-scaled.jpg",
      quote:
        "I’ve been able to achieve my goals faster with the tools provided here.",
    },
    {
      name: "Sophia Anderson",
      photo:
        "https://i.ibb.co/yQMmfyk/cheerful-male-employer-glad-to-have-interview-with-2021-08-31-06-04-48-utc-scaled.jpg",
      quote:
        "A life-changing experience! It has improved my productivity by leaps and bounds.",
    },
  ];

  return (
    <div className="mt-12 w-full bg-white">
      <h2 className="text-2xl font-bold  text-center">
        What Our Users Say
      </h2>
      <Swiper
        className="testimonial-swiper"
        modules={[Pagination]}
        spaceBetween={20}
        slidesPerView={1}
        pagination={{ clickable: true }}
        breakpoints={{
          640: { slidesPerView: 1 },
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
      >
        {testimonials.map((testimonial, index) => (
          <SwiperSlide key={index} className="h-full">
            <div className="bg-white shadow-lg rounded-lg p-6 w-full flex flex-col justify-center items-center h-full min-h-[200px] border-2">
              <div>
                <img
                  src={testimonial.photo}
                  alt={testimonial.name}
                  className="w-24 h-24 rounded-full mb-4 object-cover"
                />
              </div>
              <h3 className="text-lg font-bold">{testimonial.name}</h3>
              {/* Set fixed height for paragraph */}
              <p className="text-gray-500 mt-2 h-[80px] overflow-hidden">{testimonial.quote}</p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default TestimonialSection;
