```markdown
# 🩺 TEMFC Frontend - Professional Eligibility Checker

A modern React application for healthcare professionals to check their eligibility for the TEMFC exam (Título de Especialista em Medicina de Família e Comunidade) with real-time progress updates.

## 🔗 Live Demo
[https://temfc-checker.vercel.app](https://temfc-checker.vercel.app)

## 🧠 Objective
Provide a user-friendly interface for medical professionals to verify their eligibility for the TEMFC exam by analyzing their professional history from CNES data, with real-time feedback during the verification process.

## 🚀 Main Technologies
- **React 18**
- **Styled Components**
- **Axios**
- **Server-Sent Events (SSE)**
- **Vite**
- **Headless UI**
- **Lottie Animations**

## 📦 Features
- ✅ Clean, responsive UI optimized for all devices
- ⏳ Real-time progress updates using Server-Sent Events
- 🔍 Detailed eligibility results with validation criteria
- 📝 User-friendly form with validation
- 🔒 Terms and conditions agreement
- 📊 Visual feedback with animated success/failure states
- 🌙 Optimized for accessibility

## 🏗️ Project Structure
```
TEMFC-frontend/
├── src/
│   ├── api/
│   │   └── eligibilityApi.js
│   ├── components/
│   │   ├── Button.jsx
│   │   ├── CriteriaDialog.jsx
│   │   ├── EligibilityResult.jsx
│   │   ├── FormInput.jsx
│   │   ├── Loading.jsx
│   │   ├── TermsAgreementDialog.jsx
│   │   └── UserForm.jsx
│   ├── hooks/
│   │   └── useEligibilityCheck.js
│   ├── pages/
│   │   └── Home.jsx
│   ├── styles/
│   │   ├── globalStyles.js
│   │   └── theme.js
│   ├── utils/
│   │   ├── formatters.js
│   │   └── validators.js
│   ├── App.jsx
│   └── main.jsx
├── package.json
├── vite.config.js
└── README.md
```

## ⚙️ Running Locally
### Prerequisites:
- **Node.js 18+**
- **npm or yarn**

### Steps:
1. Clone the repo:
  ```bash
  git clone https://github.com/victortsrodrigues/TEMFC-frontend.git
  cd TEMFC-frontend
  ```

2. Install dependencies:
  ```bash
  npm install
  # or
  yarn
  ```

3. Run the development server:
  ```bash
  npm run dev
  # or
  yarn dev
  ```

  Then open: [http://localhost:5173](http://localhost:5173)

## 🐳 Running with Docker
### Prerequisites:
- **Docker**

### Steps:
1. Build the Docker image:
   ```bash
   docker build -t temfc-frontend .
   ```

2. Run the container:
   ```bash
   docker run -d -p 80:80 temfc-frontend
   ```

3. Open the application in your browser:
   [http://localhost](http://localhost)

### Dockerfile Example:
```dockerfile
# Stage 1: Build the React application
FROM node:18 AS builder
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install
COPY . .
RUN yarn build

# Stage 2: Serve with Nginx
FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

## 🚀 Building for Production
```bash
npm run build
# or
yarn build
```

The build artifacts will be stored in the `dist/` directory.

## 🔄 Application Flow
1. User enters their full name and CPF in the form.
2. User accepts terms and conditions.
3. Application sends data to the backend API.
4. Real-time progress updates are displayed via SSE.
5. Final eligibility result is shown with detailed information.
6. User can start a new verification if needed.

## 🧩 Key Components
- **UserForm**: Handles user input with validation for CPF and name.
- **Loading**: Displays real-time progress updates during the eligibility check process.
- **EligibilityResult**: Shows the final result with detailed information about the professional's eligibility status.
- **CriteriaDialog**: Explains the criteria used for eligibility determination.
- **TermsAgreementDialog**: Ensures users understand the limitations and responsibilities before proceeding.

## 📤 API Integration
The application communicates with the TEMFC Backend API:
- Initial `POST` request to start the verification process.
- Establishes SSE connection for real-time updates.
- Processes progress events to update the UI.
- Handles the final result or any errors.

### Example implementation in `useEligibilityCheck.js`:
```javascript
const checkUserEligibilitySSE = useCallback(
  (userData) => {
   setLoading(true);
   setProgress({ step: 0, message: "Iniciando...", percentage: 0 });
   setResult(null);
   setError(null);

   checkEligibilitySSE(userData, {
    onConnected: (data) => {
      console.log("SSE connection established", data);
    },
    onProgress: (progressData) => {
      setProgress({
       step: progressData.step || 0,
       message: progressData.message || "",
       percentage:
        progressData.percentage !== undefined
          ? progressData.percentage
          : progress.percentage,
       status: progressData.status || "in_progress",
      });
    },
    onComplete: (resultData) => {
      setResult(resultData);
      setLoading(false);
      setProgress((prev) => ({
       ...prev,
       percentage: 100,
       status: "completed",
      }));
    },
    onError: (errorData) => {
      console.error("Eligibility check error:", errorData);
      setError(errorData);
      setLoading(false);
    },
   });
  },
  [progress.percentage]
);
```

## 📱 Responsive Design
The application is fully responsive and optimized for:
- Desktop computers
- Tablets
- Mobile phones

Responsive design is implemented using `styled-components` with media queries based on theme breakpoints.

## 📬 Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you'd like to change.

## 🛡️ License
MIT © Victor Rodrigues
```
