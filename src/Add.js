import React from 'react'
import {useState} from 'react'
import { useHistory } from 'react-router-dom'

const Add = () => {
    const history=useHistory();
    const [title, setTitle] = useState('');
    const [deadline, setDeadline] = useState('');
    const [time, setTime]=useState('');
    const [priority, setPriority] = useState('not important');
    let curDate = new Date().toLocaleDateString('en-IN').slice(0, 10);
    console.log(new Date().toLocaleDateString('en-IN'));
    console.log(curDate);
    let curTime = new Date().toLocaleTimeString('en-IN').slice(0, 4);
    console.log(curTime);
    const onSubmit = (e) => {
        e.preventDefault();
        let tasks = JSON.parse(localStorage.getItem('tasks'));
        let newTask={[title]:[deadline, time, priority]};
        tasks=Object.assign(newTask, tasks);
        console.log(newTask);
        localStorage.setItem('tasks', JSON.stringify(tasks));
        localStorage.setItem("number", JSON.stringify(Number.parseInt(localStorage.getItem("number"))+1));
        history.push('/');
    }
  return (
    <div class="container">
        <div class="color-filler hide"></div>
        <div>
            <h2 class="header">Add Task</h2>
            <form onSubmit={onSubmit} class="form">
                <div>
                    <label>Title: </label>
                    <input type="text" value={title} placeholder='Title of the task' required onChange={(e) => setTitle(e.target.value)}></input>
                </div>
                <div>
                    <label>Deadline Date: </label>
                    <input type="date" value={deadline} required onChange={(e) => {
                        if(e.target.value<curDate){
                            alert("Deadline should be on or after today's date");
                        }
                        else{
                            setDeadline(e.target.value);
                        }
                    }}></input>
                </div>
                <div>
                    <label>Time: </label>
                    <input type="time" value={time} placeholder='23:59' required onChange={(e) => setTime(e.target.value)}></input>
                </div>
                <div>
                    <label>Priority:</label>
                    <select value={priority} onChange={(e) => setPriority(e.target.value)}>
                        <option value="not important">Not Important</option> 
                        <option value="important">Important</option> 
                        <option value="crucial">Crucial</option>
                    </select>
                </div>
                <button type="submit" class="button">Add</button>
            </form>
        </div>
        <div class="color-filler hide"></div>
    </div>
  )
}

export default Add