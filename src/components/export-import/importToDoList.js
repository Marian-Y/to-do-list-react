import { useRef } from "react";

const ImportButton = (props) => {
    const inputRef = useRef(null);

    const handleImportClick = () => {
        inputRef.current.click();
    };
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            readFileContents(file);
            e.target.value = '';
        }
    };

    const readFileContents = (file) => {
        const fileReader = new FileReader();
        fileReader.addEventListener('load', () => {
            const parsedJSON = fileReader.result;
            localStorage.setItem('items', parsedJSON);
            props.updateData();
        });
        fileReader.readAsText(file);
    };
    return (
        <>
            <input
                type="file"
                id="importFile"
                ref={inputRef}
                className="importFile"
                accept=".json"
                onChange={handleFileChange}
                style={{ display: 'none' }} />
            <button
                className='form-btn form-btn-save'
                id="btn"
                onClick={handleImportClick}>
                Загрузити список
            </button>
        </>
    );
}

export default ImportButton;