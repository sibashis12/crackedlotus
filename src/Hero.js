import React from 'react'
import {useState, useEffect} from 'react'
import {useHistory} from 'react-router-dom'
import Welcome from './Welcome'
import Complete from './Complete'
import {Link} from 'react-router-dom'
const Hero = () => {
  const history = useHistory();
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
  function handleDone(title, index){
    document.getElementById(index).classList.add("done");
    new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve();
      }, 1000);
    }).then(() => {let ctasks=tasks;
      for(let i=0;i<ctasks.length;i++){
        if(ctasks[i][0]===title){
          ctasks.splice(i, 1);
          break;
        }
      }
      localStorage.setItem("completed", Number.parseInt(localStorage.getItem("completed"))+1);
      localStorage.setItem("tasks", JSON.stringify(ctasks));
      history.go(0);
    }); 
  }
  function handleCancel(title, index){
    document.getElementById(index).classList.add("cancelling");
    new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve();
      }, 1000);
    }).then(() => {let ctasks=tasks;
      for(let i=0;i<ctasks.length;i++){
        if(ctasks[i][0]===title){
          ctasks.splice(i, 1);
          break;
        }
      }
      localStorage.setItem("number", Number.parseInt(localStorage.getItem("number"))-1);
      localStorage.setItem("tasks", JSON.stringify(ctasks));
      history.go(0);
  });
}
  const [tasks, setTasks]=useState([]);
  const [number, setNumber]=useState(0);
  const [completed, setCompleted]=useState(0);
  let time=new Date().getTime();
  const [missed, setMissed]=useState(0);
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
      let ctasks=JSON.parse(localStorage.getItem("tasks"));
      let missed=0;
      for(let i=0;i<ctasks.length;i++){
        if(ctasks[i][2]<time){
          ctasks.splice(i, 1);
          missed++;
          i--;
        }
      }
      localStorage.setItem("tasks", JSON.stringify(ctasks));
      localStorage.setItem("missed", missed);
      setTasks(ctasks);
      setNumber(Number.parseInt(JSON.parse(localStorage.getItem("number"))));
      setCompleted(Number.parseInt(JSON.parse(localStorage.getItem("completed"))));
      setMissed(Number.parseInt(JSON.parse(localStorage.getItem("missed"))));
    }
  }, [time]);
  useEffect(() => {
    let impTasks=[];
    let unimpTasks=[];
    for(let i=0;i<tasks.length;i++){
      if(tasks[i][2]<time){
        history.go(0);
      }
      else{
        if(tasks[i][1]==='1'){
          impTasks.push(tasks[i]);
        }
        else{
          unimpTasks.push(tasks[i]);
        }
      }
    }
    sort(impTasks);
    sort(unimpTasks);
    setImportantTasks(impTasks);
    setUnimportantTasks(unimpTasks);
  }, [tasks, history, time]);
  return (
    <div className="container">
        <div className="color-filler hide"></div>
        {number===0 && <Welcome />}
        {number!==0 && 
          <div className="hero">
            {number===completed && <Complete />}
            {number!==completed && <div className="tasks">
              {importantTasks.map((task, index) => (
                <div className="task" key={index} id={`${index}`}>
                  <div className="task-vitals">
                    <h4 className="important">Important</h4>
                    <div className="status" onClick={() => handleDone(task[0], index)}>Done</div>
                    {task[2]<(time+259200000) && <h4 className="priority">Urgent</h4>}
                  </div>
                  <div className="task-details">
                    <h3>Task- {task[0]}</h3>
                    <p>Time Remaining: {(task[2]-time)/1000/60} minutes</p>
                  </div>
                  <div className="changers">
                    <Link className="edit" to="/edit">Edit</Link>
                    <div className="cancel" onClick={() => handleCancel(task[0], index)}>Cancel</div>
                  </div>
                </div>
              ))}
              {unimportantTasks.map((task, index) => (
                <div className="task" key={-index} id={`${-index}`}>
                  <div className="task-vitals">
                    <h4 className="unimportant">Not Important</h4>
                    <div className="status" onClick={() => handleDone(task[0], -index)}>Done</div>
                    {task[2]<(time+259200000) && <h4 className="priority">Urgent</h4>}
                  </div>
                  <div className="task-details">
                    <h3>Task- {task[0]}</h3>
                    <p>Time Remaining: {(task[2]-time)/1000/60} minutes</p>
                  </div>
                  <div className="changers">
                    <Link className="edit" to="/edit">Edit</Link>
                    <div className="cancel" onClick={() => handleCancel(task[0], -index)}>Cancel</div>
                  </div>
                </div>
              ))}
            </div>}
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
        <div className="color-filler hide"></div>
    </div>
  )
}

export default Hero
