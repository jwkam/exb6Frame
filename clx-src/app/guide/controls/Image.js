/************************************************
 * Image.js
 * Created at 2020. 12. 14. 오전 10:21:44.
 *
 * @author SUL
 ************************************************/



/*
 * 이미지에서 item-click 이벤트 발생 시 호출.
 * 이미지 영역 아이템 클릭시 발생하는 이벤트.
 */
function onImg2ItemClick(/* cpr.events.CItemEvent */ e){
	// 클릭한 영역 아이템
	var areaItem = e.item;
	
	// 클릭한 영역 아이템의 label 출력
	console.log(areaItem.label);
}
