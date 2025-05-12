import './info.sass'

const Info = ({ numberOfListItems, numberOfImportant }) => {
    return (
        <div id="info">
            <span id='infoText'>Облік справ: </span>
            <span id='infoText'>Загальна кількість справ: {numberOfListItems} </span>
            <span id='infoText'>Кількість важливих справ: {numberOfImportant}</span>
        </div>
    )
}

export default Info
