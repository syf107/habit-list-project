import Window from "../components/Window";

import { useGlobalContext } from "../context";
import LisOfHabits from "../components/ListOfHabits";

function Progress() {
  const { listOfHabit } = useGlobalContext();
  return (
    <section className="w-7/12 mx-auto capitalize">
      <Window string={"Trainer"} />
      <div className="bg-blue-500 relative h-fit pt-5 pb-10">
        <div>
          <h3
            className={`text-gray-200 tracking-wide text-center px-3 pb-3 ${
              listOfHabit.length === 0 ? "mt-12 text-3xl" : "text-2xl mt-2"
            }`}
          >
            {listOfHabit.length === 0
              ? "You haven't created any habit list yet. Go create at least one in Maker! section."
              : "Let's train and progress your created habit list here!"}
          </h3>
        </div>
        <div className="w-11/12 mx-auto p-5 hover:trans">
          {listOfHabit.map((item) => (
            <LisOfHabits {...item} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default Progress;
