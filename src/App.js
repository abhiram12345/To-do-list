import './App.css';
import AddButton from './components/AddButton';
import AddItem from './components/AddTask';
import { useEffect, useState } from 'react';
import TasksList from './components/TasksList';
import { connectDB } from './db';

function App() {
  const [tasks, setTasks] = useState([]);
  const [view, setView] = useState('tasks');
  const [newTaskName, setNewTaskName] = useState('');
  const [time, setTime] = useState('');
  const callSetTasks = (data, replace)=>{
    if(replace){
      setTasks([...data]);
    }else{
      setTasks(state=> [...state, data]);
    }
  }
  const callSetView = (data) =>{
    setView(data);
  }
  const callSetNewTaskName = (data) =>{
    setNewTaskName(data);
  }
  const callSetTime = (data) =>{
    setTime(data);
  }
  const getTasks = (db) =>{
    const tasks = [];
    const transaction = db.transaction('tasks', 'readonly');
    const objectStore = transaction.objectStore('tasks');
    objectStore.openCursor().onsuccess = (e)=>{
        const cursor = e.target.result;
        if(cursor){
            tasks.push(cursor.value);
            cursor.continue();
        }
    }
    transaction.oncomplete = () =>{
      setTasks(tasks);
    }
  }  

  useEffect(()=>{
      connectDB(getTasks);
  }, []);
  return (
    <div className='w-100 d-flex flex-column position-relative' style={{height:'100vh', paddingBottom:'100px'}}>
      <header className="w-100 bg-primary p-3 text-light text-center">
        <h3>To-Do List</h3>
      </header>
      <div className='mx-auto w-50 shadow-sm p-4 rounded mt-3 h-75 position-relative'>
      <TasksList tasks={tasks} view={view} callSetTasks={callSetTasks}/>
      <AddItem view={view} callSetTasks={callSetTasks} callSetView={callSetView} name={newTaskName} callSetNewTaskName={callSetNewTaskName} time={time} callSetTime={callSetTime}/>
      <AddButton onClick={()=>{
        setView(state=> state==='tasks' ? 'add-task' : 'tasks');
        if(view!=='tasks'){
          setNewTaskName('');
          setTime('');
        }
      }} view={view}/>
      </div>
    </div>
  );
}

export default App;
