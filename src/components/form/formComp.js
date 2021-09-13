import './formComp.css'

import {useState} from 'react';

function FormComp(props){
    const [textInput, setTextInput] = useState('');
    const [status,setStatus] = useState('todo');

    let listForm;
    if(!props.listId){
        listForm =  (<form onSubmit={(event)=>{setTextInput('');props.onSubmit(event)}}>
            <input className="input-field" value={textInput} required onChange={(event)=>setTextInput(event.target.value)} placeholder="List Name" type="text"></input>
            <button className="create-btn">Create List</button>
        </form>);
    }
    else{
        listForm= (<form onSubmit={(event)=>{setTextInput('');props.onSubmit(event)}}>
            <input className="input-field" value={textInput} required onChange={(event)=>setTextInput(event.target.value)} placeholder="To-Do Item" type="text"></input>
            <select className="select-status" value={status} onChange={(event)=>setStatus(event.target.value)}>
                    <option value="todo">To-Do</option>
                    <option value="inProgress">In Progress</option>
                    <option value="completed">Completed</option>
            </select>
            <button className="create-btn">Create Item</button>
        </form>);
    }
    return(
        <>
            {listForm}
        </>
    );
}

export default FormComp;