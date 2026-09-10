# User Management App

Angular + NgRx + Optimus UI(PrimeNG) + Tailwind + json-server, built inside an Nx monorepo.

---

## Tech Stack

| Layer             | Technology                  |
|-------------------|-----------------------------|
| Frontend          | Angular (latest), Standalone Components |
| State Management  | NgRx (Entity, Effects, Selectors) |
| UI                | PrimeNG + Tailwind CSS      |
| Backend (mock)    | json-server                 |
| Monorepo          | Nx Workspace                |
| Tests             | Jest                        |

---

## Project Setup

### 1. Install dependencies
npm install

### 2. Start mock backend
npm run json-server
Runs at: http://localhost:3000

### 3. Start Angular app
nx serve app
Runs at: http://localhost:4200

### 4. Run both together
npm run start:all (requires concurrently)

---

## Demo Credentials

Username: admin  
Password: admin123

---

## Running Tests

nx test app

---

## Architecture

### Store
store/
  auth/         → login state, auth actions/reducer/effects/selectors
  users/        → NgRx Entity for CRUD, users actions/reducer/effects/selectors

### Features
features/
  auth/login/   → LoginComponent (mock auth form)
  users/
    user-list/  → Dashboard table with edit/delete
    user-form/  → Dialog for add/edit

### Core
core/
  guards/       → authGuard (protects /users route)
  services/     → AuthService, UserService

### Shared
shared/models/  → User interface, JobRole type

---

## API Endpoints (json-server)

GET    /users

POST   /users

PUT    /users/:id

DELETE /users/:id

GET    /credentials?username=&password=