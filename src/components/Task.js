import { useState } from "react";
import { connectDB } from "../db";
import { useMediaQuery } from "react-responsive";

export default function Task({task, tasks, callSetTasks}){
    const [isDone, setIsDone] = useState(task.isDone);
    const isDesktopScreen = useMediaQuery({
        query:'(min-width:1224px)'
    });
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
        <div className="task-body mx-auto p-3 mt-3 rounded border border-1 d-flex justify-content-between align-items-center" style={
            {
                borderColor:'lightgray',
                width: isDesktopScreen ? '80%' : '90%'
            }
        }>
        <p className="m-0 flex-grow-1" style={{
            textDecoration:isDone ? 'line-through gray solid 1px' : 'none',
            overflow:'hidden'
        }}>{task.name}</p>
        <div className="d-flex justify-content-end align-items-center">
        <button className="me-2" style={{
            border:'none',
            backgroundColor:'transparent'
        }}>
        <span className="text-danger material-symbols-rounded delete-bttn align-middle" onClick={()=>{
            connectDB(deleteTask);
        }}>delete</span>
        </button>
        <span className="text-danger">{date ? date.toDateString() === new Date().toDateString() ? 'Today' : date.toDateString() === nextDate.toDateString()? 'Tomorrow' : `${date.toLocaleString('default', {month:'short'})} ${date.getDate()}` : ''}</span>
        <button className='bg-transparent border border-1 d-flex justify-content-center align-items-center ms-3' style={{
            width:'22px',
            height:'22px',
            borderColor:'lightgray'
        }} onClick={()=>{
            connectDB(handleClick);
        }}>{isDone &&
            <span className="material-symbols-rounded" style={{color:'gray'}}>done</span>
            }</button>
        </div>
    </div>
    )
}
