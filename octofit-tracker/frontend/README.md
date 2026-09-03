# Octofit Tracker Frontend

## API configuration (`VITE_CODESPACE_NAME`)

This app talks to the logic tier (Express API) running on port 8000. When
running inside a GitHub Codespace, the API is only reachable through the
forwarded Codespaces URL, which requires the Codespace name:

```text
https://<VITE_CODESPACE_NAME>-8000.app.github.dev/api/
```

To configure this locally, copy `.env.local.example` to `.env.local` and set
`VITE_CODESPACE_NAME` to your Codespace's name:

```bash
cp octofit-tracker/frontend/.env.local.example octofit-tracker/frontend/.env.local
# Then edit octofit-tracker/frontend/.env.local, e.g.:
# VITE_CODESPACE_NAME=your-codespace-name
```

You can find your Codespace name by running `echo $CODESPACE_NAME` in the
Codespaces terminal.

**Fallback behavior:** if `VITE_CODESPACE_NAME` is unset or empty (for
example, when running the frontend outside of a Codespace), the app falls
back to a relative `/api` base URL instead of constructing an invalid
`https://undefined-8000...` URL. This lets the app run against a local proxy
or same-origin backend without any extra configuration.

# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some Oxlint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the Oxlint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and Oxlint's TypeScript related rules in your project.
