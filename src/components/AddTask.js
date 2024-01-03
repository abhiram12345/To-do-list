import { connectDB } from "../db";

function AddItem({name, time, callSetTime, callSetNewTaskName, view, callSetTasks, callSetView}){
    const minTime = new Date().toISOString().slice(0, new Date().toISOString().lastIndexOf(':'));
    const addTask = (db) =>{
        let error;
        const data = {
            name,
            isDone:false,
            dateTime: time || null
        }
        if(new Date(time) < new Date()) error = 'Please Correct time';
        if(name === '') error = 'Please add task name';
        if(!error){
            const putData = db.transaction('tasks', 'readwrite').objectStore('tasks').put({...data});
            putData.onsuccess = (e)=>{
                callSetView('tasks');
                callSetNewTaskName('');
                callSetTime('');
                callSetTasks({...data, id:e.target.result});
            }
        }else{
            alert(error);
        }
    }
    return(<>
    <div className='position-absolute bg-light py-4' style={{transition:'width 0.5s', width: view === 'tasks'? 0 : '100%', overflow:'hidden', left:0, top:0, bottom:0, boxSizing:'border-box'}}>
        <label className="mx-auto d-block">
        <p className="text-label">Task</p>
        <input type='text' className="normal" value={name} onChange={(e)=>{
            callSetNewTaskName(e.target.value);
        }}></input>
        </label>
        <label className="mx-auto d-block">
        <p className="text-label">Time</p>
        <input type='datetime-local' min={minTime} value={time} className="normal" onChange={(e)=>{
            callSetTime(e.target.value);
        }}></input>
        </label>
        <button className="border border-0 bg-primary mx-auto d-block text-light px-3 py-2 rounded mt-3" onClick={()=>{
            connectDB(addTask);
        }}>Add</button>
    </div>
    </>);
};
export default AddItem;