import TodoItem from "../todo-item/todoItem"
import './todoList.css'

import {useState} from 'react';

function TodoList(props){
    const todoItems = props.data.listItems.map(
        (item)=>{
            return <TodoItem key={item.itemId} listId={props.data.listId} itemData={item}/>;
        }
    );
    
    // const [] = useState();

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
    console.log('From list: ',props);
    return(
        <>
            {renderJSX}
        </>
    );
}

export default TodoList;