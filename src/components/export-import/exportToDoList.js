import { Component } from "react";

import Popup from "../popup-error/popup-error";

class ExportButton extends Component {
    handleExportClick = () => {
        const dataToExport = localStorage.getItem('items');

        if (!dataToExport || dataToExport === '[]') {
            this.showPopup(`Нема данних`);
            return;
        }
        this.saveToFile(dataToExport);
    };

    saveToFile = (data) => {
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

    render() {
        return (
            <>
                <button className='form-btn'
                    id="btn"
                    onClick={this.handleExportClick}
                    type="submit">
                    <span>Експортувати список</span>
                </button>
                <Popup ref={(child) => { this.showPopup = child && child.showPopup; }} />
            </>
        );
    }
}

export default ExportButton;