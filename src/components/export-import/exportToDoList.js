import { useState } from "react";

const ExportButton = () => {

    const [errorCase, setErrorCase] = useState('');

    const handleExportClick = () => {
        const dataToExport = localStorage.getItem('items');

        if (!dataToExport || dataToExport === '[]') {
            setErrorCase(`Нема данних`);

            setTimeout(() => {
                setErrorCase('');
            }, 3000);
            
            return;
        }
        saveToFile(dataToExport);
    };

    const saveToFile = (data) => {
        const filename = Math.floor(Math.random() * 9999999) + '.json';

        if (typeof data === 'object') {
            data = JSON.stringify(data, undefined, 4);
        }

        const blob = new Blob([data], { type: 'text/json' });
        const a = document.createElement('a');
        a.download = filename;
        a.href = window.URL.createObjectURL(blob);
        a.dataset.downloadurl = ['text/json', a.download, a.href].join(':');

        const e = new MouseEvent('click', {
            view: window,
            bubbles: true,
            cancelable: false,
        });
        a.dispatchEvent(e);
    };
    return (
        <>
            <button className='form-btn form-btn-save'
                id="btn"
                onClick={handleExportClick}
                type="submit">
                <span>Зберегти список</span>
            </button>
            <div id="errorCase"><span>{errorCase}</span></div>
        </>
    );
}

export default ExportButton;