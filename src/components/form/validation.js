import { Component } from "react"

import Popup from "../popup-error/popup-error";
import ReplayControl from "./replay-control";

class Validation extends Component {

    validation = (inputCase, inputDate, inputNotes, inputImage) => {
        var nowDate = new Date();
        var futDate = new Date();

        function currentDate(date) {
            var pad = function (num) {
                return (num < 10 ? '0' : '') + num;
            };

            return date.getFullYear() +
                '.' + pad(date.getMonth() + 1) +
                '.' + pad(date.getDate()) +
                ' ' + pad(date.getHours()) +
                ':' + pad(date.getMinutes());
        }

        function futureDate(date) {
            var pad = function (num) {
                return (num < 10 ? '0' : '') + num;
            };

            return date.getFullYear() + 1 +
                '-' + pad(date.getMonth() + 1) +
                '-' + pad(date.getDate()) +
                'T' + pad(date.getHours()) +
                ':' + pad(date.getMinutes());
        }

        var now = currentDate(nowDate);
        var future = futureDate(futDate);

        var newFormat = inputDate;

        function currentDate(newFormat) {
            var pad = function (num) {
                return (num < 10 ? '0' : '') + num;
            };

            return pad(new Date(newFormat).getFullYear()) +
                '.' + pad(Number(new Date(newFormat).getMonth() + 1)) +
                '.' + pad(new Date(newFormat).getDate()) +
                ' ' + pad(new Date(newFormat).getHours()) +
                ':' + pad(new Date(newFormat).getMinutes());
        }
        
        var newFormatCase = inputCase.trim(),
            newFormatNotes = inputNotes.trim(),
            newFormat = currentDate(newFormat);

        switch (true) {
            case newFormatCase === "":
                this.showPopup(`Пусте поле: справа`);
                break;
            case newFormatCase.length >= 30:
                this.showPopup(`Діє обмеження на 30 символів`);
                break;
            case inputDate === "":
                this.showPopup('Пусте поле: початок виконнаня');
                break;
            case newFormat <= now:
                this.showPopup('Надто стара дата');
                break;
            case newFormat >= future:
                this.showPopup('Планувати дальше ніж на рік не можна ');
                break;
            default:
                this.replayControl(newFormatCase, newFormat, newFormatNotes, inputImage)             
                break;
        }
    }

    render() {
        return (
            <div>
                <Popup ref={(child) => { this.showPopup = child && child.showPopup; }} />
                <ReplayControl onAdd={this.props.onAdd} data={this.props.data} ref={(child) => { this.replayControl = child && child.replayControl; }} />
            </div>
        );
    }
}

export default Validation;