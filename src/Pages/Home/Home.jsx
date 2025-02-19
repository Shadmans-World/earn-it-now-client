import React from 'react';
import { Helmet } from 'react-helmet-async';
import Hero from './Hero';
import BestWorkers from './BestWorkers';
import TestimonialSection from '../../Components/Testimonial/TestimonialSection';
import AboutUsSection from '../../Components/AboutUsSection';
import AchievementsSection from '../../Components/AchievementsSection';
import BlogResourcesSection from '../../Components/BlogResourcesSection';
import ReviewsSection from '../../Components/ReviewsSection';
import NewsletterSubscription from '../../Components/NewsletterSubscription';

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
            <ReviewsSection/>
            <NewsletterSubscription/>
        </div>
    );
};

export default Home;