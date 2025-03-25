import React, { useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  selectActiveTab,
  setActiveTab,
} from "../../store/slices/settingsSlice";
import {
  selectUser,
  updateUserProfile,
  updateProfileImage,
  removeProfileImage,
  startLoading,
  endLoading,
} from "../../store/slices/userSlice";

const SettingsPage = () => {
  const dispatch = useDispatch();
  const activeTab = useSelector(selectActiveTab);
  const user = useSelector(selectUser);
  const fileInputRef = useRef(null);
  const [successMessage, setSuccessMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  // Handle tab change
  const handleTabChange = (tab) => {
    dispatch(setActiveTab(tab));
    // Clear any success messages when changing tabs
    setSuccessMessage("");
  };

  // Function to handle file selection
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      dispatch(startLoading());
      const reader = new FileReader();
      reader.onload = () => {
        dispatch(updateProfileImage(reader.result));
        dispatch(endLoading());
        setSuccessMessage("Profile picture updated successfully!");

        // Auto-hide the success message after 3 seconds
        setTimeout(() => {
          setSuccessMessage("");
        }, 3000);
      };
      reader.onerror = () => {
        dispatch(endLoading());
        // Could add error handling here
      };
      reader.readAsDataURL(file);
    }
  };

  // Function to trigger file input click
  const handleEditClick = () => {
    fileInputRef.current.click();
  };

  // Function to remove profile image
  const handleRemoveImage = () => {
    dispatch(removeProfileImage());
    // Clear the file input value
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    setSuccessMessage("Profile picture removed successfully!");

    // Auto-hide the success message after 3 seconds
    setTimeout(() => {
      setSuccessMessage("");
    }, 3000);
  };

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.target);
    const userData = {
      name: formData.get("name"),
      username: formData.get("username"),
      email: formData.get("email"),
      dateOfBirth: formData.get("dateOfBirth"),
      presentAddress: formData.get("presentAddress"),
      permanentAddress: formData.get("permanentAddress"),
      city: formData.get("city"),
      postalCode: formData.get("postalCode"),
      country: formData.get("country"),
    };

    // Simulate API call with a slight delay
    setTimeout(() => {
      dispatch(updateUserProfile(userData));
      setIsSubmitting(false);
      setSuccessMessage("Profile updated successfully!");

      // Auto-hide the success message after 3 seconds
      setTimeout(() => {
        setSuccessMessage("");
      }, 3000);
    }, 500);
  };

  return (
    <div className="space-y-6">
      {/* Success message notification */}
      {successMessage && (
        <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 rounded-md shadow-sm animate-fade-in">
          <div className="flex items-center">
            <svg
              className="h-5 w-5 mr-2"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            </svg>
            <p>{successMessage}</p>
          </div>
        </div>
      )}

      {/* Settings Navigation and Content */}
      <div className="bg-white rounded-xl shadow">
        {/* Settings Tabs */}
        <div className="flex border-b border-gray-200">
          <button
            className={`py-4 px-6 font-medium text-sm ${
              activeTab === "profile"
                ? "text-primary border-b-2 border-primary"
                : "text-gray-500 hover:text-gray-700"
            }`}
            onClick={() => handleTabChange("profile")}
          >
            Edit Profile
          </button>
          <button
            className={`py-4 px-6 font-medium text-sm ${
              activeTab === "preferences"
                ? "text-primary border-b-2 border-primary"
                : "text-gray-500 hover:text-gray-700"
            }`}
            onClick={() => handleTabChange("preferences")}
          >
            Preferences
          </button>
          <button
            className={`py-4 px-6 font-medium text-sm ${
              activeTab === "security"
                ? "text-primary border-b-2 border-primary"
                : "text-gray-500 hover:text-gray-700"
            }`}
            onClick={() => handleTabChange("security")}
          >
            Security
          </button>
        </div>

        {/* Settings Content */}
        <div className="p-6">
          {/* Profile Settings */}
          {activeTab === "profile" && (
            <div>
              <form onSubmit={handleSubmit}>
                {/* Responsive layout for desktop/mobile */}
                <div className="flex flex-col lg:flex-row">
                  {/* Photo Section - centered on mobile, 20% width on desktop */}
                  <div className="w-full lg:w-1/5 flex justify-center mb-6 lg:mb-0">
                    <div className="flex flex-col items-center">
                      <div className="relative">
                        <div className="w-32 h-32 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
                          {user.isLoading ? (
                            <div className="absolute inset-0 flex items-center justify-center bg-gray-200 bg-opacity-70">
                              <svg
                                className="animate-spin h-8 w-8 text-primary"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                              >
                                <circle
                                  className="opacity-25"
                                  cx="12"
                                  cy="12"
                                  r="10"
                                  stroke="currentColor"
                                  strokeWidth="4"
                                ></circle>
                                <path
                                  className="opacity-75"
                                  fill="currentColor"
                                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                ></path>
                              </svg>
                            </div>
                          ) : user.profileImage ? (
                            <img
                              src={user.profileImage}
                              alt="Profile"
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <span className="text-4xl font-bold text-gray-500">
                              {user.name
                                .split(" ")
                                .map((part) => part[0])
                                .join("")}
                            </span>
                          )}
                        </div>
                        {/* Edit icon at 5 o'clock position - outside the overflow:hidden container */}
                        <button
                          type="button"
                          onClick={handleEditClick}
                          className="absolute bottom-0 right-0 bg-black p-1.5 rounded-full shadow-lg hover:bg-gray-800 transition-colors z-10 transform translate-x-1/3"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4 text-white"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                            />
                          </svg>
                        </button>
                        {/* Hidden file input */}
                        <input
                          type="file"
                          ref={fileInputRef}
                          onChange={handleFileChange}
                          accept="image/*"
                          className="hidden"
                        />
                      </div>
                      {/* Remove photo button - only shown when a photo exists */}
                      {user.profileImage && (
                        <button
                          type="button"
                          onClick={handleRemoveImage}
                          className="mt-2 text-xs text-red-500 hover:text-red-700 transition-colors"
                        >
                          Remove photo
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Form Section - full width on mobile, 80% width on desktop */}
                  <div className="w-full lg:w-4/5 space-y-4">
                    {/* Your Name and User Name */}
                    <div className="flex flex-col lg:flex-row lg:space-x-4 space-y-4 lg:space-y-0">
                      <div className="w-full lg:w-1/2">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Your Name
                        </label>
                        <input
                          type="text"
                          name="name"
                          className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                          defaultValue={user.name}
                          required
                        />
                      </div>
                      <div className="w-full lg:w-1/2">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          User Name
                        </label>
                        <input
                          type="text"
                          name="username"
                          className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                          defaultValue={user.username}
                          required
                        />
                      </div>
                    </div>

                    {/* Email and Password */}
                    <div className="flex flex-col lg:flex-row lg:space-x-4 space-y-4 lg:space-y-0">
                      <div className="w-full lg:w-1/2">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Email
                        </label>
                        <input
                          type="email"
                          name="email"
                          className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                          defaultValue={user.email}
                          required
                        />
                      </div>
                      <div className="w-full lg:w-1/2">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Password
                        </label>
                        <input
                          type={isPasswordVisible ? "text" : "password"}
                          className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                          defaultValue="••••••••"
                          onFocus={() => setIsPasswordVisible(true)}
                          onBlur={() => setIsPasswordVisible(false)}
                        />
                      </div>
                    </div>

                    {/* Date of Birth and Present Address */}
                    <div className="flex flex-col lg:flex-row lg:space-x-4 space-y-4 lg:space-y-0">
                      <div className="w-full lg:w-1/2">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Date of Birth
                        </label>
                        <input
                          type="date"
                          name="dateOfBirth"
                          className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                          defaultValue={user.dateOfBirth}
                        />
                      </div>
                      <div className="w-full lg:w-1/2">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Present Address
                        </label>
                        <input
                          type="text"
                          name="presentAddress"
                          className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                          defaultValue={user.presentAddress}
                        />
                      </div>
                    </div>

                    {/* Permanent Address and City */}
                    <div className="flex flex-col lg:flex-row lg:space-x-4 space-y-4 lg:space-y-0">
                      <div className="w-full lg:w-1/2">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Permanent Address
                        </label>
                        <input
                          type="text"
                          name="permanentAddress"
                          className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                          defaultValue={user.permanentAddress}
                        />
                      </div>
                      <div className="w-full lg:w-1/2">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          City
                        </label>
                        <input
                          type="text"
                          name="city"
                          className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                          defaultValue={user.city}
                        />
                      </div>
                    </div>

                    {/* Postal Code and Country */}
                    <div className="flex flex-col lg:flex-row lg:space-x-4 space-y-4 lg:space-y-0">
                      <div className="w-full lg:w-1/2">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Postal Code
                        </label>
                        <input
                          type="text"
                          name="postalCode"
                          className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                          defaultValue={user.postalCode}
                        />
                      </div>
                      <div className="w-full lg:w-1/2">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Country
                        </label>
                        <select
                          name="country"
                          className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                          defaultValue={user.country}
                        >
                          <option value="us">United States</option>
                          <option value="ca">Canada</option>
                          <option value="uk">United Kingdom</option>
                          <option value="au">Australia</option>
                          <option value="in">India</option>
                        </select>
                      </div>
                    </div>

                    {/* Save Button - Full width on mobile, right-aligned on desktop */}
                    <div className="flex pt-4 w-full">
                      <button
                        type="submit"
                        className={`${
                          isSubmitting
                            ? "bg-gray-400 cursor-not-allowed"
                            : "bg-primary hover:bg-primary-dark"
                        } text-white py-2 px-6 rounded-lg transition-colors flex items-center justify-center w-full lg:w-auto lg:ml-auto`}
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? (
                          <>
                            <svg
                              className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                            >
                              <circle
                                className="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="4"
                              ></circle>
                              <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                              ></path>
                            </svg>
                            Saving...
                          </>
                        ) : (
                          "Save Changes"
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          )}

          {/* Preferences Settings */}
          {activeTab === "preferences" && (
            <div className="p-8 text-center">
              <div className="flex flex-col items-center justify-center space-y-4">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
                  <svg
                    className="w-8 h-8 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-700">
                  Preferences
                </h3>
                <p className="text-gray-500 max-w-md">
                  This section will allow you to customize your application
                  experience, including theme settings, language preferences,
                  and notification options.
                </p>
                <p className="text-gray-400 text-sm">Coming soon</p>
              </div>
            </div>
          )}

          {/* Security Settings */}
          {activeTab === "security" && (
            <div className="p-8 text-center">
              <div className="flex flex-col items-center justify-center space-y-4">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
                  <svg
                    className="w-8 h-8 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-700">
                  Security Settings
                </h3>
                <p className="text-gray-500 max-w-md">
                  This section will allow you to manage your account security
                  settings, including password changes, two-factor
                  authentication, and login notifications.
                </p>
                <p className="text-gray-400 text-sm">Coming soon</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
