import React, { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { motion } from "framer-motion";
import "swiper/css";
import "swiper/css/navigation";
import { testimonials } from "@/constants";
import MainHeading from "@/common/MainHeading";

const Testimonials: React.FC = () => {
  const prevRef = useRef<HTMLButtonElement>(null);
  const nextRef = useRef<HTMLButtonElement>(null);

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <span
        key={index}
        className={`text-sm ${
          index < rating ? "text-blue-400" : "text-slate-600"
        }`}
      >
        ★
      </span>
    ));
  };

  return (
    <div className="w-full mb-10">
      {/* Header with Navigation */}
      <div className="flex justify-between items-start mb-12">
        <div>
          <MainHeading
            heading="Real Experiences from Real People"
            subheading=""
          />
          <p className="text-white font-medium text-[20px]">
            Trusted by subcontractors who bid smarter, faster, and win more.
          </p>
        </div>

        {/* Navigation Buttons */}
        <div className="flex gap-2">
          <motion.button
            ref={prevRef}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="w-10 h-10 bg-slate-800 hover:bg-slate-700 border border-slate-600 rounded-full flex items-center justify-center text-slate-400 hover:text-white transition-colors"
          >
            <FiChevronLeft className="w-5 h-5" />
          </motion.button>
          <motion.button
            ref={nextRef}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="w-10 h-10 bg-slate-800 hover:bg-slate-700 border border-slate-600 rounded-full flex items-center justify-center text-slate-400 hover:text-white transition-colors"
          >
            <FiChevronRight className="w-5 h-5" />
          </motion.button>
        </div>
      </div>

      {/* Testimonials Slider */}
      <Swiper
        modules={[Navigation]}
        spaceBetween={24}
        slidesPerView={1}
        navigation={{
          prevEl: prevRef.current,
          nextEl: nextRef.current,
        }}
        onBeforeInit={(swiper) => {
          if (
            swiper.params.navigation &&
            typeof swiper.params.navigation !== "boolean"
          ) {
            swiper.params.navigation.prevEl = prevRef.current;
            swiper.params.navigation.nextEl = nextRef.current;
          }
        }}
        breakpoints={{
          640: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          1024: {
            slidesPerView: 3.2,
            spaceBetween: 24,
          },
        }}
        className="testimonials-swiper"
      >
        {testimonials.map((testimonial) => (
          <SwiperSlide key={testimonial.id}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-xl p-6 border border-slate-700 h-full"
            >
              {/* User Info */}
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-semibold">
                    {testimonial.name.charAt(0)}
                  </span>
                </div>
                <div>
                  <h4 className="text-white font-medium text-sm">
                    {testimonial.name}
                  </h4>
                </div>
              </div>

              {/* Rating */}
              <div className="flex items-center gap-2 mb-4">
                <div className="flex">{renderStars(testimonial.rating)}</div>
                <span className="text-slate-400 text-xs">
                  {testimonial.rating}.0
                </span>
              </div>

              {/* Testimonial Text */}
              <p className="text-slate-300 text-sm leading-relaxed">
                {testimonial.text}
              </p>
            </motion.div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Testimonials;
