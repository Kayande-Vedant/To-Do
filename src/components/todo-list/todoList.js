import TodoItem from "../todo-item/todoItem"
import './todoList.css'

import {useState, useEffect} from 'react';

function TodoList(props){

    const [listItems, setListItems] = useState(props.data.listItems);
    // console.log("List Items: ", props.data.listItems);
    let deleteOperation = false;

    const todoItems = listItems.map(
        (item)=>{
            return <TodoItem key={item.itemId}  onDelete={handleDelete} listId={props.data.listId} itemData={item}/>;
        }
    );
   
    useEffect(
        ()=>{
            // console.log("deleteOpertion: ", deleteOperation)
            setListItems(props.data.listItems);
        }
    ,[props.data.listItems]);

    function handleDelete(itemData){
        deleteOperation = true;
        // console.log("Delete button pressed :", deleteOperation);
        let localData = JSON.parse(localStorage.getItem('todoData'));
        for(let i=0;i<localData.length;i++){
            if(localData[i].listId ===props.data.listId){
                // console.log(localData[i].listItems.length);
                for(let j=0;j<localData[i].listItems.length;j++){
                    // console.log('localData[i].listItems[j]: ',localData[i].listItems[j]);
                    // console.log('props.itemData.itemId : ',props.itemData.itemId)
                    if(localData[i].listItems[j].itemId === itemData.itemId){
                        // console.log(localData[i].listItems.splice(j,1));
                        localData[i].listItems.splice(j,1);
                        setListItems(localData[i].listItems);
                        localStorage.setItem('todoData',JSON.stringify(localData));
                        // console.log(localData[i].listItems);
                        return;
                    }
                }
            }
        }
    }
    

    let renderJSX;
    if(props.display){
        renderJSX  = (<section onClick={()=>props.handleListSelection(props.data)} className='todo-list'>
                        <div className='todo-heading'>{props.data.listName}</div>
                    </section> );
    }
    else{
        renderJSX =(<>
        <div className='todo-heading'>{props.data.listName}</div>
        <div className="listItem-view">
            {todoItems}
        </div>
        <div onClick={()=>props.handleCancelSelection()} className="cancel-btn">X</div>
        </>);
        
    }
    // console.log('From list: ',props);

    return(
        <>
            {renderJSX}
        </>
    );
}

export default TodoList;