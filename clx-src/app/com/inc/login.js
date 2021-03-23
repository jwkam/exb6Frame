/************************************************
 * 공통 모듈 선언
 ************************************************/
var util = createCommonUtil();

/**
 * 쿠키를 설정합니다.
 * 
 * @param {String} psName
 * @param {Strubg} psValue
 * @param {Number} pnExpireDate
 */
function setCookie(psName, psValue, pnExpireDate) {
	var voToday = new Date();
	voToday.setDate(voToday.getDate() + parseInt(pnExpireDate));
	document.cookie = psName + "=" + escape(psValue) + ";path=/;expires=" + voToday.toGMTString() + ";";
}


/**
 * 쿠키를 가져옵니다.
 * @param {String} psName
 */
function getCookie(psName) {
	var vsCookie = document.cookie + ";";

	var vaItems = vsCookie.split(";");
	var vnItemLen = vaItems.length;
	var item = null;
	var voItemInfo = null;
	for (var i = 0; i < vnItemLen; i++) {
		item = vaItems[i];
		voItemInfo = item.split("=");
		if (psName == voItemInfo[0].trim()) {
			return unescape(voItemInfo[1]);
		}
	}
}

function deleteCookie(name) {
	var expireDate = new Date();
	expireDate.setDate(expireDate.getDate() - 1);
	document.cookie = name + "= " + "; expires=" + expireDate.toGMTString() + "; path=/";
}


/************************************************
 * 컨트롤 이벤트
 ************************************************/
/*
 * Body에서 load 이벤트 발생 시 호출.
 * 앱이 최초 구성된후 최초 랜더링 직후에 발생하는 이벤트 입니다.
 */
function onBodyLoad(/* cpr.events.CEvent */ e){
	/* 쿠키 설정 */
	var vsCookieId = getCookie("expuid");
	var dsParam = app.lookup("dsParam");
	
	console.log(vsCookieId);
	if (!ValueUtil.isNull(vsCookieId)){
		util.DataMap.setValue(app, "dsParam", "USER_ID", vsCookieId);
		app.lookup("cbxRmbr").checked = true;

		app.lookup("ipbPw").focus();
	} else {
		app.lookup("ipbUserNm").focus();
	}
	
	util.Control.redraw(app, "grpLoginBd");
	
	//어플리케이션 로케일  조회 (다국어 및 language.json 필요시)
	//app.lookup("subLocale").send();
}


/*
 * 인풋 박스에서 keydown 이벤트 발생 시 호출.
 * 사용자가 키를 누를 때 발생하는 이벤트.
 */
function onIpbUserNmKeydown(/* cpr.events.CKeyboardEvent */ e){
	/** 
	 * @type cpr.controls.InputBox
	 */
	var ipbUserNm = e.control;
	
	if (e.keyCode == cpr.events.KeyCode.ENTER){
		app.lookup("ipbPw").focus();
	}
}


/*
 * 인풋 박스에서 keydown 이벤트 발생 시 호출.
 * 사용자가 키를 누를 때 발생하는 이벤트.
 */
function onIpbPwKeydown(/* cpr.events.CKeyboardEvent */ e){
	/** 
	 * @type cpr.controls.InputBox
	 */
	var ipbPw = e.control;
	
	if (e.keyCode == cpr.events.KeyCode.ENTER){
		app.lookup("btnLogin").click();
	}
}


/*
 * 체크 박스에서 value-change 이벤트 발생 시 호출.
 * CheckBox의 value를 변경하여 변경된 값이 저장된 후에 발생하는 이벤트.
 */
function onCbxScrtValueChange(/* cpr.events.CValueChangeEvent */ e){
	/** 
	 * @type cpr.controls.CheckBox
	 */
	var vcCbxScrt = e.control;
	
	var vcIpbPw = app.lookup("ipbPw");
	
	if (vcCbxScrt.checked){
		vcIpbPw.secret = true;
	} else {
		vcIpbPw.secret = false;
	}
}


/*
 * "Log In" 버튼(btnLogin)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtnLoginClick(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btnLogin = e.control;
	
	//TODO 로그인 관련 Validate 처리를 작성하십시오.
	var dsParam = app.lookup("dsParam");
	var username = dsParam.getValue("USER_ID");
	
	if(!util.validate(app, ["ipbUserNm", "ipbPw"])) return false;

	var vcCbxRmbr = app.lookup("cbxRmbr");
	if (vcCbxRmbr.checked == true) {
		setCookie("expuid", username, 30);
	} else {
		deleteCookie("expuid");
	}
	//로그인 서브미션 호출;
	util.Submit.send(app, "subLogin", function(pbSuccess){
		debugger;
		if(pbSuccess){
			var sublogin = app.lookup("subLogin");
			var appId = sublogin.getMetadata("uri");
			var msg = sublogin.getMetadata("msg");
			if(msg != null) {
				alert(msg);
				return;
			}
		    /* 메인 화면으로 전환 (SPA 전환) */
			cpr.core.App.load(appId, function(loadedApp){
				loadedApp.createNewInstance().run();
				app.dispose();
			});

		}
	});
}



/*
 * "Signup now" 아웃풋(optRgstr)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onOptRgstrClick(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Output
	 */
	var optRgstr = e.control;
	
	/* 회원가입 화면으로 전환 (SPA 전환) */
//	cpr.core.App.load("app/com/inc/Register", function(loadedApp){
//		loadedApp.createNewInstance().run();
//		app.dispose();
//	});
}



