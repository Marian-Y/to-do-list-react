import { useState } from 'react';
import './search-panel.sass';

const SearchPanel = (props) => {
    const [term, setTerm] = useState(``)


    const onUpdateSearch = (e) => {
        console.log(`qwe`)
        const term = e.target.value;
        setTerm(term)
        props.onUpdateSearch(term)
    }
    return (
        <div className="search field">
            <input
                type="text"
                value={term}
                onChange={onUpdateSearch}
                className="search-input"
                placeholder="search"
                name="search"
                id='search'
                required />
            <label
                htmlFor="search"
                className="search-label">
                Пошук</label>
        </div>
    )
}


export default SearchPanel;