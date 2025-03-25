import React from "react";

const CardItem = ({ cardData, isActive = false }) => {
  // Destructure card properties
  const {
    cardNumber,
    cardholderName,
    expiryDate,
    balance,
    cardType,
    currency = "$",
    backgroundColor,
  } = cardData;

  // Format card number to show only first and last 4 digits
  const formatCardNumber = (cardNumber) => {
    if (!cardNumber || cardNumber.length < 8) return "•••• •••• •••• ••••";

    const first4 = cardNumber.slice(0, 4);
    const last4 = cardNumber.slice(-4);
    const middleLength = cardNumber.length - 8;
    const middleStars = "•".repeat(middleLength);

    return `${first4} ${middleStars.slice(0, 4)} ${middleStars.slice(
      4,
      8
    )} ${last4}`;
  };

  const formattedCardNumber = formatCardNumber(cardNumber);

  // Get card type logo
  const getCardLogo = () => {
    switch (cardType?.toLowerCase()) {
      case "visa":
        return "VISA";
      case "mastercard":
        return "MasterCard";
      case "amex":
        return "AMEX";
      default:
        return "💳";
    }
  };

  const logo = getCardLogo();

  // Use the backgroundColor prop if provided, otherwise fallback to the default
  const bgClass =
    backgroundColor || `bg-gradient-to-r from-blue-400 to-blue-600`;

  return (
    <div
      className={`relative rounded-xl overflow-hidden p-5 flex flex-col justify-between
        ${bgClass} 
        cursor-pointer transition-all duration-300 hover:shadow-lg`}
      style={{
        height: "180px", // Fixed height for all cards
      }}
    >
      {/* Top section - Balance */}
      <div className="text-white relative z-10">
        <h3 className="font-medium text-gray-200">Balance</h3>
        <p className="text-2xl font-bold mt-1">
          {currency}
          {balance}
        </p>
      </div>

      {/* Middle section - Card Holder and Valid Thru */}
      <div className="flex justify-between items-center relative z-10">
        <div>
          <p className="text-xs text-gray-200 font-medium">CARD HOLDER</p>
          <p className="text-white font-medium">{cardholderName}</p>
        </div>
        <div>
          <p className="text-xs text-gray-200 font-medium">VALID THRU</p>
          <p className="text-white font-medium">{expiryDate}</p>
        </div>
      </div>

      {/* Bottom section - Card Number and Logo */}
      <div className="flex justify-between items-end relative z-10">
        <p className="text-white/80 text-sm">{formattedCardNumber}</p>
        <div className="text-white text-xl font-bold">{logo}</div>
      </div>

      {/* Card chip element */}
      <div className="absolute right-5 top-8 w-7 h-7 rounded-md bg-yellow-300/70 z-10"></div>
    </div>
  );
};

export default CardItem;
