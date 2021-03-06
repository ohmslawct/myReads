import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
//import { Debounce } from 'react-throttle';
import { DebounceInput } from "react-debounce-input";

// main code

class SearchBooks extends Component {
  state = {
    query: ""
  };

  checkBookImage = book => {
    if (book.imageLinks === undefined) {
      return "./icons/thumbnail-not-found.png";
    } else {
      return book.imageLinks.smallThumbnail;
    }
  };

  handleSubmit = e => {
    let query = e.target.value;

    if (this.props.mySearch) {
      this.props.mySearch(query);
    }
    this.setState({ query: query });
  };

  handleMove = e => {
    let shelf = e.target.value;
    let book = this.props.searchArray.filter(b => {
      if (b.id === e.target.name) {
        return b;
      } else {
        return null;
      }
    });

    book = book[0];
    this.props.changeShelf({ book, shelf });
  }; // handleMove

  render() {
    // Randomly choose placholder text
    let myPlaceholder;
    let myRandomishNumber = Math.floor(Math.random() * 100);

    if (myRandomishNumber % 2 === "0") {
      myPlaceholder = "Hey Searchy";
    } else {
      myPlaceholder = "Searchy Book Now?";
    }
    if (myRandomishNumber >= "90") {
      myPlaceholder = "Search, Searchy?";
    }

    // start main code

    let searchArray = this.props.searchArray;

    return (
      <div>
        <div className="search-books-bar">
          <Link className="close-search" to="/">
            Close
          </Link>

          <div className="search-books-input-wrapper">
            <DebounceInput
              minLength={2}
              debounceTimeout={100}
              onChange={this.handleSubmit}
              type="text"
              name="searchTerms"
              placeholder={myPlaceholder}
              value={this.state.query}
            />
          </div>
        </div>

        <div className="search-books-results">
          <ol className="books-grid" />
        </div>

        <div className="list-books-content">
          <div>
            <div className="bookshelf">
              <h2 className="bookshelf-title">Resultz</h2>
              <div className="bookshelf-books">
                <ol className="books-grid">
                  {searchArray.map((book, index) => (
                    <li key={book.id}>
                      <div className="book">
                        <div className="book-top">
                          <div
                            className="book-cover"
                            style={{
                              width: 128,
                              height: 193,
                              backgroundImage: `url(${this.checkBookImage(
                                book
                              )})`
                            }}
                          />
                          <div className="book-shelf-changer">
                            <select
                              name={book.id}
                              onChange={this.handleMove}
                              defaultValue={book.shelf}
                            >
                              <option disabled="disabled">Move to...</option>
                              <option value="currentlyReading">
                                Currently Reading
                              </option>
                              <option value="wantToRead">Want to Read</option>
                              <option value="read">Read</option>
                              <option value="None">None</option>
                            </select>
                          </div>
                        </div>
                        <div className="book-title">{book.name}</div>
                        <div className="book-authors">{book.authors}</div>
                      </div>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

SearchBooks.propTypes = {
  bookShelf: PropTypes.array.isRequired
};

export default SearchBooks;
