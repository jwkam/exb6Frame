/************************************************
 * cmnCGrid.js
 * Created at 2020. 3. 9. 오후 12:49:14.
 *
 * @author skyha
 ************************************************/

var util = createCommonUtil();

/*
 * Body에서 load 이벤트 발생 시 호출.
 * 앱이 최초 구성된후 최초 랜더링 직후에 발생하는 이벤트 입니다.
 */
function onBodyLoad(/* cpr.events.CEvent */ e){

		/*공통 서비스 호출 (공통코드, 현재일자)*/
		
		/****************공통코드****************
		-	첫번째 인자: 응답받은 공통코드를 받을 데이터셋 ID
		-	두번째 인자: 조회할 공통코드 구분(CD_CLS)
		-	세번째 인자: 조회할 코드(CD)
		-	네번째 인자: 사용여부 (Y/)
		-	다섯번째 인자: 권한코드 여부
		***************************************/	

		/****************현재일자****************
		-	구분자: stime
		-	배열 첫번째 인자: 응답받을 데이터를 저장할 데이터맵 명
		-	배열 두번재 인자: 응답 데이터 노드명
		-	배열 세번째 인자: 날짜 포맷
		***************************************/

	var voParams = [
		            ["dsGenderRcd", "TMP001", "", "Y", "Y"],
				    ["dsStudDivRcd", "TMP002", "", "Y", "Y"],
				    ["dsDayNightDivRcd", "TMP003", "", "Y", "Y"],
				    ["dsNatRcd", "TMP004", "", "Y", "Y"],
				    ["dsBankRcd", "TMP005", "", "Y", "Y"],
				    {"stime":["dmTime", "strToday", "%Y%m%d"]}
				   ];

	util.Submit.send(app, "subOnload_tran", function(pbSuccess){
		if(pbSuccess){
			
		}
	}, voParams);
}


/**
 * 메시지 목록데이터를 조회한다.
 * @param psStatus - 조회 상태(저장 후 조회인 경우에는 'save' 구분값 넘김)
 */
function doList(psStatus){

	//조회 서브미션 호출
	util.Submit.send(app, "subList", function(pbSuccess){
		if(pbSuccess) {
			if(psStatus == "save"){
				//갱신된 데이터가 조회되었습니다.
				util.Msg.notify(app, "INF-M005");
			}else{
				//조회되었습니다.
				util.Msg.notify(app, "INF-M001");
			}
		}
	});
}

/*
 * 사용자 정의 컨트롤에서 search 이벤트 발생 시 호출.
 * 조회버튼 클릭시 이벤트
 */
function onCombtnsearch1Search(/* cpr.events.CUIEvent */ e){
	/** 
	 * @type udc.com.comBtnSearch
	 */
	var combtnsearch1 = e.control;
	
	// 데이터 변경사항 체크
	if (util.Grid.isModified(app, "grdCmnTmpReg", "CRM")) {
		return false;
	}
	
	// 조회조건 유효성 체크
	if(!util.validate(app, "grpSearch")) return false;
	
	doList();
	
	
}

 
/*
 * 사용자 정의 컨트롤에서 save 이벤트 발생 시 호출.
 * 저장 클릭 이벤트
 */
function onCombutton1Save(/* cpr.event.CUIEvent */ e){
	/** 
	 * @type udc.com.comButton
	 */
	var combutton1 = e.control;
	
	if (!util.Grid.isModified(app, "grdCmnTmpReg", "MSG")) return false;
	
	if (!util.validate(app, "grdCmnTmpReg")) return false;
	
	util.Submit.send(app, "subSave", function(pbSuccess){
		if(pbSuccess){
			doList("save");
		}
	});
}
