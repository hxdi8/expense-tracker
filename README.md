# Expense Tracker

A full-stack expense tracking app with a Node.js/Express API, MongoDB persistence, and an Expo React Native mobile client. Includes an admin dashboard for user and expense management, plus deployment-ready configuration for both backend (Render) and mobile (EAS Build).

## Features

- User signup and login
- Add income and expense transactions
- Categorize transactions by type such as food, transport, bills, shopping, salary, entertainment, health, education, and more
- Pick a transaction date with a native date picker
- View total balance, total income, and total expenses
- View transaction history
- Delete transactions
- Admin authentication and dashboard with stats overview
- View admin stats: total users, total expenses, and total amount spent
- Search, edit, and delete users from the admin dashboard
- View and delete user-specific transactions from the admin panel

## Tech Stack

### Backend

- Node.js
- Express
- MongoDB
- Mongoose
- CORS
- dotenv

### Mobile

- Expo
- React Native
- Expo Router
- Axios
- React Native DateTimePicker
- React Native Element Dropdown
- Expo Google Fonts (Great Vibes)
- Expo Vector Icons
- React Native Reanimated
- React Navigation

## Project Structure

```text
expense-tracker/
├── backend/
│   ├── config/
│   │   └── db.js
│   ├── models/
│   │   ├── Admin.js
│   │   ├── Expense.js
│   │   └── User.js
│   ├── routes/
│   │   ├── admin.js
│   │   ├── auth.js
│   │   ├── expense.js
│   │   ├── stats.js
│   │   └── usersRoutes.js
│   ├── .env.example
│   ├── server.js
│   └── package.json
└── mobile/
    ├── app/
    │   ├── addExpense.jsx
    │   ├── admin.jsx
    │   ├── adminDash.jsx
    │   ├── adminEdit.jsx
    │   ├── api.js
    │   ├── expense.jsx
    │   ├── globalStyle.js
    │   ├── index.jsx
    │   └── signup.jsx
    ├── assets/
    │   └── images/
    │       └── icon.png
    ├── .env
    ├── app.json
    ├── eas.json
    ├── package.json
    └── tsconfig.json
```

## Prerequisites

- Node.js
- npm
- MongoDB database connection string
- Expo Go app, Android emulator, iOS simulator, or a development build

## Getting Started

Clone the repository and install dependencies for both the backend and mobile app.

```bash
cd backend
npm install

cd ../mobile
npm install
```

## Backend Setup

Create a `.env` file in the `backend` directory (use the provided `.env.example` as a template):

```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
PORT=5000
```

Start the backend server:

```bash
cd backend
npm run dev
```

The API will run at:

```text
http://localhost:5000
```

The root route should return:

```text
Expense Tracker API is running...
```

## Mobile Setup

Start the Expo app:

```bash
cd mobile
npx expo start
```

Then open the app using Expo Go, an Android emulator, an iOS simulator, or the web option from the Expo CLI.

The mobile client automatically tries to detect the local development host and connect to the backend on port `5000`.

You can override the API URL with:

```bash
EXPO_PUBLIC_API_URL=http://your-api-host:5000 npm start
```

Examples:

```bash
EXPO_PUBLIC_API_URL=http://localhost:5000 npm start
EXPO_PUBLIC_API_URL=http://192.168.1.10:5000 npm start
```

For production, you can set the API URL in `mobile/.env`:

```env
EXPO_PUBLIC_API_URL=https://your-production-api.com
```



