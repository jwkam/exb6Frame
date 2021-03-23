/************************************************
 * EBEXT002.js
 * Created at 2020. 12. 18. 오후 2:42:09.
 *
 * @author ryu
 ************************************************/

/************************************************
 * 차트 전역 변수
 ************************************************/

var moChartConfig = {
	"chart": {
		"fontFamily": "Noto Sans KR, Malgun Gothic, 맑은 고딕, sans-serif",
		"height": 350,
	},
	"colors": ["#3f87fd", "#28D094", "#FF9149", "#FF4961", "#FFC107", "#00BCD4"],
	"stroke": {
		"curve": "straight"
	},
	"plotOptions": {
		"bar": {
			"columnWidth": "50%",
			"endingShape": "rounded"
		}
	},
	"grid": {
		"row": {
			"colors": ["#F5F5F5", "transparent"],
			"opacity": 0.5
		}
	},
	"xaxis": {
		"labels": {
			"datetimeFormatter": {
				"year": "yyyy",
				"month": "MM",
				"day": "dd",
				"hour": "HH:mm"
			}
		}
	}
}


/**
 * 차트 초기화
 */
function chartInit() {
	var vcGrpChartCn = app.lookup("grpChartCn");
	
	vcGrpChartCn.getAllRecursiveChildren(false).filter(function(each){
		return each instanceof cpr.controls.UIControlShell;
	}).forEach(function(each){
		/* 쉘 컨트롤 Init 이벤트 정의 */
		each.addEventListener("init", function(e){
			var control = e.control;
			
			if (e.content){
				e.preventDefault();
			}
		});
	});
}


function chartRedraw() {
	var vcGrpChartCn = app.lookup("grpChartCn");
	
	vcGrpChartCn.getAllRecursiveChildren(false).filter(function(each){
		return each instanceof cpr.controls.UIControlShell;
	}).forEach(function(each){
		each.redraw();
	});
}


/*
 * 루트 컨테이너에서 init 이벤트 발생 시 호출.
 * 앱이 최초 구성될 때 발생하는 이벤트 입니다.
 */
function onBodyInit(/* cpr.events.CEvent */ e){
	app.lookup("subOnLoad").send().then(function(input){
		chartRedraw();
	});
}


/*
 * 루트 컨테이너에서 load 이벤트 발생 시 호출.
 * 앱이 최초 구성된후 최초 랜더링 직후에 발생하는 이벤트 입니다.
 */
function onBodyLoad(/* cpr.events.CEvent */ e){
}


/*
 * 쉘에서 load 이벤트 발생 시 호출.
 */
function onShlLineLoad(/* cpr.events.CUIEvent */ e){
	/** 
	 * @type cpr.controls.UIControlShell
	 */
	var shlLine = e.control;
	
	var voChartCn = e.content;
	
	if (!voChartCn){
		return;
	}
	
	var vcDsLine = app.lookup("dsLine");
	
	var vaSeriesData = vcDsLine.getColumnData("sales");
	var vaCategories = vcDsLine.getColumnData("months");
	
	var options = {
		series: [{
			name: "Desktops",
			data: vaSeriesData
		}],
		chart: {
			fontFamily: moChartConfig.chart.fontFamily,
			height: moChartConfig.chart.height,
			type: 'line',
			zoom: {
				enabled: false
			}
		},
		colors: moChartConfig.colors,
		dataLabels: {
			enabled: false
		},
		stroke: {
			curve: moChartConfig.stroke.curve
		},
		title: {
			text: '',
			align: 'left'
		},
		grid: {
			row: {
				colors: moChartConfig.grid.row.colors,
				opacity: moChartConfig.grid.row.opacity
			},
		},
		xaxis: {
			categories: vaCategories,
		}
	};
	
	var chart = new ApexCharts(voChartCn, options);
	chart.render();
}


/*
 * 쉘에서 load 이벤트 발생 시 호출.
 */
function onShlAreaLoad(/* cpr.events.CUIEvent */ e){
	/** 
	 * @type cpr.controls.UIControlShell
	 */
	var shlArea = e.control;
	
	var voChartCn = e.content;
	
	if (!voChartCn){
		return;
	}
	
	var vcDsArea = app.lookup("dsArea");
	
	var vaSeriesData1 = vcDsArea.getColumnData("item1");
	var vaSeriesData2 = vcDsArea.getColumnData("item2");
	var vaCategories = vcDsArea.getColumnData("timeline");
	
	var options = {
		series: [{
			name: 'item1',
			data: vaSeriesData1
		}, {
			name: 'item2',
			data: vaSeriesData2
		}],
		chart: {
			type: 'area',
			fontFamily: moChartConfig.chart.fontFamily,
			height: moChartConfig.chart.height
		},
		colors: moChartConfig.colors,
		dataLabels: {
			enabled: false
		},
		stroke: {
			curve: 'smooth'
		},
		xaxis: {
			type: 'datetime',
			categories: vaCategories,
			labels : moChartConfig.xaxis.labels
		},
		tooltip: {
			x: {
				format: 'yyyy-MM-dd HH:mm'
			},
		},
	};
	
	var chart = new ApexCharts(voChartCn, options);
	chart.render();
}


/*
 * 쉘에서 load 이벤트 발생 시 호출.
 */
function onShlColumnLoad(/* cpr.events.CUIEvent */ e){
	/** 
	 * @type cpr.controls.UIControlShell
	 */
	var shlColumn = e.control;
	
	var voChartCn = e.content;
	
	if (!voChartCn){
		return;
	}
	
	var vcDsColumn = app.lookup("dsColumn");
	
	var vaSeriesData1 = vcDsColumn.getColumnData("netProfit");
	var vaSeriesData2 = vcDsColumn.getColumnData("revenue");
	var vaSeriesData3 = vcDsColumn.getColumnData("freeCashFlow");
	var vaCategories = vcDsColumn.getColumnData("months");
	
	var options = {
		series: [{
			name: 'Net Profit',
			data: vaSeriesData1
		}, {
			name: 'Revenue',
			data: vaSeriesData2
		}, {
			name: 'Free Cash Flow',
			data: vaSeriesData3
		}],
		chart: {
			type: 'bar',
			fontFamily: moChartConfig.chart.fontFamily,
			height: moChartConfig.chart.height
		},
		colors: moChartConfig.colors,
		plotOptions: {
			bar: {
				horizontal: false,
				columnWidth: moChartConfig.plotOptions.bar.columnWidth,
				endingShape: moChartConfig.plotOptions.bar.endingShape
			},
		},
		dataLabels: {
			enabled: false
		},
		stroke: {
			show: true,
			width: 2,
			colors: ['transparent']
		},
		xaxis: {
			categories: vaCategories,
		},
		yaxis: {
			title: {
				text: '$ (만 달러)'
			}
		},
		fill: {
			opacity: 1
		},
		tooltip: {
			y: {
				formatter: function(val) {
					return "$ " + val + " 만 달러"
				}
			}
		}
	};
	
	var chart = new ApexCharts(voChartCn, options);
	chart.render();
}


/*
 * 쉘에서 load 이벤트 발생 시 호출.
 */
function onShlBarHrztlLoad(/* cpr.events.CUIEvent */ e){
	/** 
	 * @type cpr.controls.UIControlShell
	 */
	var shlBarHrztl = e.control;
	
	var voChartCn = e.content;
	
	if (!voChartCn){
		return;
	}
	
	var vcDsStacked = app.lookup("dsStacked");
	
	var vaSeriesData1 = vcDsStacked.getColumnData("book1");
	var vaSeriesData2 = vcDsStacked.getColumnData("book2");
	var vaSeriesData3 = vcDsStacked.getColumnData("book3");
	var vaSeriesData4 = vcDsStacked.getColumnData("book4");
	var vaSeriesData5 = vcDsStacked.getColumnData("book5");
	var vaCategories = vcDsStacked.getColumnData("years");
	
	var options = {
		series: [{
			name: 'Marine Sprite',
			data: vaSeriesData1
		}, {
			name: 'Striking Calf',
			data: vaSeriesData2
		}, {
			name: 'Tank Picture',
			data: vaSeriesData3
		}, {
			name: 'Bucket Slope',
			data: vaSeriesData4
		}, {
			name: 'Reborn Kid',
			data: vaSeriesData5
		}],
		chart: {
			type: 'bar',
			height: moChartConfig.chart.height,
			fontFamily: moChartConfig.chart.fontFamily,
			stacked: true,
		},
		colors: moChartConfig.colors,
		plotOptions: {
			bar: {
				horizontal: true,
			},
		},
		stroke: {
			width: 1,
			colors: ['#fff']
		},
		title: {
			text: 'Fiction Books sales',
			style : {
				fontSize : '14px',
				fontWeight : 'normal'
			}
		},
		xaxis: {
			categories: vaCategories,
			labels: {
				formatter: function(val) {
					return val + "K"
				}
			}
		},
		yaxis: {
			title: {
				text: undefined
			},
		},
		tooltip: {
			y: {
				formatter: function(val) {
					return val + "천 권"
				}
			}
		},
		fill: {
			opacity: 1
		},
		legend: {
			position: 'top',
			horizontalAlign: 'left',
			offsetX: 40
		}
	};
	
	var chart = new ApexCharts(voChartCn, options);
	chart.render();
}


/*
 * 쉘에서 load 이벤트 발생 시 호출.
 */
function onShlMixedLoad(/* cpr.events.CUIEvent */ e){
	/** 
	 * @type cpr.controls.UIControlShell
	 */
	var shlMixed = e.control;
	
	var voChartCn = e.content;
	
	if (!voChartCn){
		return;
	}
	
	var vcDsMixed = app.lookup("dsMixed");
	
	var vaSeriesData1 = vcDsMixed.getColumnData("income");
	var vaSeriesData2 = vcDsMixed.getColumnData("cashflow");
	var vaSeriesData3 = vcDsMixed.getColumnData("revenue");
	var vaCategories = vcDsMixed.getColumnData("years");
	
	var options = {
		series: [{
			name: 'Income',
			type: 'column',
			data: vaSeriesData1
		}, {
			name: 'Cashflow',
			type: 'column',
			data: vaSeriesData2
		}, {
			name: 'Revenue',
			type: 'line',
			data: vaSeriesData3
		}],
		chart: {
			height: moChartConfig.chart.height,
			fontFamily: moChartConfig.chart.fontFamily,
			type: 'line',
			stacked: false
		},
		colors : moChartConfig.colors,
		dataLabels: {
			enabled: false
		},
		stroke: {
			width: [1, 1, 4]
		},
		title: {
			text: 'XYZ - Stock Analysis (2009 - 2016)',
			align: 'center',
			style : {
				fontSize : '14px',
				fontWeight : 'normal'
			}
		},
		xaxis: {
			categories: vaCategories,
		},
		yaxis: [{
				axisTicks: {
					show: true,
				},
				axisBorder: {
					show: true,
					color: '#3f87fd'
				},
				labels: {
					style: {
						colors: '#3f87fd',
					}
				},
				title: {
					text: "Income (thousand crores)",
					style: {
						color: '#3f87fd',
					}
				},
				tooltip: {
					enabled: true
				}
			},
			{
				seriesName: 'Income',
				opposite: true,
				axisTicks: {
					show: true,
				},
				axisBorder: {
					show: true,
					color: '#28D094'
				},
				labels: {
					style: {
						colors: '#28D094',
					}
				},
				title: {
					text: "Operating Cashflow (thousand crores)",
					style: {
						color: '#28D094',
					}
				},
			},
			{
				seriesName: 'Revenue',
				opposite: true,
				axisTicks: {
					show: true,
				},
				axisBorder: {
					show: true,
					color: '#FF9149'
				},
				labels: {
					style: {
						colors: '#FF9149',
					},
				},
				title: {
					text: "Revenue (thousand crores)",
					style: {
						color: '#FF9149',
					}
				}
			},
		],
		tooltip: {
			fixed: {
				enabled: true,
				position: 'topLeft', // topRight, topLeft, bottomRight, bottomLeft
				offsetY: 30,
				offsetX: 60
			},
		},
		legend: {
			horizontalAlign: 'left',
			offsetX: 40
		}
	};
	
	var chart = new ApexCharts(voChartCn, options);
	chart.render();
}


/*
 * 쉘에서 load 이벤트 발생 시 호출.
 */
function onShlTimelineLoad(/* cpr.events.CUIEvent */ e){
	/** 
	 * @type cpr.controls.UIControlShell
	 */
	var shlTimeline = e.control;
	
	var voChartCn = e.content;
	
	if (!voChartCn){
		return;
	}
	
	var vcDsTimeLine = app.lookup("dsTimeLine");
	
	var vaTimeLineDatas = [];
	for(var idx = 0; idx < vcDsTimeLine.getRowCount(); idx++){
		var vsTask = vcDsTimeLine.getValue(idx, "task");
		var vsStartDt = moment(vcDsTimeLine.getValue(idx, "start")).format("YYYY-MM-DD");
		var vsEndDt = moment(vcDsTimeLine.getValue(idx, "end")).format("YYYY-MM-DD");
		
		var voTimeLineData = {
			x: vsTask,
			y: [
				new Date(vsStartDt).getTime(),
				new Date(vsEndDt).getTime()
			],
			fillColor: moChartConfig.colors[idx]
		}
		
		vaTimeLineDatas.push(voTimeLineData);
	}
	
	var options = {
		series: [{
			data: vaTimeLineDatas
		}],
		chart: {
			height: moChartConfig.chart.height,
			fontFamily: moChartConfig.chart.fontFamily,
			type: 'rangeBar'
		},
		colors: moChartConfig.colors,
		plotOptions: {
			bar: {
				horizontal: true,
				distributed: true,
				dataLabels: {
					hideOverflowingLabels: false
				}
			}
		},
		dataLabels: {
			enabled: true,
			formatter: function(val, opts) {
				var label = opts.w.globals.labels[opts.dataPointIndex];
				var a = moment(val[0])
				var b = moment(val[1])
				var diff = b.diff(a, 'days')
				return label + ': ' + diff + (diff > 1 ? ' days' : ' day')
			},
			style: {
				colors: ['#f3f4f5', '#fff']
			}
		},
		xaxis: {
			type: 'datetime'
		},
		yaxis: {
			show: false
		},
		tooltip: {
			enabled: true,
			y: {
				title: {
					formatter: function(val, opts) {
						return null;
					}
				}
			}
		},
		grid: {
			row: {
				colors: moChartConfig.grid.row.colors,
				opacity: 1
			}
		}
	};
	
	var chart = new ApexCharts(voChartCn, options);
	chart.render();
}


/*
 * 쉘에서 load 이벤트 발생 시 호출.
 */
function onShlCandlestickLoad(/* cpr.events.CUIEvent */ e){
	/** 
	 * @type cpr.controls.UIControlShell
	 */
	var shlCandlestick = e.control;
	
	var voChartCn = e.content;
	
	if (!voChartCn){
		return;
	}
	
	var vcDsCandyStick = app.lookup("dsCandyStick");
	
	var vaCandyStickDatas = [];
	for(var idx = 0; idx < vcDsCandyStick.getRowCount(); idx++){
		var vsTime = vcDsCandyStick.getValue(idx, "time");
		var vnOpen = vcDsCandyStick.getValue(idx, "open");
		var vnHigh = vcDsCandyStick.getValue(idx, "high");
		var vnLow = vcDsCandyStick.getValue(idx, "low");
		var vnClose = vcDsCandyStick.getValue(idx, "close");
		
		var voMmtTime = moment(vsTime, "YYYYMMDDhhmm").toDate();
		
		var voCandyStickData = {
			x: moment(vsTime, "YYYYMMDDHHmm").format("YYYY-MM-DD HH:mm"),
			y: [vnOpen, vnHigh, vnLow, vnClose]
		}
		
		vaCandyStickDatas.push(voCandyStickData);
	}
	
	var options = {
		series: [{
			name: 'candle',
			data: vaCandyStickDatas
		}],
		chart: {
			height: moChartConfig.chart.height,
			fontFamily: moChartConfig.chart.fontFamily,
			type: 'candlestick',
		},
		annotations: {
			xaxis: [{
				x: moment("2019-10-06 20:00").format('MMM DD HH:mm'),
				borderColor: '#00E396',
				label: {
					borderColor: '#00E396',
					style: {
						fontSize: '12px',
						color: '#fff',
						background: '#00E396'
					},
					orientation: 'horizontal',
					offsetY: 7,
					text: 'Annotation Test'
				}
			}]
		},
		tooltip: {
			enabled: true,
		},
		xaxis: {
			type: 'category',
			labels: {
				formatter: function(val) {
					return moment(val).format('MMM DD HH:mm')
				}
			}
		},
		yaxis: {
			tooltip: {
				enabled: true
			}
		}
	};
	
	var chart = new ApexCharts(voChartCn, options);
	chart.render();
}


/*
 * 쉘에서 load 이벤트 발생 시 호출.
 */
function onShlBubbleLoad(/* cpr.events.CUIEvent */ e){
	/** 
	 * @type cpr.controls.UIControlShell
	 */
	var shlBubble = e.control;
	
	var voChartCn = e.content;
	
	if (!voChartCn){
		return;
	}
	
	/**
	 * 버블 차트 랜덤 데이터 생성
	 * @param {Number} pnCount
	 * @param {min:Number,max:Number} poConfig
	 * @return {Array}
	 */
	function generateData(pnCount, poConfig) {
		var vaBubbleDatas = [];
		for(var i = 0; i < pnCount; i++){
			var vnX = getRandomNumber(10, 745);
			var vnY = getRandomNumber(poConfig.min, poConfig.max);
			var vnZ = getRandomNumber(poConfig.min, poConfig.max);
			
			var voBubbleData = {
				x: vnX,
				y: vnY,
				z: vnZ
			}
			
			vaBubbleDatas.push(voBubbleData);
		}
		return vaBubbleDatas;
	}
	
	/**
	 * 랜덤 숫자를 얻습니다.
	 * @param {Number} min 최솟값
	 * @param {Number} max 최댓값
	 */
	function getRandomNumber(min, max) {
		return Math.floor(Math.random() * (max - min + 1) + min);
	}
	
	var options = {
	 	series: [{
	 			name: 'Bubble1',
	 			data: generateData(20, {
	 				min: 10,
	 				max: 60
	 			})
	 		},
	 		{
	 			name: 'Bubble2',
	 			data: generateData(20, {
	 				min: 10,
	 				max: 60
	 			})
	 		},
	 		{
	 			name: 'Bubble3',
	 			data: generateData(20, {
	 				min: 10,
	 				max: 60
	 			})
	 		},
	 		{
	 			name: 'Bubble4',
	 			data: generateData(20, {
	 				min: 10,
	 				max: 60
	 			})
	 		}
	 	],
	 	chart: {
	 		height: moChartConfig.chart.height,
	 		fontFamily: moChartConfig.chart.fontFamily,
	 		type: 'bubble',
	 	},
	 	colors: moChartConfig.colors,
	 	dataLabels: {
	 		enabled: false
	 	},
	 	fill: {
	 		opacity: 0.8
	 	},
	 	xaxis: {
	 		tickAmount: 12,
	 	},
	 	yaxis: {
	 		max: 70
	 	}
	 };
	
	var chart = new ApexCharts(voChartCn, options);
	chart.render();
}


/*
 * 쉘에서 load 이벤트 발생 시 호출.
 */
function onShlScatterLoad(/* cpr.events.CUIEvent */ e){
	/** 
	 * @type cpr.controls.UIControlShell
	 */
	var shlScatter = e.control;
	
	var voChartCn = e.content;
	
	if (!voChartCn){
		return;
	}
	
	/**
	 * 
	 * @param {Number} pnCount
	 * @param {min:Number,max:Number} poConfig
	 */
	function generateData(pnCount, poConfig) {
		var vaScatterDatas = [];
		for(var idx = 0; idx < pnCount; idx++){
			var vnX = getRandomNumber(poConfig.min, poConfig.max);
			var vnY = getRandomNumber(poConfig.min, poConfig.max);
			
			var vaScatterData = [vnX, vnY];
			vaScatterDatas.push(vaScatterData);
		}
		
		return vaScatterDatas;
	}
	
	/**
	 * 랜덤 숫자를 얻습니다.
	 * @param {Number} min 최솟값
	 * @param {Number} max 최댓값
	 */
	function getRandomNumber(min, max) {
		return Number((Math.random() * (max - min + 1) + min).toFixed(1));
	}
	
	var options = {
		series: [{
			name: "SAMPLE A",
			data: generateData(30, {
				min : 0,
				max : 30
			})
		}, {
			name: "SAMPLE B",
			data: generateData(30, {
				min : 0,
				max : 30
			})
		}, {
			name: "SAMPLE C",
			data: generateData(30, {
				min : 0,
				max : 30
			})
		}],
		chart: {
			height: moChartConfig.chart.height,
			fontFamily: moChartConfig.chart.fontFamily,
			type: 'scatter',
			zoom: {
				enabled: true,
				type: 'xy'
			}
		},
		colors: moChartConfig.colors,
		xaxis: {
			tickAmount: 10,
			labels: {
				formatter: function(val) {
					return parseFloat(val).toFixed(1)
				}
			}
		},
		yaxis: {
			tickAmount: 7
		}
	};
	
	var chart = new ApexCharts(voChartCn, options);
	chart.render();
}


/*
 * 쉘에서 load 이벤트 발생 시 호출.
 */
function onShlHeatmapLoad(/* cpr.events.CUIEvent */ e){
	/** 
	 * @type cpr.controls.UIControlShell
	 */
	var shlHeatmap = e.control;
	
	var voChartCn = e.content;
	
	if (!voChartCn){
		return;
	}
	
	
	/**
	 * 해시 맵 차트 랜덤 데이터 생성
	 * @param {Number} pnCount
	 * @param {min:Number,max:Number} poConfig
	 * @return {Array}
	 */
	function generateData(pnCount, poConfig) {
		var vaHashMapDatas = [];
		for(var i = 0; i < pnCount; i++){
			var vnX = getRandomNumber(poConfig.min, poConfig.max);
			var vnY = getRandomNumber(poConfig.min, poConfig.max);
			
			var voHashMapData = {
				x: vnX,
				y: vnY
			}
			
			vaHashMapDatas.push(voHashMapData);
		}
		return vaHashMapDatas;
	}
	
	/**
	 * 랜덤 숫자를 얻습니다.
	 * @param {Number} min 최솟값
	 * @param {Number} max 최댓값
	 */
	function getRandomNumber(min, max) {
		return Math.floor(Math.random() * (max - min + 1) + min);
	}
	
	var options = {
		series: [{
				name: 'Jan',
				data: generateData(20, {
					min: -30,
					max: 55
				})
			},
			{
				name: 'Feb',
				data: generateData(20, {
					min: -30,
					max: 55
				})
			},
			{
				name: 'Mar',
				data: generateData(20, {
					min: -30,
					max: 55
				})
			},
			{
				name: 'Apr',
				data: generateData(20, {
					min: -30,
					max: 55
				})
			},
			{
				name: 'May',
				data: generateData(20, {
					min: -30,
					max: 55
				})
			},
			{
				name: 'Jun',
				data: generateData(20, {
					min: -30,
					max: 55
				})
			},
			{
				name: 'Jul',
				data: generateData(20, {
					min: -30,
					max: 55
				})
			},
			{
				name: 'Aug',
				data: generateData(20, {
					min: -30,
					max: 55
				})
			},
			{
				name: 'Sep',
				data: generateData(20, {
					min: -30,
					max: 55
				})
			}
		],
		chart: {
			height: moChartConfig.chart.height,
			fontFamily: moChartConfig.chart.fontFamily,
			type: 'heatmap',
		},
		plotOptions: {
			heatmap: {
				shadeIntensity: 0.5,
				radius: 0,
				useFillColorAsStroke: true,
				colorScale: {
					ranges: [{
							from: -30,
							to: 5,
							name: 'low',
							color: moChartConfig.colors[0]
						},
						{
							from: 6,
							to: 20,
							name: 'medium',
							color: moChartConfig.colors[1]
						},
						{
							from: 21,
							to: 45,
							name: 'high',
							color: moChartConfig.colors[2]
						},
						{
							from: 46,
							to: 55,
							name: 'extreme',
							color: moChartConfig.colors[3]
						}
					]
				}
			}
		},
		legend: {
			show: true,
			position: 'top'
		},
		dataLabels: {
			enabled: false
		},
		stroke: {
			width: 1
		}
	};
	
	var chart = new ApexCharts(voChartCn, options);
	chart.render();
}


/*
 * 쉘에서 load 이벤트 발생 시 호출.
 */
function onShlDonutLoad(/* cpr.events.CUIEvent */ e){
	/** 
	 * @type cpr.controls.UIControlShell
	 */
	var shlDonut = e.control;
	
	var voChartCn = e.content;
	
	if (!voChartCn){
		return;
	}
	
	var vcDsDonut = app.lookup("dsDonut");
	
	var vaDonutDatas = [];
	for(var idx = 0; idx < vcDsDonut.getColumnCount(); idx++){
		var vsSeries = vcDsDonut.getValue(0, vcDsDonut.getColumnNames()[idx]);
		vaDonutDatas.push(vsSeries);
	}
	
	if (vaDonutDatas.indexOf(null) != -1){
		return;
	}
	
	var options = {
		series: vaDonutDatas,
		chart: {
			type: 'donut',
			height: moChartConfig.chart.height,
			fontFamily: moChartConfig.chart.fontFamily
		},
		colors: moChartConfig.colors,
		responsive: [{
			breakpoint: 480,
			options: {
				chart: {
					width: 200
				},
				legend: {
					show: false
				}
			}
		}]
	};
	
	var chart = new ApexCharts(voChartCn, options);
	chart.render();
}


/*
 * 쉘에서 load 이벤트 발생 시 호출.
 */
function onShlPieLoad(/* cpr.events.CUIEvent */ e){
	/** 
	 * @type cpr.controls.UIControlShell
	 */
	var shlPie = e.control;
	
	var voChartCn = e.content;
	
	if (!voChartCn){
		return;
	}
	
	var vcDsPie = app.lookup("dsPie");
	
	var vaPieDatas = [];
	for(var idx = 0; idx < vcDsPie.getColumnCount(); idx++){
		var vsSeries = vcDsPie.getValue(0, vcDsPie.getColumnNames()[idx]);
		vaPieDatas.push(vsSeries);
	}
	
	if (vaPieDatas.indexOf(null) != -1){
		return;
	}
	
	var options = {
		series: vaPieDatas,
		chart: {
			type: 'pie',
			height: moChartConfig.chart.height,
			fontFamily: moChartConfig.chart.fontFamily
		},
		colors: moChartConfig.colors,
		responsive: [{
			breakpoint: 480,
			options: {
				chart: {
					width: 200
				},
				legend: {
					show: false
				}
			}
		}]
	};
	
	var chart = new ApexCharts(voChartCn, options);
	chart.render();
}


/*
 * 쉘에서 load 이벤트 발생 시 호출.
 */
function onShlRadialLoad(/* cpr.events.CUIEvent */ e){
	/** 
	 * @type cpr.controls.UIControlShell
	 */
	var shlRadial = e.control;
	
	var voChartCn = e.content;
	
	if (!voChartCn){
		return;
	}
	
	var vcDsRadial = app.lookup("dsRadial");
	
	var vaRadialDatas = [];
	for(var idx = 0; idx < vcDsRadial.getColumnCount(); idx++){
		var vsSeries = vcDsRadial.getValue(0, vcDsRadial.getColumnNames()[idx]);
		vaRadialDatas.push(vsSeries);
	}
	
	if (vaRadialDatas.indexOf(null) != -1){
		return;
	}
	
	var options = {
		series: vaRadialDatas,
		chart: {
			height: moChartConfig.chart.height,
			fontFamily: moChartConfig.chart.fontFamily,
			type: 'radialBar',
		},
		colors: moChartConfig.colors,
		plotOptions: {
			radialBar: {
				dataLabels: {
					name: {
						fontSize: '22px',
					},
					value: {
						fontSize: '16px',
					},
					total: {
						show: true,
						label: 'Total',
						color: moChartConfig.colors[0],
						fontSize: '16px',
						formatter: function(w) {
							/** @type Array */
							var vaSeries = w.config.series;
							
							var vnTotal = vaSeries.reduce(function(a, b){
								return a + b;
							});
							return vnTotal
						}
					}
				}
			}
		},
		labels: vcDsRadial.getColumnNames(),
	};
	
	var chart = new ApexCharts(voChartCn, options);
	chart.render();
}


/*
 * 쉘에서 load 이벤트 발생 시 호출.
 */
function onShlRadarLoad(/* cpr.events.CUIEvent */ e){
	/** 
	 * @type cpr.controls.UIControlShell
	 */
	var shlRadar = e.control;
	
	var voChartCn = e.content;
	
	if (!voChartCn){
		return;
	}
	
	var vcDsRadar = app.lookup("dsRadar");
	
	var vaSeriesData1 = vcDsRadar.getColumnData("series1");
	var vaSeriesData2 = vcDsRadar.getColumnData("series2");
	var vaSeriesData3 = vcDsRadar.getColumnData("series3");
	var vaCategory = vcDsRadar.getColumnData("years");
	
	 var options = {
	 	series: [{
	 		name: 'Series 1',
	 		data: vaSeriesData1,
	 	}, {
	 		name: 'Series 2',
	 		data: vaSeriesData2,
	 	}, {
	 		name: 'Series 3',
	 		data: vaSeriesData3,
	 	}],
	 	chart: {
	 		height: moChartConfig.chart.height,
	 		fontFamily: moChartConfig.chart.fontFamily,
	 		type: 'radar',
	 		dropShadow: {
	 			enabled: true,
	 			blur: 1,
	 			left: 1,
	 			top: 1
	 		}
	 	},
	 	colors: moChartConfig.colors,
	 	stroke: {
	 		width: 2
	 	},
	 	fill: {
	 		opacity: 0.1
	 	},
	 	markers: {
	 		size: 0
	 	},
	 	xaxis: {
	 		categories: vaCategory
	 	}
	 };
	
	var chart = new ApexCharts(voChartCn, options);
	chart.render();
}
