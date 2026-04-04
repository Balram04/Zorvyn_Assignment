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
2. Auth: `/auth`
3. Records: `/records`

## Auth Flow (Step-by-Step)
1. Register user using `POST /auth/register`
2. Password is hashed with `bcryptjs`
3. Login using `POST /auth/login`
4. Server validates credentials
5. JWT token is returned (`expiresIn: 1d`)
6. Send token in header for protected routes:
	 `Authorization: Bearer <token>`

## Endpoints
### Register
`POST /auth/register`

```json
{
	"name": "Balram",
	"email": "balram@example.com",
	"password": "Pass@123",
	"role": "viewer"
}
```

### Login
`POST /auth/login`

```json
{
	"email": "balram@example.com",
	"password": "Pass@123"
}
```

Response:

```json
{
	"token": "<jwt_token>"
}
```

## Middlewares
1. Auth middleware: validates JWT and sets `req.user`
2. Role middleware: allows access by role (`viewer`, `analyst`, `admin`)

## Records Flow
1. `GET /records` for `admin` and `analyst`
2. `POST /records`, `PUT /records/:id`, and `DELETE /records/:id` for `admin`
3. Send JWT as `Authorization: Bearer <token>`

## Current Status
1. Register and login are implemented
2. JWT and role middleware are implemented
3. Protected record routes are implemented

