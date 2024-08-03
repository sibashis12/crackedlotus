import React from 'react'
import {useState, useEffect} from 'react'
const Hero = () => {
  const [tasks, setTasks] = useState([]);
  useEffect(() => {
    
  }, []);
  return (
    <div class="container">
        <div class="color-filler hide"></div>
        <div class="task">
            <div class="task-vitals">
                <h4 class="status">Pending</h4>
                <h4 class="priority">Urgent and Important</h4>
            </div>
            <div class="task-details">
                <p>Time Remaining:5 minutes</p>
                <h3>Task-Wash Car</h3>
            </div>
        </div>
        <div class="color-filler hide"></div>
    </div>
  )
}

export default Hero