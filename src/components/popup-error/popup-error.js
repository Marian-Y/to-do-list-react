import { useState, useEffect, forwardRef, useImperativeHandle, useRef } from 'react';

import popupSound from "./erro.mp3";
import './popup-error.sass'

const Popup = forwardRef((props, ref) => {
    const [isPopupVisible, setIsPopupVisible] = useState(false);
    const [textError, setTextError] = useState(``)
    const popupAudioRef = useRef(new Audio(popupSound));

    useEffect(() => {
        if (isPopupVisible) {
            popupAudioRef.current.play();

            setTimeout(() => {
                hidePopup();
                popupAudioRef.current.pause();
                popupAudioRef.current.currentTime = 0;
            }, 2000);
        }
    }, [isPopupVisible])

    useImperativeHandle(ref, () => ({
        showPopup(errorText) {
            setIsPopupVisible(true);
            setTextError(errorText);
        }
    }))

    const hidePopup = () => {
        setIsPopupVisible(false);
    };

    const openFullScreen = () => {
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

    return (
        <div >
            {isPopupVisible && (
                <div className="popup">
                    <p id="errorMessage">Oh shit!! <span id='errorMessageClose' className="material-symbols-outlined">close</span></p>

                    <div >
                        <span id="iconClose" className="material-symbols-outlined">close</span>
                        <p id="errorDetails">{textError}</p>
                    </div>
                    <p id="errorDetails">Delete Windows?</p>
                    <div id="buttonContainer">
                        <button onClick={openFullScreen} id="errorButton">Yes</button>
                    </div>
                </div>

            )}
        </div>
    )
})

export default Popup;