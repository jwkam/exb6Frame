/************************************************
 * DesignGuide.js
 * Created at 2019. 5. 9. 오후 4:17:23.
 *
 * @author ryu
 ************************************************/

cpr.core.NotificationCenter.INSTANCE.subscribe("toastr", this, function(msg) {
	var notifier = app.lookup("ntf1");
	if (msg.success == true) {
		notifier.success(msg.msg);
	} else if (msg.info == true) {
		notifier.info(msg.msg);
	} else if (msg.warning == true) {
		notifier.warning(msg.msg);
	} else if (msg.danger == true) {
		notifier.danger(msg.msg);
	} else {
		notifier.notify(msg.msg);
	}
});


/*
 * "추가" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn1Click(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btn1 = e.control;
	
	var grid = app.lookup("grd1");
	var rowIndex = grid.getSelectedRowIndex();
	
	if (rowIndex == -1){
		grid.insertRow(0, false);
	} else {
		grid.insertRow(rowIndex, true);
	}
}


/*
 * "삭제" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn2Click(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btn2 = e.control;
	
		var grid = app.lookup("grd1");
	var rowIndex = grid.getSelectedRowIndex();
	
	if (rowIndex != -1){
		grid.deleteRow(rowIndex);
	}
}


/*
 * "Default" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn5Click(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btn5 = e.control;
	
	cpr.core.NotificationCenter.INSTANCE.post("toastr", {
		msg : "Default! notify message"
	});
}


/*
 * "Info" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn6Click(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btn6 = e.control;
	
	cpr.core.NotificationCenter.INSTANCE.post("toastr", {
		msg : "Info! notify message",
		info : true
	});
}


/*
 * "Success" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn7Click(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btn7 = e.control;

	cpr.core.NotificationCenter.INSTANCE.post("toastr", {
		msg : "Success! notify message",
		success : true
	});	
}


/*
 * "Warning" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn3Click(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btn3 = e.control;
	
	cpr.core.NotificationCenter.INSTANCE.post("toastr", {
		msg : "Warning! notify message",
		warning : true
	});
}


/*
 * "Danger" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn4Click(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btn4 = e.control;
	
	cpr.core.NotificationCenter.INSTANCE.post("toastr", {
		msg : "Danger! notify message",
		danger : true
	});
}


/*
 * "Dialog" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn8Click(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btn8 = e.control;
	
	app.openDialog("theme/guide/cmn/Modal", {width : 350, height : 300, headerMax : true, headerMin : true}, function(dialog){
		dialog.ready(function(dialogApp){
			// 필요한 경우, 다이얼로그의 앱이 초기화 된 후, 앱 속성을 전달하십시오.
		});
	}).then(function(returnValue){
		;
	});
}


/*
 * "추가" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtnAddClick(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btnAdd = e.control;
	
	app.lookup("grd1").insertRowData(0, false, {
		"label" : "new Data",
		"value" : "value" + (app.lookup("grd1").rowCount + 1),
		"parent" : "",
		"level" : "1"		 
	});
}


/*
 * "삭제" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtnDeleteClick(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btnDelete = e.control;
	
	app.lookup("grd1").deleteRow(app.lookup("grd1").getCheckRowIndices());
}
