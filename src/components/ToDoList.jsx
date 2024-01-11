import React, {useState, useEffect} from 'react'
import CreateTask from '../modals/createTask';
import Card from './Card';

const ToDoList = ()  => {

  const [modal, setModal] = useState(false);
  const [taskList, setTaskList] = useState([]);

  useEffect(() => {
    let arr = localStorage.getItem("taskList")

    if(arr){
    let obj = JSON.parse(arr);
    setTaskList(obj)
    }
  },[])


  const deleteTask = (index) => {
    let tempList = taskList
    tempList.splice(index, 1)
    localStorage.setItem("taskList", JSON.stringify(tempList))
    setTaskList(tempList)
    window.location.reload()
  }

  const updateListArray = (obj, index) => {
    let tempList = taskList
    tempList[index] = obj
    localStorage.setItem("taskList", JSON.stringify(tempList))
    setTaskList(tempList)
    window.location.reload()
  }


  const toggle = () => {
    setModal(!modal);
  }

  const saveTask = (taskObj) => {
    setTaskList((prevList) => {
      const newList = [...prevList, taskObj];
      localStorage.setItem("taskList", JSON.stringify(newList));
      return newList;
    });
    setModal(false);
  };
  
  

  return (
   <>
    <div className='header text-center'>
      <h3>Todo List</h3>
      <button className = "btn btn-primary mt-2" onClick = {() => setModal(true)}>Create Task</button> 
    </div>
    <div className='task-container'>
       {taskList && taskList.map((obj, index) => <Card taskObj = {obj} index = {index} deleteTask={deleteTask} updateListArray={updateListArray}/>)} 
    </div>
    <CreateTask key="uniqueKey" toggle = {toggle} modal ={modal} save={saveTask}/>
   </>
  )
}


export default ToDoList;

//rfce
//mt => margin top