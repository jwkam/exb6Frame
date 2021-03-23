//공통 모듈 사용
var util = createCommonUtil();

/*
 * Body에서 load 이벤트 발생 시 호출.
 * 앱이 최초 구성된후 최초 랜더링 직후에 발생하는 이벤트 입니다.
 */
function onBodyLoad(/* cpr.events.CEvent */ e){
	
}

/*
 * "" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onAppheader1Search(/* cpr.events.CAppEvent */ e){
	//조회 서브미션 수행
	doList(function(pbSuccess) {
		// 조회 : "조회되었습니다." header 메세지 표시
		if (pbSuccess) {
			util.Msg.notify(app, "NLS-INF-M024");
		}
	});
}

/**
 * @desc 조회 event
 * @param poCallBackFunc 조회 후 callback함수
 */
function doList(poCallBackFunc) {
	util.Submit.send(app, "subList", function(pbSuccess){
		if(pbSuccess){
			// 조회 후 콜백함수 수행
			if(util.isFunc(poCallBackFunc)){
				 poCallBackFunc(pbSuccess);
			}
		}
	});
}

/*
 * "선택닫기" 버튼(btnSelect)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtnSelectClick(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btnSelect = e.control;
	
}

/*
 * "화면닫기" 버튼(btnClose)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtnCloseClick(/* cpr.events.CMouseEvent */ e){
	app.close();
}
