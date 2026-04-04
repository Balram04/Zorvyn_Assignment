# Zorvyn Assignment

Simple Node.js auth API with JWT and role support.

## Setup
1. Install dependencies: `npm install`
2. Create `.env` in root:

```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

3. Start server: `npm run dev`

## Base Routes
1. Health: `GET /health`
2. Auth: `/api/auth`
3. Records: `/api/records`
4. Dashboard: `/api/dashboard`
5. Users: `/api/users`

## Auth Flow (Step-by-Step)
1. Register user using `POST /api/auth/register`
2. Password is hashed with `bcryptjs`
3. Login using `POST /api/auth/login`
4. Server validates credentials
5. JWT token is returned (`expiresIn: 1d`)
6. Send token in header for protected routes:
	 `Authorization: Bearer <token>`

## Endpoints
### Register
`POST /api/auth/register`

```json
{
	"name": "Balram",
	"email": "balram@example.com",
	"password": "Pass@123"
}
```

### Login
`POST /api/auth/login`

```json
{
	"email": "balram@example.com",
	"password": "Pass@123"
}
```

Response:

```json
{
	"message": "Login successful",
	"token": "<jwt_token>"
}
```

## Access Control
1. Viewer: can only log in and view their own access-limited data
2. Analyst: can view records and dashboard summaries
3. Admin: can manage records and users

## User Management
Admin-only endpoints:
1. `GET /api/users` - list users
2. `POST /api/users` - create a user
3. `PATCH /api/users/:id/role` - update user role
4. `PATCH /api/users/:id/status` - activate or deactivate a user

Example user create body:

```json
{
	"name": "Balram",
	"email": "balram@example.com",
	"password": "Pass@123",
	"role": "analyst"
}
```

## Middlewares
1. Auth middleware: validates JWT from cookie or Bearer header and sets `req.user`
2. Role middleware: allows access by role (`viewer`, `analyst`, `admin`)

## Records Flow
1. `GET /api/records` for `admin` and `analyst`
2. `POST /api/records`, `PUT /api/records/:id`, and `DELETE /api/records/:id` for `admin`
3. Send JWT as `Authorization: Bearer <token>`

## Current Status
1. Register and login are implemented
2. JWT and role middleware are implemented
3. Protected record routes are implemented
4. Admin user management routes are implemented

