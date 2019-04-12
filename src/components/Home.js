import React, { Component } from 'react';
import axios from 'axios';
import './App.css';
import Search from './Search';
import Result from './Result';

let index=0;

function wait(ms) {
    var d = new Date();
    var d2 = null;
    do { d2 = new Date(); }
    while(d2-d < ms);
}

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            books: [],
            value: '',
            isLoading: false,
            error: false,
        }
    }

    // checks whether the user is on the bottom of the page
    componentDidMount() {
        window.onscroll = (e) => {
          if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
            return (
                this.handleMoreIndex(e),
                wait(500)
            )
          }
        }
    }

    // increases the index value
    handleMoreIndex = (e) => {
        index = index + 10;
        this.handleSubmit(e)           
    }

    // gets the value entered in the input
    handleSearch = e => {
        const value = e.target.value
        this.setState({
          value
        });
      }

    // checks whether the word has been changed
    handleCheck = e => {
        if(index>0) {
            return (
                index=0,
                this.handleSubmit(e)
            );
        }
        this.handleSubmit(e);
    }

    // gets results from API
    handleSubmit = e => {   
    const API = `https://www.googleapis.com/books/v1/volumes?q=${this.state.value}`;

    e.preventDefault();
    this.setState({ isLoading: true });

    axios.get(API+`&printType=books&startIndex=`+index)
        .then(results => {
            if(index===0) {
                this.setState({
                    books: results.data.items,
                    isLoading: false,
                })
            }
            else if(index>0) {
                const nextBooks = results.data.items
                
                this.setState({
                books: [
                    ...this.state.books,
                    ...nextBooks,
                ],
                isLoading: false,
                });
            }
        })
        .catch(error => {
            this.setState({
                error,
                isLoading: false
            })
        });
    }
   
    render() {
        return (
            <div className="home" id="Home">
                <Search 
                    handleCheck={this.handleCheck} 
                    handleSearch={this.handleSearch} 
                />
                <Result books={this.state.books} />
            </div>
        );
    }
}

export default Home;