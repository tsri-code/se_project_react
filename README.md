# WTWR (What to Wear?)

## Description

WTWR is a full-stack weather-based clothing recommendation application that helps users decide what to wear based on current weather conditions. The app features user authentication, personal clothing collections, and interactive like/dislike functionality for clothing items.

## Functionality

- **Weather Integration**: Fetches real-time weather data based on user location
- **User Authentication**: Complete signup, login, and logout functionality with JWT tokens
- **Personal Profile**: Users can manage their profile information and avatar
- **Clothing Management**: Add, view, and delete personal clothing items
- **Smart Recommendations**: Get clothing suggestions based on current weather
- **Interactive Features**: Like and unlike clothing items
- **Protected Routes**: Secure access to personal areas
- **Responsive Design**: Clean, modern interface that works across devices

## Technologies and Techniques Used

**Frontend:**

- **React** - Modern React with hooks and functional components
- **Vite** - Fast build tool and development server
- **React Router v6** - Client-side routing with protected routes
- **Context API** - Global state management for user and temperature unit
- **JSX** - Component-based UI development
- **CSS3** - Modern styling with flexbox and custom properties
- **JavaScript ES6+** - Modern JavaScript features

**Backend Integration:**

- **RESTful API** - Full CRUD operations for clothing items and user management
- **JWT Authentication** - Secure token-based authentication
- **Protected API Calls** - Authorization headers for secure endpoints
- **MongoDB Integration** - Database operations through Express backend

**Development Tools:**

- **ESLint** - Code linting and style enforcement
- **Prettier** - Code formatting
- **Git** - Version control
- **GitHub Pages** - Deployment

## Backend Repository

🔗 **Backend API Repository**: [se_project_express](https://github.com/tsri-code/se_project_express)

The backend provides:

- User authentication endpoints (/signup, /signin, /users/me)
- Clothing item CRUD operations (/items)
- Like functionality (/items/:id/likes)
- Protected routes with JWT middleware

## Project Features

### 🌤️ Weather Integration

- Real-time weather data from OpenWeatherMap API
- Temperature unit toggle (Fahrenheit/Celsius)
- Location-based weather forecasting

### 👤 User Management

- User registration and login
- Profile editing (name and avatar)
- Secure JWT token authentication
- Protected profile routes

### 👕 Clothing Collection

- Add clothing items with images and weather categories
- View personal clothing collection
- Delete owned items
- Weather-based filtering

### ❤️ Interactive Features

- Like/unlike clothing items
- Visual feedback with heart icons
- Real-time updates

## Installation and Setup

1. Clone the repository:

```bash
git clone https://github.com/tsri-code/se_project_react.git
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

4. Build for production:

```bash
npm run build
```

## Full-Stack Development

This project represents a complete full-stack application connecting:

- **Frontend** (this repo): React application on port 3000
- **Backend**: Express.js API on port 3001
- **Database**: MongoDB for data persistence

For full functionality, both frontend and backend servers should be running simultaneously.

---

**Developed by Sridhar Tiwari** |
