import * as React from 'react';
import { Statistic } from 'antd';
        {/* <div>
          <h1>当前时间</h1>
          <h2></h2>
        </div> */}
export default class Clock extends React.Component {
    constructor(props) {
      super(props);
      this.state = {date: new Date()};
    }
  
    componentDidMount() {
      this.timerID = setInterval(
        () => this.tick(),
        1000
      );
    }
  
    componentWillUnmount() {
      clearInterval(this.timerID);
    }
  
    tick() {
      this.setState({
        date: new Date()
      });
    }
  
    render() {
      return (
        <Statistic title="当前时间" value={this.state.date.toLocaleTimeString()} />
      );
    }
}
  