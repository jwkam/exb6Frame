/************************************************
 * cmnPFind.js
 * Created at 2018. 8. 13. 오전 11:17:04.
 *
 * @author SUL
 ************************************************/
var util = createCommonUtil();

var mnFindIndex = -1;

/*
 * Body에서 load 이벤트 발생 시 호출.
 * 앱이 최초 구성된후 최초 랜더링 직후에 발생하는 이벤트 입니다.
 */
function onBodyLoad(/* cpr.events.CEvent */ e){
	//초기 파라메터 셋팅
	var initValue = app.getHostProperty("initValue");
	if(initValue.grid){
		/** @type cpr.controls.Grid */
		var vcGrid = initValue.grid;
		
		var detail = vcGrid.detail;
		
		var voDsColumn = app.lookup("dsColumn");
		var voColumn;
		var _app = vcGrid.getAppInstance();
		for(var i=0, len=detail.cellCount; i<len; i++){
			voColumn = detail.getColumn(i);
			if(voColumn == null || voColumn.columnName == null || voColumn.columnName == "") continue;
			if(voColumn.columnType == "rowindex" || voColumn.columnType == "checkbox") continue;
			
			voDsColumn.addRowData({"COLUMN_ID":voColumn.columnName, "COLUMN_NM":util.Grid.getHeaderColumnText(_app, vcGrid.id, voColumn.columnName), "COLUMN_INDEX":i});
		}
		
		if(voDsColumn.getRowCount() > 0){
			util.SelectCtl.selectItem(app, "cmb1", 0);
		}
	}
	
	app.lookup("ipb1").focus();
}

/*
 * 인풋 박스에서 keydown 이벤트 발생 시 호출.
 * 사용자가 키를 누를 때 발생하는 이벤트.
 */
function onIpb1Keydown(/* cpr.events.CKeyboardEvent */ e){
	/** 
	 * @type cpr.controls.InputBox
	 */
	var ipb1 = e.control;
	if(e.keyCode == cpr.events.KeyCode.ENTER){
		doFind();
	}
}

/**
 * 찾기 실행
 */
function doFind(){
	var initValue = app.getHostProperty("initValue");
	if(initValue.grid){
		var voCondition = app.lookup("dmParam");
		var vsFColumn = voCondition.getValue("strColumn");
		var vsFText = voCondition.getValue("strTxt");
		var vnFColIdx = -1;
		if(ValueUtil.isNull(vsFColumn)){
			alert("찾을 대상 컬럼을 선택하세요.");
			app.lookup("cmb1").focus();
			return;
		}
		if(ValueUtil.isNull(vsFText)){
			alert("검색어를 입력하세요.");
			app.lookup("ipb1").focus();
			return;
		}
		
		var dsColumn = app.lookup("dsColumn");
		var voCRow = dsColumn.findFirstRow("COLUMN_ID == '"+vsFColumn+"'");
		if(voCRow){
			vnFColIdx = voCRow.getValue("COLUMN_INDEX");
		}
		
		/** @type cpr.controls.Grid */
		var vcGrid = initValue.grid;
		var voGColumn = vcGrid.detail.getColumn(vnFColIdx);
		//콤보박스 컬럼에 대해서는 label값으로 찾도록 Value값 수정
		if(voGColumn.controlType == "combobox"){
			/** @type cpr.controls.ComboBox */
			var vcCombo = voGColumn.control;
			if(vcCombo.dataSet){
				var vsComExprCond;
				if(voCondition.getValue("strScope") == "01"){
					vsComExprCond = vcCombo.itemSetConfig.label+" == '"+vsFText+"'";
				}else{
					vsComExprCond = vcCombo.itemSetConfig.label+" *= '"+vsFText+"'";
				}
			}
			var voDRow = vcCombo.dataSet.findFirstRow(vsComExprCond);
			if(voDRow){
				vsFText = voDRow.getValue(vcCombo.itemSetConfig.value)
			}
		}
		
		var vsExprCond = "";
		if(voCondition.getValue("strScope") == "01"){
			vsExprCond = vsFColumn+" == '"+vsFText+"'";
		}else{
			vsExprCond = vsFColumn+" *= '"+vsFText+"'";
		}
		
		var vaGridRows = vcGrid.findAllRow(vsExprCond);
		if(vaGridRows.length > 0){
			//마지막 ROW까지 이동한 경우에서, 계속 찾기를 수행한 경우... 첫번째 ROW부터 다시 찾기 위해, 시작 index 수정
			if(mnFindIndex == vaGridRows[vaGridRows.length-1].getIndex()){
				mnFindIndex = -1;
			}
			
			//계속 찾기를 수행한 경우, 현재 찾은 인덱스 이후부터 찾도록 처리
			var idx;
			for(var i=0, len=vaGridRows.length; i<len; i++){
				idx = vaGridRows[i].getIndex();
				if(idx > mnFindIndex){
					vcGrid.selectRows(idx);
					vcGrid.focusCell(idx, vnFColIdx);
					mnFindIndex = idx;
					break;
				}
			}
		}
	}
}

/*
 * "찾기" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtnFindClick(/* cpr.events.CMouseEvent */ e){
	doFind();
}


/*
 * "화면닫기" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtnCloseClick(/* cpr.events.CMouseEvent */ e){
	app.close();
}


/*
 * 콤보 박스에서 selection-change 이벤트 발생 시 호출.
 * ComboBox Item을 선택하여 선택된 값이 저장된 후에 발생하는 이벤트.
 */
function onCmb1SelectionChange(/* cpr.events.CSelectionEvent */ e){
	mnFindIndex = -1;
}


/*
 * 인풋 박스에서 value-change 이벤트 발생 시 호출.
 * 변경된 value가 저장된 후에 발생하는 이벤트.
 */
function onIpb1ValueChange(/* cpr.events.CValueChangeEvent */ e){
	mnFindIndex = -1;
}
