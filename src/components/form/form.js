import { useState, useRef } from 'react';

import Validation from './validation';
import ExportButton from '../export-import/exportToDoList';
import ImportButton from '../export-import/importToDoList';

import './form.sass'


const Form = (props) => {
    const ref = useRef();
    const [state, setState] = useState({
        inputCase: '',
        inputDate: '',
        inputNotes: '',
        inputImage: '',
    });

    const onValueChange = (e) => {
        if (e.target.type === 'file') {
            const reader = new FileReader();
            reader.addEventListener("load", () => {
                const readerResult = reader.result;
                setState({
                    ...state,
                    [e.target.name]: readerResult
                });
            });
            reader.readAsDataURL(e.target.files[0]);
        } else {
            setState({
                ...state,
                [e.target.name]: e.target.value
            });
        }

    }

    const handleImportImage = () => {
        document.getElementById('image').click();
    };

    const handleChangeImage = () => {
        setState({
            ...state,
            inputImage: ''
        })
    };


    const sendDataToValidation = (e) => {
        e.preventDefault();

        const {inputCase, inputDate, inputNotes, inputImage} = state

        ref.current.validation(inputCase, inputDate, inputNotes, inputImage)

        setState({
            inputCase: '',
            inputDate: '',
            inputNotes: '',
            inputImage: ''
        });
    };

    const { inputCase, inputDate, inputNotes, inputImage } = state;

    return (
        <div id="wrapper">
            {/* <PopupError /> */}
            {/* <form onSubmit={this.onSubmit}> */}
            <div className="form__group field">
                <input
                    type="input"
                    className="form__field"
                    placeholder="case"
                    name="inputCase"
                    value={inputCase}
                    id="case"
                    required=""
                    onChange={onValueChange} />
                <label htmlFor="case" className="form__label">Справа</label>
                <div id="errorCase"></div>
            </div>
            <div className="form__group field">
                <input
                    type="datetime-local"
                    className="form__field"
                    placeholder="startOfExecution"
                    name="inputDate"
                    value={inputDate}
                    id="startOfExecution"
                    min="2023-04-13T00:00"
                    max="9999-06-14T00:00"
                    required=""
                    onChange={onValueChange} />
                <label htmlFor="startOfExecution" className="form__label">Початок виконання</label>
                <div id="errorTime"></div>
            </div>
            <div className="form__group field">
                <input
                    type="input"
                    className="form__field"
                    placeholder="notes"
                    name="inputNotes"
                    value={inputNotes}
                    required=''
                    onChange={onValueChange}
                    id='notes' />
                <label
                    htmlFor="notes"
                    className="form__label">Примітки (He обов'язкове поле)</label>
            </div>
            {inputImage ?
                <div className="form__group field">
                    <label
                        style={{ cursor: `pointer` }}
                        htmlFor="image"
                        className="form__label">Ваше зображення</label>
                    <img src={inputImage} alt='Щось пішло не так' className="imagePreview"></img>
                    <button
                        id="fileButton"
                        onClick={handleChangeImage}>
                        Видалити або вибрати інше зображення</button>
                </div>
                :
                <div className="form__group field">
                    <input
                        type="file"
                        style={{ display: `none` }}
                        className="form__field"
                        placeholder="image"
                        name="inputImage"
                        // value={inputImage}
                        required=''
                        onChange={onValueChange}
                        accept="image/*"
                        id='image' />
                    <label
                        style={{ cursor: `pointer` }}
                        htmlFor="image"
                        className="form__label">Виберіть Зображення (He обов'язкове поле)</label>
                    <button
                        id="fileButton"
                        onClick={handleImportImage}>
                        <i className="far fa-image"></i> Натисніть, щоб вибрати зобреження</button>
                </div>
            }
            <button className='form-btn '
                id="btn"
                type="submit"
                onClick={sendDataToValidation}>Додати</button>
            <br />
            <ExportButton />
            <ImportButton updateData={props.updateData} />
            <Validation ref={ref} data={props.data} onAdd={props.onAdd}/>
        </div>
    )
}

export default Form;