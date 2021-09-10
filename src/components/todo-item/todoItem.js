import './todoItem.css';


import {useState, useEffect} from 'react';

function TodoItem(props){

    let style;
    let localData;
    let updatedItem;
    const [statusIndicator, setStatusIndicator] = useState(props.itemData.itemStatus);
    // const [reRender, setReRender] = useState('');
    // const val = useViewStatus(props.listId,props.itemData.itemId,{});
    function handleChange(event){
        setStatusIndicator(event.target.value);
        //a hook which will take listId itemId and updated object
        updatedItem = [{
            ...props.itemData,
            "itemStatus": event.target.value,
        }];
        // const val = useViewStatus(props.listId,props.itemData.itemId,updatedItem);
        localData = JSON.parse(localStorage.getItem('todoData'));
        for(let i=0;i<localData.length;i++){
            if(localData[i].listId ===props.listId){
                localData[i].listItems = localData[i].listItems.map(obj => updatedItem.find(o => o.itemId === obj.itemId) || obj);
                // console.log(localData[i].listItems)
            }
        }
        localStorage.setItem('todoData',JSON.stringify(localData));
    }


    switch(statusIndicator){
            case 'todo':
                style = {backgroundColor : 'blue'};
                break;
            case 'inProgress':
                style = {backgroundColor : 'red'};
                break;
            case 'completed':
                style = {backgroundColor : 'green'};
                break;
        }

    return (
        <>
            <section className="todo-item">
                <div className="itemBody"><b>{props.itemData.itemBody}</b></div>

                <span className="dot" style={style}></span>
                <select className="select" value={statusIndicator} onChange={handleChange}>
                    <option value="todo">To-Do</option>
                    <option value="inProgress">In Progress</option>
                    <option value="completed">Completed</option>
                </select>
                
                <button onClick={()=>props.onDelete(props.itemData)} className="delete-task-item">X</button>
            </section>
        </>
    );
}

export default TodoItem;