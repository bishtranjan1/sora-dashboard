import React from "react";
import { useSelector } from "react-redux";
import CardItem from "./CardItem";
import {
  selectCards,
  selectCardsLoading,
  selectCardsError,
} from "../../store/slices/dashboardSlice";

const MyCards = () => {
  const cards = useSelector(selectCards);
  const isLoading = useSelector(selectCardsLoading);
  const error = useSelector(selectCardsError);

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
    <div className="h-full overflow-hidden">
      {/* Horizontally scrollable cards container */}
      <div
        className="flex overflow-x-auto pb-2 space-x-4 h-[210px]" // Fixed height for the card container
        style={{
          scrollbarWidth: "thin",
          scrollbarColor: "#D1D5DB transparent",
          msOverflowStyle: "none", // IE and Edge
          WebkitOverflowScrolling: "touch", // Smooth scrolling on iOS
        }}
      >
        {cards.map((card) => (
          <div
            key={card.id}
            className="flex-shrink-0"
            style={{ width: "300px" }} // Fixed width for each card
          >
            <CardItem cardData={card} isActive={true} />
          </div>
        ))}
      </div>
      {/* Scroll indicator - subtle hint that there's more to scroll */}
      {cards.length > 1 && (
        <div className="flex justify-center mt-2">
          <div className="flex space-x-1">
            {cards.map((_, index) => (
              <div key={index} className="w-2 h-2 rounded-full bg-gray-300" />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default MyCards;
