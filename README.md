# Currency Conversion App

A simple web application that provides up-to-date currency conversion rates using the [Frankfurter API](https://www.frankfurter.app/). The app caches rates in a database for faster server responses.

## Features

- **Real-time Conversion Rates**: Fetches the latest exchange rates from the Frankfurter API.
- **Caching Mechanism**: Stores rates in a database to reduce API calls and improve performance.
- **User-Friendly Interface**: Easy-to-use frontend for quick currency conversions.

## Live Website

https://currency-conversion.onrender.com

### *Note*
MongoDB and Render.com throttle response times without consistent useage so the website takes roughly a minute to respond to user input/conversions

## Prerequisites

- [Node.js](https://nodejs.org/) (version 14 or higher)
- [npm](https://www.npmjs.com/) (Node package manager)
- [MongoDB](https://www.mongodb.com/) (for caching rates)

## Installation

1. **Clone the Repository**:

   ```bash
   git clone https://github.com/Spenner55/currency-conversion-app.git
   cd currency-conversion-app
   ```

2. **Install Backend Dependencies**:

   ```bash
   cd backend
   npm install
   ```

3. **Install Frontend Dependencies**:

   ```bash
   cd ../frontend
   npm install
   ```

## Configuration

1. **Backend Configuration**:

   - Create a `.env` file in the `backend` directory with the following content:

     ```env
     PORT=5000
     MONGODB_URI=your_mongodb_connection_string
     ```

   - Replace `your_mongodb_connection_string` with your actual MongoDB connection string.

2. **Frontend Configuration**:

   - Update the API endpoint in the frontend code if necessary. By default, it assumes the backend runs on `http://localhost:5000`.

## Running the Application

1. **Start the Backend Server**:

   ```bash
   cd backend
   npm start
   ```

   The backend server should now be running on `http://localhost:5000`.

2. **Start the Frontend Server**:

   ```bash
   cd ../frontend
   npm start
   ```

   The frontend should now be running on `http://localhost:3000`.

## Accessing the Application

Open your browser and navigate to `http://localhost:3000` to use the Currency Conversion App.

## Deployment

To deploy the application:

1. **Backend**: Deploy the backend server to a hosting service like [Heroku](https://www.heroku.com/) or [Vercel](https://vercel.com/).

2. **Frontend**: Deploy the frontend to a static site hosting service like [Netlify](https://www.netlify.com/) or [GitHub Pages](https://pages.github.com/).

Ensure that the frontend is configured to make API requests to the deployed backend URL.

## Contributing

Contributions are welcome! Please fork the repository and create a pull request with your changes.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

