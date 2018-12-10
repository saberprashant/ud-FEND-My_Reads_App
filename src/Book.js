import React from 'react'


function Book(props) {

  if (!props.book.imageLinks) {
    props.book.imageLinks = 'https://via.placeholder.com/128x170/ff7f7f/333333?text=NoImage'
  }

  return (
    <li className="book-details" key={props.book.id}>
      <div className="image-of-book" style={{ backgroundImage: "url(" + props.book.imageLinks.smallThumbnail + ")" }}>
        <div className="change-shelf">
          <select value={props.shelf} onChange={(e) => props.onShelfChange(props.book, e.target.value)}>
            <option value="disabled" disabled>Move it to...</option>
            <option value="currentlyReading">Currently Reading</option>
            <option value="wantToRead">Want to Read</option>
            <option value="read">Read</option>
            <option value="none">None</option>
          </select>
        </div>
      </div>
      <p>{props.book.title}</p>
      {props.book.authors && <p><span className="gray-text">{props.book.authors[0]}</span></p>}
    </li>
  )
}

export default Book;
