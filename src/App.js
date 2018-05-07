import React from 'react';
import { Route } from 'react-router-dom';
import * as BooksAPI from './BooksAPI';
import './App.css';
import ListBooks from './listBooks';
import SearchBooks from './searchBooks';


class BooksApp extends React.Component {
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    showSearchPage: false,
    screen : 'home'
  }

  render() {
    return (

      <div className="app">






        {this.state.showSearchPage ? (
          <div className="search-books">
            <SearchBooks/>
          </div>

        ) : (

          <div className="list-books">
            <ListBooks/>
          </div>

        ) // turnary end
        }







      </div> // className App
    ) // return
  } // render
} // class BookShop


export default BooksApp
