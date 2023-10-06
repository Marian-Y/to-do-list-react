import './info.sass'

const Info = ({ numberOfListItems, numberOfImportant }) => {
    return (
        <div id="info">
            <p>Облік справ</p>
            <p>Загальна кількість справ: {numberOfListItems}</p>
            <p>Кількітсь важливих справ: {numberOfImportant}</p>
        </div>
    )
}

export default Info
