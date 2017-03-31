import {
	connect
} from 'react-redux'
import {
	getChartData,
} from '../modules/chart'
import MyChart from '../components/MyChart'

const mapDispatchToProps = {
  getChartData: () => getChartData()
}

const mapStateToProps = state => ({
  chart: state.chart
})

export default connect(mapStateToProps, mapDispatchToProps)(MyChart)
