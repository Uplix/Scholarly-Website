
# 📚 Scholarly Website

The **Scholarly Website** is a web application designed to connect students with peer tutors, allowing them to book tutoring sessions and track academic progress. It provides an easy-to-use platform for both tutors and students, ensuring a smooth learning experience. Additionally, it includes a **staff dashboard** for administrators to manage student accounts, track progress, and oversee tutoring sessions. Administrators also have access to student account privledges and can review reports filed by users.

---

## 🚀 Features
- **User Authentication** – Sign in with Google OAuth for secure and easy login.
- **Tutor Booking** – Tutors can browse and accept student requested sessions.
- **Student Dashboard** – A personalized dashboard for students to track their learning progress and upcoming sessions.
- **Staff Dashboard** – For staff to monitor current and past tutoring sessions, update student account info, track student progress, and follow up on reports.
- **Responsive UI** – Built with Tailwind CSS for a modern, mobile-first design.

---

## 🛠️ Tech Stack
- **Frontend:** React + TypeScript
- **Styling:** Tailwind CSS
- **Backend:** Firebase (Authentication, Realtime Database)
- **Authentication:** Google OAuth for secure login

---

## ⚙️ Installation & Setup

### 1. Clone the repository
```bash
git clone https://github.com/Uplix/Scholarly-Website.git
cd Scholarly-Website
```

### 2. Install dependencies
```bash
npm install
```

### 3. Set up Firebase
- Create a Firebase project in [Firebase Console](https://console.firebase.google.com/).
- Set up Firebase Authentication (Google OAuth).
- Set up Firestore to manage user data.

### 4. Add Firebase credentials
- Add your Firebase configuration to `.env` (following Firebase setup instructions).

### 5. Start the development server
```bash
npm start
```

### 6. Run on device or browser
- Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📁 Project Structure
```
📦 scholarly-website
 ┣ 📂 app/              # Contains the pages for the website and the routing
 ┣ 📂 public/           # Static files (images, icons, etc.)
 ┣ 📂 components/       # Reusable UI components
 ┣ 📂 firebase/         # Firebase configuration
```

---

## 🧠 Future Improvements
- Add in-app messaging for students and tutors
- Implement session reminders and notifications

---

## 👨‍💻 Author
**Andrew Burbank**
📍 UCLA | Computer Science & Engineering
📧 [andrewburbank@ucla.edu](mailto:andrewburbank@ucla.edu)
