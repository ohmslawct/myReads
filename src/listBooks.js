import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import Button from '@material-ui/core/Button'

class ListBooks extends Component {

  handleMove = (e) => {
    let bookId = e.target.name;
    let shelfInfo = e.target.value;
    this.props.changeShelf({bookId, shelfInfo});
  };


  checkBookImage = (bookImageUrl) =>{
		if (bookImageUrl === ""){
			return "./icons/thumbnail-not-found.jpg"
		} else {
			return bookImageUrl;
		}
	}

  render() {

    let bookShelf = this.props.bookShelf;

    let currentlyReadingShelf = bookShelf.filter((bookShelf) => {
      return bookShelf.shelf === "currentlyReading"
    });

    let wantToReadShelf = bookShelf.filter((bookShelf) => {
      return bookShelf.shelf === "wantToRead"
    });

    let readShelf = bookShelf.filter((bookShelf) => {
      return bookShelf.shelf === "read"
    });

    return (<div>

      <div className="list-books-title">
        <h1>Can Has Reading?</h1>
      </div>

      <div className="list-books-content">
        <div>
          <div className="bookshelf">
            <h2 className="bookshelf-title">Currently Reading</h2>
            <div className="bookshelf-books">
              <ol className="books-grid">

                {
                  currentlyReadingShelf.map((book) => (<li key={book.id}>
                    <div className="book">
                      <div className="book-top">
                        <div className="book-cover" style={{
                            width: 128,
                            height: 193,
                            backgroundImage: `url(${this.checkBookImage(book.imageLinks.smallThumbnail)})`
                          }}></div>
                        <div className="book-shelf-changer">
                          <div className="currentlyReading">
                            <select name={book.id} onChange={this.handleMove}>
                              <option value="none" disabled="disabled">Move to...</option>
                              <option value="currentlyReading" selected="selected">Currently Reading</option>
                              <option value="wantToRead">Want to Read</option>
                              <option value="read">Read</option>
                              <option value="none">None</option>
                            </select>
                          </div>
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

          <div className="bookshelf">
            <h2 className="bookshelf-title">Want to Read</h2>
            <div className="bookshelf-books">
              <ol className="books-grid">

                {
                  wantToReadShelf.map((book) => (<li key={book.id}>
                    <div className="book">
                      <div className="book-top">
                        <div className="book-cover" style={{
                            width: 128,
                            height: 193,
                            backgroundImage: `url(${this.checkBookImage(book.imageLinks.smallThumbnail)})`
                          }}></div>

                        <div className="book-shelf-changer">
                          <div className="wantToRead">
                            <select name={book.id} onChange={this.handleMove}>
                              <option value="none" disabled="disabled">Move to...</option>
                              <option value="currentlyReading">Currently Reading</option>
                              <option value="wantToRead" selected="selected">Want to Read</option>
                              <option value="read">Read</option>
                              <option value="none">None</option>
                            </select>
                          </div>
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

          <div className="bookshelf">
            <h2 className="bookshelf-title">Read</h2>

            <div className="bookshelf-books">
              <ol className="books-grid">

                {
                  readShelf.map((book) => (<li key={book.id}>
                    <div className="book">
                      <div className="book-top">
                        <div className="book-cover" style={{
                            width: 128,
                            height: 193,
                            backgroundImage: `url(${this.checkBookImage(book.imageLinks.smallThumbnail)})`
                          }}></div>
                        <div className="book-shelf-changer">
                          <div className="read">
                            <select name={book.id} onChange={this.handleMove}>
                              <option value="none" disabled="disabled">Move to...</option>
                              <option value="currentlyReading">Currently Reading</option>
                              <option value="wantToRead">Want to Read</option>
                              <option value="read" selected="selected">Read</option>
                              <option value="none">None</option>
                            </select>
                          </div>
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

      <Link className="open-search" to="/search">
        <Button variant="raised" color="primary">
          Hey Searchy...
        </Button>
      </Link>

    </div>)
  }
}

export default ListBooks
