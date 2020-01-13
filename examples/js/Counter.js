import WizBiz from '../../src/wizBiz';

export default class Counter extends WizBiz.Component {
  constructor(props) {
    super(props);

    this.state = {
      count: 0
    }
  }

  componentDidMount() {
    console.log('Component mounted');
  }

  render() {
    return (
      <div>
        <p>Count: {this.state.count}</p>
        <button onClick={() => this.setState({
          count: this.state.count + 1
        })}>Increment</button>
      </div>
    )
  }
}
