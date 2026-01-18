Contract Management Platform (Frontend Only) Data will be Stored in localstorage

A frontend-only Contract Management Platform built with React + Vite + TypeScript.
The application allows users to create contract blueprints, generate contracts from those blueprints, and manage contract lifecycle states through a dashboard.

Features
1. Blueprint Builder

Create reusable Blueprints (templates) for contracts.

Add dynamic fields such as:

Name

Email

Number

Date

Preview fields before saving.

Blueprints are persisted using LocalStorage.

2. Dashboard

View all saved blueprints.

Create contracts from any blueprint.

See contract list with:

Contract Name

Blueprint Name

Status

Created Date

Filter contracts by status (All / Pending / Signed).

3. Contract Lifecycle Management

Each contract follows a strict lifecycle:

Created → Approved → Sent → Signed → Locked


Status updates are controlled and sequential.

Once a contract reaches Locked, it becomes immutable.

Lifecycle state is preserved across page refresh.

4. Contract Form

Dynamically renders fields based on the selected blueprint.

Allows filling employee details.

Submit, approve, or remove contracts.

Fully integrated with lifecycle state machine.

5. Persistent State

All application data is stored in LocalStorage:

Blueprints

Contracts

Status updates

Refreshing the page does not lose data.

Tech Stack

React (with Hooks)

TypeScript

Vite

React Router

Context API + useReducer

CSS (no UI library)

Project Structure
src/
├── components/
│   ├── Navbar.tsx
│   ├── Header.tsx
|   ├── Header.tsx
|   ├── Header.css
|   ├── ContractTable.tsx
|   ├── ContractTable.css
│
├── models/
│   ├── Blueprint.ts
│   ├── Contract.ts
│   └── ContractStatus.ts
│
├── pages/
│   ├── BlueprintBuilder.tsx
│   ├── BlueprintList.tsx
│   ├── ContractForm.tsx
│   ├── ContractList.tsx
│   ├── ContractPage.tsx
│   ├── Dashboard.tsx
│   ├── Dashboard.css
│   ├── BlueprintBuilder.css
│   ├── BlueprintList.css
│   ├── ContractForm.css
│   └── ContractList.css
│
├── state/
│   ├── AppContext.tsx
│   ├── AppReducer.ts
│   ├── AppState.ts
│   ├── lifecycle.ts
│   └── storage.ts
│
├── App.tsx
├── main.tsx
├── index.css
├── App.css

Routing
Route	Description
/	Blueprint Builder
/dashboard	Dashboard (Blueprints & Contracts)
/contracts/:id	Contract details & lifecycle
State Management

Global state managed using Context API + useReducer

Reducer actions include:

ADD_BLUEPRINT

ADD_CONTRACT

UPDATE_CONTRACT_STATUS

REMOVE_CONTRACT

Persistence handled in:

storage.ts

lifecycle.ts

How to Run Locally
npm install
npm run dev


Open in browser:

http://localhost:5173

Notes & Limitations

This is a frontend-only project (no backend).

Authentication is not implemented.

Data is stored locally (LocalStorage).

Designed for learning, demos, and frontend architecture practice.