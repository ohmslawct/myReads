import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import './App.css';
import ListBooks from './listBooks';
import SearchBooks from './searchBooks';
import * as BooksAPI from './BooksAPI';

class App extends Component {

state = {
  screen : '/',
  bookShelf : [],
  searchArray : [],
  myCurrentlyReadingArray : [],
  myWantToReadArray : [],
  myReadArray : []
}


componentDidMount(){
  BooksAPI.getAll().then((bookShelf)=> {
    this.setState({ bookShelf : bookShelf })
  })
}

mySearch(searchQuery){
  BooksAPI.search(searchQuery).then( (searchResult) => {

    if( typeof(searchResult) === "undefined"){
        this.setState(state => ({
          searchArray : []
        }))

    } else if (searchResult.error==="empty query"){
      this.setState(state => ({
        searchArray : []
      }))

    } else {
      searchResult.forEach(book =>  {
          book.shelf = "None";
      }
      )

      this.setState(state => ({
        searchArray : searchResult
      }))
    }
  }).catch( (error) => {
    console.log("ERROR", error);
  })
}

changeShelf(info){

let filtered = this.state.bookShelf.map( (book)=> {
  if (book.id === info.bookId){
    book.shelf = info.shelfInfo;
  }
  return book;
})

this.setState(state => ({
  bookShelf : filtered
}))
}

// change value of 'shelf' for a book to reflect the correct bookshelf description. Add the book to the user's shelf.
addToShelf(info){

    let bookToAdd = this.state.searchArray.filter( (b)=> {
      return b.id === info.bookId
    });

    // change the shelf status for the newly added book
    bookToAdd[0].shelf = info.shelf;

    // add the newly selected book to the user's bookshelf
    if (this.state.bookShelf.indexOf(bookToAdd[0].id) === -1){
      this.state.bookShelf.push(bookToAdd[0])
    }

    // update the bookshelf state
    this.setState(state => ({
      bookShelf : this.state.bookShelf
    }))
}



render() {
return (

<div className="app">

<Route exact path = "/" render={() =>(
  <div className="list-books">
    <ListBooks
      bookShelf = {this.state.bookShelf}
      changeShelf = {(info) => {
        this.changeShelf(info)
      }}
    />
  </div>
)}/>


<Route path = "/search" render={() =>(
  <div className="search-books">
    <SearchBooks
    bookShelf = {this.state.bookShelf}
    searchArray = {this.state.searchArray}
    mySearch = {(searchQuery) =>{
    this.mySearch(searchQuery)
    }}
    addToShelf = { (info) => {
      this.addToShelf(info)
    }}
    />
  </div>

)}/>

      </div> // className App
    ) // return
  } // render
} // class BookShop


export default App;
