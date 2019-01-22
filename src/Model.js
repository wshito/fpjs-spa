"use  strict";

const meal = {
  id: 1, // unique key
  description: 'Breakfast',
  calories: 460
};
const initModel = {
  description: 'Breakfast',
  calories: 460,
  showForm: false, // toggled by 'Add' button
  editId: null,
  nextId: 0, // to add new record
  meals: [],

}

export default initModel;
