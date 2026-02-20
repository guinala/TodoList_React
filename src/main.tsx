import { createRoot } from 'react-dom/client'
import './index.css'
import TodoList from './App.tsx'

createRoot(document.getElementById('root')!).render(
    <TodoList />
)
