import React from 'react'
import ReactDOM from 'react-dom/client'
import './style/style.css'

import { atom } from 'jotai'
import { dataFormat } from './types/dataTypes'
import { App } from './App'

const rootElement = document.getElementById('root')
if (!rootElement) {
    throw new Error("Root element with ID 'root' not found")
}

export const employeesAtom = atom<dataFormat[]>([])

ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
        <App/>
    </React.StrictMode>
)
