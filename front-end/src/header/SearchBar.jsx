import React from 'react';
import "./SearchBar.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons';

function SearchBar() {
    return <div className='header_search'>
        <select name="" id="header_cat" value={"All"} placeholder='all'>
            <option value="all">All</option>
            <option value="all">category 1</option>
            <option value="all">category 2</option>
            <option value="all">category 3</option>
            <option value="all">category 4</option>
        </select>
        <input class="search_input form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" />
        <button className='header__searchIcon'><FontAwesomeIcon icon={faSearch} style={{ color: "white", height: "100%" }}></FontAwesomeIcon></button>
    </div>
}

export default SearchBar;
