# Eligibility Checker Application

A React application that checks and displays user eligibility for exams based on their information. This single-page application uses Vite, styled-components, and communicates with a backend API using Server-Sent Events (SSE).

## Features

- User input validation for CPF and name
- Real-time progress tracking with Server-Sent Events
- Responsive design
- Elegant error handling
- Clear eligibility results display

## Getting Started

### Prerequisites

- Node.js (v16 or later recommended)
- npm or yarn

### Installation

1. Clone the repository or download the source code

2. Navigate to the project directory
```
cd eligibility-checker-app
```

3. Install dependencies
```
npm install
```

4. Start the development server
```
npm run dev
```

5. Open your browser and navigate to `http://localhost:3000`

## Usage

1. Enter your 11-digit CPF number and full name
2. Click "Check Eligibility"
3. Wait for the system to process your request
4. View your eligibility results

## Building for Production

To build the application for production, run:

```
npm run build
```

The build files will be located in the `dist` directory, which you can deploy to your web server.

## Project Structure

- `src/components`: Reusable UI components
- `src/api`: API service functions
- `src/hooks`: Custom React hooks
- `src/contexts`: React context providers
- `src/utils`: Utility functions for validation and formatting
- `src/styles`: Global styles and theme configuration
- `src/pages`: Page components

## Technologies Used

- React 18
- Vite
- styled-components
- Axios
- Server-Sent Events (SSE)