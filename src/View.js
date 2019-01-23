'uee strict';

import hh from 'hyperscript-helpers';
import { h } from 'virtual-dom';
import * as R from 'ramda';
import {} from './Update'; // locationChangeMsg
import { PAGES } from './Model';

const { div, header, nav, ul, li, section } = hh(h);

const navItem = (dispatch, currentPage, navPage) =>
  currentPage === navPage ?
  li({ className: 'dib ml3 bb pb2' }, navPage.navLabel) : // border-bottom for current page navigation menu
  li({ className: 'dib ml3 pb2' }, navPage.navLabel); // display: inline-block

const navigationBar = (dispatch, model) => header({ className: '' }, [
  nav({ className: 'page-nav mt4 mb3 f4 cf' },
    [
      ul({ className: 'fr li mv0' }, // float-right
        Object.values(PAGES).map(eachPage => navItem(dispatch, model.page, eachPage))) // navigation menu
    ]
  ),
]);

const pageView = (dispatch, model) => section({ className: 'cf' }, // clear float
  [
    model.page.view(dispatch, model[model.page])
  ]
);

const view = (dispatch, model) => div({ className: 'ma2 mw6 center' }, [
  navigationBar(dispatch, model),
  pageView(dispatch, model),
  // pre(JSON.stringify(model, null, 2))
]);

export default view;
