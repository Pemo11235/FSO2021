import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { Provider } from 'react-redux'
import store from './store'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import AllUserStats from './components/AllUserStats'

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/users" element={<AllUserStats />} />
      </Routes>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
)
