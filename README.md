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

## License

MIT

---

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.
