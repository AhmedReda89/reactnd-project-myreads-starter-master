import React from 'react'
import * as BooksAPI from './BooksAPI'
import { Route } from 'react-router-dom'
import './App.css'
import Search from './components/Search'
import List from './components/List'


class BookManager extends React.Component {
  state = {
    query: '',
    shearches: [],
    validSearch: true,
    books: [],
  }

  componentDidMount() {

    this.getAllBooks()

  }

  getAllBooks = () => BooksAPI.getAll().then((books) => this.setState({ books }))

  changeShelf = (book, shelf) => {

    if (book.shelf !== shelf) {
      BooksAPI.update(book, shelf).then(() => {
        book.shelf = shelf
        this.setState(state => ({
          books: state.books.filter(b => b.id !== book.id).concat([book])
        }))
      })
    }

  }

  updateQuery = (query) => {

    this.setState({ query })
    this.searchOutput(query)

  }

  searchOutput = (query) => {
    if (query) {

      BooksAPI.search(query).then((shearches) => {
        console.log(shearches)

        if (shearches.error) {
          this.setState({
            shearches: [],
            validSearch: false
          })

        } else {
          shearches.map(bookFromSearch =>
            (this.state.books.map(bookFromShelf =>
              bookFromShelf.id === bookFromSearch.id ?
                bookFromSearch.shelf = bookFromShelf.shelf :
                "")))

          this.setState({
            shearches: shearches,
            validSearch: true
          })
        }
      })

    } else {
      this.setState({
        shearches: [],
        validSearch: true
      })
    }
  }

  render() {
    return (
      <div className="app">

        <Route exact path='/' render={() => (

          <List
            books={this.state.books}
            changeShelf={this.changeShelf}
          />

        )} />

        <Route path='/components/Search' render={() => (

          <Search
            query={this.state.query}
            updateQuery={this.updateQuery}
            output={this.state.shearches}
            changeShelf={this.changeShelf}
            validSearch={this.state.validSearch}
          />

        )} />

      </div>
    )
  }
}

export default BookManager
