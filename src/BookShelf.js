import React, { Component } from 'react'
import Book from './Book'
import { Link } from 'react-router-dom'

class BookShelf extends Component {


  generateShelfName = (shelf) => {
    let shelfName = shelf.split(/(?=[A-Z])/).join(" ");
    return shelfName.charAt(0).toUpperCase() + shelfName.slice(1);
  }

  render() {
    const { books, onShelfChange } = this.props
    const shelves = ['currentlyReading', 'wantToRead', 'read']

    return (
      <div>
        {shelves.map((shelf, index) =>
          <section className="shelf-title" key={index}>
            <h2>{this.generateShelfName(shelf)}</h2>
            <ul className="list-books">
              {books.filter(book => book.shelf === shelf)
                .map(book => (
                  <Book
                    onShelfChange={onShelfChange}
                    book={book}
                    shelf={shelf}
                    key={book.id}
                  />
                ))}
            </ul>
          </section>
        )}
        <Link
          to="/search"
          className="add-new-book">
          Search
        </Link>
      </div>
    )
  }
}

export default BookShelf
