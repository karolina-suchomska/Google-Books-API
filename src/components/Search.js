import React from 'react';

const Search = props => {
    return ( 
        <form className="Search" onSubmit={props.handleCheck} action="">
            <input 
                type = "text"
                onChange = {props.handleSearch}
                placeholder = "Podaj tytuł ksiąki"
            />
            <button type="submit">Szukaj</button>
        </form>
     );
}
 
export default Search;