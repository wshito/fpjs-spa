"use strict";

import * as R from 'ramda';

const MSGS = {
  SHOW_FORM: 'SHOW_FORM',
  MEAL_INPUT: 'MEAL_INPUT',
  CALORIES_INPUT: 'CALORIES_INPUT',
  SAVE_MEAL: 'SAVE_MEAL',
  DELETE_MEAL: 'DELETE_MEAL',
  EDIT_MEAL: 'EDIT_MEAL',
};

export const showFormMsg = (showForm) => {
  return {
    type: MSGS.SHOW_FORM,
    showForm
  };
}

export const mealInputMsg = description => {
  return {
    type: MSGS.MEAL_INPUT,
    description
  };
};

export const caloriesInputMsg = calories => {
  return {
    type: MSGS.CALORIES_INPUT,
    calories
  };
};

export const saveMealMsg = { type: MSGS.SAVE_MEAL };

export const deleteMealMsg = id => {
  return {
    type: MSGS.DELETE_MEAL,
    id
  };
};

export const editMealMsg = editId => {
  return {
    type: MSGS.EDIT_MEAL,
    editId
  };
};
const edit = (msg, model) => {
  const { description, calories, editId } = model;
  const meals = model.meals.map(meal => {
    if (meal.id === editId)
      return { ...meal, description, calories };
    return meal;
  });
  return { ...model,
    meals,
    description: '',
    calories: 0,
    showForm: false,
    editId: null,
  }
};
const add = (msg, model) => {
  const { nextId, description, calories } = model;
  const addingMeal = { id: nextId, description, calories };
  const newMeals = [...model.meals, addingMeal];
  return {
    ...model,
    meals: newMeals,
    nextId: nextId + 1,
    description: '',
    calories: 0,
    showForm: false,
  };
};

const update = (msg, model) => {
  switch (msg.type) {
    case MSGS.SHOW_FORM:
      const { showForm } = msg;
      return { ...model, showForm, description: '', calories: 0 };
    case MSGS.MEAL_INPUT:
      {
        const { description } = msg;
        return { ...model, description };
      }
    case MSGS.CALORIES_INPUT:
      const calories = R.compose(
        R.defaultTo(0),
        parseInt
      )(msg.calories);
      return { ...model, calories };
    case MSGS.SAVE_MEAL:
      {
        const { editId } = model;
        const updatedModel = (editId === null) ? add(msg, model) : edit(msg, model);
        return updatedModel;
      }
    case MSGS.DELETE_MEAL:
      const { id } = msg;
      const meals = model.meals.filter(meal => meal.id !== id);
      return { ...model, meals };
    case MSGS.EDIT_MEAL:
      {
        const { editId } = msg;
        const meal = model.meals.find(meal => meal.id === editId);
        const { description, calories } = meal;
        return {
          ...model,
          editId,
          description,
          calories,
          showForm: true,
        };
      }
  }
  return model;
}

export default update;
