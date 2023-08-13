# ToDoList Web Application

This is a simple web application built using Express.js and MongoDB for creating and managing to-do lists. The application allows you to add, view, and delete tasks in different lists.

## Prerequisites

Before running this application, make sure you have the following software installed:

- Node.js: [Download and install Node.js](https://nodejs.org/)
- MongoDB: [Download and install MongoDB](https://www.mongodb.com/try/download/community)

## Installation

1. Clone or download this repository to your local machine.

```bash
git clone <repository-url>
```

2. Navigate to the project directory.

```bash
cd <project-directory>
```

3. Install the required npm packages.

```bash
npm install
```

## Configuration

1. Rename the `.env.example` file to `.env`.

```bash
mv .env.example .env
```

2. Open the `.env` file and update the `DB_URL` and `PORT` values according to your MongoDB configuration and desired port number.

```plaintext
DB_URL=<your-mongodb-connection-url>
PORT=3000
```

## Usage

1. Start the application.

```bash
node app.js
```

2. Open your web browser and navigate to `http://localhost:3000` (or the port you specified).

3. The default route displays the "Today" list with pre-defined tasks. You can click on the "+" button to add new tasks and use the checkbox to mark tasks as completed. The "<--" button allows you to delete tasks.

4. You can also create custom lists by adding their names to the URL (e.g., `http://localhost:3000/Work`). If a list with the given name already exists, it will be displayed with its tasks. If the list doesn't exist, a new list will be created with default tasks.

5. Navigate to the "About" page by clicking the "About" link in the navigation bar to learn more about this application.

## Features

- Add tasks to different lists.
- Mark tasks as completed.
- Delete tasks from lists.
- Create custom lists.


## Technologies Used

- Express.js: Web application framework for building APIs.
- EJS: Templating engine for rendering views.
- MongoDB: NoSQL database for storing article data.
- Mongoose: MongoDB ODM for modeling and interacting with the database.

---

Feel free to customize and extend this README file according to your needs. Enjoy using the ToDoList web application!
