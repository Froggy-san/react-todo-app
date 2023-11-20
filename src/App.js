import { useEffect, useState } from "react";

export default function App() {
  // const [todoArr, setTodoArr] = useState([]);
  const [todoArr, setTodoArr] = useState(
    JSON.parse(localStorage.getItem("allTasks")) || []
  );

  const [selected, setSelected] = useState(null);

  useEffect(() => {
    localStorage.setItem("allTasks", JSON.stringify(todoArr));
  }, [todoArr]);

  function handleAddingItems(item) {
    setTodoArr((currArr) => [...currArr, item]);
  }
  function handleDeleteTask(id) {
    setTodoArr((currArr) => currArr.filter((task) => task.id !== id));
  }

  function handleEditedTasks(id, newTask) {
    setTodoArr((currArr) =>
      currArr.map((task) =>
        task.id === id ? { ...task, task: newTask } : task
      )
    );
  }
  return (
    <div className="todo-app">
      <From onAddTask={handleAddingItems} />

      {todoArr.length !== 0 && (
        <Output>
          {" "}
          <ListedTasks>
            {todoArr.map((item) => (
              <ToDoItem
                todoObj={item}
                onDelete={handleDeleteTask}
                key={item.id}
                onEdit={handleEditedTasks}
                selected={selected}
                setSelected={setSelected}
              />
            ))}
          </ListedTasks>
        </Output>
      )}
      <span className="count">{todoArr.length}</span>
    </div>
  );
}

function From({ onAddTask }) {
  const [task, setTask] = useState("");
  function handleSubmit(e) {
    e.preventDefault();
    if (!task) return;

    const id = crypto.randomUUID();

    const newTodoItem = { task, id: id };

    onAddTask(newTodoItem);
    setTask("");
  }

  return (
    <form className="form" onSubmit={handleSubmit}>
      <input
        type="text"
        value={task}
        onChange={(e) => setTask(e.target.value)}
      />
      <button>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="1em"
          viewBox="0 0 512 512"
        >
          <path d="M16.1 260.2c-22.6 12.9-20.5 47.3 3.6 57.3L160 376V479.3c0 18.1 14.6 32.7 32.7 32.7c9.7 0 18.9-4.3 25.1-11.8l62-74.3 123.9 51.6c18.9 7.9 40.8-4.5 43.9-24.7l64-416c1.9-12.1-3.4-24.3-13.5-31.2s-23.3-7.5-34-1.4l-448 256zm52.1 25.5L409.7 90.6 190.1 336l1.2 1L68.2 285.7zM403.3 425.4L236.7 355.9 450.8 116.6 403.3 425.4z" />
        </svg>
      </button>
    </form>
  );
}

function Output({ children }) {
  return <div className="output">{children}</div>;
}

function ListedTasks({ children }) {
  return <ul className="list">{children}</ul>;
}

function ToDoItem({ todoObj, onDelete, selected, onEdit, setSelected }) {
  const currSelected = todoObj.id === selected?.id;
  const [editedText, setEditedText] = useState(todoObj.task);

  function handleSubmiting(e) {
    e.preventDefault();
    if (!editedText) onDelete(todoObj.id);
    onEdit(todoObj.id, editedText);
    setSelected(null);
  }

  return (
    <li>
      {!currSelected && <span className="todo-item ">{todoObj.task} </span>}

      {currSelected && (
        <form className="edit-form" onSubmit={handleSubmiting}>
          <input
            className="todo-item"
            autoFocus
            type="text"
            value={editedText}
            onChange={(e) => {
              setEditedText(e.target.value);
            }}
          />
          <button className=" button selected">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="1em"
              viewBox="0 0 512 512"
            >
              <path d="M320 0c-17.7 0-32 14.3-32 32s14.3 32 32 32h82.7L201.4 265.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L448 109.3V192c0 17.7 14.3 32 32 32s32-14.3 32-32V32c0-17.7-14.3-32-32-32H320zM80 32C35.8 32 0 67.8 0 112V432c0 44.2 35.8 80 80 80H400c44.2 0 80-35.8 80-80V320c0-17.7-14.3-32-32-32s-32 14.3-32 32V432c0 8.8-7.2 16-16 16H80c-8.8 0-16-7.2-16-16V112c0-8.8 7.2-16 16-16H192c17.7 0 32-14.3 32-32s-14.3-32-32-32H80z" />
            </svg>
          </button>
        </form>
      )}

      <div className="inputs">
        <button
          className={`edit-btn ${currSelected ? "selected" : ""}`}
          onClick={() => {
            setSelected((currSelected) =>
              currSelected === todoObj ? null : todoObj
            );
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="1em"
            viewBox="0 0 512 512"
          >
            <path d="M471.6 21.7c-21.9-21.9-57.3-21.9-79.2 0L362.3 51.7l97.9 97.9 30.1-30.1c21.9-21.9 21.9-57.3 0-79.2L471.6 21.7zm-299.2 220c-6.1 6.1-10.8 13.6-13.5 21.9l-29.6 88.8c-2.9 8.6-.6 18.1 5.8 24.6s15.9 8.7 24.6 5.8l88.8-29.6c8.2-2.7 15.7-7.4 21.9-13.5L437.7 172.3 339.7 74.3 172.4 241.7zM96 64C43 64 0 107 0 160V416c0 53 43 96 96 96H352c53 0 96-43 96-96V320c0-17.7-14.3-32-32-32s-32 14.3-32 32v96c0 17.7-14.3 32-32 32H96c-17.7 0-32-14.3-32-32V160c0-17.7 14.3-32 32-32h96c17.7 0 32-14.3 32-32s-14.3-32-32-32H96z" />
          </svg>
        </button>
        <button onClick={() => onDelete(todoObj.id)}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="1em"
            viewBox="0 0 448 512"
          >
            <path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z" />
          </svg>
        </button>
      </div>
    </li>
  );
}

// function ToDoItem({ todoObj, onDelete, onEdit }) {
//   // const [editText, setEditText] = useState("");
//   const [isOpen, setIsOpen] = useState(false);

//   function toggleEditFeild() {
//     setIsOpen((is) => !is);
//   }
//   return (
//     <li>
//       {isOpen && (
//         <>
//           <input
//             type="text"
//             className="todo-item"
//             autoFocus
//             value={todoObj.task}
//             onChange={(e) => {
//               // setEditText(e.target.value);
//               onEdit(todoObj.id, e.target.value);
//             }}
//           />{" "}
//           {/* <button
//               className="button"
//               onClick={() => {
//                 setIsOpen(false);
//                 // setEditText("");
//               }}
//             >
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 height="1em"
//                 viewBox="0 0 512 512"
//               >
//                 <path d="M320 0c-17.7 0-32 14.3-32 32s14.3 32 32 32h82.7L201.4 265.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L448 109.3V192c0 17.7 14.3 32 32 32s32-14.3 32-32V32c0-17.7-14.3-32-32-32H320zM80 32C35.8 32 0 67.8 0 112V432c0 44.2 35.8 80 80 80H400c44.2 0 80-35.8 80-80V320c0-17.7-14.3-32-32-32s-32 14.3-32 32V432c0 8.8-7.2 16-16 16H80c-8.8 0-16-7.2-16-16V112c0-8.8 7.2-16 16-16H192c17.7 0 32-14.3 32-32s-14.3-32-32-32H80z" />
//               </svg>
//             </button> */}
//         </>
//       )}
//       {!isOpen && <span className="todo-item">{todoObj.task} </span>}
//       <div className="inputs">
//         <button className={isOpen ? "selected" : ""} onClick={toggleEditFeild}>
//           <svg
//             xmlns="http://www.w3.org/2000/svg"
//             height="1em"
//             viewBox="0 0 512 512"
//           >
//             <path d="M471.6 21.7c-21.9-21.9-57.3-21.9-79.2 0L362.3 51.7l97.9 97.9 30.1-30.1c21.9-21.9 21.9-57.3 0-79.2L471.6 21.7zm-299.2 220c-6.1 6.1-10.8 13.6-13.5 21.9l-29.6 88.8c-2.9 8.6-.6 18.1 5.8 24.6s15.9 8.7 24.6 5.8l88.8-29.6c8.2-2.7 15.7-7.4 21.9-13.5L437.7 172.3 339.7 74.3 172.4 241.7zM96 64C43 64 0 107 0 160V416c0 53 43 96 96 96H352c53 0 96-43 96-96V320c0-17.7-14.3-32-32-32s-32 14.3-32 32v96c0 17.7-14.3 32-32 32H96c-17.7 0-32-14.3-32-32V160c0-17.7 14.3-32 32-32h96c17.7 0 32-14.3 32-32s-14.3-32-32-32H96z" />
//           </svg>
//         </button>
//         <button onClick={() => onDelete(todoObj.id)}>
//           <svg
//             xmlns="http://www.w3.org/2000/svg"
//             height="1em"
//             viewBox="0 0 448 512"
//           >
//             <path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z" />
//           </svg>
//         </button>
//       </div>
//     </li>
//   );
// }
