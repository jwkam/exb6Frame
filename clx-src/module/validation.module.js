
//exports.id = "validation.module.js";

// 의존 모듈 선언.
module.depends("module/common");

/**
 * 공통 Validator Class
 */
Validator = function(appKit) {
	/** @type AppKit */
	this._appKit = appKit;
};

/**
 * 해당 값이 'E-mail' 유형인지 여부를 반환한다.
 * @param {String} value  값  문자열
 * @return {Boolean} true/false
 */
Validator.prototype.isEmail = function(value){
	if(!value) return true;
	
	if(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value)) {
		return true;
	}
	
	return false;
}

/**
 * 해당 값이 'URL' 형식에 맞는 문자열인지 여부를 반환한다.
 * @param {String} value  값  문자열
 * @return {Boolean} true/false
 */
Validator.prototype.isURL = function(value){
	if(!value) return true;
	
	// w3resource.com
	var regexp = /^(?:(?:https?|ftp):\/\/)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$/;
	if(regexp.test(value)) {
		return true;
	}
	
	return false;
}

/**
 * 해당 값이 '사업자 번호' 형식에 맞는 문자열인지 여부를 반환한다.
 * @param {String} value  값  문자열
 * @return {Boolean} true/false
 */
Validator.prototype.isBizCSN = function(value){
	if(!value) return true;
	
	// 넘어온 값의 정수만 추츨하여 문자열의 배열로 만들고 10자리 숫자인지 확인합니다.
	if ((value = (value + '').match(/\d{1}/g)).length != 10) {
		return false;
	}

	// 합 / 체크키
	var sum = 0, key = [1, 3, 7, 1, 3, 7, 1, 3, 5];

	// 0 ~ 8 까지 9개의 숫자를 체크키와 곱하여 합에 더합니다.
	for (var i = 0 ; i < 9 ; i++) { sum += (key[i] * Number(value[i])); }

	// 각 8번배열의 값을 곱한 후 10으로 나누고 내림하여 기존 합에 더합니다.
	// 다시 10의 나머지를 구한후 그 값을 10에서 빼면 이것이 검증번호 이며 기존 검증번호와 비교하면됩니다.
	return (10 - ((sum + Math.floor(key[8] * Number(value[8]) / 10)) % 10)) == Number(value[9]);
}

/**
 * 해당 값이 '주민등록번호' 형식에 맞는지 여부를 반환한다.<br>
 * 주민등록번호 체크 (전자정부프레임워크 : http://www.egovframe.go.kr/wiki/doku.php?id=egovframework:rte:ptl:validation:add_rules_in_commons_validator)
 * @param {String} value  값  문자열
 * @return {Boolean} true/false
 */
Validator.prototype.isSSN = function(value){
	if(!value) return true;
	value = value.replace(/[\-]/g, "");
	
	
	var fmt = /^\d{6}[1234]\d{6}$/;
	if(!fmt.test(value)){
		return false;
	}

	var birthYear = (value.charAt(7) <= "2") ? "19" : "20";
	birthYear += value.substr(0, 2);
	var birthMonth = value.substr(2, 2) - 1;
	var birthDate = value.substr(4, 2);
	var birth = new Date(birthYear, birthMonth, birthDate);

	if( birth.getYear() % 100 != value.substr(0, 2) ||
	    birth.getMonth() != birthMonth ||
	    birth.getDate() != birthDate) {
	    return false;
	}

	var arrDivide = [2, 3, 4, 5, 6, 7, 8, 9, 2, 3, 4, 5];            	
	var checkdigit = 0;            	
	for(var i = 0; i < value.length - 1; i++) {
		checkdigit += parseInt(value.charAt(i)) * parseInt(arrDivide[i]);
	}
	checkdigit = (11 - (checkdigit % 11)) % 10;
	if(checkdigit != value.charAt(12)){
		return false;
	} else {
		return true;
	}
}

/**
 * 해당 값이 일반 '전화번호' 형식에 맞는 문자열인지 여부를 반환한다.
 * @param {String} value 값  문자열
 * @return {Boolean} true/false
 */
Validator.prototype.isTelNo = function(value){
	if(!value) return true;
	if(/^\d{2,3}[\)\-\. ]?\d{3,4}[\-\. ]?\d{4}$/.test(value)){
		return true;
	}
	
	return false;
}

/**
 * 해당 값이 '핸드폰번호' 형식에 맞는 문자열인지 여부를 반환한다.
 * @param {String} value  값  문자열
 * @return {Boolean} true/false
 */
Validator.prototype.isTelMobile = function(value){
	if(!value) return true;
	if(/^01([0|1|6|7|8|9]?)[\-\. ]?([0-9]{3,4})[\-\. ]?([0-9]{4})$/.test(value)) {
		return true;
	}
	
	return false;
}

/**
 * 해당 값이 'function' 유형인지 여부를 반환한다.
 * @param {Function} poFunc  
 * @return {Boolean} true/false
 */
Validator.prototype.isFunc = function(poFunc){
	if (poFunc != null && (typeof poFunc == "function")) {
		return true;
	}else return false;
}

/**
 * 
 * @param {cpr.controls.UIControl} ctrl
 * @param {String} ctrlValue
 * @param {cpr.controls.UIControl} poParentCtl
 * @param {Number} pnIdx
 * @param {Number} pnCellIdx
 */
Validator.prototype.validate = function(ctrl, ctrlValue, poParentCtl, pnIdx, pnCellIdx, poRow, poMstCtrl) {
	if(!ctrl) return true;
	if(ctrl.type == "output" || ctrl.type == "img" || ctrl.type == "button") return true;
	
	//바인딩 및 헤더컬럼으로 수정 필요
	var vsFieldLabel = ctrl.fieldLabel;
	if(ValueUtil.isNull(vsFieldLabel) && ctrl.getHost){
		vsFieldLabel = ctrl.getHost().fieldLabel;
	}
	function getGridFieldLabel(poParentCtl, psFieldLabel){
		if(poParentCtl instanceof cpr.controls.Grid){
			var vcDetailCtl = poParentCtl.detail.getColumn(pnCellIdx);
			var vaHeaderCtl = poParentCtl.header.getColumnByColIndex(vcDetailCtl.colIndex, vcDetailCtl.colSpan);
			if(vaHeaderCtl.length > 0){
				var vcHeaderCtl = vaHeaderCtl[0];
				if(vcHeaderCtl){
					psFieldLabel = vcHeaderCtl.getText();
				}
			}
		}
		return psFieldLabel;
	}
	
	var _appKit = this._appKit;
	function parentValidMsg(psMsg, poParentCtl, pnIdx){
		//그리드 내 컨트롤
		if(poParentCtl instanceof cpr.controls.Grid){
			var vsMsg = _appKit.Msg.getMsg("WRN-M002", [poParentCtl.fieldLabel, Number(pnIdx)+1]);
			psMsg = vsMsg + " " + psMsg;
		}
		_appKit.Msg.alert(psMsg, "WARNING");
	}
	
	// 필수 입력 체크
	{
		var notnull = "";
		if(poParentCtl instanceof cpr.controls.Grid && ctrl instanceof cpr.controls.UDCBase){
			notnull = ctrl.getAppProperty("required") === true || ctrl.getAppProperty("required") === "Y" ? "Y" : "";
		}else{
			notnull = ctrl.userAttr("required");
		}
		if(notnull === "Y") {
			if(ctrlValue == null || new String(ctrlValue) == "") {
				vsFieldLabel = getGridFieldLabel(poParentCtl, vsFieldLabel);
				//{0}은(는) 필수 입력 항목입니다.
				var vsMsg = this._appKit.Msg.getMsg("WRN-M001", [vsFieldLabel]);
				parentValidMsg(vsMsg, poParentCtl, pnIdx);
				
				return false;
			}
		}
	}
	
	
	
	// 지정된 컬럼중 하나 이상 필수 입력 체크
	// 그리드일경우 columnname, 그룹 및 일반컨트롤일 경우 id
	{
		var xorNull = ctrl.userAttr("xorRequired");
		if(xorNull) {
			var vaXorNull = ValueUtil.split(xorNull.replace(/\[|\]/g,""), ",");
			var vsName = "";
			//그리드 내 컨트롤
			
			var vbStatus = false;
			if(poParentCtl instanceof cpr.controls.Grid){
				for (var j = 0; j < vaXorNull.length; j++) {
					var vsValue = poRow != null ? poRow.getValue(vaXorNull[j]) : poParentCtl.getCellValue(pnIdx, vaXorNull[j]);
					if(!ValueUtil.isNull(vsValue)){
						vbStatus = true;
						break;
					}
					var vaDetailCell = poParentCtl.detail.getColumnByName(vaXorNull[j]);
					vaDetailCell.some(function(vcCell){
						var vcHeaderCtl = poParentCtl.header.getColumn(vcCell.colIndex).control;
						if(vcHeaderCtl)
							vsName += vcHeaderCtl.getText() + " ,";
						//vsName += vcCell.control.userattr("name") + " ,";
					});
				}
				if(!vbStatus){
					//{0}중 하나는 필수 입력 항목입니다.
					var vsMsg = this._appKit.Msg.getMsg("WRN-M003", [vsName.substring(0, vsName.length -1)]);
					parentValidMsg(vsMsg, poParentCtl, pnIdx);
					return false;
				}
			}else{
				for (var j = 0; j < vaXorNull.length; j++) {
					var vcCtl = ctrl.getAppInstance().lookup(vaXorNull[j]);
					var vsValue = vcCtl.value;
					if(!ValueUtil.isNull(vsValue)){
						vbStatus = true;
						break;
					}
					vsName += vcCtl.fieldLabel + " ,";
				}
				
				if(!vbStatus){
					//{0}중 하나는 필수 입력 항목입니다.
					var vsMsg = this._appKit.Msg.getMsg("WRN-M003", [vsName.substring(0, vsName.length -1)]);
					parentValidMsg(vsMsg, poParentCtl, pnIdx);
					return false;
				}
			}
		}
	}
	
	// 나머지 항목은 값이 있을 때만 체크
	if(ctrlValue == null || ctrlValue == "") return true;
	
	// type check
	{
		var type = ctrl.userAttr("columnType");
		if(type) {
			var isChk = true;
			if(type == "email"){
				isChk = this.isEmail(ctrlValue);
			}else if(type == "ssn"){
				isChk = this.isSSN(ctrlValue);
			}else if(type == "bizno"){
				isChk = this.isBizCSN(ctrlValue);
			}else if(type == "phone"){
				isChk = this.isTelMobile(ctrlValue);
			}else if(type == "tel"){
				isChk = this.isTelNo(ctrlValue);
			}else if(type == "url"){
				isChk = this.isURL(ctrlValue);
			}
			if(isChk == false) {
				vsFieldLabel = getGridFieldLabel(poParentCtl, vsFieldLabel);
				//{0}은(는) 유효하지 않은 형식입니다.
				var vsMsg = this._appKit.Msg.getMsg("WRN-M004", [vsFieldLabel]);
				parentValidMsg(vsMsg, poParentCtl, pnIdx);
				return false;
			}
		}
	}
	
	// minlength
	{
		var minlength = ctrl.userAttr("minlength");
		if(minlength) {
			var minlengthNum = Number(minlength);
			var length = ValueUtil.getLength(ctrlValue, ctrl.lengthUnit);
			if(length < minlength) {
				vsFieldLabel = getGridFieldLabel(poParentCtl, vsFieldLabel);
				//{0}은(는) {1}자 이상으로 입력하십시오.
				var vsMsg = this._appKit.Msg.getMsg("WRN-M005", [vsFieldLabel, minlength]);
				parentValidMsg(vsMsg, poParentCtl, pnIdx);
				return false;
			}
		}
	}
	
	// fixlength
	{
		var fixlength = ctrl.userAttr("fixlength");
		if(fixlength) {
			var fixlength = Number(fixlength);
			var length = ValueUtil.getLength(ctrlValue, ctrl.lengthUnit);
			if(length != fixlength) {
				vsFieldLabel = getGridFieldLabel(poParentCtl, vsFieldLabel);
				//{0}은(는) {1} 자리수만큼 입력하십시오.
				var vsMsg = this._appKit.Msg.getMsg("WRN-M006", [vsFieldLabel, fixlength]);
				parentValidMsg(vsMsg, poParentCtl, pnIdx);
				return false;
			}
		}
	}
	
	{
		//두 값을 비교
		//그리드 일경우 컬럼명, 일반 컨트롤일 경우 컨트롤 id
		var compare = ctrl.userAttr("compare");
		if(!ValueUtil.isNull(compare)) {
			var compareCol = compare.substring(0, compare.indexOf(","));
			var compareType = compare.substr(compare.indexOf(",") + 1).trim();
			//그리드 내 컨트롤
			var vbStatus = false;
			var vsCompareColValue;
        	var vsCompareColLable;
        	var value = ctrlValue;
			if(poParentCtl instanceof cpr.controls.Grid){
				vsCompareColValue = poRow != null ? poRow.getValue(compareCol) : poParentCtl.getCellValue(pnIdx, compareCol);
				var vcDetailColumn = poParentCtl.detail.getColumnByName(compareCol)[0];
				var vaHeaderCol = poParentCtl.header.getColumnByColIndex(vcDetailColumn.colIndex, vcDetailColumn.colSpan);
				if(vaHeaderCol.length > 0){
					var vcHeaderCtl = vaHeaderCol[0];
					if(vcHeaderCtl){
						vsCompareColLable = vcHeaderCtl.getText();
					}
				}
			}else{
				vsCompareColValue = ctrl.getAppInstance().lookup(compareCol).value;
				vsCompareColLable = ctrl.getAppInstance().lookup(compareCol).fieldLabel
			}
			
			if(!ValueUtil.isNull(value) && !ValueUtil.isNull(vsCompareColValue)){
				var vbReturn = false;
				if (ValueUtil.isNumber(value) && ValueUtil.isNumber(vsCompareColValue)) {
					vbReturn = eval(value + compareType + vsCompareColValue);
				}else{
					vbReturn = eval("'"+value+"'" + compareType + "'"+vsCompareColValue+"'");
				}
		            
	            if (!vbReturn) {
	            	 vsFieldLabel = getGridFieldLabel(poParentCtl, vsFieldLabel);
	            	 var vsMsg = "";
	            	if(compareType == "<=" || compareType == "<" ){
	            		//{0}은(는) {1}보다 클 수 없습니다.
	            		vsMsg = this._appKit.Msg.getMsg("WRN-M009", [vsFieldLabel, vsCompareColLable]);
	            	}else if (compareType == ">=" || compareType == ">" ){
	            		//{0}은(는) {1}보다 작을수 없습니다.
	            		vsMsg = this._appKit.Msg.getMsg("WRN-M010", [vsFieldLabel, vsCompareColLable]);
	            	}else if (compareType == "==" || compareType == "="){
	            		//{0}은(는) {1}와 같아야 합니다.
	            		vsMsg = this._appKit.Msg.getMsg("WRN-M011", [vsFieldLabel, vsCompareColLable]);
	            	}else{
	            		
	            	}
	            	parentValidMsg(vsMsg, poParentCtl, pnIdx);
	                return false;
	            }
			}
		}
	}
	return true;
}

