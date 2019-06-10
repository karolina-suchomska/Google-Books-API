import React from 'react';

const Book = (props) => { 
    return ( 
        <div className="card">
            <img src={props.image} alt="" />
            <section className="desc">
                <h2>{props.title}</h2>
                <p>{((props.description) ? (props.description.substr(0, 55)+"...") : props.description)}</p>
            </section>
        </div>
    );
}
 
export default Book;