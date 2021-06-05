import React from "react";

import ReactFC from "react-fusioncharts";

import FusionCharts from "fusioncharts";

import Chart from "fusioncharts/fusioncharts.charts";

import FusionTheme from "fusioncharts/themes/fusioncharts.theme.ocean";

ReactFC.fcRoot(FusionCharts, Chart, FusionTheme);

const Doughnut2d = ({ data }) => {
	const dataConfigs = {
		type: "doughnut2d",
		width: "100%",
		height: "400",
		dataFormat: "json",
		dataSource: {
			chart: {
				caption: "Stars per languages",
				doughnutRadius: "45%",
				decimals: 0,
				showpercentvalues: 0,
				theme: "ocean",
				usedataplotcolorforlabels: "1"
			},
			data
		}
	};

	return <ReactFC {...dataConfigs} />;
};

export default Doughnut2d;
