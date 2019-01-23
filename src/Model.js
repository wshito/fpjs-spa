'use strict';

import caloriePage from './calorie-counter/Page';
import tipCalcPage from './tip-calculator/Page';

export const PAGES = {
  CALORIE_PAGE: { key: Symbol(), info: caloriePage },
  TIP_CALC_PAGE: { key: Symbol(), info: tipCalcPage },
};

const initModel = {
  page: PAGES.CALORIE_PAGE,
  [PAGES.CALORIE_PAGE.key]: caloriePage.initModel,
  [PAGES.TIP_CALC_PAGE.key]: tipCalcPage.initModel,
};

export default initModel;
