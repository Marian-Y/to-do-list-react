import { Component } from 'react';

import Validation from './validation';
import ExportButton from '../export-import/exportToDoList';
import ImportButton from '../export-import/importToDoList';

import './form.css'


class Form extends Component {
    constructor(props) {
        super(props);
        this.state = {
            inputCase: '',
            inputDate: '',
            inputNotes: '',
            inputImage: '',
        }
    }

    onValueChange = (e) => {
        if (e.target.type === 'file') {
            const reader = new FileReader();
            reader.addEventListener("load", () => {
                const readerResult = reader.result;
                this.setState({
                    [e.target.name]: readerResult
                })
            });
            reader.readAsDataURL(e.target.files[0]);
        } else {
            this.setState({
                [e.target.name]: e.target.value
            });
        }

    }

    handleImportImage = () => {
        document.getElementById('image').click();
    };

    sendDataToValidation = (e) => {
        e.preventDefault();

        console.log(this.state.inputCase, this.state.inputDate, this.state.inputNotes, this.state.inputImage)

        this.validation(this.state.inputCase, this.state.inputDate, this.state.inputNotes, this.state.inputImage);

        this.setState({
            inputCase: '',
            inputDate: '',
            inputNotes: '',
            inputImage: ''
        })
    }

    render() {
        const { inputCase, inputDate, inputNotes, inputImage } = this.state;
        // const { data } = this.props

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
                        onChange={this.onValueChange} />
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
                        onChange={this.onValueChange} />
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
                        onChange={this.onValueChange}
                        id='notes' />
                    <label
                        htmlFor="notes"
                        className="form__label">Примітки (He обов'язкове поле)</label>
                </div>
                <div className="form__group field">
                    <input
                        type="file"
                        style={{ display: `none` }}
                        className="form__field"
                        placeholder="image"
                        name="inputImage"
                        // value={inputImage}
                        required=''
                        onChange={this.onValueChange}
                        accept="image/*"
                        id='image' />
                    <label
                        style={{ cursor: `pointer` }}
                        htmlFor="image"
                        className="form__label">Виберіть Зображення (He обов'язкове поле)</label>
                    <button
                        id="fileButton"
                        onClick={this.handleImportImage}
                    >
                        Натисніть, щоб вибрати зобреження</button>
                </div>

                <button className='form-btn'
                    id="btn"
                    type="submit"
                    onClick={this.sendDataToValidation}>Додати</button>
                <ExportButton />
                <ImportButton updateData={this.props.updateData} />
                {/* </form> */}
                <Validation onAdd={this.props.onAdd} data={this.props.data} ref={(child) => { this.validation = child && child.validation; }} />

            </div>
        )
    }
}

export default Form;