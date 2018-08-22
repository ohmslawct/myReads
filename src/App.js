import React, { Component } from "react";
import { Route } from "react-router-dom";
import "./App.css";
import ListBooks from "./listBooks";
import SearchBooks from "./searchBooks";
import * as BooksAPI from "./BooksAPI";

class App extends Component {
  state = {
    screen: "/",
    bookShelf: [],
    searchArray: []
  };

  async componentDidMount() {
    const books = await BooksAPI.getAll();
    this.setState({ bookShelf: books });

    // old method (Keep for learning purposes)
    // BooksAPI.getAll().then((bookShelf)=> {
    //   this.setState({ bookShelf : bookShelf })
    // })
  }

  mySearch(searchQuery) {
    BooksAPI.search(searchQuery)
      .then(searchResult => {
        if (typeof searchResult === "undefined") {
          this.setState(state => ({
            searchArray: []
          }));
        } else if (searchResult.error === "empty query") {
          this.setState(state => ({
            searchArray: []
          }));
        } else {
          searchResult.forEach(book => {
            book.shelf = "None";
          });

          searchResult.forEach(book => {
            this.state.bookShelf.filter(b => {
              if (book.id === b.id) {
                book.shelf = b.shelf;
                return null;
              } else {
                return null;
              }
            });
          });

          this.setState(state => ({
            searchArray: searchResult
          }));
        }
      })
      .catch(error => {
        console.log("ERROR", error);
      });
  }

  changeShelf(info) {
    let book = info.book;
    let shelf = info.shelf;

    BooksAPI.update(book, shelf).then(() => {
      //console.log("Updated Shelf");
      // update bookshelf locally
      let updatedShelf = this.state.bookShelf.map(b => {
        if (b.id === book.id) {
          b.shelf = shelf;
        }
        return b;
      });
      this.setState({ bookShelf: updatedShelf });
    });
  } // changeShelf

  render() {
    return (
      <div className="app">
        <Route
          exact
          path="/"
          render={() => (
            <div className="list-books">
              <ListBooks
                bookShelf={this.state.bookShelf}
                changeShelf={info => {
                  this.changeShelf(info);
                }}
              />
            </div>
          )}
        />

        <Route
          path="/search"
          render={() => (
            <div className="search-books">
              <SearchBooks
                bookShelf={this.state.bookShelf}
                searchArray={this.state.searchArray}
                mySearch={searchQuery => {
                  this.mySearch(searchQuery);
                }}
                addToShelf={info => {
                  this.addToShelf(info);
                }}
                changeShelf={info => {
                  this.changeShelf(info);
                }}
              />
            </div>
          )}
        />
      </div> // className App
    ); // return
  } // render
} // class BookShop

export default App;
