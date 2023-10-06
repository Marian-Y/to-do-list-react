import './filter.sass';

const Filter = (props) => {
    const buttondData = [
        { name: `all`, label: `Всі справи` },
        { name: `important`, label: `Важливі справи` },
        { name: `inputDate`, label: `По даті` }
    ];

    const buttons = buttondData.map(({ name, label }) => {
        const active = props.filter === name;
        const clazz = active ? '' : 'btn-active'

        return (
            <button className={`filter-btn ${clazz}`}
                type="button"
                key={name}
                onClick={() => props.onFilterSelect(name)}>
                {label}
            </button>
        )
    })

    return (
        <div id="btn-group">
            {buttons}
        </div>
    )
}

export default Filter;