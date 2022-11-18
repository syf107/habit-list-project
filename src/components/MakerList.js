import { AiOutlineArrowUp, AiOutlineArrowDown } from "react-icons/ai";
import { FaRegEdit, FaRegTrashAlt } from "react-icons/fa";
import { useGlobalContext } from "../context";

function MakerList() {
  const {
    list: items,
    editItem,
    removeItem,
    moveTop,
    moveBottom,
    habitTitle,
    handleHabitTitle,
  } = useGlobalContext();
  return (
    <div className="bg-red-300 w-11/12 mx-auto p-4 mb-5">
      <input
        className=" bg-red-400 text-2xl text-center p-2 block placeholder:text-slate-700 w-50 mx-auto"
        placeholder="add habit title"
        value={habitTitle}
        onChange={(e) => handleHabitTitle(e.target.value)}
      />

      <ul className="divide-y">
        {items.map((item, index) => {
          const { id, habitName } = item;
          return (
            <li
              key={id}
              className="text-xl flex justify-between py-7 h-10 items-center "
            >
              <div className="flex">
                <span className="pr-2">{id}.</span>
                <p>{habitName}</p>
              </div>
              <div className="p-1 gap-3 text-2xl flex">
                <button onClick={() => moveTop(id)}>
                  <AiOutlineArrowUp />
                </button>
                <button onClick={() => moveBottom(id)}>
                  <AiOutlineArrowDown />
                </button>
                <button onClick={() => editItem(id)}>
                  <FaRegEdit />
                </button>
                <button onClick={() => removeItem(id)}>
                  <FaRegTrashAlt />
                </button>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default MakerList;
