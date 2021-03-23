/************************************************
 * gridFilterBtn.js
 * Created at 2020. 9. 24. 오후 5:02:28.
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



/*
 * "▼" 버튼(btn1)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn1Click(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btn1 = e.control;
	var voBtnRect = btn1.getActualRect();
	var vnLeft = voBtnRect.left;
	
	var grdFilter = new udc.scr.gridFilter();
	grdFilter.grid = app.getAppProperty("grid");
	grdFilter.userAttr("grid-filter", "true");
	
	var hostContainer = app.getHostAppInstance().getContainer();
	var vaFilterCtrls = hostContainer.getChildren().filter(function(each){
		return each.type == "udc.scr.gridFilterBtn";
	});
	
	vaFilterCtrls.forEach(function(each){
		var voConstraint = hostContainer.getConstraint(each);
		if(!voConstraint.left && voConstraint.right) {
			vnLeft -= (320 - voBtnRect.width);
		}
	});
	
	app.getRootAppInstance().getContainer().floatControl(grdFilter, {
		top : voBtnRect.bottom + "px",
		left : (vnLeft - 280 ) + "px",
		width : "330px",
		height : "490px"
	});
	
}


///*
// * "▼" 버튼(btn1)에서 blur 이벤트 발생 시 호출.
// * 컨트롤이 포커스를 잃은 후 발생하는 이벤트.
// */
//function onBtn1Blur(/* cpr.events.CFocusEvent */ e){
//	/** 
//	 * @type cpr.controls.Button
//	 */
//	var btn1 = e.control;
//	
//	var voRootAppIns = app.getRootAppInstance();
//	voRootAppIns.getFloatingControls().forEach(function(each){
//		if(each.userAttr("grid-filter") == "true") {
//			voRootAppIns.removeFloatingControl(each);
//		}
//	});
//}


/*
 * 루트 컨테이너에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBodyClick(/* cpr.events.CMouseEvent */ e){
	e.stopPropagation();
}
