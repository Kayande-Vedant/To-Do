import './todoItem.css';
import useViewStatus from './../../hooks/view';

import {useState, useEffect} from 'react';

function TodoItem(props){

    let style;
    let localData;
    let updatedItem;
    const [statusIndicator, setStatusIndicator] = useState(props.itemData.itemStatus);
    const [reRender, setReRender] = useState('');
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
                console.log(localData[i].listItems)
            }
        }
        localStorage.setItem('todoData',JSON.stringify(localData));
        // localData.map(list => {(list.listId === props.listId)?list.itemData.map(item=>updatedItem.find(o=>o.itemId === item.itemId || item)):list});
        console.log('update: ',localData);
    }
    function onDeleteItem(){
        console.log('called');
        localData = JSON.parse(localStorage.getItem('todoData'));
        for(let i=0;i<localData.length;i++){
            if(localData[i].listId ===props.listId){
                console.log(localData[i].listItems.length);
                for(let j=0;j<localData[i].listItems.length;j++){
                    console.log('localData[i].listItems[j]: ',localData[i].listItems[j]);
                    console.log('props.itemData.itemId : ',props.itemData.itemId)
                    if(localData[i].listItems[j].itemId === props.itemData.itemId){
                        console.log(localData[i].listItems.splice(j,1));
                        localStorage.setItem('todoData',JSON.stringify(localData));
                        setReRender(" ");
                        // console.log(localData[i].listItems);
                        return;
                    }
                }
            }
        }
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
        console.log('props: ',props);
    return (
        <>
            <section className="todo-item">
                <div className="itemBody"><b>{props.itemData.itemBody}</b></div>
                {/* <div className='status'>{props.itemData.itemStatus}</div> */}
                <span className="dot" style={style}></span>
                <select className="select" value={statusIndicator} onChange={handleChange}>
                    <option value="todo">To-Do</option>
                    <option value="inProgress">In Progress</option>
                    <option value="completed">Completed</option>
                </select>
                <button onClick={onDeleteItem} className="delete-task-item">X</button>
            </section>
        </>
    );
}

export default TodoItem;