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
	// 데이터 변경상태 체크
	if (util.Grid.isModified(app, "그리드ID", "CRM")) {
		return false;
	}
	
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
 * 사용자 정의 컨트롤에서 insert 이벤트 발생 시 호출.
 * 신규 클릭 이벤트
 */
function onAppheader1Insert(/* cpr.events.CAppEvent */ e){
	
}

/*
 * 사용자 정의 컨트롤에서 save 이벤트 발생 시 호출.
 */
function onAppheader1Save(/* cpr.events.CAppEvent */ e){
	doSave();
}

/**
 * @desc 작업저장 event
 * @return void
 */
function doSave() {
	// 그리드의 변경사항 유/무를 반환
	if (!util.Grid.isModified(app, "그리드ID", "MSG")) return false;
	
	// 그리드 유효성 검증
	if (!util.validate(app, "그리드ID")) return false;
	
	util.Submit.send(app, "subSave", function(pbSuccess){
		if(pbSuccess){
			//데이터 재조회
			doList(function(pbListSuccess) {
				if(pbListSuccess){
					// 조회 : "갱신된 데이터가 조회되었습니다." header 메세지 표시
					util.Msg.notify(app, "NLS-INF-M025");
				} 
			});
		}
	});
}



