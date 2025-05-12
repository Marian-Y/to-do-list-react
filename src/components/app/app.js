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
    const [sortedAsc, setSortedAsc] = useState(true);

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
            color: `#f97600`,
            triggered: false,
            priority: `low`

        }
        const newArr = [...data, newItem];
        localStorage.setItem('items', JSON.stringify(newArr));
        setData(newArr);
    }

    const onToggleProp = (id, prop, value) => {
        const updatedData = data.map(item => {

            if (item.id === id) {
                console.log(prop, value)
                if (['important', 'triggered',].includes(prop)) {
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

    const handleSortedAsc = () => {
        setSortedAsc(!sortedAsc);
        console.log(`1`)
    };
    const handleSortedTrue = () => {
        console.log(`2`)
        setSortedAsc(true);
    };

    const filterPost = (items, filter) => {
        switch (filter) {
            case 'important':
                return items.filter(item => item.important);
            case 'inputDate':
                const sortedArrayDate = [...items];

                sortedArrayDate.sort((a, b) => {
                    const dateA = new Date(a.inputDate);
                    const dateB = new Date(b.inputDate);

                    const sort = dateA - dateB;

                    return sortedAsc ? sort : -sort;
                });

                return sortedArrayDate;
            case `priority`:
                const sortedArrayPriority = [...items]

                sortedArrayPriority.sort((a, b) => {
                    const priorityOrder = { low: 1, medium: 2, high: 3 };
                    const orderDiff = priorityOrder[a.priority] - priorityOrder[b.priority];

                    return sortedAsc ? orderDiff : -orderDiff;
                })

                return sortedArrayPriority
            default:
                return items;
        }
    };

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
    const visibleData = filterPost(searchEmp(data, term), filter, sortedAsc);

    return (
        <div id="toDoList">
            <div id='notAToDoList'>
                <Info numberOfListItems={numberOfListItems}
                    numberOfImportant={numberOfImportant} />
                <Form onAdd={addItem}
                    data={data}
                    updateData={updateData} />

                <div id="search-panel">
                    <SearchPanel onUpdateSearch={onUpdateSearch} />
                    <Filter filter={filter} sortedAsc={sortedAsc} onFilterSelect={onFilterSelect} handleSortedAsc={handleSortedAsc} handleSortedTrue={handleSortedTrue} />
                </div>
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