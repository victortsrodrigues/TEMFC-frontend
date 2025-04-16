# 🩺 TEMFC Frontend – Professional Eligibility Checker

![Build](https://img.shields.io/github/actions/workflow/status/victortsrodrigues/TEMFC-frontend/ci-cd.yml?branch=main)
![Version](https://img.shields.io/npm/v/temfc-frontend)
![Docker Pulls](https://img.shields.io/docker/pulls/victortsrodrigues/temfc-frontend)
[![License: MIT](https://img.shields.io/github/license/victortsrodrigues/TEMFC-frontend)](https://opensource.org/licenses/MIT)

**A React + Vite web application that lets medical professionals check their eligibility for the TEMFC exam via a real‑time, SSE‑driven interface.**

🔗 **Live Demo**: [https://temfc-frontend.onrender.com](https://temfc-frontend.onrender.com)

---

## 🧠 Objective
Provide a fast, user‑friendly interface for healthcare professionals to submit their CPF and name, track processing progress in real time, and receive instant eligibility results for the TEMFC exam.

---

## 🚀 Main Technologies
- **Framework**: React 18 + Vite  
- **HTTP Client**: Axios  
- **Real‑Time**: Server‑Sent Events (EventSource)  
- **Styling**: Styled‑Components / CSS‑in‑JS 
- **Containerization**: Node.js & Nginx Docker images  
- **CD**: GitHub Actions → Docker Hub → Vercel
- **UI/UX**: Headless UI, Lottie Animations

---

## 📦 Features
- ✅ **Responsive UI** with form validation  
- ⏳ **Real-time progress updates** via SSE
- 🔍 **Detailed eligibility results** with validation criteria
- 📝 **Input sanitization** and error handling
- 🔒 **Terms and conditions** agreement
- 🐳 **Dockerized** for consistent deployment  
- 🔁 **Automated CD** pipeline  

---

## 🏗️ Project Structure
```
TEMFC-frontend/
├── src/
│ ├── api/
│ │ └── eligibilityApi.js
│ ├── components/
│ ├── hooks/
│ ├── pages/
│ ├── styles/
│ ├── utils/
│ ├── App.jsx
│ └── main.jsx
├── index.html
├── .env
├── .env.example
├── public/
├── Dockerfile
├── nginx/nginx.conf
├── vite.config.js
├── package.json
├── jest.config.js
├── .eslintrc.js
└── .github/workflows/cd.yml
```

---

## ⚙️ Running Locally

### Prerequisites
- Node.js 18+ & npm  
- A running instance of the TEMFC Backend API  

### 1. Clone the repo
```bash
git clone https://github.com/victortsrodrigues/TEMFC-frontend.git
cd TEMFC-frontend
```

### 2. Install dependencies
```bash
npm install
```

### 3. Configure environment variables
Create a `.env` file in the root directory:
```
VITE_API_BASE_URL=https://your-api-url.com
```
⚠️ **Never commit `.env`. Add it to `.gitignore`.**

### 4. Start development server
```bash
npm run dev
```
Then open: [http://localhost:5173](http://localhost:5173)

---

## 🐳 Docker

### Build and run with Docker:
```bash
docker build -t temfc-frontend .
docker run --rm -p 8080:80 --env-file .env temfc-frontend
```

---

## 🔁 CD with GitHub Actions

Full CD pipeline:
- Build Docker image and push to Docker Hub
- Deploy to Vercel automatically on `main` branch

Pipeline file: `.github/workflows/cd.yml`

---

## 🔄 User Flow

1. User enters their full name and CPF in the form.
2. User accepts terms and conditions.
3. App sends POST via Axios to backend
4. Backend processes and streams SSE updates
5. Frontend displays live progress & eligibility result with detailed information.
6. User can start a new verification if needed.

---

## 📱 Responsive Design
The application is fully responsive and optimized for:
- Desktop computers
- Tablets
- Mobile phones

Responsive design is implemented using `styled-components` with media queries based on theme breakpoints.

---

## 📬 Contributing
Pull requests are welcome!  
For major changes, please open an issue first to discuss what you'd like to change.

To contribute:
1. Fork the repository  
2. Create a feature branch  
3. Commit your changes with clear messages  
4. Ensure tests are included if applicable  
5. Open a pull request 

---

## 🛡️ License
MIT © [Victor Rodrigues](https://github.com/victortsrodrigues)