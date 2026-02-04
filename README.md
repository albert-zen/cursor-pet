# Cursor Status Pet

Windows desktop application that displays Cursor Agent working status in real-time.

## Features

- 4 UI styles: circular indicator, desktop pet, cyberpunk, pixel cat
- Transparent floating window, always on top
- System tray, right-click to switch styles

## Installation

```bash
npm install
```

## Configure Cursor Hooks

Copy the `.cursor` folder to the Cursor workspace root directory, or merge the `hooks.json` content into existing configuration.

## Run

```bash
npm run dev
```

## How It Works

```
Cursor Hooks → hook.js --HTTP--> detector (localhost:19527) → UI
```

When hooks are triggered, HTTP requests are sent, and the detector updates UI status after receiving them.
