/************************************************
 * Modal.js
 * Created at 2020. 4. 17. 오전 10:52:48.
 *
 * @author ryu
 ************************************************/



/*
 * "Modal Default" 버튼(btnDf)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtnDfClick(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btnDf = e.control;
	
	var voRootIns = app.getRootAppInstance();
	
	voRootIns.openDialog("app/imp/ExmModal", {
		height : 265,
		width : 550
	}, function(dialog) {
		dialog.addEventListener("close", function(e){
			//TODO 닫기 클릭 시 발생할 스크립트를 작성하십시오.
			var voRtrnVal = e.returnValue;
		});
	});
}


/*
 * "Modal Small" 버튼(btnS)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtnSmClick(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btnS = e.control;
	
	var voRootIns = app.getRootAppInstance();
	
	voRootIns.openDialog("app/imp/ExmModal", {
		height : 310,
		width : 360
	}, function(dialog) {
		dialog.addEventListener("close", function(e){
			//TODO 닫기 클릭 시 발생할 스크립트를 작성하십시오.
			var voRtrnVal = e.returnValue;
		});
	});
}


/*
 * "Modal Large" 버튼(btnL)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtnLgClick(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btnL = e.control;
	
	var voRootIns = app.getRootAppInstance();
	
	voRootIns.openDialog("app/imp/ExmModal", {
		height : 242,
		width : 720
	}, function(dialog) {
		dialog.addEventListener("close", function(e){
			//TODO 닫기 클릭 시 발생할 스크립트를 작성하십시오.
			var voRtrnVal = e.returnValue;
		});
	});
}


/*
 * "Modal Top" 버튼(btnT)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtnTClick(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btnT = e.control;
	
	var voRootIns = app.getRootAppInstance();
	
	voRootIns.openDialog("app/imp/ExmModal", {
		top: 20,
		height : 265,
		width : 550
	}, function(dialog) {
		dialog.addEventListener("close", function(e){
			//TODO 닫기 클릭 시 발생할 스크립트를 작성하십시오.
			var voRtrnVal = e.returnValue;
		});
	});
}


/*
 * "Modal Bottom" 버튼(btnB)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtnBClick(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btnB = e.control;
	
	var voRootIns = app.getRootAppInstance();
	
	voRootIns.openDialog("app/imp/ExmModal", {
		bottom : 20,
		height : 265,
		width : 550
	}, function(dialog) {
		dialog.addEventListener("close", function(e){
			//TODO 닫기 클릭 시 발생할 스크립트를 작성하십시오.
			var voRtrnVal = e.returnValue;
		});
	});
}


/*
 * "Modal Right" 버튼(btnR)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtnRClick(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btnR = e.control;
	
	var voRootIns = app.getRootAppInstance();
	
	voRootIns.openDialog("app/imp/ExmModal", {
		right : 20,
		height : 265,
		width : 550
	}, function(dialog) {
		dialog.addEventListener("close", function(e){
			//TODO 닫기 클릭 시 발생할 스크립트를 작성하십시오.
			var voRtrnVal = e.returnValue;
		});
	});
}


/*
 * "Modal Left" 버튼(btnL)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtnLClick(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btnL = e.control;
	
	var voRootIns = app.getRootAppInstance();
	
	voRootIns.openDialog("app/imp/ExmModal", {
		left : 20,
		height : 265,
		width : 550
	}, function(dialog) {
		dialog.addEventListener("close", function(e){
			//TODO 닫기 클릭 시 발생할 스크립트를 작성하십시오.
			var voRtrnVal = e.returnValue;
		});
	});
}


/*
 * "Modal Default" 버튼(btnMaxMin)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtnMaxMinClick(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btnMaxMin = e.control;
	
	var voRootIns = app.getRootAppInstance();
	
	voRootIns.openDialog("app/imp/ExmModal", {
		headerMax : true,
		headerMin : true,
		height : 265,
		width : 550
	}, function(dialog) {
		dialog.addEventListener("maximize", function(e) {
			//TODO 최대화 클릭 시 발생할 스크립트를 작성하십시오.
		});
		
		dialog.addEventListener("minimize", function(e) {
			//TODO 최소화 클릭 시 발생할 스크립트를 작성하십시오.
			// (주의) 최소화된 다이얼로그를 표시하는 기능은 제공하지 않으므로 구현이 필요합니다.
		});
	});
}


/*
 * "Modal Modaless" 버튼(btnMLs)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtnMLsClick(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btnMLs = e.control;
	
	var voRootIns = app.getRootAppInstance();
	
	voRootIns.openDialog("app/imp/ExmModal", {
		modal : false,
		height : 265,
		width : 550
	}, function(dialog) {
		dialog.addEventListener("close", function(e){
			//TODO 닫기 클릭 시 발생할 스크립트를 작성하십시오.
			var voRtrnVal = e.returnValue;
		});
	});
}
