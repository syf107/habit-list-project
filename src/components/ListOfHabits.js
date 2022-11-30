import React, { useState } from "react";
import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";
import { FaRegTrashAlt } from "react-icons/fa";
import { useGlobalContext } from "../context";
import { VscChecklist } from "react-icons/vsc";
import { Link } from "react-router-dom";

function LisOfHabits(data) {
  const { id, title, list } = data;
  const { removeHabitList } = useGlobalContext();
  const [expand, setExpand] = useState(false);
  // console.log("The data is...");
  // console.log(data);

  return (
    <article
      key={id}
      className="bg-blue-300 shadow-md  border-4 rounded-lg border-black mb-10 px-5 p-5 hover:shadow-2xl hover:-translate-y-3 transition-all duration-300 hover:shadow-blue-900 h-auto"
    >
      <section className="flex justify-between items-center">
        <button
          onClick={() => setExpand(!expand)}
          className="p-3 text-2xl bg-blue-200 flex content-center hover:cursor-pointer rounded-full"
        >
          {!expand ? <AiOutlinePlus /> : <AiOutlineMinus />}
        </button>
        <div className="text-center">
          <p className="text-lg">Habit List Name:</p>
          <p className="text-2xl font-bold">{title}</p>
        </div>
        <div className="text-center">
          <p className="text-lg">How many habits:</p>
          <p className="text-2xl font-bold">
            {list.length} {list.length === 1 ? "Habit" : "Habits"}
          </p>
        </div>
        <button
          onClick={() => removeHabitList(id)}
          className="text-4xl p-2"
        >
          <FaRegTrashAlt />
        </button>
      </section>
      <section className="w-full mt-5 bg-blue-200 rounded-lg h-auto px-5 py-1 ">
        {expand && (
          <div className="flex justify-between items-center py-5 px-5 transition-all ease-in duration-500">
            <div>
              <h5 className="text-2xl font-bold">list of habits</h5>
              <ul className="py-2 ">
                {list.map((item) => {
                  const { id, habitName } = item;
                  return (
                    <li className="pl-3 text-lg font-semibold p-1 tracking-wide">
                      <span className="pr-2">{id}.</span>
                      <span>{habitName}</span>
                    </li>
                  );
                })}
              </ul>
            </div>
            <Link
              key={id}
              to={`/habits/${id}`}
              className="w-5/12 flex justify-center"
            >
              <button className="w-auto h-auto p-5 flex-col hover:bg-blue-300 rounded-md">
                <VscChecklist className="text-7xl m-auto" />
                <p className="text-lg font-bold text-center">Details</p>
              </button>
            </Link>
          </div>
        )}
      </section>
    </article>
  );
}

export default LisOfHabits;
