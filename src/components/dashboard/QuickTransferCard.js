import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  selectQuickTransfer,
  addRecentRecipient,
  updateTransferLimits,
} from "../../store/slices/dashboardSlice";

const QuickTransferCard = () => {
  const dispatch = useDispatch();
  const { recentRecipients, savedAccounts, transferLimits } =
    useSelector(selectQuickTransfer);
  const [amount, setAmount] = useState("");
  const [selectedRecipient, setSelectedRecipient] = useState(null);
  const [transferStep, setTransferStep] = useState(1); // 1: Select recipient, 2: Enter amount, 3: Confirm

  // Handle recipient selection
  const handleSelectRecipient = (recipient) => {
    setSelectedRecipient(recipient);
    setTransferStep(2);
  };

  // Handle amount change
  const handleAmountChange = (e) => {
    // Only allow numbers and decimal point
    const value = e.target.value;
    if (/^\d*\.?\d{0,2}$/.test(value) || value === "") {
      setAmount(value);
    }
  };

  // Handle transfer submission
  const handleTransfer = () => {
    // Basic validation
    if (!selectedRecipient || !amount || parseFloat(amount) <= 0) {
      return;
    }

    // This would typically call an API to process the transfer
    // For now, we'll just update the UI

    // Update remaining limits
    const amountNum = parseFloat(amount);
    const newDailyRemaining = transferLimits.remaining.daily - amountNum;
    const newMonthlyRemaining = transferLimits.remaining.monthly - amountNum;

    dispatch(
      updateTransferLimits({
        remaining: {
          daily: newDailyRemaining,
          monthly: newMonthlyRemaining,
        },
      })
    );

    // Add to recent recipients if not already at the top
    dispatch(addRecentRecipient(selectedRecipient));

    // Reset state
    setAmount("");
    setSelectedRecipient(null);
    setTransferStep(1);

    // Could show success message here
  };

  // Get initials for avatar placeholder
  const getInitials = (name) => {
    return name
      .split(" ")
      .map((part) => part[0])
      .join("")
      .toUpperCase();
  };

  // Render recipient selection step
  const renderSelectRecipient = () => (
    <>
      <div className="mb-4">
        <h4 className="text-sm font-medium text-gray-700 mb-2">
          Recent Recipients
        </h4>
        <div className="flex overflow-x-auto space-x-3 pb-2">
          {recentRecipients.map((recipient) => (
            <button
              key={recipient.id}
              className="flex flex-col items-center min-w-[60px]"
              onClick={() => handleSelectRecipient(recipient)}
            >
              <div className="w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center mb-1">
                {recipient.avatar ? (
                  <img
                    src={recipient.avatar}
                    alt={recipient.name}
                    className="w-full h-full rounded-full"
                  />
                ) : (
                  <span className="text-lg font-medium">
                    {getInitials(recipient.name)}
                  </span>
                )}
              </div>
              <span className="text-xs text-gray-600 truncate max-w-[60px]">
                {recipient.name.split(" ")[0]}
              </span>
            </button>
          ))}
        </div>
      </div>

      <div>
        <h4 className="text-sm font-medium text-gray-700 mb-2">
          Saved Accounts
        </h4>
        <div className="space-y-2">
          {savedAccounts.map((account) => (
            <button
              key={account.id}
              className="w-full flex items-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
              onClick={() => handleSelectRecipient(account)}
            >
              <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center mr-3">
                {account.avatar ? (
                  <img
                    src={account.avatar}
                    alt={account.name}
                    className="w-full h-full rounded-full"
                  />
                ) : (
                  <span className="text-sm font-medium text-gray-600">
                    {getInitials(account.name)}
                  </span>
                )}
              </div>
              <div className="flex-1 text-left">
                <p className="text-sm font-medium text-gray-800">
                  {account.name}
                </p>
                <p className="text-xs text-gray-500">
                  {account.bank} • {account.accountNumber}
                </p>
              </div>
            </button>
          ))}
        </div>
      </div>
    </>
  );

  // Render amount entry step
  const renderEnterAmount = () => (
    <>
      <div className="mb-4">
        <button
          onClick={() => setTransferStep(1)}
          className="flex items-center text-primary mb-4"
        >
          <svg
            className="w-4 h-4 mr-1"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          Back
        </button>

        <div className="flex items-center mb-4">
          <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center mr-3">
            {selectedRecipient.avatar ? (
              <img
                src={selectedRecipient.avatar}
                alt={selectedRecipient.name}
                className="w-full h-full rounded-full"
              />
            ) : (
              <span className="text-sm font-medium">
                {getInitials(selectedRecipient.name)}
              </span>
            )}
          </div>
          <div>
            <p className="text-sm font-medium text-gray-800">
              {selectedRecipient.name}
            </p>
            <p className="text-xs text-gray-500">
              {selectedRecipient.email ||
                `${selectedRecipient.bank} • ${selectedRecipient.accountNumber}`}
            </p>
          </div>
        </div>
      </div>

      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Amount
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <span className="text-gray-500 sm:text-sm">$</span>
          </div>
          <input
            type="text"
            name="amount"
            className="w-full pl-7 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
            placeholder="0.00"
            value={amount}
            onChange={handleAmountChange}
          />
        </div>
        <div className="mt-2 flex justify-between text-xs text-gray-500">
          <span>Daily limit: ${transferLimits.daily.toLocaleString()}</span>
          <span>
            Remaining: ${transferLimits.remaining.daily.toLocaleString()}
          </span>
        </div>
      </div>

      <button
        className={`w-full py-3 px-4 rounded-lg font-medium ${
          amount && parseFloat(amount) > 0
            ? "bg-primary text-white hover:bg-primary-dark"
            : "bg-gray-200 text-gray-400 cursor-not-allowed"
        } transition-colors`}
        onClick={handleTransfer}
        disabled={!amount || parseFloat(amount) <= 0}
      >
        Transfer Now
      </button>
    </>
  );

  return (
    <div className="bg-white rounded-xl shadow-sm p-5">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">
        Quick Transfer
      </h3>

      {transferStep === 1 && renderSelectRecipient()}
      {transferStep === 2 && renderEnterAmount()}
    </div>
  );
};

export default QuickTransferCard;
