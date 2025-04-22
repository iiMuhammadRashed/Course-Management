# Course Management API

This is a RESTful API for managing courses, built with **Node.js**, **Express.js**, and **MongoDB**. It supports CRUD operations for courses, including creating, reading, updating, and deleting course data, with support for single image uploads. The API is designed for a Course Management Dashboard and includes input validation, error handling, and image processing.

## Features
- **CRUD Operations**: Create, read, update, and delete courses.
- **Image Upload**: Upload a single image per course, processed into WebP format.
- **Input Validation**: Ensures data integrity with Joi validation.
- **Pagination and Filtering**: Supports paginated and sorted course listings.
- **Error Handling**: Robust handling of edge cases (e.g., invalid IDs, missing courses).
- **MongoDB**: Uses Mongoose for schema-based data modeling.

## Prerequisites
- **Node.js** (v16 or higher)
- **MongoDB** (local or cloud, e.g., MongoDB Atlas)
- **Git** (for cloning the repository)
- **Vercel CLI** (for deployment)
- **Postman** (optional, for manual testing)

## Installation

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/iiMuhammadRashed/Course-Management.git
   cd course-management
   ```

2. **Install Dependencies**:
   ```bash
   pnpm install
   ```

3. **Set Up Environment Variables**:
   - Create a `.env` file in the root directory:
     ```env
     MONGO_URI=your_mongodb_connection_string
     PORT=5000
     NODE_ENV=development
     CORS_ORIGIN =
     ```
   - Replace `your_mongodb_connection_string` with your MongoDB URI (e.g., from MongoDB Atlas).

4. **Run the Application**:
   - For development (with auto-restart):
     ```bash
     pnpm run dev
     ```
   - For production:
     ```bash
     pnpm start
     ```
   - The API will be available at `https://course-management-nu.vercel.app/api/v1`.

## API Endpoints

| Method | Endpoint                | Description                     |
|--------|-------------------------|---------------------------------|
| GET    | `/courses`          | Retrieve all courses (paginated)|
| GET    | `/courses/:id`      | Retrieve a single course by ID  |
| POST   | `/courses`          | Create a new course            |
| PUT    | `/courses/:id`      | Update an existing course      |
| DELETE | `/courses/:id`      | Delete a course by ID          |

### Request/Response Examples

#### GET /courses
- **Request**:
  ```
  GET /courses?page=1&limit=10&sort=title
  ```
- **Response** (200 OK):
  ```json
  {
    "success": true,
    "data": [
      {
        "_id": "507f1f77bcf86cd799439011",
        "title": "Introduction to Programming",
        "description": "Learn the basics of programming with JavaScript",
        "price": 99.99,
        ...
      },
      ...
    ],
    "pagination": {
      "total": 20,
      "page": 1,
      "limit": 10,
      "totalPages": 2,
      "hasNextPage": true,
      "hasPrevPage": false
    }
  }
  ```

#### GET /courses/:id
- **Request**:
  ```
  GET /courses/507f1f77bcf86cd799439011
  ```
- **Response** (200 OK):
  ```json
  {
    "success": true,
    "data": {
      "_id": "507f1f77bcf86cd799439011",
      "title": "Introduction to Programming",
      "description": "Learn the basics of programming with JavaScript",
      "price": 99.99,
      ...
    }
  }
  ```
- **Error** (404 Not Found):
  ```json
  {
    "success": false,
    "error": "Course not found"
  }
  ```

#### POST /courses
- **Request**:
  - Method: POST
  - URL: `/courses`
  - Body (form-data):
    ```
    title: Introduction to Programming
    description: Learn the basics of programming with JavaScript
    price: 99.99
    startDate: 2025-05-01
    endDate: 2025-07-01
    image: (file upload, e.g., course.jpg)
    ```
- **Response** (201 Created):
  ```json
  {
    "success": true,
    "data": {
      "_id": "507f1f77bcf86cd799439011",
      "title": "Introduction to Programming",
      "description": "Learn the basics of programming with JavaScript",
      "image": "courses/abc123.webp",
      "price": 99.99,
      ...
    }
  }
  ```
- **Error** (400 Bad Request):
  ```json
  {
    "success": false,
    "error": "Title is required, Description must be at least 10 characters"
  }
  ```

#### PUT /courses/:id
- **Request**:
  - Method: PUT
  - URL: `/courses/507f1f77bcf86cd799439011`
  - Body (form-data):
    ```
    title: Advanced Programming
    price: 149.99
    ```
- **Response** (200 OK):
  ```json
  {
    "success": true,
    "data": {
      "_id": "507f1f77bcf86cd799439011",
      "title": "Advanced Programming",
      "price": 149.99,
      ...
    }
  }
  ```
- **Error** (404 Not Found):
  ```json
  {
    "success": false,
    "error": "Course not found"
  }
  ```

#### DELETE /courses/:id
- **Request**:
  - Method: DELETE
  - URL: `/courses/507f1f77bcf86cd799439011`
- **Response** (200 OK):
  ```json
  {
    "success": true,
  }
  ```
- **Error** (404 Not Found):
  ```json
  {
    "success": false,
    "error": "Course not found"
  }
  ```
