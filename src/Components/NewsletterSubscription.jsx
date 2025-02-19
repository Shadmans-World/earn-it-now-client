import React, { useState } from "react";

const NewsletterSubscription = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email.includes("@")) {
      setMessage("Please enter a valid email address.");
      return;
    }
    setMessage("Thank you for subscribing!");
    setEmail(""); // Reset input
  };

  return (
    <div className="bg-gray-100 text-black py-10 px-6 ">
      <h2 className="text-3xl font-bold mb-4 text-center">Subscribe to Our Newsletter</h2>
      <p className="mb-4 text-center">Stay updated with our latest news and offers.</p>
      <form onSubmit={handleSubscribe} className="flex flex-col md:flex-row justify-center gap-4">
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="px-4 py-2 rounded-md text-black w-full "
          required
        />
        <button type="submit" className="bg-white text-blue-600 px-4 py-2 rounded-md font-bold hover:bg-gray-200">
          Subscribe
        </button>
      </form>
      {message && <p className="mt-4">{message}</p>}
    </div>
  );
};

export default NewsletterSubscription;
