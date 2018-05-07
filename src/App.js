import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import './App.css';
import ListBooks from './listBooks';
import SearchBooks from './searchBooks';
import * as BooksAPI from './BooksAPI';

class App extends Component {
  state = {
    screen : ''
  }

render() {
return (

<div className="App">

<Route exact path = "/" render={() =>(
  <div className="list-books">
    <ListBooks/>
  </div>
)}/>


<Route path = "/search" render={() =>(
  <div className="search-books">
    <SearchBooks/>
  </div>

)}/>



      </div> // className App
    ) // return
  } // render
} // class BookShop


export default App;
