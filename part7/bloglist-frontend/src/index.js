import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { Provider } from 'react-redux'
import store from './store'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import AllUserStats from './components/AllUserStats'
import UserStats from './components/UserStats'
import BlogInfo from './components/BlogInfo'
import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'


ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/users" element={<AllUserStats />} />
        <Route path="/users/:id" element={<UserStats />} />
        <Route path="/blogs/:id" element={<BlogInfo />} />
      </Routes>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
)
