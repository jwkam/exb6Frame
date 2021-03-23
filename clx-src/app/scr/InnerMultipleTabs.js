/************************************************
 * InnerMultipleTabs.js
 * Created at 2020. 9. 10. 오후 1:30:35.
 *
 * @author ryu54
 ************************************************/

var util = createCommonUtil();


/*
 * 루트 컨테이너에서 load 이벤트 발생 시 호출.
 * 앱이 최초 구성된후 최초 랜더링 직후에 발생하는 이벤트 입니다.
 */
function onBodyLoad(/* cpr.events.CEvent */ e){
	app.lookup("btnSrch").click();
}


/*
 * "조회" 버튼(btnSrch)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtnSrchClick(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btnSrch = e.control;
	
	var tabFolder = app.lookup("tfCn");
	tabFolder.setSelectedTabItem(tabFolder.getTabItems()[0], true);
}


/*
 * 탭 폴더에서 selection-change 이벤트 발생 시 호출.
 * Tab Item을 선택한 후에 발생하는 이벤트.
 */
function onTfCnSelectionChange(/* cpr.events.CSelectionEvent */ e){
	/** 
	 * @type cpr.controls.TabFolder
	 */
	var tfCn = e.control;
	
	var vcSelectedTabItem = e.newSelection;
	var vnTabItemIdx = vcSelectedTabItem.itemIndex;
	var vnItemId  = vnTabItemIdx + 1;
	
	/** @type cpr.protocols.Submission */
	var vcSubList = app.lookup("sms" + vnItemId);
	vcSubList.action = "./data/scr/render/data" + vnItemId + ".json";
	
	/*
	 * vcSubList.addEventListenerOnce("before-submit", function(e){
	 * 	start = new Date().getTime();
	 * });
	 * vcSubList.addEventListenerOnce("receive", function(e){
	 * 	received = new Date().getTime();
	 * });
	 * 
	 * vcSubList.addEventListenerOnce("submit-success", function(e){
	 * 	cpr.core.DeferredUpdateManager.INSTANCE.asyncExec(function(){
	 * 		rendered = new Date().getTime();
	 * 	});
	 * });
	 */
	
	vcSubList.addEventListenerOnce("submit-done", function(e){
		if (e.control.isSuccess()){
			/** @type cpr.controls.Output */
			var vcLblGrdTtl = app.lookup("lblGrdTtl" + vnItemId);
			
			vcLblGrdTtl.value = "탭 아이템" + vnItemId + " 리스트";
			
			util.Control.redraw(app, ["grd" + vnItemId]);
		}
	});
	
	vcSubList.send();
}
