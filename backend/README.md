# CropDoctor Backend

A Node.js backend application for plant disease detection using machine learning.

## Features

- User authentication and authorization
- Image upload and processing
- Plant disease detection using ML models
- Cloudinary integration for image storage
- MongoDB database for data persistence
- RESTful API endpoints
- JWT-based security

## Prerequisites

- Node.js (v16 or higher)
- MongoDB database
- Cloudinary account
- Google Gemini AI API key

## Installation

### Backend Setup

1. Clone the repository
2. Install backend dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory with the following variables:
   ```env
   PORT=6000
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   REFRESH_TOKEN_SECRET=your_refresh_token_secret
   ACCESS_TOKEN_SECRET=your_access_token_secret
   CORS_ORIGIN=http://localhost:3000
   CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
   CLOUDINARY_API_KEY=your_cloudinary_api_key
   CLOUDINARY_API_SECRET=your_cloudinary_api_secret
   GEMINI_API_KEY=your_gemini_api_key_here
   ```

4. Start the backend development server:
   ```bash
   npm run dev
   ```

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install frontend dependencies:
   ```bash
   npm install
   ```

3. Start the frontend development server:
   ```bash
   npm run dev
   ```

4. Open your browser and go to `http://localhost:3000`

## Running the Application

1. **Start the backend server** (in the root directory):
   ```bash
   npm run dev
   ```

2. **Start the frontend server** (in a new terminal, in the frontend directory):
   ```bash
   cd frontend
   npm run dev
   ```

3. **Access the application**:
   - Frontend: `http://localhost:3000`
   - Backend API: `http://localhost:6000`

## AI Integration

This application uses Google's Gemini AI for plant disease detection:

1. **Gemini API Setup**: 
   - Get your API key from [Google AI Studio](https://makersuite.google.com/app/apikey)
   - Add it to your `.env` file as `GEMINI_API_KEY`

2. **How it works**:
   - Images are analyzed using Gemini Pro Vision model
   - The AI provides detailed disease analysis including symptoms, treatment, and prevention
   - Results include confidence scores and detailed recommendations

3. **Fallback**: If Gemini API is unavailable, the system falls back to basic predictions

## API Endpoints

See `API_DOCUMENTATION.md` for complete API documentation.

## Testing

Run the test script to verify functionality:
```bash
node test_api.js
```

## Project Structure

```
src/
├── controllers/     # Request handlers
├── models/         # Database models
├── routes/         # API routes
├── middlewares/    # Custom middlewares
├── utils/          # Utility functions
├── db/            # Database connection
└── app.js         # Express app configuration
```

## License

ISC