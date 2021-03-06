import React, { Component } from "react";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";

class ListBooks extends Component {
  handleMove = e => {
    let shelf = e.target.value;
    //  console.log("E is:", e, e.target, e.target.value)

    let book = this.props.bookShelf.filter(b => b.id === e.target.name);
    book = book[0];

    this.props.changeShelf({ book, shelf });
  };

  checkBookImage = book => {
    if (book.imageLinks === undefined) {
      return "./icons/thumbnail-not-found.png";
    } else {
      return book.imageLinks.smallThumbnail;
    }
  };

  render() {
    let bookShelf = this.props.bookShelf;

    let currentlyReadingShelf = bookShelf.filter(bookShelf => {
      return bookShelf.shelf === "currentlyReading";
    });

    let wantToReadShelf = bookShelf.filter(bookShelf => {
      return bookShelf.shelf === "wantToRead";
    });

    let readShelf = bookShelf.filter(bookShelf => {
      return bookShelf.shelf === "read";
    });

    return (
      <div>
        <div className="list-books-title">
          <h1>Still Can Has Reading</h1>
        </div>

        <div className="list-books-content">
          <div>
            <div className="bookshelf">
              <h2 className="bookshelf-title">Currently Reading</h2>
              <div className="bookshelf-books">
                <ol className="books-grid">
                  {currentlyReadingShelf.map(book => (
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
                            <div className="currentlyReading">
                              <select
                                name={book.id}
                                onChange={this.handleMove}
                                defaultValue="currentlyReading"
                              >
                                <option disabled="disabled">Move to...</option>
                                <option value="currentlyReading">
                                  Currently Reading
                                </option>
                                <option value="wantToRead">Want to Read</option>
                                <option value="read">Read</option>
                                <option value="none">None</option>
                              </select>
                            </div>
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

            <div className="bookshelf">
              <h2 className="bookshelf-title">Want to Read</h2>
              <div className="bookshelf-books">
                <ol className="books-grid">
                  {wantToReadShelf.map(book => (
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
                            <div className="wantToRead">
                              <select
                                name={book.id}
                                onChange={this.handleMove}
                                defaultValue="wantToRead"
                              >
                                <option disabled="disabled">Move to...</option>
                                <option value="currentlyReading">
                                  Currently Reading
                                </option>
                                <option value="wantToRead">Want to Read</option>
                                <option value="read">Read</option>
                                <option value="none">None</option>
                              </select>
                            </div>
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

            <div className="bookshelf">
              <h2 className="bookshelf-title">Read</h2>

              <div className="bookshelf-books">
                <ol className="books-grid">
                  {readShelf.map(book => (
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
                            <div className="read">
                              <select
                                name={book.id}
                                onChange={this.handleMove}
                                defaultValue="read"
                              >
                                <option disabled="disabled">Move to...</option>
                                <option value="currentlyReading">
                                  Currently Reading
                                </option>
                                <option value="wantToRead">Want to Read</option>
                                <option value="read">Read</option>
                                <option value="none">None</option>
                              </select>
                            </div>
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

        <Link className="open-search" to="/search">
          <Button variant="raised" color="primary">
            Hey Searchy...
          </Button>
        </Link>
      </div>
    );
  }
}

export default ListBooks;
