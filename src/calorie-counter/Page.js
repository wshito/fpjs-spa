'use strict';

import initModel from './Model';
import update from './Update';
import view from './View';

const page = {
  navLabel: 'Calorie Counter',
  hash: '#calorie',
  initModel,
  update,
  view
};

export default page;
