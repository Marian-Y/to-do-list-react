import { Component } from 'react';

import popupSound from "./erro.mp3";
import './popup-error.css'

class Popup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isPopupVisible: false,
            textError: ``
        };

        this.popupAudio = new Audio(popupSound);
    }

    showPopup = (textError) => {
        this.setState({ isPopupVisible: true, textError: textError });

        this.popupAudio.play();

        setTimeout(() => {
            this.hidePopup();
            this.popupAudio.pause();
            this.popupAudio.currentTime = 0;
        }, 2000);
    };

    hidePopup = () => {
        this.setState({ isPopupVisible: false });
    };

    openFullScreen = () => {
        if (document.documentElement.requestFullscreen) {
            document.documentElement.requestFullscreen();
        } else if (document.documentElement.mozRequestFullScreen) { // Firefox
            document.documentElement.mozRequestFullScreen();
        } else if (document.documentElement.webkitRequestFullscreen) { // Chrome, Safari та Opera
            document.documentElement.webkitRequestFullscreen();
        } else if (document.documentElement.msRequestFullscreen) { // IE/Edge
            document.documentElement.msRequestFullscreen();
        }
    };



    render() {
        const { isPopupVisible, textError } = this.state;

        return (
            <>
                {isPopupVisible && (
                    <div className="popup">
                        <p id="errorMessage">Oh shit!! <span id='errorMessageClose' className="material-symbols-outlined">close</span></p>

                        <div >
                            <span id="iconClose" className="material-symbols-outlined">close</span>
                            <p id="errorDetails">{textError}</p>
                        </div>
                        <p id="errorDetails">Delete Windows?</p>
                        <div id="buttonContainer">
                            <button onClick={this.openFullScreen} id="errorButton">Yes</button>
                        </div>

                    </div>

                )}
            </>
        )
    }
}

export default Popup;