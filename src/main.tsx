import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import RootStore, { StoreProvider } from "./stores/RootStore";

const store: RootStore = new RootStore();

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <StoreProvider store={store}>
    <App />
  </StoreProvider>
)
