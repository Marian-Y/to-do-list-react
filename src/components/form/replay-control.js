import { Component } from "react";

import Popup from "../popup-error/popup-error";

class ReplayControl extends Component {

    replayControl = (inputCase, inputDate, inputNotes, inputImage) => {
        const content = this.props.data;

        const filteredElements = content.filter(item => item.inputCase === inputCase && item.inputDate === inputDate);


        if (filteredElements.length > 0) {
            this.showPopup(`Така справа уже існує`)
          } else {
            this.props.onAdd(inputCase, inputDate, inputNotes, inputImage);
          }     

    }

    render() {
        
        return (
            <>
                <Popup ref={(child) => { this.showPopup = child && child.showPopup; }} />
            </>
        )
    }
}

export default ReplayControl