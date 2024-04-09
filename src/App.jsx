import { useEffect, useState } from "react";
import {
  getDatabase,
  push,
  ref,
  set,
  onValue,
  remove,
  update
} from "firebase/database";

const App = () => {
  const db = getDatabase();
  const [input, setInput] = useState("");
  const [inputErr, setInputErr] = useState(false);
  const [todolist, setTodolist] = useState([]);
  const [updateModal, setUpdateModal] = useState(false);
  const [updateInput, setUpdateInput] = useState('');
  const [upadateItem, setUpadateItem] = useState('');

  const handleInput = (e) => {
    setInput(e.target.value);
    setInputErr(false);
  };

  function handleSubmit(e) {
    e.preventDefault();

    if (!input) {
      setInputErr(true);
    }

    if (input) {
      set(push(ref(db, "todos/")), {
        list: input,
      });
    }
  }

  useEffect(() => {
    const todoListRef = ref(db, "todos/");
    onValue(todoListRef, (snapshot) => {
      let array = [];
      snapshot.forEach((item) => {
        array.push({ item: item.val(), id: item.key });
      });
      setTodolist(array);
    });
  }, []);

  const handleDelete = (item) => {
    console.log(item.id);
    remove(ref(db, "todos/" + item.id));
  };

  const handleEdit = (item) => {
    setUpdateModal(true);
    setUpadateItem(item.id);
  };

  function handleUpdate() {
   if(updateInput) {
    update(ref(db, "todos/" + upadateItem), {list: updateInput})
    setUpdateModal(false)
   }
  }

  return (
    <div className="w-full pb-6 bg-slate-600 gap-3 flex flex-col md:flex-row md:h-screen justify-center items-center">
      <div className="w-[400px] h-[400px] bg-slate-300 rounded-xl shadow-[4px_5px_10px_10px_rgba(0,0,0,0.1)] p-6  ">
        <h1 className="mt-[20px] text-center py-4 text-3xl font-bold text-amber-600  bg-slate-600">
          Todo
        </h1>
        <input
          onChange={handleInput}
          className="w-full p-6 mt-8  text-2xl"
          type="text"
          name="text"
          id="text"
        />
        {inputErr && <p className="text-red-500">Fill input Field.</p>}
        <button
          onClick={handleSubmit}
          className="w-full bg-black p-6 mt-8 text-[25px] font-serif font-extrabold text-white rounded-xl"
          type="submit"
        >
          Submit
        </button>
      </div>
      <div className="p-4 w-[400px] h-[400px]  bg-slate-300 rounded-xl shadow-[4px_5px_10px_10px_rgba(0,0,0,0.1)]  ">
        <h2 className="mt-[20px] text-center py-4 text-3xl font-bold text-amber-600  bg-slate-600">
          Todo_List
        </h2>
        <div className="overflow-y-auto h-[270px] mt-2">
          <ol className="list-decimal list-inside ">
            {todolist.map((itemtodo) => (
              <li className="text-2xl mt-2 font-semibold ml-4 flex justify-between">
                {itemtodo.item.list}{" "}
                <button
                  onClick={() => handleEdit(itemtodo)}
                  className="bg-green-500 px-1 text-white"
                >
                  Edit
                </button>{" "}
                <button
                  onClick={() => handleDelete(itemtodo)}
                  className="bg-red-500 px-1 text-white"
                >
                  Delete
                </button>
              </li>
            ))}
          </ol>

          {updateModal && <div className="w-full pb-4 p-1 bg-slate-500">
            <input onChange={(e)=>setUpdateInput( e.target.value)} className="w-full mt-5 py-2 text-[25px]" type="text" name="" id="" />
            <div className="flex justify-between">
              <button onClick={handleUpdate}  className="bg-green-400 p-2 mt-4 font-bold" type="button">Update</button>
              <button onClick={()=> setUpdateModal(false)} className="bg-green-400 p-2 mt-4 font-serif font-bold" type="button">Cancel</button>
            </div>
            </div>}
        </div>
      </div>
    </div>
  );
};

export default App;
