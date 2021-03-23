//공통 유틸(Util) 클래스
var util = createCommonUtil();

function onBodyLoad(/* cpr.events.CEvent */ e){
	var vcCtrl = app.getAppProperty("ctrl");
	if(vcCtrl){
		app.lookup("optTilte").value = vcCtrl.fieldLabel;
	}else{
		if(app.lookup("optTilte").value == ""){
			app.lookup("optTilte").value = "제목없음";
		}
	}
}



