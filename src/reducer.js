const reducer = (state, action) => {
  // REDUCER FOR MAKER PAGE
  if (action.type === "SHOW_NOTIFICATION") {
    const { show, message, type } = action.payload;
    return { ...state, notification: { show, message, type } };
  }

  if (action.type === "HANDLE_HABITNAME") {
    return { ...state, habitName: action.payload };
  }

  if (action.type === "HANDLE_HABIT_TITLE") {
    return { ...state, habitTitle: action.payload };
  }

  if (action.type === "HANDLE_SUBMIT_INPUT") {
    return {
      ...state,
      list: [
        ...state.list,
        { id: state.list.length + 1, habitName: state.habitName },
      ],
      habitName: "",
    };
  }

  if (action.type === "HANDLE_EDITING_INPUT") {
    const newEditedList = state.list.map((item) => {
      const { habitName, editHabitID } = action.payload;
      if (item.id === editHabitID) {
        return { ...item, habitName };
      }
      return item;
    });
    return {
      ...state,
      list: newEditedList,
      habitName: "",
      editHabitID: null,
      isEditing: false,
    };
  }

  if (action.type === "HANDLE_SUBMIT_HABIT") {
    const newHabitList = {
      id: state.listOfHabit.length + 1,
      title: state.habitTitle,
      list: state.list,
      amountHabit: state.list.length,
    };
    return {
      ...state,
      listOfHabit: [...state.listOfHabit, newHabitList],
      habitTitle: "",
      list: [],
    };
  }

  if (action.type === "EDIT_ITEM") {
    const specificItem = state.list.find((item) => item.id === action.payload);
    return {
      ...state,
      isEditing: true,
      editHabitID: action.payload,
      habitName: specificItem.habitName,
    };
  }

  if (action.type === "REMOVE_ITEM") {
    return {
      ...state,
      list: state.list.filter((item) => item.id !== action.payload),
    };
  }

  if (action.type === "MOVE_LIST") {
    const { id, direction } = action.payload;

    // create new value without the intended array value with that id.
    const newValue = state.list.filter((item) => item.id !== id);

    // take one intended array value. for later use doing splice.
    const [switchedValue] = state.list.filter((item) => item.id === id);

    let position;
    if (direction === "top") {
      // id minus 2
      // id is current array position
      // current index is 1 below id
      // above position is 1 below index.
      // that's why -2
      position = id - 2;
    } else if (direction === "bottom") {
      // current index is 1 below id.
      // next is 1
      // that's why no need minues.
      position = id;
    }

    newValue.splice(position, 0, switchedValue);

    return { ...state, list: newValue };
  }

  if (action.type === "CLEAR_ITEMS") {
    return { ...state, list: [] };
  }

  if (action.type === "UPDATE_INDEX") {
    const arrangedArray = state.list.map((item, index) => {
      return { ...item, id: index + 1 };
    });
    return { ...state, list: arrangedArray };
  }

  if (action.type === "UPDATE_INDEX_HABIT_LIST") {
    const arrangedArray = state.listOfHabit.map((item, index) => {
      return { ...item, id: index + 1 };
    });
    return { ...state, listOfHabit: arrangedArray };
  }

  // REDUCER FOR TRAINER PAGE
  if (action.type === "REMOVE_HABIT_LIST") {
    return {
      ...state,
      listOfHabit: state.listOfHabit.filter(
        (item) => item.id !== action.payload
      ),
    };
  }

  // REDUCER FOR PERFORM HABIT.
  if (action.type === "ADDING_PERFORMANCE_DAYS") {
    const { numberDays, id } = action.payload;

    // change id value to index by - 1
    const index = id - 1;

    //creating days array to contain
    const days = [...Array(numberDays).keys()].map((x) => {
      return {
        id: x + 1,
        color: "gray-color",
        passScore: 0,
        success: 0,
        failure: 0,
      };
    });

    // straight going to the list of each listOfHabit
    const newList = state.listOfHabit[index].list.map((item) => {
      return {
        ...item,
        eachHabitProgress: 0,
        eachHabitProgressPercentage: 0,
        eachHabitSuccess: 0,
        eachHabitSuccessPercentage: 0,
        eachHabitFailure: 0,
        eachHabitFailurePercentage: 0,
        days: days,
      };
    });

    const listOfhabitModifiedArray = state.listOfHabit.map((item) => {
      if (item.id === id) {
        return {
          ...item,
          overallProgress: 0,
          overallPercentage: 0,
          overallSuccess: 0,
          overallSuccessPercentage: 0,
          overallFailure: 0,
          overallFailurePercentage: 0,
          performanceDays: numberDays,
          list: newList,
        };
      }
      return item;
    });

    return {
      ...state,
      listOfHabit: [...listOfhabitModifiedArray],
    };
  }

  if (action.type === "CHANGE_PERFORMANCE_COLOR") {
    const { habitListId, indexNumber, habitPerformanceId } = action.payload;

    const modifiedColorListOfHabit = state.listOfHabit.map((habit) => {
      if (habit.id === habitListId) {
        return {
          ...habit,
          list: habit.list.map((activity) => {
            if (activity.id === indexNumber) {
              return {
                ...activity,
                days: activity.days.map((day) => {
                  if (day.id === habitPerformanceId) {
                    if (day.color === "green-color") {
                      return {
                        ...day,
                        color: "red-color",
                        passScore: 1,
                        failure: 1,
                        success: 0,
                      };
                    } else if (day.color === "red-color") {
                      return {
                        ...day,
                        color: "green-color",
                        passScore: 1,
                        success: 1,
                        failure: 0,
                      };
                    } else {
                      return {
                        ...day,
                        color: "green-color",
                        passScore: 1,
                        success: 1,
                        failure: 0,
                      };
                    }
                  }
                  return day;
                }),
              };
            }
            return activity;
          }),
        };
      }
      return habit;
    });

    return {
      ...state,
      listOfHabit: modifiedColorListOfHabit,
    };
  }

  if (action.type === "CHANGE_HABIT_PROGRESS_SUCCESS_FAILURE_VALUE") {
    const { habitListId, indexNumber } = action.payload;

    const modifiedValueEachHabit = state.listOfHabit.map((habit) => {
      if (habit.id === habitListId) {
        return {
          ...habit,
          list: habit.list.map((activity) => {
            if (activity.id === indexNumber) {
              return {
                ...activity,
                eachHabitProgress: activity.days
                  .map((day) => day.passScore)
                  .reduce((score, curValue) => score + curValue),
                eachHabitSuccess: activity.days
                  .map((day) => day.success)
                  .reduce((score, curValue) => score + curValue),
                eachHabitFailure: activity.days
                  .map((day) => day.failure)
                  .reduce((score, curValue) => score + curValue),
              };
            }
            return activity;
          }),
        };
      }
      return habit;
    });

    return {
      ...state,
      listOfHabit: modifiedValueEachHabit,
    };
  }

  if (action.type === "CHANGE_HABIT_PROGRESS_SUCCESS_FAILURE_PERCENTAGE") {
    const { habitListId, indexNumber } = action.payload;

    const modifiedEachHabitPercentage = state.listOfHabit.map((habit) => {
      if (habit.id === habitListId) {
        return {
          ...habit,
          list: habit.list.map((activity) => {
            if (activity.id === indexNumber) {
              return {
                ...activity,
                eachHabitProgressPercentage: Math.round(
                  (activity.eachHabitProgress / habit.performanceDays) * 100
                ),
                eachHabitSuccessPercentage: Math.round(
                  (activity.eachHabitSuccess / habit.performanceDays) * 100
                ),
                eachHabitFailurePercentage: Math.round(
                  (activity.eachHabitFailure / habit.performanceDays) * 100
                ),
              };
            }
            return activity;
          }),
        };
      }
      return habit;
    });

    return {
      ...state,
      listOfHabit: modifiedEachHabitPercentage,
    };
  }

  if (action.type === "CHANGE_OVERALL_HABIT_PROGRESS_SUCCESS_FAILURE_VALUE") {
    const { habitListId } = action.payload;

    const modifiedOverallListOfHabit = state.listOfHabit.map((habit) => {
      if (habit.id === habitListId) {
        return {
          ...habit,
          overallFailure: habit.list
            .map((activity) => activity.eachHabitFailure)
            .reduce((score, curValue) => score + curValue),
          overallSuccess: habit.list
            .map((activity) => activity.eachHabitSuccess)
            .reduce((score, curValue) => score + curValue),
          overallProgress: habit.list
            .map((activity) => activity.eachHabitProgress)
            .reduce((score, curValue) => score + curValue),
        };
      }
      return habit;
    });

    return { ...state, listOfHabit: modifiedOverallListOfHabit };
  }

  if (
    action.type === "CHANGE_OVERALL_HABIT_PROGRESS_SUCCESS_FAILURE_PERCENTAGE"
  ) {
    const { habitListId } = action.payload;

    const modifiedOverallListOfHabit = state.listOfHabit.map((habit) => {
      if (habit.id === habitListId) {
        return {
          ...habit,
          overallFailurePercentage: Math.round(
            (habit.overallFailure / habit.performanceDays / habit.amountHabit) *
              100
          ),
          overallSuccessPercentage: Math.round(
            (habit.overallSuccess / habit.performanceDays / habit.amountHabit) *
              100
          ),
          overallProgressPercentage: Math.round(
            (habit.overallProgress /
              habit.performanceDays /
              habit.amountHabit) *
              100
          ),
        };
      }
      return habit;
    });

    return { ...state, listOfHabit: modifiedOverallListOfHabit };
  }
  throw new Error("no matching action type.");
};

export default reducer;
