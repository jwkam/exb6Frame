



/**
 * 이벤트 발생 시 로그를 프린트합니다.
 * @param {String} psEventType
 */
function print(psEventType) {
	var vcTxaConsole = app.lookup("txaConsole");
	
	if (vcTxaConsole.value == null){
		vcTxaConsole.value = "";
	}
	
	var vsText = psEventType + "\n";
	vcTxaConsole.value += vsText;
	
	vcTxaConsole.scrollToBottom();
}

function redraw(){
	app.lookup("editor").redraw();
}






/*
 * "Button" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onButtonClick(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var button = e.control;
	
	var embeddedPage = app.lookup("editor");
		
	var html =  embeddedPage.callPageMethod("getValue");	
	print(html);
	
	
}


/*
 * "Button" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onButtonClick4(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var button = e.control;
	var embeddedPage = app.lookup("editor");
	embeddedPage.callPageMethod("resetEditor");	
}


/*
 * "Button" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onButtonClick2(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var button = e.control;
	var embeddedPage = app.lookup("editor");
	var len = embeddedPage.callPageMethod("getValue");	
	
	print(len.length);
	
	
}


/*
 * "setValue" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onButtonClick3(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var button = e.control;
	var embeddedPage = app.lookup("editor");
	embeddedPage.callPageMethod("setValue",app.lookup("ipb1").value);	
}
