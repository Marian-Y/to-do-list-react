import { Component } from 'react';
import './search-panel.css';

class SearchPanel extends Component {

    constructor(props) {
        super(props);
        this.state = {
            term: ''
        }
    }

    onUpdateSearch = (e) => {
        const term = e.target.value;
        this.setState({term});
        this.props.onUpdateSearch(term)
    }

    render() {
        return (
            <div className="search field">
                <input
                    type="text"
                    value={this.state.term}
                    onChange={this.onUpdateSearch}
                    className="search-input"
                    placeholder="search"
                    name="search"
                    id='search'
                    required />
                <label
                    htmlFor="search"
                    className="search-label">
                    Пошук</label>
                {/* <div id="errorCase"></div> */}
            </div>
        )
    }

}

export default SearchPanel;