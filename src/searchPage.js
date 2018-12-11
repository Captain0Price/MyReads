import React, {component} from 'react';
import {Link} from 'react-router-dom';
import book from './books';
import * as BooksAPI from './BooksAPI';
class searchPage extends component{
	state = {
		query: '',
		searchedBooks:[]
	}

	updateQuery = (query) => {
		this.setState({
			query: query
		})
		this.updateSearchedBooks(query);
	}

	updateSearchedBooks = () => {
		if (this.state.query){
			BooksAPI.search(this.state.query).then((searchedBooks) => {
				if (searchedBooks.error) {
					this.setState({searchedBooks: []});		
				} else {
					this.setState({searchedBooks:searchedBooks})
				}
		})	
		} else {
			this.setState({searchedBooks: []});
		}
		
	}

	render (){
		return (
			<div className="search-books">
	            <div className="search-books-bar">

	              <Link 
		              to="/"
		              className="close-search" 
	              >Close</Link>

	              <div className="search-books-input-wrapper">
	                <input 
		                type="text" 
		                placeholder="Search by title or author"
		                value={this.state.query}
		                onChange={(event) => this.updateQuery(event.target.value)}
	                />
	              </div>

	            </div>

	            <div className="search-books-results">

	              <ol className="books-grid">
		              {
		              	this.state.searchedBooks.map(searchedBook => {
		              		let shelf = "none";

		              		this.props.books.map(book =>(
		              			book.id === searchedBook.id ?
		              			shelf = book.shelf : ''		           
		              			));

		              		return (
		              			<li key={searchedBook.id}>
				              		<book
					              		book={searchedBook}
					              		moveShelf={this.props.moveShelf}
					              		currentShelf={shelf}
				              		/>
			              		</li>
	              			)
		              	})
		              }
	              </ol>
	              
	            </div>
          </div>
		);
	}
}

export default searchPage;

