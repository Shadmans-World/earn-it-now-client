import React from 'react';

const AchievementsSection = () => {
  const achievements = [
    { title: '10K+ Workers Enrolled' },
    { title: '5K+ Successful Projects' },
    { title: '$1M+ Earned by Workers' },
  ];

  return (
    <section className="text-center pb-5 bg-gray-100" id='achievements'>
      <h2 className="text-3xl sm:text-4xl font-bold mb-8">Our Achievements</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-5">
        {achievements.map((achievement, index) => (
          <div key={index} className="card p-6 shadow-lg">
            <h3 className="text-xl sm:text-2xl font-semibold">{achievement.title}</h3>
          </div>
        ))}
      </div>
    </section>
  );
};

export default AchievementsSection;
