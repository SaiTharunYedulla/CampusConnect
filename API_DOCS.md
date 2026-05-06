# CampusConnect API Documentation

## Base URL

`/api`

## Auth

- `POST /auth/register`
- `POST /auth/login`
- `GET /auth/me`

## Posts

- `GET /posts/feed`
- `POST /posts`
- `GET /posts/mine`
- `PUT /posts/:id`
- `DELETE /posts/:id`
- `POST /posts/:id/upvote`
- `GET /posts/trending`

## Approvals

- `GET /approvals/pending`
- `POST /approvals/:postId/approve`
- `POST /approvals/:postId/reject`
- `POST /approvals/:postId/revision`
- `GET /approvals/history`

## Leaderboard

- `GET /leaderboard`
- `GET /leaderboard/monthly`
- `GET /leaderboard/department/:dept`
- `GET /leaderboard/top/:n`

## Analytics

- `GET /analytics/overview`
- `GET /analytics/department-performance`
- `GET /analytics/monthly-activity`
- `GET /analytics/top-students`

## Communities

- `GET /communities`
- `GET /communities/:dept/posts`
- `GET /communities/profile/:userId`

## Search

- `GET /search?q=&type=`

## Reports

- `GET /reports/pdf?top=10&dept=CSE`
- `GET /reports/excel?top=10&dept=CSE`
