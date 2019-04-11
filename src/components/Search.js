import React from 'react';

const Search = props => {
    return ( 
        <form onSubmit={props.handleSubmit} action="">
            <input 
                type = "text"
                value={props.searchTerm}
                onChange = {props.handleSearch}
                placeholder = "Podaj tytuł ksiąki"
            />
            <button type="submit">Szukaj</button>
        </form>
     );
}
 
export default Search;