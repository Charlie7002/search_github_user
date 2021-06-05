import React from "react";

import ReactFC from "react-fusioncharts";

import FusionCharts from "fusioncharts";

import Chart from "fusioncharts/fusioncharts.charts";

import FusionTheme from "fusioncharts/themes/fusioncharts.theme.fusion";

ReactFC.fcRoot(FusionCharts, Chart, FusionTheme);

const Column3D = ({ data }) => {
	const chartConfigs = {
		type: "column2d", // The chart type
		width: "100%", // Width of the chart
		height: "400", // Height of the chart
		dataFormat: "json", // Data type
		dataSource: {
			// Chart Configuration
			chart: {
				caption: "Most Popular",
				theme: "fusion",
				decimals: 0,
				usedataplotcolorforlabels: "1",
				yAxisName: "Stars",
				xAxisName: "Repos",
				xAxisNameFontSize: "16px",
				yAxisNameFontSize: "16px"
			},
			// Chart Data
			data
		}
	};
	return <ReactFC {...chartConfigs} />;
};

export default Column3D;
