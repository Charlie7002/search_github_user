import React from "react";

import ReactFC from "react-fusioncharts";

import FusionCharts from "fusioncharts";

import Chart from "fusioncharts/fusioncharts.charts";

import FusionTheme from "fusioncharts/themes/fusioncharts.theme.fusion";

ReactFC.fcRoot(FusionCharts, Chart, FusionTheme);

const ChartPie2D = ({ data }) => {
	const chartConfigs = {
		type: "pie2d", // The chart type
		width: "100%", // Width of the chart
		height: "400", // Height of the chart
		dataFormat: "json", // Data type
		dataSource: {
			// Chart Configuration
			chart: {
				caption: "Languages",
				theme: "fusion",
				decimals: 0,
				pieRadius: "45%",
				usedataplotcolorforlabels: "1"
				// paletteColors:'#f0db4f'
			},
			// Chart Data
			data
		}
	};
	return <ReactFC {...chartConfigs} />;
};

export default ChartPie2D;
