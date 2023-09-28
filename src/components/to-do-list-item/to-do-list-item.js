import { Component, Fragment } from 'react';

import './to-do-list-item.css'

class Item extends Component {
    constructor(props) {
        super(props);
        this.state = {
            colorSelector: false
        }
    }

    onColorSelector = () => {
        this.setState(() => ({
            colorSelector: !this.state.colorSelector
        }))

    }

    render() {
        const { inputCase, inputDate, inputNotes, inputImage,
            onDelete, onToggleProp, onColorChange,
            important, color, id } = this.props;

        const buttondData = [
            { name: `#E62C36`, label: `` },
            { name: `#f97600`, label: `` },
            { name: `#FFFFFF`, label: `` },
            { name: `#18F2B2`, label: `` },
            { name: `#050f56`, label: `` },
            { name: `#050f5600`, label: `` },
        ];

        const buttons = buttondData.map(({ name, label }, index) => {
            const active = color === name;
            const clazz = active ? ' active ' : ''
            // fa-fade
            if (index % 2 === 1) {
                var br = <br />
            }
            return (
                <Fragment key={name}>
                    <button
                        type="button"
                        onClick={() => onColorChange(id, name)}
                        style={{
                            backgroundColor: name
                        }}>
                        {/* <span className={`fas fa-check fa-flip-horizontal fa-xl  ${clazz}`} /> */}
                        <span className={`material-symbols-outlined doneIcon ${clazz}`}>done</span>
                    </button>
                    {br}
                </Fragment >
            )
        })

        return (

            <li className='listli'
                id="7860501"
                style={{ background: color }}>

                <div className="colorSelector">
                    <button onClick={this.onColorSelector} type="button" className='btnColorSelector'></button>

                    <div id="slideout"
                        className={this.state.colorSelector ? 'on' : ''}
                        style={{ background: color + `90` }}>
                        {buttons}
                    </div>
                    <button
                        type="button"
                        className="btn-trash btn-sm "
                        onClick={onDelete}>
                        <i className="fas fa-trash fa-xl"></i>

                    </button>
                </div>

                {/* <i className='fas fa-star'></i> */}
                <p onClick={onToggleProp} data-toggle="important" className={(important ? "fa-solid " : "fa-regular ") + 'fa-star fa-rotate-90 fa-lg'}></p>
                <br />
                {inputImage && (
                    <img id='image' src={inputImage}></img>
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
}

export default Item;