import React from "react";
import CardItem from "./CardItem";
import { useEffect, useState } from "react";

const MyCards = () => {
  const [isMobile, setIsMobile] = useState(false);

  // Check if device is mobile on initial render and when window is resized
  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    // Initial check
    checkIsMobile();

    // Add event listener for window resize
    window.addEventListener("resize", checkIsMobile);

    // Clean up event listener on component unmount
    return () => window.removeEventListener("resize", checkIsMobile);
  }, []);

  // Sample cards data with one regular credit card and one Amex black card
  const cardsData = [
    {
      id: 1,
      cardNumber: "4111111111111234",
      cardholderName: "John Doe",
      expiryDate: "09/25",
      balance: "12,546.00",
      cardType: "visa",
      backgroundColor: "bg-gradient-to-r from-blue-500 to-purple-500", // colorful credit card
    },
    {
      id: 2,
      cardNumber: "3782822463100005",
      cardholderName: "John Doe",
      expiryDate: "12/24",
      balance: "24,350.75",
      cardType: "amex",
      backgroundColor: "bg-gradient-to-r from-zinc-800 via-black to-zinc-700", // premium metal black Amex card with more visible gradient
    },
  ];

  // On mobile, display only the first card, on desktop display all cards
  const displayCards = isMobile ? cardsData.slice(0, 1) : cardsData;

  return (
    <div className="h-full">
      {/* Cards displayed side by side on desktop, one card on mobile */}
      <div className="flex flex-col md:flex-row md:space-x-4 space-y-4 md:space-y-0 h-full">
        {displayCards.map((card) => (
          <div
            key={card.id}
            className={`w-full h-full ${!isMobile ? "md:w-1/2" : ""}`}
          >
            <CardItem cardData={card} isActive={true} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyCards;
