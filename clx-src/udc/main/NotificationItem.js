/************************************************
 * NotificationItem.js
 * Created at 2020. 4. 20. 오후 5:27:50.
 *
 * @author ryu
 ************************************************/

/************************************************
 * 사용자 정의 함수
 ************************************************/

/**
 * 
 * @param {"DEFAULT" | "INFO" | "SUCCESS" | "WARNING" | "DANGER"} psStatus
 */
function setNotificationStatus(psStatus) {
	var vcOptNotiSt = app.lookup("optNotiSt");
	
	/* 스타일 초기화 */
	vcOptNotiSt.style.setClasses("rounded-circle");
	
	var vsStateNm = "";
	if (psStatus == "DEFAULT"){
		vsStateNm = "bg-primary-dim";
	} else {
		vsStateNm = "bg-" + psStatus.toLowerCase();
	}
	
	vcOptNotiSt.style.addClass(vsStateNm);
}

/************************************************
 * 컨트롤 이벤트
 ************************************************/
/*
 * Body에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBodyClick(/* cpr.events.CMouseEvent */ e){
	/* 클릭 이벤트 전파 방지 */
	e.stopPropagation();
	
	var voClickE = new cpr.events.CMouseEvent("click");
	app.dispatchEvent(voClickE);
}


/*
 * Body에서 load 이벤트 발생 시 호출.
 * 앱이 최초 구성된후 최초 랜더링 직후에 발생하는 이벤트 입니다.
 */
function onBodyLoad(/* cpr.events.CEvent */ e){
	var vsNotiSt = app.getAppProperty("status");
	if (!ValueUtil.isNull(vsNotiSt)){
		setNotificationStatus(vsNotiSt);
	}
}


/*
 * Body에서 property-change 이벤트 발생 시 호출.
 * 앱의 속성이 변경될 때 발생하는 이벤트 입니다.
 */
function onBodyPropertyChange(/* cpr.events.CPropertyChangeEvent */ e){
	if (e.property == "status"){
		setNotificationStatus(e.newValue);
	}
}


/*
 * 버튼(btnClose)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtnCloseClick(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btnClose = e.control;
	
	/* 클릭 이벤트 전파 방지 */
	e.stopPropagation();
	
	var voCloseE = new cpr.events.CMouseEvent("close");
	app.dispatchEvent(voCloseE);
}
