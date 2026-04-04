# Zorvyn Assignment - Finance Dashboard Backend

Node.js finance API with JWT authentication and role-based access control.

## Quick Start

```bash
# Install
npm install

# Setup .env
echo "PORT=5000
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_secret" > .env

# Run
npm run dev
```

## Project Structure
```
src/
  ├── models/           # User, Record schemas
  ├── controllers/      # Main business logic
  ├── routes/           # API endpoints
  ├── middlewares/      # Auth, role, validation, error
  └── config/           # DB connection
```

## Key Features

✅ JWT Authentication (register, login, logout)  
✅ Role-Based Access Control (viewer, analyst, admin)  
✅ User Management (admin only)  
✅ Financial Records CRUD (admin only)  
✅ Dashboard Summaries (analytics)  
✅ Pagination & Filtering  
✅ Input Validation  
✅ Soft Delete  

## Roles

| Role    | Permissions |
|---------|-------------|
| Viewer  | View dashboard and own summary data |
| Analyst | View records & dashboard |
| Admin   | Manage all records & users |

## First Admin Setup

Public register creates a user with viewer role by default.

Use this one-time bootstrap flow:
1. Register a normal user from POST /api/auth/register
2. Promote that user to admin directly in database
3. Login with that account
4. Use admin APIs to manage other users and roles

Example Mongo update:

```js
db.users.updateOne(
  { email: "your-admin-email@example.com" },
  { $set: { role: "admin" } }
)
```

Security note:
- Keep public register role fixed to viewer
- Do not hardcode real emails, passwords, or secrets in README

## API Quick Reference

| Endpoint | Method | Auth | Role |
|----------|--------|------|------|
| `/health` | GET | - | - |
| `/api/auth/register` | POST | - | - |
| `/api/auth/login` | POST | - | - |
| `/api/auth/logout` | POST | ✓ | - |
| `/api/users` | GET | ✓ | Admin |
| `/api/users` | POST | ✓ | Admin |
| `/api/users/:id/role` | PATCH | ✓ | Admin |
| `/api/users/:id/status` | PATCH | ✓ | Admin |
| `/api/records` | GET | ✓ | Analyst+ |
| `/api/records` | POST | ✓ | Admin |
| `/api/records/:id` | PUT | ✓ | Admin |
| `/api/records/:id` | DELETE | ✓ | Admin |
| `/api/dashboard/summary` | GET | ✓ | Viewer+ |
| `/api/dashboard/categories` | GET | ✓ | Viewer+ |
| `/api/dashboard/trends` | GET | ✓ | Viewer+ |
| `/api/dashboard/recent` | GET | ✓ | Viewer+ |

**Full API documentation with JSON examples**: See [API_DOCUMENTATION.md](API_DOCUMENTATION.md)

## Technologies

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB
- **Auth**: JWT + bcryptjs
- **Validation**: express-validator

