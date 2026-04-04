# Zorvyn Assignment - Finance Dashboard Backend

## API Documentation (Postman Ready)

---

## 1. Health Check
```
GET /health
```

**Response (200)**:
```json
{
  "status": "ok",
  "message": "Zorvyn Assignment API is running"
}
```

---

## 2. Authentication

### 2.1 Register (Public)
```
POST /api/auth/register
Content-Type: application/json
```

**Request Body**:
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "Pass@123"
}
```

**Response (201)**:
```json
{
  "message": "User registered successfully",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "viewer",
    "isActive": true,
    "createdAt": "2026-04-05T10:00:00.000Z"
  }
}
```

---

### 2.2 Login (Public)
```
POST /api/auth/login
Content-Type: application/json
```

**Request Body**:
```json
{
  "email": "john@example.com",
  "password": "Pass@123"
}
```

**Response (200)**:
```json
{
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "email": "john@example.com",
    "role": "viewer"
  }
}
```

**For Protected Requests**, use header:
```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

---

### 2.3 Logout (Protected)
```
POST /api/auth/logout
Authorization: Bearer <token>
```

**Response (200)**:
```json
{
  "message": "Logged out successfully"
}
```

---

## 3. User Management (Admin Only)

### 3.1 Get Users (Admin Only)
```
GET /api/users?page=1&limit=10
Authorization: Bearer <admin_token>
```

**Response (200)**:
```json
{
  "data": [
    {
      "id": "507f1f77bcf86cd799439011",
      "name": "John Doe",
      "email": "john@example.com",
      "role": "viewer",
      "isActive": true,
      "createdAt": "2026-04-05T10:00:00.000Z",
      "updatedAt": "2026-04-05T10:00:00.000Z"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 1,
    "pages": 1
  }
}
```

---

### 3.2 Create User (Admin Only)
```
POST /api/users
Authorization: Bearer <admin_token>
Content-Type: application/json
```

**Request Body**:
```json
{
  "name": "Jane Smith",
  "email": "jane@example.com",
  "password": "SecurePass@123",
  "role": "analyst"
}
```

**Response (201)**:
```json
{
  "message": "User created successfully",
  "user": {
    "id": "507f1f77bcf86cd799439012",
    "name": "Jane Smith",
    "email": "jane@example.com",
    "role": "analyst",
    "isActive": true,
    "createdAt": "2026-04-05T10:05:00.000Z",
    "updatedAt": "2026-04-05T10:05:00.000Z"
  }
}
```

---

### 3.3 Update User Role (Admin Only)
```
PATCH /api/users/{userId}/role
Authorization: Bearer <admin_token>
Content-Type: application/json
```

**Request Body**:
```json
{
  "role": "admin"
}
```

**Valid roles**: `viewer`, `analyst`, `admin`

**Response (200)**:
```json
{
  "message": "User role updated",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "admin",
    "isActive": true,
    "createdAt": "2026-04-05T10:00:00.000Z",
    "updatedAt": "2026-04-05T10:10:00.000Z"
  }
}
```

---

### 3.4 Update User Status (Admin Only)
```
PATCH /api/users/{userId}/status
Authorization: Bearer <admin_token>
Content-Type: application/json
```

**Request Body**:
```json
{
  "isActive": false
}
```

**Response (200)**:
```json
{
  "message": "User status updated",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "viewer",
    "isActive": false,
    "createdAt": "2026-04-05T10:00:00.000Z",
    "updatedAt": "2026-04-05T10:15:00.000Z"
  }
}
```

---

## 4. Financial Records (Admin & Analyst)

### 4.1 Get Records
```
GET /api/records?page=1&limit=10&type=income&category=salary&startDate=2026-01-01&endDate=2026-12-31
Authorization: Bearer <token>
```

**Query Parameters**:
- `page`: Page number (default: 1)
- `limit`: Items per page (default: 10)
- `type`: `income` or `expense` (optional)
- `category`: Category name (optional)
- `startDate`: YYYY-MM-DD (optional)
- `endDate`: YYYY-MM-DD (optional)

**Response (200)**:
```json
{
  "data": [
    {
      "_id": "507f1f77bcf86cd799439013",
      "userId": "507f1f77bcf86cd799439011",
      "amount": 5000,
      "type": "income",
      "category": "salary",
      "date": "2026-04-05T00:00:00.000Z",
      "notes": "Monthly salary",
      "isDeleted": false,
      "createdAt": "2026-04-05T10:00:00.000Z",
      "updatedAt": "2026-04-05T10:00:00.000Z"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 1,
    "pages": 1
  }
}
```

---

### 4.2 Create Record (Admin Only)
```
POST /api/records
Authorization: Bearer <admin_token>
Content-Type: application/json
```

**Request Body**:
```json
{
  "amount": 5000,
  "type": "income",
  "category": "salary",
  "date": "2026-04-05",
  "notes": "Monthly salary"
}
```

**Response (201)**:
```json
{
  "_id": "507f1f77bcf86cd799439013",
  "userId": "507f1f77bcf86cd799439011",
  "amount": 5000,
  "type": "income",
  "category": "salary",
  "date": "2026-04-05T00:00:00.000Z",
  "notes": "Monthly salary",
  "isDeleted": false,
  "createdAt": "2026-04-05T10:00:00.000Z",
  "updatedAt": "2026-04-05T10:00:00.000Z"
}
```

---

### 4.3 Update Record (Admin Only)
```
PUT /api/records/{recordId}
Authorization: Bearer <admin_token>
Content-Type: application/json
```

**Request Body**:
```json
{
  "amount": 5500,
  "category": "salary",
  "notes": "Salary + bonus"
}
```

**Response (200)**:
```json
{
  "_id": "507f1f77bcf86cd799439013",
  "userId": "507f1f77bcf86cd799439011",
  "amount": 5500,
  "type": "income",
  "category": "salary",
  "date": "2026-04-05T00:00:00.000Z",
  "notes": "Salary + bonus",
  "isDeleted": false,
  "createdAt": "2026-04-05T10:00:00.000Z",
  "updatedAt": "2026-04-05T10:20:00.000Z"
}
```

---

### 4.4 Delete Record (Admin Only)
```
DELETE /api/records/{recordId}
Authorization: Bearer <admin_token>
```

**Response (200)**:
```json
{
  "message": "Record deleted (soft)"
}
```

---

## 5. Dashboard Summary (Viewer, Analyst, Admin)

### 5.1 Get Summary
```
GET /api/dashboard/summary
Authorization: Bearer <token>
```

**Response (200)**:
```json
{
  "totalIncome": 50000,
  "totalExpense": 15000,
  "netBalance": 35000
}
```

---

### 5.2 Get Category Summary
```
GET /api/dashboard/categories
Authorization: Bearer <token>
```

**Response (200)**:
```json
[
  {
    "_id": "salary",
    "total": 30000
  },
  {
    "_id": "groceries",
    "total": 5000
  },
  {
    "_id": "utilities",
    "total": 1000
  }
]
```

---

### 5.3 Get Monthly Trends
```
GET /api/dashboard/trends
Authorization: Bearer <token>
```

**Response (200)**:
```json
[
  {
    "_id": {
      "month": 1,
      "type": "income"
    },
    "total": 10000
  },
  {
    "_id": {
      "month": 1,
      "type": "expense"
    },
    "total": 3000
  }
]
```

---

### 5.4 Get Recent Activity
```
GET /api/dashboard/recent
Authorization: Bearer <token>
```

**Response (200)**:
```json
[
  {
    "_id": "507f1f77bcf86cd799439013",
    "userId": "507f1f77bcf86cd799439011",
    "amount": 5000,
    "type": "income",
    "category": "salary",
    "date": "2026-04-05T00:00:00.000Z",
    "notes": "Monthly salary",
    "createdAt": "2026-04-05T10:00:00.000Z"
  }
]
```

---

## Error Responses

**Unauthorized (401)**:
```json
{
  "message": "No token provided"
}
```

**Forbidden (403)**:
```json
{
  "message": "Access denied"
}
```

**Not Found (404)**:
```json
{
  "message": "User not found"
}
```

**Bad Request (400)**:
```json
{
  "message": "Name, email, and password are required"
}
```

**Server Error (500)**:
```json
{
  "message": "Internal Server Error"
}
```

---

## Postman Setup

1. **Create new Collection** → `Zorvyn API`

2. **Set Base URL** (Variables tab):
   - Key: `base_url`
   - Value: `http://localhost:5000`

3. **Set Auth Token** (after login):
   - Copy token from login response
   - Paste in request header: `Authorization: Bearer <token>`

4. **Test Flow**:
   - GET /health (verify server)
   - POST /api/auth/register (create user)
   - POST /api/auth/login (get token)
   - POST /api/records (create record using admin token)
   - GET /api/records (view records)
   - GET /api/dashboard/summary (view summary)

---

## Notes
- JWT expires in 24 hours
- Soft delete: records marked deleted but not removed
- Non-admin users see only their own records
- Admin sees all records
- Default new user role: `viewer`
