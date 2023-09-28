import { Component } from 'react';

import Info from '../info/info';
import SearchPanel from '../search-panel/search-panel';
import Filter from '../filter/filter';
import ToDoList from '../to-do-list/to-do-list';
import Form from '../form/form';
import BrowserNotification from '../browser-notification/browser-notification';

import './app.css';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: localStorage.getItem('items') ? JSON.parse(localStorage.getItem('items')) : [],
            term: '',
            filter: 'all',
            // colorSelector: false
        }
    }

    deleteItem = (id) => {
        this.setState(({ data }) => {
            const newArr = data.filter(item => item.id !== id)
            localStorage.setItem('items', JSON.stringify(newArr));
            return {
                data: newArr
            }
        })
    }

    addItem = (inputCase, inputDate, inputNotes, inputImage) => {
        const newItem = {
            inputCase,
            inputDate,
            inputNotes,
            inputImage,
            important: false,
            id: Math.floor(Math.random() * 9999999),
            color: `#E62C36`,
            triggered: false
        }
        this.setState(({ data }) => {
            const newArr = [...data, newItem];
            localStorage.setItem('items', JSON.stringify(newArr));
            return {
                data: newArr
            }
        });
    }

    onToggleProp  = (id, prop) => {
        console.log(id, prop)
        this.setState(({ data }) => ({
            data: data.map(item => {
                if (item.id === id) {
                    return {...item, [prop]: !item[prop]}
                }
                return item;
            })
        }), () => {
            localStorage.setItem('items', JSON.stringify(this.state.data));
        })
    }

    searchEmp = (items, term) => {
        if (term.length === 0) {
            return items;
        }

        return items.filter(items => {
            return items.inputCase.indexOf(term) > -1
        })
    }

    onUpdateSearch = (term) => {
        this.setState({ term });
    }

    filterPost = (items, filter) => {
        switch (filter) {
            case 'important':
                return items.filter(item => item.important);
            case 'inputDate':
                const sortedArray = [...items];
                console.log(sortedArray);

                return sortedArray.sort((a, b) => {
                    const dateA = new Date(a.inputDate);
                    const dateB = new Date(b.inputDate);
                    return dateA - dateB;
                });
            default:
                return items
        }
    }

    onFilterSelect = (filter) => {
        this.setState({ filter });
        // console.log(filter)
    }

    onColorChange = (id, color) => {
        this.setState(prevState => ({
            data: prevState.data.map(item => {
                if (item.id === id) {
                    return { ...item, color: color };
                }
                return item;
            })
        }), () => {
            localStorage.setItem('items', JSON.stringify(this.state.data));
        });
    }

    updateData = () => {
        // При завантаженні компонента витягніть дані із локального сховища та оновіть стан компонента
        const storedData = localStorage.getItem('items');
        if (storedData) {
            const parsedData = JSON.parse(storedData);
            this.setState({ data: parsedData });
        }
    }

    render() {
        const { data, term, filter } = this.state;
        const numberOfListItems = this.state.data.length;
        const numberOfImportant = this.state.data.filter(item => item.important).length;
        const visibleData = this.filterPost(this.searchEmp(data, term), filter);

        return (
            <div id="toDoList">
                <Info numberOfListItems={numberOfListItems}
                    numberOfImportant={numberOfImportant} />
                <Form onAdd={this.addItem}
                    data={data}
                    updateData={this.updateData} />

                <div id="search-panel">
                    <SearchPanel onUpdateSearch={this.onUpdateSearch} />
                    <Filter filter={filter} onFilterSelect={this.onFilterSelect} />
                </div>

                <ToDoList
                    data={visibleData}
                    onDelete={this.deleteItem}
                    onToggleProp ={this.onToggleProp}
                    onColorChange={this.onColorChange}
                />
                <BrowserNotification data={data} onToggleProp ={this.onToggleProp}/>
            </div>
        )
    }
}

export default App;