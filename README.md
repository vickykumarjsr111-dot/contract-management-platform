Contract Management Platform (Frontend Only) Data will be Stored in localstorage

A frontend-only Contract Management Platform built with React + TypeScript + Vite, using Context API + Reducer for state management and LocalStorage for persistence.

This project allows users to:

Create reusable Blueprints (contract templates)

View all saved blueprints on a Dashboard

Create Contracts from a blueprint

Manage contract lifecycle states:
Created → Approved → Sent → Signed → Locked

Persist data across page refreshes (LocalStorage)

Tech Stack

React 18

TypeScript

Vite

React Router DOM

Context API + useReducer

LocalStorage (no backend)

Folder Structure
src/
│
├── components/
│   ├── Navbar.tsx
│   ├── Navbar.css
|   ├── Header.tsx
|   ├── Header.css
│
├── models/
│   ├── Blueprint.ts
│   ├── Contract.ts
│   ├── ContractStatus.ts
│
├── pages/
│   ├── BlueprintBuilder.tsx
│   ├── BlueprintBuilder.css
│   ├── BlueprintList.tsx
│   ├── BlueprintList.css
│   ├── ContractForm.tsx
│   ├── ContractForm.css
│   ├── ContractList.tsx
│   ├── ContractList.css
│   ├── ContractPage.tsx
│   ├── Dashboard.tsx
│   ├── Dashboard.css
│
├── state/
│   ├── AppContext.tsx
│   ├── AppReducer.ts
│   ├── AppState.ts
│   ├── lifecycle.ts
│   ├── storage.ts
│
├── App.tsx
├── App.css
├── index.css
├── main.tsx

Core Features
1. Blueprint Builder

Create a blueprint (template)

Add multiple fields (Name, Email, Number, Date, etc.)

Save blueprint to global state + LocalStorage

2. Dashboard

View all saved blueprints

Create contracts from any blueprint

Navigation via top Navbar

3. Contract Creation

Generates a contract from a blueprint

Automatically starts with status CREATED

Each contract is stored globally

4. Contract Lifecycle

Supported statuses:

CREATED → APPROVED → SENT → SIGNED → LOCKED


Status can only move forward

Once LOCKED, contract becomes immutable

5. Persistence

All blueprints and contracts are saved in LocalStorage

Data survives page refresh

Routing
Route	Description
/	Blueprint Builder
/dashboard	Dashboard (Blueprint List)
/contracts/:id	Contract lifecycle page
State Management

Centralized state via AppContext

Actions handled in AppReducer

Automatic persistence using:

storage.ts

lifecycle.ts

How LocalStorage Works

State is loaded on app start

Every state update is saved automatically

loadState();
saveState(state);


No backend required.

How to Run Locally
npm install
npm run dev


Then open:

http://localhost:5173

Important Notes

This is a frontend-only demo

No authentication

No server-side validation

Intended for learning / prototyping
