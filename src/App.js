import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import * as BooksAPI from './BooksAPI.js'

import BooksShelf from './BooksShelf'
import SearchBook from './SearchBook'

import './App.css'


class App extends Component {
  state = {
    books: []
  }

  componentDidMount() {
    BooksAPI.getAll()
      .then((books) => {
        this.setState({
          books
        })
      })
  }

  ShelfChange = (book, shelf) => {
    BooksAPI.update({ id: book.id }, shelf)
      .then(() => {
        book.shelf = shelf;
        this.setState(state => ({
          books: state.books.filter(b => b.id !== book.id).concat(book)
        }));
      })
  }

  render() {
    return (
      <div className="App">
        <header className="app-title">
          <h1 className="title">My Reads</h1>
          <h4> Keep track of your books anytime, anywhere. </h4>
        </header>
        <Route exact path="/" render={() => (
          <BooksShelf
            onShelfChange={this.ShelfChange}
            books={this.state.books}
          />
        )} />
        <Route exact path="/search" render={() => (
          <SearchBook
            onShelfChange={this.ShelfChange}
            booksOnShelf={this.state.books}
          />
        )} />
      </div>
    );
  }
}

export default App;
