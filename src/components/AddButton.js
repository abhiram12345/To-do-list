export default function AddButton({view, onClick}){
    return(<>
    <button className="d-flex justify-content-center align-items-center rounded-circle bg-danger position-absolute text-light border border-0" style={{
        height:'50px',
        width:'50px',
        bottom:'-25px',
        left:'50%',
        transform: 'translateX(-50%)'
    }} onClick={onClick}>
    <span className="material-symbols-rounded">{view === 'tasks' ? 'add' : 'close'}</span>
    </button>
    </>);
}