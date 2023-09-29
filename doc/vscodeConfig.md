# VS Code Configuration

To set up a convenient configuration for VS Code, follow these steps:

1. Create a .vscode folder in your project directory if it doesn't already exist.

2. Inside the .vscode folder, create two JSON files: launch.json and tasks.json.

## launch.json

```json
{
    // Use IntelliSense to learn about possible attributes.
    // Hover to view descriptions of existing attributes.
    // For more information, visit: https://go.microsoft.com/fwlink/?linkid=830387
    "version": "0.2.0",
    "configurations": [
    
        {
            "command": "npm run dev",
            "name": "npm and prisma",
            "request": "launch",
            "type": "node-terminal",
            "preLaunchTask": "Open Database GUI" // Reference the task label from tasks.json
        },
        {
            "command": "npm run dev",
            "name": "npm dev",
            "request": "launch",
            "type": "node-terminal",
        },
        {
            "command": "npm run build && npm run start",
            "name": "npm start",
            "request": "launch",
            "type": "node-terminal",
        },
        {
            "command": "npm run cypress",
            "name": "npm cypress",
            "request": "launch",
            "type": "node-terminal",
        }
    ]
}
```

## tasks.json

```json
{
  "version": "2.0.0",
  "tasks": [
    {
      "label": "Open Database GUI",
      "type": "shell",
      "command": "npx prisma studio",
      "group": {
        "kind": "build",
        "isDefault": true
      },
      "presentation": {
        "reveal": "never",
        "panel": "shared"
      },
      "isBackground": true // Indicates this is a background task
    }
  ]
}
```

These configurations will enable you to conveniently run and debug your Next.js and Prisma project from within VS Code. Make sure to place the launch.json and tasks.json files inside the .vscode folder of your project directory.