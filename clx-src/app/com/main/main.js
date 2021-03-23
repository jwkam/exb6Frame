/************************************************
 * 공통 모듈 선언
 ************************************************/
var util = createCommonUtil();

/************************************************
 * 전역 변수 선언
 ************************************************/
var _originalOrder = new cpr.utils.ObjectMap(); // 컨트롤 순서
var mMaxWindowCnt = 0;
var mAppDefaultLocale = "ko";
var mbCollapsed = false;
var msLeftMenuSize = "0px";
/************************************************
 * 사용자 정의 함수
 ************************************************/

cpr.core.NotificationCenter.INSTANCE.subscribe(util.Msg.MSG_TOPIC_ID, this, function(poMsgInfo) {
	
	var vcNotiToastr = app.lookup("notiToastr");
	
	if (poMsgInfo["TYPE"] == "SUCCESS") {
		vcNotiToastr.success(poMsgInfo["MSG"]);
	} else if (poMsgInfo["TYPE"] == "INFO") {
		vcNotiToastr.info(poMsgInfo["MSG"]);
	} else if (poMsgInfo["TYPE"] == "WARNING") {
		vcNotiToastr.warning(poMsgInfo["MSG"]);
	} else if (poMsgInfo["TYPE"] == "DANGER") {
		vcNotiToastr.danger(poMsgInfo["MSG"]);
	} else {
		if(!ValueUtil.isNull(poMsgInfo["DELAY"])){
			vcNotiToastr.infoDelay = poMsgInfo["DELAY"];
		}else{
			vcNotiToastr.infoDelay = 2000;
		}
		poMsgInfo["TYPE"] = "INFO";
		vcNotiToastr.info(poMsgInfo["MSG"]);
	}
	
	/* 알림방에 메세지 저장 */
	if (!poMsgInfo["REPLAY"]) {
		stackMsgInfo(poMsgInfo);
	}
	
});


/**
 * 
 * @param {{TYPE: "DEFAULT" | "INFO" | "SUCCESS" | "WARNING" | "DANGER", MSG:String}} poMsgInfo
 */
function stackMsgInfo(poMsgInfo) {
	var vcDsMsgStack = app.lookup("dsMsgStack");
	
	var voNewStack = vcDsMsgStack.insertRowData(0, false, {
		"status": poMsgInfo["TYPE"],
		"text": poMsgInfo["MSG"],
		"time": moment().format("YYYY-MM-DD hh:mm:ss")
	});
	
	createNotificationItem(voNewStack);
	
	util.Control.redraw(app, "btnAlrt");
}

/**
 * 
 * @param {cpr.data.DataRow} poRow
 */
function createNotificationItem(poRow) {
	var vcGrpNotiItemWrap = app.lookup("grpNotiItemWrap");
	
	var vcNotiItem = new udc.main.NotificationItem();
	
	vcNotiItem.status = poRow.getValue("status");
	vcNotiItem.text = poRow.getValue("text");
	vcNotiItem.time = poRow.getValue("time");
	
	/* 아이템 클릭 시 발생할 이벤트 정의 */
	vcNotiItem.addEventListener("click", function(e) {
		var vcClickedItem = e.control;
		
		/* 알림 재호출 (다시 저장하지 않으므로 공통 사용하지 않음) */
		cpr.core.NotificationCenter.INSTANCE.post("app-msg", {
			TYPE: vcClickedItem.status,
			MSG: vcClickedItem.text,
			REPLAY: true
		});
		
		removeNotificationItem(vcClickedItem);
	});
	
	/* 아이템 닫기 클릭 시 발생할 이벤트 정의 */
	vcNotiItem.addEventListener("close", function(e) {
		var vcClickedItem = e.control;
		
		removeNotificationItem(vcClickedItem);
	});
	
	vcGrpNotiItemWrap.insertChild(0, vcNotiItem, {
		autoSize: "height"
	});
}

/**
 * 메세지 아이템을 삭제합니다. 파라미터를 넘기지 않는 경우 모든 아이템을 삭제합니다.
 * @param {udc.com.main.NotificationItem} pcItem?
 */
function removeNotificationItem(pcItem) {
	var vcGrpNotiItemWrap = app.lookup("grpNotiItemWrap");
	
	if (ValueUtil.isNull(pcItem)) {
		vcGrpNotiItemWrap.removeAllChildren(true);
		return;
	}
	
	var vnItemIdx = vcGrpNotiItemWrap.getChildren().indexOf(pcItem);
	
	vcGrpNotiItemWrap.removeChild(pcItem, true);
	
	app.lookup("dsMsgStack").realDeleteRow(vnItemIdx);
}

//어플리케이션 설정정보 반환
exports.getAppConfig = function(){
	return app.lookup("dmGlobalConfig");
}

exports.doOpenMenuToMdi = doOpenMenuToMdi;

exports.setTheme = setTheme;

exports.getMenuKey = function(psMenuId){
	
	var dsAllMenu = app.lookup("dsAllMenu");
	if(!ValueUtil.isNull(psMenuId)){
		var voRow = dsAllMenu.findFirstRow("MENU_ID == '"+psMenuId+"'");
		
		if(voRow == null) {
			return "";	
		}else{
			return voRow.getValue("MENU_KEY");
		}
	}
}

/**
 * 디폴트 테마에 해당하는 css를 로드합니다. 그 외의 css는 disabled 합니다.
 * 스위칭할 테마를 선택할 때마다 해당 메서드를 실행합니다.
 * @param {String} psSrc Style 경로
 */
function setTheme(psSrc) {
	/** @type NodeList */
	var nodeList = document.getElementsByTagName("link");
	var vaNodeList = Array.prototype.slice.call(nodeList);
	vaNodeList.filter(function(/* HTMLDivElement */each){
		return each.rel == "stylesheet" && each.href.indexOf("theme") != -1;
	}).filter(function(/* HTMLDivElement */each){
		return each.href.indexOf("common-theme") == -1;
	}).forEach(function(/* HTMLDivElement */each){
		if (each.href.indexOf(psSrc) == -1){
			each.disabled = "disabled";
		} else {
			each.removeAttribute("disabled");
		}
	});
}


/**
 * 사용자 정보를 반환한다.
 * @param {String} psUserInfoType (Optional) 사용자 정보 변수(ex: USER_ID)
 * @return {String | cpr.data.DataMap} 사용자 정보
 */
exports.getUserInfo = function(psUserInfoType){
	var dmUserInfo = app.lookup("dmUserInfo");
	if(ValueUtil.isNull(psUserInfoType)){
		return dmUserInfo
	}
	return dmUserInfo.getValue(psUserInfoType);
}

function backup() {
	var vcGrpCont = app.getContainer();
	vcGrpCont.getChildren().forEach(function(each, index){
		_originalOrder.put(each.id, index);
	});
}

/**
 * 
 * @param {cpr.controls.UIControl} pcControl
 * @param {{top:String, right:String, bottom:String, left:String, width:String, height:String}} poConstraint
 * @param {Function} poCallbackFunc
 */
function floating(pcControl, poConstraint, poCallbackFunc) {
	var vcFloatingTarget = pcControl;
	
	var vcGrpCont = app.getContainer();
	
	var vcGrpOverlay = new cpr.controls.Container();
	vcGrpOverlay.setLayout(new cpr.controls.layouts.XYLayout());
	
	vcGrpOverlay.userAttr("floated-configuration", "true");
	
	vcGrpOverlay.addEventListenerOnce("click", function(e) {
		unfloating(vcFloatingTarget);
		
		if (_.isFunction(poCallbackFunc)) poCallbackFunc();
	});
	
	vcGrpCont.addChild(vcGrpOverlay, {
		top: "0px",
		right: "0px",
		bottom: "0px",
		left: "0px"
	});
	
	app.lookup(vcFloatingTarget.id).visible = true;
	
	vcGrpCont.floatControl(vcFloatingTarget, poConstraint);
	
	vcFloatingTarget.focus();
}


/**
 * 
 * @param {cpr.controls.UIControl} pcControl
 */
function unfloating(pcControl) {
	var vcGrpCont = app.getContainer();
	
	vcGrpCont.getChildren().filter(function(each){
		return each.userAttr("floated-configuration") == "true";
	}).forEach(function(each){
		vcGrpCont.removeChild(each, true);
	});

	var voActualRect = pcControl.getActualRect();
	vcGrpCont.insertChild(_originalOrder.get(pcControl.id), pcControl, {
		top : "0px",
		bottom : "0px",
		left : voActualRect.left + "px",
		width : voActualRect.width + "px"
	});
	
	if (pcControl.userAttr("prevent-hide") != "true"){
		util.Control.setVisible(app, false, pcControl.id);
	}
}


/**
 * 트리 메뉴를 숨기고 미니 메뉴를 표시합니다.
 */
function collapseSideMenu() {
	var vcGrpCont = app.getContainer();
	var vcGrpHeader = app.lookup("grpHeader");
	var vcGrpAside = app.lookup("grpAside");
	var vcMnuMnMenu = app.lookup("mnuMnMenu");
	var vcMdiCn = app.lookup("mdiCn");
	
	var vsStndSize = msLeftMenuSize;
	
	/* 상태에 따라 컨트롤 크기 및 위치 변경 */
	vcGrpCont.updateConstraint(vcGrpHeader, {
		left : vsStndSize
	});
	
	vcGrpCont.updateConstraint(vcGrpAside, {
		width : vsStndSize
	});
	
	vcGrpCont.updateConstraint(vcMdiCn, {
		left : vsStndSize
	});
	
	/* 상태에 따라 컨트롤 숨김 또는 표시 */
	if(msLeftMenuSize != "0px"){
		util.Control.setVisible(app, true, "mnuMnMenu");
	}
		
	util.Control.setVisible(app, false, ["lblLogo", "grpMenuWrap"]);
}


/**
 * 미니 메뉴를 숨기고 트리 메뉴를 표시합니다.
 */
function expandSideMenu() {
	var vcGrpCont = app.getContainer();
	var vcGrpHeader = app.lookup("grpHeader");
	var vcGrpAside = app.lookup("grpAside");
	var vcMnuMnMenu = app.lookup("mnuMnMenu");
	var vcMdiCn = app.lookup("mdiCn");
	
	var vsStndSize = "230px";
	
	/* 상태에 따라 컨트롤 크기 및 위치 변경 */
	vcGrpCont.updateConstraint(vcGrpHeader, {
		left : vsStndSize
	});
	
	vcGrpCont.updateConstraint(vcGrpAside, {
		width : vsStndSize
	});
	
	vcGrpCont.updateConstraint(vcMdiCn, {
		left : vsStndSize
	});
	
	/* 상태에 따라 컨트롤 숨김 또는 표시 */
	util.Control.setVisible(app, false, "mnuMnMenu");
	util.Control.setVisible(app, true, ["lblLogo", "grpMenuWrap"]);
}


/**
 * 
 * @param {cpr.controls.TreeItem} pcItem
 */
function toggleMenuItem(pcItem) {
	var vcTreMenu = app.lookup("treMenu");

	/* 클릭한 아이템이 최상위 아이템인 경우 모든 아이템 닫기 */
	if (ValueUtil.isNull(pcItem.parentItem)){
		if(!vcTreMenu.isExpanded(pcItem)){
			vcTreMenu.collapseAllItems();			
		}
	}else{
		var vsOrgIcon = pcItem.icon;
		if(vcTreMenu.getChildren(pcItem).length > 0){
			if(!vcTreMenu.isExpanded(pcItem)){
				pcItem.icon = "theme/common/images/menu/left_bullet1-1.on.gif";				
			}else{
				pcItem.icon = "theme/common/images/menu/left_bullet1-1.gif";	
			}
		}
	}
	
	vcTreMenu.toggle(pcItem);
}

/**
 * 해당 메뉴가 이미 오픈되어 있는지 여부를 반환한다.
 * @param psAppId
 */
function isExistTabItem(psAppId, psMenuKey){
	var mdiCn = app.lookup("mdiCn");
	var items = mdiCn.getTabItems();
	if(items != null && items.length > 0) {
		var alreadyOpened = items.some(function(item) {
			if(!item.content) return false;
			if(item.content.app) { // embeddedApp
				if(item.content.app.id == psAppId && item._menuKey == psMenuKey) {
					mdiCn.setSelectedTabItem(item);
					return true;
				}
			} else { // embeddedPage
				if(item.content.src == psAppId && item._menuKey == psMenuKey) {
					mdiCn.setSelectedTabItem(item);
					return true;
				}
			}
			return false;
		});
		return alreadyOpened;
	}else{
		return false;
	}
}

//트리 Item을 선택해준다.
function doFocusTreeItem(psValue){
	
	if(ValueUtil.isNull(psValue)) return;
	
	var dsAllMenu = app.lookup("dsAllMenu");
	if(dsAllMenu == null) return;
	
	var voFindMenu = dsAllMenu.findFirstRow("MENU_ID == '"+psValue+"'");
	
	if(voFindMenu == null) return;
	
	//트리를 일단 접어줌
	var vcTree = app.lookup("treMenu");
	vcTree.collapseAllItems();
	
	vcTree.getItems().filter(function(item){
		if(item.value == psValue ){
			var vsPValue = item.parentValue;
			var vaChildItem = vcTree.getChildren(item);
			var voParent = vcTree.getItemByValue(vsPValue);
			getParentMenuNode(vcTree, voParent);
			vcTree.focusItem(item);
			vcTree.selectItemByValue(item.value, false);
		}
		return false;
	});
}

function getParentMenuNode(pcTree, poTreeItem){
	if(!poTreeItem) return;
	
	if(poTreeItem.parentValue == "root"){
		pcTree.expandItem(poTreeItem);
	}else{
		pcTree.expandItem(poTreeItem);
		getParentMenuNode(pcTree, pcTree.getItemByValue(poTreeItem.parentValue));
	}
}

function doOpenMenu(appId, poRow){
	
	appId = appId.substring(0, appId.lastIndexOf(".clx"));
		
	//기존에 열려진 창이 있으면... 다시 띄우지 않음
	var isExistItem = isExistTabItem(appId, poRow.getValue("MENU_KEY"));
	if(isExistItem){
		return;
	} 
	
	var mdiCn = app.lookup("mdiCn");
	//오픈 창갯수 제한
	if(mdiCn.getTabItems().length > mMaxWindowCnt-1){
		//프로그램 탭은 @개를 초과할 수 없습니다. \n열려있는 프로그램을 닫은후 선택해 주세요.
		util.Msg.alert("INF-M012", [mMaxWindowCnt]);
		return;
	}
	
	mdiCn.addItemWithApp(appId, true, function(/* cpr.controls.TabItem */tabItem) {
			tabItem._menuKey = poRow.getValue("MENU_KEY");
			tabItem.userAttr("__menuInfo", JSON.stringify(poRow.getRowData()));
			tabItem.text = poRow.getValue("MENU_NM");
		/** @type cpr.controls.EmbeddedApp */
		var vcEmb = tabItem.content;
		//임베디드앱이 준비가 되면 처리할 작업 등록
		vcEmb.ready(function( /* cpr.events.CEvent */ e) {
			var voEmbApp = vcEmb.getEmbeddedAppInstance();
		});
	});
}


/**
 * 해당 메뉴를 MDI에 오픈한다.
 * @param psMenuId 메뉴ID
 * @param poParam 오픈될 메뉴에 전달할 파라미터 (JOSN 형태로 만들어야함.)
 */
function doOpenMenuToMdi(psMenuId, poParam){
	var dsAllMenu = app.lookup("dsAllMenu");
	var voRow = dsAllMenu.findFirstRow("MENU_ID == '"+psMenuId+"'");
	if(voRow != null){
		var appId = voRow.getValue("CALL_PAGE");
		doOpenMenu(appId, voRow);
	}else{
		util.Msg.alert("해당 메뉴에 대한 권한이 없습니다.");
	}
}

/**
 * 
 * @param {cpr.controls.TreeItem} pcItem
 */
function miniMenuItemClick(pcItem) {
	var vcMnuMiniMenu = app.lookup("mnuMnMenu");
		var vsMenuItemValue = null;
	if (!app.lookup("treMenu").hasChild(pcItem)){
		vsMenuItemValue = findParentMenuItem(pcItem).value;
	} else {
		vsMenuItemValue = pcItem.value;
	}
	
	app.lookup("mnuMnMenu").selectItemByValue(vsMenuItemValue);
}

/**
 * 
 * @param {cpr.controls.TreeItem} pcItem
 * @return {cpr.controls.TreeItem} vsParentItem
 */
function findParentMenuItem(pcItem) {
	var vcTreLeftMenu = app.lookup("treMenu");
	
	var vcParentItem = pcItem;
	do{
		var vcFindtreeItem = vcTreLeftMenu.findItem({value : vcParentItem.parentValue});
		if (vcFindtreeItem != null){
			vcParentItem = vcFindtreeItem;
		}
	}
	while(vcParentItem.value == "");
	
	return vcParentItem;
}

/**
 * 
 * @param {cpr.controls.Item} pcItem
 */
function openMenuItem(pcItem) {
	var treMenu = app.lookup("treMenu");
	var selectedMenu = pcItem.row;
	var appId = selectedMenu.getValue("CALL_PAGE");
	if(appId) {
		
		doOpenMenu(appId, selectedMenu);
		
		miniMenuItemClick(pcItem);
		//모바일일경우.
		if(app.lookup("btnMToggle").visible){
			unfloating(app.lookup("grpAside"));
		}else{
			util.Control.setValue(app, "cbxToggle", "false");
		}
	}
	else{
		var vsKey = selectedMenu.getValue("MENU_ID");
		var voItem = treMenu.getItemByValue(vsKey);
		if(voItem){
		}
			
	}
}


/**
 * 컨텐츠 영역 (MDIFolder)를 확대합니다.
 */
function zoomInContent() {
	util.Control.updateConstraint(app, "mdiCn", null, {
		top : "0px",
		left : "0px"
	});
	
	app.lookup("btnZoom").style.addClass("cl-selected");
	app.lookup("btnVrtZoom").style.addClass("cl-selected");
}


/**
 * 컨텐츠 영역 (MDIFolder)를 축소합니다.
 */
function zoomOutConent() {
	var voHeaderActualRect = app.lookup("grpHeader").getActualRect();
	
	util.Control.updateConstraint(app, "mdiCn", null, {
		top : voHeaderActualRect.height + "px",
		left : voHeaderActualRect.left + "px"
	});

	app.lookup("btnZoom").style.removeClass("cl-selected");
	app.lookup("btnVrtZoom").style.removeClass("cl-selected");
}


/************************************************
 * 컨트롤 이벤트 (앱)
 ************************************************/

/*
 * Body에서 load 이벤트 발생 시 호출.
 * 앱이 최초 구성된후 최초 랜더링 직후에 발생하는 이벤트 입니다.
 */
function onBodyLoad(/* cpr.events.CEvent */ e){
	
	backup();
	
	if(mbCollapsed){
		util.Control.setVisible(app, true, "mnuMnMenu");
	}else{
		util.Control.setVisible(app, false, "mnuMnMenu");
	}
	
	util.Submit.send(app, "subOnLoad_json", function(pbSuccess) {
		if (pbSuccess){
			
			var dsAllMenu = app.lookup("dsAllMenu");
			var dsLeftMenu = app.lookup("dsLeftMenu");
			var dsMiniMenu = app.lookup("dsMiniMenu");
			var vcNvbMgMenu = app.lookup("nvbMgMenu");
			
			//기존 메뉴 Clear
			dsMiniMenu.clear();
			vcNvbMgMenu.redraw();
		
			//사용자명
			util.Control.setValue(app, "lblUserNm", util.DataMap.getValue(app, "dmUserInfo", "USER_NM"));
			util.Control.setValue(app, "lblUserAuth", moment().format("YYYY-MM-DD hh:mm") );
			
			//미니메뉴 구성(최상의 메뉴만 구성)
			dsAllMenu.copyToDataSet(dsMiniMenu);
			app.lookup("mnuMnMenu").redraw();
			
			//좌측메뉴구성
			dsAllMenu.copyToDataSet(dsLeftMenu);
			app.lookup("treMenu").redraw();

			//Global 설정
			var dmConfig = app.lookup("dmGlobalConfig");
			mMaxWindowCnt = ValueUtil.fixNumber(dmConfig.getValue("mdiWindowMaxCount")); //MDI 최대 창갯수
			mAppDefaultLocale = dmConfig.getValue("defaultLocale"); //어플리케이션 로케일
			
			/* 메인 파츠 다시 그리기 요청 */
			util.Control.redraw(app, ["grpLogo", "mnuMnMenu", "grpAside", "grpHeader", "mdiCn"]);
			
			app.lookup("treMenu").expandAllItems();
			
		}
	});
	
}


function changeToMobile() {
	/* 상태에 따른 컨트롤 위치 및 크기 변경 */
	util.Control.updateConstraint(app, "grpHeader", null, {
		left : "0px"
	});
	
	util.Control.updateConstraint(app, "grpAside", null, {
		width : "-5px"
	});
	
	util.Control.updateConstraint(app, "mdiCn", null, {
		left : "-5px"
	});
	
	/* 알림 컨트롤 위치 및 크기 변경 */
	util.Control.updateConstraint(app, "notiToastr", null, {
		left: "10px",
		bottom: "20px",
		right : "10px",
		height : "60px"
	});
	
	/* 컨트롤 숨김 또는 표시 설정 */
	util.Control.setVisible(app, true, ["btnDropdown"]);
	util.Control.setVisible(app, false, ["cbxToggle", "nvbMgMenu", "btnSearch"]);
	
	/* 상태에 따른 레이아웃 변경 */
	app.lookup("mdiCn").addHeaderControl(app.lookup("grpCnHdR"), {position : "right", width : "35"});
	
	/* 컨트롤 다시 그리기 요청 */
	util.Control.redraw(app, ["grpHeader", "mdiCn", "notiToastr"]);
}


function changeToDefault() {
	
	if(app.lookup("grpAside").isFloated()){
		unfloating(app.lookup("grpAside"));
	}
	
	
	var vbExpanded = app.lookup("cbxToggle").checked;
	
	var vsToggleWidth = null;
	var vsStdrSize = null;
	
	if (vbExpanded){
		vsStdrSize = "230px";
		if(msLeftMenuSize == "0px"){
			util.Control.setVisible(app, false, "mnuMnMenu");
		}
	} else {
		//vsStdrSize = "60px";
		//vsStdrSize = "0px";
		vsStdrSize = msLeftMenuSize;
		//util.Control.setVisible(app, true, "mnuMnMenu");
		util.Control.setVisible(app, false, ["lblLogo", "grpMenuWrap"]);
	}
	
	/* 컨텐츠 확대 상태의 경우 상태 되돌리기 */
	if (app.lookup("btnZoom").style.hasClass("cl-selected")){
		app.lookup("btnZoom").click();
	}
	
	/* 상태에 따른 컨트롤 위치 및 크기 변경 */
	util.Control.updateConstraint(app, "grpHeader", null, {
		left : vsStdrSize
	});
	
	util.Control.updateConstraint(app, "grpAside", null, {
		top : "0px",
		bottom : "0px",
		width : vsStdrSize
	});
	
	util.Control.updateConstraint(app, "mdiCn", null, {
		left : vsStdrSize
	});
	
	
	/* 알림 컨트롤 위치 및 크기 변경 */
	util.Control.updateConstraint(app, "notiToastr", null, {
		bottom: "20px",
		right : "20px",
		left : "",
		height : "60px",
		width : "434px"
	});
	
	/* 컨트롤 숨김 또는 표시 설정 */
	util.Control.setVisible(app, false, ["btnDropdown", "grpCnHdRVrt"]);
	util.Control.setVisible(app, true, ["cbxToggle", "nvbMgMenu",  "btnSearch"]);
	
	app.lookup("mdiCn").addHeaderControl(app.lookup("grpCnHdR"), {position : "right", width : "150"});
	
	/* 컨트롤 다시 그리기 요청 */
	util.Control.redraw(app, ["grpHeader", "mdiCn", "notiToastr"]);	
	
}

/*
 * Body에서 screen-change 이벤트 발생 시 호출.
 * 스크린 크기 변경 시 호출되는 이벤트.
 */
function onBodyScreenChange(/* cpr.events.CScreenChangeEvent */ e){
	var vbMbScrn = e.screen.name != "default";
	
	if (vbMbScrn){
		changeToMobile();
	} else {
		changeToDefault();
	}
}


/************************************************
 * 컨트롤 이벤트 (헤더 영역)
 ************************************************/

/*
 * 버튼(btnMToggle)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtnMToggleClick(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btnMToggle = e.control;
	
	if(app.lookup("grpAside").isFloated()){
		unfloating(app.lookup("grpAside"));
		return false;
	}
	
	/* 모바일일 때 트리 메뉴를 표시 */
	util.Control.setVisible(app, true, "grpMenuWrap");
	
	/* 모바일일 때 트리 메뉴를 플로팅하여 보여줌 */
	floating(app.lookup("grpAside"), {
		top: "0px",
		left: "0px",
		bottom: "0px",
		width: "230px"
	}, function() {
		/* 플로팅 해제 후 토글 상태에 따라 일반 메뉴 또는 미니 메뉴 표시 */
		if (app.lookup("cbxToggle").checked){
			util.Control.setVisible(app, true, "grpMenuWrap");
		} else {
		}
	});
}


/*
 * 체크 박스에서 value-change 이벤트 발생 시 호출.
 * CheckBox의 value를 변경하여 변경된 값이 저장된 후에 발생하는 이벤트.
 */
function onCbxToggleValueChange(/* cpr.events.CValueChangeEvent */ e){
	/** 
	 * @type cpr.controls.CheckBox
	 */
	var cbxToggle = e.control;
	
	/* 트리 메뉴 <-> 미니 메뉴로 변경 */
	if (!cbxToggle.checked){ // change to mini-menu
		collapseSideMenu();
	} else { // change to menu
		expandSideMenu();
	}
}


/*
 * 버튼(btnSearch)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtnSearchClick(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btnSearch = e.control;
	
	var voActualRect = app.lookup("grpHeader").getActualRect();
	
	/* 모바일일 때 트리 메뉴를 플로팅하여 보여줌 */
	floating(app.lookup("schUnfd"), {
		top: voActualRect.top + "px",
		left: voActualRect.left + "px",
		right: "0px",
		height: voActualRect.height + "px"
	});
	
	util.Control.setValue(app, "cbxToggle", "true");
}


/*
 * 네비게이션 바에서 item-click 이벤트 발생 시 호출.
 * 아이템 클릭시 발생하는 이벤트.
 */
function onNvbMgMenuItemClick(/* cpr.events.CItemEvent */ e){
	/** 
	 * @type cpr.controls.NavigationBar
	 */
	var nvbMgMenu = e.control;
	
	var vcMenuItem = e.item;
	
	if (ValueUtil.isNull(vcMenuItem)){
		return;
	}
	
	openMenuItem(vcMenuItem);
}


/*
 * 콤보 박스에서 selection-change 이벤트 발생 시 호출.
 * ComboBox Item을 선택하여 선택된 값이 저장된 후에 발생하는 이벤트.
 */
function onCmbLangSelectionChange(/* cpr.events.CSelectionEvent */ e){
	/** 
	 * @type cpr.controls.ComboBox
	 */
	var cmbLang = e.control;
	
	/* 언어 코드에 따른 다국어 설정 */
	cpr.I18N.INSTANCE.currentLanguage = util.SelectCtl.getItemValue(app, "cmbLang");
	
	//TODO 다국어 바인딩 이외의 다국어 처리 로직을 작성하십시오.
}


/*
 * 버튼(btnCstmzMenu)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtnCstmzMenuClick(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btnCstmzMenu = e.control;
	
	if(confirm("로그아웃 하시겠습니까?")){
		util.Submit.send(app, "subLogout",  function(pbSuccess){
			if(pbSuccess){
				app.close();
				top.location.reload();
			}
			
		});
		
	}
}





/*
 * 버튼(btnSetting)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtnSettingClick(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btnSetting = e.control;
	
	floating(app.lookup("grpRghtbar"), {
		top : "0px",
		right : "0px",
		bottom : "0px",
		width: "280px"
	});
}

/************************************************
 * 컨트롤 이벤트 (레프트 영역)
 ************************************************/


/*
 * 그룹에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onGrpLogoWrapClick(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Container
	 */
	var grpLogoWrap = e.control;
	
	/* 이벤트 추가 전파 방지 */
	e.stopPropagation();
}


/*
 * 버튼(btnPfSetting)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtnPfSettingClick(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btnPfSetting = e.control;
	
	util.Msg.notify(app, "INF-M000", "준비 중인 서비스입니다.");
}


/*
 * 버튼(btnLogout)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtnLogoutClick(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btnLogout = e.control;
	
}


/*
 * 트리에서 item-click 이벤트 발생 시 호출.
 * 아이템 클릭시 발생하는 이벤트.
 */
function onTreMenuItemClick(/* cpr.events.CItemEvent */ e){
	/** 
	 * @type cpr.controls.Tree
	 */
	var treMenu = e.control;
	
	var vcMenuItem = e.item;
	
	if (ValueUtil.isNull(vcMenuItem)){
		return;
	}
	
	toggleMenuItem(vcMenuItem);
	
	openMenuItem(vcMenuItem);
	
	app.lookup("mnuMnMenu").selectItemByValue(vcMenuItem.value);
	
}


/*
 * 메뉴에서 item-click 이벤트 발생 시 호출.
 * 아이템 클릭시 발생하는 이벤트.
 */
function onMnuMnMenuItemClick(/* cpr.events.CItemEvent */ e){
	/** 
	 * @type cpr.controls.Menu
	 */
	var mnuMnMenu = e.control;
	
	var vcMenuItem = e.item;
	
	if (ValueUtil.isNull(vcMenuItem)){
		return;
	}
	
	openMenuItem(vcMenuItem);
	
	app.lookup("treMenu").selectItemByValue(vcMenuItem.value);
}

/************************************************
 * 컨트롤 이벤트 (컨텐츠 영역)
 ************************************************/


/*
 * 버튼(btnDfItem)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtnDfItemClick(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btnDfItem = e.control;
	
	/* 디폴트 탭 아이템 선택 스타일 설정 */
	var vbSelcted = btnDfItem.style.hasClass("cl-selected");
	if (vbSelcted == false){
		btnDfItem.style.addClass("cl-selected");
	}
	
	/* 디폴트 탭 아이템 선택 (숨겨진 탭 아이템 선택) */
	var vcMdiCn = app.lookup("mdiCn");
	vcMdiCn.setSelectedTabItem(vcMdiCn.getTabItems()[0], false);
}


/*
 * MDI 폴더에서 selection-change 이벤트 발생 시 호출.
 * Tab Item을 선택한 후에 발생하는 이벤트.
 */
function onMdiCnSelectionChange(/* cpr.events.CSelectionEvent */ e){
	/** 
	 * @type cpr.controls.MDIFolder
	 */
	var mdiCn = e.control;
	
	var treMenu = app.lookup("treMenu");
	/** @type cpr.controls.EmbeddedApp */
	var EmbeddedApp = e.newSelection.content;
	
	var btnDfItem = app.lookup("btnDfItem");
	btnDfItem.style.removeClass("cl-selected");
	
	//메뉴를 새로 연 경우는 제외
	if(!EmbeddedApp)	return ;
	
	cpr.core.NotificationCenter.INSTANCE.post("check-menu-auth", {
		vcEmb : EmbeddedApp
	});
	
}


/*
 * MDI 폴더에서 content-init 이벤트 발생 시 호출.
 * TabItem의 Content가 그려질 준비를 마쳤을 때 호출되는 이벤트로 컨트롤을 그리는 스크립트가 동작한 후 호출됨.
 */
function onMdiCnContentInit(/* cpr.events.CUIEvent */ e){
	/** 
	 * @type cpr.controls.MDIFolder
	 */
	var mdiCn = e.control;
	
}





/*
 * MDI 폴더에서 close 이벤트 발생 시 호출.
 * 탭 아이템을 닫을 때 발생하는 이벤트이며, 사용자가 취소할 수 있습니다.
 */
function onMdiCnClose(/* cpr.events.CUIEvent */ e){
	/** 
	 * @type cpr.controls.MDIFolder
	 */
	var mdiCn = e.control;
	
	if(e.content && e.content.content){
		
		var vcItemApp = e.content.content.getEmbeddedAppInstance();
		
		if(util.isAppModified(vcItemApp, "CRM")){
			e.preventDefault();
			return false;
		}
		e.content.content.removeAllUserAttr();
		e.content.content.removeAllEventListeners();
	}
	
		/* 첫 아이템을 제외한 나머지 탭 아이템이 닫혔을 때 첫 아이템 선택 */
	var vaLastTabItems = _.reject(mdiCn.getTabItems(), function(each) {
		return each == e.content;
	});
	
	if (vaLastTabItems.length > 1){
		return;
	}
	
	mdiCn.setSelectedTabItem(vaLastTabItems[0]);
	
}


/*
 * 버튼(btnDropdown)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtnDropdownClick(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btnDropdown = e.control;
	
	var vcGrpCnHdRVrt = app.lookup("grpCnHdRVrt");
	
	var voActualRect = btnDropdown.getActualRect();
	var voTargetConstraint = app.getContainer().getConstraint(vcGrpCnHdRVrt);
	
	floating(vcGrpCnHdRVrt, {
		top : voActualRect.bottomCenter.y + "px",
		right : "5px",
		height : voTargetConstraint.height,
		width: voTargetConstraint.width	
	});	
}



/*
 * 버튼(btnZoom)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtnZoomClick(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btnZoom = e.control;
	
	var vbZoomed = btnZoom.style.hasClass("cl-selected");
	if (vbZoomed){
		zoomOutConent();
	} else {
		zoomInContent();
	}
}


/*
 * 버튼(btnRefresh)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtnRefreshClick(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btnRefresh = e.control;
	
	/* 현재 선택되어 있는 화면을 새로고침 합니다. */
	var vcMdiCn = app.lookup("mdiCn");
	
	var vcSelectedTabItem = vcMdiCn.getSelectedTabItem();
	var vcItemCn = vcSelectedTabItem.content;
	
	if (vcItemCn instanceof cpr.controls.EmbeddedApp) {
		var vsAppId = vcItemCn.app.id;
		vcItemCn.app = null;
		cpr.core.App.load(vsAppId, function(loadedApp) {
			vcItemCn.app = loadedApp;
			vcItemCn.redraw();
		});
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
	
	var vcMdiCn = app.lookup("mdiCn");
	
	if(confirm("오픈된 전체 화면을 닫으시겠습니까?")) {
		app.lookup("mdiCn").closeOthers(vcMdiCn.getTabItems()[0]);
	}
}


/************************************************
 * 컨트롤 이벤트 (라이트 영역)
 ************************************************/
/*
 * 버튼(btnRbClose)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtnRbCloseClick(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btnRbClose = e.control;
	
	app.lookup("grpRghtbar").visible = false;
}


/************************************************
 * 컨트롤 이벤트 (플로팅 영역)
 ************************************************/


/*
 * 서치 인풋에서 search 이벤트 발생 시 호출.
 * Searchinput의 enter키 또는 검색버튼을 클릭하여 인풋의 값이 Search될때 발생하는 이벤트
 */
function onSchUnfdSearch(/* cpr.events.CUIEvent */ e){
	/** 
	 * @type cpr.controls.SearchInput
	 */
    var ipbMenuSearch = e.control;
	var vsValue = ipbMenuSearch.value;
	var vcTree = app.lookup("treMenu");
	vcTree.collapseAllItems();
	if(!vsValue) return;
	vcTree.getItems().filter(function(item){
		if(item.label.indexOf(vsValue) >-1){
			var vsPValue = item.parentValue;
			var vaChildItem = vcTree.getChildren(item);
			var voParent = vcTree.getItemByValue(vsPValue);
			getParentMenuNode(voParent);
			vcTree.focusItem(item);
		}
		return false;
	});
	
	function getParentMenuNode(poTreeItem){
		
		if(!poTreeItem) return;
		
		if(poTreeItem.parentValue == ""){
			vcTree.expandItem(poTreeItem);
		}else{
			vcTree.expandItem(poTreeItem);
			getParentMenuNode(vcTree.getItemByValue(poTreeItem.parentValue));
		}
	}
}


/*
 * "Clear All" 아웃풋(optNtClrAll)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onOptNtClrAllClick(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Output
	 */
	var optNtClrAll = e.control;
	
	util.Control.redraw(app, ["btnAlrt"]);
	
}


/*
 * "View All" 아웃풋(optNtVwAll)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onOptNtVwAllClick(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Output
	 */
	var optNtVwAll = e.control;
	
	//TODO 공지사항 또는 알림 관련 로직을 작성하십시오.
}


/*
 * 그룹에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onGrpCnHdRVrtClick(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Container
	 */
	var grpCnHdRVrt = e.control;
	
	unfloating(grpCnHdRVrt);	
}


/*
 * 버튼(btnVrtZoom)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtnVrtZoomClick(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btnVrtZoom = e.control;
	
	app.lookup("btnZoom").click();
}


/*
 * 버튼(btnVrtRefresh)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtnVrtRefreshClick(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btnVrtRefresh = e.control;
	
	app.lookup("btnRefresh").click();
}


/*
 * 버튼(btnVrtClose)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtnVrtCloseClick(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btnVrtClose = e.control;
	
	app.lookup("btnClose").click();
}


/*
 * MDI 폴더에서 tabheader-click 이벤트 발생 시 호출.
 * 탭 아이템의 헤더 영역을 클릭하였을 때 발생하는 이벤트입니다.
 */
function onMdiCnTabheaderClick(/* cpr.events.CItemEvent */ e){
	/** 
	 * @type cpr.controls.MDIFolder
	 */
	var mdiCn = e.control;
	
	if(e.button == 2){
		var item = e.item;
		
		/** 
		 * @type cpr.controls.MDIFolder
		 */
		var mainMdi = e.control;
		var vcSelectedTabItem = mainMdi.getSelectedTabItem();
		
		e.preventDefault();
	
		var vcMenuOrg = app.lookup("mdiTabmenu");
		var vcRootContainer = app.getRootAppInstance().getContainer();
	
		if (vcMenuOrg) {
			vcRootContainer.removeChild(vcMenuOrg);
		}
		var vcMenu = new cpr.controls.Menu("mdiTabmenu");
		vcMenu.addItem(new cpr.controls.TreeItem("탭닫기", "closeAll", "root"));
		vcMenu.addItem(new cpr.controls.TreeItem("다른탭닫기", "closeOthers", "root"));
	
		vcMenu.addEventListener("selection-change", function( /**@type cpr.events.CSelectionEvent */ e) {
			var vaNewSelection = e.newSelection;
			switch (vaNewSelection[0].value) {
				case "closeAll":
					mainMdi.closeAll();
					break;
				case "closeOthers":
					mainMdi.closeOthers(item);
					mainMdi.setSelectedTabItem(item);
					break;
			}
			vcMenu.hide();
			vcMenu.dispose();
		});
	
		vcMenu.addEventListener("blur", function( /**@type cpr.events.CFocusEvent*/ e) {
			vcMenu.hide();
			vcMenu.dispose();
		});
		var showConstraint = {
				"position" : "absolute",
				"top" : e.clientY + "px",
				"left" : (e.clientX + 50) + "px",
				"width" : "150px",
				"height" : "100px"
			};
		if(vcRootContainer.getLayout() instanceof cpr.controls.layouts.FormLayout){
			app.floatControl(vcMenu, showConstraint);
		}else{
			vcRootContainer.addChild(vcMenu, showConstraint);
		}	
		vcMenu.focus();
	}
}


/*
 * Body에서 init 이벤트 발생 시 호출.
 * 앱이 최초 구성될 때 발생하는 이벤트 입니다.
 */
function onBodyInit(/* cpr.events.CEvent */ e){
	// 최초 common style 적용 (dmSetting의 defaultVaue)
	setTheme(app.lookup("dmSetting").getValue("default_theme"));
}



/*
 * 버튼(btnAlrt)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtnAlrtClick(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btnAlrt = e.control;
	
	var vcGrpNotiBox = app.lookup("grpNotiBox");
	
	var voActualRect = btnAlrt.getActualRect();
	var voTargetConstraint = app.getContainer().getConstraint(vcGrpNotiBox);
	
	floating(vcGrpNotiBox, {
		top: "59px",
		left: voActualRect.centerRight.x - parseInt(voTargetConstraint.width) + "px",
		height: voTargetConstraint.height,
		width: voTargetConstraint.width
	});
}


/*
 * "Clear All" 아웃풋(optNtClrAll)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onOptNtClrAllClick2(/* cpr.events.CMouseEvent */ e){
		/** 
	 * @type cpr.controls.Output
	 */
	var optNtClrAll = e.control;
	
	/* 메세지 정보 모두 삭제 */
	app.lookup("dsMsgStack").clear();
	
	/* 메세지 아이템 삭제 */
	removeNotificationItem();
	
	util.Control.redraw(app, ["grpNotiBox", "btnAlrt"]);
}
