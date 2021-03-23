/************************************************
 * udc_split.js
 * Created at 2019. 5. 23. 오전 11:36:34.
 *
 * @author kim su hyun
 ************************************************/

var vnRightWitdh = "0px";

/**
 * UDC 컨트롤이 그리드의 뷰 모드에서 표시할 텍스트를 반환합니다.
 */
exports.getText = function() {
	// TODO: 그리드의 뷰 모드에서 표시할 텍스트를 반환하는 하는 코드를 작성해야 합니다.
	return "";
};

exports.clickSplitBtn = function() {
	app.lookup("btn").click();
};

var btn_next = null; // next 버튼 udc

/*
 * "" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtnClick( /* cpr.events.CMouseEvent */ e) {
	/**
	 * @type cpr.controls.Button
	 */
	var btn = e.control;
	var voHostApp = app.getHostAppInstance();
	//우측 그룹 ID
	var vsRightGrpId = app.getAppProperty("rightGrpId");
	//좌측 그룹 ID
	var vsLeftGrpId = app.getAppProperty("leftGrpId");

	//우측 그룹 컨트롤
	var vcRightGrp = voHostApp.lookup(vsRightGrpId);

	if(ValueUtil.isNull(vsRightGrpId) || ValueUtil.isNull(vsLeftGrpId)){
		return false;
	}

//	vcRightGrp.style.css("opacity", "1");
//		vcRightGrp.style.animateFrom({
//				"transform": "translateX(100%)",
//				"opacity": "0"
//			}, 0.3, cpr.animation.TimingFunction.EASE_IN_OUT_CUBIC);


	var vcParentCtl = vcRightGrp.getParent();

	var voParentLayOut = vcParentCtl.getLayout();
	var vnRIdx = indexFnc(vcParentCtl, vsRightGrpId);
	var vnLIdx = indexFnc(vcParentCtl, vsLeftGrpId);
	
	var voConst = vcParentCtl.getConstraint(vcRightGrp);
	var layOut = [];
		//상세보임
		if (voParentLayOut.isColumnVisible(voConst.colIndex)) {
			
			vnRIdx.forEach(function(each){
				voParentLayOut.setColumnVisible(each, false);
			});
			
//			vnLIdx.forEach(function(each){
//				voParentLayOut.setColumnVisible(each, true);
//			});
			
		} else {
			vnRIdx.forEach(function(each){
				voParentLayOut.setColumnVisible(each, true);
			});
	}
	app.dispatchEvent(new cpr.events.CUIEvent("clickCallFunc"));
}

/**
 * 스플릿 영역을 기준으로 좌측, 우측 컨트롤의 인덱스를 알아오는 함수
 * @param {String} parent 부모 컨테이너
 * @param {String} appID 좌측 또는 우측 컨트롤의 아이디
 * */
function indexFnc(parent, appID) {
	var index = null;
	var range = [];
	parent.getChildren().filter(function(each) {
		if (each.id == appID) {
			var voConst = parent.getConstraint(each);
			
			// colSpan 없는 경우
			if (voConst.colSpan == null) {
				for (var idx = voConst.colIndex; idx <= voConst.colIndex; idx++) {
		        	range.push(idx);
		      }
			} else {
				for (var idx = voConst.colIndex; idx < voConst.colIndex + voConst.colSpan; idx++) {
		        	range.push(idx);
		      }
			}
		      
			//index = voConst.colIndex;
			
			
		}
	});
	return range;
}

/*
 * Body에서 init 이벤트 발생 시 호출.
 * 앱이 최초 구성될 때 발생하는 이벤트 입니다.
 */
function onBodyInit( /* cpr.events.CEvent */ e) {
	/** @type cpr.controls.UDCBase */
//	btn_next = new udc.com.udcFloat("btn_next");
}

/*
 * Body에서 property-change 이벤트 발생 시 호출.
 * 앱의 속성이 변경될 때 발생하는 이벤트 입니다.
 */
function onBodyPropertyChange( /* cpr.events.CPropertyChangeEvent */ e) {

	var vsProperty = e.property;

}

/*
 * Body에서 load 이벤트 발생 시 호출.
 * 앱이 최초 구성된후 최초 랜더링 직후에 발생하는 이벤트 입니다.
 */
function onBodyLoad(/* cpr.events.CEvent */ e){

	var vbScrChg = app.getAppProperty("screenChange");
	return false;
	if(vbScrChg){
		var voHostApp = app.getHostAppInstance();

		if(ValueUtil.isNull(voHostApp)) return;

		//우측 그룹 ID
		var vsRightGrpId = app.getAppProperty("rightGrpId");
		//좌측 그룹 ID
		var vsLeftGrpId = app.getAppProperty("leftGrpId");

		//그리드 ID
		var vsGridId = app.getAppProperty("leftGridId");

		//우측 그룹 컨트롤
		var vcRightGrp = voHostApp.lookup(vsRightGrpId);

		//우측 그리드 컨트롤
		var vcGrid = voHostApp.lookup(vsGridId);

		if(ValueUtil.isNull(vsRightGrpId) || ValueUtil.isNull(vsLeftGrpId)){
			return false;
		}

		var vcParentCtl = vcRightGrp.getParent();

		var voParentLayOut = vcParentCtl.getLayout();
		var vnRIdx = indexFnc(vcParentCtl, vsRightGrpId);
		var vnLIdx = indexFnc(vcParentCtl, vsLeftGrpId);


		voHostApp.addEventListener("screen-change", function( /* cpr.events.CScreenChangeEvent */ sc) {
//
//			btn_next.style.css({
//				"bottom": "20px",
//				"left": "20px",
//				"width": "80px",
//				"height": "30px"
//				});
//			vcParentCtl.floatControl(btn_next);
////			vcParentCtl.floatControl(btn_next, {
////				"bottom": "20px",
////				"left": "20px",
////				"width": "80px",
////				"height": "30px"
////			});
//			btn_next.visible = false;
//
//			// 웹
//			if (app.targetMediaName == "default") {
//				voParentLayOut.setColumnVisible(vnLIdx, true);
//				voParentLayOut.setColumnVisible(vnRIdx, true);
//				btn_next.visible = false;
//			}
//			// 모바일
//			else {
//				// 모바일 사이즈일 경우 master 부분만 보인다.
//				voParentLayOut.setColumnVisible(vnLIdx, true);
//				voParentLayOut.setColumnVisible(vnRIdx, false);
//			}

		});

			// master 그룹안에 그리드를 선택했을 때 detail 보이고 안보이도록
//		vcGrid.addEventListener("selection-change", function(e) {
//			if (app.targetMediaName != "default") {
//
//				vcRightGrp.style.css("opacity", "1");
//				vcRightGrp.style.animateFrom({
//						"transform": "translateX(100%)",
//						"opacity": "0"
//					}, 0.3, cpr.animation.TimingFunction.EASE_IN_OUT_CUBIC);
//
//				if (voParentLayOut.isColumnVisible(vnRIdx)) {
//					voParentLayOut.setColumnVisible(vnRIdx, false);
//					voParentLayOut.setColumnVisible(vnLIdx, true);
//					btn_next.visible = false; // Next 버튼이 보여야 한다.
//				} else {
//					voParentLayOut.setColumnVisible(vnRIdx, true);
//					voParentLayOut.setColumnVisible(vnLIdx, false);
//					btn_next.visible = true;
//				}
//
//				btn_next.addEventListener("nextClick", function(e) {
//					voParentLayOut.setColumnVisible(vnRIdx, false);
//					voParentLayOut.setColumnVisible(vnLIdx, true);
//					btn_next.visible = false;
//				});
//			}
//		});

	}

}
