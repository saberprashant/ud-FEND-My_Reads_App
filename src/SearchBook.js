import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI.js'

import Book from './Book'


class SearchBook extends Component {

  state = {
    query: '',
    books: [],
    searchError: false
  }

  queryUpdate = query => {
    this.setState({ query })
    if (!query || (query === '')) {
      this.setState({
        books: []
      })
    } else {
      BooksAPI.search(query)
        .then(books => {
          books.map(book => {
            book.shelf = 'none',
              this.props.booksOnShelf.forEach(bookOnShelf => {
                book.id === bookOnShelf.id && (
                  book.shelf = bookOnShelf.shelf
                )
              })
          })
          this.setState({
            books: books,
            searchError: false
          })
        })
        .catch(error => {
          this.setState({
            books: [],
            searchError: true
          })
          console.log(this.state.searchError)
        })
    }
  }

  render() {
    const { query, searchError, books } = this.state
    const { onShelfChange } = this.props

    return (
      <div>
        <div className="search">
          <Link
            to="/"
            className="close-search">
            Back
          </Link>
          <input
            type="text"
            placeholder="Search a book by title or author..."
            value={query}
            onChange={event => this.queryUpdate(event.target.value)}
          >
          </input>
        </div>

        <ul className="list-books">
          {searchError === true && (
            <div className="no-book-found">
              No books found. Please try again with some other name.
            </div>
          )}
          {searchError === false && (
            books.map(book => (
              <Book
                onShelfChange={onShelfChange}
                book={book}
                shelf={book.shelf}
                key={book.id}
              />
            ))
          )}
        </ul>
      </div>
    )
  }
}

export default SearchBook;
