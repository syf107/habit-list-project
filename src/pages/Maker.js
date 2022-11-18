import MakerList from "../components/MakerList";
import Window from "../components/Window";
import Notification from "../components/Notification";
import { useGlobalContext } from "../context";

function Maker() {
  const {
    handleHabitName,
    list,
    notification,
    handleSubmit,
    handleSubmitList,
    habitName,
    isEditing,
    clearList,
    showNotification,
  } = useGlobalContext();

  return (
    <section className="w-7/12 mx-auto capitalize">
      <Window string={"maker"} />
      <div className="bg-red-400 relative h-auto pt-5">
        {notification.show && (
          <Notification
            {...notification}
            showNotification={showNotification}
            list={list}
          />
        )}
        <div className="h-full w-full pt-5 pb-10 ">
          {list.length !== 0 && <MakerList />}
          <form
            className="flex rounded-full overflow-hidden w-fit mx-auto mb-20"
            onSubmit={handleSubmit}
          >
            <input
              type="text"
              placeholder="add new habit"
              className="h-100 px-4 py-3 outline-none"
              value={habitName}
              onChange={(e) => {
                handleHabitName(e.target.value);
              }}
            />
            <button
              className={`${
                isEditing ? "bg-red-500" : "bg-green-500"
              } pl-5 pr-6 py-3 h-auto  text-gray-200 capitalize border-none`}
            >
              {isEditing ? "edit habit" : "add habit"}
            </button>
          </form>
          <div className="absolute left-1/2 -translate-x-1/2 bottom-2 mb-4 w-11/12 mx-auto flex justify-between">
            <button
              onClick={() => clearList()}
              className="bg-red-500 text-gray-200 px-2 py-1 text-lg capitalize"
            >
              clear list
            </button>
            <button
              onClick={() => handleSubmitList()}
              className="bg-green-500 text-gray-200 px-2 py-1 text-lg capitalize"
            >
              submit habit list
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Maker;
