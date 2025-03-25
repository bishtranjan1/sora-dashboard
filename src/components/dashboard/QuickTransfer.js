import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import ContactCard from "./ContactCard";
import Button from "../ui/Button";
import Spinner from "../ui/Spinner";
import {
  selectQuickTransfer,
  selectQuickTransferLoading,
  selectQuickTransferError,
  fetchQuickTransfer,
} from "../../store/slices/dashboardSlice";

const QuickTransfer = () => {
  const [selectedContact, setSelectedContact] = useState(null);
  const [amount, setAmount] = useState("");

  const quickTransferData = useSelector(selectQuickTransfer);
  const isLoading = useSelector(selectQuickTransferLoading);
  const error = useSelector(selectQuickTransferError);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchQuickTransfer());
  }, [dispatch]);

  const handleContactSelect = (contactId) => {
    setSelectedContact(contactId === selectedContact ? null : contactId);
  };

  const handleAmountChange = (e) => {
    // Only allow numbers and a single decimal point
    const value = e.target.value;
    if (/^\d*\.?\d*$/.test(value)) {
      setAmount(value);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!selectedContact || !amount || parseFloat(amount) <= 0) {
      alert("Please select a contact and enter a valid amount");
      return;
    }

    // In a real app, this would call an API to process the transfer
    alert(`Transfer of $${amount} to contact ID ${selectedContact} initiated!`);

    // Reset form
    setAmount("");
    setSelectedContact(null);
  };

  // Show loading spinner while data is being fetched
  if (isLoading) {
    return (
      <div className="h-full w-full flex items-center justify-center">
        <Spinner size="lg" />
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
  if (
    !quickTransferData ||
    !quickTransferData.contacts ||
    quickTransferData.contacts.length === 0
  ) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="text-gray-500">No contacts available.</div>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col">
      {/* Title */}
      <h4 className="text-sm font-medium text-gray-700 mb-2">
        Select contact:
      </h4>

      {/* Contacts grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-4">
        {quickTransferData.contacts.map((contact) => (
          <ContactCard
            key={contact.id}
            contact={contact}
            isSelected={selectedContact === contact.id}
            onClick={() => handleContactSelect(contact.id)}
          />
        ))}
      </div>

      {/* Transfer form - simplified and compact */}
      <form onSubmit={handleSubmit} className="mt-auto">
        <div className="flex items-center space-x-4">
          <label
            htmlFor="amount"
            className="text-sm font-medium text-gray-700 whitespace-nowrap"
          >
            Write amount:
          </label>
          <div className="relative flex-grow">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <span className="text-gray-500">$</span>
            </div>
            <input
              type="text"
              id="amount"
              name="amount"
              value={amount}
              onChange={handleAmountChange}
              placeholder="0.00"
              className="pl-8 pr-4 py-2 w-full rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-primary"
            />
          </div>
          <Button
            type="submit"
            variant="primary"
            disabled={!selectedContact || !amount || parseFloat(amount) <= 0}
            className="whitespace-nowrap px-6"
          >
            Send
          </Button>
        </div>
      </form>
    </div>
  );
};

export default QuickTransfer;
