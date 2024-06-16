# Warehouse Application

This is a warehouse management application built with Angular for the frontend and NestJS for the backend.

## Prerequisites

- Node.js and npm installed (You can download them from [here](https://nodejs.org/en/download/))
- Access to a MongoDB cluster in the cloud (MongoDB Atlas)
## Running the Application Locally

### Backend

1. Navigate to the backend directory:

    ```bash
    cd backend
    ```

2. Install the dependencies:

    ```bash
    npm install
    ```

3. Configure the MongoDB connection:

   Create a `.env` file in the `backend` directory with the following content, replacing `<username>`, `<password>` with provided MongoDB Atlas credentials:

    ```env
    DB_USERNAME=<username>
    DB_PASSWORD=<password>
   ```
4. Start the server:

    ```bash
    npm run start:dev
    ```

   The backend server should now be running on `http://localhost:3000`.

### Frontend

1. Navigate to the frontend directory:

    ```bash
    cd frontend
    ```

2. Install the dependencies:

    ```bash
    npm install
    ```

3. Start the application:

    ```bash
    npm start
    ```

   The application should now be running on `http://localhost:4200`.

## Database Initialization

To initialize the database, you need to run a script that sets up the initial data.

### Database Initialization Script

The database initialization script is part of the backend service. It runs automatically when the backend server starts.

The script is located in the `backend/src/database/database-init.service.ts` file and is executed during the application bootstrap process.

### Running the Database Initialization Script

1. Start the backend server as described above. The database initialization script will run automatically.

## Running Tests

### Backend Tests

1. Navigate to the backend directory:

    ```bash
    cd backend
    ```

2. Run the tests:

    ```bash
    npm test
    ```

### Frontend Tests

1. Navigate to the frontend directory:

    ```bash
    cd frontend
    ```

2. Run the tests:

    ```bash
    npm test
    ```

## Project Structure

### Backend

The backend is built with NestJS and follows a modular structure. Key directories and files include:

- `src/app.module.ts`: The root module of the application.
- `src/database/database-init.service.ts`: The service responsible for initializing the database with initial data.
- `src/schemas/item.schema.ts`: The Mongoose schema for items.
- `src/schemas/shipment.schema.ts`: The Mongoose schema for shipments.

### Frontend

The frontend is built with Angular and follows a component-based architecture. Key directories and files include:

- `src/app/app.module.ts`: The root module of the application.
- `src/app/components/list-item/list-item.component.ts`: The component for displaying individual items.
- `src/app/services/item.service.ts`: The service for interacting with the backend API for items.

## Environment Variables

The application uses environment variables for configuration. The `.env` file in the backend directory should contain the following variables:

```
DB_USERNAME=''
DB_PASSWORD=''
```

---
