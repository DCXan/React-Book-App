import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Route, Routes, BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux';
import { createStore, combineReducers } from 'redux';
import BookList from './components/BookList';
import AddBook from './components/AddBook';
import BaseLayout from './components/BaseLayout';
import Register from './components/Register';
import Login from './components/Login';
import authReducer from './reducers/authenticationReducer'
import cartReducer from './reducers/cartReducer'

const rootReducer = combineReducers({
  authReducer: authReducer,
  cartReducer: cartReducer
})

const store = createStore(rootReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
    <BrowserRouter>
    <BaseLayout>
      <Routes>
        <Route path = "/" element = {<App/>}/>
        <Route path = "/add-book" element = {<AddBook/>}/>
        <Route path = "/register" element = {<Register/>}/>
        <Route path = "/login" element = {<Login/>}/>
        <Route path = "/my-books" element = {<BookList/>}/>
      </Routes>
    </BaseLayout>
    </BrowserRouter>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
