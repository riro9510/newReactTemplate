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

const baseURL =import.meta.env.ENVIRONMENT==='production'?import.meta.env.VITE_API_URL_PROD:import.meta.env.VITE_API_URL_DEV ?? 'http://localhost:3000/api';
const token = import.meta.env.VITE_API_TOKEN;
const useCookies = import.meta.env.VITE_USE_COOKIES === 'true';

const getAuthHeaders = (token?: string): Record<string, string> => {
  return token ? { Authorization: 'Bearer ' + token } : {};
};

export const api = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
    ...(!useCookies ? getAuthHeaders(token) : {}),
  },
  withCredentials: useCookies,
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error);
    return Promise.reject(error);
  }
);
`,
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
    "module": "ESNext",
    "moduleResolution": "bundler",
    "strict": true,
    "jsx": "react-jsx",
    "baseUrl": "./",
    "paths": {
      "@/*": ["src/*"]
    },
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "allowImportingTsExtensions": true,
    "noEmit": true,
  },
  "include": ["src/**/*.ts", "src/**/*.tsx", "vite.config.ts","vite-env.d.ts"],
  "exclude": ["node_modules", "dist"]
}
`,
  '.env': `ENVIRONMENT=dev
    VITE_API_URL_DEV=http://localhost:3000/api
    VITE_API_URL_PROD=https://api.ejemplo.com
    VITE_API_TOKEN=MyReactApp
    VITE_USE_COOKIES=false
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
  'src/models/RequestClass.ts': `
/* eslint-disable */
export abstract class Request<T> {
  constructor(protected endpoint: string, protected data?: unknown) {}

  abstract send(): Promise<T>;

  protected async handleRequest(fetchFunction: () => Promise<T>): Promise<T> {
    try {
      return await fetchFunction();
    } catch (error) {
      console.error(\`Error in request to \${this.endpoint}:\`, error);
      throw error;
    }
  }
}
`,
  'src/models/GetRequest.ts': `
// GetRequest.ts
import { api } from "../services/api";
import { Request } from "./RequestClass";

export class GetRequest<T> extends Request<T> {
  async send(): Promise<T> {
    return this.handleRequest(async () => {
      const response = await api.get<T>(this.endpoint);
      return response.data;
    });
  }
}

`,
  'src/models/PostRequest.ts': `
// PostRequest.ts
import { api } from "../services/api";
import { Request } from "./RequestClass";

export class PostRequest<T> extends Request<T> {
  async send(): Promise<T> {
    return this.handleRequest(async () => {
      const response = await api.post<T>(this.endpoint, this.data);
      return response.data;
    });
  }
}
`,
  'src/hooks/useRequest.tsx': `
// useRequest.ts
import { useCallback, useState } from "react";
import { Request } from "../models/RequestClass";

export function useRequest<T>(request: Request<T>) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<unknown>(null);

  const send = useCallback(async (): Promise<T | null> => {
    setLoading(true);
    try {
      const result = await request.send();
      return result;
    } catch (err) {
      setError(err);
      return null;
    } finally {
      setLoading(false);
    }
  }, [request]);

  return { send, loading, error };
}
`,
  'src/layouts/dashBoardLayout.tsx': `
import { ReactNode } from "react"
import { Link, useLocation } from "react-router-dom"

export function DashboardLayout({ children }: { children: ReactNode }) {
  const { pathname } = useLocation()

  return (
    <div className="min-h-screen flex flex-col">
      {/* HEADER */}
      <header className="bg-white shadow-md px-6 py-4">
        <nav className="max-w-7xl mx-auto flex items-center justify-between">
          <h1 className="text-xl font-semibold">📚 BookPreview</h1>
          <ul className="flex gap-6">
            <li>
              <Link
                to="/books"
                className={\`text-sm font-medium transition-colors \${pathname === "/books"
                    ? "text-primary"
                    : "text-muted-foreground hover:text-primary"}\`}
              >
                Libros
              </Link>
            </li>
            <li>
              <Link
                to="/profile"
                className={\`text-sm font-medium transition-colors \${
                  pathname === "/profile"
                    ? "text-primary"
                    : "text-muted-foreground hover:text-primary"
                }\`}
              >
                Perfil
              </Link>
            </li>
          </ul>
        </nav>
      </header>

      {/* MAIN */}
      <main className="flex-1 bg-muted px-4 py-6">
        <div className="max-w-7xl mx-auto">{children}</div>
      </main>

      {/* FOOTER */}
      <footer className="bg-white text-muted-foreground text-sm text-center py-4 shadow-inner">
        © {new Date().getFullYear()} BookPreview. Todos los derechos reservados.
      </footer>
    </div>
  )
}
`,
  'src/routes/AppRoutes.tsx': `
import { Routes, Route } from "react-router-dom"
import {ROUTES} from "./routes"
import PrivateRoute from './PrivateRoute';

export default function AppRoutes(){
    return(
        <Routes>
            <Route path={ROUTES.login}/>
            <Route path={ROUTES.books}  element={
  <PrivateRoute>
    {/*<BooksScreen />*/}
  </PrivateRoute>
}/>
        </Routes>
    )
}`,
  'src/routes/PrivateRoute.tsx': `

import { Navigate } from "react-router-dom";
import { ReactNode } from "react";


interface Props {
    children: ReactNode;
}

const isAuthenticated = () => {
  return !!localStorage.getItem("token");
};

export default function PrivateRoute({ children }: Props) {
  return isAuthenticated() ? children : <Navigate to="/" replace />;
}
`,
  'src/routes/routes.tsx': `
export const ROUTES = {
    login: "/",
    books: "/books",
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
