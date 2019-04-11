import React from 'react';
import Book from './Book'

const Result = (props) => {

    return ( 
        <div className="list">
            {
               props.books && props.books.map((book, i) => {  
                                              
                    return (
                        <Book
                            key={i}
                            image = {((book.volumeInfo.imageLinks) ? book.volumeInfo.imageLinks.thumbnail : undefined)}                           
                            title={((book.volumeInfo.title) ? book.volumeInfo.title : undefined)}
                            description={((book.volumeInfo.description) ? book.volumeInfo.description : undefined)}
                        />
                    )
                })
            }
        </div>
     );
}
 
export default Result;