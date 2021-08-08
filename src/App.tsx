import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from '@blueprintjs/core';
import logo from './logo.svg';
import './App.css';
import { stateParentAdded, stateParentSelector } from '@/slices/stateParents';

import { BrowserRouter, Route } from 'react-router-dom'
import Home from '@/pages/home';

function App() {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(
      stateParentAdded({
        stateParentId: 'id',
        order: 0,
        title: 'some state'
      })
    )
  }, []);
  
  const allStateParents = useSelector(stateParentSelector.selectAll);
  console.log('allStateParents:', allStateParents);

  return (
    <div className="App">
      <BrowserRouter>
        <Route
          path="/"
          component={Home}
          exact
        />
      </BrowserRouter>
    </div>
  );
}

export default App;
