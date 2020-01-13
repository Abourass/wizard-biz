import WizBiz from '../../src/wizBiz';
import WizDom from '../../src/wizDom';
import Counter from './Counter';

const Greeting = ({name}) => <p>Welcome {name}!</p>;

const App = (
  <div>
    <h1 className="primary">
    A Wizardly Component System
    </h1>
    <p>Made in 90 lines of JS</p>
    <Greeting name={'Kyle'}/>
    <Counter/>
  </div>
);

WizDom.render(App, document.getElementById('root'));
