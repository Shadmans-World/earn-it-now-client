import React from "react";
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import './hero.css';

// import required modules
import { Parallax, Pagination, Navigation } from 'swiper/modules';
import useTasks from "../../Hooks/useTasks";

const Hero = () => {
  const [tasks] = useTasks();

  return (
    <div className="p-3">
        <Swiper
        style={{
          '--swiper-navigation-color': '#fff',
          '--swiper-pagination-color': '#fff',
        }}
        speed={600}
        parallax={true}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Parallax, Pagination, Navigation]}
        className="mySwiper"
      >
        <div
          slot="container-start"
          className="parallax-bg bg-gradient-to-r from-slate-500 to-slate-800"
        //   style={{
        //     'background-image':
        //       'url(https://swiperjs.com/demos/images/nature-1.jpg)',
        //   }}
          data-swiper-parallax="-23%"
        ></div>
        {
            tasks.slice(0,3).map(task=><SwiperSlide key={task._id}>
                <div  data-swiper-parallax="-300">
                  <img src={task.task_image_url} alt="" className="w-52 rounded-3xl" />
                </div>
                <div className="subtitle" data-swiper-parallax="-200">
                  {task.task_title}
                </div>
                <div className="text" data-swiper-parallax="-100">
                  <p>
                   {task.task_detail}
                  </p>
                </div>
              </SwiperSlide>)
        }
       
      </Swiper>
    </div>
  );
};

export default Hero;
