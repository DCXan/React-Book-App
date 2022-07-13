import { Component } from "react";

class AddBook extends Component {

    constructor() {
        super()
        this.state = {
        
        }
    }

    handleInput = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    addBook = async () => {
        const settings = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(this.state)
        }
        try {
            const response = await fetch('http://localhost:8080/', settings)
            const books = await response.json()
            if(books.success) {
                this.props.onAdd()
            }
        } catch(error) {
            console.log(error)
        }
    }


    render() {
        return (
            <div>
                <input type = "text" name="title" onChange={this.handleInput} placeholder="Title"/>
                <input type = "text" name="genre" onChange={this.handleInput} placeholder="Genre"/>
                <input type = "text" name="publisher" onChange={this.handleInput} placeholder="Publisher"/>
                <input type = "text" name="year" onChange={this.handleInput} placeholder="Year"/>
                <input type = "text" name="imageURL" onChange={this.handleInput} placeholder="imageURL"/>
                <button onClick={this.addBook}>Add Book</button>
            </div>
        )
    }
}

export default AddBook