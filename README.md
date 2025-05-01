🕵️‍♀️ Candidate Search - Swipe Your Way to Tech Talent! 🚀

Welcome to Candidate Search, the ultimate hiring jam session! Powered by TypeScript, React, and the GitHub API, this app helps you find rockstar developers one profile at a time. Swipe through GitHub users, save your favorites, and build your dream tech team!

🎯 Warning: May cause spontaneous hiring decisions and admiration for clean UIs. 😎

🎬 Live Demo
🔥 Coming soon! The app is rehearsing for its live debut on Render — stay tuned!

✨ Features
🔍 Candidate Browser – View one GitHub profile at a time with real info: name, username, avatar, location, company, and more

💾 Save Favorites – Click the "+" to save candidates to your team

❌ Skip Profiles – Hit the "–" if they’re not your jam

📜 Saved List View – See all your saved candidates in one scrollable setlist

💾 Persistent Data – LocalStorage makes your list stick around between gigs

🧭 Simple Navigation – Easy access between search and saved lists

🛠️ Technologies
🎤 Frontend
⚛️ React + Vite (Our dynamic duo)

🧑‍🎤 TypeScript (For strong typing and smoother solos)

🔀 React Router (For smooth page transitions)

📦 LocalStorage (To store your headliners)

🎧 APIs
🔗 GitHub REST API (Our data stage)

🔐 Personal Access Token for authenticated requests

🚀 Getting Started
Prerequisites
Node.js v18+

npm

GitHub Personal Access Token (how to create one)

Installation
bash
Copy
Edit
git clone https://github.com/Muhsina-de/Candidate-Search.git
cd candidate-search
npm install
Environment Setup
Create a .env file in the environment/ folder:

env
Copy
Edit
VITE_GITHUB_TOKEN=your_personal_access_token_here
Use .env.EXAMPLE for guidance.

Run the App Locally
bash
Copy
Edit
npm run dev
🎯 Usage
Landing Page: Automatically shows the first candidate

Accept (+): Save and move to the next profile

Reject (–): Skip to the next one

Saved Candidates: View your saved headliners (candidates)

Persistence: Your saved list sticks around, even after reloads!

🖼️ Screenshots



📁 Project Structure
bash
Copy
Edit
candidate-search/
Develop/
├── LICENSE
├── environment
├── index.html
├── package-lock.json
├── package.json
├── public
│   └── vite.svg
├── src
│   ├── App.tsx
│   ├── api
│   │   └── API.tsx
│   ├── assets
│   │   └── react.svg
│   ├── components
│   │   └── Nav.tsx
│   ├── index.css
│   ├── interfaces
│   │   └── Candidate.interface.tsx
│   ├── main.tsx
│   ├── pages
│   │   ├── CandidateSearch.tsx
│   │   ├── ErrorPage.tsx
│   │   └── SavedCandidates.tsx
│   ├── styles
│   │   └── CandidateSearch.css
│   ├── utlis
│   │   └── localStorage.ts
│   └── vite-env.d.ts
├── tsconfig.json
├── tsconfig.node.json
└── vite.config.ts

🧑‍🎤 Meet the Dev Team

This app was built as part of the edX TypeScript + React challenge. Shout-out to our mentors, coffee mugs, and GitHub’s amazing API docs!

🤝 Contributing
Wanna jam? Here’s how:

bash
Copy
Edit
git fork candidate-search
git checkout -b feature/NewFeature
# Make your changes
git commit -m "Add epic new feature"
git push origin feature/NewFeature
Open a Pull Request and let’s rock!

📜 License
MIT License. Rock it, remix it, just don’t stop coding. 🎸

🙏 Acknowledgments
edX Bootcamp

GitHub API

React & TypeScript devs everywhere

Tea ☕ – because you can’t code candidates without it