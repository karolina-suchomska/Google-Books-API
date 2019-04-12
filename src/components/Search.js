import React from 'react';

const Search = props => {
    return ( 
        <form className="Search" onSubmit={props.handleCheck} action="">
            <input 
                type = "text"
                onChange = {props.handleSearch}
                placeholder = "Enter title here"
            />
            <button type="submit">Search</button>
        </form>
     );
}
 
export default Search;