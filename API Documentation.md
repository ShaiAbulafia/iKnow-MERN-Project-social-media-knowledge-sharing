# iKnow Server API Documentation

Welcome to the API documentation for the iKnow Server. This documentation provides details about the available API endpoints, their request and response structures, and usage examples.

## Base URL

The base URL for all API requests is: `http://localhost:3000`

## Authentication

Before making requests to protected routes, make sure to include an `Authorization` header with a valid JSON Web Token (JWT) obtained from the authentication endpoint.

## Endpoints

### Authentication

#### POST /api/users

Register a new user.

**Request:**

```json
{
  "username": "example_user",
  "email": "user@example.com",
  "password": "password123"
}
```

**Response:**

```json
{
  "message": "Registration successful",
  "user": {
    "_id": "user_id",
    "username": "example_user",
    "email": "user@example.com"
  }
}
```
