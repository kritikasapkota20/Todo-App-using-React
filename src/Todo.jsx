import { useState, React } from "react"
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faSortDown } from '@fortawesome/free-solid-svg-icons';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const Todo = () => {
    const [Task, setTask] = useState("");
    // const [completed,setcompleted]=useState(false);
    const [indexedited, setindexedited] = useState(null);
    const [Todo, setTodo] = useState([]);
    const [searchedQuery, setSearchedQuery] = useState("");
    const [completedTask, setCompletedTask] = useState([]);
    function AddTask(e) {
        const TrimmedTask=Task.trim();
        if(TrimmedTask===""){
            window.alert("You can't add empty todo !");
            return;
        }
        e.preventDefault();
        if (indexedited == null) {
            setTodo([...Todo, Task]);
            setCompletedTask([...completedTask, false]);
            toast.success("Todo Task added Successfully",{
                autoClose:2000
            //    style:{color:"blue"}
            })

        }
        else {
            const updatedTodos = Todo.map((todo, i) => i === indexedited ? Task : todo);
            // console.log(updatedTodos)
            setTodo(updatedTodos);
            toast.success("Task updated Successfully",{
             autoClose:2000,
            })

        }
        // console.log(Todo)
        setTask("");
        setindexedited(null);
    }
    function clearAll() {
        setTodo([])
        setCompletedTask([])
        toast.success("All Tasks cleared!",
            {
                autoClose:2000
            }
        )
    
    }
    const Togglebox = (index) => {
        const updatedcompletion = completedTask.map((complete, i) => i === index ? !complete : complete);
        setCompletedTask(updatedcompletion);
    }
    const EditTask = (index) => {
        setTask(Todo[index])
        setindexedited(index);
        // console.log(index);
    }

    const deleteTask = (index) => {
        const filteredTodos = Todo.filter((todo, i) => i !== index);
        const confirmdelete = window.confirm("Are you sure you want to delete?");
        if (confirmdelete) {
            setTodo(filteredTodos)
        }
        toast.error("Task deleted Successfully",{
            autoClose:2000
        })

    }
    const sortTodod = () => {
        const sortedTodo = [...Todo].sort((a, b) => b.localeCompare(a, undefined, { sensitivity: "base" }));
        setTodo(sortedTodo)
    }
    const sortTodoa = () => {
        const sortedTodo = [...Todo].sort((a, b) => a.localeCompare(b, undefined, { sensitivity: "base" }));
        setTodo(sortedTodo)
    }
    const filteredTodos =
        Todo.filter((todo) => todo.toLowerCase().includes(searchedQuery.toLowerCase()));



    return (
        <>
            <h1> To-Do List</h1>
            <div className='container'>

                <div className='Main'>
                    <div className="inputs">
                       
                        <input required type='text' className='input1' placeholder={indexedited === null ? "Add a new task" : "Edit Task"} value={Task} onChange={(e) => {
                            setTask(e.target.value)
                        }} />
                        <button onClick={AddTask} >{indexedited === null ? "Add" : "Update"}</button><br />
                        <button className="sort">

                            <ArrowDropDownIcon onClick={   sortTodoa
                                }
                                
                                 
                            />
                            <ArrowDropUpIcon onClick= {
                                sortTodod
                             } />
                            <span >Sort</span>
                            </button>
                        <input type='text' className='input2' value={searchedQuery} onChange={(e) => {
                            setSearchedQuery(e.target.value)
                        }} placeholder='Search tasks' /><br />
                        <button className='clear' onClick={clearAll}>ClearAll</button>
                    </div>
                    <ul style={{ listStyle: "none" }}>
                        {filteredTodos.map((todo, i) => (
                            <div className="list">
                                <li style={{ textDecoration: completedTask[i] ? "line-through" : "none", color: completedTask[i] ? "grey" : "black" }} key={i}>

                                    {todo}
                                </li>
                                <button className="btn1" onClick={() => {
                                    EditTask(i)
                                }}>Edit</button>
                                <button className="btn1" onClick={() => {
                                    deleteTask(i)
                                }}>Delete</button>
                                <input checked={completedTask[i]} onChange={() => {
                                    Togglebox(i)
                                }} type="checkbox" />
                            </div>
                        ))}

                    </ul>
                </div>
            </div>
<ToastContainer />
        </>

    )
}

export default Todo