import {h} from 'snabbdom'

const createElement = (type, props = {}, ...children) => {
  // if type is a Class then
  // First, create an instance of the Class, then, call the render method on the Class instance
  children = children.flat();

  if (type.prototype && type.prototype.isWizBizClassComponent) {
    const componentInstance = new type(props);
    // remember the current vNode instance
    componentInstance.__vNode = componentInstance.render();

    // add hook to snabbdom virtual node to know whether it was added to the actual DOM
    componentInstance.__vNode.data.hook = {
      create: () => {
        componentInstance.componentDidMount()
      }
    };
    return componentInstance.__vNode;
  }
  // if type is a function then call it and return its value
  if (typeof type == "function") { return type(props); }
  props = props || {};
  let dataProps = {};
  let eventProps = {};

  // This is to seperate out the text attributes and event listener attributes
  for(let propKey in props) {
    // event props always startwith on eg. onClick, onChange etc.
    if (propKey.startsWith('on')) {
      // onClick -> click
      const event = propKey.substring(2).toLowerCase();

      eventProps[event] = props[propKey];
    }
    else {
      dataProps[propKey] = props[propKey];
    }
  }

  // props -> snabbdom's internal text attributes
  // on -> snabbdom's internal event listeners attributes
  return h(type, { props: dataProps, on: eventProps }, children);
};

// component base class
class Component {
  constructor() { }

  componentDidMount() { }

  setState(partialState) {
    // update the state by adding the partial state
    this.state = {
      ...this.state,
      ...partialState
    };
    // call the __updater function that QndReactDom gave
    WizBiz.__updater(this);
  }

  render() { }
}

// add a static property to differentiate between a class and a function
Component.prototype.isWizBizClassComponent = true;

const WizBiz = {
  createElement,
  Component
};

export default WizBiz;
