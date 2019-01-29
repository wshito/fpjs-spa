'use strict';

import * as R from 'ramda';

const MSGS = {
  BILL_INPUT: Symbol(),
  TIP_INPUT: Symbol(),
};

export const billInputMsg = bill => {
  return { type: MSGS.BILL_INPUT, bill };
};

export const tipInputMsg = tipPercent => {
  return { type: MSGS.TIP_INPUT, tipPercent };
};

const round = (number, precision) =>
  Math.round(number * Math.pow(10, precision)) * Math.pow(10, -precision);

const isFloat = numStr => /^\.[0-9]*$|^[0-9]+\.?[0-9]*$/.test(numStr);
const isTwoDecimal = numStr => {
  let tok = numStr.split('.');
  if (tok.length > 1) {
    return tok[1].length < 3;
  } else {
    return true;
  }
  return false;
};
const isEmpty = str => str.length === 0;

const isValidBill = str => isEmpty(str) || isFloat(str) && isTwoDecimal(str);
const isValidTipPercent = str => isEmpty(str) || isFloat(str);

const calculateTotal = (model) => {
  const { bill, tipPercent } = model;
  const bill2 = parseInput(bill);
  const tip = round(bill2 * parseInput(tipPercent) / 100.0, 2);
  const total = (tip + bill2).toFixed(2);
  return { ...model, tip: tip.toFixed(2), total };
};

const parseInput = R.compose(
  R.defaultTo(0),
  num => round(num, 2),
  parseFloat
);

const updateDispatcher = {
  [MSGS.BILL_INPUT]: (msg, model) =>
    isValidBill(msg.bill) ? calculateTotal({ ...model, bill: msg.bill }) : model,
  [MSGS.TIP_INPUT]: (msg, model) =>
    isValidTipPercent(msg.tipPercent) ? calculateTotal({ ...model, tipPercent: msg.tipPercent }) : model,
};

/**
 * Returns updated `model`.  When the message is invalid this returns
 * the `model` untouched.
 * 
 * @param {*} msg 
 * @param {*} model 
 */
const Update = (msg, model) => R.defaultTo((msg, model) => model)(updateDispatcher[msg.type])(msg, model);

export default Update;
