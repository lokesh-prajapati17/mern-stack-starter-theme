<div align="center">

# ⚡ Custom Setup MERN

### Production-Grade MERN Starter Boilerplate & Custom Design System

An enterprise-ready, fully tokenized **MERN Stack Starter Template & Custom Theme**. Built with **React 19**, **Vite**, **Material UI (MUI)**, **Express 5**, and **MongoDB**, featuring light/dark mode, atomic components, strict role-based access control (RBAC), and automated JWT session rotation.

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg?style=for-the-badge)](LICENSE)
[![React](https://img.shields.io/badge/React-19.2-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-8.2-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![MUI](https://img.shields.io/badge/MUI-Material_UI-007FFF?style=for-the-badge&logo=mui&logoColor=white)](https://mui.com/)
[![Redux Toolkit](https://img.shields.io/badge/Redux_Toolkit-2.12-764ABC?style=for-the-badge&logo=redux&logoColor=white)](https://redux-toolkit.js.org/)
[![Node.js](https://img.shields.io/badge/Node.js-18+-339933?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express-5.2-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Mongoose_9-47A248?style=for-the-badge&logo=mongodb&logoColor=white)](https://mongoosejs.com/)
[![PRs Welcome](https://img.shields.io/badge/PRs-Welcome-brightgreen.svg?style=for-the-badge)](CONTRIBUTING.md)

<br />

[Explore Features](#-key-features) • [Theme & Design System](#-theme--design-system) • [UI Component Library](#-component-library) • [Quick Start](#-quick-start) • [RBAC & Auth](#-authentication--rbac) • [API Reference](#-api-endpoints)

---

</div>

## 📌 Overview

**Custom Setup MERN** provides a pre-architected, highly customizable foundation for modern full-stack web applications and SaaS dashboards.

Instead of writing authentication, role authorization, responsive dashboard shells, dark/light theme switching, and Axios token refresh interceptors from scratch on every project, this boilerplate delivers an **opinionated, enterprise-grade architecture** with **zero hardcoded colors or spacing**.

### Why Use This Theme?

- 🎨 **100% Tokenized Design System**: Modern **Near-Black + Cyan** aesthetic. All atoms, cards, tables, inputs, and drawers consume semantic tokens and theme scales.
- 🌓 **Instant Dark / Light Mode**: Seamless theme switching persisted in Redux and `localStorage` with customized surface elevations and subtle borders.
- 🧩 **18+ Pre-built Atomic UI Components**: Ready-to-use inputs, data tables, modals, confirmation dialogs, status badges, buttons, and animations.
- 🔐 **Enterprise Authentication & RBAC**: Dual-token architecture (short-lived access tokens + long-lived refresh tokens) with an Axios mutex queue that automatically recovers expired sessions on 401s without user interruption.
- 🛡️ **Multi-Tier Route & UI Guards**: Declarative `<AuthGuard>`, `<GuestGuard>`, and `<RoleGuard>` for granular frontend permission checks, paired with Express middleware (`hasRole`, `hasAnyRole`) on the backend.
- 📦 **Monorepo-Style Concurrent DX**: Run client and server simultaneously using one single root command (`npm run dev`).

---

## 🌟 Key Features

### 🎨 Frontend (`client/`)

- **React 19 & Vite 8**: Blazing-fast hot module replacement (HMR) and optimized build bundles.
- **Tokenized MUI Architecture**:
  - Near-Black + Cyan primary brand palette with dedicated color scales (`50` to `950`).
  - Layered surface elevations (`base`, `surface-1` through `surface-4`, `elevated`, `overlay`, `sidebar`).
  - Strict semantic borders (`subtle`, `default`, `strong`, `primary`, `success`, `warning`, `error`).
  - Glow and soft elevation shadows (`theme.customShadows`).
- **Responsive Dashboard Shell (`src/layouts/MainLayout`)**:
  - Collapsible desktop sidebar supporting both **Expanded** and **Mini Icon Mode**.
  - Smooth off-canvas drawer for mobile and tablet devices.
  - Interactive header with live theme toggle, role badges, notifications, and profile menu.
  - Centralized navigation configuration (`navigation.js`) with role-based link filtering.
- **State Management with Redux Toolkit**:
  - `authSlice`: Manages logged-in user state, access tokens, and authentication status.
  - `customizationSlice`: Controls dark/light mode, mini-drawer toggle, and theme presets.
- **Advanced HTTP Layer (`src/services/`)**:
  - Centralized Axios instance with request and response interceptors.
  - **401 Mutex Queue**: Queues failed API requests while refreshing tokens, retrying them in sequence once refreshed.
  - `BaseService`: Generic CRUD helper class for rapid feature expansion.

### 🛠️ Backend (`server/`)

- **Modern Node.js & Express 5 (ESM)**:
  - Clean modular pattern: `config/`, `constants/`, `controllers/`, `middleware/`, `models/`, `routes/`, `utils/`.
- **JWT & Password Security**:
  - Access Token (15m expiry) + Refresh Token (7d expiry) rotation.
  - Secure password hashing with `bcryptjs`.
- **Standardized Response Protocol**:
  - Consistent JSON payloads across all endpoints via `sendSuccess` and `sendError`.
  - `asyncHandler` wrapper eliminating redundant `try/catch` boilerplates.
  - Centralized error-handling middleware with environment-aware error details.
- **Role-Based Access Control**:
  - Scalable RBAC middlewares: `protect`, `hasRole`, and `hasAnyRole`.
  - Predefined roles: `ADMIN`, `MANAGER`, and `USER`.

---

## 🎨 Theme & Design System

The theme is built on a strictly tokenized system located in `client/src/themes/`. Every component is styled via Material UI overrides, avoiding scattered inline styles and maintaining complete visual harmony.

### 1. Color System & Palette Scales

| Token Scale           | Description                | Dark Mode Default                  | Light Mode Default                |
| :-------------------- | :------------------------- | :--------------------------------- | :-------------------------------- |
| **Primary (Cyan)**    | Main brand action color    | `#00DAD1` (Cyan 500)               | `#008781` (Cyan 600)              |
| **Background / App**  | Root canvas background     | `#02060C` (Deep Near-Black)        | `#F1F5F9` (Slate Soft)            |
| **Surface 1**         | Cards, modals, containers  | `#060B14` (Layer 1)                | `#FFFFFF` (Pure White)            |
| **Surface 2**         | Nested cards, hover layers | `#09111B` (Layer 2)                | `#F8FAFC` (Off White)             |
| **Text Primary**      | High-contrast body text    | `#E5ECF3`                          | `#0F172A`                         |
| **Text Secondary**    | Subtitles, captions, hints | `#738092`                          | `#475569`                         |
| **Borders (Default)** | Dividers and outlines      | `#161F2C`                          | `#E2E8F0`                         |
| **Custom Shadows**    | Glow & elevation effects   | `0 0 24px rgba(0, 218, 209, 0.16)` | `0 10px 25px rgba(0, 0, 0, 0.05)` |

### 2. How to Customize the Theme Brand Color

You can re-theme the entire application in **less than 60 seconds**. Open `client/src/themes/tokens.js` and adjust the `primaryScale` and `brand` definitions:

```javascript
// client/src/themes/tokens.js
export const primaryScale = {
  50: "#E6FFFE",
  100: "#BFFFFC",
  200: "#80F8F3",
  300: "#4CEDE7",
  400: "#22E3DB",
  500: "#00DAD1", // <-- Change to your brand color (e.g. Purple, Emerald, Blue)
  600: "#00C1BA",
  700: "#00A7A1",
  800: "#008C87",
  900: "#006F6B",
  950: "#003D3B",
};
```

All buttons, links, active navigation items, badges, input focus rings, and glowing shadows will automatically adopt your new palette.

---

## 🧩 Component Library

Pre-built UI atoms are located in `client/src/components/common/`. Each component is theme-aware and supports both dark and light modes.

| Component         | File Path                             | Features & Usage                                                                                           |
| :---------------- | :------------------------------------ | :--------------------------------------------------------------------------------------------------------- |
| **Button**        | `components/common/Button.jsx`        | Variants: `primary`, `secondary`, `outline`, `ghost`, `danger`. Built-in loading spinner and icon support. |
| **IconButton**    | `components/common/IconButton.jsx`    | Accessible icon button wrapper with tooltips, size presets, and subtle hover animations.                   |
| **TextInput**     | `components/common/TextInput.jsx`     | Pre-styled MUI TextField with helper text, error handling, and start/end icon adornments.                  |
| **SelectInput**   | `components/common/SelectInput.jsx`   | Dropdown selector with tokenized menus, placeholder support, and disabled state styling.                   |
| **SearchInput**   | `components/common/SearchInput.jsx`   | Debounced search input with built-in search icon and clear button.                                         |
| **CheckboxInput** | `components/common/CheckboxInput.jsx` | Custom themed checkbox with brand-colored checked state and typography label integration.                  |
| **SwitchInput**   | `components/common/SwitchInput.jsx`   | iOS-style toggle switch with cyan active tracks and smooth thumb animations.                               |
| **StatusBadge**   | `components/common/StatusBadge.jsx`   | Soft semantic badges for `ACTIVE`, `INACTIVE`, `PENDING`, `ADMIN`, `MANAGER`, `USER`.                      |
| **CardBox**       | `components/common/CardBox.jsx`       | Surface-elevated paper container with header actions, subtitle, and responsive padding.                    |
| **DataTable**     | `components/common/DataTable.jsx`     | Production table with sorting, selectable rows, custom cell renderers, and empty states.                   |
| **Pagination**    | `components/common/Pagination.jsx`    | Accessible table pagination with rows-per-page selector and page jumps.                                    |
| **Modal**         | `components/common/Modal.jsx`         | Accessible dialog modal with backdrop blur, customizable header, body, and action footer.                  |
| **ConfirmDialog** | `components/common/ConfirmDialog.jsx` | Pre-configured confirmation prompt for destructive actions (e.g., delete item).                            |
| **EmptyState**    | `components/common/EmptyState.jsx`    | Empty data illustration, title, description, and primary call-to-action button.                            |
| **Loader**        | `components/common/Loader.jsx`        | Full-screen and card-level loader with branded spinner animations.                                         |
| **Motion**        | `components/common/Motion.jsx`        | Framer Motion wrappers for `FadeIn`, `SlideUp`, `Scale`, and `StaggerChildren`.                            |

### Example: Using the Common Atoms

```jsx
import React, { useState } from "react";
import { Button, CardBox, TextInput, StatusBadge } from "@/components/common";

export default function UserCard({ user }) {
  const [loading, setLoading] = useState(false);

  return (
    <CardBox title="User Profile" subtitle="Manage account settings">
      <StatusBadge status={user.status} label={user.role} />
      <TextInput
        label="Full Name"
        defaultValue={user.name}
        margin="normal"
        fullWidth
      />
      <Button
        variant="primary"
        loading={loading}
        onClick={() => setLoading(true)}
      >
        Save Changes
      </Button>
    </CardBox>
  );
}
```

---

## 📁 Directory Structure

```text
Custom Setup MERN/
├── client/                               # Frontend Application (React 19 + Vite)
│   ├── public/                           # Static assets
│   ├── src/
│   │   ├── assets/                       # Images, logos, SVG illustrations
│   │   ├── components/
│   │   │   ├── common/                   # 18+ Tokenized UI Atoms (Button, Table, Modal, etc.)
│   │   │   └── wrappers/                 # Route Guards (AuthGuard, GuestGuard, RoleGuard)
│   │   ├── constants/                    # ApiConstants, KeyConstants, LayoutConstants, RbacConstants
│   │   ├── contexts/                     # BreakpointContext (Drawer & viewport state)
│   │   ├── layouts/
│   │   │   ├── AuthLayout/               # Clean centered layout for login/register
│   │   │   └── MainLayout/               # Collapsible Sidebar, Header, Breadcrumbs
│   │   ├── pages/
│   │   │   ├── auth/                     # LoginPage, RegisterPage
│   │   │   ├── dashboard/                # DashboardPage, ThemeShowcasePage
│   │   │   ├── error/                    # NotFoundPage (404), UnauthorizedPage (403)
│   │   │   └── users/                    # UsersListPage, UserDetailPage
│   │   ├── routes/                       # Centralized React Router configuration
│   │   ├── services/                     # Axios instance, BaseService, AuthService, UserService
│   │   ├── store/                        # Redux Toolkit store, authSlice, customizationSlice
│   │   ├── themes/                       # Tokens, palette, typography, shadows, component overrides
│   │   ├── App.jsx                       # ThemeProvider, CssBaseline, Router entry
│   │   ├── main.jsx                      # React root rendering & Redux Provider
│   │   └── index.css                     # Global reset & scrollbar styles
│   ├── .env.example                      # Client environment template
│   ├── index.html                        # App HTML entry with Google Fonts
│   ├── package.json
│   └── vite.config.js
│
├── server/                               # Backend Application (Node.js + Express 5)
│   ├── src/
│   │   ├── config/                       # MongoDB connection (db.js) & env loader
│   │   ├── constants/                    # Roles, HTTP Status codes
│   │   ├── controllers/                  # authController.js, userController.js
│   │   ├── middleware/                   # auth.js, rbac.js, errorHandler.js, validator.js
│   │   ├── models/                       # User.js (Mongoose schema with bcrypt hashing)
│   │   ├── routes/                       # api.js, authRoutes.js, userRoutes.js
│   │   ├── utils/                        # apiResponse.js, asyncHandler.js, jwtUtils.js
│   │   └── server.js                     # Express app setup, CORS, middleware pipeline
│   ├── .env.example                      # Server environment template
│   └── package.json
│
├── .gitignore
├── package.json                          # Root orchestration package.json
└── README.md                             # Documentation
```

---

## ⚡ Quick Start

### 1. Prerequisites

Ensure you have the following installed on your machine:

- **Node.js** >= 18.x (Recommended: Node.js LTS)
- **npm** >= 9.x (or `pnpm` / `yarn`)
- **MongoDB** >= 5.0 (Local instance or [MongoDB Atlas URI](https://www.mongodb.com/atlas))

### 2. Clone the Repository

```bash
git clone https://github.com/your-username/custom-setup-mern.git
cd custom-setup-mern
```

### 3. Install All Dependencies (Root, Client, Server)

This project features a root install script that concurrently prepares all workspaces:

```bash
npm run install:all
```

### 4. Configure Environment Variables

#### Backend Environment (`server/.env`)

Copy the server template:

```bash
cp server/.env.example server/.env
```

Default configuration (`server/.env`):

```env
PORT=5005
NODE_ENV=development
CLIENT_URL=http://localhost:5173,http://localhost:5174,http://127.0.0.1:5173
MONGO_URI=mongodb://127.0.0.1:27017/custom_setup_mern
JWT_SECRET=super_secret_jwt_access_key_change_in_production_12345
JWT_EXPIRE=15m
JWT_REFRESH_SECRET=super_secret_jwt_refresh_key_change_in_production_67890
JWT_REFRESH_EXPIRE=7d
```

#### Frontend Environment (`client/.env`)

Copy the client template:

```bash
cp client/.env.example client/.env
```

Default configuration (`client/.env`):

```env
VITE_APP_NAME="Custom Setup MERN"
VITE_API_URL="http://localhost:5005/api"
```

### 5. Start Development Servers (Concurrent)

Launch both the Vite frontend and Express backend with a single command:

```bash
npm run dev
```

- **Frontend App**: [http://localhost:5173](http://localhost:5173)
- **Backend API**: [http://localhost:5005](http://localhost:5005)
- **Health Check**: [http://localhost:5005/api/health](http://localhost:5005/api/health)

---

## 🔐 Authentication & RBAC

### Dual-Token Lifecycle

```text
[Client] ---> POST /api/auth/login ---> [Server]
   │                                        │
   │ <--- Returns AccessToken + RefreshToken ┘
   │
   ├──> Stores AccessToken (Memory/Redux) & RefreshToken (Storage)
   │
   ├──> API Request (Bearer AccessToken) ---> 200 OK
   │
   └──> AccessToken Expires ---> 401 Unauthorized
          │
          ├──> Axios Interceptor intercepts 401
          ├──> Pauses outgoing requests (Mutex queue)
          ├──> Calls POST /api/auth/refresh with RefreshToken
          ├──> Updates AccessToken in Redux
          └──> Retries all queued requests seamlessly
```

### Role-Based Access Control (RBAC)

The system supports three default tiers: `ADMIN`, `MANAGER`, and `USER`.

| Role        | Permissions                                                                  | Navigation Visibility                      |
| :---------- | :--------------------------------------------------------------------------- | :----------------------------------------- |
| **ADMIN**   | Full administrative rights, User CRUD, Role management, System configuration | All views, User Management, Theme Showcase |
| **MANAGER** | Read & update operations, analytics, reporting                               | Dashboard, Reports, Partial User Directory |
| **USER**    | Standard member access, self profile editing                                 | Personal Dashboard, Settings               |

#### Frontend Guard Example (`RoleGuard`)

Wrap routes or inline buttons to enforce permissions:

```jsx
import { RoleGuard } from "@/components/wrappers";
import { ROLES } from "@/constants/RbacConstants";

// Protecting an entire route or sub-component:
<RoleGuard
  allowedRoles={[ROLES.ADMIN, ROLES.MANAGER]}
  fallback={<AccessDenied />}
>
  <AdminUserControls />
</RoleGuard>;
```

#### Backend Route Guard Example (`hasRole`)

```javascript
import express from "express";
import { protect } from "../middleware/auth.js";
import { hasRole } from "../middleware/rbac.js";
import { ROLES } from "../constants/roles.js";

const router = express.Router();

router.delete("/users/:id", protect, hasRole([ROLES.ADMIN]), deleteUser);
```

---

## 📡 API Endpoints

All responses follow the standardized envelope:

```json
{
  "success": true,
  "statusCode": 200,
  "message": "Operation successful",
  "data": {}
}
```

### Authentication Endpoints

| Method | Endpoint             | Access                 | Description                                 |
| :----- | :------------------- | :--------------------- | :------------------------------------------ |
| `POST` | `/api/auth/register` | Public                 | Register new user account                   |
| `POST` | `/api/auth/login`    | Public                 | Authenticate user & return tokens           |
| `POST` | `/api/auth/refresh`  | Public (Refresh Token) | Rotate expired access token                 |
| `GET`  | `/api/auth/me`       | Authenticated          | Fetch current user session                  |
| `POST` | `/api/auth/logout`   | Authenticated          | Revoke refresh token and invalidate session |

### User Management Endpoints

| Method   | Endpoint         | Access          | Description                  |
| :------- | :--------------- | :-------------- | :--------------------------- |
| `GET`    | `/api/users`     | Admin, Manager  | Fetch paginated user listing |
| `GET`    | `/api/users/:id` | Authenticated   | Fetch user profile by ID     |
| `PUT`    | `/api/users/:id` | Admin (or Self) | Update user details          |
| `DELETE` | `/api/users/:id` | Admin           | Delete user account          |

### System Endpoints

| Method | Endpoint      | Access | Description                                 |
| :----- | :------------ | :----- | :------------------------------------------ |
| `GET`  | `/api/health` | Public | Server uptime, status, and environment info |

---

## 🚀 Creating a New Project from this Starter

Follow these steps to spin up your new application using this repository as a boilerplate:

1. **Clone or use as template**:
   ```bash
   git clone https://github.com/your-username/custom-setup-mern.git my-awesome-app
   cd my-awesome-app
   ```
2. **Reset Git history**:
   ```bash
   rm -rf .git
   git init
   ```
3. **Rename project names**:
   - Update `name` in `package.json`, `client/package.json`, and `server/package.json`.
   - Update `VITE_APP_NAME` in `client/.env`.
4. **Customize brand tokens**:
   - Open `client/src/themes/tokens.js` and set your desired color scales.
5. **Add new models and routes**:
   - Add Mongoose schemas in `server/src/models/`.
   - Add controllers in `server/src/controllers/`.
   - Mount routes in `server/src/routes/api.js`.
   - Add frontend services in `client/src/services/` by extending `BaseService`.

---

## 📜 Available Scripts

| Command                | Working Dir     | Description                                                |
| :--------------------- | :-------------- | :--------------------------------------------------------- |
| `npm run dev`          | Root            | Concurrently runs frontend (`:5173`) and backend (`:5005`) |
| `npm run install:all`  | Root            | Installs dependencies across root, client, and server      |
| `npm run dev:client`   | Root / `client` | Runs client Vite dev server only                           |
| `npm run dev:server`   | Root / `server` | Runs server with Nodemon watcher only                      |
| `npm run build:client` | Root / `client` | Compiles production-ready client bundle to `client/dist/`  |

---

## 🚢 Production Deployment

### Option A: Separate Deployments (Recommended)

- **Frontend (Vite)**: Deploy `client/` to **Vercel**, **Netlify**, or **Cloudflare Pages**.
  - Build command: `npm run build`
  - Output directory: `dist`
  - Set `VITE_API_URL` to your production backend URL.
- **Backend (Express)**: Deploy `server/` to **Render**, **Railway**, **Fly.io**, or **AWS ECS**.
  - Start command: `node src/server.js`
  - Configure production environment variables (`MONGO_URI`, `JWT_SECRET`, `CLIENT_URL`).

### Option B: Monolithic Deployment

1. Build client: `npm run build:client`
2. Serve static assets in Express:
   ```javascript
   // server/src/server.js
   if (process.env.NODE_ENV === "production") {
     app.use(express.static(path.join(__dirname, "../../client/dist")));
     app.get("*", (req, res) => {
       res.sendFile(path.resolve(__dirname, "../../client/dist", "index.html"));
     });
   }
   ```

---

## 🤝 Contributing

Contributions make the open-source community an incredible place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

Distributed under the **MIT License**. See `LICENSE` for more information.

---

<div align="center">

Made with ❤️ by [Lokesh Prajapati](https://github.com/lokeshprajapati)

⭐ **If you found this boilerplate useful, please give it a star on GitHub!** ⭐

</div>
