
//exports.id = "util.module.js";

/**
 * @class AppUtil AppInstance에 대한 유틸
 */
AppUtil = {
    /**
     * 해당 앱의 속성(Property)값을 할당한다.
     * @param {cpr.core.AppInstance} app - 앱인스턴스 객체
	 * @param {String | Object} propertyName App 속성
	 * @param {String | Object} value App 속성값
	 * @param {boolean} pbEvent value-change 이벤트 발생여부  (default : true)
	 * @return void
     */
    setAppProperty : function (app, propertyName, value, pbEvent) {
    	pbEvent = pbEvent == null ? true : pbEvent;
    	
        /** @type cpr.core.AppInstance */
        var _app = app;
        var hostApp = _app.getHostAppInstance();
        var property = _app.getAppProperty(propertyName);
        if(hostApp && hostApp.lookup(property) && hostApp.lookup(property) instanceof cpr.controls.UIControl){
        	if(pbEvent){
        		hostApp.lookup(property).value = value;
        	}else{
        		hostApp.lookup(property).putValue(value);
        	}
        }else{
        	_app.setAppProperty(propertyName, value);
        }
    },
    
    /**
     * UDC 컨트롤에 대해 value 앱 속성에 바인딩된 컨트롤 객체를 반환한다.
     * @param {cpr.controls.UIControl} poCtrl
     */
    getUDCBindValueControl : function(poCtrl){
    	var vcBindCtrl = poCtrl;
    	var embApp = poCtrl.getEmbeddedAppInstance();
		embApp.getContainer().getChildren().some(function(embCtrl){
			if(embCtrl.type == "container"){
				embCtrl.getChildren().some(function(subembCtrl){
					if(subembCtrl.getBindInfo("value") && subembCtrl.getBindInfo("value").property == "value"){
						vcBindCtrl = subembCtrl;
						return true;
					}
				});
			}else{
				if(embCtrl.getBindInfo("value") && embCtrl.getBindInfo("value").property == "value"){
					vcBindCtrl = embCtrl;
					return true;
				}
			}
		});
		
		return vcBindCtrl;
    }
 };

/**
 * @class ValueUtil Value 체크 및 형 변환
 */
ValueUtil = {
    /**
     * 해당 값이 Null인지 여부를 체크하여 반환한다.
	 * @param {String | Object} puValue		값
	 * @return {Boolean} Null 여부
     */
    isNull : function (puValue) {
        return (this.fixNull(puValue) == "");
    },

    /**
     * 해당 값이 숫자(Number) 타입인지 여부를 반환한다.
	 * @param {Number | String} puValue		값
	 * @example ValueUtil.isNumber("1234.56") == true
	 * @return {Boolean} Number인지 여부
     */
    isNumber : function (puValue) {
        var vnNum = Number(puValue);
        return isNaN(vnNum) == false;
    },

    /**
     * 해당 값에 대한 문자열을 반환한다. 
     *       만약 해당값이 null이거나 정의되지 않은 경우, 공백("") 문자열을 반환한다.
	 * @param {String | Object} puValue		값
	 * @return {String} 문자열 String
     */
    fixNull : function (puValue) {
        var vsType = typeof(puValue);
        if (vsType == "string" || (vsType == "object" && puValue instanceof String)) {
			puValue = this.trim(puValue);
        }
		
        return (puValue == null || puValue == "null" || puValue == "undefined") ? "" : String(puValue);
    },

     /**
     * 해당 값을 불리언(Boolean) 타입으로 변환한다.
	 * @param {Boolean | Object} puValue		값
	 * @return {Boolean} 불리언 유형으로 반환
     */
    fixBoolean : function (puValue) {
        if (typeof(puValue) == "boolean" || puValue instanceof Boolean) {
            return puValue;
        }
        if (typeof(puValue) == "number" || puValue instanceof Number) {
            return puValue != 0;
        }
        return (this.fixNull(puValue).toUpperCase() == "TRUE");
    },

    /**
     * 해당 값을 숫자(Number) 타입으로 변환한다.
	 * @param {Object} puValue		값
	 * @return {Number} 숫자 타입으로 반환
     */
    fixNumber : function (puValue) {
        if (typeof(puValue) == "number" || puValue instanceof Number) {
            return puValue;
        }
        var vnNum = Number(this.fixNull(puValue));
        return isNaN(vnNum) ? 0 : vnNum;
    },
    
    /**
     * 해당 값을 숫자(Float) 타입으로 변환한다.
	 * @param {Object} puValue		값
	 * @return {Float} 소수점이 있는 숫자 타입으로 반환
     */
    fixFloat : function (puValue) {
        if (typeof(puValue) == "number" || puValue instanceof Number) {
            return puValue;
        }
        var vnFloat = parseFloat(this.fixNull(puValue));
        return isNaN(vnFloat) ? 0 : vnFloat;
    },
    
    /**
     * 해당 값의 앞/뒤 공백을 제거한 문자열을 반환한다.
	 * @param {String} psValue		값
	 * @return {String} 공백 제거된 문자열
     */
    trim : function (psValue) {
        return psValue == null ? psValue : psValue.replace(/(^\s*)|(\s*$)/g, "");
    },
    
    /**
     * 문자열을 split한 배열을 반환한다.
	 * @param {String} psValue		split 대상 문자열
	 * @param {String} psDelemeter  구분문자 (ex: 콤마(,))
	 * @return {Array} 문자열 배열
     */
    split : function (psValue, psDelemeter) {
    	psValue = this.fixNull(psValue);
        var vaValues = new Array();
        var vaTemp = psValue.split(psDelemeter);
        var _this = this;
        vaTemp.forEach(function(/* eachType */ item){
        	vaValues.push(_this.trim(item));
        });
        
        return vaValues;
    },
    
    /**
     * 문자열 데이터의 길이(length)를 반환한다.
	 * @param {String} value		값
	 * @param {"char" | "utf8" | "ascii"} unit? 단위<br/>
     * [char] : 문자의 길이.<br/>
 	 * [utf8] : utf8 기준의 문자 byte size.<br/>
 	 * [ascii] : ascii 기준의 문자 byte size.
	 * @return {Number} 문자열 길이
     */
    getLength : function(value, unit) {
    	if(!unit) unit = "char";
    	
		var length = 0;
		switch(unit) {
			case "utf8":{
//				for(var i = 0, c; c = value.charAt(i++); length += (c >> 11 ? 3 : c >> 7 ? 2 : 1));
				for(var i=0, len=value.length; i<len; i++) {
				    if(escape(value.charAt(i)).length >= 4)
				        length += 3;
				    else if(escape(value.charAt(i)) == "%A7")
				        length += 3;
				    else if(escape(value.charAt(i)) != "%0D")
				        length++;
				    else length++;
				}
				break;
			}
			case "ascii":{
				for(var i = 0, c; c = value.charAt(i++); length += c >> 7 ? 2 : 1);
				break;
			}
			default : {
				length = value.length;
			}
		}
		
		return length;
    },
    getByteLength: function(/*String*/_str){
    	var stringByteLength = 0;
    	stringByteLength = (function(s,b,i,c){
		    for(b=i=0;c=s.charCodeAt(i++);b+=c>>11?2:c>>7?2:1);
		    return b
		})(_str);

		return stringByteLength;
    }
 };

/**
 * @class 날짜 유틸 클래스
 */
DateUtil = {

    /**
     * 날짜를 지정한 패턴의 문자열로 반환한다.
	 * @param {Date} poDate			날짜
	 * @param {String} psPattern	포맷 문자열(ex: YYYYMMDD)
	 * @return {String} 날짜 문자열
     */
    format : function (poDate, psPattern) { // dateValue As Date, strPattern As String
        var CAL_INITIAL = {
		    MONTH_IN_YEAR :         ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
		    SHORT_MONTH_IN_YEAR :   ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
		    DAY_IN_WEEK :           ["Sunday", "Monday", "Tuesday", "Wednesday","Thursday", "Friday", "Saturday"],
		    SHORT_DAY_IN_WEEK :     ["Sun", "Mon", "Tue", "Wed","Thu", "Fri", "Sat"]
		};
        
        var year      = poDate.getFullYear();
	    var month     = poDate.getMonth() + 1;
	    var day       = poDate.getDate();
	    var dayInWeek = poDate.getDay();
	    var hour24    = poDate.getHours();
	    var ampm      = (hour24 < 12) ? "AM" : "PM";
	    var hour12    = (hour24 > 12) ? (hour24 - 12) : hour24;
	    var min       = poDate.getMinutes();
	    var sec       = poDate.getSeconds();
	
	    var YYYY = "" + year;
	    var YY   = YYYY.substr(2);
	    var MM   = (("" + month).length == 1) ? "0" + month : "" + month;
	    var MON  = CAL_INITIAL.MONTH_IN_YEAR[month-1];
	    var mon  = CAL_INITIAL.SHORT_MONTH_IN_YEAR[month-1];
	    var DD   = (("" + day).length == 1) ? "0" + day : "" + day;
	    var DAY  = CAL_INITIAL.DAY_IN_WEEK[dayInWeek];
	    var day  = CAL_INITIAL.SHORT_DAY_IN_WEEK[dayInWeek];
	    var HH   = (("" + hour24).length == 1) ? "0" + hour24 : "" + hour24;
	    var hh   = (("" + hour12).length == 1) ? "0" + hour12 : "" + hour12;
	    var mm   = (("" + min).length == 1) ? "0" + min : "" + min;
	    var ss   = (("" + sec).length == 1) ? "0" + sec : "" + sec;
	    var SS   = "" + poDate.getMilliseconds();
		
	    var dateStr;
	    var index = -1;
	    if (typeof(psPattern) == "undefined") {
	        dateStr = "YYYYMMDD";
	    } else {
	        dateStr = psPattern;
	    }
	
	    dateStr = dateStr.replace(/YYYY/g, YYYY);
	    dateStr = dateStr.replace(/yyyy/g, YYYY);
	    dateStr = dateStr.replace(/YY/g,   YY);
	    dateStr = dateStr.replace(/MM/g,   MM);
	    dateStr = dateStr.replace(/MON/g,  MON);
	    dateStr = dateStr.replace(/mon/g,  mon);
	    dateStr = dateStr.replace(/DD/g,   DD);
	    dateStr = dateStr.replace(/dd/g,   DD);
	    dateStr = dateStr.replace(/day/g,  day);
	    dateStr = dateStr.replace(/DAY/g,  DAY);
	    dateStr = dateStr.replace(/hh/g,   hh);
	    dateStr = dateStr.replace(/HH/g,   HH);
	    dateStr = dateStr.replace(/mm/g,   mm);
	    dateStr = dateStr.replace(/ss/g,   ss);
	    dateStr = dateStr.replace(/(\s+)a/g, "$1" + ampm);
	
	    return dateStr;
    },

    /**
     * 올바른 날짜인지를 체크한다.
	 * @param {Number | String} puYear			년도
	 * @param {Number | String} puMonth			월
	 * @param {Number | String} puDay			일
	 * @return {Boolean} 유효한 날짜인지 여부
    */
    isValid : function (puYear, puMonth, puDay) {
    	var pnYear = Number(puYear);
    	var pnMonth = Number(puMonth);
    	var pnDay = Number(puDay);
        var vdDate = new Date(pnYear, pnMonth-1, pnDay);
        return vdDate.getFullYear() == pnYear      &&
               vdDate.getMonth   () == pnMonth - 1 &&
               vdDate.getDate    () == pnDay;
    },

    /**
     * 현재 날짜에 해당 날짜만큼 더한 날짜를 반환한다.
	 * @param {String} psDate			날짜 문자열(ex: 20180101)
	 * @param {Number} pnDayTerm		추가 일수
	 * @return {String} 날짜 문자열
    */
    addDate : function (psDate, pnDayTerm) { 
    	var pnYear 	= Number(psDate.substring(0,4));
    	var pnMonth = Number(psDate.substring(4,6));
    	var pnDay 	= Number(psDate.substring(6,8));

    	if (this.isValid(pnYear, pnMonth, pnDay)) {
	    	var vdDate = new Date(pnYear, pnMonth-1, pnDay);
	    	var vnOneDay = 1*24*60*60*1000 ; /* 1day,24hour,60minute,60seconds,1000ms */
	    	
	    	var psTime = vdDate.getTime() + (Number(pnDayTerm)*Number(vnOneDay));
	    	vdDate.setTime(psTime);
	    	
	        return this.format(vdDate,"YYYYMMDD");
    	}else{
    		return psDate;
    	}
    },
    
    /**
     * 날짜 문자열을 Date형으로 변환하여 반환한다.
     * <pre><code>
     * DateUtil.toDate("2007-02-09","YYYY-MM-DD");
 	 * </code></pre>
	 * @param {Date} psDateTime			날짜
	 * @param {String} psPattern	포맷 문자열(ex: YYYY-MM-DD)
	 * @example DateUtil.toDate("2007-02-09","YYYY-MM-DD")
	 * @return {Date} 날짜(Date) 객체
     */ 
    toDate : function (psDateTime, psPattern) {
        var vdDate = new Date();
        var vnIdx, vnCnt;

        var vsaFmt = ["Y", "M", "D", "H", "m", "s", "S"];
        var vnFmtLen = vsaFmt.length;
        var vnPtnLen = psPattern.length;
        var vnaNums = [vdDate.getFullYear(), vdDate.getMonth()+1, vdDate.getDate(), vdDate.getHours(), vdDate.getMinutes(), vdDate.getSeconds(), vdDate.getMilliseconds()];

        for (var i = 0; i < vnFmtLen; i++) {
            vnIdx = psPattern.indexOf(vsaFmt[i]);
            if (vnIdx != -1) {
                vnCnt = 1;
                for (var j=vnIdx+1; j < vnPtnLen; j++) {
                    if (psPattern.charAt(j) != vsaFmt[i]) { break; }
                    vnCnt++;
                }
                vnaNums[i] = Number(psDateTime.substring(vnIdx, vnIdx+vnCnt));
            } else {
                if(i==0) vnaNums[0] = 1900;
                else if(i==2) vnaNums[2] = 01;
            }
        }

        if (vnaNums[0] < 1900) { // 년도는 검증
            if (vnaNums[0] <= vdDate.getFullYear() % 100) {
                vnaNums[0] += vdDate.getFullYear() - (vdDate.getFullYear() % 100);
            } else if (vnaNums[0] < 100) {
                vnaNums[0] += 1900;
            } else {
                vnaNums[0] = 1900;
            }
        }

        return new Date(vnaNums[0], vnaNums[1]-1, vnaNums[2], vnaNums[3], vnaNums[4], vnaNums[5], vnaNums[6]);
    },

    /**
     * 해당월의 마지막 일자를 반환한다.
     * <pre><code>
     * DateUti.getMonthLastDay("20180201");<br>
     * <p>또는<p>
     * DateUti.getMonthLastDay("20180301", -1);
 	 * </code></pre>
	 * @param {String} psDate	년월 문자열(ex: 201802, 20180201)
	 * @param {Number} pnAdd?   +/- 월 수
	 * @return {Number} 일(Day)
     */ 
    getMonthLastDay : function (psDate, pnAdd) {
    	var pnYear 	= Number(psDate.substring(0,4));
    	var pnMonth = Number(psDate.substring(4,6));
        var vdDate = new Date(pnYear, pnMonth, 0, 1, 0, 0);
        if(pnAdd == null){
        	return vdDate.getDate();
        }else{
        	var vdDate2 = new Date(vdDate.getFullYear(), vdDate.getMonth()+1+pnAdd, 0, 1, 0, 0);
        	return vdDate2.getDate();
        }
    },

    /**
     * 두 날짜간의 일(Day)수를 반환한다.
	 * @param {String} psDate1st	년월 문자열(ex: 20180201)
	 * @param {String} psDate2nd    년월 문자열(ex: 20170201)
	 * @return {Number} 일수(Day)
     */
    getDiffDay : function (psDate1st, psDate2nd) {
    	var date1 = this.toDate(psDate1st, "YYYYMMDD");
    	var date2 = this.toDate(psDate2nd, "YYYYMMDD");
        
        return parseInt((date2 - date1)/(1000*60*60*24));
    },
    
    /**
     * <pre><code>
     *  DateUtil.addMinutes("0900", 50);
     * </code></pre>
     * @param {String} psHHmm 특정분을 더할 시분 값
	 * @param {String} pnAddMinutes 더할 분
	 * @return {String} 시분(HHmm)
     */
    addMinutes : function (psHHmm, pnAddMinutes) {
    	var vdDate = DateUtil.toDate(psHHmm, "HHmm");
		vdDate.setMinutes(vdDate.getMinutes() + pnAddMinutes);
		
		var vnHours = vdDate.getHours();
		var vnMinutes = vdDate.getMinutes();
		
		var vsHours = "";
		var vsMinutes = "";
		
		if(vnHours < 10){
			vsHours = "0" + vnHours;
		}else{
			vsHours = vnHours + "";
		}
		
		if(vnMinutes < 10){
			vsMinutes = "0" + vnMinutes;
		}else{
			vsMinutes = vnMinutes + "";
		}
		
		return vsHours + vsMinutes;
    },
    
    getCurrentTime : function() {
    	return new Date().getTime();
    },
    
    /**
     * 입력한 일자에 해당되는 한글 요일을 반환한다.
     * <pre><code>
     * DateUti.getDayOfWeek("20191120");
 	 * </code></pre>
	 * @param {String} psDate 일자 문자열(ex:20191120)
	 * @return {String} 한글 요일
     */ 
    getDayOfWeek : function (psDate) {
    	
    	var vsYear 	= psDate.substring(0,4);
    	var vsMonth = psDate.substring(4,6);
    	var vsDay 	= psDate.substring(6,8);
    	var vaWeek  = ['일', '월', '화', '수', '목', '금', '토'];
    	
		return vaWeek[new Date(vsYear + "-" + vsMonth + "-" + vsDay).getDay()];
    }
};

/**
 * @class 파일 유틸 클래스
 */
FileUtil = {
	//업로드 가능한 파일 확장자 목록반환
	getPemitedFileExts : function(){
		var vaFileExt = [
						'JPG' , 'PNG' , 'GIF', 'BMP'
						, 'TIF', 'TIFF', 'JFIF'
						, 'TXT', 'CSV', 'HWP', 'DOCX', 'GNG'
						, 'DOC', 'DOCM', 'PPT', 'PPTX'
						, 'PPTM', 'PPS', 'PPSX', 'XLS'
						, 'XLSX', 'XLSM', 'XLAM', 'XLA'
						, 'PSD', 'PDF', 'ODS', 'OGG', 'ZIP', 'EGG'
						, 'MP4', 'AVI', 'WMV'
						, 'RAR', 'TAR', '7Z', 'TBZ', 'TGZ'
						, 'LZH', 'GZ', 'AI'
					]; 
		return vaFileExt;
	},
	
	//업로드 불가한 파일 확장자 목록반환
	getLimitedFileExts : function(){
		// 파일 선택 제한 확장자.
		var vaFileExt = new Array(
			 'A6P'     //Authorware 6 Program
			,'AC'      //Autoconfig Script
			,'AS'      //Adobe Flash ActionScript File
			,'ACR'     //ACRobot Script
			,'ACTION'  //Automator Action
			,'AIR'     //Adobe AIR Installation Package
			,'APP'     //FoxPro Generated Application
			,'APP'     //Symbian OS Application
			,'ASP'	   //Active Server Page
			,'ASPX'	   //Extended Active Server Page
			,'AWK'     //AWK Script
			,'BAT'     //Batch File
			,'CGI'     //Common Gateway Interface Script
			,'CMD'     //Windows Command
			,'COM'     //DOS Command File
			,'CSH'     //C Shell Script
			,'DEK'     //Eavesdropper Batch File
			,'DLD'     //EdLog Compiled Program
			,'DS'      //TWAIN Data Source
			,'EBM'     //EXTRA! Basic Macro
			,'ESH'     //Extended Shell Batch File
			,'EXE'     //Windows Executable File
			,'EZS'     //EZ-R Stats Batch Script
			,'FKY'     //FoxPro Macro
			,'FRS'     //Flash Renamer Script
			,'FXP'     //FoxPro Compiled Source
			,'GADGET'  //Windows Gadget
			,'HMS'     //HostMonitor Script File
			,'HTA'     //HTML Application
			,'ICD'     //SafeDisc Encrypted Program
			,'INX'     //Compiled Script
			,'IPF'     //SMS Installer Script
			,'ISU'     //InstallShield Uninstaller Script
			,'JAR'     //Java Archive File
			,'JS'      //JScript Executable Script
			,'JSE'     //JScript Encoded File
			,'JSP'	   //JavaServer Pages
			,'JSX'     //ExtendScript Script File
			,'KIX'     //KiXtart Script File
			,'LUA'     //Lua Scripting File
			,'MCR'     //3ds Max Macroscript File
			,'MEM'     //Macro Editor Macro
			,'MPX'     //FoxPro Compiled Menu Program
			,'MS'      //3ds Max Script File
			,'MST'     //Windows SDK Setup Transform Script
			,'OBS'     //ObjectScript Script File
			,'PAF'     //Portable Application Installer File
			,'PEX'     //ProBoard Executable File
			,'PHP'	   //Hypertext Preprocessor
			,'PIF'     //Program Information File
			,'PL'	   //Perl Script
			,'PRC'     //Palm Resource Code File
			,'PRG'     //Generica Program File
			,'PVD'     //Instalit Script
			,'PWC'     //PictureTaker File
			,'PY'      //Python Script
			,'PYC'     //Python Compiled File
			,'PYO'     //Python Optimized Code
			,'QPX'     //FoxPro Compiled Query Program
			,'RBX'     //Rembo-C Compiled Script
			,'RGS'     //Registry Script
			,'ROX'     //Actuate Report Object Executable File
			,'RPJ'     //Real Pac Batch Job File
			,'SCAR'    //SCAR Script
			,'SCR'     //Script File
			,'SCRIPT'  //Generic Script File
			,'SCT'     //Windows Script Component
			,'SH'	   //Shell Script
			,'SHB'     //Windows Shortcut into a Document
			,'SHS'     //Shell Scrap Object File
			,'SPR'     //FoxPro Generated Screen File
			,'TLB'     //OLE Type Library
			,'TMS'     //Telemate Script
			,'U3P'     //U3 Smart Application
			,'UDF'     //Excel User Defined Function
			,'VB'      //VBScript File
			,'VBE'     //VBScript Encoded Script File
			,'VBS'     //VBScript File
			,'VBSCRIPT'//Visual Basic Script
			,'WCM'     //WordPerfect Macro
			,'WPK'     //WordPerfect Macro
			,'WS'      //Windows Script
			,'WSF'     //Windows Script File
			,'XQT'     //SuperCalc Macro File
		);
		
		return vaFileExt;
	},
	
	/**
	 * 해당 파일이 업로드 가능한 파일 유형인지 체크한다.
	 * @param {Object} poUtil 유틸 클래스 객체 
	 * @param {String} psFileNm 파일명
	 * @param {String} psLimitFileExt 업로드 가능제한 파일 확장자
	 */
	checkFileType : function(poUtil, psFileNm, psLimitFileExt){
		var vaCheckFileExt = null;
		if (!ValueUtil.isNull(psLimitFileExt)) {
			psLimitFileExt = psLimitFileExt.replace(/\./ig, "");
			vaCheckFileExt = ValueUtil.split(psLimitFileExt, ",");
		}
		
		if(vaCheckFileExt == null || vaCheckFileExt.length < 1){
			vaCheckFileExt = FileUtil.getPemitedFileExts();
		}
		
		var isValid = false;
		var arrStr = psFileNm.split(".");
		var extStr = arrStr [arrStr.length - 1].toUpperCase();
		for(var j=0, jlen=vaCheckFileExt.length; j<jlen; j++){
			if (extStr == vaCheckFileExt[j].toUpperCase()) {
				isValid = true;
				break;
			}
		}
		if(!isValid){
			//{0} 유형의 파일은 업로드 불가합니다.
			poUtil.Msg.alert("WRN-M024", [extStr]);
			return isValid;
		}
		
		var vaLimitedFileExt = FileUtil.getLimitedFileExts();
		for(var i=0, len=vaLimitedFileExt.length; i<len; i++) {
			if (extStr == vaLimitedFileExt[i]) {
				//{0} 유형의 파일은 업로드 불가합니다.
				poUtil.Msg.alert("WRN-M024", [extStr]);
				isValid = false;
				break;
			}
		}
		
		return isValid;
	}
};
