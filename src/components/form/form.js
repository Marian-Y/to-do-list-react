import { useState, useRef } from 'react';

import ExportButton from '../export-import/exportToDoList';
import ImportButton from '../export-import/importToDoList';

import './form.sass'


const Form = (props) => {
    const dateInputRef = useRef(null);

    const [state, setState] = useState({
        inputCase: '',
        inputDate: '',
        inputNotes: '',
        inputImage: '',
    });
    const [error, setError] = useState({
        errorCase: '',
        errorTime: '',
        errorAdd: '',
    })

    const handleDateInputClick = () => {
        dateInputRef.current.showPicker();
    };

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

    function currentDate(date) {
        const pad = (num) => (num < 10 ? '0' : '') + num;
        const inputDate = new Date(date);

        if (isNaN(inputDate)) {
            return '';
        }

        return `${pad(inputDate.getFullYear())}.${pad(inputDate.getMonth() + 1)}.${pad(inputDate.getDate())} ${pad(inputDate.getHours())}:${pad(inputDate.getMinutes())}`;
    }

    const sendDataToValidation = (e) => {
        e.preventDefault();

        const { inputCase, inputDate, inputNotes, inputImage, } = state

        var now = currentDate(new Date()),
            newFormatInputData = currentDate(inputDate),
            newFormatCase = inputCase.trim(),
            newFormatNotes = inputNotes.trim();

        console.log(errorCase == false)

        switch (true) {
            case newFormatCase === "":
                setError({ errorCase: `Пусте поле: справа` });
                break;
            case newFormatCase.length >= 30:
                setError({ errorCase: `Діє обмеження на 30 символів` });
                break;
            case newFormatInputData === "":
                setError({ errorTime: `Пусте поле: початок виконнаня` });
                break;
            case newFormatInputData <= now:
                setError({ errorTime: `Надто стара дата` });
                break;
            // case newFormat >= future:
            //     console.log(`Планувати дальше ніж на рік не можна`)
            //     break;
            default:
                const content = props.data;
                const filteredElements = content.filter(item => item.inputCase === inputCase && item.inputDate === inputDate);

                if (filteredElements.length > 0) {
                    setError({ errorAdd: `Така справа уже існує` });
                    return;
                }
                setState({ inputCase: '', inputDate: '', inputNotes: '', inputImage: '' });
                setError({ errorCase: '', errorTime: '', errorAdd: '', })
                props.onAdd(newFormatCase, newFormatInputData, newFormatNotes, inputImage);

                break;
        }
    };

    const { inputCase, inputDate, inputNotes, inputImage } = state;
    const { errorCase, errorTime, errorAdd } = error

    return (
        <div id="wrapper">
            {/* <PopupError /> */}
            {/* <form onSubmit={this.onSubmit}> */}
            <div className="form__group field">
                <input
                    type="input"
                    className="form__field"
                    id='case'
                    // placeholder="case"
                    name="inputCase"
                    value={inputCase}
                    style={{ borderBottomColor: errorCase ? 'red' : '' }}
                    required=""
                    onChange={onValueChange} />
                <label htmlFor="case" className="form__label">Справа</label>
                <div id="errorCase"><span>{errorCase}</span></div>
            </div>
            <div className="form__group field">
                <input
                    type="datetime-local"
                    className="form__field"
                    // placeholder="startOfExecution"
                    name="inputDate"
                    value={inputDate}
                    id="startOfExecution"
                    min="2023-04-13T00:00"
                    max="9999-06-14T00:00"
                    required=""
                    style={{ borderBottomColor: errorTime ? 'red' : '' }}
                    ref={dateInputRef}
                    onClick={handleDateInputClick}
                    onChange={onValueChange} />
                <label htmlFor="startOfExecution" className="form__label">Початок виконання</label>
                <div id="errorTime"><span>{errorTime}</span></div>
            </div>
            <div className="form__group field">
                <input
                    type="input"
                    className="form__field"
                    // placeholder="notes"
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
                        // placeholder="image"
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
                style={{ background: `#e78200` }}
                type="submit"
                onClick={sendDataToValidation}>Додати</button>
            <div id="errorAdd"><span>{errorAdd}</span></div>
            {/* <br /> */}
            <ExportButton />
            <ImportButton updateData={props.updateData} />
        </div>
    )
}

export default Form;