/************************************************
 * ComboBox.js
 * Created at 2020. 12. 14. 오전 10:21:44.
 *
 * @author SUL
 ************************************************/
var util = createCommonUtil();


/*
 * 콤보 박스에서 selection-change 이벤트 발생 시 호출.
 * ComboBox Item을 선택하여 선택된 값이 저장된 후에 발생하는 이벤트.
 */
function onCbb1SelectionChange(/* cpr.events.CSelectionEvent */ e){
	util.SelectCtl.selectItem(app, "cbb2", 0);
}


/*
 * 그리드에서 update 이벤트 발생 시 호출.
 * Grid의 행 데이터가 수정되었을 때 이벤트.
 */
function onGrx1Update(/* cpr.events.CGridEvent */ e){
	/** 
	 * @type cpr.controls.Grid
	 */
	var grx1 = e.control;
	if(e.columnName == "column1"){
		grx1.setCellValue(e.rowIndex, "column2", "");
	}
}
