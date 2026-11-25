# Employee Management App — Assignment 3

## Setup
1. Install Node.js (LTS).
2. Open this `Casestudy2` folder in VS Code.
3. Run `npm install`.
4. In MongoDB Atlas, create a database user and allow your development IP address in Network Access.
5. Copy `.env.example` to `.env` and replace the placeholder URI with your Atlas connection string. Do not commit `.env`.
6. Run `npm start`.
7. Open http://localhost:3000.

## API endpoints
The provided frontend calls `/employeelist`; the assignment's `/api/employeelist` paths are also supported.

| Method | Endpoint | Purpose |
|---|---|---|
| GET | `/employeelist` or `/api/employeelist` | List employees |
| GET | `/employeelist/:id` or `/api/employeelist/:id` | Get one employee |
| POST | `/employeelist` or `/api/employeelist` | Create employee |
| PUT | `/employeelist` or `/api/employeelist` | Update employee (send `_id` in JSON body) |
| DELETE | `/employeelist/:id` or `/api/employeelist/:id` | Delete employee |

POST JSON body:
```json
{"name":"Alex","location":"Thrissur","position":"Developer","salary":30000}
```

PUT uses the same fields and must include the existing employee `_id`.

## GitHub submission
Create a new GitHub repository and push the contents of this folder. Include `app.js`, `package.json`, `package-lock.json` (created after `npm install`), and `dist/`. Do not upload `.env` or `node_modules/`. Submit the repository URL in Paathshala.
