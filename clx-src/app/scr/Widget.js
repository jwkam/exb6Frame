/************************************************
 * Widget.js
 * Created at 2020. 10. 27. 오전 9:10:38.
 *
 * @author ryu
 ************************************************/

var util = createCommonUtil();

/**
 * 개인화 
 */
var portletIndvdl = portletIndividual();


/**
 * 폼레이아웃 생성
 */
function setFormLayout() {
	var vcGrpPortlet = app.lookup("grpPortlet");
		
	// getCookie
	var vaConstraint = portletIndvdl.getCookie("constraint");
	if(vaConstraint.length == 0) return;

	var vaChildren = vcGrpPortlet.getChildren();
	vcGrpPortlet.removeAllChildren();
	
	// portlet 을 위한 그룹 추가
	for(var idx = 0; idx < vaConstraint.length; idx++){
		var vcChild = vaChildren[idx] ? vaChildren[idx] : createBlankWidget();
		vcChild.visible = vaConstraint[idx].rowIndex < 4
		vcGrpPortlet.addChild(vcChild, vaConstraint[idx]);		
	}
}


/**
 * 폼레이아웃의 row, column 설정
 * @param {any} pnConfig
 */
function setFormConfig (pnConfig) {
	var vaArr = [];
	for(var idx = 0; idx < pnConfig; idx++){
		vaArr.push("1fr");
	}
	return vaArr;
}


/**
 * 포틀렛 설정을 저장합니다.
 */
function savePortlet() {
	var vaConstraint = [];
	var vnIndex = 0;
		
	/** @type cpr.controls.Container */
	var vcGrpPortlet = app.lookup("grpPortlet");
	var voGrpPortlet = vcGrpPortlet.getLayout();
	
	/* 저장 전 보이는 순서대로 컨트롤 정렬 */
	vcGrpPortlet.getChildren().forEach(function(each){
		var voEachContraint = vcGrpPortlet.getConstraint(each);
		
		var vsCtrlRowIdx = voEachContraint.rowIndex;
		var vsCtrlColIdx = voEachContraint.colIndex;
		var vsCtrlRowSpan = voEachContraint.rowSpan != null ? voEachContraint.rowSpan : 1;
		var vsCtrlColSpan = voEachContraint.colSpan != null ? voEachContraint.colSpan : 1;
		
		var vsCtrlConstraint = vsCtrlRowIdx + "," + vsCtrlColIdx + "," + vsCtrlRowSpan + "," + vsCtrlColSpan;
		
		if(each.type != "container" || (each.type == "container" && each.getChildren().length > 0)) {
			vaConstraint.splice(vnIndex, 1, vsCtrlConstraint);
		} else {
			vaConstraint.push(vsCtrlConstraint);	
		}
		vnIndex++;
	});
	
	// 쿠키에 개인화 저장
	portletIndvdl.setCookie("constraint",  vaConstraint, 7);
}


/**
 * 코드값과 일치하는 위젯 컨트롤 객체를 얻습니다.
 * @param {"cafeteria" | "approval" | "encyclopedia"} value
 * @param {Boolean} except
 * @return {cpr.controls.Container}
 */
function getWidget(value, except) {
	var vcGrpPortlet = app.lookup("grpPortlet");
	
	var vaFoundCtrl = vcGrpPortlet.getChildren().filter(function(each){
		return each.fieldLabel == value;
	});
	
	/* visible=false인 컨트롤은 제거 */
	if (!ValueUtil.isNull(except) && except === true){
		vaFoundCtrl = vaFoundCtrl.filter(function(each){
			return each.visible == true;
		});
	}
	
	if (vaFoundCtrl.length == 0){
		return null;
	}
	
	return vaFoundCtrl[0];
}


/**
 * 코드값과 일치하는 위젯 컨트롤 객체의 위치를 얻습니다.
 * @param {"cafeteria" | "approval" | "encyclopedia"} value
 * @return {cpr.controls.layouts.FormConstraint}
 */
function getOriginalConstraint(value) {
	var vcGrpPortlet = app.lookup("grpPortlet");
	var voGrpPortletLt = vcGrpPortlet.getLayout();
	
	var vcOriginalWidget = getWidget(value, false);
	
	if (ValueUtil.isNull(vcOriginalWidget)){
		return null;
	}
	
	return vcGrpPortlet.getConstraint(vcOriginalWidget);
}


/**
 * 배치 가능한 첫번째 컨스트레인트를 얻습니다.
 * @return {cpr.controls.layouts.FormConstraint}
 */
function getPlacementConstraint() {
	var vcGrpPortlet = app.lookup("grpPortlet");
	var voGrpPortletLt = vcGrpPortlet.getLayout();
	
	var vaPlacementWidgets = voGrpPortletLt.getChildrenByLayoutOrder().filter(function(each){
		return each.fieldLabel == "blank";
	});
	
	if (vaPlacementWidgets.length == 0){
		return null;
	}
	
	vaPlacementWidgets = vaPlacementWidgets.map(function(each){
		return vcGrpPortlet.getConstraint(each);
	});
	
	return vaPlacementWidgets[0];
}


/**
 * 배치 가능한 첫번째 컨스트레인트를 가진 컨트롤 객체를 제거합니다.
 */
function disposePlacementWidget(poConst) {
	var vcGrpPortlet = app.lookup("grpPortlet");
	var voGrpPortletLt = vcGrpPortlet.getLayout();
	
	var voPlacementConst = getPlacementConstraint();
	if (ValueUtil.isNull(voPlacementConst)){
		return;
	}
	
	var vaFindCtrls = voGrpPortletLt.findControls(voPlacementConst);
	if (vaFindCtrls.length == 0){
		return;
	}
	
	console.log(vaFindCtrls);
//	vcGrpPortlet.removeChild(vaFindCtrls[0], true);
	console.log(poConst);
	vcGrpPortlet.updateConstraint(vaFindCtrls[0], poConst);
//	vaFindCtrls[0].dispose();
}


/**
 * 빈 위젯을 동적으로 생성합니다.
 * @return {cpr.controls.Container}
 */
function createBlankWidget() {
	var vcGrpBlank = new cpr.controls.Container();
	vcGrpBlank.setLayout(new cpr.controls.layouts.XYLayout());
	
	vcGrpBlank.fieldLabel = "blank";
	vcGrpBlank.style.setClasses(["bg-gray-dim", "rounded"]);
	
	return vcGrpBlank;
}


/**
 * 즐겨찾기 등록한 메뉴를 등록합니다.
 * @param {label:String,appId:#app} poValue
 */
function createFavoriteMenu(poValue) {
	var vcGrpMnWrap = app.lookup("grpMnWrap");
	
	var vaMatchedMn = vcGrpMnWrap.getChildren().filter(function(each){
		return each.fieldLabel == poValue.appId;
	});
	
	if (vaMatchedMn.length > 0){
		return;
	}
	
	var vcLblMn = new cpr.controls.Output();
	vcLblMn.value = poValue.label;
	vcLblMn.fieldLabel = poValue.appId;
	vcLblMn.style.setClasses(["badge", "badge-pill", "badge-info", "cursor-pointer"]);
	
	vcLblMn.addEventListener("click", function(e){
		var control = e.control;
		
		var voRtAppIns = app.getRootAppInstance();
		if (voRtAppIns.hasAppMethod("openMenuItemWithAppId")){
			voRtAppIns.callAppMethod("openMenuItemWithAppId", control.fieldLabel);
		}
	});
	
	vcGrpMnWrap.addChild(vcLblMn, {
		height : "28px",
		autoSize : "width"
	});
}
exports.createFavoriteMenu = createFavoriteMenu;


/**
 * 최근 접속한 메뉴를 등록합니다.
 * 접속한 메뉴가 5건이 넘어가면 최근 목록이 지워집니다.
 * @param {label:String,appId:#app} poValue
 */
function addRecentMenu(poValue) {
	var vcGrdRcntMn = app.lookup("grdRcntMn");
	var vcDsRcntMn = vcGrdRcntMn.dataSet;
	
	var vsMnLabel = poValue.label;
	var vsMnAppId = poValue.appId;
	
	vcGrdRcntMn.insertRowData(0, false, {
		label : vsMnLabel,
		appId : vsMnAppId
	});
	
	vcGrdRcntMn.setRowState(0, cpr.data.tabledata.RowState.UNCHANGED);
	
	var vnRcntMnCnt = vcGrdRcntMn.getRowCount();
	if (vnRcntMnCnt > 5){
		vcDsRcntMn.realDeleteRow(vnRcntMnCnt - 1);
	}
}
exports.addRecentMenu = addRecentMenu;

/*
 * 루트 컨테이너에서 init 이벤트 발생 시 호출.
 * 앱이 최초 구성될 때 발생하는 이벤트 입니다.
 */
function onBodyInit(/* cpr.events.CEvent */ e){
	createDragManager(app); 
	setFormLayout();
}


/*
 * 루트 컨테이너에서 load 이벤트 발생 시 호출.
 * 앱이 최초 구성된후 최초 랜더링 직후에 발생하는 이벤트 입니다.
 */
function onBodyLoad(/* cpr.events.CEvent */ e){
}


/*
 * 루트 컨테이너에서 before-unload 이벤트 발생 시 호출.
 * 앱이 언로드되기 전에 발생하는 이벤트 입니다. 취소할 수 있습니다.
 */
function onBodyBeforeUnload(/* cpr.events.CEvent */ e){
	app.lookup("btnSave").click();
}


/*
 * "초기화" 버튼(btnReset)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtnResetClick(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btnReset = e.control;
	
	portletIndvdl.deleteCookie("constraint");
	alert("초기화 되었습니다.");
}


/*
 * "추가" 버튼(btnAdd)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtnAddClick(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btnAdd = e.control;
	
	var vcGrpPortlet = app.lookup("grpPortlet");
	var voGrpPortletLt = vcGrpPortlet.getLayout();
	
	var vaNewWidgets = vcGrpPortlet.getChildren().filter(function(each){
		return (ValueUtil.isNull(each.fieldLabel) == false && each.fieldLabel != "blank")
			&& each.visible == true;
	}).map(function(each){
		return each.fieldLabel;
	});
	
	var vsNewWidgets = vaNewWidgets.join(",");
	
	util.Dialog.open(app, "app/scr/user/WidgetPop", 500, 380, function(/* cpr.events.CUIEvent */ e){
		/** @type cpr.controls.Dialog */
		var dialog = e.control;
		
		/** @type Object[] */
		var vaRtrnVal = dialog.returnValue;
		
		if (!ValueUtil.isNull(vaRtrnVal) && vaRtrnVal.length > 0){
			/* 위젯 표시 상태에 따라 위치 변경 및 표시 또는 숨김 설정 */
			for(var idx = 0; idx < vaRtrnVal.length; idx++){
				/** @type {code:String, name:String, useYn:"Y" | ""} */
				var voRtrnVal = vaRtrnVal[idx];
				
				var vsCd = voRtrnVal.code;
				var vsUseYn = voRtrnVal.useYn;
				
				var vcWidget = getWidget(vsCd);

				var voNowConst = getOriginalConstraint(vsCd);

				if (vsUseYn == "Y"){ // 표시 및 위치 변경
						var voPlacementConst = getPlacementConstraint();
						
						if (voNowConst.rowIndex >= 4){
							disposePlacementWidget(voNowConst);
							vcGrpPortlet.updateConstraint(vcWidget, voPlacementConst);
						}
				} else { // 숨김 및 원래 자리로 위치 변경
				
					var voOriginalConst = {
						rowIndex : parseInt(vcWidget.userAttr("original-rowindex")),
						colIndex : parseInt(vcWidget.userAttr("original-colindex"))
					}
					
					vcGrpPortlet.updateConstraint(vcWidget, voOriginalConst);
					
					/* 위치가 다른 경우 떠난 자리에 새로운 빈 위젯 추가 */
					if (voNowConst.rowIndex != voOriginalConst.rowIndex
						|| voNowConst.colIndex != voNowConst.colIndex){
						var vcGrpBlank = createBlankWidget();
						vcGrpPortlet.addChild(vcGrpBlank, voNowConst);
					}
				}
				
				vcWidget.visible = (vsUseYn == "Y");
			}
			
			/* 보이는 순서대로 컨트롤 순서 재정렬 */
			//voGrpPortletLt.getChildrenByLayoutOrder().forEach(function(each, index){
			//	vcGrpPortlet.reorderChild(each, index);
			//});
			
			/* 드래그 앤 드롭 재설정 위하여 드래그 매니저 호출 */			
			createDragManager(app);
		}
	}, {
		"widget" : vsNewWidgets
	});
}


/*
 * "저장" 버튼(btnSave)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtnSaveClick(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btnSave = e.control;
	
	savePortlet();
	alert("저장되었습니다.");
}
