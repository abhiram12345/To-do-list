import { useState } from "react";
import { connectDB } from "../db";

export default function Task({task, tasks, callSetTasks}){
    const [isDone, setIsDone] = useState(task.isDone);
    const date = task.dateTime ? new Date(task.dateTime) : undefined;
    const nextDate = new Date();
    nextDate.setDate(nextDate.getDate() + 1);
    const handleClick = (db) =>{
        task.isDone = !task.isDone;
        db.transaction('tasks', 'readwrite').objectStore('tasks').put({...task});
        setIsDone(state=> !state);
    }
    const deleteTask = (db) =>{
        const data = [...tasks];
        db.transaction('tasks', 'readwrite').objectStore('tasks').delete(task.id);
        const index = data.findIndex(i=> i.id === task.id);
        if(index > -1){
            data.splice(index, 1);
            callSetTasks(data, true);
        }
    }
    return(
        <div className="task-body w-50 mx-auto p-3 mt-3 rounded border border-1 d-flex justify-content-between align-items-center flex-grow-1" style={{borderColor:'lightgray'}}>
        <p className="m-0" style={{
            textDecoration:isDone ? 'line-through gray solid 1px' : 'none',
            flexBasis:'50%',
            overflow:'hidden'
        }}>{task.name}</p>
        <span className="text-danger material-symbols-rounded delete-bttn" onClick={()=>{
            connectDB(deleteTask);
        }}>delete</span>
        <span className="text-danger" style={{flexBasis:'25%'}}>{date ? date.toDateString() === new Date().toDateString() ? 'Today' : date.toDateString() === nextDate.toDateString()? 'Tomorrow' : `${date.toLocaleString('default', {month:'short'})} ${date.getDate()}` : ''}</span>
        <button className='bg-transparent border border-1 d-flex justify-content-center align-items-center' style={{
            width:'22px',
            height:'22px',
            borderColor:'lightgray'
        }} onClick={()=>{
            connectDB(handleClick);
        }}>{isDone &&
            <span className="material-symbols-rounded" style={{color:'gray'}}>done</span>
            }</button>
    </div>
    )
}
