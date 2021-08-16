import './App.css';
import { ThemeProvider } from 'styled-components';
import { BrowserRouter, Route } from 'react-router-dom'
import Home from '@/pages/home';
import { PersistGate } from 'redux-persist/integration/react'
import { persistStore } from 'redux-persist'
import store from '@/store';
import { darkTheme } from '@/style/vars';
import Modal from 'react-modal';

let persistor = persistStore(store)
Modal.setAppElement('#root');

function App() {
  return (
    <div className="App">
      <PersistGate loading={null} persistor={persistor}>
        <ThemeProvider theme={darkTheme}>
          <BrowserRouter>
            <Route
              path="/"
              component={Home}
              exact
            />
          </BrowserRouter>
        </ThemeProvider>
      </PersistGate>
    </div>
  );
}

export default App;
