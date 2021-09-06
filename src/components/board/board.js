import './board.css'
import data from '../../data/data'
import TodoList from '../todo-list/todoList';


import {useState, useEffect} from 'react';

 function Board(){
    //get all the todo lists and display here
    let todoData;
    if(localStorage.getItem('todoData'))
    {
        todoData = JSON.parse(localStorage.getItem('todoData'));
    }
    else{
        todoData = data;
        console.log(todoData);
        localStorage.setItem('todoData',JSON.stringify(data));
    }

    const [listViewId, setListViewId] = useState(null);

    function handleListSelection(clickData){
        console.log('List data: ',clickData);
        // if(clickData !== null){
        //     setListViewId(null);
        //     return;
        // }
        setListViewId(clickData);   
    }
    function handleCancelSelection(){
        console.log('Cancel btn');
        setListViewId(null);
    }

    let render;
    if(listViewId === null){
        const thumbnails = todoData.map(
        (list)=>{
            return <TodoList  key={list.listId} display={true} handleListSelection={handleListSelection} data={list} />
            }
        );
        render=thumbnails;
    }
    else{
        // console.log('Inside useEffect TodoList',listViewId);
        render=<TodoList  key={listViewId.listId} handleCancelSelection={handleCancelSelection} display={false} data={listViewId} />;
    }

    return(
        <>
            {console.log('Inside return')}
            <div className="board">
                {render}  
            </div>
        </>
    );

}

export default Board;