import React, { Component } from "react";
import AddBook from "./components/AddBook";
import BookList from "./components/BookList";

class App extends Component {

  constructor() {
    super()
    this.state = {
      books: []
    }
  }

  componentDidMount() {
    this.fetchBooks()
  }

  fetchBooks = async () => {
    
    const response = await fetch('http://localhost:8080/')
    const result = await response.json()
    this.setState({
      books: result
    })
  }

  handleAdd = () => {
    this.fetchBooks()
  }

  render() {
    return (
      <div>
        <AddBook onAdd = {this.handleAdd}/>
        <BookList books = {this.state.books}/>
      </div>
    )
  }
}

export default App