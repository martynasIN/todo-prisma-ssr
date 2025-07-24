# Simple Todo App (SSR, Node, Express, Prisma)

A simple server-side rendered (SSR) Todo application built with Node.js, Express, Prisma (SQLite), and EJS. Includes user registration, login, and per-user task management with secure authentication and authorization.

## Features
- User registration and login (with hashed passwords)
- Only authenticated users can view, add, edit, or delete their own todos
- Server-side rendered UI with EJS
- Clean MVC project structure
- SQLite database via Prisma ORM

## Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (v16+ recommended)
- [npm](https://www.npmjs.com/)

### Installation
1. Clone the repository:
   ```sh
   git clone <repo-url>
   cd simple-todo-app
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Set up the database and Prisma:
   ```sh
   npx prisma migrate dev --name init
   npx prisma migrate dev --name add-user-model
   npx prisma generate
   ```
   > If you encounter migration issues, you can reset the database with:
   > ```sh
   > npx prisma migrate reset --force
   > ```

### Running the App
Start the development server:
```sh
node app.js
```
Visit [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure
```
models/         # Prisma-based data models
controllers/    # Route controllers (business logic)
routes/         # Express route definitions
middlewares/    # Custom authentication/authorization middleware
views/          # EJS templates for SSR
public/         # Static assets (CSS)
prisma/         # Prisma schema and migrations
app.js          # Main Express app entry point
```

## Usage
- Register a new account at `/register`
- Log in at `/login`
- Add, complete, or delete your own todos
- Only your own todos are visible and manageable

## Security Notes
- Passwords are hashed with bcryptjs
- Sessions are managed with express-session
- All todo actions are protected and authorized per user

## License
MIT 

## About the Template Engine: EJS

[EJS](https://ejs.co/) (Embedded JavaScript) is a simple templating language that lets you generate HTML markup with plain JavaScript. It is used in this project for server-side rendering of views.

### How EJS is Used Here
- All UI pages (login, register, todo list) are rendered using `.ejs` templates in the `views/` directory.
- Data from controllers is passed to EJS templates and rendered into HTML before being sent to the browser.
- EJS allows embedding JavaScript logic (like loops and conditionals) directly in your HTML.

### Basic EJS Syntax Example
```ejs
<ul>
  <% todos.forEach(todo => { %>
    <li><%= todo.title %></li>
  <% }) %>
</ul>
```
- `<% ... %>`: Run JavaScript code (no output)
- `<%= ... %>`: Output the value (escaped)
- `<%- ... %>`: Output unescaped HTML

For more, see the [EJS documentation](https://ejs.co/#docs). 