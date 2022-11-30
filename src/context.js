import React, { useEffect, useContext, useReducer } from "react";
import reducer from "./reducer";

const AppContext = React.createContext();

// getLocalHost for storing in the browser.
const getLocalStorage = () => {
  let habitListState = localStorage.getItem("habitListState");

  if (habitListState) {
    return JSON.parse(habitListState);
  } else {
    return {
      habitName: "",
      list: [], // the list for creating habit.
      habitTitle: "",
      isEditing: false,
      editHabitID: null,
      notification: { show: false, message: "", type: "" },
      listOfHabit: [], // the list for group of habit activity.
    };
  }
};

const habitListState = getLocalStorage();

const AppProvider = ({ children }) => {
  // Hooks.
  const [state, dispatch] = useReducer(reducer, habitListState);
  const {
    habitName,
    editHabitID,
    isEditing,
    notification,
    habitTitle,
    list,
    listOfHabit,
  } = state;
  console.log("here");
  console.log(state);

  // the setting the value of setNotification .
  const showNotification = (show = false, message = "", type = "") => {
    dispatch({ type: "SHOW_NOTIFICATION", payload: { show, message, type } });
  };

  const handleHabitName = (event) => {
    dispatch({ type: "HANDLE_HABITNAME", payload: event });
  };

  const handleHabitTitle = (event) => {
    dispatch({ type: "HANDLE_HABIT_TITLE", payload: event });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // if the input is empty.
    if (!habitName) {
      showNotification(true, "The input is empty.", "danger");

      // if you edit the input.
    } else if (habitName && isEditing) {
      dispatch({
        type: "HANDLE_EDITING_INPUT",
        payload: { editHabitID, habitName },
      });
      showNotification(true, "You have edited the value.", "success");
    }
    // if everything is okay.
    else {
      dispatch({ type: "HANDLE_SUBMIT_INPUT" });
      showNotification(true, "The new habit successfully added.", "success");
    }
  };

  //handling submit the list, green button on the 4 o'clock.
  const handleSubmitList = () => {
    if (list.length === 0) {
      showNotification(
        true,
        "Your habit is empty. Go create something.",
        "danger"
      );
    } else if (list.length >= 1 && habitTitle === "") {
      showNotification(true, "Please add your habit title.", "danger");

      // to make it run only you submit the input.
    } else if (list.length >= 1 && habitTitle) {
      dispatch({ type: "HANDLE_SUBMIT_HABIT" });
      showNotification(
        true,
        "You've successfully create the Habit List. Time to work on it!",
        "success"
      );
    }
  };

  // remove an item from the list.
  const removeItem = (id) => {
    dispatch({ type: "REMOVE_ITEM", payload: id });
    showNotification(true, "the habit has been removed", "danger");
  };

  // editing the input.
  const editItem = (id) => {
    dispatch({ type: "EDIT_ITEM", payload: id });
    showNotification(
      true,
      "Now you can fill your new value to input section.",
      "failed"
    );
  };

  const moveTop = (id, direction = "top") => {
    if (id === 1 && direction === "top") {
      showNotification(
        true,
        "You are on the first index. can't go top anymore.",
        "failed"
      );
      return;
    } else if (direction === "top") {
      showNotification(true, "The list moved up.", "success");
    }
    moveList(id, direction);
  };

  const moveBottom = (id, direction = "bottom") => {
    if (id === state.list.length && direction === "bottom") {
      showNotification(
        true,
        "You are on the last index. Can't go bottom anymore.",
        "failed"
      );
      return;
    } else if (direction === "bottom") {
      showNotification(true, "The list moved bottom.", "success");
    }
    moveList(id, direction);
  };

  const moveList = (id, direction) => {
    dispatch({ type: "MOVE_LIST", payload: { id, direction } });
  };

  const clearList = () => {
    dispatch({ type: "CLEAR_ITEMS" });
    showNotification(true, "You have cleared the entire list.", "danger");
  };

  const removeHabitList = (id) => {
    dispatch({ type: "REMOVE_HABIT_LIST", payload: id });
  };

  useEffect(() => {
    localStorage.setItem("habitListState", JSON.stringify(state));
  }, [state]);

  useEffect(() => {
    dispatch({ type: "UPDATE_INDEX" });
  }, [...list.map((item) => item.id)]);

  useEffect(() => {
    dispatch({ type: "UPDATE_INDEX_HABIT_LIST" });
  }, [...listOfHabit.map((item) => item.id)]);

  // habit perform
  const changeColor = (habitListId, indexNumber, habitPerformanceId) => {
    dispatch({
      type: "CHANGE_PERFORMANCE_COLOR",
      payload: { habitListId, indexNumber, habitPerformanceId },
    });

    dispatch({
      type: "CHANGE_HABIT_PROGRESS_SUCCESS_FAILURE_VALUE",
      payload: { habitListId, indexNumber, habitPerformanceId },
    });

    dispatch({
      type: "CHANGE_HABIT_PROGRESS_SUCCESS_FAILURE_PERCENTAGE",
      payload: { habitListId, indexNumber, habitPerformanceId },
    });

    dispatch({
      type: "CHANGE_OVERALL_HABIT_PROGRESS_SUCCESS_FAILURE_VALUE",
      payload: { habitListId, indexNumber, habitPerformanceId },
    });

    dispatch({
      type: "CHANGE_OVERALL_HABIT_PROGRESS_SUCCESS_FAILURE_PERCENTAGE",
      payload: { habitListId, indexNumber, habitPerformanceId },
    });
  };

  const handleHabitPerformanceDays = (event, id) => {
    const numberDays = Number(event.target.value);

    dispatch({
      type: "ADDING_PERFORMANCE_DAYS",
      payload: { numberDays, id },
    });
  };

  return (
    <AppContext.Provider
      value={{
        ...state,
        handleHabitName,
        handleHabitTitle,
        handleSubmit,
        clearList,
        handleSubmitList,
        showNotification,
        moveList,
        editItem,
        removeItem,
        moveTop,
        moveBottom,
        removeHabitList,
        changeColor,
        handleHabitPerformanceDays,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };
