import { createRoot } from 'react-dom/client';
import { Game } from './Game';
import './index.css';

const container = document.getElementById('root');
const root = createRoot(container);
root.render(<Game />);
