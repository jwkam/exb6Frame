exports.show = function(){
	app.lookup("optRowCount").visible = true;
};

exports.hide = function(){
	app.lookup("optRowCount").visible = false;
};

exports.count = function(pnCount){
	app.lookup("optRowCount").value = "건수: "+pnCount;
};