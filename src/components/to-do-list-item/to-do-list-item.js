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

    const onColorSelector = () => {
        setColorSelector(!colorSelector)
    }

    // if(optionsSelector === false){
    //     console.log(1)
    // }

    const { inputCase, inputDate, inputNotes, inputImage,
        onDelete, onToggleProp,
        important, color, id } = props;

    const buttondData = [
        { name: `#E62C36`, label: `` },
        { name: `#f97600`, label: `` },
        { name: `#FFFFFF`, label: `` },
        { name: `#18F2B2`, label: `` },
        { name: `#050f56`, label: `` },
        // { name: `#050f5600`, label: `` },
    ];

    const buttons = buttondData.map(({ name, label }, index) => {
        const active = color === name;
        const clazz = active ? ' active ' : ''

        // if (index % 2 === 1) {
        //     var br = <br />
        // }
        return (
            <Fragment key={name}>
                <button
                    type="button"
                    data-toggle="color"
                    data-color={name}
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


    return (

        <li className='listli'
            id="7860501"
            style={{ background: color }}>

            <p onClick={onToggleProp} data-toggle="important" className={(important ? "fa-solid " : "fa-regular ") + 'fa-star fa-rotate-90 fa-lg'}></p>

            <button className='fa-solid fa-ellipsis fa-lg optionsSelector' onClick={onOptionsSelector}></button>

            <div style={{ background: color + `90` }} id="slideout" className={optionsSelector ? 'on' : ''}>
                {/* <button onClick={onColorSelector} type="button" className='btnColorSelector'></button> */}
                {/* кольори  */}
                <div id="slideout" className={colorSelector ? 'color' : ''} style={{ background: color + `90` }}>
                    {buttons}
                </div>
                {/* <br /> */}
                <button
                    type="button"
                    className="btn-icon btn-sm "
                    onClick={onColorSelector}>
                    <i className="fa-solid fa-paint-roller fa-xl"></i>
                </button>
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