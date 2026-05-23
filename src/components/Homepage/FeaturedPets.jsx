"use client";

import Image from "next/image";
import Link from "next/link";
import { FaEye, FaPaw } from "react-icons/fa";
import { useEffect, useState } from "react";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { Autoplay, Pagination, Navigation } from "swiper/modules";

const FeaturedPets = () => {
  const [pets, setPets] = useState([]);

  useEffect(() => {
    const fetchPets = async () => {
      const res = await fetch("http://localhost:5000/pets");
      const data = await res.json();
      setPets(data);
    };

    fetchPets();
  }, []);

  return (
    <section className="mt-20 px-6">
      <div className="text-center mb-12">
        <h1 className="text-4xl dark:text-white font-extrabold text-gray-900">
          Featured Pets 🐾
        </h1>
        <p className="text-gray-500 dark:text-white mt-2">
          Meet adorable pets waiting for a loving home
        </p>
      </div>

      <Swiper
        spaceBetween={20}
        slidesPerView={1}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={{ clickable: true }}
        navigation={true}
        breakpoints={{
          640: { slidesPerView: 1 },
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
        modules={[Autoplay, Pagination, Navigation]}
      >
        {pets.slice(0, 6).map((pet) => (
          <SwiperSlide key={pet._id}>
            <div className="group bg-white dark:bg-gray-800 rounded-3xl overflow-hidden border border-slate-100 dark:border-slate-800/60 shadow-xs hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col h-full max-w-sm mx-auto">
              <div className="h-64 relative overflow-hidden shrink-0">
                <Image
                  src={pet.imageUrl}
                  alt={pet.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                />

                <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                <div className="absolute top-4 left-4 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md text-slate-800 dark:text-slate-100 px-3 py-1 rounded-full text-xs font-bold shadow-xs tracking-wide uppercase">
                  {pet.species}
                </div>

                <div className="absolute top-4 right-4 bg-slate-900/90 dark:bg-emerald-600/95 backdrop-blur-md text-white px-3.5 py-1 rounded-full text-xs font-black tracking-wider shadow-xs">
                  ${pet.adoptionFee}
                </div>
              </div>

              <div className="p-5 flex flex-col justify-between grow space-y-4">
                <div className="space-y-2">
                  <h2 className="text-xl font-black text-slate-800 dark:text-white tracking-tight line-clamp-1 group-hover:text-slate-900 dark:group-hover:text-emerald-400 transition-colors duration-200">
                    {pet.name}
                  </h2>

                  <div className="space-y-1.5 text-sm">
                    <p className="text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                      <span className="font-bold text-slate-400 dark:text-slate-500 text-xs uppercase tracking-wider">
                        Breed:
                      </span>
                      <span className="font-medium line-clamp-1">
                        {pet.breed}
                      </span>
                    </p>

                    <p className="text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                      <span className="font-bold text-slate-400 dark:text-slate-500 text-xs uppercase tracking-wider">
                        Location:
                      </span>{" "}
                      <span className="font-medium line-clamp-1">
                        {pet.location}
                      </span>
                    </p>
                  </div>
                </div>

                <div className="pt-2 flex gap-3 w-full">
                  <Link href={`/pet-details/${pet._id}`} className="w-1/2">
                    <button className="w-full cursor-pointer dark:border-white py-3  rounded-xl border border-slate-200  text-slate-600 dark:text-white font-bold text-sm hover:bg-green-300 hover:text-black  dark:hover:bg-green-300 dark:hover:text-black transition-all duration-200 flex items-center justify-center gap-2 active:scale-95">
                      <FaEye className=" text-base " />
                      View
                    </button>
                  </Link>

                  <Link href={`/pet-details/${pet._id}`} className="w-1/2">
                    <button className="w-full py-3 cursor-pointer rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold text-sm shadow-xs transition-all duration-200 hover:bg-green-300  hover:text-black dark:hover:bg-green-300 dark:hover:text-black flex items-center justify-center gap-2 active:scale-95">
                      <FaPaw className="text-base" />
                      Adopt
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default FeaturedPets;
