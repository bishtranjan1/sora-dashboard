import React from "react";
import "./CardBackgrounds.css"; // Import to prevent Tailwind from purging the classes
import Icon from "../../utils/icons";

const CardItem = ({ cardData, isActive }) => {
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

  // Format card number to hide middle digits
  const formatCardNumber = (number) => {
    if (!number) return "";
    const last4 = number.slice(-4);
    const first4 = number.slice(0, 4);
    return `${first4} **** **** ${last4}`;
  };

  const formattedCardNumber = formatCardNumber(cardNumber);

  // Get card type logo
  const getCardLogo = () => {
    const type = cardType?.toLowerCase();

    // Return the appropriate icon component
    if (type === "visa" || type === "mastercard" || type === "amex") {
      return <Icon name={type} size={32} color="#FFFFFF" />;
    }

    // Default fallback
    return "💳";
  };

  const logo = getCardLogo();

  // Use the backgroundColor prop if provided, otherwise fallback to the default
  // We now handle both CSS class names and inline style backgrounds
  const bgClass = backgroundColor || `bg-blue-600`;

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
      <div className="absolute right-5 top-8 z-10">
        <Icon name="chip" size={28} color="#FFD700" />
      </div>
    </div>
  );
};

export default CardItem;
