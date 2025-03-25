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

- **Frontend Framework**: React.js
- **State Management**: Redux with Redux Toolkit
- **Routing**: React Router
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

The project follows a structured approach to organize code for better maintainability and scalability:

```
sora-dashboard/
├── public/                               # Public assets and index.html
│   ├── api/                              # Mock API JSON data files
│   │   ├── cardsdata.json                # Credit card data
│   │   ├── transactionsdata.json         # Transaction data
│   │   ├── weeklyactivitydata.json       # Weekly activity charts
│   │   ├── expensestatisticsdata.json    # Expense statistics
│   │   ├── quicktransferdata.json        # Quick transfer data
│   │   └── balancehistorydata.json       # Balance history data
│   ├── index.html                        # Main HTML file
│   └── ...                               # Other public assets
├── src/
│   ├── components/                       # Reusable UI components
│   │   ├── dashboard/                    # Dashboard-specific components
│   │   │   ├── BalanceHistoryChart.js    # Balance history visualization
│   │   │   ├── CardItem.js               # Individual card component
│   │   │   ├── ExpenseStatisticsChart.js # Expense statistics chart
│   │   │   ├── MyCards.js                # Cards container component
│   │   │   ├── QuickTransfer.js          # Quick transfer component
│   │   │   ├── RecentTransactions.js     # Recent transactions component
│   │   │   └── WeeklyActivityChart.js    # Weekly activity chart
│   │   ├── layout/                       # Layout components
│   │   │   ├── DashboardLayout.js        # Main dashboard layout
│   │   │   ├── Header.js                 # App header component
│   │   │   └── Sidebar.js                # Navigation sidebar
│   │   └── ui/                           # Generic UI components
│   │       ├── Button.js                 # Reusable button component
│   │       ├── Card.js                   # Card container component
│   │       └── ...                       # Other UI components
│   ├── pages/                            # Page components for different routes
│   │   ├── Dashboard.js                  # Main dashboard page
│   │   ├── Settings.js                   # User settings page
│   │   ├── Transactions.js               # Transactions page
│   │   └── ...                           # Other pages
│   ├── services/                         # API and service functions
│   │   └── api.js                        # API service functions
│   ├── store/                            # Redux store configuration
│   │   ├── index.js                      # Store configuration
│   │   └── slices/                       # Redux slices
│   │       ├── dashboardSlice.js         # Dashboard data management
│   │       ├── userSlice.js              # User data management
│   │       └── settingsSlice.js          # Settings management
│   ├── utils/                            # Utility functions
│   ├── App.js                            # Main App component
│   ├── index.js                          # Application entry point
│   └── index.css                         # Global styles
├── package.json                          # Dependencies and scripts
└── README.md                             # Project documentation
```

## Application Architecture

### Data Flow

The application follows a unidirectional data flow pattern:

1. **User Interaction**: User interacts with a component (e.g., clicking on a tab)
2. **Action Dispatch**: Component dispatches an action to Redux
3. **State Update**: Redux reducers update the state
4. **Re-render**: Components connected to that state re-render

### API Integration

The application uses a modular approach for API integration:

1. **API Services**: The `services/api.js` file contains functions for fetching data from different endpoints
2. **Redux Thunks**: Async thunks in Redux slices handle API calls and manage loading/error states
3. **Component Integration**: Components dispatch thunks and select data from Redux store

Example of data flow for loading cards:

```
MyCards component mounts →
  Dashboard dispatches fetchAllDashboardData →
    Redux thunk calls fetchCardsData from API service →
      API service fetches from '/api/cardsdata.json' →
        Redux updates state with cards data and loading status →
          MyCards component re-renders with new data
```

### Component Structure

Components follow a hierarchy for better organization:

1. **Layout Components**: Define the overall structure (Sidebar, Header)
2. **Page Components**: Represent different routes and organize dashboard widgets
3. **Feature Components**: Dashboard-specific components (MyCards, RecentTransactions)
4. **UI Components**: Generic, reusable UI elements (Button, Card)

### State Management

The application uses Redux Toolkit for state management with these key slices:

1. **Dashboard Slice**: Manages all dashboard-related data (cards, transactions, charts)
2. **User Slice**: Handles user information and authentication state
3. **Settings Slice**: Manages user preferences and application settings

Each slice implements:

- Redux reducers for updating state
- Async thunks for API calls
- Selectors for accessing state in components

### Styling

The application uses Tailwind CSS for styling:

- Component-specific styles are applied using Tailwind classes
- Layout uses a responsive grid system
- Custom styles can be added through the `src/index.css` file

## Contributing

1. Fork the repository
2. Create your feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add some amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## License

This project is licensed under the MIT License.
