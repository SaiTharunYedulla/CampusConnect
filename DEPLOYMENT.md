# Deployment Guide

## Backend (Render/Railway)

1. Set environment variables from backend/.env.example.
2. Build command: `npm install`
3. Start command: `npm run start`
4. Ensure MySQL is accessible publicly.

## Frontend (Netlify/Vercel)

1. Deploy `frontend/` folder as static site.
2. Update `frontend/js/config.js` with production API URL.

## Database (Railway/PlanetScale)

1. Create MySQL database.
2. Run `schema.sql`.
3. Optionally run `sample_data.sql` for demo data.
