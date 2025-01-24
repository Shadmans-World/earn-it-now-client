import React from "react";
import { useNavigate } from "react-router-dom";

const PurchaseCoin = () => {
  const navigate = useNavigate();

  const handlePurchase = (amount, coins) => {
    navigate("/dashboard/checkout", { state: { amount, coins } });
  };

  return (
    <div className="flex justify-center p-5 flex-col">
      <h3 className="text-3xl font-bold mb-5">Select Your Purchase Amount</h3>
      <div className="stats stats-vertical lg:stats-horizontal shadow">
        <div
          className="stat cursor-pointer"
          onClick={() => handlePurchase(1, 10)}
        >
          <div className="stat-title">10 coins</div>
          <div className="stat-value">=</div>
          <div className="stat-desc">$1</div>
        </div>

        <div
          className="stat cursor-pointer"
          onClick={() => handlePurchase(10, 150)}
        >
          <div className="stat-title">150 coins</div>
          <div className="stat-value">=</div>
          <div className="stat-desc">$10</div>
        </div>

        <div
          className="stat cursor-pointer"
          onClick={() => handlePurchase(20, 500)}
        >
          <div className="stat-title">500 coins</div>
          <div className="stat-value">=</div>
          <div className="stat-desc">$20</div>
        </div>

        <div
          className="stat cursor-pointer"
          onClick={() => handlePurchase(35, 1000)}
        >
          <div className="stat-title">1000 coins</div>
          <div className="stat-value">=</div>
          <div className="stat-desc">$35</div>
        </div>
      </div>
    </div>
  );
};

export default PurchaseCoin;
