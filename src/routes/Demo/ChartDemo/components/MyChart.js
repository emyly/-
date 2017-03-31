import React, { Component, PropTypes } from 'react';

import ReactEcharts from 'echarts-for-react';


import './MyChart.scss';

class MyChart extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.props.getChartData()
  }
  state = {
    open: false,
  };

  handleToggle = () => {
    this.setState({
      open: !this.state.open,
    });
  };

  handleNestedListToggle = (item) => {
    this.setState({
      open: item.state.open,
    });
  };

  render() {
    return (
      <div className='my-chart'>
        <span>图表例子</span>
        {(() => {
          if (this.props.chart.status === 'error') {
            alert(this.props.chart.error)
          }
          if (this.props.chart.status === true) {
            return <ReactEcharts option={this.props.chart.chartData} style={{ height: 300 }} />
          } else {}
        })()}
        <br /><br /><br />

      </div>

    )
  }

}

export default MyChart

