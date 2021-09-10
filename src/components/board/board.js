import './board.css'
import data from '../../data/data'
import TodoList from '../todo-list/todoList';
import FormComp from '../form/formComp';

import {useState, useEffect} from 'react';

let todoData;
    if(localStorage.getItem('todoData'))
    {
        todoData = JSON.parse(localStorage.getItem('todoData'));
    }
    else{
        todoData = data;
        // console.log(todoData);
        localStorage.setItem('todoData',JSON.stringify(data));
}
 function Board(){
    //get all the todo lists and display here
    
    const [allData, setAllData] = useState(todoData);
    // const [textInput, setTextInput] = useState('');
    const [listViewId, setListViewId] = useState(null);

    // const [selectedList, setSelectedList] = useState(listViewId);

   useEffect(()=>{
    // console.log('Board UseEffect');
    setAllData(JSON.parse(localStorage.getItem('todoData')));
   },[localStorage.getItem('todoData')]);

    function handleListSelection(clickData){
        setListViewId(clickData);   
    }
    function handleCancelSelection(){
        // console.log('Cancel btn');
        setListViewId(null);
    }

    let render;
    if(listViewId === null){
        const thumbnails = allData.map(
        (list)=>{
            return <TodoList  key={list.listId} display={true} handleListSelection={handleListSelection} data={list} />
            }
        );
        render=thumbnails;
    }
    else{
        // console.log('Inside useEffect TodoList',listViewId);
        // console.log("WHat is in this List view ID: ",listViewId);
        render=<TodoList  key={listViewId.listId} handleCancelSelection={handleCancelSelection} display={false} data={listViewId} />;
    }
    function handleSubmit(event){
        // console.log("submit :",event.target[0].value);
        event.preventDefault();
        if(listViewId === null){
            let newList={
                "listId": allData.length,
                "listName": event.target[0].value,
                "listItems":[]
            };
            let localData = JSON.parse(localStorage.getItem('todoData'));
            localData = [newList, ...allData];
            localStorage.setItem('todoData', JSON.stringify(localData));
            // console.log('new List : ',newList);
            setAllData([newList, ...allData]);
        }
        else{
            // console.log('Item entry: ', listViewId);
            let localData = JSON.parse(localStorage.getItem('todoData'));
            
            for(let i=0;i<localData.length;i++){
                if(localData[i].listId === listViewId.listId){
                    //setting itemId to new Date coz localData[i].listItems.length gives err in some cases
                    let newItem={
                        "itemId": new Date(),
                        "itemBody": event.target[0].value,
                        "itemStatus": event.target[1].value,
                        "date": ''
                    };
                    localData[i].listItems = [newItem, ...localData[i].listItems];
                    // console.log('List Items: ',localData[i]);
                    setListViewId(localData[i]);
                    localStorage.setItem('todoData', JSON.stringify(localData));
                    // console.log("check THis: ",localData);
                    setAllData(localData);
                }
            }
        }
    }
    return(
        <>
            {/* {console.log('Inside return')} */}
            <div>
                <FormComp listId={listViewId}  onSubmit={handleSubmit}/>
            </div>
            <div className="board">
                {render}  
            </div>
        </>
    );

}

export default Board;