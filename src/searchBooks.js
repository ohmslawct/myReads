import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import PropTypes from 'prop-types'

const propTypes = {
  bookShelf: PropTypes.array.isRequired,
  query: PropTypes.string.isRequired
};

// Randomly choose placholder text
let myPlaceholder;
let myRandomishNumber = Math.floor(Math.random() * 100);
// console.log(myRandomishNumber);

if (myRandomishNumber % 2 == "0") {
  myPlaceholder = "Hey Searchy";
} else {
  myPlaceholder = "Searchy Book Now?";
}
if (myRandomishNumber >= "90") {
  myPlaceholder = "Search, Searchy?";
}



// main code

class SearchBooks extends Component {

  state = {
    query: ''
  }


	checkBookImage = (bookImageUrl) =>{
		if (bookImageUrl === ""){
			return "./icons/thumbnail-not-found.jpg"
		} else {
			return bookImageUrl;
		}
	}


  handleSubmit = (e) => {
    //  console.log("Submitting Search Form");
    //  e.preventDefault();
    //  const values = serializeForm(e.target, {hash : true})
    let query = e.target.value;

    if (this.props.mySearch) {
      //  console.log("My Query: ", query);
      this.props.mySearch(query);
    }
    this.setState({query: query})
  }

  handleMove = (e) => {
    let bookId = e.target.name;
    let shelf = e.target.value;
    this.props.addToShelf({bookId, shelf});
    //	this.setState({state : this.state});
  }


  render() {

    let searchArray = this.props.searchArray;

    return (<div>

      <div className="search-books-bar">
        <Link className="close-search" to="/">Close</Link>

        <div className="search-books-input-wrapper">

          <input onChange={this.handleSubmit} type="text" name="searchTerms" placeholder={myPlaceholder} value={this.state.query}/>

        </div>
      </div>

      <div className="search-books-results">
        <ol className="books-grid"></ol>
      </div>

      <div className="list-books-content">
        <div>
          <div className="bookshelf">
            <h2 className="bookshelf-title"></h2>
            <div className="bookshelf-books">
              <ol className="books-grid">

                {
                  searchArray.map((book, index) => (<li key={book.id}>
                    <div className="book">
                      <div className="book-top">
                        <div className="book-cover" style={{
                            width: 128,
                            height: 193,
                            backgroundImage: `url(${this.checkBookImage(book.imageLinks.smallThumbnail)})`
                          }}></div>
                        <div className="book-shelf-changer">
                          <select name={book.id} onChange={this.handleMove}>
                            <option value="none" disabled="disabled">Move to...</option>
                            <option value="currentlyReading">Currently Reading</option>
                            <option value="wantToRead">Want to Read</option>
                            <option value="read">Read</option>
                            <option value="none" selected="selected">None</option>
                          </select>
                        </div>
                      </div>
                      <div className="book-title">{book.name}
                      </div>
                      <div className="book-authors">{book.authors}</div>
                    </div>
                  </li>))
                }
              </ol>
            </div>
          </div>

        </div>
      </div>

    </div>)
  }
}

export default SearchBooks
