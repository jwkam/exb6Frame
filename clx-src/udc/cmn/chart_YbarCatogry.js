/************************************************
 * chart_line.js
 * Created at 2020. 7. 8. 오후 6:48:14.
 *
 * @author csj
 ************************************************/

/**
 * UDC 컨트롤이 그리드의 뷰 모드에서 표시할 텍스트를 반환합니다.
 */
exports.getText = function(){
	// TODO: 그리드의 뷰 모드에서 표시할 텍스트를 반환하는 하는 코드를 작성해야 합니다.
	return "";
};

var voChart = null;

/*
 * 쉘에서 init 이벤트 발생 시 호출.
 */
function onShl1Init(/* cpr.events.CUIEvent */ e){
	/** 
	 * @type cpr.controls.UIControlShell
	 */
	var shl1 = e.control;
	
	if(e.content) {
		e.preventDefault();
	}
	
	
    window.addEventListener("resize", function(e){    
	 	if(!app.disposed){
	 	  	app.lookup("shl1").getComponent("Ybar").resize();
	 	  }
    });
	
	
}


/*
 * 쉘에서 load 이벤트 발생 시 호출.
 */
function onShl1Load(/* cpr.events.CUIEvent */ e){
	/** 
	 * @type cpr.controls.UIControlShell
	 */
	var shl1 = e.control;
	
	var voContent = e.content;
	
	if(!voContent) {
		return;
	}
	
	shl1.registerComponent("voContent", voContent);

	drawChart();
	
}

exports.drawChart = drawChart;

/**
 * 라인차트를 차트를 그립니다.
 * @param {any} poContent
 */
function drawChart (poContent) {
	
	var poContent = app.lookup("shl1").getComponent("voContent");
	
	voChart = echarts.init(poContent);
	/** @type cpr.data.DataSet */
	var vcDataset = app.getAppProperty("dataSet");
	
	if(vcDataset){
		
		
		var voOption = {
			 tooltip: {
        trigger: 'axis',
        axisPointer: {            // 坐标轴指示器，坐标轴触发有效
            type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
        }
    },
    legend: {
        data: vcDataset.getColumnNames().filter(function(each){
	        	return each != "DAY"})
    },
    grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
    },
    xAxis: {
        type: 'value'
    },
    yAxis: {
        type: 'category',
        data: vcDataset.getColumnData("DAY")
    },
    series: [
        {
            name: "tomato",
            type: 'bar',
            stack: '합계',
            label: {
                show: true,
                position: 'insideRight'
            },
            data: vcDataset.getColumnData("TOMATO")
        },
        {
            name: 'watermelon',
            type: 'bar',
            stack: '합계',
            label: {
                show: true,
                position: 'insideRight'
            },
            data: vcDataset.getColumnData("WATERMELON")
        },
        {
            name: 'strawberry',
            type: 'bar',
            stack: '합계',
            label: {
                show: true,
                position: 'insideRight'
            },
            data: vcDataset.getColumnData("STRAWBERRY")
        },
        {
            name: 'orange',
            type: 'bar',
            stack: '합계',
            label: {
                show: true,
                position: 'insideRight'
            },
            data: vcDataset.getColumnData("ORANGE")
        }
    ]
			
			
		};
	
		voChart.setOption(voOption);
	}	
	
	
	
	app.lookup("shl1").registerComponent("Ybar", voChart);
}


/**
 * 
 * @param {cpr.data.DataSet} addData
 */
function PushData(vcDataset){

	voChart.setOption({
		 	series: [{
		 			name: "tomato",
		 			data: vcDataset.getColumnData("TOMATO")
		 		},
		 		{
		 			name: 'watermelon',
		 			data: vcDataset.getColumnData("WATERMELON")
		 		},
		 		{
		 			name: 'strawberry',
		 			data: vcDataset.getColumnData("STRAWBERRY")
		 		},
		 		{
		 			name: 'orange',
		 			data: vcDataset.getColumnData("ORANGE")
		 		}
		 	]
	  });
}

exports.PushData = PushData;


window.addEventListener("resize", function() {
	cpr.core.NotificationCenter.INSTANCE.post("chart-resize", {
		chart : voChart
	});
});
