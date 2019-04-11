import React from 'react';

const BookCard = (props) => { 
    
    return ( 
        <div className="card">
            <img src={props.image} alt="" />
            <div className="desc">
                <h2>{props.title}</h2>
                <p>{((props.description) ? (props.description.substr(0, 55)+"...") : props.description)}</p>
            </div>
        </div>
     );
}
 
export default BookCard;