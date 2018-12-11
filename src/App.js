import React from 'react';
import{Route} from 'react-router-dom';
import searchPage from './searchPage';
import mainPage from './mainPage';
import * as BooksAPI from './BooksAPI'
import './App.css'

class BooksApp extends React.Component {
  state = {
    books:[]
  }
  componentDidMount(){
    BooksAPI.getAll().then((books) =>{
      this.setState({books: books})
    })
  }
  moveShelf =(book,shelf) => {
    BooksAPI.update(book, shelf);

     BooksAPI.getAll().then((books) =>{
      this.setState({books: books})
    })

  }


  render() {
    return (
      <div className="app">
        <Route exact path="/" render={() =>(
          <mainPage 
        books={this.state.books}
        moveShelf={this.moveShelf}
        />
          )} />

        <Route path="/search" render={() =>(
          <searchPage
            moveShelf={this.moveShelf}
            books={this.state.books}
        />
          )} />  
      </div>
    )
  }
}

export default BooksApp
