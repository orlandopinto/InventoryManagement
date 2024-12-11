import './index.css'
import App from './App'
import { createRoot } from 'react-dom/client'
import React from 'react'

let root = createRoot(document.getElementById('root') as HTMLElement);

root.render(
    <App />
);