import React from 'react'
import './Search.css';
import useDebounce from '../../Hooks/useDebounce';
export default function Search({updateSearchTerm}) {
    const debounceUpdateSearch = useDebounce((e)=>updateSearchTerm(e.target.value));

    return (
        <>
            <input
                id='search-pokemon'
                type="text"
                placeholder="Which Pokemon you are search for ?"
                onChange={debounceUpdateSearch}
            />
        </>
    )
}
