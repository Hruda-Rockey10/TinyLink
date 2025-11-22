# TinyLink

A simple, premium URL shortener built with Node.js, Express, and PostgreSQL.

## Features

- **Shorten URLs**: Create short, memorable links.
- **Custom Codes**: Choose your own custom alias (optional).
- **Analytics**: Track clicks and last access time.
- **Responsive UI**: Beautiful, mobile-friendly dashboard.
- **API**: Full REST API for programmatic access.

## Tech Stack

- **Backend**: Node.js, Express
- **Database**: PostgreSQL
- **Frontend**: React, Vite, Tailwind CSS v4
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
