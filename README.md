# Sora Dashboard

A modern financial dashboard application built with React, Redux, and Tailwind CSS. This application provides users with an intuitive interface to track their finances, view transactions, manage credit cards, and more.

## Live Demo

The application is deployed and available at: [https://financial-dashboard-51023.web.app](https://financial-dashboard-51023.web.app)

## Features

- **Dashboard Overview**: Visual representation of financial data with interactive charts and cards
- **Transaction Management**: View and categorize financial transactions
- **Credit Card Management**: Monitor and manage credit cards
- **Responsive Design**: Fully responsive layout that works on desktop, tablet, and mobile devices
- **User Settings**: Customizable user profile and application settings
- **Interactive Charts**: Data visualization using Chart.js

## Technologies Used

- **Frontend Framework**: React.js (v19)
- **State Management**: Redux with Redux Toolkit
- **Routing**: React Router v7
- **Styling**: Tailwind CSS
- **Charts**: Chart.js with React-ChartJS-2
- **Icons**: Heroicons
- **Deployment**: Firebase Hosting

## Installation and Setup

1. Clone the repository:

   ```
   git clone https://github.com/bishtranjan1/sora-dashboard.git
   cd sora-dashboard
   ```

2. Install dependencies:

   ```
   npm install
   ```

3. Start the development server:

   ```
   npm start
   ```

4. Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

## Build and Deployment

To build the application for production:

```
npm run build
```

To deploy to Firebase (requires Firebase CLI):

```
firebase deploy
```

## Responsive Design

The dashboard is designed to work across multiple device sizes:

- **Desktop**: Full featured layout with sidebar navigation
- **Tablet**: Adapted layout with optimized space usage
- **Mobile**: Streamlined interface with hamburger menu navigation

## Project Structure

- `src/components`: Reusable UI components
- `src/pages`: Page components for different routes
- `src/store`: Redux store configuration and slices
- `src/assets`: Static assets like images
- `src/utils`: Utility functions and helpers
