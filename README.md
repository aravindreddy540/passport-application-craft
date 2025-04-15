
# DS-160 Visa Application System

A web application for completing and submitting DS-160 nonimmigrant visa applications with MongoDB storage.

## Features

- Multi-step form for DS-160 visa application
- Progress saving and auto-save functionality
- MongoDB integration for data storage
- Form validation and error handling
- Responsive design

## Tech Stack

- **Frontend**: React with Vite, TypeScript, Tailwind CSS, shadcn/ui
- **Backend**: Node.js, Express
- **Database**: MongoDB
- **Form Handling**: React Hook Form with Zod validation

## Project Structure

```
├── server/             # Backend server code
│   ├── index.js        # Express server and MongoDB connection
│   └── .env            # Environment variables
│
├── src/                # Frontend React application
│   ├── components/     # React components
│   │   ├── DS160Form.tsx          # Main form component
│   │   └── FormSteps/             # Individual form step components
│   │       ├── PersonalInfoForm.tsx
│   │       ├── ContactInfoForm.tsx
│   │       ├── PassportInfoForm.tsx
│   │       └── ...
│   │
│   ├── context/        # React context for state management
│   │   └── FormContext.tsx
│   │
│   ├── services/       # API services
│   │   └── api.ts
│   │
│   └── pages/          # Application pages
│       └── Index.tsx   # Main application page
```

## Setup and Installation

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- MongoDB (local or Atlas)

### Backend Setup

1. Create a `.env` file in the `server` directory with your MongoDB connection string:

```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/ds160-app
```

2. Install dependencies and start the server:

```bash
cd server
npm install
node index.js
```

The server will start on http://localhost:5000.

### Frontend Setup

1. Install dependencies and start the development server:

```bash
npm install
npm run dev
```

The application will be available at http://localhost:8080.

## MongoDB Schema

The application uses the following MongoDB schema for storing DS-160 applications:

- **Personal Information**: Name, gender, date of birth, etc.
- **Contact Information**: Email, phone, address
- **Passport Information**: Passport number, issue/expiry dates
- **Travel Information**: Purpose of travel, intended dates
- **Previous US Travel**: Previous visits to the US
- **Employment Information**: Current employment details
- **Education Information**: Educational history
- **Security Questions**: Required security questions

## Deployment

1. Build the frontend:

```bash
npm run build
```

2. Deploy the backend to your preferred hosting service.
3. Configure environment variables for production.
4. Connect to a production MongoDB database.

## License

MIT
