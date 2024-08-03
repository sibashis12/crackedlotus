import React from 'react'
import {useState} from 'react'
import { useHistory } from 'react-router-dom'

const Add = () => {
    // function format(date) {
    //     if(date[1]==='/'){
    //         date='0'+date;
    //     }
    //     if(date[4]==='/'){
    //         date=date.slice(0,3)+'0'+date.slice(3);
    //     }
    //     date=date.split('/').join(':');
    //     return date;
    // }
    const history=useHistory();
    const [title, setTitle] = useState('');
    const [deadline, setDeadline] = useState(new Date());
    const [priority, setPriority] = useState('not important');
    let curTime = new Date();
    console.log(curTime);
    console.log(curTime.getTime());
    console.log(curTime.getTime());
    const onSubmit = (e) => {
        e.preventDefault();
        let tasks = JSON.parse(localStorage.getItem('tasks'));
        let newTask={[title]:[deadline, priority]};
        tasks=Object.assign(newTask, tasks);
        console.log(newTask);
        localStorage.setItem('tasks', JSON.stringify(tasks));
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
                    <label>Title: </label>
                    <input type="text" value={title} placeholder='Title of the task' required onChange={(e) => setTitle(e.target.value)}></input>
                </div>
                <div>
                    <label>Deadline: </label>
                    <input type="datetime-local" value={deadline} required onChange={(e) => {
                        let dTime=new Date(Date.parse(e.target.value));
                        if(dTime.getTime()<curTime.getTime()){
                            console.log(dTime.getTime());
                            console.log(curTime.getTime());
                            alert("Deadline should be on or after today's date");
                        }
                        else{
                            console.log(curTime.getTime());
                            console.log(dTime.getTime());
                            console.log(curTime);
                            //convert back to proper format
                            setDeadline(dTime);
                        }
                    }}></input>
                </div>
                <div>
                    <label>Priority:</label>
                    <select value={priority} onChange={(e) => setPriority(e.target.value)}>
                        <option value="not important">Not Important</option> 
                        <option value="important">Important</option> 
                        <option value="crucial">Crucial</option>
                    </select>
                </div>
                <button type="submit" className="button">Add</button>
            </form>
        </div>
        <div className="color-filler hide"></div>
    </div>
  )
}

export default Add