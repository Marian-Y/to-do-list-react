import { Fragment, useState, } from 'react';

import './to-do-list-item.sass'

const Item = (props) => {
    const [optionsSelector, setOptionsSelector] = useState(false)
    const [colorSelector, setColorSelector] = useState(false)

    const onOptionsSelector = () => {
        setOptionsSelector(!optionsSelector)
        if (colorSelector === true) {
            setColorSelector(!colorSelector)
        }
    }

    const onToggleSelector = (selector) => {
        if (selector === 'color') {
            setColorSelector(!colorSelector);
        }
    }

    const { inputCase, inputDate, inputNotes, inputImage,
        onDelete, onToggleProp,
        important, color, priority, id } = props;

    const buttonColor = [
        { name: `#E62C36`, label: `` },
        { name: `#f97600`, label: `` },
        { name: `#FFFFFF`, label: `` },
        { name: `#18F2B2`, label: `` },
        { name: `#050f56`, label: `` },
    ];

    const buttonsColor = buttonColor.map(({ name, label }, index) => {
        const active = color === name;
        const clazz = active ? ' active ' : ''
        return (
            <Fragment key={name}>
                <button
                    type="button"
                    data-toggle="color"
                    data-value={name}
                    onClick={onToggleProp}
                    style={{
                        backgroundColor: name
                    }}>
                    <span className={`material-symbols-outlined doneIcon ${clazz}`}>done</span>
                </button>
                <br />
            </Fragment >
        )
    })

    const buttonPriority = [
        { name: `low`, label: ``, icon: ` low` },
        { name: `medium`, label: ``, icon: ` medium` },
        { name: `high`, label: ``, icon: ` high` },
    ];

    const buttonsPriority = buttonPriority.map(({ name, label, icon }, index) => {
        const active = priority === name;
        const clazz = active ? ' active' : '';

        return (
            <Fragment key={name}>
                <button className={`priorityButton${clazz}${icon}`}
                    type="button"
                    data-toggle="priority"
                    data-value={name}
                    onClick={onToggleProp}
                    style={{ backgroundColor: color }}
                                       >
                    <span>{label}</span>
                </button>
                <br />
            </Fragment>
        )
    })

    return (

        <li className='listli'
            id={id}
            style={{ background: color }}>

            <p onClick={onToggleProp} data-toggle="important" className={(important ? "fa-solid " : "fa-regular ") + 'fa-star fa-rotate-90 fa-lg'}></p>
            
            <div id="selectorPriority">
                {buttonsPriority}
            </div>

            <button className='fa-solid fa-ellipsis fa-lg optionsSelector' onClick={onOptionsSelector}></button>

            <div style={{ background: color + `90` }} id="slideoutColor" className={optionsSelector ? 'on' : ''}>
                {/* <button onClick={onColorSelector} type="button" className='btnColorSelector'></button> */}
                {/* кніпик з кольором  */}
                <div id="slideoutColor" className={colorSelector ? 'color' : ''} style={{ background: color + `90` }}>
                    {buttonsColor}
                </div>
                {/* відкрти колор селектор */}
                <button
                    type="button"
                    className="btn-icon btn-sm "
                    onClick={() => onToggleSelector('color')}>
                    <i className="fa-solid fa-palette fa-xl"></i>
                </button>
                {/* СМЕРТЬ */}
                <br />
                <button
                    type="button"
                    className="btn-icon btn-sm "
                    onClick={onDelete}>
                    <i className="fas fa-trash fa-xl"></i>
                </button>
            </div>


            <br />
            {inputImage && (
                <img id='image' src={inputImage} alt='Щось пішло не так'></img>
            )}
            <div id='content' style={inputImage ? { position: `absolute`, display: `inline-block` } : {}} >
                <p id="liCase">Справа: <span>{inputCase}</span></p>
                <p id="liStartOfExecution">Початок виконання: <span>{inputDate}</span></p>
            </div>
            {inputNotes && (
                <div id="faq">
                    <ul>
                        <li style={{ backgroundColor: `rgba(255, 255, 255, 0)` }}>
                            <input type="checkbox" defaultChecked />
                            <i></i>
                            <h2>Примітки: </h2>
                            <p>{inputNotes}</p>
                        </li>
                    </ul>
                </div>
            )}
        </li >

    )
}


export default Item;