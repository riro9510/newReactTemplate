const fs = require('fs');
const path = require('path');
const { spawn } = require('child_process');

const folderStructure = [
  'src',
  'src/assets',
  'src/components',
  'src/features/home',
  'src/features/auth',
  'src/hooks',
  'src/layouts',
  'src/models',
  'src/pages',
  'src/services',
  'src/utils',
];
const fileContents = {
    'src/main.tsx': `import React from 'react';
  import ReactDOM from 'react-dom/client';
  import App from './App';
  import './index.css';
  
  ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );`,
  
    'src/App.tsx': `
    import React from "react";

    export default function App() {
    return <h1>Hello from your React Template 👋</h1>;
  }`,
  
    'src/index.css': `body {
    margin: 0;
    font-family: 'Segoe UI', sans-serif;
    background: #f8f8f8;
  }`,
  
    'src/services/api.ts': `import axios from 'axios';
  export const api = axios.create({ baseURL: import.meta.env.VITE_API_URL });`,
  'vite.config.ts':`import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
  },
  resolve: {
    alias: {
      '@': '/src',
    },
  },
});
`,
'tsconfig.json':`{
  "compilerOptions": {
    "target": "ESNext",
    "useDefineForClassFields": true,
    "module": "ESNext",
    "moduleResolution": "Node",
    "strict": true,
    "jsx": "react-jsx",
    "baseUrl": "./",
    "paths": {
      "@/*": ["src/*"]
    },
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true
  },
  "include": ["src"],
  "exclude": ["node_modules", "dist"]
}
`,
'.env':`VITE_API_URL=https://api.ejemplo.com
VITE_APP_NAME=MyReactApp
`
  
  }
  
  function createFolders(basePath, folders) {
    folders.forEach((relativePath) => {
      const dirPath = path.resolve(__dirname, '..', relativePath);
      if (!fs.existsSync(dirPath)) {
        fs.mkdirSync(dirPath, { recursive: true });
        console.log(`📁 Folder created: ${dirPath}`);
      }
    });
  }
  
  function createExampleComponents(content) {
    Object.entries(content).forEach(([relativeFilePath, fileContent]) => {
      const absoluteFilePath = path.resolve(__dirname, '..', relativeFilePath);
      const dirPath = path.dirname(absoluteFilePath);
  
      if (!fs.existsSync(dirPath)) {
        fs.mkdirSync(dirPath, { recursive: true });
        console.log(`📁 Folder created: ${dirPath}`);
      }
  
      fs.writeFileSync(absoluteFilePath, fileContent);
      console.log(`📄 File created: ${absoluteFilePath}`);
    });
  }
createFolders('.', folderStructure);

  
  

  createExampleComponents(fileContents);

