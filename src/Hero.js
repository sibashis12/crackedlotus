import React from 'react'
import {useState, useEffect} from 'react'
import Welcome from './Welcome'
const Hero = () => {
  const [tasks, setTasks] = useState([]);
  const [number, setNumber] = useState(0);
  const [completed, setCompleted] = useState(0);
  useEffect(() => {
    if(!localStorage.getItem("number")){
      localStorage.setItem("number", 0);
      localStorage.setItem("completed", 0);
      localStorage.setItem("tasks", JSON.stringify({}));
    }
    else{
      setTasks(JSON.parse(localStorage.getItem("tasks")));
      setNumber(JSON.parse(localStorage.getItem("number")));
      setCompleted(JSON.parse(localStorage.getItem("completed")));
    }
  }, []);
  return (
    <div className="container">
        <div className="color-filler hide"></div>
        {number===0 && <Welcome />}
        {number!=0 && <div>Hello again</div>}
        {/* <div className="task">
            <div className="task-vitals">
                <h4 className="status">Pending</h4>
                <h4 className="priority">Urgent and Important</h4>
            </div>
            <div className="task-details">
                <p>Time Remaining:5 minutes</p>
                <h3>Task-Wash Car</h3>
            </div>
        </div> */}
        <div className="color-filler hide"></div>
    </div>
  )
}

export default Hero