import * as snabbdom from 'snabbdom';
import propsModule from 'snabbdom/modules/props';
import eventlistenersModule from 'snabbdom/modules/eventlisteners';
import WizBiz from './wizBiz';

const reconcile = snabbdom.init([propsModule, eventlistenersModule]); // propsModule -> this helps in patching text attributes
let rootVNode; // we need to maintain the latest rootVNode returned by render

const render = (el, rootDomElement) => {
  if (rootVNode == null) { rootVNode = rootDomElement; }
  // remember the VNode that reconcile returns
  rootVNode = reconcile(rootVNode, el);
};

WizBiz.__updater = (componentInstance) => {
  // logic on how to update the DOM when you call this.setState
  // get the oldVNode stored in __vNode
  const oldVNode = componentInstance.__vNode;

  const newVNode = componentInstance.render();   // find the updated DOM node by calling the render method
  componentInstance.__vNode = reconcile(oldVNode, newVNode);   // update the __vNode property with updated __vNode
};

const WizDom = {
  render
};
export default WizDom;
