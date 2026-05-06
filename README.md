# Student Professional Portfolio & Teacher Approval Platform

A LinkedIn-inspired academic platform where student achievements become public after teacher review.

## Architecture

```mermaid
graph LR
  A[Browser] -->|REST + JWT| B[Node.js + Express]
  B --> C[MySQL]
  B --> D[Cloudinary]
```

## ER Diagram

```mermaid
erDiagram
  USERS ||--|| STUDENTS : has
  USERS ||--|| TEACHERS : has
  STUDENTS ||--o{ POSTS : creates
  POSTS ||--o{ POST_MEDIA : contains
  POSTS ||--|| APPROVALS : reviewed
  POSTS ||--o{ REVISIONS : needs
  USERS ||--o{ UPVOTES : reacts
  STUDENTS ||--o{ STUDENT_BADGES : earns
  BADGES ||--o{ STUDENT_BADGES : maps
```

## Local Setup

### Backend

1. `cd backend`
2. `npm install`
3. Create `.env` from `backend/.env.example`
4. `npm run dev`

### Frontend

1. Serve `frontend/` with any static server.
2. Update `frontend/js/config.js` to point to backend URL.

## Scripts

- Backend: `npm run dev` or `npm start`

## Documentation

- API documentation: [API_DOCS.md](API_DOCS.md)
- Deployment steps: [DEPLOYMENT.md](DEPLOYMENT.md)

## Notes

- Reports export use `/api/reports/pdf` and `/api/reports/excel`.
- File uploads use Cloudinary by default.
