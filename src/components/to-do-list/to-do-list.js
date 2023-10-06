import Item from "../to-do-list-item/to-do-list-item"
import './to-do-list.sass'



const ToDoList = ({ data, onDelete, onToggleProp}) => {

    const elements = data.map(item => {
        const {id, ...itemProps} = item;
        
        return (
            <Item 
            key={id}              
            {...itemProps}  
            id={id}
            onDelete={() => onDelete(id)}
            onToggleProp={(e) => onToggleProp(id, e.currentTarget.getAttribute('data-toggle'), e.currentTarget.getAttribute('data-color') )}
            />
        )
    })


    return (
        <div className="list" id="list">
            {elements}
        </div>
    )
}

export default ToDoList;