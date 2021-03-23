/************************************************
 * Project Name: 토마토시스템 eXbuilder6 샘플 프로젝트
 * File Name: DesignGuidd.js
 * Author: ryu
 * Created Date: 2020. 1. 13. 오후 1:29:53
 * 
 * Description:
 * [Sample] Enter Title Here
 * Enter Description Here
 * 
 * ------------------------------------------------------------------------------------
 * 변경이력
 * ------------------------------------------------------------------------------------
 * 2020. 1. 13. ryu 최초 프로그램 작성
 *
 * ------------------------------------------------------------------------------------
 ************************************************/

cpr.core.NotificationCenter.INSTANCE.subscribe("alert", app, function(msg) {
	var vcNotifier = app.lookup("nti1");
	
	if (msg.success == true) {
		vcNotifier.success(msg.msg);
	} else if (msg.info == true) {
		vcNotifier.info(msg.msg);
	} else if (msg.warning == true) {
		vcNotifier.warning(msg.msg);
	} else if (msg.danger == true) {
		vcNotifier.danger(msg.msg);
	} else {
		vcNotifier.notify(msg.msg);
	}
});


/*
 * "Button" 버튼(btnOpen)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtnOpenClick(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btnOpen = e.control;
	
	app.lookup("cmb1").open();
}


/*
 * "close" 버튼(btnClose2)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtnClose2Click(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btnClose2 = e.control;
	
	app.lookup("cmb1").close();
}


/*
 * "Default" 버튼(btnDefault)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtnDefaultClick(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btnDefault = e.control;
	
	cpr.core.NotificationCenter.INSTANCE.post("alert", {
		msg: "DEFAULT! This is a defualt alert"
	});
}


/*
 * "Info" 버튼(btnInfo)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtnInfoClick(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btnInfo = e.control;
	
	cpr.core.NotificationCenter.INSTANCE.post("alert", {
		info: true,
		msg: "INFO! This is an info alert"
	});
}


/*
 * "Success" 버튼(btnSuccess)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtnSuccessClick(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btnSuccess = e.control;
	
	cpr.core.NotificationCenter.INSTANCE.post("alert", {
		success: true,
		msg: "SUCCESS! This is a success alert"
	});
}


/*
 * "Warning" 버튼(btnWarning)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtnWarningClick(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btnWarning = e.control;
	
	cpr.core.NotificationCenter.INSTANCE.post("alert", {
		warning: true,
		msg: "WARNING! This is a warning alert"
	});
}


/*
 * "Danger" 버튼(btnDanger)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtnDangerClick(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btnDanger = e.control;
	
	cpr.core.NotificationCenter.INSTANCE.post("alert", {
		danger: true,
		msg: "DANGER! This is a danger alert"
	});
}


/*
 * "Dialog" 버튼(btnDialog)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtnDialogClick(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btnDialog = e.control;
	
	app.openDialog("app/login/Login", {width : 400, height : 500, headerMax : true, headerMin : true}, function(dialog){
		dialog.ready(function(dialogApp){
			// 필요한 경우, 다이얼로그의 앱이 초기화 된 후, 앱 속성을 전달하십시오.
		});
	});
}


/*
 * "Add Row" 버튼(btn7)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn7Click(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btn7 = e.control;
	
	var grid = app.lookup("grd1");
	
	grid.insertRow(0, true);
}


/*
 * "Delete Row" 버튼(btn9)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn9Click(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btn9 = e.control;
	
	var grid = app.lookup("grd1");

	var checkRowIndices = grid.getCheckRowIndices();
	
	grid.deleteRow(checkRowIndices);
}
