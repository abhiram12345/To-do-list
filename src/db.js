const connectDB = (callback) =>{
    const dbConnection = window.indexedDB.open('to_do_list_db', 3);
    dbConnection.onupgradeneeded = (e)=>{
        const db = e.target.result;
        const tasks = db.createObjectStore('tasks', {keyPath:'id', autoIncrement:true});
        tasks.createIndex('name', 'name', {unique:false});
        tasks.add({name:'play', isDone:true});
        tasks.add({name:'study', isDone:true});
        tasks.add({name:'meditation', isDone:false});
    }
    dbConnection.onsuccess = (e) =>{
        const db = e.target.result;
        callback(db)
    }
}

export {connectDB};