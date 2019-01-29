'use strict';

import * as R from 'ramda';
import { PAGES } from './Model';

const MSGS = {
  LOCATION_CHANGE: Symbol(),
};

const hash2page = hash => Object.values(PAGES).filter(page => hash === page.info.hash)[0];

export const locationChangeMsg = hash => {
  return {
    type: MSGS.LOCATION_CHANGE,
    page: hash2page(hash)
  };
}

const updateDispatcher = {
  [MSGS.LOCATION_CHANGE]: (msg, model) => {
    const { page } = msg;
    return { ...model, page };
  },
};

const pageUpdate = (msg, model) => {
  return {
    ...model,
    [model.page.key]: model.page.info.update(msg, model[model.page.key])
  }
};

/**
 * Dispatches the given message with `updateDispatcher` first.
 * If there is no corresponding disptachment with `updateDispatcher`
 * `pageUpdate` is called next.
 * 
 * @param {*} msg 
 * @param {*} model 
 */
const update = (msg, model) => (R.defaultTo(pageUpdate)(updateDispatcher[msg.type]))(msg, model);

export default update;
