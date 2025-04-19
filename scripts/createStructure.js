import fs from 'fs';
import path from 'path';
// eslint-disable-next-line no-unused-vars
import { spawn } from 'child_process';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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
  'vite.config.ts': `import { defineConfig } from 'vite';
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
  'tsconfig.json': `{
  "compilerOptions": {
    "target": "ESNext",
    "useDefineForClassFields": true,
    "module": "NodeNext",
    "moduleResolution": "nodenext",
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
  "include": ["src", "vite.config.ts"],
  "exclude": ["node_modules", "dist"]
}
`,
  '.env': `VITE_API_URL=https://api.ejemplo.com
VITE_APP_NAME=MyReactApp
`,
  '.prettierrc': `{
  "semi": true,
  "singleQuote": true,
  "printWidth": 100,
  "tabWidth": 2,
  "trailingComma": "all",
  "bracketSpacing": true,
  "arrowParens": "always"
}
`,
  '.prettierignore': `# .eslintignore
node_modules
dist
`,
  'eslint.config.js': `import js from '@eslint/js';
import eslintPluginPrettier from 'eslint-plugin-prettier';
import tseslint from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import reactPlugin from 'eslint-plugin-react';
import reactHooksPlugin from 'eslint-plugin-react-hooks';
import jsxA11y from 'eslint-plugin-jsx-a11y';
import globals from 'globals';

export default [
  js.configs.recommended,
  {
    files: ['**/*.ts', '**/*.tsx'],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        project: './tsconfig.json',
      },
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
    plugins: {
      '@typescript-eslint': tseslint,
      react: reactPlugin,
      'react-hooks': reactHooksPlugin,
      'jsx-a11y': jsxA11y,
      prettier: eslintPluginPrettier,
    },
    rules: {
      'react/react-in-jsx-scope': 'off',
      'prettier/prettier': 'error',
      'no-unused-vars': 'warn',
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
  },
  {
    files: ['**/*.js'],
    languageOptions: {
      globals: {
        ...globals.node,
      },
    },
  },
  {
    files: ['**/*.cjs'],
    languageOptions: {
      globals: {
        ...globals.node,
      },
    },
  },
  {
    files: ['**/.*.js', '**/*.config.js'],
    languageOptions: {
      globals: {
        ...globals.node,
      },
    },
  },
  {
    ignores: ['dist', 'node_modules'],
  },
];
`,
  'prettier.config.js': `// prettier.config.js
module.exports = {
  semi: true,
  singleQuote: true,
  trailingComma: 'all',
  arrowParens: 'avoid',
};
`,
};

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
