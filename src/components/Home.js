import React, { Component } from 'react';
import axios from 'axios';
import './App.css';
import Search from './Search';
import Result from './Result';

let index=0;
  
class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentIndex : 0,
            books: [],
            value: '',
            isLoading: false,
            error: false,
        }
    }

    componentDidMount() {
        window.onscroll = (e) => {
          if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
            this.handleMoreIndex();
          }
        }
    }

    handleSearch = e => {
        const value = e.target.value
        this.setState({
          value
        });
      }

      handleSubmit = e => {   
        const API = `https://www.googleapis.com/books/v1/volumes?q=${this.state.value}`;

        e.preventDefault();
        this.setState({ isLoading: true });

        axios.get(API+`&printType=books&startIndex=`+index)
            .then(results => {
                if(index=0) {
                    this.setState({
                        books: results.data.items,
                        isLoading: false,
                    })
                }
                else if(index>0) {
                    const nextBooks = results.data.items.map(book => ({
                        image: ((book.volumeInfo.imageLinks) ? book.volumeInfo.imageLinks.thumbnail : undefined),
                        title: ((book.volumeInfo.title) ? book.volumeInfo.title : undefined),
                        description: ((book.volumeInfo.description) ? book.volumeInfo.description : undefined)
                    }))
            
                      this.setState({
                        hasMore: (this.state.books.length < 100),
                        isLoading: false,
                        books: [
                          ...this.state.books,
                          ...nextBooks,
                        ],
                      });
                      index+=10;
                    }
                })

            .catch(error => {
                this.setState({
                    error,
                    isLoading: false
                })
            });
    }

    handleMoreIndex = () => {
        const { index } = this.state;
        const newIndex = index + 10;
        this.setState({ index: newIndex}, () => this.handleSubmit());   
    }
   
    render() {
        return (
            <div className="home" id="Home">
                <p>Wyszukaj książki: </p>
                <Search 
                    handleSubmit={this.handleSubmit} 
                    value={this.state.value}
                    handleSearch={this.handleSearch} 
                />
                <Result books={this.state.books} />
            </div>
        );
    }
}

export default Home;