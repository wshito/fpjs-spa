"use strict";

import { diff, patch } from 'virtual-dom';
import createElement from 'virtual-dom/create-element';

import { locationChangeMsg } from './Update';

// impure code below
const app = (initModel, update, view, node) => {
  let model = initModel;
  if (window.location.hash !== '')
    model = { ...model, page: locationChangeMsg(window.location.hash).page };
  let currentView = view(dispatch, model); // view自体はラッピングしておらずそのまま
  let rootNode = createElement(currentView); // 更新するnodeをvirtual-domの要素でラッピングしてからappendChildに渡す
  node.appendChild(rootNode);

  window.onhashchange = () => dispatch(locationChangeMsg(window.location.hash));

  function dispatch (msg) {
    model = update(msg, model);
    const updatedView = view(dispatch, model); // view自体はラッピングしておらずそのまま
    const patches = diff(currentView, updatedView); // viewの差分を取る
    rootNode = patch(rootNode, patches); // 差分のパッチを当て，次の変更用にrootNodeを更新しておく．
    currentView = updatedView;
  }
}

export default app;
