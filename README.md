# ⚡️ React + Vite + TypeScript Starter Template

A lightweight, opinionated starter template to kick off your next React project — fast builds, clean code, and a streamlined developer experience. Built with performance, scalability, and dev happiness in mind.

---

## ✨ Features

- ⚛️ **React + TypeScript** — typed components & hooks out of the box
- ⚡️ **Vite** — lightning-fast build and dev server
- 📁 **Scalable folder structure** — opinionated, easy to navigate and grow
- 📦 **Axios setup** — simple API integration ready to go.
- 🔀 **Path aliases (`@/`)** — no more spaghetti imports
- 🧼 **ESLint + Prettier** — consistent code formatting & linting
- 🧪 **Linting + Formatting in CI flow** — enforced via pre-commit hooks
- 🛠 **Husky + Commitizen + lint-staged** — commit with confidence & style
- 🧙 **Custom `tidy` command** — lint, format, and feel like a wizard 🧹
- 🧠 **Type-safe everything** — because bugs are not cool

---

## 📂 Folder Structure

src/
│
├── assets/
├── components/
├── features/
│ ├── auth/
│ └── home/
├── hooks/
├── layouts/
├── models/
├── pages/
├── services/
└── utils/

---

## 🚀 Getting Started

git clone https://github.com/yourRepo/newReactTemplate.git
cd newReactTemplate
npm install
chmod +x init.sh
./init.sh

## 🧼 Lint & Format

---

1. Manual (long version)

npm run lint:fix && npm run format

2. The shortcut you deserve

tidy

3. Forgot to tidy up?

I got your back, boss — it runs automatically on commit 😎
(lens drop moment)

## 💬 Standardized Commits

Tired of messy commit messages? Or maybe you're still seeing things like fix stuff or yo arreglé eso que rompí jeje in your team history?

Let’s commit like PROs. 💼😎

This template comes with Commitizen + Husky + lint-staged all set up to guide you (or your team) to write beautiful, consistent commit messages.

It uses a custom format like:

const msg = `${answers.date} ${answers.version} ${answers.type}: ${answers.description} Jira/Trello: ${answers.jira} ReadyToRelease: ${answers.ready}`;

That means your commits will look like:

2025-04-14 v1.2.3 feat: Add login form component Jira: ABC-123 ReadyToRelease: ✅

Want to go even further? You could automate the ReadyToRelease field based on your test results.
This is just a base, go ahead and make it yours.

## 🕳️ Bypassing the rules

Need to make a quick commit and skip the checks (we won’t judge 👀)?
Use the --no-verify flag:

git commit -m "hotfix: emergency fix" --no-verify

```bash

```
