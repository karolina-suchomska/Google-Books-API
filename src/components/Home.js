import React, { Component } from 'react';
import axios from 'axios';
import './App.css';
import Search from './Search';
import Result from './Result';

let index=0;

function wait(ms) {
    var x = new Date();
    var y = null;
    do { y = new Date(); }
    while(y-x < ms);
}

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            books: [],
            value: '',
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
        this.setState({
          value: e.target.value
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
    const paramteresAPI = `&printType=books&startIndex=`;

    e.preventDefault();
    axios.get(API+paramteresAPI+index)
        .then(results => {
            if(index===0) {
                this.setState({
                    books: results.data.items,
                })
            }
            else if(index>0) {
                const nextBooks = results.data.items
                
                this.setState({
                books: [
                    ...this.state.books,
                    ...nextBooks,
                ],
                });
            }
        })
        .catch(error => {
            this.setState({
                error,
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