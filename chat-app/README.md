Chat App - React Frontend

This is a React-based frontend application for a chat interface. It integrates with a backend API to send and receive messages, and it supports features like dynamic rendering, authentication, and geospatial data visualization.

Prerequisites

Before running the application, ensure you have the following installed:

Node.js (v16 or higher)

npm (v8 or higher)

Installation

Clone the Repository

git clone https://github.com/ishancoderr/STACHAT-UI.git

Navigate to the Project Directory

cd STACHAT-UI

Install Dependencies

npm install

Environment Variables

To run the application, you need to set up the following environment variables. Create a .env file in the root directory and add the following:

REACT_APP_WEBHOOK_SECRET=your_webhook_secret
REACT_APP_API_URL=http://localhost:8000

Replace your_webhook_secret with your actual webhook secret and http://localhost:8000 with the URL of your backend API.

Running the Application

Start the Development Server

npm start

Open the App

Navigate to:

http://localhost:3000

Available Scripts

npm start: Runs the app in development mode.

npm build: Builds the app for production.

npm test: Launches the test runner.

npm eject: Ejects the app from Create React App (use with caution).

Dependencies

The project uses the following key dependencies:

React: Frontend library for building user interfaces.

Material-UI (MUI): Component library for styling and UI components.

CryptoJS: For HMAC SHA256 encryption.

Leaflet: For geospatial data visualization.

Framer Motion: For animations.

For a full list of dependencies, check the package.json file.

Project Structure

STACHAT-UI/
├── public/              # Static assets
├── src/                 # Source code
│   ├── components/      # React components
│   ├── App.js           # Main application component
│   ├── index.js         # Entry point
│   └── styles/          # CSS or styling files
├── .env                 # Environment variables
├── package.json         # Project dependencies
└── README.md            # Project documentation

License

This project is licensed under the MIT License. See the LICENSE file for details.

Acknowledgments

OpenAI GPT Models: Used for generating responses to user queries.

Neo4j: Used for storing and retrieving geospatial data.

STAC Collections: Provided the dataset for querying satellite and geospatial information.

Support

For any issues or questions, please open an issue on the GitHub repository.

