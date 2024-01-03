import Task from './Task';
import catImg from '../cat.png';

export default function TasksList({tasks, callSetTasks}){
    return( 
    <div className="overflow-y-auto" style={{height:'90%', overflowY:'auto'}}>
    {tasks.length > 0 ? tasks.map((task)=> <Task task={task} tasks={tasks} callSetTasks={callSetTasks}/>) : 
    <div className="position-absolute" style={{
        left:'50%',
        top:'50%',
        transform: 'translate(-50%, -50%)'
    }}>
        <img src={catImg} height='100px' width='100px' alt='cat'/>
        <p className="mt-2" style={{color:'#303030'}}>No tasks here!</p>
    </div>}
    </div>);
}