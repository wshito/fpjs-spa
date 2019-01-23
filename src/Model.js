'use strict';

import caloriePage from './calorie-counter/Page';

export const PAGES = {
  CALORIE_PAGE: caloriePage,
  // TIP_CALC_PAGE: Symbol(),
};

const initModel = {
  page: PAGES.CALORIE_PAGE,
  [PAGES.CALORIE_PAGE]: caloriePage.initModel,
};

export default initModel;
