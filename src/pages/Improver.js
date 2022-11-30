import React from "react";
import Window from "../components/Window";

function Improve() {
  return (
    <section className="w-7/12 mx-auto capitalize">
      <Window string={"improver"} />
      <div className="bg-green-400 relative min-h-[30rem] h-fit pt-5 pb-10 flex justify-center items-center">
        <h1 className="text-center px-10 text-3xl tracking-wider font-semibold ">
          Hi, this section is still under construction. <br /> This section is
          intended to create a form of improvement for each Habit list that
          exist in the Trainer list.
        </h1>
      </div>
    </section>
  );
}

export default Improve;
