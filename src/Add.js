import React from 'react'
import {useState} from 'react'
import { useHistory } from 'react-router-dom'
//3 date formats used->Comparison uses timestamp, for datetimelocal input uses ISO8601 format,
// and code while running stores in Date object format

const Add = () => {
    const history=useHistory();
    const [title, setTitle] = useState('');
    const [deadline, setDeadline] = useState((new Date()).getTime());
    const [priority, setPriority] = useState('0');
    let curTime = new Date();
    curTime=curTime.getTime();
    const onSubmit = (e) => {
        e.preventDefault();
        let tasks = JSON.parse(localStorage.getItem("tasks"));
        let newTask=[title, priority, deadline];
        tasks.push(newTask);
        localStorage.setItem("tasks", JSON.stringify(tasks));
        localStorage.setItem("number", JSON.stringify(Number.parseInt(localStorage.getItem("number"))+1));
        history.push('/');
    }
  return (
    <div className="container">
        <div className="color-filler hide"></div>
        <div>
            <h2 className="header">Add Task</h2>
            <form onSubmit={onSubmit} className="form">
                <div>
                    <label>Title: 
                        <input type="text" value={title} placeholder='Title of the task' required onChange={(e) => setTitle(e.target.value)}></input>
                    </label>
                </div>
                <div>
                    <label>Deadline: 
                        <input type="datetime-local" value={(new Date(deadline+19800000)).toISOString().slice(0,16)} required onChange={(e) => {
                            let dTime=Date.parse(e.target.value);
                            if(dTime<curTime){
                                console.log("alert");
                                console.log(dTime);
                                console.log(curTime);
                                console.log(deadline);
                                alert("Deadline should be on or after today's date");
                            }
                            else{
                                setDeadline(dTime);
                            }
                        }}></input>
                    </label>
                </div>
                <div>
                    <label>Priority: 
                        <select value={priority} onChange={(e) => setPriority(e.target.value)}>
                            <option value="0">Not Important</option> 
                            <option value="1">Important</option> 
                        </select>
                    </label>
                </div>
                <button type="submit" className="button">Add</button>
            </form>
        </div>
        <div className="color-filler hide"></div>
    </div>
  )
}

export default Add