import React from "react";

const ReviewsSection = () => {
  const reviews = [
    {
      name: "Emma Johnson",
      photo: "https://randomuser.me/api/portraits/women/44.jpg",
      rating: 5,
      review: "This platform is amazing! It has really helped me grow my business.",
    },
    {
      name: "Liam Smith",
      photo: "https://randomuser.me/api/portraits/men/42.jpg",
      rating: 4,
      review: "Very user-friendly and well-designed. Highly recommended!",
    },
    {
      name: "Olivia Brown",
      photo: "https://randomuser.me/api/portraits/women/48.jpg",
      rating: 5,
      review: "Exceptional service and great customer support!",
    },
    {
      name: "Noah Davis",
      photo: "https://randomuser.me/api/portraits/men/40.jpg",
      rating: 4,
      review: "Helped me increase my productivity significantly. Love it!",
    },
    {
      name: "Sophia Wilson",
      photo: "https://randomuser.me/api/portraits/women/50.jpg",
      rating: 5,
      review: "One of the best services I’ve used so far. Highly impressed!",
    },
    {
      name: "James Anderson",
      photo: "https://randomuser.me/api/portraits/men/45.jpg",
      rating: 4,
      review: "Great experience! Will definitely recommend to my friends.",
    },
  ];

  return (
    <div className="w-full py-10 bg-gray-100">
      <h2 className="text-3xl font-bold text-center mb-6">User Reviews</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 px-6">
        {reviews.map((review, index) => (
          <div key={index} className="bg-white shadow-lg rounded-lg p-6 flex flex-col items-center">
            <img src={review.photo} alt={review.name} className="w-20 h-20 rounded-full object-cover mb-4" />
            <h3 className="text-lg font-bold">{review.name}</h3>
            <p className="text-yellow-500">{"★".repeat(review.rating)}</p>
            <p className="text-gray-600 mt-2 text-center">{review.review}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReviewsSection;
