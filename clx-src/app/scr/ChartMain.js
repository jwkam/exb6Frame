/************************************************
 * ChartMain.js
 * Created at 2021. 3. 19. 오후 3:12:20.
 *
 * @author csj
 ************************************************/



/*
 * 루트 컨테이너에서 load 이벤트 발생 시 호출.
 * 앱이 최초 구성된후 최초 랜더링 직후에 발생하는 이벤트 입니다.
 */
function onBodyLoad(/* cpr.events.CEvent */ e){
	
	
	app.lookup("mdi1").setSelectedTabItem(app.lookup("mdi1").getTabItems()[0]);
}
