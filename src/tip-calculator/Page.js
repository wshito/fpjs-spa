'use strict';

import initModel from './Model';
import update from './Update';
import view from './View';

const page = {
  navLabel: 'Tip Calculator',
  hash: '#tipcalc',
  initModel,
  update,
  view
};

export default page;
