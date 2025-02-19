import React from 'react';

const BlogResourcesSection = () => {
  const blogPosts = [
    { 
      title: 'How to Get Hired Faster as a Worker', 
      details: 'Learn tips and strategies to improve your chances of getting hired quickly on our platform.'
    },
    { 
      title: 'Top 5 Skills Buyers Look For', 
      details: 'Discover the most sought-after skills by buyers and how you can improve them to stand out.'
    },
    { 
      title: 'Success Stories from Our Platform', 
      details: 'Read inspiring success stories of workers who found opportunities and excelled on our platform.'
    },
  ];

  return (
    <section className="text-center py-12 bg-gray-100" id='blogs'>
      <h2 className="text-3xl sm:text-4xl font-bold mb-8">Blog & Resources</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-5">
        {blogPosts.map((post, index) => (
          <div key={index} className="card p-6 shadow-lg">
            <h3 className="text-xl sm:text-2xl font-semibold mb-4">{post.title}</h3>
            <p className="text-sm sm:text-base">{post.details}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default BlogResourcesSection;
