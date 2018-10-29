import React from 'react'

import Book from './Book'

const shelf = ({ title, changeShelf, shelfFilter }) => {

    return (

        <div className="bookshelf">
            <h2 className="bookshelf-title">{title}</h2>
            <div className="bookshelf-books">
                <ol className="books-grid">

                    {shelfFilter.map(book => (

                        <li key={book.id}>
                            <Book
                                book={book}
                                changeShelf={changeShelf}
                            />
                        </li>

                    ))}
                </ol>
            </div>
        </div>

    )
}

export default shelf