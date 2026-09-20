# ⚡ Custom MERN Starter & Enterprise Theme

[![React](https://img.shields.io/badge/React-19.0.0-61DAFB?style=flat-square&logo=react&logoColor=black)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-8.3.0-646CFF?style=flat-square&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Material UI](https://img.shields.io/badge/MUI-v7-007FFF?style=flat-square&logo=mui&logoColor=white)](https://mui.com/)
[![Express](https://img.shields.io/badge/Express-5.0.0-000000?style=flat-square&logo=express&logoColor=white)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Mongoose-47A248?style=flat-square&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-teal.svg?style=flat-square)](LICENSE)

A modern, production-grade **MERN Stack Starter & Theme** built with **React**, **Vite**, **Material UI (MUI)**, **Express 5**, and **MongoDB**. Featuring a tokenized design system (Light/Dark mode), pixel-aligned responsive layout, strict Role-Based Access Control (RBAC), Formik + Yup form engine, automated JWT session rotation, database seeding, and optimized API controllers.

---

## 🚀 Key Features

### 🎨 Frontend (`client/`)

- **Curated Tokenized Design System**:
  - Dynamic Teal/Cyan brand palette (`#008781` / `#00DAD1`) with deep oceanic dark mode surfaces (`#072228` / `#010306`).
  - Seamless instant Light/Dark mode switching with persistent state.
- **Pixel-Aligned Layout Architecture**:
  - Pinned **64px desktop Header and Sidebar Brand Container** with synchronized horizontal borders.
  - Collapsible desktop drawer (`76px` mini mode vs `260px` expanded mode) with responsive mobile drawer overlay.
  - Interactive brand header with ambient breathing shimmer, hover tilt, and elevation.
- **Modern Branded UI Loader**:
  - High-speed orbiting spinner ring paired with an outer pulsing sonar wave ring.
  - Centered theme gradient brand emblem (`M` badge) with subtle breathing pulse.
  - Animated typography with sequentially bouncing status dots (`. . .`).
  - Preserves standard container sizing (`minHeight: 100vh`, `width: 100%`) without fixed viewport overlays—keeping navigation and header fully visible during page transitions.
- **Component Atoms & Organisms**:
  - Reusable components: `DataTable`, `TabBar`, `Avatar`, `PageHeader`, `AlertBanner`, `CardBox`, `Button`, `IconButton`, `FileDropzone`, `ConfirmDialog`, and `Modal`.
- **Authentication & RBAC**:
  - Route guards: `<AuthGuard>` (session check) and `<RoleGuard>` (permission matrix).
  - Three hierarchical roles: `Admin`, `Manager`, and `User`.
  - Silent token verification on initial app boot.
- **Form Engine**:
  - Pre-wired `Formik` + `Yup` field adapters (`FormikTextInput`, `FormikSelectInput`, `FormikCheckboxInput`).
- **Feature Modules**:
  - **Dashboard**: KPI stat cards, interactive charts, and system status overview.
  - **User Directory**: Paginated, server-side searchable CRUD table with modal forms and direct status toggles.
  - **Account Settings**: Profile avatar and display name updates + secure password change with verification.
  - **Theme Showcase**: Complete interactive UI component gallery.
- **HTTP Engine**:
  - Axios instance with automatic JWT header injection and seamless 401 token refresh queueing.

### 🛡️ Backend (`server/`)

- **Modular Architecture**: Feature-oriented modular architecture (`routes/auth`, `routes/user`, `routes/health`).
- **Optimized Controllers**: Direct `findByIdAndUpdate` operations for atomic database mutations, eliminating redundant queries.
- **Authentication & Security**:
  - Bcrypt password hashing (12 salt rounds).
  - Short-lived JWT access tokens + rotating refresh tokens.
  - `helmet` security headers and `express-rate-limit` brute-force protection on auth endpoints.
  - Dynamic CORS origin validation and request body sanitization.
- **Uniform API Protocol**: Centralized response envelope (`sendSuccess`, `sendError`) and global async error handling.
- **Database Seeder**: Standalone idempotent script (`npm run seed`) creating pre-configured demo accounts.

---

## ⚡ Quick Start

### 1. Prerequisites

- **Node.js**: `v18+` or `v20+`
- **npm**: `v9+`
- **MongoDB**: Local MongoDB instance (`mongodb://localhost:27017`) or MongoDB Atlas connection URI

### 2. Installation

Install all dependencies for root, client, and server with a single command:

```bash
npm run install:all
```

### 3. Environment Configuration

Copy the template files and configure your environment variables:

```bash
# Server configuration
cp server/.env.example server/.env

# Client configuration
cp client/.env.example client/.env
```

**`server/.env`**:

```env
NODE_ENV=development
PORT=5005
MONGO_URI=mongodb://localhost:27017/mern-starter
JWT_SECRET=your_super_secret_jwt_access_key
JWT_REFRESH_SECRET=your_super_secret_jwt_refresh_key
CLIENT_URL=http://localhost:5173
```

**`client/.env`**:

```env
VITE_API_URL=http://localhost:5005/api
VITE_APP_NAME="Custom MERN Starter"
```

### 4. Seed Demo Data & Launch

```bash
# Seed initial demo accounts (idempotent)
npm run seed

# Run both backend server and client frontend concurrently
npm run dev
```

- **Frontend App**: [http://localhost:5173](http://localhost:5173)
- **Backend API**: [http://localhost:5005/api](http://localhost:5005/api)
- **Health Check**: [http://localhost:5005/api/health](http://localhost:5005/api/health)

---

## 🔑 Default Demo Accounts

Created automatically via `npm run seed`:

| Role        | Email                 | Password      | Permissions                                               |
| :---------- | :-------------------- | :------------ | :-------------------------------------------------------- |
| **Admin**   | `admin@starter.com`   | `Admin123!`   | Full access to all modules, users CRUD, and RBAC controls |
| **Manager** | `manager@starter.com` | `Manager123!` | View & edit users directory, dashboard access             |
| **User**    | `user@starter.com`    | `User123!`    | Dashboard and personal profile / password settings        |

---

## 📋 Available Scripts

Run these from the **root** workspace folder:

| Command               | Description                                                    |
| :-------------------- | :------------------------------------------------------------- |
| `npm run dev`         | Starts both server (`:5005`) and client (`:5173`) concurrently |
| `npm run seed`        | Seeds MongoDB with initial demo accounts                       |
| `npm run build`       | Builds production bundle for client to `client/dist/`          |
| `npm run install:all` | Installs root, client, and server dependencies                 |
| `npm run dev:server`  | Starts backend server only with nodemon                        |
| `npm run dev:client`  | Starts Vite client development server only                     |

---

## 📁 Project Structure

```
├── client/                      # React 19 + Vite Frontend
│   ├── src/
│   │   ├── components/
│   │   │   ├── common/         # Atomic UI (DataTable, Loader, TabBar, Avatar, etc.)
│   │   │   ├── form/           # Formik field adapters (TextInput, Select, Checkbox)
│   │   │   └── wrappers/       # AuthGuard, RoleGuard, ErrorBoundary
│   │   ├── constants/          # Layout & application constants
│   │   ├── contexts/           # Breakpoint & Theme context providers
│   │   ├── layouts/            # MainLayout (Sidebar, Header) and AuthLayout
│   │   ├── pages/              # Dashboard, Users, Profile, Auth, Showcase
│   │   ├── routes/             # ProtectedRoutes, GuestRoutes, ErrorRoutes
│   │   ├── services/           # AxiosService, AuthService, UserService
│   │   ├── store/              # Redux Toolkit (authSlice, customizationSlice)
│   │   └── themes/             # MUI theme overrides, tokens, and palette
│   └── vite.config.js          # Vite config with manual chunk splitting
│
├── server/                      # Node.js + Express 5 Backend
│   ├── src/
│   │   ├── config/             # Database connection & environment configuration
│   │   ├── constants/          # Roles, status codes, and HTTP constants
│   │   ├── middleware/         # Auth, RBAC, rateLimiter, errorHandler, validator
│   │   ├── models/             # Mongoose schemas (User, etc.)
│   │   ├── routes/             # Feature route modules (auth, user, health)
│   │   ├── scripts/seed.js     # Database seeder script
│   │   ├── utils/              # ApiResponse, asyncHandler, jwtUtils, logger
│   │   └── server.js           # Express app bootstrap & middleware pipeline
│   └── package.json
│
└── package.json                 # Monorepo root workspace scripts
```

---

## 📡 API Endpoints

### Authentication (`/api/auth`)

| Method | Endpoint                    | Access Level            | Description                                        |
| :----- | :-------------------------- | :---------------------- | :------------------------------------------------- |
| `POST` | `/api/auth/register`        | Public _(Rate-limited)_ | Register a new user account                        |
| `POST` | `/api/auth/login`           | Public _(Rate-limited)_ | Authenticate & receive JWT access + refresh tokens |
| `POST` | `/api/auth/refresh`         | Public _(Rate-limited)_ | Exchange refresh token for fresh access token      |
| `GET`  | `/api/auth/me`              | Bearer Token            | Fetch currently authenticated user profile         |
| `PUT`  | `/api/auth/profile`         | Bearer Token            | Update user display name and avatar                |
| `PUT`  | `/api/auth/change-password` | Bearer Token            | Change password with current password verification |
| `POST` | `/api/auth/logout`          | Public                  | Invalidate active user session                     |

### User Management (`/api/users`)

| Method   | Endpoint         | Access Level   | Description                                                |
| :------- | :--------------- | :------------- | :--------------------------------------------------------- |
| `GET`    | `/api/users`     | Admin, Manager | Paginated & searchable user list (`?search=&page=&limit=`) |
| `POST`   | `/api/users`     | Admin, Manager | Create a new user account with initial role and status     |
| `GET`    | `/api/users/:id` | Admin, Manager | Get user profile details by ID                             |
| `PUT`    | `/api/users/:id` | Admin, Manager | Update user profile (Role & Status require Admin)          |
| `DELETE` | `/api/users/:id` | Admin Only     | Permanently delete user account                            |

### System Health

| Method | Endpoint      | Access Level | Description                                   |
| :----- | :------------ | :----------- | :-------------------------------------------- |
| `GET`  | `/api/health` | Public       | Service uptime, environment, and health check |

---

## 🚢 Production Deployment

### Option A: Decoupled Deployments (Recommended)

- **Frontend (Vite)**: Deploy `client/` to **Vercel**, **Netlify**, or **Cloudflare Pages**.
  - Build command: `npm run build`
  - Output directory: `dist`
  - Set `VITE_API_URL` to your production backend URL.
- **Backend (Express)**: Deploy `server/` to **Render**, **Railway**, **Fly.io**, or **AWS ECS**.
  - Start command: `node src/server.js`
  - Configure production environment variables (`MONGO_URI`, `JWT_SECRET`, `CLIENT_URL`).

### Option B: Monolithic Deployment

1. Build client bundle:
   ```bash
   npm run build
   ```
2. Serve static client build via Express in `server/src/server.js`:
   ```javascript
   if (process.env.NODE_ENV === "production") {
     app.use(express.static(path.join(__dirname, "../../client/dist")));
     app.get("*", (req, res) => {
       res.sendFile(path.resolve(__dirname, "../../client/dist", "index.html"));
     });
   }
   ```

---

## 📄 License

This project is open-sourced under the [MIT License](LICENSE).
