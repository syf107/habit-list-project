import React from "react";
import { Link, useParams } from "react-router-dom";
import { useGlobalContext } from "../context";
import Window from "../components/Window";

function HabitPerformer() {
  console.log("Habit performer log");
  const { listOfHabit, changeColor, handleHabitPerformanceDays } =
    useGlobalContext();
  const { id: linkId } = useParams();
  const [
    {
      id: habitListId,
      title,
      list,
      performanceDays,
      overallProgressPercentage,
      overallSuccessPercentage,
      overallFailurePercentage,
    },
  ] = listOfHabit.filter((habit) => habit.id === Number(linkId));

  return (
    <main className="bg-orange-300 min-h-screen max-h-max flex flex-col p-10">
      <h1 className="habit-performer__title">HabitPerformer</h1>
      <section className="relative mb-10 w-8/12 m-auto capitalize ">
        <Window string={"Performer"} />
        <div className="bg-blue-400 min-h-[30rem] w-auto px-10 py-5 ">
          <h3 className="text-3xl">{title}</h3>

          {!performanceDays ? (
            <select
              className="text-3xl bg-none border-black border-t-4 border-x-4 bg-blue-400/[0.3] rounded-t-lg px-2 pt-1"
              onChange={(e) => handleHabitPerformanceDays(e, Number(linkId))}
            >
              <option
                className="appearance-none"
                disabled
                selected
              >
                How many days?
              </option>
              <option value="7">7 days</option>
              <option value="14">14 days</option>
              <option value="27">27 days</option>
              <option value="30">1 month</option>
            </select>
          ) : (
            <div className="flex flex-row justify-center gap-10">
              <h4 className="px-2 text-3xl w-fit border-black border-x-4 border-t-4 rounded-t-lg">
                Progress: {overallProgressPercentage} %
              </h4>
              <h4 className="px-2 text-3xl text-green-800 w-fit border-green-800 border-x-4 border-t-4 rounded-t-lg">
                Success: {overallSuccessPercentage} %
              </h4>
              <h4 className="px-2 text-3xl  text-red-800 w-fit border-red-800 border-x-4 border-t-4 rounded-t-lg">
                Failure: {overallFailurePercentage} %
              </h4>
            </div>
          )}
          <div className="bg-blue-300 border-4 border-black rounded-lg overflow-auto">
            <div className="grid grid-habit-performer__table text-xl items-center bg-blue-500 text-center py-5 border-b-4 border-black">
              <p className="">No.</p>
              <p className="col-span-2 text-center">Name of Habit</p>
              <p className="col-span-4">Performance</p>
              <p>
                Total <br /> Progress (%)
              </p>
            </div>
            {list.map((habit) => {
              const {
                id: indexNumber,
                habitName: name,
                eachHabitPercentage,
                eachHabitSuccessPercentage,
                eachHabitFailurePercentage,
                days,
              } = habit;

              return (
                <div
                  key={indexNumber}
                  className="grid grid-habit-performer__table odd:bg-blue-400 even:bg-blue-300 justify-items-center items-center"
                >
                  <div className=" border-r-4 border-black justify-self-stretch self-center h-full w-full flex justify-center items-center">
                    <p className="text-lg">{indexNumber}.</p>
                  </div>
                  <p className="col-span-2 justify-self-start text-xl pl-2">
                    {name}
                  </p>

                  {/* performance column box */}
                  <div className="col-span-4 w-full px-5 my-5">
                    <div className="flex flex-row gap-3 md:gap-2 px-4 py-3 mx-10 border-4 border-blue-600 bg-blue-500 mb-3 rounded-lg overflow-auto performance-scroll">
                      {days === undefined ? (
                        <p>You have to select the days first.</p>
                      ) : (
                        days.map((day) => {
                          const { id: habitPerformanceId, color } = day;
                          return (
                            <div
                              key={habitPerformanceId}
                              className="flex flex-col justify-center items-center rounded-md"
                            >
                              <div
                                className={`h-6 w-6 ${color} rounded-md mb-2 cursor-pointer`}
                                onClick={(e) => {
                                  changeColor(
                                    habitListId,
                                    indexNumber,
                                    habitPerformanceId
                                  );
                                }}
                              ></div>
                              <p className="text-sm text-center basis-5 shrink-0 w-12">
                                Day {habitPerformanceId}
                              </p>
                            </div>
                          );
                        })
                      )}
                    </div>
                    <div className="flex flex-row justify-center items-center gap-5">
                      <div className="flex flex-row bg-blue-500 py-1 px-3 border-blue-600 border-2 rounded-lg">
                        <div className="green-color h-5 w-5 rounded-md"></div>
                        <p>: {eachHabitSuccessPercentage} %</p>
                      </div>
                      <div className="flex flex-row bg-blue-500 py-1 px-3 border-blue-600 border-2 rounded-lg">
                        <div className="red-color h-5 w-5 rounded-md"></div>
                        <p>: {eachHabitFailurePercentage} %</p>
                      </div>
                    </div>
                  </div>

                  <p className="text-2xl"> {eachHabitPercentage}% </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>
      <Link
        className=" bg-blue-400 border-black border-2 rounded-md p-1 w-fit mx-auto hover:shadow-xl hover:mt--10 shadow-md mb-10  hover:bg-blue-500 hover:text-black py-2 text-xl font-medium px-3 hover:duration-500"
        to="/trainer"
      >
        Back to Habit List.
      </Link>
    </main>
  );
}

export default HabitPerformer;
