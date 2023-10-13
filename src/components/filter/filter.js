import './filter.sass';

const Filter = ({ filter, onFilterSelect, handleSortedAsc, handleSortedTrue, sortedAsc }) => {
    const buttondData = [
        { name: `all`, label: `Всі справи` },
        { name: `important`, label: `Важливі справи` },
        { name: `inputDate`, label: ` По даті`}
    ];

    const buttons = buttondData.map(({ name, label }) => {
        const active = filter === name;
        const clazz = active ? '' : 'btn-active'
        const showIcon = active && name === 'inputDate';

        return (
            <button
                className={`filter-btn ${clazz} `}
                style={{ background: sortedAsc && showIcon ? ' ' : 'fa-rotate-180' }}
                type="button"
                key={name}
                onClick={() => {
                    onFilterSelect(name);

                    if (name === 'inputDate') {
                        handleSortedAsc();
                    } else {
                        handleSortedTrue();
                    }
                }}
            >
                {showIcon && <i className={`fa-solid fa-sort-up ${sortedAsc ? '' : 'fa-rotate-180'}`}></i>}
                {label}
            </button>
        );
    });

    return (
        <div id="btn-group">
            {buttons}
        </div>
    );
};

export default Filter;