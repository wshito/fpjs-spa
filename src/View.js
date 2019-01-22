"uee strict";

import hh from 'hyperscript-helpers';
import { h } from 'virtual-dom';
import * as R from 'ramda';
import { showFormMsg, mealInputMsg, caloriesInputMsg, saveMealMsg, deleteMealMsg, editMealMsg } from './Update';

const { pre, div, h1, button, form, label, input, table, tr, th, td, thead, tbody, i } = hh(h);

const fieldSet = (labelText, inputValue, oninput) =>
  div([
    label({ className: 'db mb1' }, labelText), // display-block, margin-bottom
    input({
      className: 'pa2 input-reset ba w-100 mb2', // padding-all border-all width-100 margin-bottom
      type: 'text',
      value: inputValue,
      oninput
    })
  ]);

const buttonSet = dispatch => div([
  button({
    className: 'f3 pv2 ph3 bg-blue white bn mr2 dim',
    type: 'submit',
  }, 'Save'),
  button({
    className: 'f3 pv2 ph3 bg-light-gray bn dim',
    type: 'button',
    onclick: () => dispatch(showFormMsg(false))
  }, 'Cancel')
]);

const formView = (dispatch, model) => {
  let { description, calories, showForm } = model;
  if (showForm) {
    return form({
      className: 'w-100 mv2',
      onsubmit: e => {
        e.preventDefault();
        dispatch(saveMealMsg);
      }
    }, [ // width-100, margin-vertical
      fieldSet('Meal', description, e => dispatch(mealInputMsg(e.target.value))),
      fieldSet('Calories', calories || '', e => dispatch(caloriesInputMsg(e.target.value))),
      buttonSet(dispatch)
    ]);
  } else {
    return button({
      className: 'f3 pv2 ph3 bg-blue white bn',
      onclick: () => dispatch(showFormMsg(true)) // onclickは全て小文字！
    }, 'Add Meal');
  }
}

const cell = (tag, className, value) => tag({ className }, value);

const tableHeader = thead([
  tr([
    cell(th, 'pa2 tl', 'Meal'),
    cell(th, 'pa2 tr', 'Calories'),
    cell(th, '', ''),
  ])
]);

const mealRow = (dispatch, className, meal) => {
  return tr({ className }, [
    cell(td, 'pa2', meal.description),
    cell(td, 'pa2 tr', meal.calories),
    cell(td, 'pa2 tr', [
      i({
        className: 'ph1 fa fa-trash-o pointer',
        onclick: () => dispatch(deleteMealMsg(meal.id)),
      }),
      i({
        className: 'ph1 fa fa-pencil-square-o pointer',
        onclick: () => dispatch(editMealMsg(meal.id)),
      }),
    ]),
  ]);
};

const totalRow = meals => {
  const total = R.compose(
    R.sum,
    R.map(meal => meal.calories)
  )(meals);
  return tr({ className: 'bt b' }, [ // border-top bold
    cell(td, 'pa2 tr', 'Total:'),
    cell(td, 'pa2 tr', total),
    cell(td, '', ''),
  ])
};

const mealsBody = (dispatch, className, meals) => {
  const rows = meals.map(meal => mealRow(dispatch, 'stripe-dark', meal));
  const rowsWithTotal = [...rows, totalRow(meals)];
  return tbody({ className }, rowsWithTotal);
};

const tableView = (dispatch, meals) => {
  if (meals.length == 0) {
    return div({ className: 'mv2 i black-50' }, 'No meals to display...'); // margin-vertical, italic
  }
  return table({ className: 'mv2 w-100 collapse' }, [
    tableHeader,
    mealsBody(dispatch, '', meals),
  ]);
};

const view = (dispatch, model) => {
  return div({ className: 'mw6 center' }, [
    h1({ className: 'f2 pv2 bb' }, 'Calorie Counter'),
    formView(dispatch, model),
    tableView(dispatch, model.meals),
    // pre(JSON.stringify(model, null, 2))
  ]);
};

export default view;
