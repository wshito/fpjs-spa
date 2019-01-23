'use strict';

import initModel from './Model';
import update from './Update';
import view from './View';

const caloriePage = {
  navLabel: "Calorie Counter",
  initModel,
  update,
  view
};

export default caloriePage;
