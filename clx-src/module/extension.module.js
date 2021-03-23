/************************************************
 * Control Wrapping Utils
 * 각 사이트별 커스터마이징하여 사용 가능
 * version 2.0
 ************************************************/

// 의존 모듈 선언.
module.depends("module/common");

/**
 * Msg(메시지) 유틸
 * language.json 참조
 * @constructor
 * @param {common.module} appKit
 */
function MsgKit(appKit){
	this._appKit = appKit;
	this.MSG_TOPIC_ID = "app-msg";
};

/**
 * 메시지 ID에 해당되는 메시지를 반환한다.
 * @param {String} psMsgId  메시지 ID
 * @param {String | Array} paArgs 메시지 내용 중 @로 표시된 부분 넣어줄 데이터 배열
 * @return {String} 메시지 문자열
 */
MsgKit.prototype.getMsg = function(psMsgId, paArgs) {
    if (psMsgId == null || psMsgId == "") return "";
    var psMsg = cpr.I18N.INSTANCE.message("NLS-"+psMsgId);
    if (psMsg == null || psMsg.indexOf("NLS-") >= 0) { return psMsgId.replace(/\\n/gi, "\n"); }
    
    if(!ValueUtil.isNull(paArgs)){
    	if(!(paArgs instanceof Array)){
    		paArgs = [paArgs];
    	}
    	//정규 표현식 사용하여 동적 메시지 치환
    	var regExp = psMsg.match(/\{[0-9]+\}/ig);
		regExp.forEach(function(/* String */ exp){
			var idx = ValueUtil.fixNumber(exp.replace("{", "").replace("}", "").trim());
			psMsg = psMsg.replace(exp, new String(paArgs[idx]).replace(/\r\n/ig, ""));
		});
    }
    
    return psMsg.replace(/\\n/ig, "\n");
};

/**
 * 확인 선택용 Confirm 메시지 박스를 띄운다.
 * <pre><code>
 * Msg.confirm("CRM-M001");
 * </code></pre>
 * @param {String} psMsgId 메시지 ID
 * @return {Boolean} Confirm 창의 확인 결과
 * @alt 
 * 확인 선택용 Confirm 메시지 박스를 띄운다.
 * <pre><code>
 * Msg.confirm("CRM-M016", ["선택된 파일"]);
 * </code></pre>
 * @param {String} psMsgId 메시지 ID
 * @param {String | Array} paArgs? 메시지 내용 중 @로 표시된 부분 넣어줄 데이터 배열
 * @return {Boolean} Confirm 창의 확인 결과
 */
MsgKit.prototype.confirm = function(psMsgId, paArgs) {
	return confirm(this.getMsg(psMsgId, paArgs));
};



/**
 * 메시지를 어플리케이션 화면 헤더 영역에 메시지를 보여준다.
 * <pre><code>
 * Msg.notify(app, "CMN-M001");
 * </code></pre>
 * @param {cpr.core.AppInstance} app 앱인스턴스 객체
 * @param {String} psMsgId 메시지ID
 * @param {String | Array} paArgs? 메시지 내용 중 @로 표시된 부분 넣어줄 데이터 배열
 * @param {Boolean} pbKeep? 이전 메시지를 유지시킬지 여부
 * @param {"INFO" | "WARNING" | "DENGER"} psMsgType? 출력타입 (생략가능) default : INFO
 * @param {Number} pnDelay? notify 사용시 알림창이 표시되는 시간 설정 
 * @return void
 */
MsgKit.prototype.notify = function(app, psMsgId, paArgs, psMsgType, pnDelay) {
	
	var voMsgInfo = {};
	voMsgInfo.TYPE = psMsgType;
	voMsgInfo.MSG = this.getMsg(psMsgId, paArgs);
	if(pnDelay != null){
		voMsgInfo.DELAY = pnDelay;
	}
	cpr.core.NotificationCenter.INSTANCE.post(this.MSG_TOPIC_ID, voMsgInfo);
	
	/* 헤더에 메시지 표현.
	var _app = this._appKit.getMainApp(app);
	_app = _app != null ? _app : app;
	
	var vaChildCtrls = _app.getContainer().getChildren();
	var vaSubChildCtrls = null;
	var appHeader = null;
	for (var i=0, len=vaChildCtrls.length; i<len; i++) {
        if (vaChildCtrls[i] instanceof udc.com.appHeader ) {
        	appHeader = vaChildCtrls[i];
        	break;
        }else if(vaChildCtrls[i].type == "container" && vaChildCtrls[i].style.getClasses().indexOf("header-box") != -1){
        	vaSubChildCtrls = vaChildCtrls[i].getChildren();
        	for (var j=0, jlen=vaSubChildCtrls.length; j<jlen; j++) {
        		if (vaSubChildCtrls[j] instanceof udc.com.appHeader ) {
		        	appHeader = vaSubChildCtrls[j];
		        	break;
		        }
        	}
        	if(appHeader != null) break;
        }
    }
    //갱신된 데이터가 조회되었습니다. 메시지 유지 여부 설정
    if(!ValueUtil.isNull(_app.__keep_msg)){
    	psMsgId = _app.__keep_msg;
    	_app.__keep_msg = "";
    }else{
    	if(ValueUtil.fixBoolean(pbKeep)) app.__keep_msg = psMsgId;
		else _app.__keep_msg = "";
    }
    
    if(appHeader){
    	var embApp = appHeader.getEmbeddedAppInstance();
		var vcOptMsg = embApp.lookup("optAppMsg");
		var vcNotifier = embApp.lookup("notiInfo");
		var vsNotiMsg = this.getMsg(psMsgId, paArgs);
		if(vcNotifier.visible){
			vcNotifier.info(vsNotiMsg);
		}
		vcOptMsg.value = vsNotiMsg;
		vcOptMsg.style.animateFrom({
			"transform": "translateY(-30px) ",
			"opacity": "0"
		});
    }*/
};

/**
 * 메시지를 웹브라우저의 alert 메시지로 띄운다.
 * <pre><code>
 * Msg.alert("CMN-M001");
 * </code></pre>
 * @param {String} psMsgId 메시지ID
 * @return void
 * @alt  메시지를 웹브라우저의 alert 메시지로 띄운다.
 * <pre><code>
 * Msg.confirm("CRM-M016", ["선택된 파일"]);
 * </code></pre>
 * @param {String} psMsgId 메시지ID
 * @param {String | Array} paArgs? 메시지 내용 중 @로 표시된 부분 넣어줄 데이터 배열
 * @return void
 */
MsgKit.prototype.alert = function(psMsgId, paArgs) {
    alert(this.getMsg(psMsgId, paArgs));
};

/**
 * Dialog 유틸
 * @constructor
 * @param {common.AppKit} appKit
 */
function DialogKit(appKit){
	this._appKit = appKit;
};

/**
 * 모달(Modal) 팝업을 호출한다.
 * <pre><code>
 * Dialog.open(app, "app/cmn/CMN001", 700, 500, function(dialog){...});
 * </code></pre>
 * @param {cpr.core.AppInstance} app 앱인스턴스
 * @param {#app} appid 팝업 화면 주소.
 * @param {Number} width 팝업 창의 가로 사이즈.
 * @param {Number} height 팝업 창의 세로 사이즈.
 * @param {Function} handler 팝업이 닫힐 때 콜백함수(callback function).
 * @alt 모달(Modal) 팝업을 호출한다.
 * <pre><code>
 * Dialog.open(app, "app/cmn/CMN001", 700, 500, function(dialog){...}, {key1:"value1", key2:"value2"},{left : 400, top : 200});
 * </code></pre>
 * @param {cpr.core.AppInstance} app 앱인스턴스
 * @param {#app} appid 팝업 화면 주소.
 * @param {Number} width 팝업 창의 가로 사이즈.
 * @param {Number} height 팝업 창의 세로 사이즈.
 * @param {Function} handler 팝업이 닫힐 때 콜백함수(callback function).
 * @param {Object} initValue? 초기 파라메터 key/value쌍으로 팝업창에 넘길 파라메터 JSON 데이터[ 예시)-{key1:"value1", key2:"value2"}]
 * @param {object} prop? 팝업 설정 속성
 * 		left			{number}  다이얼로그의 x좌표 default : 가운데 위치
 * 		top				{number}  다이얼로그의 y좌표 default : 가운데 위치
 * 		headerVisible	{boolean} 다이얼로그 헤더를 보이기 여부 default : true
 * 		headerMovable	{boolean} 다이얼로그 헤더를 통해 이동 가능 여부 default : true
 * 		headerClose		{boolean} 다이얼로그 헤더 close 버튼 보이기 여부 default : true
 * 		resizable		{boolean} 다이얼로그 Rect 부분에 크기 조정 가능 여부 default : true
 */
DialogKit.prototype.open = function(app, appid, width, height, handler, initValue, prop) {
	if (initValue == null) {
		initValue = {};
	}
	//윈도우 최소 창크기보다 작은 경우... 윈도우 사이즈에 맞게 사이즈 조정
	var windowWidth = (window.innerWidth | document.body.clientWidth)-10;
	var windowHeight = (window.innerHeight | document.body.clientHeight)-45;
	if(windowWidth < width) width = windowWidth;
	if(windowHeight < height) height = windowHeight;

	var dialogProp = {
		width : Number(width) + 10,
		height : Number(height) + 45,
		headerVisible : (prop && prop.headerVisible != undefined) ? prop.headerVisible : true,
		headerMovable : (prop && prop.headerMovable != undefined) ? prop.headerMovable : true,
		headerClose : (prop && prop.headerClose != undefined) ? prop.headerClose : true,
		resizable : (prop && prop.resizable != undefined) ? prop.resizable : false
	};
	
	if(prop != null && prop.left) { dialogProp.left = prop.left; }
	if(prop != null && prop.top) { dialogProp.top = prop.top; }

	// App에서 Dialog
	app.getRootAppInstance().openDialog(appid, dialogProp, function(/* cpr.controls.Dialog */dialog) {
		dialog.app.isPopup = true;
		dialog.app.modal = true;
		dialog._originWidth = dialogProp["width"];
		dialog._originHeight = dialogProp["height"];
		
		initValue._dialogRef = dialog;
		
		if (dialog.app.title) { 
			dialog.headerTitle = dialog.app.title;
		}
		if (handler) {
			dialog.addEventListenerOnce("close", handler);
		}
		if (initValue) {
			dialog.initValue = initValue;
		}
	});
};

/**
 * 모달리스(Modaless) 팝업을 호출한다.
 * <pre><code>
 * Dialog.open(app, "app/cmn/CMN001", 700, 500, function(dialog){...});
 * </code></pre>
 * @param {cpr.core.AppInstance} app 앱인스턴스
 * @param {#app} appid 팝업 화면 주소.
 * @param {Number} width 팝업 창의 가로 사이즈.
 * @param {Number} height 팝업 창의 세로 사이즈.
 * @param {Function} handler 팝업이 닫힐 때 콜백함수(callback function).
 * @alt 모달리스(Modaless) 팝업을 호출한다.
 * <pre><code>
 * Dialog.open(app, "app/cmn/CMN001", 700, 500, function(dialog){...}, {key1:"value1", key2:"value2"},{left : 400, top : 200});
 * </code></pre>
 * @param {cpr.core.AppInstance} app 앱인스턴스
 * @param {#app} appid 팝업 화면 주소.
 * @param {Number} width 팝업 창의 가로 사이즈.
 * @param {Number} height 팝업 창의 세로 사이즈.
 * @param {Function} handler 팝업이 닫힐 때 콜백함수(callback function).
 * @param {Object} initValue? 초기 파라메터 key/value쌍으로 팝업창에 넘길 파라메터 JSON 데이터[ 예시)-{key1:"value1", key2:"value2"}]
 * @param {Object} prop? 팝업 설정 속성
 * 		left			{number}  다이얼로그의 x좌표 default : 가운데 위치
 * 		top				{number}  다이얼로그의 y좌표 default : 가운데 위치
 * 		headerVisible	{boolean} 다이얼로그 헤더를 보이기 여부 default : true
 * 		headerMovable	{boolean} 다이얼로그 헤더를 통해 이동 가능 여부 default : true
 * 		headerClose		{boolean} 다이얼로그 헤더 close 버튼 보이기 여부 default : true
 * 		resizable		{boolean} 다이얼로그 Rect 부분에 크기 조정 가능 여부 default : true
 */
DialogKit.prototype.openModaless = function(app, appid, width, height, handler, initValue, prop) {
	if (initValue == null) {
		initValue = {};
	}
	
	var dialogProp = {
		width : width,
		height : height,
		modal: false,
		headerVisible : (prop && prop.headerVisible) ? prop.headerVisible : true,
		headerMovable : (prop && prop.headerMovable) ? prop.headerMovable : true,
		headerMax : (prop && prop.headerMax) ? prop.headerMax : true,
		headerClose : (prop && prop.headerClose) ? prop.headerClose : true,
		resizable : (prop && prop.resizable) ? prop.resizable : true
	};
	
	if(prop != null && prop.left) { dialogProp.left = prop.left; }
	if(prop != null && prop.top) { dialogProp.top = prop.top; }

	app.getRootAppInstance().openDialdog(appid, dialogProp, function(/* cpr.controls.Dialog */dialog) {
		dialog.app.isPopup = true;
		dialog.app.modal = false;
		if (dialog.app.title) { 
			dialog.headerTitle = dialog.app.title;
		}
		if (handler) {
			dialog.addEventListenerOnce("close", handler);
		}
		if (initValue) {
			dialog.initValue = initValue;
		}
	});
};

/**
 * 현재 앱이 팝업인지 여부를 반환한다.
 * @param {cpr.core.AppInstance} app 앱인스턴스
 * @return {Boolean} 
 */
DialogKit.prototype.isPopup = function(app){
	return (!ValueUtil.isNull(app.getHost()) && app.app.isPopup === true) ? true : false;
};


/**
 * window open
 * var voMap = new cpr.utils.ObjectMap();
	voMap.put("CLX_PATH", "app/tst/tstPTaskRsltImg");
	voMap.put("imgData", "imgData");
	voMap.put("popUpCls", "rsltImg");
	voMap.put("testImagePath", util.DataMap.getValue(app, "dmParamImg", "testImagePath"));
	util.Dialog.windowOpen(app, "/TstTaskMng/index.do", "_popup", voMap);
 * @param {cpr.core.AppInstance} app 앱인스턴스
 * @param {String} psActionUrl 팝업 aution URL
 * @param {#app} psPopId 팝업 ID
 * @param {cpr.utils.ObjectMap} Parameter map
 * @param {Number} width?
 * @param {Number} height?
 * @param {Number} top?
 * @param {Number} left?
 * @param {Boolean} isModal?
 * @return {Boolean} 
 */
DialogKit.prototype.windowOpen = function(app, psActionUrl, psPopId, pmParameter, width, height, top, left, isModal){

   var vnWidth     = width == null ? window.screen.availWidth : width;
   var vnHeight     = height == null ? window.screen.availHeight : height;
   var vnTop       = top == null ? (window.screen.availHeight - height) / 2 : top;
   var vnLeft      = left == null ? (window.screen.availWidth - width) / 2 : left;
   var initValue   = {}
    if (vnTop < 0)  vnTop  = 0;
    if (vnLeft < 0) vnLeft = 0;
   var vbIsModal = isModal == null ? false : isModal;
   var vsProp = "menubar=0,resizable=yes,scrollbars=yes,status=0,top="+vnTop+",left="+vnLeft+",width="+vnWidth+",height="+vnHeight;
   var openWindow = window.open("about:blank", psPopId, vsProp);
   
   var voPostMethod = new cpr.protocols.HttpPostMethod(psActionUrl, psPopId);
   
   if(pmParameter != null){
	   	pmParameter.forEach(function(key, value){
	   		voPostMethod.addParameter(key, ValueUtil.fixNull(value));
		});	
   }
		
	voPostMethod.submit();
	voPostMethod.dispose();
   
   window._app = app;
   return openWindow;
};


/**
 * Group컨트롤 유틸
 * @constructor
 * @param {common.AppKit} appKit
 */
function GroupKit(appKit){
	this._appKit = appKit;
	this._SEARCH_BTN_ID = "btnSearch";
};

/**
 * 조회조건 및 작업영역 그룹 컨트롤 초기화<br>
 * 1. 메인의 dmGlobalConfig-useSearchBoxClear 설정에 따라 조회조건 변경시 작업영역 데이터 Clear (선택)<br>
 *   - 조회영역내 조회조건 컨트롤의 selection-change, value-change시 작업영역(paDisableCtl) disable 및 그리드, 프리폼 초기화<br>
 * 2. 조회조건 변경시 작업영역 데이터 변경시 알림(확인) 메시지 출력 <br>
 *  - appHeader에서 공통 적용됨<br>
 * 3. 조회버튼의 ID는 'btnSearch'' 또는 value를 '조회''로 지정해야함
 *  - 사이트별 Customizing 필요
 * @param {cpr.core.AppInstance} app 앱인스턴스
 * @param {#Container} psSearchBoxId  		 조회조건 영역 그룹컨트롤ID
 * @param {#Container | Array} paDisableCtl	 조회조건 변경시 비활성화 처리되는 영역의 그룹 컨트롤ID
 * @param {#uicontrol | Array} paExceptCtl? 적용 제외 컨트롤 ID
 * @return void
 */
GroupKit.prototype.initSearchBox = function(app, psSearchBoxId, paDisableCtl, paExceptCtl){
	//비활성화 영역 컨트롤
	paDisableCtl = paDisableCtl != null ? paDisableCtl : new Array();
	if(!(paDisableCtl instanceof Array)){
		paDisableCtl = [paDisableCtl];
	}
	//적용 제외 컨트롤 목록
	paExceptCtl = paExceptCtl != null ? paExceptCtl : new Array();
	if(!(paExceptCtl instanceof Array)){
		paExceptCtl = [paExceptCtl];
	}
	
	var _app = app;
	var _appKit = this._appKit;
	var vsSchBtnId = this._SEARCH_BTN_ID;
	
//	paDisableCtl.forEach(function(item){
//		var ctrl = _app.lookup(item);
//		if(ctrl) ctrl.style.addClass("data-box");
//	});
	
	function doAddSearchBoxEvent(ctrl){
		//조회버튼인 경우
		if ( ctrl.type == "button" && (ctrl.id && ctrl.id.match(vsSchBtnId) || ctrl.value == "조회")){
			
			paExceptCtl.push(ctrl.id);
			vsSchBtnId = ctrl.id;
			ctrl.addEventListener("click", function(/* cpr.events.CEvent */ e){
				if(e.defaultPrevented === false){
					doShadowView(_app, true);					
				}
			});
		}else{
			if(ctrl.type == "button" || ctrl.type == "output" || ctrl.type == "img" || ctrl.visible === false || ctrl.readOnly === true) return;
			
			//년도는 중앙정렬
			if(ctrl.type == "numbereditor"){
				if(ctrl.spinButton != false && ctrl.style.css("text-align") == ""){
					ctrl.style.css({"text-align":"center"});
				}
				if((ctrl.format === "0000" || ctrl.format === "9999") && ctrl.max == 0){
					ctrl.max = 1.7976931348623157E308;
				}
			}

			/**
			 * 변경사항이 있는 경우
			 * 계속진행을 하시겠습니까? 에서 취소 선택시 업무단 value-change 이벤트가 호출되지 않게 하기 위해
			 * before 이벤드를 추가함.
			 */			
			var bfEventType = (ctrl.type == "combobox" || ctrl.type == "radiobutton") ? "before-selection-change" : "before-value-change";
			ctrl.addEventListener(bfEventType, function(e){
				if(_appKit.isAppModified(_app, "CRM")){
					return false;
				}else{
					return true;
				}
				return true;
			});
			
			var vbUseSearchBoxClear = false;
			if(app.getRootAppInstance().hasAppMethod("getAppConfig")){
				var dmAppConfig = app.getRootAppInstance().callAppMethod("getAppConfig");
		    	vbUseSearchBoxClear = dmAppConfig.getValue("useSearchBoxClear") === "N" ? false : true;
			}
			
			
			//조회조건 변경시 작업 영역 초기화
			if(vbUseSearchBoxClear){
				var eventType = (ctrl.type == "combobox" || ctrl.type == "radiobutton") ? "selection-change" : "value-change";
				ctrl.addEventListener(eventType, function(e){
					
					//화면내의 모든 데이터 Clear
					var dataSets = _appKit.getAllAppModifiedDataSet(_app);
					if(dataSets != null && dataSets.length > 0){
						dataSets.forEach(function(ds){
							ds.clear();
						});
					}
					
					//헤더 내의 버튼 비활성화
					var header = _appKit.Group.getAllChildrenByType(_app, "udc.com.appHeader");
					if(header != null && header.length > 0){
						var vcCtrl = header[0].getEmbeddedAppInstance().lookup("grpButtons");
						if(vcCtrl) vcCtrl.enabled = false;
					}
					
					doShadowView(_app, false);
				});
			}
			
			//인풋박스 컨트롤 Keydown 이벤트 추가
			if( (ctrl.type == "inputbox" || ctrl.type == "numbereditor") && ctrl.userAttr("autoKeydownSearch") == "Y"){
				ctrl.addEventListener("keydown", function(/* cpr.events.CKeyboardEvent */ e){
					if(e.keyCode == cpr.events.KeyCode.ENTER){
						//Enter키 입력시, 조회 버튼 클릭 이벤트 발생
						_appKit.Control.dispatchEvent(app, vsSchBtnId, "click");
						//_appKit.Header.dispatchEvent(app, "btnSearch", "click");
						var comBtnSch = _appKit.Group.getAllChildrenByType(app, "udc.com.comBtnSearch");
						if(comBtnSch != null && comBtnSch.length > 0){
							var vcCtrl = comBtnSch[0].getEmbeddedAppInstance().lookup(vsSchBtnId);
							if(vcCtrl){
								vcCtrl.dispatchEvent(new cpr.events.CEvent("click"));
							}
						}
					}
				});
			}
		}
	}
	
	function doShadowView(app, pbEnable){
		if(paDisableCtl.length > 0){
//			setTimeout(function(){
				_appKit.Control.setEnable(app, pbEnable, paDisableCtl);
//			}, 50);
		}else{
			if(pbEnable === false){
				if(_app.lookup("grpSchShell") == null){
					var disableCtl = new cpr.controls.Container("grpSchShell");
					disableCtl.style.css({"background-color":"#ededed", "opacity":"0.2"});
					disableCtl.setLayout(new cpr.controls.layouts.XYLayout());
					/** @type cpr.controls.Container */
					var vcSearchBox = _app.lookup(psSearchBoxId);
					var heightPosix = vcSearchBox.getActualRect()["height"];
					_app.getContainer().addChild(disableCtl, {
								"top": (Number(heightPosix)+35)+"px",
								"right": "5px",
								"bottom": "5px",
								"left": "5px"
							});
				}
			}else{
				_app.getContainer().removeChild(_app.lookup("grpSchShell"), true);
			}
		}
	}
	
	var initFocus = false;
	function doFocusCtrl(poCtrl){
		if(poCtrl.type == "button" || poCtrl.type == "output" || poCtrl.type == "img") return;
		
		if(!initFocus){
			poCtrl.focus();
			initFocus = true;
		}
	}
	var vaSearchBoxIds = ValueUtil.split(psSearchBoxId, ",");
	for(var z=0, zlen=vaSearchBoxIds.length; z<zlen; z++){
		/** @type cpr.controls.Container */
		var vcSearchBox = app.lookup(vaSearchBoxIds[z]);
		if(vcSearchBox){
			var childCtrls = _appKit._getChildren(vcSearchBox);
			for (var i=0, len=childCtrls.length; i<len; i++) {
				//udc컨트롤일 경우.
				if(childCtrls[i] instanceof cpr.controls.UDCBase){
					var embApp = childCtrls[i].getEmbeddedAppInstance();
					embApp.getContainer().getChildren().some(function(ctrl){
						if(ctrl instanceof cpr.controls.Container){
							ctrl.getChildren().some(function(subCtrl){
								doAddSearchBoxEvent(subCtrl);
								doFocusCtrl(subCtrl);
							});
						}else{
							doAddSearchBoxEvent(ctrl);
							doFocusCtrl(ctrl);
						}
					});
				}else{
					//이벤트 추가
					doAddSearchBoxEvent(childCtrls[i]);
					//포커싱
					doFocusCtrl(childCtrls[i]);
				}
			}
			doShadowView(_app, false);
		}
	}
};

/**
 * 해당 그룹 컴포넌트 내의 DataColumn에 바인딩된 컨트롤 객체를 반환한다.<br>
 * 이는 프리폼 내의 DataColumn의 값을 갖는(바인딩) 컨트롤을 찾기 위해 사용된다.
 * @param {cpr.core.AppInstance} app 앱인스턴스
 * @param {#Container} psGrpId 그룹ID
 * @param {#column} psDataColumnNm datacolumn 명
 * @return {Object} 컨트롤 객체
 */
GroupKit.prototype.getDataBindedControl = function(app, psGrpId, psDataColumnNm){
	/** @type cpr.controls.Container */
	var _grpKit = this._appKit.Group;
	var vcFrf = app.lookup(psGrpId);
	var vaChild = vcFrf.getChildren();
	var vcBindCtrl = null;
	vaChild.some(function(ctrl, idx){
		if(vcBindCtrl) return true;
		
		if(ctrl.type == "container") vcBindCtrl = _grpKit.getDataBindedControl(app, ctrl.id, psDataColumnNm);
		if(ctrl.type == "output") return false;
		var bind = ctrl.getBindInfo("value");
		if(bind && bind.type == "datacolumn" && psDataColumnNm === bind.columnName){
			if(ctrl instanceof cpr.controls.UDCBase){
				vcBindCtrl = AppUtil.getUDCBindValueControl(ctrl);
			}else{
				vcBindCtrl = ctrl;
			}
			
			return true;
		}
	});
	
	return vcBindCtrl;
};

/**
 * 그룹 또는 컨테이너 내의 특정 타입에 해당하는 자식 컨트롤을 취득한다.<br>
 * (사용처) 해당 화면내의 특정 유형의 컨트롤 목록을 얻고자 하는 경우에 사용
 * @param {cpr.core.AppInstance} 	app 앱인스턴스
 * @param {String} psCtlType		 컨트롤 타입(ex: grid)
 * @param {cpr.controls.Container} poContainer 		자식 컨트롤을 취득하고자 하는 부모 컨테이너 객체  	
 * @param {Boolean} pbRecursive? 자식 컨테이너를 Recusive하게 찾을건지 여부
 * @return {Array} 자식 컨트롤 객체 배열
 */
GroupKit.prototype.getAllChildrenByType = function(app, psCtlType, poContainer, pbRecursive) {
	var vaTypesChild = new Array();
	
	var container = app.getContainer();
	function getChildRecursive(psCtlType, poContainer){
	    var vaChildCtrls = poContainer ? (pbRecursive === true ? poContainer.getAllRecursiveChildren() : poContainer.getChildren()) : (pbRecursive === true ? container.getAllRecursiveChildren() : container.getChildren());
	    for (var i=0, len=vaChildCtrls.length; i<len; i++) {
	        if (vaChildCtrls[i].type == psCtlType) {
	        	vaTypesChild.push(vaChildCtrls[i]);
	        }else if (vaChildCtrls[i] instanceof cpr.controls.Container ) {
	        	getChildRecursive(psCtlType, vaChildCtrls[i]);
	        }else if(vaChildCtrls[i] instanceof cpr.controls.UDCBase){
	        	var voUdcApp = vaChildCtrls[i].getEmbeddedAppInstance();
	        	if(voUdcApp) getChildRecursive(psCtlType, voUdcApp.getContainer());
	        }else if(vaChildCtrls[i] instanceof cpr.controls.EmbeddedApp){
	        	var voEmbApp = vaChildCtrls[i].getEmbeddedAppInstance();
	        	if(voEmbApp) getChildRecursive(psCtlType, voEmbApp.getContainer());
	        }
	    }
	    vaChildCtrls = null;
	}
	
	getChildRecursive(psCtlType, poContainer);
	
	return vaTypesChild;
};

/**
 * 그룹 또는 컨테이너 내의 특정 ID를 갖는 자식 컨트롤을 취득한다.
 * @param {cpr.core.AppInstance} 	app 앱인스턴스
 * @param {Array} paCtrlIds		 컨트롤 ID 배열
 * @param {cpr.controls.Container} poContainer? 자식 컨트롤을 취득하고자 하는 부모 컨테이너 객체  	
 * @return {Array} 자식 컨트롤 객체 배열
 */
GroupKit.prototype.getControlByID = function(app, paCtrlIds, poContainer) {
	if(!(paCtrlIds instanceof Array)){
		paCtrlIds = [paCtrlIds];
	}
	var vaChildCtrls = new Array();
	var container = poContainer ? poContainer : this._appKit.getMainApp(app).getContainer();
	function getChildRecursive(paCtrlIds, poContainer){
	    var childCtrls = poContainer.getAllRecursiveChildren();
	    for (var i=0, len=childCtrls.length; i<len; i++) {
	        if (paCtrlIds.indexOf(childCtrls[i].id) != -1) {
	        	vaChildCtrls.push(childCtrls[i]);
	        }else if(childCtrls[i] instanceof cpr.controls.UDCBase){
	        	var voUdcApp = childCtrls[i].getEmbeddedAppInstance();
	        	if(voUdcApp) getChildRecursive(paCtrlIds, voUdcApp.getContainer());
	        }else if(childCtrls[i] instanceof cpr.controls.EmbeddedApp){
	        	var voEmbApp = childCtrls[i].getEmbeddedAppInstance();
	        	if(voEmbApp) getChildRecursive(paCtrlIds, voEmbApp.getContainer());
	        }
	    }
	}
	
	getChildRecursive(paCtrlIds, container);
	
	return vaChildCtrls;
};

/**
 * 그룹 컨트롤에 바인딩된 데이터셋을 반환한다.
 * @param {cpr.core.AppInstance} 	app 앱인스턴스
 * @param {cpr.controls.Container} poContainer 		자식 컨트롤을 취득하고자 하는 부모 컨테이너 객체 
 * @return {cpr.data.DataSet} 바인딩된 데이터셋 객체
 */
GroupKit.prototype.getBindDataSet = function(app, poContainer){
	/**@type cpr.data.DataSet */
	var voDataSet = null;
	/** @type cpr.bind.BindContext */
	var voBindContext = this.getBindContext(app, poContainer);
	if(voBindContext instanceof cpr.bind.GridSelectionContext){
		voDataSet = voBindContext.grid.dataSet;
	}else if(voBindContext instanceof cpr.bind.DataRowContext){
		voDataSet = voBindContext.dataSet;
	}
	
	return voDataSet;
};

/**
 * 그룹 컨트롤의 바인딩 문맥(Context) 객체를 반환한다.
 * @param {cpr.core.AppInstance} 	app 앱인스턴스
 * @param {cpr.controls.Container} poContainer 		자식 컨트롤을 취득하고자 하는 부모 컨테이너 객체 
 * @return {cpr.bind.BindContext} 바인딩 Context 객체
 */
GroupKit.prototype.getBindContext = function(app, poContainer){
	/** @type cpr.bind.BindContext */
	var voBindContext = poContainer.getBindContext();
	if(voBindContext == null || voBindContext == undefined){
		var vaChildCtrls = this.getAllChildrenByType(app, "container", poContainer);
		vaChildCtrls.forEach(function(/* Object */ ctrl){
			if(ctrl.getBindContext()){
				voBindContext = ctrl.getBindContext();
				return true;
			}
		});
	}
	
	return voBindContext;
};

/**
 * FreeForm컨트롤 유틸<br>
 * - 일반적으로 그리드가 바인딩되었거나 데이터셋을 사용하는 폼레이아웃 컨트롤에 적용.<br>
 * - 그리드 + 상세(폼레이아웃) 화면에서 주로 사용 
 * @constructor
 * @param {common.AppKit} appKit
 */
function FreeFormKit(appKit){
	this._appKit = appKit;
	//입력형식의 폼레이아웃 CSS
	this._FORM_LAYOUT_CSS = "form-box";
};

/**
 * 그룹-프리폼 컨트롤들에 대해 초기화 로직을 수행한다.<br>
 *  초기화 지정시 그룹의 class는 form-box 지정 필수.<br>
 * 1. numbereditor class 지정<br>
 *  - appHeader에서 공통 적용됨<br>
 * 2. 데이터 여부에 따른 비활성화 처리 (load, filter 이벤트)<br>
 *     (데이터가 없으면 입력 안됨 처리)<br>
 *  - 사이트별 Customizing 필요
 * @param {cpr.core.AppInstance} app 앱인스턴스
 * @param {#Container | Array} paFreeFormId 프리폼 ID 또는 ID배열
 */
FreeFormKit.prototype.init = function(app, paFreeFormId) {
	if(!(paFreeFormId instanceof Array)){
		paFreeFormId = [paFreeFormId];
	}
	var vcForm = null, voBindContext = null, voDs = null;
	var voMap = new cpr.utils.ObjectMap();
	var voBindMap = new cpr.utils.ObjectMap();
	for(var i=0, len=paFreeFormId.length; i<len; i++){
		/**@type cpr.controls.Container */
		vcForm = app.lookup(paFreeFormId[i]);
		if(vcForm == null) continue;
		
		voBindContext = this._appKit.Group.getBindContext(app, vcForm);
		voDs = voBindContext.grid ? voBindContext.grid.dataSet : voBindContext.dataSet;
		vcForm._originEnabled = vcForm.enabled;
		if(vcForm.getBindInfo("enabled") != null){
			vcForm._expressEnabled = vcForm.getBindInfo("enabled").expression;
		}
		if(voDs._freeforms){
			voDs._freeforms.push(vcForm.id);
		}else{
			voDs._freeforms = [vcForm.id];
		}
		var childCtrls = vcForm.getAllRecursiveChildren();
		childCtrls.forEach(function(ctrl){
			if(ctrl.type == "numbereditor"){
				if(ctrl.spinButton != false && ctrl.style.css("text-align") == ""){
					ctrl.style.css({"text-align":"center"});
				}
				if((ctrl.format === "0000" || ctrl.format === "9999") && ctrl.max == 0){
					ctrl.max = 1.7976931348623157E308;
				}
			}
		});
		
		if(voMap.get(voDs.id) == null){
			voMap.put(voDs.id, voDs);
		}
		
		if(voBindContext.grid == null && voBindMap.get(voDs.id) == null){
			voBindMap.put(voDs.id, voDs);
			voDs.stateRestore = true; //현재값과 Origin이 같으면... 변경없도록 처리
		}
	}
	
	var _app = app, _appKit = this._appKit;
	voMap.keys().forEach(function(key){
		voMap.get(key).addEventListener("load", function(/* cpr.events.CDataEvent */e){
			var dataset = e.control;
			var freeforms = dataset._freeforms;
			freeforms.forEach(function(/* eachType */ formId){
				/**@type cpr.controls.Container */
				var form = _app.lookup(formId);
				//데이터가 없으면... 프리폼 비활성화
				if(dataset.getRowCount() < 1) {
					if(form._expressEnabled){
						form.unbind("enabled");
					}
					form.enabled = false;
				}else{
					//데이터가 있으면  프리폼 활성화
					if(form._originEnabled !== false){
						if(form._expressEnabled){
							form.bind("enabled").toExpression(form._expressEnabled);
						}else{
							form.enabled = true;
						}
					}
				}
			});
		});
		
		voMap.get(key).addEventListener("filter", function(/* cpr.events.CDataEvent */e){
			var dataset = e.control;
			var freeforms = dataset._freeforms;
			freeforms.forEach(function(/* eachType */ formId){
				/**@type cpr.controls.Container */
				var form = _app.lookup(formId);
				//데이터가 없으면... 프리폼 비활성화
				if(dataset.getRowCount() < 1) {
					if(form._expressEnabled){
						form.unbind("enabled");
					}
					form.enabled = false;
				}else{
					//데이터가 있으면 있고, 조회권한이 아니고... 프리폼 활성화
					if(form._originEnabled !== false){
						if(form._expressEnabled){
							form.bind("enabled").toExpression(form._expressEnabled);
						}else{
							form.enabled = true;
						}
					}
				}
			});
		});
	});
};


/**
 * 프리폼에 신규 행(Row)을 추가한다.<br>
 *  - 사이트별 Customizing 필요
 * @param {cpr.core.AppInstance} app 앱인스턴스
 * @param {#Container} psFreeFormId 프리폼 ID
 * @param {#column} psEditCol 신규 이후 포커스 COLUMN명
 * @param {Number} pnRowIdx? 추가하고자 하는 Row index
 *                 (defalut : 현재 선택된 로우 이후)
 * @param {Object} poRowData? 추가할 row data. (key: header명, value: value 를 갖는 json data)
 * @return {cpr.controls.provider.GridRow} 추가한 Row의 GridRow 객체.
 */
FreeFormKit.prototype.insertRow = function(app, psFreeFormId, psEditCol, pnRowIdx, poRowData) {
	/**@type cpr.controls.Container */
	var vcForm = app.lookup(psFreeFormId);
	var voBindContext = this._appKit.Group.getBindContext(app, vcForm);
	
	var vcGrid = voBindContext.grid;
	var voDs = voBindContext.grid ? voBindContext.grid.dataSet : voBindContext.dataSet;
	/**@type cpr.controls.Tree */
	var vcTree = app.lookup(voDs._treeId);
	var rowIndex = -1;
	if(!ValueUtil.isNull(pnRowIdx)){
		rowIndex = pnRowIdx;
	}else{
		if(vcTree){
			rowIndex = vcTree.getIndex(vcTree.getSelectionFirst());
		}else{
			rowIndex = voBindContext.grid ? this._appKit.Grid.getIndex(app, voBindContext.grid.id) : voBindContext.rowIndex;
		}
	}
	
	// InsertRow
	var insertedRow = null;
	if(poRowData != null){
		insertedRow = voDs.insertRowData(rowIndex, true, poRowData);
	}else{
		if(vcTree){
			// 트리
			var vsSelVal = ValueUtil.fixNull(vcTree.value);
			
			var voRow = {};
			voRow[vcTree.itemSetConfig.label] = "";
			voRow[vcTree.itemSetConfig.value] = "";
			voRow[vcTree.itemSetConfig.parentValue] = vsSelVal;
			
			insertedRow = voDs.insertRowData(rowIndex, true, voRow);
			if(vsSelVal != ""){
				var voItem = vcTree.getItemByValue(vsSelVal);
				vcTree.expandItem(voItem);
			}
		}else{
			insertedRow = voDs.insertRow(rowIndex, true);
		}
	}
	
	// SelectRow
	if(vcTree){
		// 트리
		vcTree.selectItemByValue("DEFAULT", true);
		vcTree.focusItem(vcTree.getItem(insertedRow.getIndex()));
	}else if(vcGrid){
		// 그리드
//		vcGrid.selectRows(-1, false);
		vcGrid.clearSelection();
		vcGrid.selectRows(insertedRow.getIndex(), true);
	}else{
		// 프리폼
		vcForm.redraw();
	}
	if(vcForm._expressEnabled){
		vcForm.bind("enabled").toExpression(vcForm._expressEnabled);
	}else{
		vcForm.enabled = true;
	}
	
	// Focus
	if(psEditCol){
		var vcCtrl = this._appKit.Group.getDataBindedControl(app, vcForm.id, psEditCol);
		if(vcCtrl) vcCtrl.focus();
	}
	
	return insertedRow;
};

/**
 * 프리폼에 행(Row)을 삭제한다.<br>
 * - 사이트별 Customizing 필요
 * @param {cpr.core.AppInstance} app 앱인스턴스
 * @param {#Container} psFreeFormId 프리폼 ID
 * @param {String} psAftMsg? 메시지 유형(CRM)
 * @return void
 */
FreeFormKit.prototype.deleteRow = function(app, psFreeFormId, psAftMsg) {
	var _this = this;
	/** @type cpr.controls.Container */
	var vcForm = app.lookup(psFreeFormId);
	/** @type cpr.bind.BindContext */
	var voBindContext = this._appKit.Group.getBindContext(app, vcForm);
	
	var voDs = voBindContext.grid ? voBindContext.grid.dataSet : voBindContext.dataSet;
	var vcGrid = voBindContext.grid;
	/** @type cpr.controls.Tree */
	var vcTree = app.lookup(voDs._treeId);
	var rowIndex = voBindContext.grid ? this._appKit.Grid.getIndex(app, voBindContext.grid.id) : voBindContext.rowIndex;
	if(voDs == null || voDs.getRowCount() < 1){
		//삭제할 데이터가 없습니다.
		this._appKit.Msg.alert("INF-M007");
	}else{
		if(!ValueUtil.isNull(psAftMsg)){
			//삭제하시겠습니까?
			if(this._appKit.Msg.confirm("CRM-M002")){
				if(voDs.getRowState(rowIndex) == cpr.data.tabledata.RowState.INSERTED){
					voDs.revertRow(rowIndex);
					vcForm.redraw();
					if(vcGrid){
						vcGrid.redraw();
						//가장 마지막 행에서 신규 행 추가 후, 삭제할 경우에 가장 마지막 행을 선택해줌
						if(voDs.getRowCount() -1 < rowIndex){
							vcGrid.selectRows([rowIndex-1]);
						}
					} 
					if(vcTree) vcTree.redraw();
					//데이터 건수가 없으면... 프리폼 비활성화
					if(voDs.getRowCount() < 1) {
						vcForm.enabled = false;
					}
					return false;
				}else{
					voDs.setRowState(rowIndex, cpr.data.tabledata.RowState.DELETED);
					return true;
				}
			}
		}else{
			if(voDs.getRowState(rowIndex) == cpr.data.tabledata.RowState.INSERTED){
				voDs.revertRow(rowIndex);
			}else{
				voDs.setRowState(rowIndex, cpr.data.tabledata.RowState.DELETED);
			}
		}
	}
	
	return false;
};

/**
 * 프리폼에 바인딩된 값을 반환한다.
 * @param {cpr.core.AppInstance} app 앱인스턴스
 * @param {#Container} psFreeFormId 프리폼 ID
 * @param {#column} psColumnName 컬럼명
 * @return {String} 프리폼의 컬럼값
 */
FreeFormKit.prototype.getValue = function(app, psFreeFormId, psColumnName){
	/** @type cpr.controls.Container */
	var vcForm = app.lookup(psFreeFormId);
	var voBindContext = this._appKit.Group.getBindContext(app, vcForm);
	/** @type cpr.data.DataSet */
	var voDs = voBindContext.grid ? voBindContext.grid.dataSet : voBindContext.dataSet;
	var rowIndex = voBindContext.grid ? this._appKit.Grid.getIndex(app, voBindContext.grid.id) : voBindContext.rowIndex;
	
	return voDs.getValue(rowIndex, psColumnName);
};

/**
 * 프리폼에 바인딩된 값을 변경한다.
 * @param {cpr.core.AppInstance} app 앱인스턴스
 * @param {#Container} psFreeFormId 프리폼 ID
 * @param {#column} psColumnName 컬럼명
 * @param {String} psValue 변경하고자 하는 값
 * @return void
 */
FreeFormKit.prototype.setValue = function(app, psFreeFormId, psColumnName, psValue){
	/** @type cpr.controls.Container */
	var vcForm = app.lookup(psFreeFormId);
	var voBindContext = this._appKit.Group.getBindContext(app, vcForm);
	/** @type cpr.data.DataSet */
	var voDs = voBindContext.grid ? voBindContext.grid.dataSet : voBindContext.dataSet;
	var rowIndex = voBindContext.grid ? this._appKit.Grid.getIndex(app, voBindContext.grid.id) : voBindContext.rowIndex;
	
	voDs.setValue(rowIndex, psColumnName, psValue);
	vcForm.redraw();
};

/**
 * 프리폼 내의 특정 컬럼을 포커싱한다.
 * @param {cpr.core.AppInstance} app 앱인스턴스
 * @param {#Container} psFreeFormId 프리폼 ID
 * @param {#column} psColumnName 포커싱할 컬럼명
 */
FreeFormKit.prototype.setFocus = function(app, psFreeFormId, psColumnName){
	/** @type cpr.controls.Container */
	var vcForm = app.lookup(psFreeFormId);
	
	var vcCtrl = this._appKit.Group.getDataBindedControl(app, vcForm.id, psColumnName);
	if(vcCtrl) this._appKit.Control.setFocus(app, vcCtrl.id);
};

/**
 * 프리폼의 변경사항을 되돌린다.
 * @param {cpr.core.AppInstance} app 앱인스턴스
 * @param {#Container} psFreeFormId  해당 그룹 아이디
 * @param {Number} pnRowIndex? 되돌릴 행의 index
 * @param {#column} psEditCol? 포커싱할 컬럼명
 * @return void
 */
FreeFormKit.prototype.revertRow = function(app, psFreeFormId, pnRowIndex, psEditCol){
	/**@type cpr.controls.Container */
	var vcForm = app.lookup(psFreeFormId);
	var voBindContext = this._appKit.Group.getBindContext(app, vcForm);
	/**@type cpr.controls.Grid */
	var vcGrid = voBindContext.grid;
	/**@type cpr.data.DataSet */
	var voDs = voBindContext.grid ? voBindContext.grid.dataSet : voBindContext.dataSet;

	var vnRowIndex = 0;
	if(!ValueUtil.isNull(pnRowIndex)){
		vnRowIndex = pnRowIndex;
	}else{
		if(vcGrid) vnRowIndex = this._appKit.Grid.getIndex(vcGrid.getAppInstance(), vcGrid.id);
		else vnRowIndex = voBindContext.rowIndex;
	}
	//데이터 Revert
	var rowData = voDs.getRow(vnRowIndex).getRowData();
	var vsGridRowState = vcGrid.getRowState(vnRowIndex);
	for(var column in rowData){
		voDs.setValue(vnRowIndex, column, voDs.getOriginalValue(vnRowIndex, column));
	}
	if(vsGridRowState == cpr.data.tabledata.RowState.INSERTED){
		vcGrid.setRowState(vnRowIndex, vsGridRowState);
	}
	var vcTree = app.lookup(voDs._treeId); 
		
	if(vcGrid) vcGrid.redraw();
	if(vcTree) vcTree.redraw();
	vcForm.redraw();
	
	if(!ValueUtil.isNull(psEditCol)){
		var vcCtrl = this._appKit.Group.getDataBindedControl(app, vcForm.id, psEditCol);
		if(vcCtrl) vcCtrl.focus();
	}
};

/**
 * 프리폼의 변경사항을 되돌린다.
 * @param {cpr.core.AppInstance} app 앱인스턴스
 * @param {#Container} psFreeFormId  해당 그룹 아이디
 * @return void
 */
FreeFormKit.prototype.revertAllData = function(app, psFreeFormId){
	/**@type cpr.controls.Container */
	var vcForm = app.lookup(psFreeFormId);
	var voBindContext = this._appKit.Group.getBindContext(app, vcForm);
	
	var vcGrid = voBindContext.grid;
	var voDs = voBindContext.grid ? voBindContext.grid.dataSet : voBindContext.dataSet;
	var vcTree = app.lookup(voDs._treeId); 
	
	//데이터 Revert
	voDs.revert();
		
	if(vcGrid) vcGrid.redraw();
	if(vcTree) vcTree.redraw();
	vcForm.redraw();
};

/**
 * 그룹의 변경사항 유/무를 반환를 반환한다.
 * @param {cpr.core.AppInstance} app 앱인스턴스
 * @param {#Container | Array} paFreeFormId 프리폼 ID
 * @param {"MSG" | "CRM"} psAftMsg? 
 *						MSG : 변경사항 내역이 없을 경우 '변경된 내역이 없습니다.' 메세지 출력<br>
 *  					CRM : 변경내역이 존재할경우 '변경사항이 반영되지 않았습니다. 계속 하시겠습니까?' confirm 메시지출력 
 * @return {Boolean} 데이터 변경 여부
 */
FreeFormKit.prototype.isModified = function(app, paFreeFormId, psAftMsg){
	if(!(paFreeFormId instanceof Array)){
		paFreeFormId = [paFreeFormId];
	}
	
	psAftMsg = psAftMsg == null ? "" : psAftMsg;
	
	var modify = false;
	var vcGroup = null;
	for (var i=0, len=paFreeFormId.length; i<len; i++) {
		if(paFreeFormId[i] instanceof cpr.controls.Container) {
			vcGroup = paFreeFormId[i];
		}else{
			vcGroup = app.lookup(paFreeFormId[i]);
		}
		
		var voDataSet = this._appKit.Group.getBindDataSet(app, vcGroup);
		if(voDataSet != null && voDataSet.isModified()) {
			modify = true;
			break;
		}
	}
	
	if(modify){
		if(psAftMsg.toUpperCase() == "CRM"){//변경사항이 반영되지 않았습니다. 계속 하시겠습니까? confirm
			if(!this._appKit.Msg.confirm("CRM-M003", [vcGroup.fieldLabel])) return true;
			else return false;
		}
	}else{
		if(psAftMsg.toUpperCase() == "MSG"){//변경된 내역이 없습니다.
			this._appKit.Msg.notify(app, "INF-M006");
		}
	}
	
	return modify;
};


/**
 * 리스트 형태 컨트롤 유틸
 * @constructor
 * @param {common.AppKit} appKit
 */
function SelectKit(appKit){
	this._appKit = appKit;
};

/**
 * 입력한 index의 위치에 새로운 item을 추가한다.
 * <pre><code>
 * SelectCtl.addItem(app, "cmb1", "라벨1", "값1");
 * </code></pre>
 * @param {cpr.core.AppInstance} 	app 앱인스턴스
 * @param {#uicontrol} psCtlId		 select ID (only Combo, List, Radio, CheckBox Group)
 * @param {String} psLabel		 추가할 item의 label
 * @param {String} psValue		 추가할 item의 value
 * @return void 
 * @alt 입력한 index의 위치에 새로운 item을 추가한다.
 * <pre><code>
 * SelectCtl.addItem(app, "cmb1", "라벨1", "값1", 0);
 * </code></pre>
 * @param {cpr.core.AppInstance} 	app 앱인스턴스
 * @param {#uicontrol} psCtlId		 select ID (only Combo, List, Radio, CheckBox Group)
 * @param {String} psLabel		 추가할 item의 label
 * @param {String} psValue		 추가할 item의 value
 * @param {Number} pnIndex? 추가할 item의 index (default는 마지막 행 뒤에 추가됨)
 * @return void 
 */
SelectKit.prototype.addItem = function(app, psCtlId, psLabel, psValue, pnIndex){
	/** @type cpr.controls.ComboBox */
	var vcCtl = app.lookup(psCtlId);
	var item;
	
	if(ValueUtil.isNull(pnIndex)){
		vcCtl.addItem(new cpr.controls.Item(psLabel, psValue));
	}else{
		if(pnIndex >= 0 && pnIndex <= vcCtl.getItemCount()){
			if(pnIndex == 0){
				item = vcCtl.getItem(pnIndex);
				vcCtl.insertItemBefore(new cpr.controls.Item(psLabel, psValue), item);
			} else {
				item = vcCtl.getItem(pnIndex - 1);
				vcCtl.insertItemAfter(new cpr.controls.Item(psLabel, psValue), item);
			}
		}
	}
};

/**
 * 지정한 인덱스(Index)의 아이템 라벨(label)을 반환한다.<br>
 * multiple "true"의 경우 index에 해당하는 여러 라벨값을 알고자 할 때, pnIndex는 구분자를 기준으로 조인된 String 형태를 가진다.
 * <pre><code>
 * SelectCtl.getItemLabel(app, "cmb1");
 * </code></pre>
 * @param {cpr.core.AppInstance} 	app 앱인스턴스
 * @param {#uicontrol} psCtlId		컨트롤ID
 * @return {String | Array}	multiple : true 일 경우 Array(String)
 * 										   false 일 경우 String
 * @alt 지정한 인덱스(Index)의 아이템 라벨(label)을 반환한다.<br>
 * multiple "true"의 경우 index에 해당하는 여러 라벨값을 알고자 할 때, pnIndex는 구분자를 기준으로 조인된 String 형태를 가진다.
 * <pre><code>
 * SelectCtl.getItemLabel(app, "cmb1", "1,2,3");
 * </code></pre>
 * @param {cpr.core.AppInstance} 	app 앱인스턴스
 * @param {#uicontrol} psCtlId		컨트롤ID
 * @param {Number} pnIndex? 인덱스 번호
 * @return {String | Array}	multiple : true 일 경우 Array(String)
 * 										   false 일 경우 String
 */
SelectKit.prototype.getItemLabel = function(app, psCtlId, pnIndex){
	var vcCtl = app.lookup(psCtlId);
	if(ValueUtil.isNull(pnIndex)){
		var item = vcCtl.getSelectionFirst();
		return item ? item.label : "";
	}else{
		if(vcCtl.multiple){//다중 선택 가능한 경우 라벨 배열 반환
			var vaIdx = ValueUtil.split(pnIndex, ",");
			for(var i=0, len=vaIdx.length; i<len; i++){
				vaIdx[i] = vcCtl.getItem(vaIdx[i]).label;
			}
			return vaIdx;
		}else{
			return vcCtl.getItem(pnIndex).label;
		}
	}
};

/**
 * 지정한 인덱스(Index)의 아이템 값(value)을 반환한다.<br>
 * multiple "true"의 경우 index에 해당하는 여러 value 값을 알고자 할 때, pnIndex는 구분자를 기준으로 조인된 String 형태를 가진다.
 * <pre><code>
 * SelectCtl.getItemValue(app, "cmb1");
 * </code></pre>
 * @param {cpr.core.AppInstance} 	app 앱인스턴스
 * @param {#uicontrol} psCtlId		컨트롤ID
 * @return {String | Array}	multiple : true 일 경우 Array(String)
 * 										   false 일 경우 String
 * @alt 지정한 인덱스(Index)의 아이템 값(value)을 반환한다.<br>
 * multiple "true"의 경우 index에 해당하는 여러 value 값을 알고자 할 때, pnIndex는 구분자를 기준으로 조인된 String 형태를 가진다.
 * <pre><code>
 * SelectCtl.getItemValue(app, "cmb1", "1,2,3");
 * </code></pre>
 * @param {cpr.core.AppInstance} 	app 앱인스턴스
 * @param {#uicontrol} psCtlId		컨트롤ID
 * @param {Number} pnIndex? 인덱스 번호
 * @return {String | Array}	multiple : true 일 경우 Array(String)
 * 										   false 일 경우 String
 */
SelectKit.prototype.getItemValue = function(app, psCtlId, pnIndex){
	/**@type cpr.controls.ComboBox */
	var vcCtl = app.lookup(psCtlId);
	if(ValueUtil.isNull(pnIndex)){
		var item = vcCtl.getSelectionFirst();
		return item ? item.value : "";
	}else{
		if(vcCtl.multiple){//다중 선택 가능한 경우 값 배열 반환
			var vaIdx = ValueUtil.split(pnIndex, ",");
			for(var i=0, len=vaIdx.length; i<len; i++){
				vaIdx[i] = vcCtl.getItem(vaIdx[i]).value;
			}
			return vaIdx;
		}else{
			return vcCtl.getItem(pnIndex).value;
		}
	}
};

/**
 * 지정한 인덱스(Index)의 아이템 값(value)을 반환한다.
 * multiple "true"의 경우 index에 해당하는 여러 value 값을 알고자 할 때, pnIndex는 구분자를 기준으로 조인된 String 형태를 가진다.
 * <pre><code>
 * SelectCtl.getItemValue(app, "cmb1", "1,2,3");
 * </code></pre>
 * @param {cpr.core.AppInstance} 	app 앱인스턴스
 * @param {#uicontrol} psCtlId		컨트롤ID
 * @param {Number} pnIndex		(Optional) 인덱스 번호
 * @return {String | Array}	multiple : true 일 경우 Array(String)
 * 										   false 일 경우 String
 */
SelectKit.prototype.getValue = function(app, psCtlId, pnIndex){
	/**@type cpr.controls.ComboBox */
	var ctrl = app.lookup(psCtlId);
	if(ValueUtil.isNull(pnIndex)){
		var item = ctrl.getSelectionFirst();
		return item ? item.value : "";
	}else{
		if(ctrl.multiple){//다중 선택 가능한 경우 값 배열 반환
			var vaIdx = ValueUtil.split(pnIndex, ",");
			for(var i=0, len=vaIdx.length; i<len; i++){
				vaIdx[i] = ctrl.getItem(vaIdx[i]).value;
			}
			return vaIdx;
		}else{
			return ctrl.getItem(pnIndex).value;
		}
	}
};

/**
 * 컨트롤의 값을 셋팅한다.
 * @param {cpr.core.AppInstance} 	app 앱인스턴스
 * @param {#uicontrol} psCtlId		컨트롤ID
 * @param {String} psValue  컨트롤값
 * @param {boolean} pbEmitEvent (Optional) value-changed 이벤트 발생시킬지 여부(true/false)
 */
SelectKit.prototype.setValue = function(app, psCtlId, psValue, pbEmitEvent){
	/**@type cpr.controls.ComboBox */
	var ctrl = app.lookup(psCtlId);
	if(pbEmitEvent != undefined && pbEmitEvent === false){
		ctrl.putValue(psValue);
	}else{
		ctrl.value = psValue;
	}
};

/**
 * 현재 선택 중인 아이템의 index를 반환한다.<br>
 * multiple "true"의 경우, index는 배열의 형태로 반환된다.
 * @param {cpr.core.AppInstance} 	app 앱인스턴스
 * @param {#uicontrol} psCtlId		select ID
 * @return {Number | Array}	multiple : true 일 경우 Array(Number)
 * 										   false 일 경우 Number 		
 */
SelectKit.prototype.getSelectedIndex = function(app, psCtlId){
	/** @type cpr.controls.ComboBox */
	var vcCtl = app.lookup(psCtlId);
	var vaItems = vcCtl.getSelection();
	if(vcCtl.multiple){
		var vaIndices = new Array();
		for(var i=0, len=vaItems.length; i<len; i++){
			vaIndices.push(vcCtl.getIndex(vaItems[i]));
		}
		return vaIndices;
	}else{
		return vcCtl.getIndex(vaItems[0]);
	}
};

/**
 * 인덱스(Index) 또는 value에 해당하는 아이템(Item)을 선택한다.<br>
 * multiple "true"의 경우 여러 개의 아이템을 선택하고자 할 때, puRowIdx는 구분자를 기준으로 조인된 String 형태를 가진다.
 * <pre><code>
 * SelectCtl.selectItem(app, "cmb1", "0");<br>
 * <p>또는<p>
 * SelectCtl.selectItem(app, "cmb1", "값1,값2,값3");
 * </code></pre>
 * @param {cpr.core.AppInstance} 	app 앱인스턴스
 * @param {#uicontrol} psCtlId		컨트롤ID
 * @param {String | Array} puRowIdx 인덱스 또는 value 값
 * @param {Boolean} emitEvent? 이벤트(before-selection-change, selection-change)를 발생시킬지 여부
 * @return {Boolean} 
 */
SelectKit.prototype.selectItem = function(app, psCtlId, puRowIdx, emitEvent){
	/**@type cpr.controls.CheckBoxGroup */
	var vcCtl = app.lookup(psCtlId);
	
	if(vcCtl == null || vcCtl == undefined) return false;
	
	puRowIdx = ValueUtil.split(puRowIdx, ",");
	if(vcCtl.multiple){//다중 선택 가능한 경우
		if(puRowIdx.length > 0){
			if(!ValueUtil.isNumber(puRowIdx[0])){
				for(var i=0, len=puRowIdx.length; i<len; i++){
					puRowIdx[i] = vcCtl.getIndexByValue(puRowIdx[i]);
				}
			}
			vcCtl.selectItems(puRowIdx, emitEvent);
		}
	}else{
		if(puRowIdx.length > 0){
			if(!ValueUtil.isNumber(puRowIdx[0])){
				var item = vcCtl.getItemByValue(puRowIdx[0]);
				if(item) vcCtl.selectItemByValue(puRowIdx[0], emitEvent);
				else vcCtl.selectItem(0, emitEvent);
			} else {
				if(Number(puRowIdx[0]) >= vcCtl.getItemCount()){
					vcCtl.selectItem(0, emitEvent);
				}else{
					vcCtl.selectItem(puRowIdx[0], emitEvent);
				}
			}
		}
	}
	
	return true;
};

/**
 * 모든 아이템을 선택한다.
 * @param {cpr.core.AppInstance} 	app 앱인스턴스
 * @param {#uicontrol} psCtlId	컨트롤ID
 * @return void
 */
SelectKit.prototype.selectAllItem = function(app, psCtlId){
	/** @type cpr.controls.ComboBox */
	var vcCtl = app.lookup(psCtlId);
	var indices = new Array();
	for(var i=0, len=vcCtl.getItemCount(); i<len; i++){
		indices.push(i);
	}
	vcCtl.selectItems(indices);
};

/**
 * 해당 컨트롤 아이템을 필터링 한다.
 * @param {cpr.core.AppInstance} 	app 앱인스턴스
 * @param {#uicontrol} psCtlId	컨트롤ID
 * @param {String} psCondition 필터 조건
 * @return void
 */
SelectKit.prototype.setFilter = function(app, psCtlId, psCondition){
	/** @type cpr.controls.ComboBox */
	var ctrl = app.lookup(psCtlId);
	ctrl.setFilter("value == null || value == '' || ("+ psCondition +")");
};

/**
 * 컨트롤의 필터링을 해제한다.
 * @param {cpr.core.AppInstance} 	app 앱인스턴스
 * @param {#uicontrol} psCtlId	컨트롤ID
 * @return void
 */
SelectKit.prototype.clearFilter = function(app, psCtlId){
	/** @type cpr.controls.ComboBox */
	var ctrl = app.lookup(psCtlId);
	ctrl.clearFilter();
};

/**
 * 콤보박스의 값을 Reset한다.
 * @param {cpr.core.AppInstance} 	app 앱인스턴스
 * @param {#uicontrol} psCtlId	컨트롤ID
 */
SelectKit.prototype.reset = function(app, psCtlId){
	/** @type cpr.controls.ComboBox */
	var vcCtl = app.lookup(psCtlId);
	if(vcCtl.dataSet){
		vcCtl.dataSet.clear();
	}
	vcCtl.value = "";
};


/**
 * 필터링 할 컬럼명(psFilterColumnName)은 데이터셋의 컬럼명을 작성한다.<br>
 * 그리드에서 사용 금지.<br>
 * @desc 두 개의 List형 컨트롤이 종속 관계를 가질 때, 종속되는 컨트롤의 데이터를 필터링하기 위한 메소드
 * @param {#uicontrol} psMainId				 메인 컨트롤 ID
 * @param {#uicontrol} psSubId				 적용될 컨트롤 ID
 * @param {#column} psFilterColumnName	 적용될 컨트롤의 필터링 할 컬럼명
 * @param {Boolean} pbFirstItemSelect?  첫번째 아이템 선택 여부  default : true (선택)
 * @return void
 */
SelectKit.prototype.cascadeList = function(app, psMainId, psSubId, psFilterColumnName, pbFirstItemSelect){
	var voMainCtl = app.lookup(psMainId);
	var voSubCtl = app.lookup(psSubId);

	if(voMainCtl == null || voSubCtl == null){
		return;
	}
	pbFirstItemSelect = pbFirstItemSelect == null ? true : pbFirstItemSelect;

	var vaItems = voMainCtl.getSelection();
	var vsValue = "";
	if(vaItems.length > 0){
		vsValue = vaItems[0].value;
	}

	voSubCtl.clearFilter();

	var voFirstItem = voSubCtl.getItem(0);
	var vsFirstItemValue = voFirstItem.value;
	var vsFirstItemLable = voFirstItem.label;

	//'전체' 아이템 여부
	var vbAllStatus = false;
	//var vsGlsAll = cpr.I18N.INSTANCE.message("UI-GLS-ALL");
	var vsGlsAll = "전체";

	if( vsGlsAll ==  vsFirstItemLable && ( ValueUtil.isNull(vsFirstItemValue) || vsFirstItemValue.indexOf("%") != -1)){
		vbAllStatus = true;
	}

	//전체아이템이 포함됐을 경우
	if(vbAllStatus)	{
		var vsFilter = psFilterColumnName + "== '" + vsValue + "' || ( label == '" +  vsGlsAll + "' && (value == '' || value == '%'))";
		voSubCtl.setFilter(vsFilter);
		if(pbFirstItemSelect)
			this.selectItem(app, psSubId, 0);
	}else{
		voSubCtl.setFilter(psFilterColumnName + "== '" + vsValue + "'");
		if(pbFirstItemSelect){
			var vaSubCtlItems = voSubCtl.getItems();
			if(vaSubCtlItems.length > 0){
				this.selectItem(app, psSubId, vaSubCtlItems[0].value);
			}else{
				this.selectItem(app, psSubId, 0);
			}
		}

	}

	voSubCtl.redraw();
};
/**
 * 트리(Tree) 컨트롤 유틸
 * @constructor
 * @param {common.AppKit} appKit
 */
function TreeKit(appKit){
	this._appKit = appKit;
};

/**
 * 현재 선택된 아이템의 value를 반환한다.
 * @param {cpr.core.AppInstance} 		app 앱인스턴스
 * @param {#tree} psTreeId	 트리 Id
 * @param {String} psDiv? 얻어올 값 영역(label 또는 value)
 * @return {String | Array}  multiple 속성이 true 일 경우 Array(String)
 *                                      false 일 경우 String  
 */
TreeKit.prototype.getSelectedValue = function(app, psTreeId, psDiv){
	/** @type cpr.controls.Tree */
	var vcTree = app.lookup(psTreeId);
	var vaItem = vcTree.getSelection();
	//아이템이 없으면... 공백 반환
	if(vaItem.length < 1) return "";
	
	psDiv = (psDiv != null ? psDiv.toUpperCase() : "VALUE");
	if(vcTree.multiple){
		var vaValues = new Array();
		vaItem.forEach(function(vcItem){
			if(psDiv == "LABEL")
				vaValues.push(vcItem.label);
			else
				vaValues.push(vcItem.value);
		});
		return vaValues;
	}else{
		return psDiv == "LABEL" ? vaItem[0].label : vaItem[0].value;
	}
};


/**
 * 입력한 value에 해당하는 아이템의 label 또는 parentValue를 반환한다.
 * @param {cpr.core.AppInstance} app
 * @param {#tree} psTreeId	트리 id
 * @param {String} psValue	search value
 * @param {String} psDiv	가지고 오는 구분자 값(LABEL(디폴트), PVALUE)
 * @return {String}
 */
TreeKit.prototype.getItem = function(app, psTreeId, psValue, psDiv){
	var vcTree = app.lookup(psTreeId);
	if(!!psDiv) psDiv = psDiv.toUpperCase();
	psDiv = !!psDiv ? psDiv : "LABEL";

	try {
		var vaItem = vcTree.getSelection();
		if(!psValue && vcItem > 0) psValue = vaItem[0].value;
	} catch(e){
		return null;
	}

	var voItem = vcTree.getItemByValue(psValue);

	if(!voItem) return null;

	if(psDiv == "LABEL"){
		return voItem.label;
	} else {
		return voItem.parentValue;
	}
};

/**
 * 해당 아이템의 상위 아이템을 펼친다.
 * @param {cpr.core.AppInstance} app 앱인스턴스
 * @param {#tree} psTreeId		 트리 Id
 * @param {Object} poItem		 item
 * @param {Boolean} pbHierarchy? 계층적으로 모든 상위까지 펼칠지 여부(false인 경우, 바로 상위의 부모 아이템만 펼친다.)
 * @return void
 */
TreeKit.prototype.expandParentItem = function(app, psTreeId, poItem, pbHierarchy){
	/** @type cpr.controls.Tree */
	var vcTree = app.lookup(psTreeId);
	var vaParentItem = new Array();
	
	pbHierarchy == !!pbHierarchy ? pbHierarchy : true;
	
	function checkExpandItem(poPItem){
		var item = vcTree.getItemByValue(poPItem.parentValue);
		if(item != null && item.value != "" && !vcTree.isExpanded(item)){
			vaParentItem.push(item);
			checkExpandItem(item);
		}
	}
	if(pbHierarchy){
		checkExpandItem(poItem);
	}else{
		vaParentItem.push(poItem);
	}
	
	for(var i=0, len=vaParentItem.length; i<len; i++){
		vcTree.expandItem(vaParentItem[i]);
	}
};

/**
 * 트리 선택 아이템 변경 이벤트 발생시, 변경 이전에 선택된 아이템을 선택해준다.
 * @param {cpr.core.AppInstance} app 앱인스턴스
 * @param {cpr.events.CSelectionEvent} event 트리 선택 아이템 변경 이벤트
 * @param {Boolean} emitEvent? 이벤트(before-selection-change, selection-change)를 발생시킬지 여부
 * @return void
 */
TreeKit.prototype.selectBeforeRow = function(app, event, emitEvent) {
	/** @type cpr.controls.Tree */
	var vcTree = event.control;
	var emit = emitEvent === true ? true : false;
	
	var voOldSelection = event.oldSelection[0];
	var vsOldVal = voOldSelection.value;
	vcTree.selectItemByValue(vsOldVal, emit);
	vcTree.focusItem(voOldSelection);
};

/**
 * 입력한 label 또는 value에 해당하는 트리 아이템을 선택한다.
 * @param {cpr.core.AppInstance} app 앱인스턴스
 * @param {#tree} psTreeId	 트리 id
 * @param {String} psValue	 search value
 * @param {String} psDiv	 가지고 오는 구분자 값(VALUE(디폴트), LABEL)
 * @return void
 */
TreeKit.prototype.selectItem = function(app, psTreeId, psValue, psDiv){
	var vcTree = app.lookup(psTreeId);

	if(!!psDiv) psDiv = psDiv.toUpperCase();
	psDiv = !!psDiv ? psDiv : "VALUE";

	if(psDiv == "VALUE"){
		vcTree.selectItemByValue(psValue);
	} else {
		vcTree.selectItemByLabel(psValue);
	}
};

/**
 * 아이템에 해당하는 모든 child item을 펼치거나 닫습니다.
 * @param {cpr.core.AppInstance} app 앱인스턴스
 * @param {#tree} psTreeId		트리 Id
 * @param {Boolean} pbExpand	펴기 : true, 닫기 : false
 * @param {Object} poItem		item 생략가능 default 최상위 item
 * @return void
 */
TreeKit.prototype.expandAllItems = function(app, psTreeId, pbExpand, poItem){
	var vcTree = app.lookup(psTreeId);

	if(!!poItem){
		if(pbExpand){
			vcTree.expandItem(poItem);
			vcTree.expandAllItems(poItem);
		} else {
			vcTree.collapseItem(poItem);
			vcTree.collapseAllItems(poItem);
		}
	} else {
		pbExpand ? vcTree.expandAllItems() : vcTree.collapseAllItems();
	}

};

/**
 * 탭(TabFolder) 컨트롤 유틸
 * @constructor
 * @param {common.AppKit} appKit
 */
function TabKit(appKit){
	this._appKit = appKit;
};

/**
 * 현재 선택된 탭아이템 id를 반환한다.
 * @param {cpr.core.AppInstance} app 앱인스턴스
 * @param {#TabFolder} psTabId 탭 Id
 * @return {Number} 탭아이템 id (탭아이템id는 인덱스와 유사 탭아이템 순서대로 id 부여됨)
 */
TabKit.prototype.getSelectedId = function(app, psTabId){
	/** @type cpr.controls.TabFolder */
	var vcTab = app.lookup(psTabId);
	var vcTabItem = vcTab.getSelectedTabItem();
	
	return vcTabItem ? vcTabItem.id : "";
};

/**
 * 입력한 id에 해당하는 탭 아이템을 선택한다.
 * @param {cpr.core.AppInstance} app 앱인스턴스
 * @param {#TabFolder} psTabId 탭Id
 * @param {Number} pnIndex 탭아이템 id
 * @param {Boolean} emitEvent? 이벤트(before-selection-change, selection-change)를 발생시킬지 여부
 */
TabKit.prototype.setSelectedTabItemById = function(app, psTabId, pnIndex, emitEvent){
	/** @type cpr.controls.TabFolder */
	var vcTab = app.lookup(psTabId);
	
	var vaTabItem = vcTab.getTabItems();
	var vcTabItem = vaTabItem.filter(function(item){
		return item.id == pnIndex;
	});
	
	var emit = emitEvent != undefined ? emitEvent : true;
	vcTab.setSelectedTabItem(vcTabItem[0], emit);
};

/**
 * 탭 페이지를 숨기거나/보여준다.
 * @param {cpr.core.AppInstance} app 앱인스턴스
 * @param {#TabFolder} psTabId 탭Id
 * @param {Number} pnIndex 탭아이템 id
 * @param {Boolean} pbVisible 숨김여부(true/false)
 */
TabKit.prototype.setVisibleTabItem = function(app, psTabId, pnIndex, pbVisible){
	/** @type cpr.controls.TabFolder */
	var vcTab = app.lookup(psTabId);
	
	var vaTabItem = vcTab.getTabItems();
	var vcTabItem = vaTabItem.filter(function(item){
		return item.id == pnIndex;
	});
	
	if(vcTabItem){
		vcTabItem[0].visible = pbVisible;
	}
};

/**
 * 탭 페이지 버튼을 활성화시키거나 비활성화 시킨다
 * @param {cpr.core.AppInstance} app 앱인스턴스
 * @param {#TabFolder} psTabId 탭Id
 * @param {String | Array} paIndex  활성화/비활성화 할 탭 Index 또는 Index 배열 (탭 index 시작 = 1) 
 * @param {Boolean} psEnable  활성화여부(true/false)
 */
TabKit.prototype.setEnableTabItem = function(app, psTabId, paIndex, psEnable){
	/* 2019-05-13 ssb 작성 */
	/** @type cpr.controls.TabFolder */
	var vcTab = app.lookup(psTabId);
	
	if(!(paIndex instanceof Array)){
		paIndex = [paIndex];
	}
	var vaTabItem = vcTab.getTabItems();
	
	for (var i=0, len=paIndex.length; i<len; i++) {
		var vnTabIdx  = paIndex[i] - 1;
		vaTabItem[vnTabIdx].enabled = psEnable;
	}
};



/**
 * Embeded앱 컨트롤 유틸
 * @constructor
 * @param {common.AppKit} appKit
 */
function EmbeddedAppKit(appKit){
	this._appKit = appKit;
};

/**
 * Embeded 앱내의 함수를 호출한다.
 * @param {cpr.core.AppInstance} app 앱인스턴스
 * @param {#EmbeddedApp} psEmbeddedappId 임베디드 앱 ID
 * @param {String} psFuncName 호출 함수명
 * @param {String | Array} paArgs 함수에 전달할 아규먼트 
 * @return {any} method 내 파라미터
 */
EmbeddedAppKit.prototype.callAppMethod = function(app, psEmbeddedappId, psFuncName, paArgs){
	/** @type cpr.controls.EmbeddedApp */
	var emb = app.lookup(psEmbeddedappId);
	var value = null;
	if(emb){
		emb.ready(function(e){
			if(!e.hasAppMethod(psFuncName)){
				alert("The embeded page not have "+psFuncName+" function! (script error)");
				return null;
			}
			value = e.callAppMethod(psFuncName, paArgs);
		});
	}
	return value;
};

/**
 * 임베디드 앱을 포함하고 있는 Host앱의 특정 함수를 호출한다.
 * @param {cpr.core.AppInstance} app 앱인스턴스
 * @param {String} psFuncName 호출 함수명
 * @param {String | Array} paArgs? 함수에 전달할 아규먼트 
 * @return {any} 반환값
 */
EmbeddedAppKit.prototype.callHostAppMethod = function(app, psFuncName, paArgs){
	/** @type cpr.core.AppInstance */
	var hostApp = app.getHostAppInstance();
	if(hostApp && hostApp.hasAppMethod(psFuncName)){
		return hostApp.callAppMethod(psFuncName, paArgs);
	}
	return null;
};

/**
 * 해당 임베디드 앱에 연결된 페이지의 앱 APP가 존재하는지 여부를 반환한다.
 * @param {cpr.core.AppInstance} app 앱인스턴스
 * @param {#embeddedapp} psEmbeddedappId 임베디드 앱 ID
 * @return {Boolean} 임베디드 앱 유/무 반환
 */
EmbeddedAppKit.prototype.hasPage = function(app, psEmbeddedappId){
	/** @type cpr.controls.EmbeddedApp */
	var emb = app.lookup(psEmbeddedappId);
	return (emb && emb.app) ? true : false;
};

/**
 * Embeded 앱에 호출할 화면을 설정한다.
 * @param {cpr.core.AppInstance} app 앱인스턴스
 * @param {#embeddedapp} psEmbeddedappId 임베디드 앱 ID
 * @param {String} psAppId 호출할 화면 앱ID
 * @param {any} poInitValue? 초기 파라메터
 */
EmbeddedAppKit.prototype.setPage = function(app, psEmbeddedappId, psAppId, poInitValue){
	/** @type cpr.controls.EmbeddedApp */
	var emb = app.lookup(psEmbeddedappId);
	if(emb){
		cpr.core.App.load(psAppId, function(loadedApp){
		   if(loadedApp){
		      emb.initValue = poInitValue;
		      emb.app = loadedApp;
		   }
		});
	}
};

/**
 * 임베디드 컨트롤에 포함되어있는 앱객체들을 제거합니다. 
 * @param {cpr.core.AppInstance} app 앱인스턴스
 * @param {#embeddedapp} psEmbeddedappId 임베디드 앱 ID
 */
EmbeddedAppKit.prototype.dispose = function(app, psEmbeddedappId){
	/** @type cpr.controls.EmbeddedApp */
	var emb = app.lookup(psEmbeddedappId);
	if(emb && emb.getEmbeddedAppInstance()){
		emb.getEmbeddedAppInstance().dispose();
	}
};



/**
 * 메인 MDI 컨트롤 유틸
 * @constructor
 * @param {common.AppKit} appKit
 */
function MDIKit(appKit){
	this._appKit = appKit;
};

/**
 * close 메인 MDI의 탭으로 화면을 오픈한다.<br>
 * - Root App에 해당 함수 필요<br>
 * - 사이트별 Customizing 필요
 * @param {cpr.core.AppInstance} app 앱인스턴스
 * @param {#MDIFolder} psMenuId 메뉴ID
 */
MDIKit.prototype.open = function(app, psMenuId, poParam){
	if(app.getRootAppInstance().hasAppMethod("doOpenMenuToMdi")){
		app.getRootAppInstance().callAppMethod("doOpenMenuToMdi", psMenuId, poParam);		
	}
};

/**
 * 일반 컨트롤 유틸
 * @constructor
 * @param {common.AppKit} appKit
 */
function ControlKit(appKit){
	this._appKit = appKit;
};

/**
 * 지정한 컨트롤의 Visible 속성을 설정한다.
 * @param {cpr.core.AppInstance} app 앱인스턴스
 * @param {Boolean} pbVisible 컨트롤 숨김 여부(true/false)
 * @param {#uicontrol | Array} paCtlId 컨트롤 아이디 또는 아이디 배열
 * @return void
 */
ControlKit.prototype.setVisible = function(app, pbVisible, paCtlId) {
	if(!(paCtlId instanceof Array)){
		paCtlId = [paCtlId];
	}
	if (typeof (pbVisible) != "boolean") {
		pbVisible = ValueUtil.fixBoolean(pbVisible);
	}
	for (var i=0, len=paCtlId.length; i<len; i++) {
		app.lookup(paCtlId[i]).visible = pbVisible;
	}
};

/**
 * 지정한 컨트롤의 Enable 속성을 설정한다.
 * @param {cpr.core.AppInstance} app 앱인스턴스
 * @param {Boolean} pbEnable 컨트롤 활성화 여부(true/false)
 * @param {#uicontrol | Array} paCtlId 컨트롤 아이디 또는 아이디 배열
 * @return void
 */
ControlKit.prototype.setEnable = function(app, pbEnable, paCtlId) {
	if(!(paCtlId instanceof Array)){
		paCtlId = [paCtlId];
	}
	if (typeof (pbEnable) != "boolean") {
		pbEnable = ValueUtil.fixBoolean(pbEnable);
	}
	var ctrl;
	for (var i=0, len=paCtlId.length; i<len; i++) {	
		ctrl = app.lookup(paCtlId[i]);
		if(ctrl) ctrl.enabled = pbEnable;
	}
};

/**
 * 지정한 컨트롤의 ReadOnly 속성을 설정한다.<br>
 * 만약, 해당 컨트롤에 readonly이 없을경우 enable 속성으로 제어된다.
 * @param {cpr.core.AppInstance} app 앱인스턴스
 * @param {Boolean} 		pbReadOnly  컨트롤 readOnly 여부(true/false)
 * @param {#uicontrol | Array} paCtlId 컨트롤 아이디 또는 아이디 배열
 * @return void
 */
ControlKit.prototype.setReadOnly = function(app, pbReadOnly, paCtlId) {
	if(!(paCtlId instanceof Array)){
		paCtlId = [paCtlId];
	}
		
	for (var i=0, len=paCtlId.length; i<len; i++) {
		var voCtl = app.lookup(paCtlId[i]);
	  	if(voCtl == null || "undefined" == voCtl) continue;
		
		var vsCtlType = voCtl.type;
		if(voCtl.readOnly !== undefined){
			voCtl.readOnly = pbReadOnly;
		}else{
			this.setEnable(app, !pbReadOnly, paCtlId[i]);
		}
	}
};

/**
 * 컨트롤의 지정된 사용자 정의 속성(userattr) 반환한다.
 * @param {cpr.core.AppInstance} app 앱인스턴스
 * @param {#uicontrol} psCtlId 	  컨트롤 아이디
 * @param {String} psAttrName  속성
 * @return {String} 속성값
 */
ControlKit.prototype.getUserAttr = function(app, psCtlId, psAttrName){
   return app.lookup(psCtlId).userAttr(psAttrName);
};

/**
 * 컨트롤의 지정된 사용자 정의 속성(userattr)의 값을 설정한다.
 * @param {cpr.core.AppInstance} app 앱인스턴스
 * @param {#uicontrol} psCtlId 	   컨트롤 아이디
 * @param {String} psAttrName  속성
 * @param {String} psAttrValue 속성값
 * @return void
 */
ControlKit.prototype.setUserAttr = function(app, psCtlId, psAttrName, psAttrValue){
	var ctrl = app.lookup(psCtlId);
	var userAttr = ctrl.userAttr();
	userAttr[psAttrName] = psAttrValue;
};

/**
 * 컨트롤를 포커스(focus) 한다.
 * @param {cpr.core.AppInstance} app 앱인스턴스
 * @param {#uicontrol} psCtlId 	   컨트롤 아이디
 */
ControlKit.prototype.setFocus = function(app, psCtlId){
	var ctrl = app.lookup(psCtlId);
	if(ctrl instanceof cpr.controls.UDCBase){
		var focused = false;
		var embApp = ctrl.getEmbeddedAppInstance();
		embApp.getContainer().getChildren().some(function(embCtrl){
			if(embCtrl.getBindInfo("value") && embCtrl.getBindInfo("value").property == "value"){
				embCtrl.focus();
				focused = true;
				return true;
			}
		});
		if(focused !== true){
			app.focus(ctrl);
		}
	}else{
		app.focus(ctrl);
	}
}

/**
 * 컨트롤의 값을 초기화한다.
 * @param {cpr.core.AppInstance} app 앱인스턴스
 * @param {#uicontrol | Array} paCtlId  일반 컨트롤 및 그리드 컨트롤 아이디		
 * @return void
 */
ControlKit.prototype.reset = function(app, paCtlId) {
	if(!(paCtlId instanceof Array)){
		paCtlId = [paCtlId];
	}
	var vcCtrl;
	for (var i=0, len=paCtlId.length; i<len; i++) {
		vcCtrl = app.lookup(paCtlId[i]);
		if(vcCtrl == null) continue;
		if(vcCtrl.type == "grid"){
			vcCtrl.dataSet.clear();
			//그리드 타이틀 영역의 데이터 건수 업데이트
			var titles = this._appKit.Group.getAllChildrenByType(app, "udc.com.comTitle");
			for(var j=0, jlen=titles.length; j<jlen; j++){
				if(titles[j] == null || titles[j].getAppProperty("ctrl") == null) continue;
				if(titles[j].getAppProperty("ctrl").id == vcCtrl.id){
					titles[j].setAppProperty("rowCount", vcCtrl.dataSet.getRowCount());
				}
			}
		}else if(vcCtrl.type == "container"){
			var voDs = this._appKit.Group.getBindDataSet(app, vcCtrl);
			if(voDs) voDs.clear();
			vcCtrl.redraw();
		}else{
			vcCtrl.value = "";
		}
	}
};

/**
 * 특정 컨트롤의 자료를 갱신하고 다시 그린다.
 * @param {cpr.core.AppInstance} app 앱인스턴스
 * @param {#uicontrol | Array} paCtlId 일반 컨트롤 및 그리드 컨트롤 아이디
 * @return void
 */
ControlKit.prototype.redraw = function(app, paCtlId) {
	if(!(paCtlId instanceof Array)){
		paCtlId = [paCtlId];
	}
	for (var i=0, len=paCtlId.length; i<len; i++) {
		var vcCtrl = app.lookup(paCtlId[i]);
		if(vcCtrl) vcCtrl.redraw();
	}
};

/**
 * 컨트롤의 지정된 style 속성 값을 가져옵니다.
 * @param {cpr.core.AppInstance} app 앱인스턴스
 * @param {#uicontrol} psCtlId 컨트롤 아이디
 * @param {String} psAttrName style 속성명
 * @return {String} style 속성값
 */
ControlKit.prototype.getStyleAttr = function(app, psCtlId, psAttrName){
	/**@type cpr.controls.UIControl*/
	var vcCtrl = app.lookup(psCtlId);
	return vcCtrl.style.css(psAttrName);
};

/**
 * 컨트롤의 지정된 style 속성값을 설정한다.
 * @param {cpr.core.AppInstance} app 앱인스턴스
 * @param {#uicontrol} psCtlId 컨트롤 아이디
 * @param {String} psAttrName 속성
 * @param {String} psAttrValue 속성값
 * @return void
 */
ControlKit.prototype.setStyleAttr = function(app, psCtlId, psAttrName, psAttrValue){
	/**@type cpr.controls.UIControl*/
	var vcCtrl = app.lookup(psCtlId);
	return vcCtrl.style.css(psAttrName, psAttrValue);
};

/**
 * 컨트롤이 실제 그려진 사이즈를 리턴합니다.<br>
 * 컨트롤이 화면에 그려지지 않은 상태인 경우는 모든 값이 0인 객체가 리턴됩니다.
 * @param {cpr.core.AppInstance} app 앱인스턴스
 * @param {#uicontrol} psCtlId  컨트롤 아이디
 * @param {String} psPosition 구하고자하는 위치 및 크기 정보(width, height, left, top, bottom, right)
 * @return {Interface{width: Number, height: Number, left: Number, top: Number, bottom: Number, right: Number}} HTML DOM에서의 컨트롤의 위치 및 크기 정보
 */
ControlKit.prototype.getActualRectPosition = function(app, psCtlId, psPosition){
	/** @type cpr.controls.UIControl */
	var vcCtrl = app.lookup(psCtlId);
	var voActRec = vcCtrl.getActualRect();
	return voActRec[psPosition];
};

/**
 * 해당 컨트롤의 제약 조건을 반환합니다.
 * @param {cpr.core.AppInstance} app 앱인스턴스
 * @param {#uicontrol} psCtlId 반환하고자 하는 컨트롤.
 * @param {String} psParentGrp? 상위 컨트롤
 *                                        그룹내 컨트롤의 제약 조건을 구할시 사용
 * @return {cpr.controls.layouts.Constraint} 해당하는 제약조건.
 */
ControlKit.prototype.getConsraint = function(app, psCtlId, psParentGrp){
	var ctrl = app.lookup(psCtlId);
	var container;
	if(!ValueUtil.isNull(psParentGrp)){
		container = app.lookup(psParentGrp);
	}else{
		container = app.getContainer();		
	}
	return container.getConstraint(ctrl);
};

/**
 * 컨트롤의 지정된 제약 조건(constraint)을 변경합니다.<br>
 * 타겟 컨트롤에서 부모 컨트롤과의 연계된 위치를 변경합니다.<br>
 * parameter의 constraints가 포함한 항목만 변경합니다.
 * @param {cpr.core.AppInstance} app 앱인스턴스
 * @param {#uicontrol} psCtlId 컨트롤의 아이디
 * @param {#Container} psParentGrpId 상위 컨트롤의 아이디. app의 container일 경우 null
 * @param {Object} poConstraint 제약조건
 * 					상위 컨트롤의 레이아웃이 formlayout일 경우 rowIndex, colIndex 를 반드시 포함한 조건을 설정하여야합니다.
 * @return {boolean} 성공여부
 */
ControlKit.prototype.updateConstraint = function(app, psCtlId, psParentGrpId, poConstraint){
 	/** @type cpr.controls.UIControl */
 	var vcChild = app.lookup(psCtlId);
 	if(vcChild == null) return false;
 	/** @type cpr.controls.Container */
 	var voContainer = null;
 	if(!ValueUtil.isNull(psParentGrpId)){
 		voContainer = app.lookup(psParentGrpId);
 	}else {
 		voContainer = app.getContainer();
 	}
 	
 	var voLayout = voContainer.getLayout();
 	var voConstraint = null;
 	if(voLayout instanceof cpr.controls.layouts.ResponsiveXYLayout){
 		var voSrcConstraint = voContainer.getConstraint(vcChild)["positions"][0];
 		voConstraint = {
 			positions:[Object.assign(voSrcConstraint, poConstraint)]
 		}
 	}else {
 		voConstraint = poConstraint;
 	}
 	
 	return voContainer.updateConstraint(vcChild, voConstraint);
};

/**
 * 해당 컨트롤의 이벤트를 발생시킨다.
 * @param {cpr.core.AppInstance} app 앱인스턴스
 * @param {#uicontrol} psCtlId 컨트롤의 아이디
 * @param {String} psEventType 이벤트명(ex-click)
 */
ControlKit.prototype.dispatchEvent = function(app, psCtlId, psEventType){
	var vcCtrl = app.lookup(psCtlId);
	if(vcCtrl){
		vcCtrl.dispatchEvent(new cpr.events.CEvent(psEventType));
	}
};

/**
 * 지정한 컨트롤의 value를 지정한다.
 * @param {cpr.core.AppInstance} app 앱인스턴스
 * @param {#uicontrol} psCtlId 컨트롤 아이디
 * @param {String} psValue 값
 * @param {Boolean} pbEmitEvent? 값 변경후의 before-value-change, value-change 이벤트 발생시킬지 여부<br/>
 *                  만약 값만 바꾸고, 이벤트 발생은 일어나지 않도록 하는 경우에만 false로 지정
 * @return void
 */
ControlKit.prototype.setValue = function(app, psCtlId, psValue, pbEmitEvent){
   var ctrl = app.lookup(psCtlId);
   if(pbEmitEvent === false && ctrl.putValue != undefined){
   		ctrl.putValue(psValue);
   }else{
   		ctrl.value = psValue;
   }
};

/**
 * @desc 지정한 컨트롤의 value를 취득한다.
 * @param {cpr.core.AppInstance} app 앱인스턴스
 * @param {#uicontrol} psCtlId 컨트롤 아이디
 * @return void
 */
ControlKit.prototype.getValue = function(app, psCtlId){
   return app.lookup(psCtlId).value;
};

/**
 * @desc 지정한 컨트롤의 value를 취득한다.
 * @param {cpr.core.AppInstance} app 앱인스턴스
 * @param {#uicontrol} psCtlId 컨트롤 아이디
 * @param {String} psProperty 컨트롤 속성명
 * @return void
 */
ControlKit.prototype.getProperty = function(app, psCtlId, psProperty){
   return app.lookup(psCtlId)[psProperty];
};

/**
 * 데이터셋 컨트롤 유틸
 * @constructor
 * @param {common.AppKit} appKit
 */
function DataSetKit(appKit){
	this._appKit = appKit;
};

/**
 * 데이터셋 또는 데이터맵에 컬럼(Column)을 추가합니다.<br>
 * Header정보 추가되며, data가 있는 경우 row data에도 해당 column data가 추가됩니다.
 * @param {cpr.core.AppInstance} app 앱인스턴스
 * @param {#dataset} psDataSetId 데이터셋
 * @param {String} psColumnNm 추가하려는 컬럼명
 * @param {Object} psValue? 초기값 설정
 * @param {"string" | "number" | "decimal" | "expression"} psColumnType? 컬럼유형
 * @return {Boolean} 컬럼 추가 성공 여부
 */
DataSetKit.prototype.addColumn = function(app, psDataSetId, psColumnNm, psValue, psColumnType){
	/** @type cpr.data.DataSet */
	var dataset = app.lookup(psDataSetId);
	
	var columnType = !ValueUtil.isNull(psColumnType) ? psColumnType.toLowerCase() : "string";
	return dataset.addColumn(new cpr.data.header.DataHeader(psColumnNm, columnType), psValue);
};

/**
 * 데이터셋 특정 값을 가져오는 함수 입니다.
 * <pre><code>
 * util.DataSet.getCondValue(app, "dsLttmRcd", "CD == '" + vsNewVal + "'", "CD_USG_01");
 * </code></pre>
 * @param {cpr.core.AppInstance} app 앱인스턴스
 * @param {#dataset} psDataSetId 데이터셋
 * @param {String} psCondition 특정 값을 가져올 조건
 * @param {#column} psColumnName 가져오려는 값의 컬럼명
 */
DataSetKit.prototype.getCondValue = function(app, psDataSetId, psCondition, psColumnName){
	/** @type cpr.data.DataSet */
	var dataset = app.lookup(psDataSetId);
	
	var voRow = dataset.findFirstRow(psCondition);
	return voRow != null ? voRow.getValue(psColumnName) : "";
};

/**
 * 데이터셋 특정 값을 가져오는 함수 입니다.
 * <pre><code>
 * util.DataSet.getValue(app, "dsLttmRcd", 1, "CD_USG_01");
 * </code></pre>
 * @param {cpr.core.AppInstance} app 앱인스턴스
 * @param {#dataset} psDataSetId 데이터셋
 * @param {Number} pnRowIndex 값을 가져올 row의 row index.
 * @param {#column} psColumnName 가져오려는 값의 컬럼명
 */
DataSetKit.prototype.getValue = function(app, psDataSetId, pnRowIndex, psColumnName){
	/** @type cpr.data.DataSet */
	var dataset = app.lookup(psDataSetId);
	
	return dataset.getValue(pnRowIndex, psColumnName)
};


/**
 * 입력 받은 rowIndex와 columnName에 해당되는 데이터를 수정합니다.<br>
 * <br>
 * 1. 상태변경<br>
 * 해당 columnName에 해당되는 Column이 DisplayColumn이 아니고 Row상태가 UNCHANGED 상태인 경우
 * Row 상태가 UPDATED로 바뀝니다.(UNCHANGED -> UPDATED)<br>
 * DELEDED상태이거나 INSERTED상태인 row는 수정할 수 없습니다.<br>
 * 2. 이벤트<br>
 * 수정이 된 경우 <b>UPDATED 이벤트가 발생합니다.</b><br>
 * @param {cpr.core.AppInstance} app 앱인스턴스
 * @param {#dataset} psDataSetId Id
 * @param {Number} pnRowIndex 수정할 row의 row index.
 * @param {#column} psColumnName 수정할 column의 columnName.
 * @param {Object} psValue 수정할 value 값.
 * @return {Boolean} 값 수정 성공 여부.
 */
DataSetKit.prototype.setValue = function(app, psDataSetId, pnRowIndex, psColumnName, psValue){
	/** @type cpr.data.DataSet */
	var vcDataSet =  app.lookup(psDataSetId);
	return vcDataSet.setValue(pnRowIndex, psColumnName, psValue);
};

/**
 * 모든 데이터셋 정보를 제거합니다.<br>
 * data, sort, filter가 제거됩니다.
 * @param {cpr.core.AppInstance} app 앱인스턴스
 * @param {#dataset} psDataSetId DataSet Id
 */
DataSetKit.prototype.clear = function(app, psDataSetId) {
	/** @type cpr.data.DataSet */
	var vcDataSet = app.lookup(psDataSetId);
	vcDataSet.clear();
}

/**
 * 지정한 범위 내의 row들 중 조건에 맞는 모든 Row 객체의 배열을 반환<br>
 * 또는 지정한 범위 내의 row들 중 조건에 맞는 첫번째 Row 객체를 반환
 * @param {cpr.core.AppInstance} app 앱인스턴스
 * @param {#dataset} psDataSetId 데이터셋 ID
 * @param {String} psCondition 조건식<br>
 *                 ex)"STUD_DIV_RCD == 'CT101REGU' && SA_NM == '컴퓨터정보과'"
 * 					사용가능수식 !=", "!==", "$=", "%", "&&", "(", "*", "*=", "+", ",", "-", ".", "/", "/*", "//", "<", "<=", "==", "===", ">", ">=", "?", "[", "^=", "||"
 * @param {Boolean} pbAllStatus?
 *                             true : 조건에 맞는 모든 row 리턴<br>
 *                             default : 조건에 맞는 첫번째 row 리턴
 * @param {Number} pnStartIdx? Number  범위지정 시작 row index.
 * @param {Number} pnEndIdx? Number  범위지정 끝 row index.
 * @retrun 데이터 로우
 */
DataSetKit.prototype.findRow = function(app, psDataSetId, psCondition, pbAllStatus, pnStartIdx, pnEndIdx) {
	/** @type cpr.data.DataSet */
	var vcDataSet = app.lookup(psDataSetId);

	if(pbAllStatus){
		return vcDataSet.findAllRow(psCondition, pnStartIdx, pnEndIdx);
	}else{
		return vcDataSet.findFirstRow(psCondition, pnStartIdx, pnEndIdx);
	}
};

/**
 * 지정한 범위 내의 row들 중 조건에 맞는 첫번째 Row 객체에 해당하는 컬럼의 value를 취득
 * @param {cpr.core.AppInstance} app 앱인스턴스
 * @param {#dataset} psDataSetId 데이터셋 ID
 * @param {String} psCondition 조건식<br>
 *                 ex)"STUD_DIV_RCD == 'CT101REGU' && SA_NM == '컴퓨터정보과'"
 * 					사용가능수식 !=", "!==", "$=", "%", "&&", "(", "*", "*=", "+", ",", "-", ".", "/", "/*", "//", "<", "<=", "==", "===", ">", ">=", "?", "[", "^=", "||"
 * @param {#column} psColumnName 컬럼명
 * @param {Number} pnStartIdx?  범위지정 시작 row index.
 * @param {Number} pnEndIdx?   범위지정 끝 row index.
 * @retrun 데이터 로우
 */
DataSetKit.prototype.getFindRowValue = function(app, psDataSetId, psCondition, psColumnName, pnStartIdx, pnEndIdx) {
	var voRow = this.findRow(app, psDataSetId, psCondition, false, pnStartIdx, pnEndIdx);
	if(voRow != null){
		return voRow.getValue(psColumnName);
	}else{
		return null;
	}
};

/**
 * 현재 Row 수를 반환
 * @param {cpr.core.AppInstance} app 앱인스턴스
 * @param {#dataset} psDataSetId 데이터셋 ID
 * @retrun {Number} 로우 갯수
 */
DataSetKit.prototype.getRowCount = function(app, psDataSetId) {
	/** @type cpr.data.DataSet */
	var vcDataSet = app.lookup(psDataSetId);
	return vcDataSet.getRowCount();
};

/**
 * 현재 데이터셋의 데이터를 타겟 데이터셋으로 복사합니다.<br>
 * 타겟 데이터셋의 존재하는 컬럼의 데이터만 복사됩니다.<br>
 * 복사시 추가되는 데이터는 INSERT 상태입니다.
 * @param {cpr.core.AppInstance} app 앱인스턴스 
 * @param {#dataset} psSourceDataSetId DataSet Id
 * @param {#dataset} psTargetDataSetId 복사 데이터가 들어갈 타겟 DataSet Id.
 * @param {String} psFilterCondition? 복사시 필터링할 조건. (생략시 전체 복사, target의 기존 데이터는 삭제됨)<br>
 * 				   "STUD_DIV_RCD == 'CT101REGU' && SA_NM == '컴퓨터정보과'" (동일한 로우가 있을경우 복사안함)
 * @return {Boolean}
 */
DataSetKit.prototype.copyToDataSet = function(app, psSourceDataSetId, psTargetDataSetId, psFilterCondition){
	var vcSourceDataSet = app.lookup(psSourceDataSetId);
	var vcTargetDataSet = app.lookup(psTargetDataSetId);
	if(!psFilterCondition) vcTargetDataSet.clear();
	else{
		var vaFindRow = vcTargetDataSet.findAllRow(psFilterCondition);
		if(vaFindRow != null && vaFindRow.length > 0){
			return;
		}
	}
	return vcSourceDataSet.copyToDataSet(vcTargetDataSet, psFilterCondition);
};

/**
 * rowData를 입력받아 원하는 특정 row index의 앞이나 뒤에 신규 row를 추가합니다.<br>
 * <b>INSERTED 이벤트가 발생합니다.</b>
 * @param {cpr.core.AppInstance} app 앱인스턴스 
 * @param {#dataset} psDataSetId DataSet Id
 * @param {Number} pnIndex index 삽입하고자 하는 row index
 * @param {Boolean} pbAfter 해당 row index의 뒤에 삽입할지 여부. (true:뒤 / false:앞)
 * @param {cpr.data.RowConfigInfo} poRowData 추가할 row data. (key: header명, value: value 를 갖는 json data)<br>
{[columnName: string]: string | number | boolean}
*  @return {cpr.data.Row} 추가한 신규 Row 객체.
 */
DataSetKit.prototype.insertRow = function(app, psDataSetId, pnIndex, pbAfter, poRowData){
	/** @type cpr.data.DataSet */
	var vcDataSet = app.lookup(psDataSetId);
	if(poRowData == null){
		return vcDataSet.insertRow(pnIndex, pbAfter);
	}else{
		return vcDataSet.insertRowData(pnIndex, pbAfter, poRowData);
	}

};

/**
 * 데이터맵(DataMap) 데이터 컴포넌트 유틸
 * @param {common.AppKit} appKit
 */
function DataMapKit(appKit){
	this._appKit = appKit;
}

/**
 * 입력 받은 columnName에 해당되는 데이터를 반환
 * @param {cpr.core.AppInstance} app 앱인스턴스
 * @param {#datamap} psDataMapId 데이터맵 Id
 * @param {#column} psColumnName 값을 가져오고자 하는 컬럼명
 * @return {Object} 해당 데이터
 * 					header dataType에 따라 반환타입이 정해짐.<br>
					해당 columnName의 column이 존재 할 경우 해당 값 반환<br>
					해당 columnName의 값이 없을 경우 ""(공백) 반환<br>
					해당 columnName이 존재하지 않을 경우 null 반환<br>
 */
DataMapKit.prototype.getValue = function(app, psDataMapId, psColumnName){
	/** @type cpr.data.DataMap */
	var vcDataMap = app.lookup(psDataMapId);
	return vcDataMap.getValue(psColumnName);
};

/**
 * 입력 받은 columnName에 해당되는 데이터를 수정
 * @param {cpr.core.AppInstance} app 앱인스턴스
 * @param {#datamap} psDataMapId 데이터맵 Id
 * @param {#column} psColumnName 값을 가져오고자 하는 컬럼명
 * @param {String} value 수정할 value 값
 * @return {Boolean} 값 수정 성공 여부
 */
DataMapKit.prototype.setValue = function(app, psDataMapId, psColumnName, psValue){
	/** @type cpr.data.DataMap */
	var vcDataMap = app.lookup(psDataMapId);
	return vcDataMap.setValue(psColumnName, psValue);
};

/**
 * 데이터를 모두 제거합니다.
 * (data가 모두 공백으로 설정됩니다.)
 * @param {cpr.core.AppInstance} app 앱인스턴스
 * @param  {#datamap} psDataMapId 데이터맵 Id
 */
DataMapKit.prototype.clear = function(app, psDataMapId){
	/** @type cpr.data.DataMap */
	var vcDataMap = app.lookup(psDataMapId);
	vcDataMap.clear();
};

/**
 * 데이터를 모두 초기화합니다.
 * (data 모두 초기 설정값으로 설정됩니다.)
 * @param {cpr.core.AppInstance} app 앱인스턴스
 * @param  {#datamap} psDataMapId 데이터맵 Id
 */
DataMapKit.prototype.reset = function(app, psDataMapId){
	/** @type cpr.data.DataMap */
	var vcDataMap = app.lookup(psDataMapId);
	vcDataMap.reset();
};

/**
 * 현재 데이터맵의 데이터를 타겟 데이터맵으로 복사합니다. <br>
 * 복사시 타겟 데이터맵의 alterColumnLayout 속성에 따라 복사방법의 설정됩니다. 
 * @param {cpr.core.AppInstance} app 앱인스턴스
 * @param {#datamap} psSourceDataMapId 데이터맵 Id
 * @param {#datamap} psTargetDataMapId 복사 데이터가 들어갈 타겟 맵 ID.
 * @return {Boolean}
 */
DataMapKit.prototype.copyToDataMap = function(app, psSourceDataMapId, psTargetDataMapId){
	var vcDataMap = app.lookup(psSourceDataMapId);
	var vcTargetDataMap = app.lookup(psTargetDataMapId);
	return vcDataMap.copyToDataMap(vcTargetDataMap);
};

/**
 * Column을 추가합니다.<br>
 * Header정보에 추가되며, data가 있는 경우 row data에도 해당 column data가 추가됩니다.
 * @param {#datamap} psDataMapId 데이터맵 ID
 * @param {String} psColumnNm 추가하려는 Header 명
 * @param {String} psValue? 초기값 설정
 * @return {Boolean} 컬럼 추가 성공 여부
 */
DataMapKit.prototype.addColumn = function(app, psDataMapId, psColumnNm, psValue){
	var vcDataMap = app.lookup(psDataMapId);
	return vcDataMap.addColumn(new cpr.data.header.DataHeader(psColumnNm, "string"), psValue);
};

/**
 * Column을 삭제합니다.
 * @param {cpr.core.AppInstance} app 앱인스턴스
 * @param {#datamap} psDataMapId 데이터맵 ID
 * @param {#column} psColumnName 삭제할 컬럼 명
 * @return {Boolean} 컬럼 삭제 성공 여부
 */
DataMapKit.prototype.deleteColumn = function(app, psDataMapId, psColumnName){
	var vcDataMap = app.lookup(psDataMapId);
	return vcDataMap.deleteColumn(psColumnName);
};

/**
 * 그리드(Grid) 컨트롤 유틸
 * @constructor
 * @param {common.AppKit} appKit
 */
function GridKit(appKit){
	this._appKit = appKit;
//	this._userAttr = {
//		  bindDataFormId : "bindDataFormId"
//		, ignoreModify :    "ignoreModify"
//		, columnMoveFix :    "columnMoveFix"
//		, columnResizeFix :    "columnResizeFix"
//		, columnSortFix :    "columnSortFix"
//		, clickModeFix :    "clickModeFix"
//		, enableCheckDuplicatePk :    "enableCheckDuplicatePk"
//	}
};

/**
 * 그리드를 초기화한다.<br/>
 * 1. 상태 컬럽 바인드 지정  (N, U, D)<br/>
 * 2. 인덱스컬럼 text및 css지정<br/>
 * 3. 소트 컬럼 자동지정 <br/>
 * 4. 읽기 전용 컬럼 헤더 Text 변경<br/>
 * 5. 그리드, 프리폼 PK컬럼 enable 설정
 *   - 그리드의 선택형 컨텍스트 사용 그룹은 그리드의 사용자속성 bindDataFormId 지정 필수
 * <br/>
 * 6. update이벤트 추가 ( 저장후 그리드의 마지막 작업행을 찾기 위함)<br/>
 * 7. 그리드 매핑 데이터셋에 load 이벤트 추가 (그리드의 마지막행 찾기, 조회 건수 업데이트)<br/>
 * 8. 그리드 selection-dispose 이벤트 추가(삭제로 인한, 선택행이 없는 경우... 이전 행 자동 선택하도록(행 추가 -> 삭제시))<br/>
 * 9. enableCheckDuplicatePk 사용자정의 속성에 따른 PK 중복체크<br/>
 * 10. 그리드 contextmenu 이벤트 추가 (찾기, 정렬, 필터, 컬럼숨김)<br/>
 * 그리드에 대한 공통 로직 및 이벤트 추가 용도<br/>
 *  - appHeader에서 공통 적용됨<br/>
 *  - 사이트별 Customizing 필요<br/>
 * @param {cpr.core.AppInstance} app 앱인스턴스
 * @param {#grid | Array} paGridId 그리드 ID
 * @return void
 */
GridKit.prototype.init = function(app, paGridId){
	
	if(!(paGridId instanceof Array)){
		paGridId = [paGridId];
	}
	
	//Index 컬럼 반환
	function getIndexDetailColumn(poGrid){
		var detail = poGrid.detail;
		var column;
		for(var i=0, len=detail.cellCount; i<len; i++){
			column = detail.getColumn(i);
			if(column.columnType == "rowindex"){
				return column;
			}
		}
		return null;
	}
	
	var _app = app;
	var _appKit = this._appKit;
	for (var i=0, len=paGridId.length; i <len; i++) {
		/**
		 * @type cpr.controls.Grid
		 */
		var vcGrid = (paGridId[i] instanceof cpr.controls.Grid) ? paGridId[i] : _app.lookup(paGridId[i]);
		if(vcGrid == null) continue;
		
		var isNotcolumnSortable = ValueUtil.fixBoolean(vcGrid.userAttr("columnSortFix"));
		
		var vcDataSet =  vcGrid.dataSet;
		vcDataSet._gridId = vcGrid.id;
		
		//상태컬럼
		var statusColumn = this.getHeaderStatusColumn(app, vcGrid.id);
		if(statusColumn != null){
			// Status 컬럼 숨김
			//statusColumn.visible = false;
			var detailColumn = vcGrid.detail.getColumn(statusColumn.colIndex);
			var statusColumnCtrl = detailColumn ? detailColumn.control : null;
			if(statusColumnCtrl){
				statusColumnCtrl.bind("value").toExpression("switch(getStateString()){ case 'I' : 'N'  case 'U' : 'U'  case 'D' : 'D'  default : ''}");
				statusColumnCtrl.style.css({"text-align" : "center"});
			}
		}
		//인덱스컬럼
		var indexColumn = getIndexDetailColumn(vcGrid);
		if(indexColumn != null){
			indexColumn.style.css({"text-align" : "center"});
			var hIndexColumn = vcGrid.header.getColumn(indexColumn.colIndex);
			if(hIndexColumn && hIndexColumn.text != "No") hIndexColumn.text = "No";
		}
		
		//소트 컬럼 자동지정
		if(isNotcolumnSortable != true){
			var dColumn, hColumn, vaHColumns;
			var vsFixColSort = "";
			for(var j=0, jlen=vcGrid.detail.cellCount; j<jlen; j++){
				dColumn = vcGrid.detail.getColumn(j);
				if(dColumn.columnType == "checkbox" || dColumn.columnType == "rowindex") continue;
				if(dColumn.columnName == null || dColumn.columnName == "") continue;
				
				vsFixColSort = dColumn.control ? dColumn.control.userAttr("columnSortFix") : ""; //컬럼 정렬무시옵션
				vaHColumns = vcGrid.header.getColumnByColIndex(dColumn.colIndex, dColumn.colSpan);
				if(vaHColumns){
					vaHColumns.forEach(function(/* cpr.controls.gridpart.GridColumn */ column){
						if(vsFixColSort !== "Y"){
							column.sortable = true;
						}
						if(column.targetColumnName == null || column.targetColumnName == "") {
							column.targetColumnName = dColumn.columnName;
						}
					});
				}
			}
		}
		/*
		//읽기 전용 컬럼 헤더 Text 변경
		var vbGReadOnly = vcGrid.readOnly === true ? true : false;
		var readHTextClass = "readonly";
		var readHColor = "#959495";
		if(vbGReadOnly){
			vcGrid.style.header.css({color: readHColor});
			for(var k=0, klen=vcGrid.detail.cellCount; k<klen; k++){
				var dColumn = vcGrid.detail.getColumn(k);
				if(dColumn.control){
					if(dColumn.controlType == "numbereditor"){
						if(dColumn.control.spinButton != false && dColumn.control.style.css("text-align") == ""){
							dColumn.control.style.css({"text-align":"center"});
						}
					}
					if((dColumn.control.format === "0000" || dColumn.control.format === "9999") && dColumn.control.max == 0){
						dColumn.control.max = 1.7976931348623157E308;
					}
				}
			};
		}else{
			var vaHeaderColumn = null;
			for(var k=0, klen=vcGrid.detail.cellCount; k<klen; k++){
				var dColumn = vcGrid.detail.getColumn(k);
				if(dColumn.columnType == "rowindex"){
					vaHeaderColumn = vcGrid.header.getColumnByColIndex(dColumn.colIndex, dColumn.colSpan);
					vaHeaderColumn.forEach(function(column){
						column.style.addClass(readHTextClass);
					});
				}else if(dColumn.control == null || dColumn.controlType == "output" || dColumn.controlType == "image" || dColumn.controlType == "button"){
					vaHeaderColumn = this.getHeaderColumnByColIdex(app, vcGrid.id, dColumn.colIndex);
					vaHeaderColumn.forEach(function(column){
						column.style.addClass(readHTextClass);
					});
				}else if((dColumn.control.getBindInfo("readOnly") == undefined && dColumn.control.readOnly === true) || (dColumn.control.getBindInfo("enabled") == undefined && dColumn.control.enabled === false)){
					vaHeaderColumn = this.getHeaderColumnByColIdex(app, vcGrid.id, dColumn.colIndex);
					vaHeaderColumn.forEach(function(column){
						if(column.style.getClasses().indexOf("require") == -1){
							column.style.addClass(readHTextClass);
						}
					});
				}
				
				if(dColumn.control){
					if(dColumn.controlType == "numbereditor" && dColumn.control.spinButton != false && dColumn.control.style.css("text-align") == ""){
						dColumn.control.style.css({"text-align":"center"});
					}
				}
			}
		}
		*/
		//헤더 컬럼 Visible 원래값 저장
		var vsHidenColumnIdxs = "";
		for(var k=0, klen=vcGrid.header.cellCount; k<klen; k++){
			if(vcGrid.header.getColumn(k).visible === false){
				vsHidenColumnIdxs += k+",";
			}
		}
		vcGrid.userAttr("originHiddenColumns", vsHidenColumnIdxs);
		
		//그리드 PK컬럼 enable 설정
		var vaPkColumnNames = ValueUtil.split(vcDataSet.info, ",");
		var vsDataBindCtxId = vcGrid.userAttr("bindDataFormId");
		vaPkColumnNames.some(function(value, idx){
			if(value == "") return false;
			//그리드 PK컬럼 설정(필수 스타일, 활성화/비활성화 바인딩 처리등)
			var columns = vcGrid.detail.getColumnByName(value);
			var vaHColumns = _appKit.Grid.getHeaderColumn(_app, vcGrid.id, value);
			if(columns != null && columns.length > 0){
				columns.forEach(function(col){
					if(col.control){
						if(col.control.userAttr("editablePK") !== "Y"){
							col.control.bind("enabled").toExpression("getStateString() == 'I' ? true : false");
							col.control.userAttr("required", "Y");
							if(vaHColumns){
								vaHColumns.forEach(function(/* cpr.controls.gridpart.GridColumn */ column){
									column.style.setClasses("require");
								});
							}
							
						}
					}
				});
			}
		});
		
		//프리폼 PK 컬럼 설정 
		if(!ValueUtil.isNull(vsDataBindCtxId) && vaPkColumnNames.length > 0){
			var freeformes = ValueUtil.split(vsDataBindCtxId, ",");
			freeformes.forEach(function(/* eachType */ formId){
				/**@type cpr.controls.Container */
				var freeform = _app.lookup(formId);
				if(freeform != null){
					var vaChildCtrls = freeform.getAllRecursiveChildren();
					vaPkColumnNames.some(function(value, idx){
						if(value == "") return false;
						vaChildCtrls.some(function(ctrl, ix){
							if(ctrl.type == "output") return false;
							if(ctrl.userAttr("ignorePk") == "Y") return false;
							if(ctrl.userAttr("editablePK") == "Y") return false;
							var bind = ctrl.getBindInfo("value");
							if(bind && bind.type == "datacolumn" && value == bind.columnName){
								ctrl.bind("enabled").toExpression("getStateString() == 'I' ? true : false");
								ctrl.userAttr("required", "Y");
							}
						});
					});	
				}
			});
		}
		var vsItemKey = app.id + vcGrid.id;
		var layout = localStorage.getItem(vsItemKey);
		if(!ValueUtil.isNull(layout)){
			vcGrid.setColumnLayout(JSON.parse(layout));	
		}
		//마지막 작업행을 찾기위해서...그리드 findRow 설정
		vcDataSet.addEventListener("update", function(/* cpr.events.CDataEvent */e){
			/** 
			 * @type cpr.data.DataSet
			 */
			var dataset = e.control;
			var rowIndex = e.row.getIndex();
			var row = e.row;
			var vaPkColumns = ValueUtil.split(dataset.info, ",");
			if(vaPkColumns.length < 1){
				dataset._findRowCondition = null;
			}else{
				var vaTempCond = [];
				vaPkColumns.forEach(function(column){
					vaTempCond.push(column + "==" + "'" + dataset.getValue(rowIndex, column) + "'");
				});
				dataset._findRowCondition = vaTempCond.length > 0 ? vaTempCond.join(" && ") : null;
			}
			
		});
		
		//그리드에 바인딩된 데이터셋(Dataset)이 로드될 때 처리
		//마지막행 찾기, 조회 건수 업데이트
		vcDataSet.addEventListener("load", function(/* cpr.events.CDataEvent */e){
			/** @type cpr.data.DataSet */
			var dataset = e.control;
			/** @type cpr.controls.Grid */
			var grd = dataset.getAppInstance().lookup(dataset._gridId);
			if(grd == null) return;
			
			//대상 그리드가 정렬된 상태라면... 정렬을 푼다.
			if(dataset.getSort() != ""){
				dataset.clearSort();
			}
			
			//마지막 작업행 찾기
			if(dataset.getRowCount() > 0) {
				if(dataset._findRowCondition){
					var row = dataset.findFirstRow(dataset._findRowCondition);
					if(row) {
						if(grd.selectionUnit == "cell"){
							grd.focusCell(row.getIndex(), 0);
						}else{
							setTimeout(function(){
								_appKit.Grid.selectRow(_app, grd.id, row.getIndex());
							}, 200);
						}
					}else{
						grd.selectionUnit == "cell" ? grd.focusCell(0, 0) : _appKit.Grid.selectRow(_app, grd.id, 0);
					}
				}else{
					if(grd.selectionUnit == "cell") grd.focusCell(0, 0); else _appKit.Grid.selectRow(_app, grd.id, 0);
				}
			}else{
			}
			
			//마지막 작업행 정보 Clear
			dataset._findRowCondition = null;
			
			//그리드 타이틀 영역의 데이터 건수 업데이트
			var titles = _appKit.Group.getAllChildrenByType(_app, "udc.com.comTitle");
			for(var i=0, len=titles.length; i<len; i++){
				if(titles[i] == null) continue;
				if(titles[i].getAppProperty("ctrl") == null) continue;
				if(titles[i].getAppProperty("ctrl").id == grd.id){
					titles[i].setAppProperty("rowCount", dataset.getRowCount());
					break;
				}
			}
		});
		
		vcDataSet.addEventListener("filter", function(e){
			/** @type cpr.data.DataSet */
			var dataset = e.control;
			/** @type cpr.controls.Grid */
			var grd = dataset.getAppInstance().lookup(dataset._gridId);
			if(grd == null) return;
			
			var titles = _appKit.Group.getAllChildrenByType(_app, "udc.com.comTitle");
			for(var i=0, len=titles.length; i<len; i++){
				if(titles[i] == null) continue;
				if(titles[i].getAppProperty("ctrl") == null) continue;
				if(titles[i].getAppProperty("ctrl").id == grd.id){
					titles[i].setAppProperty("rowCount", dataset.getRowCount());
					break;
				}
			}
		});
		//행 삭제로 인한, 선택행이 없는 경우... 이전 행 자동 선택하도록(행 추가 -> 삭제시)
		vcGrid.addEventListener("selection-dispose", function(/* cpr.events.CGridEvent */e){
			var oldSelection = e.oldSelection;
			if (oldSelection != null && oldSelection.length > 0 && oldSelection[0] > -1 && oldSelection[0] < e.control.rowCount) {
				e.control.selectRows(oldSelection[0]);
			}
		});
		
		//그리드 키다운(Up/Down) 이벤트 처리 - 현재 포커싱된 그리드 객체정보 저장
//		vcGrid.addEventListener("keydown", function(/* cpr.events.CKeyboardEvent */ e){
//			if(e.keyCode == cpr.events.KeyCode.UP || e.keyCode == cpr.events.KeyCode.DOWN){
//				_appKit.getMainApp(e.control.getAppInstance()).__focusGrid = e.control;
//			}
//		});
	}
};

/**
 * 그리드 특정 cell의 값을 변경한다. (detail 영역) <br>
 * (주의) for문 등으로 대량의 데이터를 setCellValue 호출하는 경우에는 pbEmitEvent값을 false로 주어서, 스크립트 실행시간을 줄여줄 수 있다.
 * @param {cpr.core.AppInstance} app 앱인스턴스
 * @param {#grid} psGridId  그리드 아이디
 * @param {String | Number} psDataColmnId cellIndex 값을 변경하고자 하는 cell의 cell index. (또는 binding된 data column name)
 * @param {String} psValue 변경하고자 하는 값.
 * @param {Number} pnRowIndex? 값을 변경하고자 하는 cell의 row index.
 *                 (defalut : 선택된 rowindex)
 * @param {Boolean} pbEmitEvent? 이벤트(before-update, update)를 발생시킬지 여부.
 * @return void
 */
GridKit.prototype.setCellValue = function(app, psGridId, psDataColmnId, psValue, pnRowIndex, pbEmitEvent){
	/** @type cpr.controls.Grid */
	var vcGrid = app.lookup(psGridId);
	var rowIndex = pnRowIndex == null ? this.getIndex(app, psGridId) : pnRowIndex;
	
	vcGrid.setCellValue(rowIndex, psDataColmnId, psValue, pbEmitEvent);
};

/**
 * 그리드 특정 cell의 값을 반환한다.(detail 영역) 
 * @param {cpr.core.AppInstance} app 앱인스턴스
 * @param {#grid} psGridId  그리드 ID
 * @param {String | Number} psDataColmnId cellIndex 값을 가져오고자 하는 cell의 cell index. (또는 binding된 data column name)
 * @param {Number} pnRowIdx? 값을 변경하고자 하는 cell의 row index.
 *                 (defalut : 선택된 rowindex)
 * @return {Object} 해당 cell의 값.
 */
GridKit.prototype.getCellValue = function(app, psGridId, psDataColmnId, pnRowIndex){
	/**@type cpr.controls.Grid */
	var vcGrid = app.lookup(psGridId);
	var rowIndex = pnRowIndex == null ? this.getIndex(app, psGridId) : pnRowIndex;
	return vcGrid.getCellValue(rowIndex, psDataColmnId);
};

/**
 * 그리드 특정 row cell의 origin 값을 반환한다.(detail 영역) 
 * @param {cpr.core.AppInstance} app 앱인스턴스
 * @param {#grid} psGridId  그리드 ID
 * @param {String|Number} psDataColmnId cellIndex 값을 가져오고자 하는 cell의 cell index. (또는 binding된 data column name)
 * @param {Number} pnRowIndex? 값을 가져오고자 하는  cell의  행인덱스<br/>
 *                 defalut : 선택된 rowindex
 * @return {any} 해당 cell의 값.
 */
GridKit.prototype.getOriginCellValue = function(app, psGridId, psDataColmnId, pnRowIndex){
	/**@type cpr.controls.Grid */
	var grid = app.lookup(psGridId);
	var rowIndex = pnRowIndex == null ? this.getIndex(app, psGridId) : pnRowIndex;
	return grid.dataSet.getOriginalValue(rowIndex, psDataColmnId);
};

/**
 * 그리드 특정 row index의 GridRow객체를 반환한다.
 * @param {cpr.core.AppInstance} app 앱인스턴스
 * @param {#grid} psGridId  그리드 ID
 * @param {Number} pnRowIndex? 값을 가져오고자 하는  cell의  행인덱스<br/>
 *                 defalut : 선택된 rowindex
 * @return {cpr.controls.provider.GridRow} 해당 index의 GridRow 객체
 */
GridKit.prototype.getDataRow = function(app, psGridId, pnRowIndex){
	/**@type cpr.controls.Grid */
	var grid = app.lookup(psGridId);
	var rowIndex = pnRowIndex == null ? this.getIndex(app, psGridId) : pnRowIndex;
	return grid.getDataRow(rowIndex);
};

/**
 * 현재 연결된 데이터 구조체에 sort 조건을 변경하고, sort 적용<br>
 * Grid.sort(app, "grd1", "a, b DESC")
 * @param {cpr.core.AppInstance} app 앱인스턴스
 * @param {#grid} psGridId  그리드 아이디
 * @param {String} psCondition sort 조건식
 * @return void
 */
GridKit.prototype.sort = function(app, psGridId, psCondition){
	/** @type cpr.controls.Grid */
	var vcGrid = app.lookup(psGridId);
	vcGrid.clearSort();
	vcGrid.sort(psCondition);
	vcGrid.redraw();
};

/**
 * 그리드 초기화(데이터 clear)
 * @param {cpr.core.AppInstance} app 앱인스턴스
 * @param {#Grid | Array} paGridId 그리드 ID
 * @return void
 */
GridKit.prototype.reset = function(app, paGridId){
	if(!(paGridId instanceof Array)){
		paGridId = [paGridId];
	 }
	
	for (var i = 0; i < paGridId.length; i++) {
		var vcGrid = app.lookup(paGridId[i]);
		vcGrid.dataSet.clear();
		vcGrid.redraw();
	}
};


/**
 * 현재 연결된 데이터 구조체에 filter 조건을 변경하고, filter합니다.<br/>
 * Grid.filter(app, "grd1", "age >= 20")<br/>
 * 	=> "age"컬럼의 값이 20이상인 값만 필터링합니다.<br/>
 * Grid.filter(app, "grd1", "name ^= '김'")<br/>
 * 	=> "name"컬럼의 값이 '김'으로 시작하는 값만 필터링합니다.
 * @param {cpr.core.AppInstance} app 앱인스턴스
 * @param {#Grid} psGridId 그리드 아이디
 * @param {String} psCondition filter 조건식.
 * @return void
 */
GridKit.prototype.filter = function(app, psGridId, psCondition){
	/** @type cpr.controls.Grid */
	var vcGrid = app.lookup(psGridId);
	var vsFilter = vcGrid.getFilter();
	if(!ValueUtil.isNull(vsFilter)){
		vcGrid.clearFilter();	
	}
	vcGrid.filter(psCondition);
};


/**
 * 그리드의 변경사항 유/무를 반환를 반환한다.
 * @param {cpr.core.AppInstance} app 앱인스턴스
 * @param {#Grid | Array} paGridId 그리드 ID
 * @param {"MSG" | "CRM" | "SAVE"} psAftMsg? 
 *						MSG : 변경사항 내역이 없을 경우 '변경된 내역이 없습니다.' 메세지 출력<br>
 *  					CRM : 변경내역이 존재할경우 '변경사항이 반영되지 않았습니다. 계속 하시겠습니까?' confirm 메시지출력 <br>
 * 						SAVE : 변경된 데이터가 있습니다. 저장 하시겠습니까? confirm 메시지출력
 * @param {cpr.events.CSelectionEvent} event? 이벤트 객체
 * @param {Function} poCallBackFunc? 콜백함수
 * @return {Boolean} 데이터 변경 여부
 */
GridKit.prototype.isModified = function(app, paGridId, psAftMsg, event, poCallBackFunc){
	//유효성 체크로 인해서 행선택 변경 발생으로 변경여부 체크가 되는 경우는 SKIP...
	if(event != null && event.control != null && event.control.userAttr("selectionChangeByValidation") === "true"){
		event.control.removeUserAttr("selectionChangeByValidation");
		return false;
	}
	
	if(!(paGridId instanceof Array)){
		paGridId = [paGridId];
	}
	psAftMsg = psAftMsg == null ? "" : psAftMsg;
	
	var modify = false;
	var vcGrid = null;
	for (var i=0, len=paGridId.length; i<len; i++) {
		if(paGridId[i] instanceof cpr.controls.Grid) { 
			vcGrid = paGridId[i];
		}else{
			vcGrid = app.lookup(paGridId[i]);
		}
		
		//사용자 정의 속성에 modify 무시 속성이 있는 경우... SKIP
		if(vcGrid.userAttr("ignoreModify") === "Y") continue;
		if(vcGrid.dataSet == null) continue;
		
		if (vcGrid.dataSet.isModified()) {
			modify = true;
			break;
		}
	}
	
	if(modify){
		if(psAftMsg.toUpperCase() == "CRM"){//변경사항이 반영되지 않았습니다. 계속 하시겠습니까? confirm
			if(!this._appKit.Msg.confirm("CRM-M003", [vcGrid.fieldLabel])) return true;
			else return false;
		}
	}else{
		if(psAftMsg.toUpperCase() == "MSG"){//변경된 내역이 없습니다.
			this._appKit.Msg.notify(app, "INF-M006");
		}
	}
	
	return modify;
};

/**
 * 해당 그리드의 체크된 행(Row)이나 선택된 행의 인덱스를 반환한다.(check된 행이 있는 경우, 체크된 행이 우선적으로 반환된다.)
 * @param {cpr.core.AppInstance} app 앱인스턴스
 * @param {#grid} psGridId  그리드 ID
 * @return {Number[]} 선택된 row index 배열
 */
GridKit.prototype.getCheckOrSelectedRowIndex = function(app, psGridId){
	/** @type cpr.controls.Grid */
	var vcGrid = app.lookup(psGridId);
	if(vcGrid.rowCount < 1) return [];
	
	var vaChkIndexs = vcGrid.getCheckRowIndices();
	if(vaChkIndexs != null && vaChkIndexs.length > 0 ){
		return vaChkIndexs;
	}else{
		if(vcGrid.selectionUnit == "cell"){
			var vaSelIndices = vcGrid.getSelectedIndices();
			var rowIndices = [];
			for(var i=0, len=vaSelIndices.length; i<len; i++){
				rowIndices.push(vaSelIndices[i].rowIndex);
			}
			return rowIndices;
		}else{
			return vcGrid.getSelectedRowIndices();
		}
	}
};

/**
 * 해당 그리드의 체크된 행(Row)의 인덱스를 반환한다.
 * @param {cpr.core.AppInstance} app 앱인스턴스
 * @param {#grid} psGridId  그리드 ID
 * @return {Number[]} 선택된 row index 배열.
 */
GridKit.prototype.getCheckedRowIndex = function(app, psGridId){
	/** @type cpr.controls.Grid */
	var vcGrid = app.lookup(psGridId);
	if(vcGrid.rowCount < 1) return [];
	
	var vaChkIndexs = vcGrid.getCheckRowIndices();
	if(vaChkIndexs != null && vaChkIndexs.length > 0 ){
		return vaChkIndexs;
	}else{
		return [];
	}
};

/**
 * 그리드 내 변경된 특정 행(Row)의 데이터를 원상태로 복구한다.
 * @param {cpr.core.AppInstance} app 앱인스턴스
 * @param {#grid} psGridId  그리드 ID
 * @param {Number} pnRowIndex? 원복하고 싶은 row index
 *                 (default : 현재 체크 및 선택된 로우)
 * @return void
 */
GridKit.prototype.revertRowData = function(app, psGridId, pnRowIndex){
	/**@type cpr.controls.Grid */
	var vcGrid = app.lookup(psGridId);
	
	if(pnRowIndex == null){
		var vaSelectIdx = this.getCheckOrSelectedRowIndex(app, psGridId);
		if(vaSelectIdx.length < 1){
			return false;
		}
		var vcDataSet = vcGrid.dataSet;
		var rowIndex;
		for(var i = vaSelectIdx.length - 1; i >= 0; i--) {
			rowIndex = vaSelectIdx[i];
			vcGrid.setCheckRowIndex(rowIndex, false); //체크 해제
			var vsStatus = "";
		    if (vcDataSet != null ){
				vsStatus = vcDataSet.getRowStateString(rowIndex);			    	
		    }
			vcGrid.revertRowData(rowIndex); //데이터 원복
			//신규 행이면...
			if (vsStatus == "I") {
				if(rowIndex == vcGrid.getRowCount()){
					if(rowIndex == 0){
						vcGrid.clearSelection();
					}else{
						this.selectRow(app, vcGrid.id, rowIndex-1);
					}
				}else{
					this.selectRow(app, vcGrid.id, rowIndex);
				}
			}
		}
	}else{
		vcGrid.revertRowData(pnRowIndex);
	}
};

/**
 * 그리드 내에서 변경된 모든 데이터를 원상태로 복구한다.
 * @param {cpr.core.AppInstance} app 앱인스턴스
 * @param {#grid} psGridId  그리드 ID
 */
GridKit.prototype.revertAllData = function(app, psGridId){
	var vcGrid = app.lookup(psGridId);
	vcGrid.revertData();
};

/**
 * 그리드의 특정 행 데이터를 그룹 폼의 데이터셋에 복사한다.<br/>
 * (사용처) 그리드의 데이터셋을 바인딩하여 사용하지 않는 경우에... 그리드의 선택된 행 데이터를 프리폼/그룹에 매핑하기 위한 용도임
 * @param {cpr.core.AppInstance} app 앱인스턴스
 * @param {#grid} psGridId 그리드ID
 * @param {#container} psTargetForm 복사할 Group Form ID
 * @param {Number} pnRowIdx 복사할 그리드 로우 인덱스 
 * @return void
 */
GridKit.prototype.copyRowToGroupForm = function(app, psGridId, psTargetForm, pnRowIdx){
	var vcGrid = app.lookup(psGridId);
	var rowIndex = pnRowIdx == null ? this.getIndex(app, psGridId) : pnRowIdx;
	
	var vcGrpFrm = app.lookup(psTargetForm);
	vcGrpFrm.getBindContext().rowIndex = rowIndex;
	vcGrpFrm.redraw();
};

/**
 * 소스(Source) 그리드의 선택된 행(Row)의 데이터를 타겟(Target) 그리드로 복사한다.<br>
 * 단, 복사할려는 데이터가 타겟 그리드에 이미 존재하는 경우에는 복사하지 않는다.(중복 복사 방지)
 * @param {cpr.core.AppInstance} app 앱인스턴스
 * @param {#grid} psSrcGridId 그리드ID
 * @param {#grid} psDesGridId 복사할 그리드 ID
 * @param {Number} pnSrcRowIdx? 그리드 로우 인덱스<br>
 *                 default : 체크된 row 나 선택된 row 인덱스를 취득 (check우선)
 * @return void
 */
GridKit.prototype.copyToGridData = function(app, psSrcGridId, psDesGridId, pnSrcRowIdx){
	var vcSrcGrid = app.lookup(psSrcGridId);
	var vcDesGrid = app.lookup(psDesGridId);
	
	var rowIndexs = pnSrcRowIdx == null ? this.getCheckOrSelectedRowIndex(app, psSrcGridId) :  pnSrcRowIdx;
	if(!(rowIndexs instanceof Array)){
		rowIndexs = [rowIndexs];
	}
	//복사할 ROW가 없으면...SKIP
	if (rowIndexs.length < 1) return;
	
	var srcDataSet = vcSrcGrid.dataSet;
	var tarDataSet = vcDesGrid.dataSet;
	for (var i=0, len=rowIndexs.length; i<len; i++) {
		//신규 후 삭제된 행은 제외
		if(srcDataSet.getRowState(rowIndexs[i]) == cpr.data.tabledata.RowState.INSERTDELETED) continue;
		
		var data = srcDataSet.getRowData(rowIndexs[i]);
		// json 형식의 row의 데이터
		var str = [];
		// 이미 존재하는 row를 찾기 위해 row의 모든 column을 비교하는 조건 제작
		// str = "column1 == 'value1' && column2 == 'value2'..."
		for ( var key in data) {
			str.push(key + " == '" + data[key] + "'");
		}
		str = str.join(" && ");
		// 조건에 맞는 row 탐색
		var findRow = tarDataSet.findAllRow(str);
		// 조건에 해당하는 row가 없다면 target 그리드에 선택된 row를 추가
		if (findRow == null || findRow.length < 1) {
			tarDataSet.addRowData(data);
		}
	}
	
	vcDesGrid.redraw();
};

/**
 * 소스(Source) 그리드의 모든 행(Row)의 데이터를 타겟(Target) 그리드로 복사한다.<br>
 * 단, 복사할려는 데이터가 타겟 그리드에 이미 존재하는 경우에는 복사하지 않는다.(중복 복사 방지)
 * @param {cpr.core.AppInstance} app 앱인스턴스
 * @param {#grid} psSrcGridId 그리드ID
 * @param {#grid} psDesGridId 복사할 그리드 ID
 * @return void
 */
GridKit.prototype.copyToAllGridData = function(app, psSrcGridId, psDesGridId){
	var vcSrcGrid = app.lookup(psSrcGridId);

	var indices = [];
	for (var i=0, len=vcSrcGrid.rowCount; i<len; i++) {
		indices.push(i);
	}
	
	this.copyToGridData(app, psSrcGridId, psDesGridId, indices);
};

/**
 * 그리드 작업행을 찾기 위한 조건을 설정한다. 데이터셋에 설정된 PK정보를 기준으로 자동 지정된다.
 * @param {cpr.core.AppInstance} app 앱인스턴스
 * @param {#grid} psGridId 그리드ID
 * @param {Number} pnRowIndex? 그리드 로우(Row) 인덱스
 * @param {Boolean} pbForce? 기존에 로우에 대한 정보가 있으면 SKIP 여부
 * @return void
 */
GridKit.prototype.markFindRowCondition = function(app, psGridId, pnRowIndex, pbForce){
	/** @type cpr.controls.Grid */
	var vcGrid = app.lookup(psGridId);
	var voDataSet = vcGrid.dataSet;
	
	if(pbForce != undefined && ValueUtil.fixBoolean(pbForce) === true){
		if(!ValueUtil.isNull(voDataSet._findRowCondition)) return;
	}
	
	var rowIndex = !ValueUtil.isNull(pnRowIndex) ? pnRowIndex : this.getIndex(app, psGridId);
	
	var vaTempCond = [];
	var vaPkColumns = ValueUtil.split(voDataSet.info, ",");
	vaPkColumns.forEach(function(column){
		vaTempCond.push(column + "==" + "'" + voDataSet.getValue(rowIndex, column) + "'");
	});
	
	if(vaTempCond.length > 0){
		voDataSet._findRowCondition = vaTempCond.join(" && ");
	}else{
		voDataSet._findRowCondition = null;
	}
};

/**
 * 소스(Source) 그리드의 선택된 행(Row)의 데이터를 타겟(Target) 그리드로 이동한다.<br>
 * 데이터 이동 후, 소스(Source) 그리드의 이동된 행(Row)의 상태는 delete모드로 상태값만 변경된다.
 * @param {cpr.core.AppInstance} app 앱인스턴스
 * @param {#grid} psSrcGridId 그리드ID
 * @param {#grid} psDesGridId 이동할 그리드 ID
 * @param {Number | Number[]} pnSrcRowIdx? 그리드 로우 인덱스<br/>
 *                            default : 체크된 row 나 선택된 row 인덱스를 취득 (check우선)
 * @return void
 */
GridKit.prototype.moveToGridData = function(app, psSrcGridId, psDesGridId, pnSrcRowIdx){
	var vcSrcGrid = app.lookup(psSrcGridId);
	var vcDesGrid = app.lookup(psDesGridId);
	
	var rowIndexs = pnSrcRowIdx == null ? this.getCheckOrSelectedRowIndex(app, psSrcGridId) :  pnSrcRowIdx;
	if(!(rowIndexs instanceof Array)){
		rowIndexs = [rowIndexs];
	}
	//이동할 ROW가 없으면...SKIP
	if(rowIndexs.length < 1) return;
	
	var srcDataSet = vcSrcGrid.dataSet;
	var tarDataSet = vcDesGrid.dataSet;
	for(var i=0, len=rowIndexs.length; i<len; i++){
		//신규 후 삭제된 행은 제외
		if(srcDataSet.getRowState(rowIndexs[i]) == cpr.data.tabledata.RowState.INSERTDELETED) continue;
		
		tarDataSet.addRowData(srcDataSet.getRowData(rowIndexs[i]));
	}
	vcDesGrid.redraw();
	vcSrcGrid.deleteRow(pnSrcRowIdx);
};

/**
 * 소스(Source) 그리드의 모든 데이터행(Row)을 타겟(Target) 그리드로 이동한다.<br>
 * 데이터 이동 후, 소스(Source) 그리드의 이동된 행(Row)의 상태는 delete모드로 상태값만 변경된다.
 * @param {cpr.core.AppInstance} app 앱인스턴스
 * @param {#grid} psSrcGridId 그리드ID
 * @param {#grid} psDesGridId 이동할 그리드 ID
 */
GridKit.prototype.moveToAllGridData = function(app, psSrcGridId, psDesGridId) {
	var vcSrcGrid = app.lookup(psSrcGridId);

	var indices = [];
	for (var i=0, len=vcSrcGrid.rowCount; i<len; i++) {
		indices.push(i);
	}
	
	this.moveToGridData(app, psSrcGridId, psDesGridId, indices);
};

/**
 * 그리드에서 로우(Row)를 선택해준다.
 * @param {cpr.core.AppInstance} app 앱인스턴스
 * @param {#grid} psGridId 그리드ID
 * @param {Number} pnRowIndex? 포커스를 부여할 Row의 인덱스(default : 현재 행 인덱스)
 * @return void
 */
GridKit.prototype.selectRow = function(app, psGridId, pnRowIndex) {
	/** @type cpr.controls.Grid */
	var vcGrid = app.lookup(psGridId);
	if(pnRowIndex == null || pnRowIndex == undefined){
		pnRowIndex = this.getIndex(app, psGridId);
	}
	
	vcGrid.selectRows(pnRowIndex);
	vcGrid.focusCell(pnRowIndex, 0);
};

/**
 * 그리드에서 조건을 만족하는 로우(Row)를 선택해준다.
 * @param {cpr.core.AppInstance} app 앱인스턴스
 * @param {#grid} psGridId 그리드ID
 * @param {String} psCondition 조건식<br>
 *                 ex)"STUD_DIV_RCD == 'CT101REGU' && SA_NM == '컴퓨터정보과'"
 * 					사용가능수식 !=", "!==", "$=", "%", "&&", "(", "*", "*=", "+", ",", "-", ".", "/", "/*", "//", "<", "<=", "==", "===", ">", ">=", "?", "[", "^=", "||"
 * @param {Number} pnCellIdx? 포커스를 부여할 Cell의 인덱스
 *                 (default : 조건에 만족하는 행 select)
 * @return void
 */
GridKit.prototype.selectRowByCondition = function(app, psGridId, psCondition, pnCellIdx) {
	/** @type cpr.controls.Grid */
	var vcGrid = app.lookup(psGridId);
	var voRow = vcGrid.findFirstRow(psCondition);
	
	if(voRow){
		if(pnCellIdx) vcGrid.focusCell(voRow.getIndex(), pnCellIdx);
		else vcGrid.selectRows(voRow.getIndex());
	}
};

/**
 * 그리드 행선택 변경 이벤트 발생시, 변경 이전에 선택된 행을 선택해준다.
 * @param {cpr.core.AppInstance} app 앱인스턴스
 * @param {cpr.events.CSelectionEvent} event 그리드 선택행 변경 이벤트
 * @param {Boolean} emitEvent? 이벤트(before-selection-change, selection-change)를 발생시킬지 여부
 * @return void
 */
GridKit.prototype.selectBeforeRow = function(app, event, emitEvent) {
	/** @type cpr.controls.Grid */
	var vcGrid = event.control;
	var emit = emitEvent === true ? true : false;
	
	var voOldSelection = event.oldSelection[0];
	var vsPkValues = this.getRowPKColumnValues(app, vcGrid.id, voOldSelection);
	var voFindRow = vcGrid.findFirstRow(vsPkValues);
	if(voFindRow){
		vcGrid.clearSelection(false);
		if(vcGrid.selectionUnit == "cell"){
			vcGrid.selectCells([{rowIndex:voFindRow["rowIndex"], cellIndex:voFindRow["cellIndex"]}], emit);
		}else{
			vcGrid.selectRows(voFindRow.getIndex(), emit);
		}
	}
};

/**
 * 그리드에 신규 행(Row)을 추가한다.
 * @param {cpr.core.AppInstance} app 앱인스턴스
 * @param {#grid} psGridId      그리드 ID
 * @param {String | Number} pnEditCellIdx 시작 cellIndex cell index 또는 column name.
 * @param {Number} pnRowIdx? 추가하고자 하는 Row index
 *                 (defalut : 현재 선택된 로우 이후)
 * @param {Object} poRowData? 추가할 row data. (key: header명, value: value 를 갖는 json data)
 * @return {cpr.controls.provider.GridRow} 추가한 Row의 GridRow 객체.
 */
GridKit.prototype.insertRow = function(app, psGridId, pnEditCellIdx, pnRowIdx, poRowData) {
	/** @type cpr.controls.Grid */
	var vcGrid = app.lookup(psGridId);
	var rowIndex = pnRowIdx == null ? this.getIndex(app, psGridId) : pnRowIdx;
	
	var insertedRow = null;
	if(poRowData != null)
		insertedRow = vcGrid.insertRowData(rowIndex, true, poRowData);
	else
		insertedRow = vcGrid.insertRow(rowIndex, true);
	
	var vnInsIdx = insertedRow.getIndex();
	
	if(vcGrid.readOnly){
		vcGrid.selectRows([ vnInsIdx ]);
	}else{
		vcGrid.selectRows([ vnInsIdx ]);
		vcGrid.setEditRowIndex(vnInsIdx, true);
	}
	
		
	if(pnEditCellIdx){
		vcGrid.focusCell(vnInsIdx, pnEditCellIdx);
		//포커싱할 컬럼이 UDC인 경우에...
		if(!ValueUtil.isNumber(pnEditCellIdx)){
			for(var i=0,len=vcGrid.detail.cellCount; i<len; i++){
				if(vcGrid.detail.getColumn(i).columnName == pnEditCellIdx){
					var ctrl = vcGrid.detail.getColumn(i).control;
					if(ctrl instanceof cpr.controls.UDCBase){
						var empApp = ctrl.getEmbeddedAppInstance();
						ctrl = AppUtil.getUDCBindValueControl(ctrl);
						if(ctrl) empApp.focus(ctrl.id);
					}
					break;
				}
			}
		}
	}else{
		vcGrid.focusCell(vnInsIdx, 0);
	}
	//그리드에 바인딩된 프리폼이 있는 경우... 프리폼 활성화
	if(!ValueUtil.isNull(vcGrid.userAttr("bindDataFormId"))){
		var freeformes = ValueUtil.split(vcGrid.userAttr("bindDataFormId"), ",");
		freeformes.forEach(function(/* eachType */ formId){
			/**@type cpr.controls.Container */
			var freeform = vcGrid.getAppInstance().lookup(formId);
			if(freeform != null){
				if(freeform._expressEnabled) freeform.bind("enabled").toExpression(freeform._expressEnabled);
				else freeform.enabled = true;
			}
		});
	}
	
	return insertedRow;
};

/**
 * 그리드에 단 한건의 신규 행(Row)을 추가한다. (단하나의 신규 행만 추가하고자 하는 경우에 사용)
 * @param {cpr.core.AppInstance} app 앱인스턴스
 * @param {#grid} psGridId      그리드 ID
 * @param {String | Number} pnEditCellIdx 시작 cellIndex cell index 또는 column name.
 * @param {#Grid | Array} paModifiedGrid
 * @param {Number} pnRowIdx? 추가하고자 하는 Row index
 *                 (defalut : 현재 선택된 로우 이후)
 * @param {Object} poRowData? 추가할 row data. (key: header명, value: value 를 갖는 json data)
 * @return {cpr.controls.provider.GridRow} 추가한 Row의 GridRow 객체
 */
GridKit.prototype.insertRowOnlyOne = function(app, psGridId, pnEditCellIdx, paModifiedGrid, pnRowIdx, poRowData) {
	/** @type cpr.controls.Grid */
	var vcGrid = app.lookup(psGridId);
	if(vcGrid == null) return null;
	var rowIndex = pnRowIdx == null ? this.getIndex(app, psGridId) : pnRowIdx;
	
	var insertedRow = null;
	if(vcGrid.dataSet.getRowStatedCount(cpr.data.tabledata.RowState.INSERTED) > 0){
		for(var i=0, len=vcGrid.rowCount; i<len; i++){
			if(vcGrid.getRowState(i) == cpr.data.tabledata.RowState.INSERTED){
				insertedRow = vcGrid.getRow(i);
				break;
			}
		}
	}
	
	if(insertedRow){
		//신규 추가된 행이 존재합니다.변경사항이 반영되지 않았습니다. 계속 하시겠습니까?
		if(!this._appKit.Msg.confirm("CRM-M206", [vcGrid.fieldLabel])) return null;
		this._appKit.Control.reset(app, paModifiedGrid);
		var vaColumns = vcGrid.dataSet.getColumnNames();
		vaColumns.forEach(function(column){
			vcGrid.setCellValue(insertedRow.getIndex(), column, "", false);
		});
	}else{
		if(this.isModified(app, paModifiedGrid, "CRM")) return null;
		this._appKit.Control.reset(app, paModifiedGrid);
		insertedRow = vcGrid.insertRow(rowIndex, true);
	}
	
	var vnInsIdx = insertedRow.getIndex();
	if(vcGrid.readOnly){
		vcGrid.selectRows([ vnInsIdx ]);
	}else{
		vcGrid.selectRows([ vnInsIdx ]);
		vcGrid.setEditRowIndex(vnInsIdx, true);
	}
		
	if(pnEditCellIdx){
		vcGrid.focusCell(vnInsIdx, pnEditCellIdx);
		//포커싱할 컬럼이 UDC인 경우에...
		if(!ValueUtil.isNumber(pnEditCellIdx)){
			for(var i=0,len=vcGrid.detail.cellCount; i<len; i++){
				if(vcGrid.detail.getColumn(i).columnName == pnEditCellIdx){
					var ctrl = vcGrid.detail.getColumn(i).control;
					if(ctrl instanceof cpr.controls.UDCBase){
						var empApp = ctrl.getEmbeddedAppInstance();
						ctrl = AppUtil.getUDCBindValueControl(ctrl);
						if(ctrl) empApp.focus(ctrl.id);
					}
					break;
				}
			}
		}
	}
	
	return insertedRow;
};

/**
 * 그리드의 선택된 행(Row)를 삭제한다.
 * @param {cpr.core.AppInstance} app 앱인스턴스
 * @param {#grid} psGridId 그리드 아이디
 * @param {Number | Number[]} pnRowIdx? 삭제하고자 하는 Row index<br>
 *                 default : 체크된 row 나 선택된 row 인덱스를 취득 (check우선)
 * @return {Number[]} 삭제된 행 (배열)                
 */
GridKit.prototype.deleteRow = function(app, psGridId, pnRowIdx) {
	/** @type cpr.controls.Grid */
	var vcGrid = app.lookup(psGridId);
	var _this = this;
	
	var rowIndexs = pnRowIdx == null ? this.getCheckOrSelectedRowIndex(app, psGridId) :  pnRowIdx;
	
	if(!(rowIndexs instanceof Array)){
		rowIndexs = [pnRowIdx];
	}
	//삭제할 행이 없는 경우... 메시지 박스를 보여줌
	if(rowIndexs.length < 1){
		//삭제할 데이터가 없습니다.
		this._appKit.Msg.alert("INF-M007");
		return false;
	}
	
	//신규 후 삭제시... 디테일 데이터에 대한 Reference 삭제(삭제 플래그로 업데이트)
	var vaDetailCtrls = null;
	
	var vcDataSet = vcGrid.dataSet;
	for(var i = rowIndexs.length - 1; i >= 0; i--) {
	    var rowIdx = rowIndexs[i];
	    vcGrid.deleteRow(rowIdx);
	    
		if (vcDataSet != null ){
			if (vcDataSet.getRowState(rowIdx) == cpr.data.tabledata.RowState.INSERTDELETED) {
				
				vcGrid.revertRowData(rowIdx);
				if(rowIdx == vcGrid.getRowCount()){
					if(rowIdx == 0){
						vcGrid.clearSelection();
					}else{
						vcGrid.selectRows(rowIdx-1);						
					}
				}else{
					vcGrid.selectRows(rowIdx);
				}
			}
		}	
	}
	
	//그리드에 바인딩된 프리폼이 있는 경우... 프리폼 활성화
	if(!ValueUtil.isNull(vcGrid.userAttr("bindDataFormId"))){
		var freeformes = ValueUtil.split(vcGrid.userAttr("bindDataFormId"), ",");
		freeformes.forEach(function(/* eachType */ formId){
			/**@type cpr.controls.Container */
			var freeform = vcGrid.getAppInstance().lookup(formId);
			if(freeform != null){
				var voDs = _this._appKit.Group.getBindDataSet(freeform.getAppInstance(), freeform);
				//데이터 건수가 없으면... 프리폼 비활성화
				if(voDs.getRowCount() < 1) {
					freeform.enabled = false;
				}
			}
		});
	}
	
	return rowIndexs;
};

/**
 * 특정 row의 상태값을 반환한다.
 * @param {cpr.core.AppInstance} app 앱인스턴스
 * @param {#grid} psGridId
 * @param {Number} pnRowIdx 상태를 알고자 하는 row index
 * @return {cpr.data.tabledata.RowState} 해당 row index의 상태값.<br>
			state 종류<br>
			cpr.data.tabledata.RowState.EMPTIED : 삭제된 로우를 커밋 시 삭제된 배열을에서 제거하기 위한 임시 상태.<br>
			cpr.data.tabledata.RowState.UNCHANGED : 변경되지 않은 상태.<br>
			cpr.data.tabledata.RowState.INSERTED : 행이 신규로 추가된 상태.<br>
			cpr.data.tabledata.RowState.UPDATED : 행이 수정된 상태.<br>
			cpr.data.tabledata.RowState.DELETED : 행이 삭제된 상태.<br>
			cpr.data.tabledata.RowState.INSERTDELETED : 행이 추가되었다가 삭제된 상태.
 */
GridKit.prototype.getRowState = function(app, psGridId, pnRowIdx) {
	var vcGrid = app.lookup(psGridId);
	var rowIndex = pnRowIdx == null ? this.getIndex(app, psGridId) : pnRowIdx;
	return vcGrid.getRowState(rowIndex);
};

/**
 * 특정 row의 상태를 변경한다.
 * @param {cpr.core.AppInstance} app 앱인스턴스
 * @param {#grid} psGridId 그리드 ID
 * @param {cpr.data.tabledata.RowState} state 변경할 상태값. <br>
		state 종류<br>
		cpr.data.tabledata.RowState.UNCHANGED : 변경되지 않은 상태.<br>
		cpr.data.tabledata.RowState.INSERTED : 행이 신규로 추가된 상태.<br>
		cpr.data.tabledata.RowState.UPDATED : 행이 수정된 상태.<br>
		cpr.data.tabledata.RowState.DELETED : 행이 삭제된 상태.<br>
 * @param {Number} pnRowIdx pnRowIdx 변경하고자 하는 row index
 */
GridKit.prototype.setRowState = function(app, psGridId, state, pnRowIdx) {
	var vcGrid = app.lookup(psGridId);
	var rowIndex = pnRowIdx == null ? this.getIndex(app, psGridId) : pnRowIdx;
	vcGrid.setRowState(rowIndex, state);
};

/**
 * 전체 row의 상태값을 특정 상태(state)로 일괄 업데이트 한다.
 * @param {cpr.core.AppInstance} app 앱인스턴스
 * @param {#grid} psGridId 그리드 ID
 * @param {cpr.data.tabledata.RowState} state 변경할 상태값. <br>
		state 종류<br>
		cpr.data.tabledata.RowState.UNCHANGED : 변경되지 않은 상태.<br>
		cpr.data.tabledata.RowState.INSERTED : 행이 신규로 추가된 상태.<br>
		cpr.data.tabledata.RowState.UPDATED : 행이 수정된 상태.<br>
		cpr.data.tabledata.RowState.DELETED : 행이 삭제된 상태.<br>
 */
GridKit.prototype.setRowStateAll = function(app, psGridId, state) {
	var vcGrid = app.lookup(psGridId);
	var vcDataSet = vcGrid.dataSet;
	vcDataSet.setRowStateAll(state);
	vcGrid.redraw();
};

/**
 * 해당 상태 값을 갖는 row를 검색하여 row index 배열을 반환합니다.
 * <pre><code>
 * Grid.getRowStatedIndices(app,"grd1",cpr.data.tabledata.RowState.UPDATED);
 * </code></pre>
 * @param {cpr.core.AppInstance} app 앱인스턴스
 * @param {#grid} psGridId 그리드 ID
 * @param {cpr.data.tabledata.RowState} state 검색할 상태값.<br>
			state 종류<br>
			cpr.data.tabledata.RowState.UNCHANGED : 변경되지 않은 상태.<br>
			cpr.data.tabledata.RowState.INSERTED : 행이 신규로 추가된 상태.<br>
			cpr.data.tabledata.RowState.UPDATED : 행이 수정된 상태.<br>
			cpr.data.tabledata.RowState.DELETED : 행이 삭제된 상태.<br>
 * @return {Array} row index 배열
 */
GridKit.prototype.getRowStatedIndices = function(app, psGridId, state) {
	var vcGrid = app.lookup(psGridId);
	return vcGrid.dataSet.getRowStatedIndices(state);
};

/**
 * 그리드의 로우 갯수 반환
 * @param {cpr.core.AppInstance} app 앱인스턴스
 * @param {#grid} psGridId 그리드 ID
 * @return {Number}  로우 카운트 
 */
GridKit.prototype.getRowCount = function(app, psGridId) {
	var vcGrid = app.lookup(psGridId);
	return vcGrid.rowCount;
};

/**
 * 그리드의 현재 선택된 행의 인덱스(Index)를 반환한다.
 * @param {cpr.core.AppInstance} app 앱인스턴스
 * @param {#grid} psGridId 그리드 ID
 * @return {Number}  로우(Row) 인덱스 
 */
GridKit.prototype.getIndex = function(app, psGridId) {
	/** @type cpr.controls.Grid */
	var vcGrid = app.lookup(psGridId);
	return vcGrid.selectionUnit != "cell" ? vcGrid.getSelectedRowIndex() : vcGrid.getSelectedIndices()[0]["rowIndex"];
};

/**
 * 그리드의 타이틀명을 반환한다.
 * @param {cpr.core.AppInstance} app 앱인스턴스
 * @param {#grid} psGridId 그리드 ID
 * @return {String} 타이틀 문자열 
 */
GridKit.prototype.getTitle = function(app, psGridId) {
	var titleCtlrs = this._appKit.Group.getAllChildrenByType(app, "udc.com.comTitle");
	if(titleCtlrs != null){
		for(var i=0, len=titleCtlrs.length; i<len; i++){
			if(titleCtlrs[i].ctrl && titleCtlrs[i].ctrl.id == psGridId){
				return titleCtlrs[i].title;
			}
		}
	}
	return "";
};

/**
 * 그리드의 특정 컬럼에 포커싱을 처리한다.
 * @param {cpr.core.AppInstance} app 앱인스턴스
 * @param {#grid} psGridId 그리드 ID
 * @param {String} psDataColumnId 데이터 컬럼ID
 * @param {Number} pnRowIndex? 행 인덱스
 * @return void
 */
GridKit.prototype.setFocusColumn = function(app, psGridId, psDataColumnId, pnRowIndex) {
	/** @type cpr.controls.Grid */
	var grid = app.lookup(psGridId);
	var rowIndex = pnRowIndex == null ? this.getIndex(app, psGridId) : pnRowIndex;
	
	if(grid.readOnly){
		grid.selectRows([ rowIndex ]);
	}else{
		grid.selectRows([ rowIndex ]);
		grid.setEditRowIndex(rowIndex, true);
	}
	grid.focusCell(rowIndex, psDataColumnId);
};

/**
 * 그리드 디테일 columnname로 헤더 컬럼 취득
 * @param {cpr.core.AppInstance} app 앱인스턴스
 * @param {#grid} psGridId 그리드ID
 * @param {#column} psColumnName 컬럼명
 * @return {Array} 헤더 컬럼 배열Array(cpr.controls.gridpart.GridColumn)
 */
GridKit.prototype.getHeaderColumn = function(app, psGridId, psColumnName) {
	/** @type cpr.controls.Grid*/
	var vcGrid = app.lookup(psGridId);
    var vaDetailColumn = vcGrid.detail.getColumnByName(psColumnName);
	
	var vaHeaderColumns = new Array();
	vaDetailColumn.forEach(function(dColumn){
		var vaHeaderColumn = vcGrid.header.getColumnByColIndex(dColumn.colIndex, dColumn.colSpan);
		vaHeaderColumn.forEach(function(hColumn){
			vaHeaderColumns.push(hColumn);	
		});
	});
	
	return vaHeaderColumns;
};

/**
 * 그리드 디테일 컬럼의 ColIndex로 헤더 컬럼 취득
 * @param {cpr.core.AppInstance} app 앱인스턴스
 * @param {#grid} psGridId 그리드ID
 * @param {Number} pnColIndex 컬럼 ColIndex
 * @return {Array} 헤더 컬럼 배열Array(cpr.controls.gridpart.GridColumn)
 */
GridKit.prototype.getHeaderColumnByColIdex = function(app, psGridId, pnColIndex) {
	/** @type cpr.controls.Grid*/
	var vcGrid = app.lookup(psGridId);
	var voHeader = vcGrid.header;
	
	var vaHeaderColumns = new Array();
	var hColumn;
	for(var i=0, len=voHeader.cellCount; i<len; i++){
		hColumn = voHeader.getColumn(i);
		if(hColumn != null && hColumn.colIndex == pnColIndex){
			vaHeaderColumns.push(hColumn);
		}
	}
	
	return vaHeaderColumns;
};

/**
 * 그리드 헤더 컬럼의 텍스트(text) 문자열을 반환한다.
 * @param {cpr.core.AppInstance} app 앱인스턴스
 * @param {#grid} psGridId 그리드 ID
 * @param {#column} psColumnName 컬럼명
 * @return {String} 헤더 컬럼 text
 */
GridKit.prototype.getHeaderColumnText = function(app, psGridId, psColumnName) {
	var vaColumns = this.getHeaderColumn(app, psGridId, psColumnName);
	return vaColumns.length > 0 ? vaColumns[0].getText() : "";
};

/**
 * 그리드 헤더 중에 STATUS 컬럼 객체를 반환한다.
 * @param {cpr.core.AppInstance} app 앱인스턴스
 * @param {#grid} psGridId 그리드 ID
 * @return {cpr.controls.gridpart.GridHeaderColumn} 헤더 컬럼
 */
GridKit.prototype.getHeaderStatusColumn = function(app, psGridId) {
	var header = app.lookup(psGridId).header;
	var column = null;
	for(var i=0, len=header.cellCount; i<len; i++){
		column = header.getColumn(i);
		if(column.getText() == "F"){
			return column;
		}
	}
	return null;
};

/**
 * 그리드 내 컬럼을 숨긴다.
 * @param {cpr.core.AppInstance} app 앱인스턴스
 * @param {#grid} psGridId 그리드 ID
 * @param {#column} psColumnName 컬럼 명
 * @return void
 */	 
GridKit.prototype.hideColumn = function(app, psGridId, psColumnName){
 	/** @type cpr.controls.Grid*/
 	var vcGrid = app.lookup(psGridId);
	var vaColumns = this.getHeaderColumn(app, psGridId, psColumnName);
	if(vaColumns.length > 0){
	 	vcGrid.columnVisible(vaColumns[0].colIndex, false);
	}
};
 
/**
 * 그리드 컬럼을 보이도록 변경한다.
 * @param {cpr.core.AppInstance} app 앱인스턴스
 * @param {#grid} psGridId 그리드 ID
 * @param {#column} psColumnName 컬럼명
 * @return void
 */	 
GridKit.prototype.showColumn = function(app, psGridId, psColumnName){
 	/** @type cpr.controls.Grid*/
 	var vcGrid = app.lookup(psGridId);
	var vaColumns = this.getHeaderColumn(app, psGridId, psColumnName);
	if(vaColumns.length > 0){
	 	vcGrid.columnVisible(vaColumns[0].colIndex, true);
	}
};

/**
 * 그리드 데이터를 조건에 맞게 필터링한다.
 * @param {cpr.core.AppInstance} app 앱인스턴스
 * @param {#grid} psGridId 그리드 ID
 * @param {String} psCondition 데이터 필터링 조건
 * @return void
 */	
GridKit.prototype.setFilter = function(app, psGridId, psCondition){
 	/** @type cpr.controls.Grid*/
 	var grid = app.lookup(psGridId);
	grid.setFilter(psCondition);
};

/**
 * 그리드 데이터 필터링을 취소한다.
 * @param {cpr.core.AppInstance} app 앱인스턴스
 * @param {#grid} psGridId 그리드 ID
 * @return void
 */	
GridKit.prototype.clearFilter = function(app, psGridId){
 	/** @type cpr.controls.Grid*/
 	var grid = app.lookup(psGridId);
	grid.clearFilter();
};


/**
 * 그리드의 데이터셋의 FindRow를 지정한다.<br>
 * 해당 함수 사용시 그리드 조회시 psFindRowCond로 지정된 행이 자동 선택된다. 
 * @param {cpr.core.AppInstance} app 앱인스턴스
 * @param {#grid} psGridId 그리드 ID
 * @param {String} psCondition 조건식 <br/>
 *                 ex)"STUD_DIV_RCD == 'CT101REGU' && SA_NM == '컴퓨터정보과'" <br/>
 * 					사용가능수식 !=", "!==", "$=", "%", "&&", "(", "*", "*=", "+", ",", "-", ".", "/", "/*", "//", "<", "<=", "==", "===", ">", ">=", "?", "[", "^=", "||" 
 * @return void
 */
GridKit.prototype.setFindRowCondition = function(app, psGridId, psCondition){
	var vcGrid = app.lookup(psGridId);
	vcGrid.dataSet._findRowCondition = psCondition;
};

/**
 * 현재 로우의 key(pk) value를 반환한다. 
 * @param {cpr.core.AppInstance} app 앱인스턴스
 * @param {#grid} psGridId 그리드 ID
 * @param {Number} pnRowIndex? 취득하고자하는 row index. <br/>
 *                 defalut : 선택된 rowindex
 * @return {String}
 */
GridKit.prototype.getRowPKColumnValues = function(app, psGridId, pnRowIndex){
	/** @type cpr.controls.Grid*/
	var vcGrid = app.lookup(psGridId);
	var vcDataSet = vcGrid.dataSet;
	
	var rowIndex = pnRowIndex == null ? this.getIndex(app, psGridId) : pnRowIndex;
	
	var vaPkColmns = ValueUtil.split(vcDataSet.info, ",");
	var vaTempCond = [];
	vaPkColmns.forEach(function(column){
		var vsPkValue = vcDataSet.getValue(rowIndex, column);
		vaTempCond.push(column + "==" + "'" + vcDataSet.getValue(rowIndex, column) + "'"); 
	});
	
	return vaTempCond.length > 0 ? vaTempCond.join(" && ") : "";
};

/**
 * 그리드의 선택 유/무 체크 및 PK값이 입려되어 있는지를 체크한다. 
 * @param {cpr.core.AppInstance} app 앱인스턴스
 * @param {#grid} psGridId 그리드 ID
 * @param {String | Array} paIgnoreCol PK값 입력 체크 예외 컬럼명
 * @return {Boolean}
 */
GridKit.prototype.checkSelectionWithPkValues = function(app, psGridId, paIgnoreCol){
	/** @type cpr.controls.Grid*/
	var vcGrid = app.lookup(psGridId);
	var rowIndex = this.getIndex(app, vcGrid.id);
	//Row 선택여부 확인
	if(rowIndex < 0){
		this._appKit.Msg.alert("INF-M129", [vcGrid.fieldLabel]); //선택된 데이터가 없습니다.
		return false;
	}
	//ROW의 PK값 입력여부 체크
	var vaPKColumns = ValueUtil.split(ValueUtil.fixNull(vcGrid.dataSet.info), ",");
	var valid = true, text, focusColumn, vbChk = false;
	for(var i=0, len=vaPKColumns.length; i<len; i++){
		if(ValueUtil.isNull(vcGrid.getCellValue(rowIndex, vaPKColumns[i]))){
		    if(!(paIgnoreCol instanceof Array)){
		        paIgnoreCol = [paIgnoreCol];
		    }
		    
		    vbChk = false;
            paIgnoreCol.some(function(colName){
                if(colName == vaPKColumns[i]) {
                	vbChk = true;
                	return false;
                }
            });
            
            if(vbChk) continue;
			
			valid = false;
			focusColumn = vaPKColumns[i];
			text = this.getHeaderColumnText(app, vcGrid.id, focusColumn);
			break;
		}
	}
	
	if(!valid){
		//항목은 필수입력 항목입니다.
		this._appKit.Msg.alert("WRN-M001", [vcGrid.fieldLabel+"의 "+text]);
		vcGrid.setEditRowIndex(rowIndex, true);
		vcGrid.focusCell(rowIndex, focusColumn);
		//포커싱할 컬럼이 UDC인 경우에...
		var vaDetailColumns = vcGrid.detail.getColumnByName(focusColumn);
		var dctrl = vaDetailColumns != null && vaDetailColumns.length > 0 ? vaDetailColumns[0].control : null;
		if(dctrl != null && dctrl instanceof cpr.controls.UDCBase){
			var empApp = dctrl.getEmbeddedAppInstance();
			dctrl = AppUtil.getUDCBindValueControl(dctrl);
			if(dctrl) empApp.focus(dctrl.id);
		}
		return false;
	}
	
	return true;
};

/**
 * 현재 로우의 key(pk) value를 반환한다. <br>
 * - 사이트별 Customizing 필요
 * @param {cpr.core.AppInstance} app 앱인스턴스
 * @param {#grid} psGridId 그리드 ID
 * @param {String} psFileName export 파일명
 * @param {String} psExcludeColumns? 출력시 제외할 컬럼명(여러개인 경우 콤마로 구분) ex- COL1,COL2,COL3
 * @param {String} psFileType?  파일유형(xls,xlsx,cvs)
 * @param {Array} metadata
 * @param {Boolean} pbExcludeHideColumn
 * @param {String} psExCludePart? 출력시 제외영역(ex-footer, gfooter)
 * @return void
 */
GridKit.prototype.exportData = function(app, psGridId, psFileName, psExcludeColumns, psFileType, metadata, pbExcludeHideColumn, psExCludePart){
	var _this = this;
	/** @type cpr.controls.Grid */
	var vcGrid = app.lookup(psGridId);
	var vsFileType = !ValueUtil.isNull(psFileType) ? psFileType : "xlsx";
	
	pbExcludeHideColumn = ValueUtil.isNull(pbExcludeHideColumn) ? true : pbExcludeHideColumn;
	
	var subExport = new cpr.protocols.Submission();
	subExport.action = "../export/" + psFileName.replace("\/", "") + "."+vsFileType;
	subExport.mediaType = "application/json";
	subExport.responseType = "blob";
	
	
	
	//기본 출력 제외 컬럼(인덱스 컬럼, 선택용 체크 컬럼)
	var voColumn, voHColumn;
	var vaExcludeCellIndexs = [];
	for(var i=0, len=vcGrid.detail.cellCount; i<len; i++){
		voColumn = vcGrid.detail.getColumn(i);
		if(voColumn.columnType == "checkbox" || voColumn.columnType == "rowindex"){
			vaExcludeCellIndexs.push(i);
		}else if(voColumn.control instanceof cpr.controls.UDCBase){
			if(voColumn.control == null || voColumn.control.getBindInfo("value") == null){
				vaExcludeCellIndexs.push(i);
			}
		}
//		else if(voColumn.columnName == null || voColumn.columnName == ""){
//			vaExcludeCellIndexs.push(i);
//		}
		else{
			//숨김컬럼 제외
			if(pbExcludeHideColumn){
				voHColumn = this.getHeaderColumn(app, psGridId, voColumn.columnName);
				if(voHColumn != null && voHColumn.length > 0){
					if(voHColumn[0].visible === false){
						vaExcludeCellIndexs.push(i);
					}
				}
			}
		}
	}
	
	//상태컬럼 제외
	var statusColumn = this.getHeaderStatusColumn(app, vcGrid.id);
	if(statusColumn != null){
		vaExcludeCellIndexs.push(statusColumn.colIndex);
	}
	
	//그외 추가적인 출력 제외 컬럼이 존재하는 경우
	if(!ValueUtil.isNull(psExcludeColumns)){
		var vaExclColumns = ValueUtil.split(psExcludeColumns, ",");
		var vaDColumns;
		for(var j=0, jlen=vaExclColumns.length; j<jlen; j++){
			vaDColumns = vcGrid.detail.getColumnByName(vaExclColumns[j]);
			if(vaDColumns){
				vaDColumns.forEach(function(/* Object */ each){
					vaExcludeCellIndexs.push(each.colIndex);
				});
			}
		}
	}
	
	var exportData = vcGrid.getExportData({exceptStyle:false, freezeHeader:true, excludeCols:vaExcludeCellIndexs, applySuppress:true});
	if (metadata != null) {
		exportData["metadata"] = {};
		if (metadata["password"] != null) {
			exportData["metadata"]["password"] = metadata["password"];
		}
		if (metadata["printPageOrientation"] != null) {
			exportData["metadata"]["printPageOrientation"] = metadata["printPageOrientation"];
		}
	}
	//풋터 또는 그룹풋터 제외하는 경우
	if(!ValueUtil.isNull(psExCludePart)){
		var len = exportData.rowgroups.length;
		for(var i = (len-1); i >= 0; i--) {
			if (exportData.rowgroups[i].region == psExCludePart) {
				exportData.rowgroups.splice(i,1);
			}
		}
	}
	
	//그리드 출력 스타일지정
	for (var i=0, len=exportData.rowgroups.length; i<len; i++) {
		// band별로 원하는 스타일 추가 가능 (header, detail, footer, gheader, gfooter)
		var rowGroup = exportData.rowgroups[i];
		var cellLength = rowGroup.style.length;
		for (var j = 0; j < cellLength; j++) {
			rowGroup.style[j].style["border-bottom-color"] = "black";
			rowGroup.style[j].style["border-bottom-style"] = "solid";
			rowGroup.style[j].style["border-bottom-width"] = "1px";
			rowGroup.style[j].style["border-left-color"] = "black";
			rowGroup.style[j].style["border-left-style"] = "solid";
			rowGroup.style[j].style["border-left-width"] = "1px";
			rowGroup.style[j].style["border-right-color"] = "black";
			rowGroup.style[j].style["border-right-style"] = "solid";
			rowGroup.style[j].style["border-right-width"] = "1px";
			rowGroup.style[j].style["border-top-color"] = "black";
			rowGroup.style[j].style["border-top-style"] = "solid";
			rowGroup.style[j].style["border-top-width"] = "1px";
			
			if (rowGroup.region == "header") {
				rowGroup.style[j].style["background-color"] = "#dddddd";
				rowGroup.style[j].style["text-align"] = "center";
			}
		}
	}
	
	subExport.setRequestObject(exportData);

	subExport.send();
};

/**
 * 데이터셋 컨트롤 유틸
 * @constructor
 * @param {common.AppKit} appKit
 */
function SubmissionKit(appKit){
	this._appKit = appKit;
};

/**
 * Submission Before Handler<br/>
 * 사이트별 Customizing 필요<br/>
 *  - 시스템 컬럼 수정 필요 (CRT_USER_ID, CRT_PGM_ID, CRT_IP_MAC, UPD_USER_ID, UPD_PGM_ID, UPD_IP_MAC)
 * @param {cpr.events.CSubmissionEvent} e
 */
SubmissionKit.prototype._onBeforeSubmit = function(e) {
	/** 
	 * @type cpr.protocols.Submission
	 */
	var submit = e.control;
	var _app = submit.getAppInstance();
	 

	//for.AUTO SAVE
	submit.setDataRowHandler(function(/** @type cpr.data.Row */ rowdata) {
		var additionalValue = {};
		//PK키 original값 추가
		var dsInfo = rowdata.getDataSetInfo();
		if(dsInfo && (rowdata.getState() == cpr.data.tabledata.RowState.UPDATED || cpr.data.tabledata.RowState.DELETED)){
			var vaPks = dsInfo.split(",");
			vaPks.some(function(value, idx){
				value = value.replace(/(^\s*)|(\s*$)/g, "")
				if(value == "") return false;
				
				additionalValue[value + "__origin"] = rowdata.getOriginalValue(value);
			});
		}else if(dsInfo && (rowdata.getState() == cpr.data.tabledata.RowState.INSERTED)){
			var vaPks = dsInfo.split(",");
			vaPks.some(function(value, idx){
				value = value.replace(/(^\s*)|(\s*$)/g, "")
				if(value == "") return false;
				
				additionalValue[value + "__origin"] = rowdata.getValue(value);
			});
		}
		
		return additionalValue;
	});
};

/**
 * @private
 * Submission Receive Handler<br/>
 * 사이트별 Customizing 필요<br/>
 *  - 1. 에러메시지 키 변경 필요
 * @param {cpr.events.CSubmissionEvent} e
 * @param {Boolean} pbSuccess
 */
SubmissionKit.prototype._onSubmitReceive = function(e, pbSuccess) {
	/** 
	 * @type cpr.protocols.Submission
	 */
	var submission = e.control;
	var xhr = submission.xhr;
	var contentType = xhr.getResponseHeader("Content-Type");
	if(contentType == null) return true;
	
	contentType = contentType.toLowerCase();
	if (contentType.indexOf(";") > -1) {
		contentType = contentType.substring(0, contentType.indexOf(";"));
	}
	contentType = ValueUtil.trim(contentType);
	if ("application/json" != contentType || "text/tab-separated-values" == contentType) {
		return true;
	}
	
	var response = xhr.responseText;
	var jsonRes = JSON.parse(response);
	var errMsgInfo = jsonRes["ERRMSGINFO"];
	if (errMsgInfo) {
		var vsErrMsg = "";
		try{
			vsErrMsg = eval("\"" +  errMsgInfo.ERRMSG+ "\"");	
		}catch(e){
			vsErrMsg = errMsgInfo.ERRMSG;
		}
		
		alert(vsErrMsg.replace(/\r\n/ig, "\n").replace(/\\n/gi, "\n"));
		var urlContext = top.location.pathname.substring(0, top.location.pathname.indexOf("/",2));
		if(urlContext == "/") urlContext = "";
//		//사용자 세션없는 오류인 경우
//		if("CMN003.CMN@CMN003" == errMsgInfo.ERRCODE){
//			top.location.href = urlContext+"/logout.jsp";
//		//중복로그인 오류인 경우
//		}else if("CMN003.CMN@CMN062" == errMsgInfo.ERRCODE){
//			top.location.href = urlContext+"/logout.jsp";
//		}
		return false;
	}
		
	return true;
};

/**
 * 
 * @param {cpr.events.CSubmissionEvent} e
 */
SubmissionKit.prototype._onSubmitLoadProgress = function(e) {
	/** 
	 * @type cpr.protocols.Submission
	 */
	var submission = e.control;
	var loadmask = this._getLoadMask(submission);
	if(loadmask){
		try {
			if(submission.getResponseDataCount() > 0){
				var rowCnt = submission.getResponseData(0).data.getRowCount();
				loadmask.module.count(rowCnt);
			}
		}catch(ex){}
	}
};

/**
 * 
 * @param {cpr.events.CSubmissionEvent} e
 */
SubmissionKit.prototype._onSubmitUploadProgress = function(e) {
	/** 
	 * @type cpr.protocols.Submission
	 */
	var submission = e.control;
	var loadmask = this._getLoadMask(submission);
	if(loadmask && loadmask.module.end){
		loadmask.module.progress(e.loaded, e.total);
		loadmask.module.start();
	}
};

/**
 * 
 * @param {cpr.events.CSubmissionEvent} e
 * @param {Boolean} pbSuccess
 */
SubmissionKit.prototype._onSubmitSuccess = function(e, pbSuccess) {
	return pbSuccess;
};

/**
 * @private
 * Submission Error Handler
 * @param {cpr.events.CSubmissionEvent} e
 */
SubmissionKit.prototype._onSubmitError = function(e) {
	/** 
	 * @type cpr.protocols.Submission
	 */
	var submission = e.control;
	var _app = submission.getAppInstance();
	//시스템 내부 장애가 발생하였습니다.\n 관리자에게 문의 하시기 바랍니다.
	this._appKit.Msg.alert("ERR-SRV");
	
	var msg = submission.getMetadata("msg");
	if(msg) {
		this._appKit.Msg.notify(_app, msg);
	} else if(e.nativeEvent) {
		this._appKit.Msg.notify(_app, "network : " + e.nativeEvent.type);
	}
	
	return false;
};

/**
 * @private
 * Submission Done Handler<br/>
 * 1. 서버에서 생성된 최신 로우 찾기<br/>
 * 2. 어플리케이션 비즈니스 콜백 메소드 실행<br/>
 * 3. 로딩 마스크 제거<br/>
 * @param {cpr.events.CSubmissionEvent} e
 * @param {Function} poCallbackFunc
 * @param {Boolean} pbSuccess
 * @param {Boolean} pbAppDisable
 */
SubmissionKit.prototype._onSubmitDone = function(e, poCallbackFunc, pbSuccess, pbAppDisable) {
	/** 
	 * @type cpr.protocols.Submission
	 */
	var submission = e.control;
	var _app = submission.getAppInstance();
	
	//마지막 행찾기
	var vsFindRowKey = submission.getMetadata("strFindRowKey");
	if(!ValueUtil.isNull(vsFindRowKey)){
		var vnDsCnt = submission.getRequestDataCount();
		var voDs, vaFindKey;
		var vaFindRowKeys = ValueUtil.split(vsFindRowKey, "|");
		var findKey = null;
		for(var i=0, len=vaFindRowKeys.length; i<len; i++){
			findKey = ValueUtil.trim(vaFindRowKeys[i]);
			if(findKey == "") continue;
			vaFindKey = ValueUtil.split(findKey, ":");
			if(vaFindKey.length == 2){
				for(var j=0; j<vnDsCnt; j++){
					voDs = submission.getRequestData(j).data;
					if(voDs.type != "dataset") continue;
					if(voDs.id == vaFindKey[0]){
						voDs._findRowCondition = vaFindKey[1];
						break;
					}
				}
			}else{
				for(var j=0; j<vnDsCnt; j++){
					voDs = submission.getRequestData(j).data;
					if(voDs.type != "dataset") continue;
					voDs._findRowCondition = vaFindKey[0];
				}
			}
		}
	}
	
	var idx = this._appKit._activeSubmission.indexOf(submission);
	if(idx != -1) {
		this._appKit._activeSubmission.splice(idx, 1);
	}
	
	//실패한 경우.. 커버를 씌움
	if(pbAppDisable === true && pbSuccess != true){
		this._appKit.coverPage(_app);
	}
	
	submission.removeAllFileParameters();
	submission.removeAllParameters();
//	submission.removeAllEventListeners();

	//콜백이 존재하는 경우... 콜백함수 호출	
	//콜백을 제일 뒤로 옮김
	if (poCallbackFunc != null && (typeof poCallbackFunc == "function")) {
		poCallbackFunc(pbSuccess, e.control);
	}
	
	// submission success에서 다른 submission을 실행했을 경우 loadmask를 내리지 않는다.
	if(this._appKit._activeSubmission.length == 0) {
		// hide loadmask
		try{
			this._appKit.hideLoadMask(_app);
		}catch(ex){}
	}
};

/**
 * @param {cpr.protocols.Submission} poSubmission
 */
SubmissionKit.prototype._getLoadMask = function(poSubmission) {
	var _app = poSubmission.getAppInstance();
	var _container = null;
	if(_app.getHost() && _app.getHost().modal === true){
		_container = _app.getContainer();
	}else{
		_container = _app.getRootAppInstance().getContainer();
	}
	_app = _container.getAppInstance();
	
	return _app.lookup("__loadmask__");
};

/**
 * 해당 서브미션 요청 데이터를 가지고 있는지 체크
 * @private
 * @param {cpr.protocols.Submission} poSubmission 서브미션 객체
 * @param {String} psDataId  데이터셋/맵 ID
 */
SubmissionKit.prototype._hasRequestData = function(poSubmission, psDataId){
	for(var i=0, len=poSubmission.getRequestDataCount(); i<len; i++){
		if(poSubmission.getRequestData(i).data.id == psDataId){
			return true;
		}
	}
	return false;
}

/**
 * 해당 서브미션 요청 데이터를 가지고 있는지 체크
 * @private
 * @param {cpr.protocols.Submission} poSubmission  서브미션 객체
 * @param {String} psDataId 데이터셋/맵 ID
 */
SubmissionKit.prototype._hasResponseData = function(poSubmission, psDataId){
	for(var i=0, len=poSubmission.getResponseDataCount(); i<len; i++){
		if(poSubmission.getResponseData(i).data.id == psDataId){
			return true;
		}
	}
	return false;
}

/**
 * 전송시 추가로 전달되는 파라미터를 추가합니다.
 * @param {cpr.core.AppInstance} app 앱인스턴스
 * @param {#submission} psSubmissionId 서브미션 ID
 * @param {String} psParamName 파라미터의 이름
 * @param {String} psValue 파라미터의 값
 * @return void
 */
SubmissionKit.prototype.addParameter = function(app, psSubmissionId, psParamName, psValue){
	/** @type cpr.protocols.Submission */
	var vcSubmission = app.lookup(psSubmissionId);
	vcSubmission.addParameter(psParamName, psValue);
};

/**
 * 전송시 추가로 전달되는 파라미터를 추가합니다.
 * @param {cpr.core.AppInstance} app 앱인스턴스
 * @param {#submission} psSubmissionId 서브미션 ID
 * @param {String} name 파라미터의 이름
 * @param {String} value 파라미터의 값
 * @return void
 */
SubmissionKit.prototype.addFileParameter = function(app, psSubmissionId, paFiles){
	/** @type cpr.protocols.Submission */
	var vcSubmission = app.lookup(psSubmissionId);
	if(paFiles == null) return;
	if(paFiles instanceof Array){
		paFiles.forEach(function(voFile){
			vcSubmission.addFileParameter("exb.fileupload.filelist", voFile);
		});
	}else{
		vcSubmission.addFileParameter("exb.fileupload.filelist", paFiles);
	}
};

/**
 * 전송시 추가로 전달되는 파라미터를 추가합니다.
 * @param {cpr.core.AppInstance} app 앱인스턴스
 * @param {#submission} psSubmissionId 서브미션 ID
 * @param {#datamap | #dataset} psDataId 데이터셋 또는 데이터맵 ID
 * @param {String} psAlias? 요청 데이터의 Alias명(요청데이터 명칭이 다른 경우에만 지정)
 * @param {String} psPayloadType? 요청 데이터의 payloadType (all, modified)
 * @return void
 */
SubmissionKit.prototype.addResponseData = function(app, psSubmissionId, psDataId, psAlias, psPayloadType){
	/** @type cpr.protocols.Submission */
	var submission = app.lookup(psSubmissionId);
	submission.addRequestData(app.lookup(psDataId), psAlias, psPayloadType);
};

/**
 * 전송시 추가로 응답데이터를 추가합니다.
 * @param {cpr.core.AppInstance} app 앱인스턴스
 * @param {#submission} psSubmissionId 서브미션 ID
 * @param {#datamap | #dataset} psDataId 데이터셋 또는 데이터맵 ID
 * @param {Boolean} pbAdd 데이터셋 옵션 설정된 데이터셋에 데이터를 모두 지우고 추가할지 기존 데이터를 남기고 추가 할지 여부
 * @param {String} psAlias? 응답 데이터의 Alias명(응답데이터 명칭이 다른 경우에만 지정)
 * @return void
 */
SubmissionKit.prototype.addResponseData = function(app, psSubmissionId, psDataId, pbAdd, psAlias){
	/** @type cpr.protocols.Submission */
	var submission = app.lookup(psSubmissionId);
	submission.addResponseData(app.lookup(psDataId), pbAdd, psAlias);
};

/**
 * 서브미션 호출<br/>
 * - 사이트별 Customizing 필요<br/>
 *  서브미션에 before-submit,  receive, submit-error, submit-success, submit-done 이벤트 부여
 * @param {cpr.core.AppInstance} app 앱인스턴스
 * @param {#submission} 	 psSvcId 서브미션 ID
 * @param {Function} successCallback 서브미션 후 콜백 메소드
 * @param {Boolean}  pbAppEnable? 서브미션 오류 및 exception 발생시 커버페이지를 쒸움
 * @param {String} maskType
 */
SubmissionKit.prototype.send = function(app, psSvcId, successCallback, pbAppEnable, maskType){
	var _app = app;
	var submission = _app.lookup(psSvcId);
	if(!submission || submission.status == "SENDING") return;
//	if(!submission) return;
	
	//context-path를 고려하여, action URL이 ../로 시작하도록 변경
	if(submission.action.indexOf("/") == 0){
		submission.action = ".."+submission.action;
	}
	
	// multipart/form-data인 경우 maskType을 pro로 설정
	if(submission.mediaType === "multipart/form-data") {
		maskType="pro";
	}
	
	//어플리케이션 전체에 마스크(Mask)를 씌운다.
	this._appKit.showLoadMask(app, maskType);
	
	if(submission.userAttr("responseType") === "TSV"){
		var loadmask = this._getLoadMask(submission);
		if(loadmask && loadmask.module.count){
			loadmask.module.count(0);
			loadmask.module.show();
		}
	}
	
	var vbSuccess = true;
	var _this = this;
	submission.addEventListenerOnce("before-submit", function(e){
		_this._onBeforeSubmit(e);
	});
	
	if(submission.userAttr("responseType") === "TSV"){
		submission.addEventListener("submit-load-progress", function(e){
			_this._onSubmitLoadProgress(e);
		}); 
	}
	
	if(submission.mediaType==="multipart/form-data") {
		submission.addEventListener("submit-upload-progress", function(e){
			_this._onSubmitUploadProgress(e);
		});
	}
	
	submission.addEventListenerOnce("receive", function(e){
		vbSuccess = _this._onSubmitReceive(e);
	}); 
			
	submission.addEventListenerOnce("submit-error", function(e){
		vbSuccess = _this._onSubmitError(e);
	}); 
			
	submission.addEventListenerOnce("submit-success", function(e){
		vbSuccess = _this._onSubmitSuccess(e, vbSuccess);
	});
	
	submission.addEventListenerOnce("submit-done", function(e) {
		_this._onSubmitDone(e, successCallback, vbSuccess, pbAppEnable);
	});
	
	this._appKit._activeSubmission[this._appKit._activeSubmission.length] = submission;
	submission.send();
};


/**
 * ComUdcBtnKit(공통, 버튼) 유틸
 * @constructor
 * @param {common.AppKit} appKit
 */
function ComUdcBtnKit(appKit){
	this._appKit = appKit;
};

/**
 * 지정한 컨트롤의 Enable 속성을 설정한다.
 * @param {cpr.core.AppInstance} app 앱인스턴스
 * @param {Boolean} pbEnable 컨트롤 활성화 여부
 * @param {String | Array} paCtlId 배열 [I:신규, D:삭제, S:저장, 미지정 : 전체]
 * @return void
 */
ComUdcBtnKit.prototype.setEnable = function(app, pbEnable, paCtlId) {
	if(!(paCtlId instanceof Array)){
		paCtlId = [paCtlId];
	}
	if (typeof (pbEnable) != "boolean") {
		pbEnable = ValueUtil.fixBoolean(pbEnable);
	}
	
	var comButton = this._appKit.Group.getAllChildrenByType(app, "udc.com.comButton");
	for (var i=0, len=comButton.length; i<len; i++) {	
		var ctrl = comButton[i];
		ctrl.setEnableCtrls(pbEnable, paCtlId);
	}
};

/**
 * 공통 버튼 UDC 있는 컨트롤의 이벤트를 발생시킨다.
 * @param {cpr.core.AppInstance} app 앱인스턴스
 * @param {#uicontrol} psCtlId 컨트롤의 아이디
 * @param {String} psEventType 이벤트명(ex-click)
 */
ComUdcBtnKit.prototype.dispatchEvent = function(app, psCtlId, psEventType){
	
	var comUdc;
	
	if(psCtlId == "btnSearch"){
		comUdc = this._appKit.Group.getAllChildrenByType(app, "udc.com.comBtnSearch");
	}else{
		comUdc = this._appKit.Group.getAllChildrenByType(app, "udc.com.comButton");
	}
	
	if(comUdc != null && comUdc.length > 0){
		var vcCtrl = comUdc[0].getEmbeddedAppInstance().lookup(psCtlId);
		if(vcCtrl){
			vcCtrl.dispatchEvent(new cpr.events.CEvent(psEventType));
		}
	}
};


exports.MsgKit = MsgKit;
exports.DialogKit = DialogKit;
exports.GroupKit = GroupKit;
exports.FreeFormKit = FreeFormKit;
exports.SelectKit = SelectKit;
exports.TreeKit = TreeKit;
exports.TabKit = TabKit;
exports.EmbeddedAppKit = EmbeddedAppKit;
exports.MDIKit = MDIKit;
exports.ControlKit = ControlKit;
exports.DataSetKit = DataSetKit;
exports.DataMapKit = DataMapKit;
exports.GridKit = GridKit;
exports.SubmissionKit = SubmissionKit;
exports.ComUdcBtnKit = ComUdcBtnKit;
