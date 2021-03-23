/************************************************
 * Alert.js
 * Created at 2020. 5. 8. 오후 3:49:36.
 *
 * @author ryu
 ************************************************/
 
 /************************************************
 * 공통 모듈 선언
 ************************************************/
 
 /************************************************
 * 전역 변수 선언
 ************************************************/
 
 /************************************************
 * 사용자 정의 함수
 ************************************************/
 
  cpr.core.NotificationCenter.INSTANCE.subscribe("alert", this, function(msg) {
	/** @type cpr.controls.Notifier */
	var notifier = app.lookup(msg.id);
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
  
 /************************************************
 * 컨트롤 이벤트
 ************************************************/



/*
 * Body에서 load 이벤트 발생 시 호출.
 * 앱이 최초 구성된후 최초 랜더링 직후에 발생하는 이벤트 입니다.
 */
function onBodyLoad(/* cpr.events.CEvent */ e){
	cpr.core.NotificationCenter.INSTANCE.post("alert", {
		id : "notiDf",
		msg : "Order has been placed. Your will be redirect for make your payment."
	});
	
	cpr.core.NotificationCenter.INSTANCE.post("alert", {
		id : "notiIn",
		info : true,
		msg : "Order has been placed. Your will be redirect for make your payment."
	});
	
	cpr.core.NotificationCenter.INSTANCE.post("alert", {
		id : "notiSc",
		success : true,
		msg : "Order has been placed. Your will be redirect for make your payment."
	});
	
	cpr.core.NotificationCenter.INSTANCE.post("alert", {
		id : "notiWr",
		warning : true,
		msg : "Order has been placed. Your will be redirect for make your payment."
	});
	
	cpr.core.NotificationCenter.INSTANCE.post("alert", {
		id : "notiDn",
		danger : true,
		msg : "Order has been placed. Your will be redirect for make your payment."
	});
}
