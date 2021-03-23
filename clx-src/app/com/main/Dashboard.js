
/************************************************
 * 공통 모듈 선언
 ************************************************/

/************************************************
 * 전역 변수 선언
 ************************************************/

/************************************************
 * 사용자 정의 함수
 ************************************************/

/************************************************
 * 컨트롤 이벤트
 ************************************************/

/*
 * 쉘에서 init 이벤트 발생 시 호출.
 */
function onShlChrtInit( /* cpr.events.CUIEvent */ e) {
	/** 
	 * @type cpr.controls.UIControlShell
	 */
	var shlChrt = e.control;

	var voCharts = shlChrt.getComponent("apex");

	if (voCharts) {
		e.preventDefault();
	}
}

/*
 * 쉘에서 load 이벤트 발생 시 호출.
 */
function onShlChrtLoad( /* cpr.events.CUIEvent */ e) {
	/** 
	 * @type cpr.controls.UIControlShell
	 */
	var shlChrt = e.control;

	var voChart = e.content;
	if (!voChart) {
		return;
	}
	
	shlChrt.registerComponent("apex", voChart);

	var options = {
		series: [{
			name: 'eXbuilder6',
			data: [44, 55, 41, 67, 22, 43, 51, 12, 30, 56, 69, 33]
		}, {
			name: 'eXbuilder5',
			data: [11, 17, 15, 15, 21, 14, 29, 36, 47, 31, 12, 29]
		}, {
			name: 'eXERD',
			data: [13, 23, 20, 8, 13, 27, 56, 40, 75, 10, 31, 17]
		}],
		chart: {
			type: 'bar',
			height: 250,
			stacked: true,
			toolbar: {
				show: false
			},
			redrawOnParentResize: true,
			zoom: {
				enabled: true
			}
		},
		grid: {
			borderColor: '#f8f9fa'
		},
		fill: {
			colors: ['#2263b3', '#28d094', '#f4bd0e']
		},
		plotOptions: {
			bar: {
				horizontal: false,
				columnWidth: '12px'
				//endingShape: 'rounded'
			},
		},
		dataLabels: {
			enabled: false
		},
		xaxis: {
			type: 'category',
			categories: [
				"Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
			],
			labels : {
				style : {
					colors : '#adb5bd',
					fontSize : '12px',
					fontWeight : 400
				}
			},
			axisBorder: {
				show: false,
			},
			axisTicks: {
				show: true,
				color: '#f8f9fa'
			}
		},
		yaxis : {
			labels : {
				style : {
					colors : '#adb5bd',
					fontSize : '12px',
					fontWeight : 400
				}
			}
		},
		legend: {
			position: 'bottom',
			offsetY: 2,
			markers : {
				fillColors : ['#2263b3', '#28d094', '#f4bd0e']
			}
		}
	};

	var chart = new ApexCharts(voChart, options);

	chart.render();
}
