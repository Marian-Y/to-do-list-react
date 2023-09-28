import { Component } from "react";


class ImportButton extends Component {
    handleImportClick = () => {
        document.getElementById('importFile').click();
    };
    handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            this.readFileContents(file);
            e.target.value = '';
        }
    };

    readFileContents = (file) => {
        const fileReader = new FileReader();
        // localStorage.clear();
        fileReader.addEventListener('load', () => {
            const parsedJSON = fileReader.result;
            localStorage.setItem('items', parsedJSON);
            this.props.updateData();
        });
        fileReader.readAsText(file);    
    };

    render() {
        return (
            <>
                <input
                    type="file"
                    id="importFile"
                    className="importFile"
                    accept=".json"
                    onChange={this.handleFileChange}
                    style={{ display: 'none' }}/>
                <button
                    className='form-btn'
                    id="btn"
                    onClick={this.handleImportClick}>
                    Імпортувати список
                </button>
            </>
        );
    }
}

export default ImportButton;