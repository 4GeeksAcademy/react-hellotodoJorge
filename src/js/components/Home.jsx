import React from "react";
import { useState, useEffect } from "react";

import rigoImage from "../../img/rigo-baby.jpg";


const Home = () => {
    const [inputName, setInputName] = useState("");

    const [list, setList] = useState([]);


    const getUser = async () => {
        let result = await fetch("https://playground.4geeks.com/todo/users/jorge_sanchez");
        let data = await result.json();
        setList(data.todos)
    };

    useEffect(() => { getUser() }, []);
    console.log(list);

    const postTodos = async (event) => {
        event.preventDefault();
        await fetch("https://playground.4geeks.com/todo/todos/jorge_sanchez", {
            method: "POST",
            body: JSON.stringify(
                {
                    "label": inputName,
                    "is_done": false
                }
            ),
            headers: { "Content-type": "application/json" }
        });
        getUser()
    };

    const handleDelete = async (id) =>{

        await fetch (`https://playground.4geeks.com/todo/todos/${id}`,{
            method: "DELETE",
            headers:{ "Content-type":"application/json"}

        })
        getUser()

    }



    return (
        <div className="text-center container w-75 p-4">
            <h1>To Do List</h1>
            <form className="border p-2" onSubmit={(e) => postTodos(e)}>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Tareas</label>
                    <input
                        type="text"
                        className="form-control"
                        id="name"
                        aria-describedby="name"
                        onChange={(e) => setInputName(e.target.value)}
                        value={inputName}
                    />

                </div>

                <button type="submit" className="btn btn-primary">Añadir</button>
            </form>
            <div className="container-cards">
                {
                    list.lenght!==0 ? list.map((item, index) => {
                        return (
                            <div className="container h4 pb-1 mb-2  border-bottom border-secondary">
                                <article key={index} className="custom-card d-flex justify-content-between align-items-center" onClick={() => handleDelete(item.id)}>

                                    <span className="custom-name">{item.label}</span>
                                    <span
                                        className="text-danger ms-3"
                                        style={{ cursor: "pointer", fontWeight: "bold", marginLeft: "auto", }}
                                        onClick={() => handleDelete(item.id)}
                                        title="Eliminar"
                                    >
                                        ❌
                                    </span>
                                </article>
                            </div>
                        )
                    }): null
                }
            </div>
        </div>
    );
}




export default Home;