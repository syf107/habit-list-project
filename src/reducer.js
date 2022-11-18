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
    // console.log("this is the switch value");
    // console.log(switchedValue);

    console.log("The before splice");
    // console.log(newValue);

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

    // console.log("The result filter");
    // console.log(newValue);
    return { ...state, list: newValue };
  }

  if (action.type === "CLEAR_ITEMS") {
    return { ...state, list: [] };
  }

  if (action.type === "UPDATE_INDEX") {
    // console.log("array updated");
    const arrangedArray = state.list.map((item, index) => {
      return { ...item, id: index + 1 };
    });
    // console.log(arrangedArray);
    return { ...state, list: arrangedArray };
  }

  // REDUCER FOR TRAINER PAGE
  if (action.type === "REMOVE_HABIT_LIST") {
    console.log(action.payload);

    return {
      ...state,
      listOfHabit: state.listOfHabit.filter(
        (item) => item.id !== action.payload
      ),
    };
  }

  throw new Error("no matching action type.");
};

export default reducer;
