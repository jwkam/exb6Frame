/************************************************
 * GridPersonnel.js
 * Created at 2021. 3. 22. 오전 10:35:43.
 *
 * @author csj
 ************************************************/



/*
 * "그리드 개인화 저장하기" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onButtonClick(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var button = e.control;
	var vcGrd = app.lookup("grd1");	
	
	//그리드 레이아웃 정보를 반환합니다.
	var vcGrdLayout = vcGrd.getColumnLayout();
	
	//스토리지에 그리드 레이아웃을 저장
	localStorage.setItem( "grdLayout_" + vcGrd.id , JSON.stringify(vcGrdLayout));		
	alert("그리드 개인화가 저장되었습니다.")
}

function setColumnLayout(){
	
	var vcGrd = app.lookup("grd1");	
	
	var layout = localStorage.getItem("grdLayout_" + vcGrd.id);
	if (layout != null) {
		var grd1 = app.lookup("grd1");
		//그리드 레이아웃 정보를 세팅합니다
		grd1.setColumnLayout(JSON.parse(layout));
	}
	
	app.lookup("grd1").redraw();
	
}


/*
 * 루트 컨테이너에서 load 이벤트 발생 시 호출.
 * 앱이 최초 구성된후 최초 랜더링 직후에 발생하는 이벤트 입니다.
 */
function onBodyLoad(/* cpr.events.CEvent */ e){
	setColumnLayout();
}


/*
 * "개인화 리셋" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onButtonClick2(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var button = e.control;
	var vcGrd = app.lookup("grd1");
	//그리드 초기 설정 정보를 반환합니다. 
	var vcGrdInit = vcGrd.getInitConfig();
	//그리드 초기 설정으로 세팅합니다.
	vcGrd.init(vcGrdInit);
}
