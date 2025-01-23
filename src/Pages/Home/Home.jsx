import React from 'react';
import { Helmet } from 'react-helmet-async';
import Hero from './Hero';
import BestWorkers from './BestWorkers';
import TestimonialSection from '../../Components/Testimonial/TestimonialSection';

const Home = () => {
    return (
        <div className='my-5'>
            <Helmet>
                <title>Home || EIN</title>
            </Helmet>
            <Hero/>
            <BestWorkers/>
            <TestimonialSection/>
        </div>
    );
};

export default Home;