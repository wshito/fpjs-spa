'use strict';

import * as R from 'ramda';
import { PAGES } from './Model';

const MSGS = {
  LOCATION_CHANGE: Symbol(),
};

const updateDispatcher = {
  [MSGS.LOCATION_CHANGE]: (msg, model) => {
    const { page } = msg;
    return { ...model, page };
  },
};

const pageUpdate = (msg, model) => {
  return {
    ...model,
    [model.page]: model.page.update(msg, model[model.page])
  }
};

const update = (msg, model) => (R.defaultTo(pageUpdate)(updateDispatcher[msg.type]))(msg, model);

export default update;
