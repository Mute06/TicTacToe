import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import "./styles.css";
import App from './Tic-Tac-Toe.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
