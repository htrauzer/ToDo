# 📝 MiniFramework TodoMVC

A Todo application built using a custom-engineered JavaScript framework. This project was created to explore the mechanics of Virtual DOM reconciliation, component lifecycles, and client-side routing without relying on external heavy-weight libraries.

## 🚀 Technical Highlights

    Custom Virtual DOM: Implements a lightweight createElement engine.
    Diffing Algorithm: A recursive reconciliation process that updates only the necessary parts of the real DOM to ensure optimal performance.
    State Management: Reactive component architecture where setState triggers automatic UI re-renders.
    Hash-based Router: A custom-built router that handles application state via URL fragments (#/active, #/completed).
    Persistence: LocalStorage integration to keep your tasks safe across sessions.

## 🛠 Project Structure

    lib/dom.js: The "Core" –    Contains the MiniFramework engine, including the diff logic and Component base class.
    main.jsx: The "Logic" –     Contains the TodoApp and TodoItem components.
    index.html: The "Entry" –   The skeleton where the framework injects the application.
    scripts/babel.min.js:       The "Translator" – Compiles JSX in the browser for development flexibility.




## 🚦 Getting Started

Prerequisites
You need Node.js installed on your machine to run the development server.

Installation
1. Clone the repository or navigate to the folder.
2. Install the CSS dependencies:
    Bash: npm install

Running the App
Start the development server:
    Bash: npm run dev

Open http://localhost:5173 in your browser to view the app.

## ⌨️ Features

    Create: Add tasks via the main input.
    Edit: Double-click any task text to enter edit mode.
    Filter: Toggle between All, Active, and Completed views.
    Persistence: Your todos are automatically saved to your browser's local storage.


