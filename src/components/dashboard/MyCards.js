import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CardItem from "./CardItem";
import {
  fetchCards,
  selectCards,
  selectDashboardLoading,
  selectDashboardError,
} from "../../store/slices/dashboardSlice";

const MyCards = () => {
  const dispatch = useDispatch();
  const cards = useSelector(selectCards);
  const isLoading = useSelector(selectDashboardLoading);
  const error = useSelector(selectDashboardError);
  const [isMobile, setIsMobile] = useState(false);

  // Fetch cards data from API on component mount
  useEffect(() => {
    dispatch(fetchCards());
  }, [dispatch]);

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

  // On mobile, display only the first card, on desktop display all cards
  const displayCards = isMobile ? cards.slice(0, 1) : cards;

  // Show loading state
  if (isLoading) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="animate-pulse text-gray-500">Loading cards...</div>
      </div>
    );
  }

  // Show error state
  if (error) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="text-red-500">Error: {error}</div>
      </div>
    );
  }

  // Show empty state
  if (!cards || cards.length === 0) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="text-gray-500">No cards available.</div>
      </div>
    );
  }

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
