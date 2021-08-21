import './App.css';
import { ThemeProvider } from 'styled-components';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom'
import Home from '@/pages/home';
import About from '@/pages/about';
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
          <BrowserRouter basename="easy-state">
            <Switch>
              <Route
                path="/"
                component={Home}
                exact
              />
              <Route
                path="/about"
                component={About}
                exact
              />
              <Route>
                <Redirect to="/" />
              </Route>
            </Switch>
          </BrowserRouter>
        </ThemeProvider>
      </PersistGate>
      {/* <Footer /> */}
    </div>
  );
}

export default App;
