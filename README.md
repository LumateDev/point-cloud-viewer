# point-cloud-viewer

An Electron application with Vue and TypeScript

## Recommended IDE Setup

- [VSCode](https://code.visualstudio.com/) + [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) + [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar)

## Requirements

- **Node.js**: >= 20.0.0
  (Required due to usage of `util.styleText` in dependencies like `@iconify/utils`)

## Project Setup

### Install

```bash
npm install
```

### Development

```bash
npm run dev
```

> **Note for Linux users**:
> If Electron fails to start with a sandbox-related error like:
> `The SUID sandbox helper binary was found, but is not configured correctly...`,
> you need to configure the sandbox binary manually:
>
> ```bash
> cd ./node_modules/electron
> sudo chown root:root dist/chrome-sandbox
> sudo chmod 4755 dist/chrome-sandbox
> ```
>
> This is a known requirement when using Electron installed via npm on Linux systems.

### Build

```bash
# For Windows
npm run build:win

# For macOS
npm run build:mac

# For Linux
npm run build:linux
```
