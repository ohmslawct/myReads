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


    async componentDidMount(){
      const books = await BooksAPI.getAll();
      this.setState({bookShelf : books});

      // old method (Keep for learning purposes)
      // BooksAPI.getAll().then((bookShelf)=> {
      //   this.setState({ bookShelf : bookShelf })
      // })
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

          searchResult.forEach(book =>  {
              this.state.bookShelf.filter( (b) => {
                if (book.id === b.id){
                  book.shelf = b.shelf;
                  return null;
                } else{
                  return null;
                }
              })
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

    let book = info.book;
    let shelf = info.shelf;

    // update Books api

    BooksAPI.update(book, shelf).then( () => {
      //console.log("Updated Shelf");
            // update bookshelf locally
            let updatedShelf = this.state.bookShelf.map( (b) =>{
                if (b.id === book.id){
                  b.shelf = shelf;
                }
                return b;
              });
              this.setState( {bookShelf : updatedShelf });
    });


    // Please retain commented code for educational purposes.

    // BooksAPI.getAll().then((bookShelf)=> {
    //   console.log("Updating State");
    //   this.setState({ bookShelf : bookShelf })
    // }).then( () => {
    //   console.log("Updated State Bookshelf");
    // })



    } // changeShelf




    // change value of 'shelf' for a book to reflect the correct bookshelf description. Add the book to the user's shelf.



    addToShelf(info){

        let book = info.book;
        let shelf = info.shelf;

        BooksAPI.update(book, shelf).then( () => {
        //  console.log("Updated Shelf");
        });

        // update bookshelf locally
        this.state.bookShelf.map( (b) =>{
            if (b.id === book.id){
              b.shelf = shelf;
            }
            return b;
          });

  // Please retain commented code for educational purposes.
        // BooksAPI.getAll().then((bookShelf)=> {
        //   console.log("Updating State");
        //   this.setState({ bookShelf : bookShelf })
        // }).then( () => {
        //   console.log("Updated State Bookshelf");
        // })
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
        changeShelf = { (info) => {
          this.changeShelf(info)
        }}
        />
      </div>

    )}/>

          </div> // className App
        ) // return
      } // render
    } // class BookShop


export default App;
