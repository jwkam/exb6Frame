/************************************************
 * comBtnSearch.js
 * Created at 2020. 2. 19. 오전 11:16:25.
 *
 * @author 
 ************************************************/

var util = createCommonUtil();

/**
 * UDC 컨트롤이 그리드의 뷰 모드에서 표시할 텍스트를 반환합니다.
 */
exports.getText = function(){
	// TODO: 그리드의 뷰 모드에서 표시할 텍스트를 반환하는 하는 코드를 작성해야 합니다.
	return "";
};

/*
 * Body에서 property-change 이벤트 발생 시 호출.
 * 앱의 속성이 변경될 때 발생하는 이벤트 입니다.
 */
function onBodyPropertyChange(/* cpr.events.CPropertyChangeEvent */ e){
	if(e.property == "visibleSearchButton"){
		if(e.newValue === false){
			util.Control.setVisible(app, false, "btnSearch");
		}
	}
}


/*
 * "조회" 버튼(btnSearch)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtnSearchClick(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var result = app.dispatchEvent(new cpr.events.CUIEvent("search"));
	return result;
}
