/************************************************
 * Overview.js
 * Created at 2020. 5. 11. 오후 4:28:17.
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
  
  
 /************************************************
 * 컨트롤 이벤트
 ************************************************/



/*
 * 그룹에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onGrpCrdClick(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Container
	 */
	var grpCrd = e.control;
	
	/** @type cpr.controls.MDIFolder */
	var vcMdiCn = app.getRootAppInstance().lookup("mdiCn");
	
	if (vcMdiCn == null){
		return;
	}
	
	var vsAppId = grpCrd.userAttr("link-href");
	
	var voAlreadyOpenedItem = vcMdiCn.findItemWithAppID(vsAppId);
	if (voAlreadyOpenedItem != null){
		vcMdiCn.setSelectedTabItem(voAlreadyOpenedItem);
		return;
	}
	
	vcMdiCn.addItemWithApp(vsAppId, true, function(item) {
		/** @type cpr.controls.Output */
		var vcCrdTitle = grpCrd.getChildren()[0];
		item.text = vcCrdTitle.value;
		item.tooltip = vcCrdTitle.value;
		item.closable = true;
	});
}
