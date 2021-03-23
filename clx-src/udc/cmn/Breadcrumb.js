/************************************************
 * Breadcrumb.js
 * Created at 2020. 4. 24. 오전 9:24:24.
 *
 * @author ryu
 ************************************************/

/************************************************
 * 공통 모듈 선언
 ************************************************/
var util = createCommonUtil();

/************************************************
 * 전역 변수 선언
 ************************************************/

/************************************************
 * 사용자 정의 함수
 ************************************************/


/**
 * 
 */
function initalize() {
	var vcGrpCont = app.getContainer();
	var voGrpContLayout = vcGrpCont.getLayout();
	
	voGrpContLayout.horizontalAlign = app.getAppProperty("align");
}


/**
 * 
 */
function makeBreadcrumbs() {
	var vcGrpCont = app.getContainer();
	
	var vsBreadcrumbs = app.getAppProperty("values");
	var vsDelimiter = app.getAppProperty("delimiter");
	var vsClass = app.getAppProperty("class");
	
	if (ValueUtil.isNull(vsBreadcrumbs)){
		return;
	}
	
	/* 아이템 초기화 */
	vcGrpCont.removeAllChildren(true);
	
	/* 아이템 생성 */
	var vaBreadcrumbs = vsBreadcrumbs.split(vsDelimiter);
	vaBreadcrumbs.forEach(function(/* String */ each, index){
		var vcCrumb = new cpr.controls.Output("crumb" + (index + 1));
		
		vcCrumb.value = each;
		
		vcCrumb.style.setClasses("breadcrumb-item");
		
		if (vsClass != "default"){
			vcCrumb.style.addClass(vsClass);
		}
		
		vcGrpCont.addChild(vcCrumb, {
			height : "100%",
			autoSize : "width"
		});
	});
}

/************************************************
 * 컨트롤 이벤트
 ************************************************/

/*
 * Body에서 load 이벤트 발생 시 호출.
 * 앱이 최초 구성된후 최초 랜더링 직후에 발생하는 이벤트 입니다.
 */
function onBodyLoad(/* cpr.events.CEvent */ e){
	initalize();
}


/*
 * Body에서 property-change 이벤트 발생 시 호출.
 * 앱의 속성이 변경될 때 발생하는 이벤트 입니다.
 */
function onBodyPropertyChange(/* cpr.events.CPropertyChangeEvent */ e){
	makeBreadcrumbs();
}
