import { useState } from 'react';

import Info from '../info/info';
import SearchPanel from '../search-panel/search-panel';
import Filter from '../filter/filter';
import ToDoList from '../to-do-list/to-do-list';
import Form from '../form/form';
import BrowserNotification from '../browser-notification/browser-notification';

import './app.sass';

const App = (props) => {
    const [data, setData] = useState(
        localStorage.getItem('items') ? JSON.parse(localStorage.getItem('items')) : []
    );
    const [term, setTerm] = useState('');
    const [filter, setFilter] = useState('all');

    const deleteItem = (id) => {
        const newArr = data.filter(item => item.id !== id);
        localStorage.setItem('items', JSON.stringify(newArr));
        setData(newArr);
    }

    const addItem = (inputCase, inputDate, inputNotes, inputImage) => {
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
        const newArr = [...data, newItem];
        localStorage.setItem('items', JSON.stringify(newArr));
        setData(newArr);
    }

    const onToggleProp = (id, prop, value) => {
        const updatedData = data.map(item => {

            if (item.id === id) {
                console.log(prop, value)
                // value = prop === 'important' || prop === 'triggered' ? !item[prop] : value;
                if (['important', 'triggered'].includes(prop)) {
                    console.log(1);
                    value = !item[prop];
                }
                return { ...item, [prop]: value };
            }
            return item;
        });
        setData(updatedData);

        localStorage.setItem('items', JSON.stringify(updatedData));
    };

    const searchEmp = (items, term) => {
        if (term.length === 0) {
            return items;
        }

        return items.filter(items => {
            return items.inputCase.indexOf(term) > -1
        })
    }

    const onUpdateSearch = (term) => {
        setTerm(term)
    }

    const filterPost = (items, filter) => {
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

    const onFilterSelect = (filter) => {
        setFilter(filter)
    }

    const updateData = () => {
        const storedData = localStorage.getItem('items');
        if (storedData) {
            const parsedData = JSON.parse(storedData);
            setData(parsedData);
        }
    }

    const numberOfListItems = data.length;
    const numberOfImportant = data.filter(item => item.important).length;
    const visibleData = filterPost(searchEmp(data, term), filter);

    return (
        <div id="toDoList">

            <Info numberOfListItems={numberOfListItems}
                numberOfImportant={numberOfImportant} />
            <Form onAdd={addItem}
                data={data}
                updateData={updateData} />

            <div id="search-panel">
                <SearchPanel onUpdateSearch={onUpdateSearch} />
                <Filter filter={filter} onFilterSelect={onFilterSelect} />
            </div>

            <ToDoList
                data={visibleData}
                onDelete={deleteItem}
                onToggleProp={onToggleProp}
            />
            <BrowserNotification data={data} onToggleProp={onToggleProp} />
        </div>
    )
}

export default App;