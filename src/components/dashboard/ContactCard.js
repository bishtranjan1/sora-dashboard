import React from "react";

const ContactCard = ({ contact, isSelected, onClick }) => {
  const { name, avatar, role } = contact;

  // Extract initials from name for fallback avatar
  const getInitials = () => {
    if (!name) return "??";
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .substring(0, 2)
      .toUpperCase();
  };

  return (
    <div
      onClick={onClick}
      className={`flex flex-col items-center p-3 rounded-xl cursor-pointer transition-all
        ${
          isSelected ? "bg-primary/10 ring-1 ring-primary" : "hover:bg-gray-100"
        }`}
    >
      <div className="relative mb-2">
        {avatar ? (
          <img
            src={avatar}
            alt={name}
            className="w-14 h-14 rounded-full object-cover"
          />
        ) : (
          <div className="w-14 h-14 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 font-medium">
            {getInitials()}
          </div>
        )}

        {/* Online status indicator */}
        <div className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-green-500 border-2 border-white"></div>
      </div>

      <h4 className="font-medium text-sm text-center">{name}</h4>
      {role && <p className="text-xs text-gray-500 mt-0.5">{role}</p>}
    </div>
  );
};

export default ContactCard;
