import React from "react";
import {useState,} from "react";
//include images into your bundle
import rigoImage from "../../img/rigo-baby.jpg";

//create your first component
const Home = () => {
	const [inputName, setInputName] = useState("")
	 const [list, setList] = useState([
        { name: "" },
    ])
   const handleDelete = (idToRemove) => {
    setList(list.filter((item) => item.id !== idToRemove));
  };
   
    function handleSubmit(e) {
        e.preventDefault();
        let newItem = {
            name: inputName,
            id: Date.now()
        }
        setList(prev => [...prev, newItem]);
		setInputName(""); 
    }


	return (
		<div className="text-center container w-75 p-4">
            <h1>To Do List</h1>
            <form className="border p-2" onSubmit={(e) => handleSubmit(e)}>
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
                    list.map((item, index) => {
                        return (
							<div className="container h4 pb-1 mb-2  border-bottom border-secondary">
                            <article key={index} className="custom-card d-flex justify-content-between align-items-center" onClick={ () => handleDelete(item.id)}>
                               
                                <span className="custom-name">{item.name}</span>
								<span
									className="text-danger ms-3"
									style={{ cursor: "pointer", fontWeight: "bold",marginLeft:"auto", }}
									onClick={() => handleDelete(item.id)}
									title="Eliminar"
      >
									❌
								</span>
                            </article>
							</div>
                        )
                    })
                }
            </div>
        </div>
    );
}

	


export default Home;