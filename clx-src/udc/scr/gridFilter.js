/************************************************
 * gridFilter.js
 * Created at 2020. 9. 24. 오후 4:18:41.
 *
 * @author csj
 ************************************************/

var msUserAttrNm = "cellIndex";
var msRowClassNm = "row-bottom";
/*********************************************
 * 사용자 함수 
 *********************************************/
String.prototype.replaceAll = function(org,dest) {
	return this.split(org).join(dest);
}

function createDragSourceFeedback() {
	var feedback = new cpr.controls.Output();
	feedback.ellipsis = true;
	feedback.style.css({
		"opacity": "0.8",
		"width": "50px",
		"height": "25px",
		"border": "solid 1px red",
		"text-align": "center",
		"color": "black",
		"border-radius": "10px",
		"background": "white",
		"box-shadow": "0px 2px 10px #ddd",
		"cursor": "move"
	});
	return feedback;
}


/**
 * 파라미터의 컨트롤을 드래그 가능하도록 드래그 소스를 지정하는 함수.
 * @param {cpr.controls.UIControl} control
 */
function setDragSource(control) {
	var feedback = null;
	var actualRect = null;
	new cpr.controls.DragSource(control, {
		options: {
			dataType: "text",
			threadhold: 10
		},
		onDragStart: function(context) {//dragStart에서 사용중인 context.source.detail이라는 대상은 이후 릴리즈에서 depreacted될 대상으로,context.sourceTargetObject로 대체됩니다.
			
			if (context.sourceTargetObject != null && context.sourceTargetObject.relativeTargetName != "header") {
				context.cursor = "grabbing";
				feedback = createDragSourceFeedback();
				context.data = context.sourceTargetObject;
				feedback.value = JSON.stringify(control.getRow(context.sourceTargetObject.rowIndex).getRowData());

				var voDragStartLoca = context.dragStartLocation;
				actualRect = new cpr.geometry.Rectangle(voDragStartLoca.x, voDragStartLoca.y, control.getActualRect().width, 25);
				app.getRootAppInstance().floatControl(feedback, actualRect);
				context.source = null;
			} else {
				context.cancel();
			}
		},
		onDragMove: function(context) {
			context.cursor = "grabbing";
			var newRect = actualRect.getTranslated(context.dragDelta);
			app.getRootAppInstance().floatControl(feedback, newRect);
		},
		onDragEnd: function(context) {
			context.cursor = "";
			feedback.dispose();
			feedback = null;
		}
	});
}
var voPrevRowElement = null;

/**
 * 파라미터로 받은 컨트롤을 드랍가능한 타겟으로 지정하는 함수.
 * @param {cpr.controls.Grid} control2
 */
function setDropTarget(control2) {

	var dropTarget = new cpr.controls.DropTarget(control2, {
		isImportant: function(source) {
			return source.dataType == "text";
		},
		onDragEnter: function(context) {

		},
		onDragLeave: function(context) {
			
		},
		onDragMove: function(context) {
			var vaElementsOnMouse = elementsFromPoint(context.pointerLocation.x, context.pointerLocation.y);
			//현재 마우스 포인터가 위치하는 곳의 뒤에 있는 모든 요소를 가져오는 함수로, 그리드 행의 요소를 가져옵니다.
			var vaClGridRowEle = vaElementsOnMouse.filter(function( /*HTMLElement*/ each) {
				if (each.classList.contains("cl-grid-row")) {
					return each;
				}
				//마우스 뒤의 요소중 cl-grid-row클래스를 포함한 요소들만 필터링합니다.
			});
			var voGridRowElement = vaClGridRowEle[0];//가장 첫번째 요소에 대해서 하단 보더에 스타일을 주어서 드래그드랍을 통해 대강 어디에 행이 위치할지 정보를 표시할 수 있습니다.
			if (voGridRowElement && !voGridRowElement.classList.contains(msRowClassNm)) {
				if (voGridRowElement != voPrevRowElement && voPrevRowElement) {

					voPrevRowElement.classList.remove(msRowClassNm);
				}
				voPrevRowElement = voGridRowElement;
				voGridRowElement.classList.add(msRowClassNm);
				//그리드에 draggrid클래스가 적용되어있는 행에 row-bottom이 적용되어야만 하단에 빨간색 보더가 보여지게됩니다.
				//해당 클래스들에 대한 설정은 UDC내에 html 스니펫을통해 변경할 수 있습니다.
			}
		},
		onDrop: function(context) {
				var voDragRowData = context.source.control.getRow(context.data.rowIndex).getRowData();
				var vnDragIndex = context.data.rowIndex;
			if (context.target.detail != null) {//그리드 디테일 행 내에서 드랍 하였을 경우 
				var vnDropIndex = context.target.detail.rowIndex;
				if (vnDropIndex > vnDragIndex) {//드래그 한 행의 인덱스와, 드랍하는 행의 인덱스의 비교에 따라서 스크립트 순서가 변경됨.
					
					control2.insertRowData(vnDropIndex, true, voDragRowData).setAttr(msUserAttrNm, control2.getRow(vnDragIndex).getAttr(msUserAttrNm));
					control2.setCheckRowIndex(vnDropIndex+1, control2.getRow(vnDragIndex).checked);
					control2.deleteRow(vnDragIndex);
				} else if ((vnDragIndex+1) < control2.getRowCount()) { // 그리드 마지막행에서 마지막행으로 이동 할 경우 오류 수정 (2020.12.01 daye)
					var isChecked = control2.getRow(vnDragIndex).checked;
					var celIdx = control2.getRow(vnDragIndex).getAttr(msUserAttrNm);
					control2.deleteRow(vnDragIndex);
					control2.insertRowData(vnDropIndex, true, voDragRowData).setAttr(msUserAttrNm,celIdx);
					control2.setCheckRowIndex(vnDropIndex+1, isChecked);
				}
			} 
			else {
				var vnInsertIdx = Number(voPrevRowElement.getAttribute("aria-rowindex")) - 1;//그리드 헤더행이나, 디테일 행이 아닌 구획에 드랍했을 경우
				var isChecked = control2.getRow(vnDragIndex).checked;
				var celIdx = control2.getRow(vnDragIndex).getAttr(msUserAttrNm);
				control2.deleteRow(vnDragIndex);
				control2.insertRowData(vnInsertIdx, false, voDragRowData).setAttr(msUserAttrNm,celIdx);
				vnInsertIdx = vnInsertIdx ==0 ? 0 : control2.getRowCount()-1;
				control2.setCheckRowIndex(vnInsertIdx, isChecked);
			}
			voPrevRowElement.classList.remove(msRowClassNm);
		}
	});
}

/**
 * 마우스 포인터가 위치한 곳 밑에 있는 모든 요소를 가져오는 함수입니다.
 * @param {Number} x
 * @param {Number} y
 * @return {HTMLElement}
 */
function elementsFromPoint(x, y) {
	if (document["msElementsFromPoint"]) {
		var nodeList = document["msElementsFromPoint"](x, y);
		if (!nodeList) {
			return [];
		} else {
			return Array.prototype.slice.call(nodeList);
		}
	} else {
		return (document["elementsFromPoint"](x, y) || []);
	}
}



/*********************************************
 * 이벤트 핸들러 함수 
 *********************************************/
/*
 * 루트 컨테이너에서 load 이벤트 발생 시 호출.
 * 앱이 최초 구성된후 최초 랜더링 직후에 발생하는 이벤트 입니다.
 */
function onBodyLoad(/* cpr.events.CEvent */ e){

	var ds1 = app.lookup("ds1");
	
	/** @type cpr.controls.Grid */
	var grid = app.getAppProperty("grid");
	var vcGrid = app.lookup("grd1");
	var voColumnLayout = grid.getColumnLayout();

	var vaAutoFit = [];
	
	if(grid.autoFit  == "all") {
		var vnColCnt = grid.columnCount;
		for(var i = 0 ; i < vnColCnt; i++) {
			vaAutoFit.push(i);
		}
	}
	else if(grid.autoFit == 'none') {
		vaAutoFit = [];
	} else {
		vaAutoFit = grid.autoFit.replaceAll(" ","").split(",");
		vaAutoFit = vaAutoFit.map(function(each){
			return Number(each);
		});
	}
	//컬럼 실제 width값
	var columnWidth = voColumnLayout.columnLayout

	for(var i = 0; i < grid.header.cellCount; i++){
		
		var voHeader = voColumnLayout.header[i];
		
		ds1.addRowData({
			headerNm : grid.header.getColumn(voHeader.cellIndex).text,
			columnWidth : columnWidth[i].width,
			autoFitBool : vaAutoFit.indexOf(i) != -1 ? "O" : "X"
		}).setAttr(msUserAttrNm,voHeader.cellIndex);
		
		vcGrid.setCheckRowIndex(i, voHeader.visible);
	}
	
	setDragSource(vcGrid);
	setDropTarget(vcGrid);
}


/*
 * "취소" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onButtonClick(/* cpr.events.CMouseEvent */ e){
	app.dispatchEvent(new cpr.events.CUIEvent("cnclClick"));
	app.close();
}


/*
 * "확인" 버튼(btn1)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn1Click(/* cpr.events.CMouseEvent */ e){
	/** @type cpr.controls.Grid */
	var grid = app.getAppProperty("grid");
	
	var vnRowCount = app.lookup("ds1").getRowCount();
	var vcGrid = app.lookup("grd1");
	var voColumnLayout = grid.getColumnLayout();
	var vaTobeColumnArr = [];
	var vsAutoFit = grid.autoFit;
	
	for(var i = 0 ; i < vnRowCount; i++) {
		
		var voRow = vcGrid.getRow(i);
		vaTobeColumnArr.push(voRow.getAttr(msUserAttrNm));
		var isVisible = voRow.checked;
		var a = voColumnLayout.header.map(function(each){
			return each.cellIndex;
		});
		voColumnLayout.columnLayout[a.indexOf(voRow.getAttr(msUserAttrNm))].width = parseInt(voRow.getValue("columnWidth"));
		voColumnLayout.header[a.indexOf(voRow.getAttr(msUserAttrNm))].visible = isVisible;
	}
	grid.setColumnLayout(voColumnLayout);
	grid.redraw();
	
	//그리드의 변경되기 이전의 최초 autoFit속성이 사용된 컬럼인덱스를 colIndex로 찾이서 변수에 저장하기 위한 스크립트입니다.
	var vsOriginAutoFit = "";
	if(vsAutoFit != "none" && vsAutoFit != "all") {
		var vaHead1 = grid.getColumnLayout().header;
		var vsTempAutoFit=  vsAutoFit.replaceAll(" ","");
		var strList = vsTempAutoFit.split(",");
		strList.forEach(function(each){
			var vnIdx = Number(each);
			vaHead1.forEach(function(eachs){
				if(vnIdx == eachs.colIndex) {
					vsOriginAutoFit += eachs.cellIndex+",";
				}
			});
		});
		vsOriginAutoFit = vsOriginAutoFit.substring(0,vsOriginAutoFit.length-1);
	}
	
	for(var i = 0 ; i < vaTobeColumnArr.length; i++){
		var layouts= grid.getColumnLayout();
		var vaAsisColumnArr = layouts.header.map(function(each){
			return each.cellIndex;
		});
		var vnIndex = vaTobeColumnArr[i];
		if(vaAsisColumnArr[i] != vaTobeColumnArr[i]){
			
			grid.moveColumn(vaAsisColumnArr[vaAsisColumnArr.indexOf(vnIndex)], vaAsisColumnArr[i],true);
		}
				
	}

	var vsResultAutoFit = "";
	var vaHead = grid.getColumnLayout().header;
	if(vsAutoFit != "all" && vsAutoFit!= "none") {
		vsOriginAutoFit = vsOriginAutoFit.replaceAll(" ", "");
		var vaAuto = vsOriginAutoFit.split(",");
		
		vaAuto.forEach(function(each){
			
			var vnAuto = Number(each);
			vaHead.forEach(function(eachHead){
				if(vnAuto == eachHead.cellIndex) {
					vsResultAutoFit = vsResultAutoFit + eachHead.colIndex+", ";
				}
			});
		});
	}
	
	vsResultAutoFit = vsResultAutoFit.substring(0,vsResultAutoFit.length-2);
	grid.autoFit = vsResultAutoFit=="" ? vsAutoFit : vsResultAutoFit; // autoFit 빈값 수정 (2020.12.01 daye)
	
	grid.redraw();
	app.dispatchEvent(new cpr.events.CUIEvent("okClick"));
	app.close();
}


/*
 * 루트 컨테이너에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBodyClick(/* cpr.events.CMouseEvent */ e){
	e.stopPropagation();
}


/*
 * 넘버 에디터에서 mousedown 이벤트 발생 시 호출.
 * 사용자가 컨트롤 위에 포인터를 위치한 상태로 마우스 버튼을 누를 때 발생하는 이벤트.
 */
function onNbe1Mousedown(/* cpr.events.CMouseEvent */ e){
	
	// 너비 수정 시 드래그 방지 (2020.12.01 daye)
	e.stopPropagation();
}
