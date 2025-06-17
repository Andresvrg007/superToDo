# SuperToDo - Advanced Task Management Application

A full-stack task management application built with **TypeScript**, **Node.js**, **Express**, and **MySQL**. This project provides a comprehensive solution for daily task organization with user authentication and advanced task categorization.

## 🚀 Features

### Authentication System
- **User Registration & Login** with secure password hashing (bcrypt)
- **JWT-based Authentication** with HTTP-only cookies for enhanced security
- **Session Management** with automatic token expiration
- **Email-based User Identification**

### Task Management
- **Daily Tasks** - Organize tasks by specific dates
- **Infinite Tasks** - Long-term goals and ongoing projects
- **Favorite Tasks** - Mark important tasks for quick access
- **CRUD Operations** - Create, read, update, and delete tasks
- **Task Status Tracking** - Mark tasks as completed or pending

### Security Features
- **Password Encryption** using bcrypt
- **HTTP-Only Cookies** to prevent XSS attacks
- **Environment-based Security** (HTTPS in production, HTTP in development)
- **JWT Secret Protection** with environment variables
- **SQL Injection Prevention** using parameterized queries

## 🛠️ Tech Stack

### Backend
- **Runtime:** Node.js
- **Framework:** Express.js
- **Language:** TypeScript
- **Database:** MySQL
- **Authentication:** JSON Web Tokens (JWT)
- **Password Security:** bcrypt
- **Database Client:** mysql2 with Promise support

### Development Tools
- **Process Manager:** Nodemon with ts-node
- **API Testing:** Insomnia/Postman compatible
- **Environment Management:** dotenv
- **CORS:** Enabled for cross-origin requests

## 📁 Project Structure

```
superToDo/
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   │   ├── registerController.ts
│   │   │   └── loginController.ts
│   │   ├── services/
│   │   │   └── database.ts
│   │   ├── routes.ts
│   │   └── app.ts
│   ├── .env
│   ├── package.json
│   ├── tsconfig.json
│   └── nodemon.json
└── frontend/ (to be implemented)
```

## 🗄️ Database Schema

### Users Table
```sql
CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  auth BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Tasks Table (planned)
```sql
CREATE TABLE tasks (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  type ENUM('daily', 'infinite', 'favorite') NOT NULL,
  completed BOOLEAN DEFAULT FALSE,
  due_date DATE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id)
);
```

## 🔧 Installation & Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/superToDo.git
   cd superToDo
   ```

2. **Backend Setup**
   ```bash
   cd backend
   npm install
   ```

3. **Environment Configuration**
   Create a `.env` file in the backend directory:
   ```env
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=your_password
   DB_NAME=supertodo_db
   DB_PORT=3306
   JWT_SECRET=your_super_secret_jwt_key
   PORT=3000
   NODE_ENV=development
   ```

4. **Database Setup**
   - Create a MySQL database named `supertodo_db`
   - Run the SQL schema to create tables

5. **Start Development Server**
   ```bash
   cd backend
   npm run dev
   ```

   The server will start on `http://localhost:3000`

## 📡 API Endpoints

### Authentication
- `POST /api/register` - User registration
  ```json
  {
    "email": "user@example.com",
    "password": "securepassword"
  }
  ```

- `POST /api/login` - User authentication
  ```json
  {
    "email": "user@example.com",
    "password": "securepassword"
  }
  ```

### Tasks (planned)
- `GET /api/tasks` - Get all user tasks
- `POST /api/tasks` - Create new task
- `PUT /api/tasks/:id` - Update specific task
- `DELETE /api/tasks/:id` - Delete specific task
- `GET /api/tasks/daily` - Get daily tasks
- `GET /api/tasks/infinite` - Get infinite tasks
- `GET /api/tasks/favorites` - Get favorite tasks

## 🔒 Security Implementation

### Password Security
- Passwords are hashed using bcrypt with salt rounds
- Original passwords are never stored in the database
- Secure password comparison during authentication

### JWT Authentication
- Tokens are stored in HTTP-only cookies
- Automatic token expiration (1 hour)
- Environment-specific security settings

### Cookie Security
- `httpOnly: true` - Prevents XSS attacks
- `secure: true` in production - HTTPS only
- `maxAge` - Automatic expiration

## 🚀 Development

### Scripts
```bash
# Start development server with auto-reload
npm run dev

# Build TypeScript to JavaScript
npm run build

# Start production server
npm start
```

### TypeScript Configuration
The project uses strict TypeScript configuration with:
- Strong typing for API requests/responses
- Interface definitions for database models
- Type safety for environment variables

## 🔮 Future Features

- [ ] Task categories and tags
- [ ] Task priority levels
- [ ] Task reminders and notifications
- [ ] Task sharing and collaboration
- [ ] Calendar integration
- [ ] Task analytics and reporting
- [ ] Mobile app support
- [ ] Dark/Light theme toggle

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Andre** - [GitHub Profile](https://github.com/your-username)

---

⭐ **If you find this project helpful, please give it a star!** ⭐
