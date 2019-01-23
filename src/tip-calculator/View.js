'use strict';
import hh from 'hyperscript-helpers';
import { h } from 'virtual-dom';
import * as R from 'ramda';
import { MSGS, billInputMsg, tipInputMsg } from './Update';

const { div, h1, label, input, pre, span } = hh(h);

const inputFieldSet = (labelText, inputValue, oninput) =>
  div({ className: 'w-50' }, [
    label({ className: 'db mb1' }, labelText), // display-block, margin-bottom-1
    input({
      className: 'pa2 input-reset ba w-100 mb2 tr',
      type: 'text',
      value: inputValue,
      oninput
    }),
  ]);

const outputFieldSet = (labelText, output) =>
  div({ className: 'flex w-50 mt3' }, [
    span({ className: 'w-50 mb2 tl' }, labelText),
    span({ className: 'w-50 tr' }, output),
  ]);

const View = (dispatch, model) =>
  div({ className: 'mw6 center' }, [ // max-width: 32rem
    h1({ className: 'f2 pv2 bb' }, 'Tip Calculator'),
    inputFieldSet('Bill Amount', model.bill, e => dispatch(billInputMsg(e.target.value))),
    inputFieldSet('Tip %', model.tipPercent, e => dispatch(tipInputMsg(e.target.value))),
    outputFieldSet('Tip:', model.tip != null ? '$' + model.tip : ''),
    outputFieldSet('Total:', model.total != null ? '$' + model.total : ''),
    // pre(JSON.stringify(model, null, 2)),
  ]);



export default View;
