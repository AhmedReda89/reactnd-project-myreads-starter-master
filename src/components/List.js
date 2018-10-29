import React from 'react'
import { Link } from 'react-router-dom'

import Header from './Header'
import Shelf from './Shelf'


const search = ({ books, changeShelf }) => {

    const shelves = ["currentlyReading", "wantToRead", "read"]
    const title = shelf => {
        switch (shelf) {
            case "currentlyReading":
                return "Currently Reading"
            case "wantToRead":
                return "Want to Read"
            default:
                return "Read"
        }
    }

    return (

        <div className="list-books">

            <Header title='Books Manager' />

            <div className="list-books-content">
                <div>

                    {
                        shelves.map(shelf => (
                            <Shelf
                                key={shelf}
                                title={title(shelf)}
                                shelfFilter={books.filter(book => book.shelf === shelf)}
                                changeShelf={changeShelf}
                            />
                        ))
                    }

                    <div className="open-search">

                        <Link
                            to='/components/Search'>
                            Add a book
                            </Link>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default search