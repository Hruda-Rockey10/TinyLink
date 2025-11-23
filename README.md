# TinyLink ✨

This project was crafted with the help of Antigravity, an advanced AI coding assistant, ensuring premium design and functionality.

## 🎬 Demo

![TinyLink Demo - See the beautiful UI with dark mode, animations, and smooth transitions](./public/demo.webp)

> **Watch the demo above** to see TinyLink in action! Features showcased: smooth dark/light mode toggle with icon rotation, scrolling to view the footer, creating links with auto-generated codes, creating links with custom codes, animated gradient backgrounds, glassmorphism effects, and responsive design.

## ✨ Features

### Core Functionality
- **Shorten URLs**: Create short, memorable links instantly
- **Custom Codes**: Choose your own custom alias (6-8 alphanumeric characters)
- **Analytics Dashboard**: Track clicks and last access time for all your links
- **Link Management**: View, copy, and delete links with ease
- **API**: Full REST API for programmatic access

### Premium UI/UX
- **🌓 Dark Mode**: Seamless dark/light theme toggle with persistent settings
- **✨ Smooth Animations**: Beautiful transitions and micro-interactions throughout
- **🎨 Animated Gradients**: Dynamic, flowing gradient backgrounds
- **💎 Glassmorphism**: Modern frosted-glass card designs
- **🎭 Icon Animations**: Rotating animations on dark mode toggle
- **📱 Fully Responsive**: Optimized for all screen sizes
- **🎯 Modern Typography**: Custom Outfit font family from Google Fonts

## 🛠 Tech Stack

- **Backend**: Node.js, Express
- **Database**: PostgreSQL
- **Frontend**: React 18, Vite
- **Styling**: Tailwind CSS v4 (Oxide Engine)
- **State Management**: React Context API (Dark Mode)
- **Routing**: React Router v6
- **Deployment**: Render / Railway

## Getting Started

### Prerequisites

- Node.js (v18+)
- PostgreSQL database

### Installation

1.  Clone the repository:
    ```bash
    git clone https://github.com/yourusername/tinylink.git
    cd tinylink
    ```

2.  Install dependencies:
    ```bash
    npm install
    cd client && npm install && cd ..
    ```

3.  Set up environment variables:
    Create a `.env` file based on `.env.example` and add your `DATABASE_URL`.
    ```bash
    cp .env.example .env
    ```
    Example `.env`:
    ```
    DATABASE_URL=postgresql://user:password@localhost:5432/tinylink
    BASE_URL=http://localhost:3000
    PORT=3000
    ```

4.  Run migrations:
    ```bash
    npm run migrate
    ```

5.  Start the development servers:
    ```bash
    npm run dev
    ```
    This will start both the backend (port 3000) and frontend (port 5173).

6.  Open `http://localhost:5173` in your browser to see the React app.

## 🎨 UI/UX Highlights

### Design Philosophy
TinyLink features a **premium, modern design** that focuses on aesthetics and user experience:

- **Animated Gradient Backgrounds**: Dynamic, flowing gradients that shift smoothly using CSS keyframe animations
- **Glassmorphism Effects**: Frosted-glass card designs with backdrop blur for a sophisticated look
- **Dark Mode**: Context API-powered theme system with smooth 0.3s transitions on all elements
- **Icon Rotation Animations**: Delightful 360° rotation on the sun/moon icon when toggling themes
- **Gradient Text**: Eye-catching gradient text effects on headings
- **Responsive Layout**: Mobile-first design that scales beautifully across all devices
- **Micro-interactions**: Hover effects, transform animations, and shadow transitions on buttons and cards

### Color Palette
- **Light Mode**: Vibrant gradients (coral, pink, cyan, teal) with purple accents
- **Dark Mode**: Deep gradients (royal blue, violet, pink, sky blue) with indigo accents

## 📋 Project Structure

```
TinyLink/
├── api/               # API route handlers
├── client/            # React frontend
│   ├── src/
│   │   ├── components/   # Reusable UI components
│   │   │   ├── Layout.jsx       # Main layout with header/footer
│   │   │   ├── LinkForm.jsx     # URL submission form
│   │   │   ├── LinkList.jsx     # List of shortened links
│   │   │   └── DeleteModal.jsx  # Confirmation modal
│   │   ├── context/      # React Context providers
│   │   │   └── DarkModeContext.jsx  # Dark mode state management
│   │   ├── pages/        # Page components
│   │   ├── index.css     # Global styles & animations
│   │   └── App.jsx       # Main app router
├── migrations/        # Database migrations
├── public/            # Static assets
├── scripts/           # Utility scripts
├── db.js              # Database connection
├── server.js          # Express server
└── package.json
```

## 🎯 Key Features Breakdown

### Dark Mode Implementation
- Uses React Context API for global state management
- Persists user preference in `localStorage`
- Smooth 300ms transitions on all UI elements
- Animated icon rotation (600ms) when toggling

### Link Management
- Create links with auto-generated or custom codes (6-8 chars)
- Real-time validation and error handling
- Copy-to-clipboard functionality
- Delete with confirmation modal
- Click analytics tracking

## API Documentation

### Create Link
`POST /api/links`

Request:
```json
{
  "url": "https://example.com/very/long/url",
  "code": "custom" // optional
}
```

Response (201 Created):
```json
{
  "code": "custom",
  "url": "https://example.com/very/long/url"
}
```

### List Links
`GET /api/links`

Response (200 OK):
```json
[
  {
    "code": "abc1234",
    "url": "https://google.com",
    "clicks": 5,
    "last_clicked": "2023-10-27T10:00:00.000Z",
    "created_at": "2023-10-26T10:00:00.000Z"
  }
]
```

### Get Link Stats
`GET /api/links/:code`

Response (200 OK):
```json
{
  "code": "abc1234",
  "url": "https://google.com",
  "clicks": 5,
  "last_clicked": "2023-10-27T10:00:00.000Z",
  "created_at": "2023-10-26T10:00:00.000Z"
}
```

### Delete Link
`DELETE /api/links/:code`

Response (200 OK):
```json
{ "ok": true }
```

## Deployment

### Render / Railway

1.  Push code to GitHub.
2.  Create a new Web Service on Render or Railway.
3.  Connect your repository.
4.  Add Environment Variables:
    - `DATABASE_URL`: Your Postgres connection string (you can create a Postgres service on Render/Railway/Neon).
    - `BASE_URL`: Your production URL.
5.  Build Command: `npm install`
6.  Start Command: `npm start`
7.  **Important**: Run the migration. You can add it to the start command `npm run migrate && node server.js` or run it manually via the shell.

## License

MIT

*Built with the help of Antigravity, an advanced AI coding assistant.*
