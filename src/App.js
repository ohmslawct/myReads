import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import './App.css';
import ListBooks from './listBooks';
import SearchBooks from './searchBooks';
import * as BooksAPI from './BooksAPI';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

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
    console.log(bookShelf);

  })
}


mySearch(searchQuery){
  BooksAPI.search(searchQuery).then( (searchResult) => {

  console.log("Search Query", searchQuery);
  console.log("Search Result", searchResult);


    if( typeof(searchResult) === "undefined"){
        console.log("My Searchy Says Nothing Found");
        this.setState(state => ({
          searchArray : []
        }))

    } else if (searchResult.error==="empty query"){
      console.log("Empty");
      this.setState(state => ({
        searchArray : []
      }))

    } else {
      this.setState(state => ({
        searchArray : searchResult
      }))
    }
  }).catch( (error) => {
    console.log("ERROR", error);
  })
}

changeShelf(info){

let filtered = this.state.bookShelf.map( (b)=> {
  if (b.id === info.bookId){
    b.shelf = info.shelfInfo;
  }
  return b;
})

this.setState(state => ({
  bookShelf : filtered
}))
}

addToShelf(info){

let bookToAdd = this.state.searchArray.map( (b)=> {
  if (b.id === info.bookId){
    b.shelf = info.shelfInfo;
    
  }
  return b;
})

this.setState(state => ({
  bookShelf : this.state.bookShelf.concat(bookToAdd)
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
