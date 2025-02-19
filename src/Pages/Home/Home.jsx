import React from 'react';
import { Helmet } from 'react-helmet-async';
import Hero from './Hero';
import BestWorkers from './BestWorkers';
import TestimonialSection from '../../Components/Testimonial/TestimonialSection';
import AboutUsSection from '../../Components/AboutUsSection';
import AchievementsSection from '../../Components/AchievementsSection';
import BlogResourcesSection from '../../Components/BlogResourcesSection';

const Home = () => {
    return (
        <div className=''>
            <Helmet>
                <title>Home || EIN</title>
            </Helmet>
            <Hero/>
            <BestWorkers/>
            <TestimonialSection/>
            <AboutUsSection/>
            <AchievementsSection/>
            <BlogResourcesSection/>
        </div>
    );
};

export default Home;