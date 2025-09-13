import { ChevronLeft, ChevronRight, Quote, Star } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, A11y } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import { testimonials } from "../constants/TestimonialUsers.js";

const Testimonials = () => {
  return (
    <section className="bg-[#f8f9fb] dark:bg-gray-900 px-6 md:px-20 py-16 text-center relative">
      <h2 className="text-2xl md:text-3xl font-semibold mb-10 text-gray-900 dark:text-white">
        Clients Testimonial
      </h2>

      <div className="hidden md:block absolute top-1/2 left-0 -translate-y-1/2">
        <div className="swiper-button-prev-custom p-3 bg-white dark:bg-gray-800 border rounded-full shadow-md ml-2">
          <ChevronLeft className="text-gray-700 dark:text-white w-5 h-5" />
        </div>
      </div>
      <div className="hidden md:block absolute top-1/2 right-0 -translate-y-1/2">
        <div className="swiper-button-next-custom p-3 bg-white dark:bg-gray-800 border rounded-full shadow-md mr-2">
          <ChevronRight className="text-gray-700 dark:text-white w-5 h-5" />
        </div>
      </div>

      <Swiper
        modules={[Navigation, Pagination, A11y]}
        spaceBetween={30}
        slidesPerView={1}
        loop={true}
        navigation={{
          nextEl: ".swiper-button-next-custom",
          prevEl: ".swiper-button-prev-custom",
        }}
        pagination={{
          clickable: true,
          el: ".swiper-pagination-custom",
        }}
        breakpoints={{
          768: {
            slidesPerView: 2,
          },
          1024: {
            slidesPerView: 3,
          },
        }}
        className="pb-20"
      >
        {testimonials.map((t) => (
          <SwiperSlide key={t.id}>
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm max-w-sm w-full h-80 flex flex-col justify-between text-left mx-auto">
              <div>
                <div className="flex mb-3 gap-1">
                  {Array(t.stars)
                    .fill(0)
                    .map((_, i) => (
                      <Star
                        key={i}
                        className="w-5 h-5"
                        fill="#f59e0b"
                        stroke="#f59e0b"
                      />
                    ))}
                </div>
                <p className="text-sm text-gray-700 dark:text-gray-300 mb-5 max-h-[160px] overflow-y-auto pr-1 custom-scroll">
                  “{t.text}”
                </p>
              </div>

              <div className="flex items-center gap-3 pt-2 mt-auto">
                <img
                  src={t.image}
                  alt={t.name}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div>
                  <p className="text-sm font-semibold text-gray-900 dark:text-white">
                    {t.name}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {t.role}
                  </p>
                </div>
                <Quote className="ml-auto text-gray-200 dark:text-gray-600 w-6 h-6" />
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <div className="swiper-pagination-custom mt-10 flex justify-center gap-2"></div>
    </section>
  );
};

export default Testimonials;
