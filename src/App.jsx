import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Navbar from './components/navbar'
import './App.css'
import { v4 as uuidv4 } from 'uuid'
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { IoMdAdd } from "react-icons/io";


function App() {
  const [todo, settodo] = useState("")
  const [todos, settodos] = useState([])

  useEffect(() => {
    let todostring = localStorage.getItem("todos")
    if (todostring) {
      let todos = JSON.parse(localStorage.getItem("todos"))
      settodos(todos)
    }
  }, [])


  const savetols = (params) => {
    localStorage.setItem("todos", JSON.stringify(todos))
  }

  const handleEdit = (e, id) => {
    let t = todos.filter(i => i.id === id)
    settodo(t[0].todo)
    let newtodos = todos.filter(item => {
      return item.id !== id
    });
    settodos(newtodos)
    savetols()
  }

  const handleAdd = () => {
    settodos([...todos, { id: uuidv4(), todo, isCompleted: false }])
    settodo("")
    savetols()
  }

  const handleDelte = (e, id) => {
    let newtodos = todos.filter(item => {
      return item.id !== id
    });
    settodos(newtodos)
    savetols()
  }

  const handleChange = (e) => {
    settodo(e.target.value)
  }

  const handlecheckbox = (e) => {
    let id = e.target.name;
    let index = todos.findIndex(item => {
      return item.id == id;
    })
    let newtodos = [...todos];
    newtodos[index].isCompleted = !newtodos[index].isCompleted;
    settodos(newtodos)
    savetols()
  }

  return (
    <>
      <Navbar />
      <div className="container  min-h-[80vh] mx-auto w-4/5 rounded-xl m-5 p-5">
        <div className="addtodo my-5">
          <h2 className='font-bold text-xl'>Add a Todo</h2>
          <div className='my-3 flex'>
            <input onChange={handleChange} value={todo} className='w-full rounded-lg' type="text" />
            <button onClick={handleAdd} className='mx-5 bg-slate-400 rounded-lg px-3'><IoMdAdd /></button>
          </div>
        </div>
        <h2 className='font-bold text-xl my-3'>Your Todos</h2>
        <div className="todos">
          {todos.length === 0 && <div className='m-5'>No Todo Left</div>}
          {todos.map(item => {
            return <div key={item.id} className="todo flex w-full justify-between my-3">
              <div className='flex gap-5'>
                <input onChange={handlecheckbox} type="checkbox" value={item.isCompleted} name={item.id} id="" />
                <div className={item.isCompleted ? "line-through" : ""}>{item.todo}</div>
              </div>
              <div className="buttons">
                <button onClick={(e) => { handleEdit(e, item.id) }} className="mx-2 bg-slate-400 rounded-lg px-3 py-1"><FaEdit /></button>
                <button onClick={(e) => { handleDelte(e, item.id) }} className="mx-2 bg-slate-400 rounded-lg px-3 py-1"><MdDelete /></button>
              </div>
            </div>
          })}
        </div>
      </div>
    </>
  )
}

export default App
