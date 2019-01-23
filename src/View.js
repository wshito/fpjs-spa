'uee strict';

import hh from 'hyperscript-helpers';
import { h } from 'virtual-dom';
import * as R from 'ramda';
import {} from './Update'; // locationChangeMsg
import { PAGES } from './Model';

const { div, header, nav, ul, li, section, a } = hh(h);

const navItem = (dispatch, currentPageKey, navPage) => {
  const { hash, navLabel } = navPage.info;
  // display: inline-block
  const className = 'dib ml4 pb2 hover-bg-light-blue' + // display: inline-block
    (currentPageKey === navPage.key ? ' bb bw2 b--light-blue' : ''); // border-bottom for current page navigation menu
  return li({ className },
    a({ className: 'link black', href: hash }, navLabel));
}

const navigationBar = (dispatch, model) => header({ className: '' }, [
  nav({ className: 'page-nav mt4 mb3 f5 cf' },
    [
      ul({ className: 'fr li mv0' }, // float-right
        Object.values(PAGES).map(eachPage => navItem(dispatch, model.page.key, eachPage))) // navigation menu
    ]
  ),
]);

const pageView = (dispatch, model) => section({ className: 'cf' }, // clear float
  [
    model.page.info.view(dispatch, model[model.page.key])
  ]
);

const view = (dispatch, model) => div({ className: 'ma2 mw6 center' }, [
  navigationBar(dispatch, model),
  pageView(dispatch, model),
  // pre(JSON.stringify(model, null, 2))
]);

export default view;
