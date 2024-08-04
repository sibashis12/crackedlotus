import React from 'react'
import {useState, useEffect} from 'react'
import Welcome from './Welcome'
const Hero = () => {
  function sort(array){
    //insertion sort algorithm to enter element into array
    for(let i=1;i<array.length;i++){
      let temp=array[i];
      let j=i-1;
      while(j>=0 && array[j][2]>temp[2]){
        array[j+1]=array[j];
        j--;
      }
      array[j+1]=temp;
    }
  }
  function handleDelete(index){
    let ctasks=tasks;
    ctasks.splice(index, 1);
    localStorage.setItem(JSON.stringify(ctasks));
    localStorage.setItem("missed", missed+1);
    setTasks(ctasks);
  }
  const [tasks, setTasks]=useState([]);
  const [number, setNumber]=useState(0);
  let completed=0;
  let time=new Date().getTime();
  let missed=0;
  const [importantTasks, setImportantTasks] = useState([]);
  const [unimportantTasks, setUnimportantTasks] = useState([]);
  useEffect(() => {
    if(!localStorage.getItem("number")){
      localStorage.setItem("number", 0);
      localStorage.setItem("completed", 0);
      localStorage.setItem("tasks", JSON.stringify([]));
      localStorage.setItem("missed", 0);
    }
    else{
      setTasks(JSON.parse(localStorage.getItem("tasks")));
      setNumber(Number.parseInt(JSON.parse(localStorage.getItem("number"))));
      completed=Number.parseInt(JSON.parse(localStorage.getItem("completed")));
      missed=Number.parseInt(JSON.parse(localStorage.getItem("missed")));
    }
  }, []);
  useEffect(() => {
    let impTasks=[];
    let unimpTasks=[];
    for(let i=0;i<tasks.length;i++){
      if(tasks[i][2]<time){
        console.log("omg");
        handleDelete(i);
      }
      else{
        console.log("shit",tasks[i][1]);
        if(tasks[i][1]==='1'){
          impTasks.push(tasks[i]);
        }
        else{
          unimpTasks.push(tasks[i]);
        }
      }
    }
    console.log("end");
    console.log(tasks);
    sort(impTasks);
    sort(unimpTasks);
    setImportantTasks(impTasks);
    setUnimportantTasks(unimpTasks);
  }, [tasks]);
  return (
    <div className="container">
        <div className="color-filler hide"></div>
        {number===0 && <Welcome />}
        {number!=0 && 
          <div className="hero">
            <div className="tasks">
              {importantTasks.map((task, index) => (
                <div className="task" key={index}>
                  <div className="task-vitals">
                    <h4 className="important">Important</h4>
                    <div className="status">Done</div>
                    {task[2]<(time+259200000) && <h4 className="priority">Urgent</h4>}
                  </div>
                  <div className="task-details">
                    <h3>Task- {task[0]}</h3>
                    <p>Time Remaining: {(task[2]-time)/1000/60} minutes</p>
                  </div>
                </div>
              ))}
              {unimportantTasks.map((task, index) => (
                <div className="task" key={-index}>
                  <div className="task-vitals">
                    <h4 className="unimportant">Not Important</h4>
                    {task[2]<(time+259200000) && <h4 className="priority">Urgent</h4>}
                  </div>
                  <div className="task-details">
                    <h3>Task- {task[0]}</h3>
                    <p>Time Remaining: {(task[2]-time)/1000/60} minutes</p>
                  </div>
                </div>
              ))}
            </div>
              <div className="end">
                <h3 className="section-header">Logs:</h3>
                <div className="logs">
                  <div>Scheduled tasks: {number}</div>
                  <div>Completed tasks: {completed}</div>
                  <div>Missed tasks: {missed}</div>
                </div>
              </div>
          </div>
        }
        
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