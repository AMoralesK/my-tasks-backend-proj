# My Tasks Backend

## Description

This is the backend for the "My Tasks" application. It provides API endpoints for managing tasks.

## Technologies Used

- Node.js
- Express.js
- MongoDB

## Prerequisites

- Node.js and npm installed on your machine
- MongoDB instance running (local or remote)

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/my-tasks-backend.git
    ```

2. Navigate to the project directory:

```
 cd my-tasks-backend
```

3. Install dependencies:

```
npm install
```

## Configuration

1. Create a `.env` file in the root directory of the project.
2. Add the following environment variables to the `.env` file, replacing the placeholders with your actual values:

```
PORT=3000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
```

## Running the Application

1. Start the development server:


```
npm start
```

2. The server will start running at `http://localhost:3000` (or the port specified in your `.env` file).


## Contributing
If you'd like to contribute to this project, please follow these steps:

1. Fork the repository.
2. Create a new branch for your feature or bug fix.
3. Make your changes and commit them.
4. Push your changes to your forked repository.
5. Submit a pull request to the main repository.

## License
This project is licensed under the MIT License.