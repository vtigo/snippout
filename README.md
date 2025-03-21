# Snippout

A modern code snippet manager with VS Code integration and code health analysis.

## 🚀 Overview

Snippout is a personal code snippet library that helps developers store, organize, and reuse code snippets. Unlike AI coding tools, Snippout provides a curated approach to managing your code with the advantages of reliability, offline access, privacy, and organizational memory.

## ✨ Key Features

- **Central Snippet Repository**
  - Store and organize personal code snippets
  - Tag-based organization system
  - Powerful search capabilities
  - Snippet versioning

- **VS Code Integration**
  - Insert snippets directly into your editor
  - Save selected code as new snippets
  - Access your snippet library via commands and context menus
  - Seamless workflow integration

- **Code Health Analysis**
  - Evaluate the quality of your snippets
  - Visual indicators of potential issues
  - Improvement suggestions
  - Best practices enforcement

## 🛠️ Tech Stack

- **Frontend:** React, TypeScript, Vite, Tailwind CSS
- **Backend:** Node.js, Express, MongoDB
- **VS Code Extension:** TypeScript, VS Code API

## 📁 Project Structure

```
snippout/
├── frontend/        # React web application
├── backend/         # Express API server
├── vscode-extension/  # VS Code integration
└── shared/          # Shared types and utilities
```

## 🚧 Project Status

This project is currently under development.

## 🏁 Getting Started

### Prerequisites

- Node.js 16+
- pnpm
- MongoDB
- VS Code (for extension development and testing)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/snippout.git
   cd snippout
   ```

2. Install dependencies and set up each component:

   **Frontend:**
   ```bash
   cd frontend
   pnpm install
   pnpm dev
   ```

   **Backend:**
   ```bash
   cd backend
   pnpm install
   pnpm dev
   ```

   **VS Code Extension:**
   ```bash
   cd vscode-extension
   pnpm install
   # Run "Extension: Run" from VS Code debug menu
   ```