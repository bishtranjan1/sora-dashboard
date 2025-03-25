import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  selectCards,
  selectCardsLoading,
  selectCardsError,
  fetchCards,
} from "../../store/slices/dashboardSlice";
import CardItem from "./CardItem";
import Spinner from "../ui/Spinner";

const MyCards = () => {
  const dispatch = useDispatch();
  const cards = useSelector(selectCards);
  const isLoading = useSelector(selectCardsLoading);
  const error = useSelector(selectCardsError);

  // Fetch cards data on component mount
  useEffect(() => {
    if (!cards || cards.length === 0) {
      dispatch(fetchCards());
    }
  }, [dispatch, cards]);

  // Show loading state
  if (isLoading) {
    return (
      <div className="h-full flex items-center justify-center">
        <Spinner size="lg" color="primary" />
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

  // Show empty state only after we know data is loaded and empty
  if (!isLoading && cards && cards.length === 0) {
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
        className="flex overflow-x-auto pb-2 space-x-4 h-[210px]"
        style={{
          scrollbarWidth: "thin",
          scrollbarColor: "#D1D5DB transparent",
          msOverflowStyle: "none",
          WebkitOverflowScrolling: "touch",
        }}
      >
        {/* Only render cards when they're available */}
        {cards &&
          cards.map((card) => (
            <div
              key={card.id}
              className="flex-shrink-0"
              style={{ width: "300px" }}
            >
              <CardItem cardData={card} isActive={true} />
            </div>
          ))}
      </div>
      {/* Scroll indicator - subtle hint that there's more to scroll */}
      {cards && cards.length > 1 && (
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
