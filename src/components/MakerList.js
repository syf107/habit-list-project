import React from "react";
import { AiOutlineArrowUp, AiOutlineArrowDown } from "react-icons/ai";
import { FaRegEdit, FaRegTrashAlt } from "react-icons/fa";

function MakerList() {
  return (
    <div className="bg-gray-500 h-96 relative">
      <div className="h-full w-full pt-5 pb-10 ">
        <ul className="p-4 mb-5 w-11/12 mx-auto bg-gray-300 divide-y">
          <li className="text-xl flex justify-between  my-2 items-center h-10">
            <div className="flex">
              <span className="pr-2">1.</span>
              <p>Reading Book 30 minutes.</p>
            </div>
            <div className="p-1 gap-1 flex">
              <button>
                <AiOutlineArrowUp />
              </button>
              <button>
                <AiOutlineArrowDown />
              </button>
              <button>
                <FaRegEdit />
              </button>
              <button>
                <FaRegTrashAlt />
              </button>
            </div>
          </li>
          <li className="text-xl flex  justify-between  my-2 items-center h-10">
            <div className="flex">
              <span className="pr-2">2.</span>
              <p>Meditation 15 minutes</p>
            </div>
            <div className="p-1 gap-1 flex">
              <button>
                <AiOutlineArrowUp />
              </button>
              <button>
                <AiOutlineArrowDown />
              </button>
              <button>
                <FaRegEdit />
              </button>
              <button>
                <FaRegTrashAlt />
              </button>
            </div>
          </li>
          <li className="text-xl flex justify-between my-2 items-center h-10">
            <div className="flex">
              <span className="pr-2">1.</span>
              <p>Reading Book 30 minutes.</p>
            </div>
            <div className="p-1 gap-1 flex">
              <button>
                <AiOutlineArrowUp />
              </button>
              <button>
                <AiOutlineArrowDown />
              </button>
              <button>
                <FaRegEdit />
              </button>
              <button>
                <FaRegTrashAlt />
              </button>
            </div>
          </li>
        </ul>
        <div className="flex rounded-full overflow-hidden w-fit mx-auto">
          <input
            type="text"
            placeholder="add new habit"
            className="h-100 px-4 py-3 outline-none"
          />
          <button className="pl-5 pr-6 py-3 h-auto bg-slate-700 text-gray-200 capitalize border-none">
            add habit
          </button>
        </div>
        <div className="absolute left-1/2 -translate-x-1/2 bottom-2 mb-4 w-11/12 mx-auto flex justify-between">
          <button className="bg-red-500 text-gray-200 px-2 py-1 text-lg capitalize">
            clear list
          </button>
          <button className="bg-green-500 text-gray-200 px-2 py-1 text-lg capitalize">
            submit habit list
          </button>
        </div>
      </div>
    </div>
  );
}

export default MakerList;
