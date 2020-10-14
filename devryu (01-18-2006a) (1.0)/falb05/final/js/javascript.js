/*
	WARNING:	The objects contained herein holds onto references to functions that are contained within the body of
				certain functions which might result in accidental closures that need to be freed or a memory leak
				may result.  Make sure you are using the destructor method to properly release all objects being
				referenced by every instance of this object in order to avoid any possible memory leak problems.

				Believe it or not, this is actually a good practive even though it may appear to be a source of
				memory leakage, and it is when used improperly.  
				
				Look at it this way, would you feel better about life if you had no control over where your memory leaks 
				might be coming from ?  You can either create memory leaks YOU have to clean-up OR you can blindly go 
				about blissfully coding JavaScript and then have no way to proctively remove Closures from your code.  
				
				Closures can easily result from event handlers that are left hooked when the onUnload event is fired so 
				always make sure to unhook event handlers whenever you are done playing with your DOM objects.  
				
				Even when coding styles "seem" to be counter-intuitive they can still be used
				to perform good things as opposed to being unaware of certain things browsers like to do and then you 
				end-up with memory leaks you cannot find and do not know how to eliminate.
*/

function object_destructor(anObj) {
	var ret_val = -1;
	
	try { ret_val = anObj.destructor(); } catch(e) { ret_val = null; } finally { ret_val = null; };

	return ret_val;
}

const_inline_style = 'inline';
const_none_style = 'none';

_cache_gui_objects = [];

const_function_symbol = 'function';

const_object_symbol = 'object';
const_number_symbol = 'number';
const_string_symbol = 'string';

const_paper_color_light_yellow = '#FFFFBF';

const_backgroundColor_symbol = 'backgroundColor';

_cache_Button_style = [];

function cache_Button_styleById(id, selector) {
	var obj = -1;
	var _id = id + '_' + selector;
	if (id.trim().length > 0) {
		if (_cache_Button_style[_id] == null) {
			obj = getGUIObjectInstanceById(id);
			if (obj != null) {
				_cache_Button_style[_id] = eval('obj.style.' + selector);
			}
		}
	}
	return _cache_Button_style[_id];
}

function clear_cache_Button_styleById(id, selector) {
	var obj = -1;
	var _id = id + '_' + selector;
	if (id.trim().length > 0) {
		if (_cache_Button_style[_id] != null) {
			obj = getGUIObjectInstanceById(id);
			if (obj != null) {
				_cache_Button_style[_id] = null;
			}
		}
	}
	return _cache_Button_style[_id];
}

function handle_mouseFuncs(containerObj, objType) {
	var const_on_symbol = 'on';
	var const_onmouseover_symbol = 'mouseover';
	var const_onmouseout_symbol = 'mouseout';
	var const_onclick_symbol = 'click';
	
	var _myCapture = [ const_onmouseover_symbol, const_onmouseout_symbol, const_onclick_symbol ];
	var handle_mouseFuncs_inuse_flag = false;

	function explainColor(aColor) {
		return ((aColor == const_button_pressed_color_light_blue) ? 'color light blue' : ((aColor == const_button_hilite_color_light_yellow) ? 'color light yellow' : (((aColor == null) || (aColor.trim().length == 0)) ? 'UNKNOWN' : 'DEFAULT (' + aColor + ')')));
	}

	_captureFunc = function(event) {
		var _color = -1;
		var aColor = -1;
		
		if (handle_mouseFuncs_inuse_flag) {return}
		handle_mouseFuncs_inuse_flag = true;
		_color = cache_Button_styleById(event.srcElement.id, const_backgroundColor_symbol);
		aColor = ((event.type.trim().toUpperCase() == const_onclick_symbol.trim().toUpperCase()) ? const_button_pressed_color_light_blue : const_button_hilite_color_light_yellow);
		event.srcElement.style.backgroundColor = ((const_onmouseout_symbol.trim().toUpperCase().indexOf(event.type.trim().toUpperCase()) != -1) ? _color : aColor);
		event.cancelBubble = true;
		handle_mouseFuncs_inuse_flag = false;
	};
	
	function capEvents(el) {
		for (var i = 0; i < _myCapture.length; i++) {
			el.attachEvent(const_on_symbol + _myCapture[i], _captureFunc);
		}
	}

	if ( (containerObj != null) && (containerObj.getElementsByTagName) ) {
		var kids = containerObj.getElementsByTagName(objType);
		for (var i = 0; i < kids.length; i++) {
			var aKid = kids[i];
			if ( (aKid.type) && (aKid.type.trim().toUpperCase() == 'BUTTON') ) {
				capEvents(aKid);
			}
		}
	}
}

//Disable right click script III- By Renigade (renigade@mediaone.net)
//For full source code, visit http://www.dynamicdrive.com

var message="";
///////////////////////////////////
function clickIE() { if (document.all) {(message); return false;} };
function clickNS(e) {
	if (document.layers||(document.getElementById&&!document.all)) {
		if (e.which==2||e.which==3) { (message); return false;}
	}
}
if (document.layers) { document.captureEvents(Event.MOUSEDOWN); document.onmousedown=clickNS; }
else { document.onmouseup=clickNS; document.oncontextmenu=clickIE; }

document.oncontextmenu = new Function("return false");

function uuid() {
	var uuid = (new Date().getTime() + "" + Math.floor(1000 * Math.random()));
	return uuid;
}

function clientHeight() {
	var _clientHeight = -1;
	var ta = typeof window.innerHeight;
	if (ta.trim().toUpperCase() == const_number_symbol.trim().toUpperCase()) {
		_clientHeight = window.innerHeight;
	} else {
		if (document.documentElement && document.documentElement.clientHeight) {
			_clientHeight = document.documentElement.clientHeight;
		} else {
			if (document.body && document.body.clientHeight) {
				_clientHeight = document.body.clientHeight;
			}
		}
	}
	return _clientHeight;
}

function clientWidth() {
	var _clientWidth = -1;
	var ta = typeof window.innerWidth;
	if (ta.trim().toUpperCase() == const_number_symbol.trim().toUpperCase()) {
		_clientWidth = window.innerWidth;
	} else {
		if (document.documentElement && document.documentElement.clientWidth) {
			_clientWidth = document.documentElement.clientWidth;
		} else {
			if (document.body && document.body.clientWidth) {
				_clientWidth = document.body.clientWidth;
			}
		}
	}
	return _clientWidth;
}

function flushGUIObjectChildrenForObj(obj) {
	if (!!obj) {
		var sfEls = obj.getElementsByTagName("*");
		for (var i = 0; i < sfEls.length; i++) {
			if (sfEls[i].id) {
				_cache_gui_objects[sfEls[i].id] = null;
			}
		}
	}
}

function _getGUIObjectInstanceById(id) {
	return ((document.getElementById) ? document.getElementById(id) : null);
}

function getGUIObjectInstanceById(id) {
	var obj = -1;
	if (_cache_gui_objects[id] == null) {
		obj = _getGUIObjectInstanceById(id);
		_cache_gui_objects[id] = obj;
	} else {
		obj = _cache_gui_objects[id];
	}
	return obj;
}

function setFocusSafely(pObj) {
	if (!!pObj) {
		try {
			if (pObj.focus) {
				if ( (pObj.disabled == null) || (pObj.disabled == false) ) {
					pObj.focus();
				}
			}
		} catch(e) {
		} finally {
		}
	}
}

function setFocusSafelyById(id) {
	var pObj = getGUIObjectInstanceById(id);
	return setFocusSafely(pObj);
}

function URLEncode(plaintext) {
	var SAFECHARS = "0123456789" +					
					"ABCDEFGHIJKLMNOPQRSTUVWXYZ" +	
					"abcdefghijklmnopqrstuvwxyz" +
					"-_.!~*'()";					
	var HEX = "0123456789ABCDEF";

	var encoded = "";
	if (!!plaintext) {
		for (var i = 0; i < plaintext.length; i++ ) {
			var ch = plaintext.charAt(i);
		    if (ch == " ") {
			    encoded += "+";				
			} else if (SAFECHARS.indexOf(ch) != -1) {
			    encoded += ch;
			} else {
			    var charCode = ch.charCodeAt(0);
				if (charCode > 255) {
					encoded += "+";
				} else {
					encoded += "%";
					encoded += HEX.charAt((charCode >> 4) & 0xF);
					encoded += HEX.charAt(charCode & 0xF);
				}
			}
		}
	}

	return encoded;
}

function URLDecode(encoded) {
   var HEXCHARS = "0123456789ABCDEFabcdef"; 
   var plaintext = "";
   var i = 0;
   while (i < encoded.length) {
       var ch = encoded.charAt(i);
	   if (ch == "+") {
	       plaintext += " ";
		   i++;
	   } else if (ch == "%") {
			if (i < (encoded.length-2) 
					&& HEXCHARS.indexOf(encoded.charAt(i+1)) != -1 
					&& HEXCHARS.indexOf(encoded.charAt(i+2)) != -1 ) {
				plaintext += unescape( encoded.substr(i,3) );
				i += 3;
			} else {
				plaintext += "%[ERROR]";
				i++;
			}
		} else {
		   plaintext += ch;
		   i++;
		}
	} 
   return plaintext;
}

function _int(i){
	var _s = i.toString().split(".");
	return eval(_s[0]);
};

function isAlpha(iLoc) {
	iLoc = ((!!iLoc) ? iLoc : 0);
	iLoc = ((iLoc < 0) ? 0 : iLoc);
	iLoc = ((iLoc > (this.length - 1)) ? this.length : iLoc);
	var _ch = this.substr(iLoc, 1);
	return ( (_ch.toLowerCase() >= 'a') && (_ch.toLowerCase() <= 'z') );
}

String.prototype.isAlpha = isAlpha;

function isNumeric(iLoc) {
	iLoc = ((!!iLoc) ? iLoc : 0);
	iLoc = ((iLoc < 0) ? 0 : iLoc);
	iLoc = ((iLoc > (this.length - 1)) ? this.length : iLoc);
	var _ch = this.substr(iLoc, 1);
	return ( (_ch >= '0') && (_ch <= '9') );
}

String.prototype.isNumeric = isNumeric;

function filterInAlpha() {
	var t = '';
	var _ch = '';
	for (var i = 0; i < this.length; i++) {
		_ch = this.substr(i, 1);
		if (_ch.isAlpha()) {
			t += _ch;
		}
	}
	return t;
}

String.prototype.filterInAlpha = filterInAlpha;

function filterInNumeric() {
	var _ch = '';
	var t = '';
	for (var i = 0; i < this.length; i++) {
		_ch = this.substr(i, 1);
		if (_ch.isNumeric()) {
			t += _ch;
		}
	}
	return t;
}

String.prototype.filterInNumeric = filterInNumeric;

function stripHTML() {
	var s = null;
	s = this.replace(/(<([^>]+)>)/ig,"");
	s = s.replace(/(&([^;]+);)/ig,"");
	return s;
}

String.prototype.stripHTML = stripHTML;

function stripSpacesBy2s() {
	return this.replace(/\  /ig, "");
}

String.prototype.stripSpacesBy2s = stripSpacesBy2s;

function stripIllegalChars() {
	return this.URLEncode(); 
}

String.prototype.stripIllegalChars = stripIllegalChars;

function _URLEncode() {
	return URLEncode(this);
}

String.prototype.URLEncode = _URLEncode;

function _URLDecode() {
	return URLDecode(this);
}

String.prototype.URLDecode = _URLDecode;

function stripTabs(s) {
	s = ((!s) ? '' : s);
	return this.replace(/\t/ig, s);
}

String.prototype.stripTabs = stripTabs;

function stripCrLfs() {
	return this.replace(/\n/ig, "").replace(/\r/ig, "");
}

String.prototype.stripCrLfs = stripCrLfs;

function replaceSubString(i, j, s) {
	var s = this.substring(0, i) + s + this.substring(j, this.length);
	return s;
}

String.prototype.replaceSubString = replaceSubString;

function clipCaselessReplace(keyword, sText) {
	var _ff = this.toUpperCase().indexOf(keyword.toUpperCase());
	if (_ff != -1) {
		return this.replaceSubString(_ff, _ff + keyword.length, sText);
	}

	return this;
}

String.prototype.clipCaselessReplace = clipCaselessReplace;

function trim() {  
	var s = this.replace(/^[\s]+/,"");  
	s = s.replace(/[\s]+$/,"");  
	return s;
}

String.prototype.trim = trim;

function cfString() {
	var s = '';
	var b = true;

	for (var i = 0; i < this.length; i++) {
		if (b) {
			s += "'" + this[i] + "'";
			b = false;
		} else {
			s += ', ' + "'" + this[i] + "'";
		}
	}
	return s;
}

Array.prototype.cfString = cfString;

function setStyle(aStyle, styles) {
	try {
		var a = styles.split(';');
		for (var i = 0; i < a.length; i++) {
			var b = a[i].trim().split(':');
			if (b.length == 2) {
				aStyle[b[0].trim()] = b[1].trim();
			}
		}
	} catch(e) {
	} finally {
	}
}

function toCamelCase( sInput ) {
	var sArray = sInput.split('-');
	if (sArray.length == 1)	{
		return sArray[0];
	}
	var ret = '';
	var s = '';
	var len = sArray.length
	for(var i = 0; i < len; i++) {
		s = sArray[i];
		ret += s.charAt(0).toUpperCase() + s.substring(1)
	}
	return ret;
}

function getStyle(el, style) {
    var value = '';
	if (!!el) {
		try {
		    value = el.style[toCamelCase(style)];
		} catch(e) {
		} finally {
		}
	   
	    if (!value) {
	        if (typeof document.defaultView == "object") {
	            value = document.defaultView.getComputedStyle(el, "").getPropertyValue(style);
			}
	        else if (el.currentStyle) {
	            value = el.currentStyle[toCamelCase(style)];
			}
		}
	}

	return value || "";
}

function Style2String(aStyle) {
	var st = '';
	try {
		var i = 0;
		for (var s in aStyle) {
			if (aStyle[s].length > 0) {
				i++;
			}
		}
		var j = 0;
		for (var s in aStyle) {
			if (aStyle[s].length > 0) {
				st += s + '=' + aStyle[s] + ((j < i) ? ',' : '');
				j++;
			}
		}
	} catch(e) {
	} finally {
	}
	return st;
}

function insertArrayItem(a,newValue,position) {
	if (position && position > -1) {
		a.splice(position,0,newValue);
	}
	else {
		a.unshift(newValue);
	}
}

function removeArrayItem(a,i) {
	var j = a.length;
	for (; i < j; i++) {
		if (a[i] == null) {
			break;
		}
		a[i] = a[i + 1];
	}
	a[i] = null;
}

function locateArrayItems(a, what, start) {
	var f = 0;
	if (start) {
		startWhere = start 
	}
	else {
		startWhere = 0;
	}
	for(f=startWhere; f<a.length; f++) {
		if (a[f].toString().substr(0,what.length) == what.toString()) {
			return f;
		}
	}
	return -1;
}

DictionaryObj = function(id){
	this.id = id;
	this.keys = [];
	this.cache = [];
};

DictionaryObj.instances = [];

DictionaryObj.getInstance = function(aSpec) {
	var instance = DictionaryObj.instances[DictionaryObj.instances.length];
	if (instance == null) {
		instance = DictionaryObj.instances[DictionaryObj.instances.length] = new DictionaryObj(DictionaryObj.instances.length);
	}
	instance.fromSpec(aSpec);
	return instance;
};

DictionaryObj.removeInstance = function(id) {
	var ret_val = false;
	if ( (id > -1) && (id < DictionaryObj.instances.length) ) {
		var instance = DictionaryObj.instances[id];
		if (!!instance) {
			DictionaryObj.instances[id] = object_destructor(instance);
			ret_val = (DictionaryObj.instances[id] == null);
		}
	}
	return ret_val;
};

DictionaryObj.removeInstances = function() {
	var ret_val = true;
	for (var i = 0; i < DictionaryObj.instances.length; i++) {
		DictionaryObj.removeInstance(i);
	}
	return ret_val;
};

DictionaryObj.prototype = {
	id : -1,
	bool_returnArray : false,
	keys : [],
	cache : [],
	toString : function() {
		var aKey = -1;
		var aVal = -1;
		var s = 'DictionaryObj(' + this.id + ') :: (';
		if (this.id != null) {
			s += '\n';
			for (var i = 0; i < this.keys.length; i++) {
				aKey = this.keys[i];
				aVal = this.getValueFor(aKey);
				s += '{' + aKey + '} = [';
				if (typeof aVal == const_object_symbol) {
					for (var j = 0; j < aVal.length; j++) {
						s += '\n\t[';
						s += aVal[j];
						s += ']';
					}
				} else {
					s += aVal;
				}
				s += ']' + '\n';
			}
		}
		s += ')';
		return s;
	},
	fromSpec : function(aSpec) { 
		var i = -1;
		var ar = [];
		var ar2 = [];
		if (!!aSpec) {
			ar = aSpec.split(',');
			if (ar.length == 1) {
				ar = aSpec.split('&');
			}
			for (i = 0; i < ar.length; i++) {
				if (ar[i].length > 0) {
					ar2 = ar[i].split('=');
					if (ar2.length == 2) {
						this.push(ar2[0], ar2[1]);
					} else {
						this.push(ar[i], ar[i + 1]);
						i++;
					}
				}
			}
		}
	},
	asQueryString : function(ch_delim) { 
		var aKey = -1;
		var s = '';
		for (var i = 0; i < this.keys.length; i++) {
			aKey = this.keys[i];
			if (!!ch_delim) {
				s += aKey + '=' + this.getValueFor(aKey) + ((i < (this.keys.length - 1)) ? ch_delim : '');
			} else {
				s += '&' + aKey + '=' + this.getValueFor(aKey);
			}
		}
		return s;
	},
	push : function(key, value) {
		var _f = -1;
		var _key = key.trim().toUpperCase();
		for (var i = 0; i < this.keys.length; i++) {
			if (this.keys[i].trim().toUpperCase() == _key) {
				_f = i;
				break;
			}
		}
		if (_f == -1) {
			this.keys.push(key);
			this.cache[key] = value;
			return true;
		} else { 
			if (typeof this.cache[key] != const_object_symbol) {
				var a = [];
				a.push(this.cache[key]);
				this.cache[key] = a;
			}
			this.cache[key].push(value);
		}
		return false;
	},
	put : function(key, value) {
		if (!!this.cache[key]) {
			this.cache[key] = value;
		} else {
			alert('WARNING - Programming Error: The key (' + key + ') does not appear in the dictionary... Are you sure you didn\'t really mean to use the push method instead ?');
		}
	},
	drop : function(key) {
		if (!!this.cache[key]) {
			this.cache[key] = null;
			var ar = this.keys;
			this.keys = [];
			for (var i = 0; i < ar.length; i++) {
				if (ar[i] != key) {
					this.keys.push(ar[i]);
				}
			}
		} else {
			alert('WARNING - Programming Error: The key (' + key + ') does not appear in the dictionary... Are you sure you didn\'t really mean to use the push method instead ?');
		}
	},
	getValueFor : function(key) {
		var _retVal = this.cache[key];
		if (!!_retVal) {
			this.bool_returnArray = ((this.bool_returnArray == true) ? this.bool_returnArray : false);
			if ( (this.bool_returnArray) && (typeof _retVal != const_object_symbol) ) {
				var _ar = [];
				_ar.push(_retVal);
				_retVal = _ar;
			}
		}
		return (_retVal);
	},
	getKeys : function() {
		return (this.keys);
	},
	adjustKeyNames : function(func) { 
		var k = this.keys;
		if ( (!!func) && (typeof func == const_function_symbol) ) {
			k = [];
			for (var i = 0; i < this.keys.length; i++) {
				k.push(func(this.keys[i]));
			}
		}
		return (k); 
	},
	length : function() {
		return (this.keys.length);
	},
	init : function() {
		this.keys = [];
		this.cache = [];
		return this;
	},
	destructor : function() {
		return (this.id = DictionaryObj.instances[this.id] = this.keys = this.cache = null);
	}
};

QueryObj = function(id, _colNames){
	this.id = id;				
	this.colNames = _colNames;
	this.dataRec = [];
	var a = _colNames.URLDecode().trim().split(',');
	this.dataRec.push(a);
};

QueryObj.instances = [];

QueryObj.getInstance = function(_colNames) {
	var instance = QueryObj.instances[QueryObj.instances.length];
	if (instance == null) {
		instance = QueryObj.instances[QueryObj.instances.length] = new QueryObj(QueryObj.instances.length, _colNames);
	}
	return instance;
};

QueryObj.removeInstance = function(id) {
	var ret_val = false;
	if ( (id > -1) && (id < QueryObj.instances.length) ) {
		var instance = QueryObj.instances[id];
		if (!!instance) {
			QueryObj.instances[id] = object_destructor(instance);
			ret_val = (QueryObj.instances[id] == null);
		}
	}
	return ret_val;
};

QueryObj.removeInstances = function() {
	var ret_val = true;
	for (var i = 0; i < QueryObj.instances.length; i++) {
		QueryObj.removeInstance(i);
	}
	return ret_val;
};

QueryObj.prototype = {
	id : -1,
	s_toString : '',
	colNames : '',
	dataRec : [],
	rowCntName : 'rowCnt',
	_toString : function(_aRec, _ri, _cols) {
		s_toString += ((_ri > 1) ? '\n' : '') + '[' + _ri + '] :: ';
		for (var i = 0; i < _aRec.length; i++) {
			if (_aRec[i].trim().length > 0) {
				s_toString += '{' + _cols[i] + '}=<' + _aRec[i] + '>';
				if (i < (_aRec.length - 1)) {
					s_toString += ', ';
				}
			}
		}
		return s_toString += '';
	},
	toString : function() {
		s_toString = 'QueryObj(' + this.id + ') :: \ncolumnList = (' + this.columnList() + '), recordCount = ' + this.recordCount() + '\n' + 'dataRec = (' + this.dataRec.toString() + ')\n\n';
		this.iterate(this._toString);
		return s_toString;
	},
	recordCount : function() {
		return (this.dataRec.length - 1); 
	},
	columnList : function() {
		return ((this.dataRec.length > 0) ? this.dataRec[0] : []);
	},
	data : function() {
		return (this.dataRec.slice(1,this.dataRec.length));
	},
	iterate : function(func) {
		var _cols = this.columnList();
		if ( (!!func) && (typeof func == const_function_symbol) ) {
			for (var ri = 1; ri < this.dataRec.length; ri++) {
				func(this.dataRec[ri], ri, _cols);
			}
		}
	},
	iterateRecObjs : function(func) {
		var i = -1;
		var _f = -1;
		var rN = this.dataRec.length;
		var rowArray = [];
		var oDict = DictionaryObj.getInstance();
		var _cols = this.columnList();
		
		if ( (!!func) && (typeof func == const_function_symbol) ) {
			for (var ri = 1; ri < rN; ri++) {
				rowArray = this.dataRec[ri];
				for (i = 0; i < _cols.length; i++) {
					oDict.push(_cols[i], rowArray[i]);
				}
				oDict.push(this.rowCntName, rN - 1);
				_f = func(ri, oDict, this.rowCntName, this);
				_f = ((!!_f) ? _f : -1);
				if (_f != -1) {
					break;
				}
				oDict.init();
			}
		}
		DictionaryObj.removeInstance(oDict.id);
	},
	QueryAddRow : function() {
		var d = [];
		this.dataRec.push(d);
	},
	getColNumFromColName : function(colName) {
		var colNum = -1;
		for (var i = 0; i < this.dataRec[0].length; i++) { 
			if (colName.trim().toUpperCase() == this.dataRec[0][i].trim().toUpperCase()) {
				colNum = i;
				break;
			}
		}
		return colNum;
	},
	QuerySetCell : function(cName, vVal, rowNum) {
		var d = [];
		var ci = -1;
		var colNum = this.getColNumFromColName(cName);
		if (colNum != -1) {
			if (rowNum <= this.recordCount()) {
				d = this.dataRec[rowNum];
				for (ci = 0; ci < this.dataRec[0].length; ci++) {
					if (ci == colNum) {
						d[ci] = vVal.URLDecode();
						break;
					}
				}
				this.dataRec[rowNum] = d;
			}
		}
		return false;
	},
	getValueFromName : function(cName, colName, valName) {
		var row = [];
		var ri = -1;
		var colNum = this.getColNumFromColName(colName);
		var valNum = this.getColNumFromColName(valName);
		if ( (colNum != -1) && (valNum != -1) ) {
			for (ri = 1; ri < this.dataRec.length; ri++) {
				row = this.dataRec[ri];
				if (row[colNum].trim().toUpperCase() == cName.trim().toUpperCase()) {
					return row[valNum];
				}
			}
		}
		return '';
	},
	getValueFromNameAtRow : function(cName, colName, valName, iRow) {
		var row = [];
		var ri = -1;
		var colNum = this.getColNumFromColName(colName);
		var valNum = this.getColNumFromColName(valName);
		if ( (colNum != -1) && (valNum != -1) ) {
			if ( (iRow > 0) && (iRow < this.dataRec.length) ) {
				row = this.dataRec[iRow];
				if (row[colNum].trim().toUpperCase() == cName.trim().toUpperCase()) {
					return row[valNum];
				}
			}
		}
		return '';
	},
	as_JS_array_source : function(cName) {
		var _parms = URLDecode(this.getValueFromName(cName, 'name', 'val'));
		var _pa = _parms.split(',');
		var _pb = [];
		var _pc = [];
		var aa = '[[]]';
		if (_pa.length > 1) {
			aa = '[';
			for (var i = 0; i < _pa.length; i++) {
				_pb = _pa[i].split('=');
				if (_pb.length == 2) {
					_pc = [];
					_pc.push(_pb[0]);
					_pc.push(_pb[1]);
					aa += '[' + _pc.cfString() + ']';
					if (i < (_pa.length - 1)) {
						aa += ', ';
					}
				}
			}
			aa += ']';
		}
		return aa;
	},
	destructor : function() {
		return (this.id = QueryObj.instances[this.id] = this.s_toString = this.colNames = this.dataRec = null);
	}
};

GUIActionsObj = function(id){
	this.id = id;				
	this.stack = [];
	this.ooStack = [];
	this.aspectStack = [];
	this.stylesStack = [];
};

GUIActionsObj.instances = [];

GUIActionsObj.getInstance = function() {
	var instance = GUIActionsObj.instances[GUIActionsObj.instances.length];
	if (instance == null) {
		instance = GUIActionsObj.instances[GUIActionsObj.instances.length] = new GUIActionsObj(GUIActionsObj.instances.length);
	}
	return instance;
};

GUIActionsObj.removeInstance = function(id) {
	var ret_val = false;
	if ( (id > -1) && (id < GUIActionsObj.instances.length) ) {
		var instance = GUIActionsObj.instances[id];
		if (!!instance) {
			GUIActionsObj.instances[id] = object_destructor(instance);
			ret_val = (GUIActionsObj.instances[id] == null);
		}
	}
	return ret_val;
};

GUIActionsObj.removeInstances = function() {
	var ret_val = true;
	for (var i = 0; i < GUIActionsObj.instances.length; i++) {
		GUIActionsObj.removeInstance(i);
	}
	return ret_val;
};

GUIActionsObj.prototype = {
	id : -1,
	stack : [],
	ooStack : [],
	aspectStack : [],
	stylesStack : [],
	toString : function() {
		var s = 'id = (' + this.id + ') :: (';
		s += '\n';
		for (var i = 0; i < this.stack.length; i++) {
			s += i + ' = [' + this.stack[i] + ']' + ((i < (this.stack.length - 1)) ? ', ' : '');
		}
		s += ')';
		return s;
	},
	push : function(id) {
		var aHandle = -1;
		var oo = getGUIObjectInstanceById(id);
		if (!!oo) {
			this.stack.push(id);
			this.ooStack.push(oo);
			this.aspectStack.push(DictionaryObj.getInstance());
			this.stylesStack.push(DictionaryObj.getInstance());
			aHandle = this.stack.length - 1;
		}
		return aHandle;
	},
	revertAspectsDict : function(aDict, oo) {
		var i = -1;
		if ( (!!aDict) && (!!oo) ) {
			var keys = aDict.getKeys();
			for (i = 0; i < keys.length; i++) {
				var aVal = aDict.getValueFor(keys[i]);
				oo[keys[i]] = aVal;
			}
		}
	},
	revertStylesDict : function(aDict, oo) {
		var i = -1;
		if ( (!!aDict) && (!!oo) ) {
			var keys = aDict.getKeys();
			for (i = 0; i < keys.length; i++) {
				setStyle(oo.style, keys[i] + ': ' + aDict.getValueFor(keys[i]) + ';');
			}
		}
	},
	pop : function(aHandle) {
		var oo = -1;
		if ( (aHandle > -1) && (aHandle == (this.ooStack.length - 1)) ) {
			oo = this.ooStack.pop();
			if (!!oo) {
				this.iterateDicts(this.aspectStack.pop(), this.revertAspectsDict, oo);
				this.iterateDicts(this.stylesStack.pop(), this.revertStylesDict, oo);
			}
			this.destructDicts();
			return this.stack.pop();
		} else {
			alert('WARNING: Programming Error - Cannot pop from anywhere but the end of the stack towards beginning of the stack - the stack is a LIFO buffer...');
		}
		return -1;
	},
	popAll : function() {
		var i = -1;
		for (i = this.stack.length - 1; i >= 0; i--) {
			this.pop(i);
		}
	},
	replaceAspectNamedFor : function(aHandle, aName, aVal) {
		var oo = -1;
		if ( (aHandle > -1) && (aHandle < this.ooStack.length) ) {
			oo = this.ooStack[aHandle];
			if (!!oo) {
				if (!!aName) {
					var aDict = this.aspectStack[aHandle];
					aDict.push(aName, oo[aName]);
					oo[aName] = aVal;
					return aHandle;
				}
			}
		}
		return -1;
	},
	replaceStyleNamedFor : function(aHandle, aName, aVal) {
		var oo = -1;
		if ( (aHandle > -1) && (aHandle < this.ooStack.length) ) {
			oo = this.ooStack[aHandle];
			if (!!oo) {
				if (!!aName) {
					var aa = aVal.split(';');
					if ( (aVal.indexOf(':') != -1) && (aa.length == 2) ) {
						var aStyle = getStyle(oo, aName);
						var aDict = this.stylesStack[aHandle];
						aDict.push(aName, aStyle);
						setStyle(oo.style, aVal + ((aVal.indexOf(';') == -1) ? ';' : ''));
						return aHandle;
					} else {
						alert('WARNING: Programming Error - the style of (' + aVal + ', ' + aa.length + ') is not properly formed or has too many styles specified - kindly modify your code to make (' + aVal + ') into a properly formed style spec that specifies a single style (hint: properly formed style specs are just like the ones you would normally code into a style="font-size: 10px;" block however you may leave-off the final ";" in case you are passing in a single style spec).');
					}
				}
			}
		}
		return -1;
	},
	length : function() {
		return (this.stack.length);
	},
	iterateDicts : function(anArrayOrDict, func, oO) {
		var i = -1;
		var aDict = -1;
		if ( (!!anArrayOrDict) && (!!oO) ) {
			if (typeof anArrayOrDict == const_object_symbol) {
				if ( (!!anArrayOrDict.length) && (typeof anArrayOrDict.length != const_function_symbol) ) {
					for (i = 0; i < anArrayOrDict.length; i++) {
						aDict = anArrayOrDict[i];
						if ( (!!aDict) && (!!func) && (typeof func == const_function_symbol) ) {
							func(aDict, oO);
						}
					}
				} else {
					if ( (!!func) && (typeof func == const_function_symbol) ) {
						func(anArrayOrDict, oO);
					}
				}
			}
		}
	},
	destructDict : function(aDict) {
		if (!!aDict) {
			DictionaryObj.removeInstance(aDict.id);
		}
	},
	destructDicts : function() {
		this.iterateDicts(this.aspectStack, this.destructDict);
		this.iterateDicts(this.stylesStack, this.destructDict);
	},
	init : function() {
		this.stack = [];
		this.ooStack = [];
		this.destructDicts();
		this.aspectStack = [];
		this.stylesStack = [];
		return this;
	},
	destructor : function() {
		this.destructDicts();
		return (this.id = GUIActionsObj.instances[this.id] = this.aspectStack = this.stylesStack = this.stylesDict = this.aspectDict = this.ooStack = this.stack = null);
	}
};

_stack_jsapi_serialization = [];

function register_jsapi_function(f) {
	_stack_jsapi_serialization.push(f);
}

function handle_next_jsapi_function() {
	var f = _stack_jsapi_serialization.pop();
	if (!!f) {
		eval(f);
	}
}

function htmlServerCommand_Begins(width) {
	var resp = '';
	if (width == null) {
		width = const_jsapi_width_value;
	}
	resp = '<table width="' + parseInt(width) + 'px" bgcolor="' + const_paper_color_light_yellow + '" border="1" cellpadding="-1" cellspacing="-1">';
	resp += '<tr>';
	resp += '<td height="25px">';
	return resp;
}

function htmlServerCommand_Ends() {
	var resp = '';
	resp += '</td>';
	resp += '</tr>';
	resp += '</table>';
	return resp;
}

function showServerCommand_Begins() {
	var resp = '';
	var divName = const_cf_html_container_symbol;
	var cObj = getGUIObjectInstanceById(divName);

	if (!!cObj) {
		resp = htmlServerCommand_Begins();
		resp += '<b>' + const_loading_data_message_symbol + '</b>';
		resp += '&nbsp;&nbsp;<img src="' + const_jsapi_loading_image + '" border="0">';
		resp += htmlServerCommand_Ends();
		flushGUIObjectChildrenForObj(cObj); 
		cObj.innerHTML = resp;
		cObj.style.display = const_inline_style;
		cObj.style.position = 'absolute';

		var dObj = getGUIObjectInstanceById(const_div_floating_debug_menu);
		if (!!dObj) {
			dObj.style.position = cObj.style.position;
		}
	}
}

function showServerCommand_Ends() {
	var resp = '';
	var divName = const_cf_html_container_symbol;
	var cObj = getGUIObjectInstanceById(divName);

	if (!!cObj) {
		var _f_isLoading = cObj.innerHTML.trim().toUpperCase().indexOf(const_jsapi_loading_image.trim().toUpperCase());

		if (_f_isLoading != -1) {
			flushGUIObjectChildrenForObj(cObj);
			resp = htmlServerCommand_Begins();
			resp += '<b>' + const_system_ready_message_symbol + '</b>';
			resp += htmlServerCommand_Ends();
			cObj.innerHTML = resp;
		}
	}
}

function clear_showServerCommand_Ends() {
	var resp = '';
	var divName = const_cf_html_container_symbol;
	var cObj = getGUIObjectInstanceById(divName);

	if (!!cObj) {
		flushGUIObjectChildrenForObj(cObj); 
		resp = htmlServerCommand_Begins();
		resp += '<b>' + const_system_ready_message_symbol + '</b>';
		resp += htmlServerCommand_Ends();
		cObj.innerHTML = resp;
	}
}

function jsapi_init_js_q(qryObjName, columnList) {
	var s_code = qryObjName + ' = -1;';
	var qryObj = eval(s_code);
	try {
		eval(qryObjName + ' = ((' + qryObjName + ') ? object_destructor(' + qryObjName + ') : null)');
	} catch(e) {
	} finally {
	}
	eval(qryObjName + " = QueryObj.getInstance((columnList) ? columnList : '')");
}

AJaxContextObj = function(id){
	this.id = id;	
	this.queryString = '';
	this.parmsDict = -1;
	this.argsDict = -1;
};

AJaxContextObj.instances = [];

AJaxContextObj.getInstance = function() {
	var instance = AJaxContextObj.instances[AJaxContextObj.instances.length];
	if (instance == null) {
		instance = AJaxContextObj.instances[AJaxContextObj.instances.length] = new AJaxContextObj(AJaxContextObj.instances.length);
	}
	return instance;
};

AJaxContextObj.removeInstance = function(id) {
	var ret_val = false;
	if ( (id > -1) && (id < AJaxContextObj.instances.length) ) {
		var instance = AJaxContextObj.instances[id];
		if (!!instance) {
			AJaxContextObj.instances[id] = object_destructor(instance);
			ret_val = (AJaxContextObj.instances[id] == null);
		}
	}
	return ret_val;
};

AJaxContextObj.removeInstances = function() {
	var ret_val = true;
	for (var i = 0; i < AJaxContextObj.instances.length; i++) {
		AJaxContextObj.removeInstance(i);
	}
	return ret_val;
};

AJaxContextObj.prototype = {
	id : -1,
	queryString : '',
	parmsDict : -1,
	argsDict : -1,
	toString : function() {
		var aKey = -1;
		var s = '\nAJaxContextObj(' + this.id + ') :: (\n';
		s += 'queryString = [' + this.queryString + ']' + '\n';
		s += 'parmsDict = [' + this.parmsDict + ']' + '\n';
		s += 'argsDict = [' + this.argsDict + ']' + '\n';
		s += ')';
		return s;
	},
	init : function() {
		this.queryString = '';
		try {
			this.parmsDict.destructor();
		} catch(e) {
		} finally {
		}
		this.parmsDict = -1;
		try {
			this.argsDict.destructor();
		} catch(e) {
		} finally {
		}
		this.argsDict = -1;
		return this;
	},
	destructor : function() {
		try {
			this.parmsDict.destructor();
		} catch(e) {
		} finally {
		}
		this.parmsDict = -1;
		try {
			this.argsDict.destructor();
		} catch(e) {
		} finally {
		}
		return (this.id = AJaxContextObj.instances[this.id] = this.queryString = this.parmsDict = this.argsDict = null);
	}
};

AJAXObj = function(id){
	this.id = id;				
};

AJAXObj.instances = [];

AJAXObj.getInstance = function() {
	var instance = AJAXObj.instances[AJAXObj.instances.length];
	if (instance == null) {
		instance = AJAXObj.instances[AJAXObj.instances.length] = new AJAXObj(AJAXObj.instances.length);
	}
	return instance;
};

AJAXObj.removeInstance = function(id) {
	var ret_val = false;
	if ( (id > -1) && (id < AJAXObj.instances.length) ) {
		var instance = AJAXObj.instances[id];
		if (!!instance) {
			AJAXObj.instances[id] = object_destructor(instance);
			ret_val = (AJAXObj.instances[id] == null);
		}
	}
	return ret_val;
};

AJAXObj.removeInstances = function() {
	var ret_val = true;
	for (var i = 0; i < AJAXObj.instances.length; i++) {
		AJAXObj.removeInstance(i);
	}
	return ret_val;
};

AJAXObj.prototype = {
	id : -1,
	data : [],
	names : [],
	toString : function() {
		function toStr(a, d) {
			var s = '[';
			var i = -1;
			var aName = '';

			try {
				var n = a.length;
				for (i = 0; i < n; i++) {
					aName = a[i];
					s += aName + " = \{" + d[aName].toString() + "\}" + '\n';
				}
			} catch(e) {
			} finally {
			}

			s += ']';
			return s;
		}
		var s = 'id = [' + this.id + '], ' + toStr(this.names, this.data);
		return s;
	},
	init : function() {
		this.names = [];
		this.data = [];
		return this;
	},
	push : function(aName, datum) {
		this.names.push(aName);
		this.data[aName] = datum;
	},
	pop : function() {
		var aName = this.names.pop();
		return this.data[aName];
	},
	named : function(aName) {
		return this.data[aName];
	},
	destructor : function() {
		return (this.id = AJAXObj.instances[this.id] = this.data = this.names = null);
	}
};

AJAXEngine = function(id, u, _d) {
	this.id = id;		

	if (!u) this.throwError("No server-side AJAX Event Handler was specified.", true);
	if (!(!!document.getElementById)) this.throwError("Your browser does not meet the minimum requirements. \nPortions of the page have been disabled and therefore \nthe page may not work as expected.", true);

	this.url = u;

	this.mode = ((!!_d && _d == true) ? this.debug_mode_symbol : this.release_mode_symbol);

	this.ajaxID = 'id_' + AJAXEngine.releaseNumber + '_AJAX_' + AJAXEngine.items.length;
	this.formID = 'id_' + AJAXEngine.releaseNumber + '_AJAX_Form_' + AJAXEngine.items.length;
};

AJAXEngine.releaseNumber = '001-AJAXEngine';

AJAXEngine.instances = [];

AJAXEngine.getInstance = function(_url, _debugFlag) {
	var instance = AJAXEngine.instances[AJAXEngine.instances.length];
	if (instance == null) {
		instance = AJAXEngine.instances[AJAXEngine.instances.length] = new AJAXEngine(AJAXEngine.instances.length, _url, _debugFlag);
	}
	return instance;
};

AJAXEngine.removeInstance = function(id) {
	var ret_val = false;
	if ( (id > -1) && (id < AJAXEngine.instances.length) ) {
		var instance = AJAXEngine.instances[id];
		if (!!instance) {
			AJAXEngine.instances[id] = object_destructor(instance);
			ret_val = (AJAXEngine.instances[id] == null);
		}
	}
	return ret_val;
};

AJAXEngine.removeInstances = function() {
	var ret_val = true;
	for (var i = 0; i < AJAXEngine.instances.length; i++) {
		AJAXEngine.removeInstance(i);
	}
	return ret_val;
};

AJAXEngine._cacheCounters = [];

AJAXEngine.xmlHttp_reqObject = function() {
	var oXmlHttpReqObj = new Object();
	
	if (!!oXmlHttpReqObj) {
		oXmlHttpReqObj.oRequest = false;
		oXmlHttpReqObj.oGateway = -1;
	}
	return oXmlHttpReqObj;
};

AJAXEngine.transmitPacket = function(ajaxObj) {
	return ( (!!ajaxObj) ? ajaxObj._transmitPacket() : alert('ERROR: Programming Error - Undefined Objects ajaxObj is (' + ajaxObj + ') in function known as AJAXEngine.transmitPacket().'));
};

AJAXEngine.serverTimeout = function(id, ajaxObj) {
	return ( (!!ajaxObj) ? ajaxObj._serverTimeout(id) : alert('ERROR: Programming Error - Undefined Objects ajaxObj is (' + ajaxObj + ') in function known as AJAXEngine.serverTimeout().'));
};

AJAXEngine.resetStatus = function(ajaxObj) {
	return ( (!!ajaxObj) ? ajaxObj._resetStatus() : alert('ERROR: Programming Error - Undefined Objects ajaxObj is (' + ajaxObj + ') in function known as AJAXEngine.resetStatus().'));
};

AJAXEngine.processXmlHttpRequestStateChange = function(ajaxObj) {
	return ( (!!ajaxObj) ? ajaxObj.processXmlHttpRequestStateChange() : alert('ERROR: Programming Error - Undefined Objects ajaxObj is (' + ajaxObj + ') in function known as AJAXEngine.processXmlHttpRequestStateChange().'));
};

AJAXEngine.bof_cfajax_comment_symbol = '\/* BOF CFAJAX *\/';
AJAXEngine.eof_cfajax_comment_symbol = '\/* EOF CFAJAX *\/';

AJAXEngine._xmlHttp_reqObject = AJAXEngine.xmlHttp_reqObject();

AJAXEngine.items = [];

AJAXEngine.prototype = {
	id : -1,
	errors : [],
	iframeSrc : null,
	sent : null,
	received : null,
	counter : 0,
	multithreaded : true,
	delay : 1,
	timeout : 10,
	statusReset : 3,
	statusdelay : 333,
	statusID : null,
	delayID : null,
	timeoutID : null,
	statusResetID : null,
	Get_symbol : 'get',
	method : this.Get_symbol,
	Idle_symbol : 'idle',
	status : this.Idle_symbol,
	Post_symbol : 'post',
	Received_symbol : 'received',
	Sending_symbol : 'sending',
	release_mode_symbol : "release",
	debug_mode_symbol : "debug",
	isFrameShown : false,
	isXmlHttpPreferred : false,
	js_global_varName : 'qObj',
	myHTML : '',
	currentContextName : '',
	namedContextCache : [],
	namedContextStack : [],
	toString : function() {
		var s = 'id = [' + this.id + ']';
		return s;
	},
	onReceive : function() {}, 
	onSend : function() {},    
	onTimeout : function() {   
		this.throwError("(Warning) The current request has timed out. Please \ntry your request again.");
	},
	setMethodGet : function() {
		this.method = this.Get_symbol;
		return (this.method);
	},
	setMethodPost : function() {
		this.method = this.Post_symbol;
		return (this.method);
	},
	isMethodGet : function() {
		return (this.method == this.Get_symbol);
	},
	isMethodPost : function() {
		return (this.method == this.Post_symbol);
	},
	getUrl : function() {
		return this.url + ((this.url.indexOf("?") == -1) ? "?" : "&") + "uuid=" + uuid();
	},
	isReleaseMode : function() {
		return (this.mode == this.release_mode_symbol);
	},
	isDebugMode : function() {
		return (this.mode == this.debug_mode_symbol);
	},
	setReleaseMode : function() {
		this.mode = this.release_mode_symbol;
	},
	setDebugMode : function() {
		this.mode = this.debug_mode_symbol;
	},
	create : function() {
		this.setDebugMode();
		this.top = ((this.isReleaseMode()) ? "0" : "100") + 'px';
		this.left = ((this.isReleaseMode()) ? "0" : "0") + 'px';
		this.width = ((this.isReleaseMode()) ? "1" : "990") + 'px';
		this.height = ((this.isReleaseMode()) ? "1" : "475") + 'px';
		this.bgcolor = (this.isReleaseMode()) ? "#ffffff" : "#FFFFBF";
		this.setReleaseMode();
		this.visibility = (this.isReleaseMode()) ? "hidden" : "visible";
	
		document.write(this.html());
	},
	hideFrame : function() {
		if (this.isDebugMode()) {
			var oo = getGUIObjectInstanceById(this.ajaxID);
			if (!!oo) {
				oo.style.visibility = "hidden";
				this.visibility = oo.style.visibility;
				this.isFrameShown = false;
			}
			var ooTable = getGUIObjectInstanceById('table_' + this.ajaxID);
			if (!!ooTable) {
				ooTable.style.visibility = "hidden";
			}
		}
	},
	showFrame : function() {
		if (this.isDebugMode()) {
			var oo = getGUIObjectInstanceById(this.ajaxID);
			if (!!oo) {
				oo.style.visibility = "visible";
				this.visibility = oo.style.visibility;
				this.isFrameShown = true;
			}
			var ooTable = getGUIObjectInstanceById('table_' + this.ajaxID);
			if (!!ooTable) {
				ooTable.style.visibility = "visible";
			}
		}
	},
	throwError : function(error) { 
		this.errors[this.errors.length++] = error;
		if (this.status == this.Sending_symbol) this.receivePacket(null, false);
		
		this.showFrame();
	
		alert(error);
	},
	html : function() {  
		var html = '';
		html += "<style type=\"text\/css\">\n";
		html += "#" + this.ajaxID + " {width: " + this.width + "; height: " + this.height + "; left: " + this.left + " visibility: " + this.visibility + "; background: cyan; }\n";
		html += "#table_" + this.ajaxID + " {position:absolute; width: " + this.width + "; top: " + (parseInt(this.top) - 20) + "px; left: " + this.left + " visibility: " + this.visibility + "; background: " + this.bgcolor + "; }\n";
		html += "</style>\n";
		var sSrc = ((typeof this.iframeSrc == "string") ? "src=\"" + this.iframeSrc + "\" " : "");
		html += '<table id="' + 'table_' + this.ajaxID + '" border="1" bgcolor="' + this.bgcolor + '" cellpadding="-1" cellspacing="-1" style="visibility: ' + this.visibility + '">';
		html += '<tr>';
		html += '<td>';
		html += "<iframe " + sSrc + "width=\"" + this.width + "\" height=\"" + this.height + "\" name=\"" + this.ajaxID + "\" id=\"" + this.ajaxID + "\" frameBorder=\"1\" frameSpacing=\"0\" marginWidth=\"0\" marginHeight=\"0\" scrolling=\"Auto\"></iframe>\n";
		html += '</td>';
		html += '</tr>';
		html += '</table>';
		html += "<form name=\"" + this.formID + "\" action=\"" + this.url + "\" target=\"" + this.ajaxID + "\" method=\"post\" style=\"width:0px; height:0px; margin:0px 0px 0px 0px;\">\n";
		html += "<input type=\"Hidden\" name=\"packet\" value=\"\">";
		html += "</form>\n";
		this.myHTML = html;
		return html;
	},
	_serverTimeout : function(id) { 
		if ( (this.status == this.Sending_symbol) && (this.counter == id) ) {
			this.status = "timedout";
			clearInterval(this.statusID);  
			if (this.isDebugMode()) window.status = "";
			this.timeoutID = null;
			this.onTimeout();
		}
	},
	_resetStatus : function() {  
		this.status = this.Idle_symbol;
		this.statusResetID = null;
	},
	receivePacket : function(packet, _bRunEvent) {  
		if (this.status == "timedout") return false;
		var b = (typeof _bRunEvent != "boolean") ? true : _b;


		clearInterval(this.statusID);  
		if (this.isDebugMode()) window.status = "";
	
		this.received = packet;  
	
		if (b) this.onReceive();  
	
		clearInterval(this.statusID); 
		this.statusID = null;
		this.status = this.Received_symbol;
	
		var js = 'AJAXEngine.resetStatus(AJAXEngine.instances[' + this.id + '])';
		this.statusResetID = setTimeout(js, this.statusReset * 1000);
	},
	sendPacket : function(packet) {  
		this.onSend();  
	
		if ( (!this.multithreaded) && (this.status == this.Sending_symbol)) return false;
		if (!!this.delayID) clearTimeout(this.delayID);
		if (!!this.statusResetID) clearTimeout(this.statusResetID);
	
		this.sent = '&___jsName___=' + this.js_global_varName + packet;
		
		var js = 'AJAXEngine.transmitPacket(AJAXEngine.instances[' + this.id + '])';
		this.delayID = setTimeout(js, this.delay);
	},
	isReceivedFromCFAjax : function() {
		if ( (!!this.received) && (typeof this.received != const_object_symbol) ) {
			var bof_f = this.received.toUpperCase().indexOf(AJAXEngine.bof_cfajax_comment_symbol.toUpperCase());
			var eof_f = this.received.toUpperCase().indexOf(AJAXEngine.eof_cfajax_comment_symbol.toUpperCase());
			return ( (bof_f >= 0) && (eof_f >= 0) && (bof_f < eof_f) );
		} else {
			return false;
		}
	},
	processXmlHttpRequestStateChange : function() {
		window.status = AJAXEngine._xmlHttp_reqObject.oRequest.readyState + ', ' + AJAXEngine._xmlHttp_reqObject.oRequest.status;
	    if ( (!!AJAXEngine._xmlHttp_reqObject.oRequest) && (AJAXEngine._xmlHttp_reqObject.oRequest.readyState == 4) ) {
	        try {
	            if (AJAXEngine._xmlHttp_reqObject.oRequest.status && AJAXEngine._xmlHttp_reqObject.oRequest.status == 200) {
					var response = AJAXEngine._xmlHttp_reqObject.oRequest.responseText;
				 	response = response.stripCrLfs();
					var bof_f = response.toUpperCase().indexOf(AJAXEngine.bof_cfajax_comment_symbol.toUpperCase());
					var eof_f = response.toUpperCase().indexOf(AJAXEngine.eof_cfajax_comment_symbol.toUpperCase());
					if (eof_f > 0) {
						eof_f += AJAXEngine.eof_cfajax_comment_symbol.length; 
					}
					if (bof_f > 0) {
						response = response.substring(Math.min(bof_f, eof_f),Math.max(bof_f, eof_f));
					}
					if (!!AJAXEngine._xmlHttp_reqObject.oGateway) {
						AJAXEngine._xmlHttp_reqObject.oGateway.receivePacket(response);
					}
	            } else {
					var response = AJAXEngine._xmlHttp_reqObject.oRequest.responseText;
	                alert('ERROR - AJAXEngine Error:\n' + response.stripCrLfs());
	            }
	        } catch (ex) {
				_alert((!!jsErrorExplainer) ? jsErrorExplainer(ex, '(processXmlHttpRequestStateChange)') : 'processXmlHttpRequestStateChange threw an error.');
	        }
		}
	},
	initXmlHttpRequest : function(url) {
		var bool = false;
	    if (window.XMLHttpRequest) { 
	    	try {
				AJAXEngine._xmlHttp_reqObject.oRequest = new XMLHttpRequest();
				bool = true;
	        } catch(e) {
				AJAXEngine._xmlHttp_reqObject.oRequest = false;
				bool = false;
	        }
	    } else if (window.ActiveXObject) {  
	       	try {
	        	AJAXEngine._xmlHttp_reqObject.oRequest = new ActiveXObject("Msxml2.XMLHTTP");
				bool = true;
	      	} catch(e) {
	        	try {
	          		AJAXEngine._xmlHttp_reqObject.oRequest = new ActiveXObject("Microsoft.XMLHTTP");
					bool = true;
	        	} catch(e) {
	          		AJAXEngine._xmlHttp_reqObject.oRequest = false;
					bool = false;
	        	}
			}
	    }

		try {
			switch (this.method) {
				case this.Post_symbol:
					if (AJAXEngine._xmlHttp_reqObject.oRequest) {
						AJAXEngine._xmlHttp_reqObject.oRequest.onreadystatechange = AJAXEngine.processXmlHttpRequestStateChange(this);
						AJAXEngine._xmlHttp_reqObject.oGateway = this; 
// +++	
						var a = url.split('?');
						if (a.length == 2) {
							AJAXEngine._xmlHttp_reqObject.oRequest.open("POST", a[0], true);
							AJAXEngine._xmlHttp_reqObject.oRequest.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");			
			                AJAXEngine._xmlHttp_reqObject.oRequest.send('QUERY_STRING=' + a[1].URLEncode());
						} else {
							bool = false;
						}
					}
				break;
		
				case this.Get_symbol:
					if (AJAXEngine._xmlHttp_reqObject.oRequest) {
						AJAXEngine._xmlHttp_reqObject.oRequest.onreadystatechange = AJAXEngine.processXmlHttpRequestStateChange(this);
						AJAXEngine._xmlHttp_reqObject.oGateway = this;
						AJAXEngine._xmlHttp_reqObject.oRequest.open("GET", url, true);
						AJAXEngine._xmlHttp_reqObject.oRequest.send(null);
					}
				break;
			}
		} catch(e) {
			bool = false;
		}
		return bool;
	},
	_transmitPacket : function() {  
		this.counter++;  
		this.delayID = null; 
		this.received = null;
		this.status = this.Sending_symbol;
		if (this.isDebugMode()) window.status = "Sending.";
		AJAXEngine._cacheCounters[this.counter] = 0;
		if (!!this.statusID) clearInterval(this.statusID);
		var s_ticker = "AJAXEngine._cacheCounters[" + this.counter + "]++;";
		if (this.isDebugMode()) {
			s_ticker += " window.status = window.status + (((AJAXEngine._cacheCounters[" + this.counter + "] % " + parseInt((1000/this.statusdelay).toString()) + ") == 0) ? (AJAXEngine._cacheCounters[" + this.counter + "] / " + parseInt((1000/this.statusdelay).toString()) + ").toString() : '.')";
		}
		this.statusID = setInterval(s_ticker, this.statusdelay);

		var js = 'AJAXEngine.serverTimeout(' + this.counter + ', AJAXEngine.instances[' + this.id + '])';
		this.timeoutID = setTimeout(js, this.timeout * 1000);

		if (this.isCurrentContextValid()) {
			var argCnt = -1;
			var keys = [];
			var isContextShifted = false;
			var aDict = DictionaryObj.getInstance(this.sent.URLDecode());
			var tDict = this.namedContextCache[this.currentContextName].argsDict;
			var oDict = tDict;
	
			argCnt = this.namedContextCache[this.currentContextName].argsDict.length();
			var apparentArgCnt = parseInt(aDict.getValueFor('argCnt'));
			if (!apparentArgCnt) {
				apparentArgCnt = 0;
				aDict.push('argCnt', apparentArgCnt);
			}
			if (apparentArgCnt > 0) {
				tDict = DictionaryObj.getInstance();
	
				function adjustAndStoreEachKey(aKey) { 
					var newKey = aKey.filterInAlpha() + (parseInt(aKey.filterInNumeric()) + apparentArgCnt);
					tDict.push(newKey, oDict.getValueFor(aKey));
					return newKey;
				}
	
				keys = this.namedContextCache[this.currentContextName].argsDict.adjustKeyNames(adjustAndStoreEachKey);
				isContextShifted = true;
			}
			apparentArgCnt += argCnt;
			aDict.put('argCnt', apparentArgCnt);
			this.sent = aDict.asQueryString().URLEncode();
			argCnt = apparentArgCnt;
			this.sent += tDict.asQueryString().URLEncode();
			DictionaryObj.removeInstance(aDict.id);
			if (isContextShifted) DictionaryObj.removeInstance(tDict.id);
		}
	
		if (this.isXmlHttpPreferred == false) {
			var formattedPacket = this.formatPacket(this.sent);
			if (formattedPacket.length > 2000) {
				this.setMethodPost();
			} else {
				this.setMethodGet(); 
			}
		}
	
		switch (this.method) {
			case this.Post_symbol:
				if (this.isXmlHttpPreferred) {
					var bool = this.initXmlHttpRequest(this.getUrl() + '&cfajax=1' + '&' + this.sent);
					if (bool == false) {
						this.methodPost(this.sent);
					}
				} else {
					this.methodPost(this.sent);
				}
			break;
	
			case this.Get_symbol:
				if (this.isXmlHttpPreferred) {
					var bool = this.initXmlHttpRequest(this.getUrl() + '&cfajax=1' + '&' + this.sent);
					if (bool == false) {
						this.methodGet(formattedPacket);
					}
				} else {
					this.methodGet(formattedPacket);
				}
			break;
		}
	},
	formatPacket : function(packet) {
		if (typeof packet == "string") {
			return packet; 
		}
		else if (typeof packet == "object") {
			var p = [];
			for( var k in packet ) p[p.length] = k + "=" + escape(packet[k]);
			return "&" + p.join("&");
		}
	},
	methodPost : function(packet) {
		if ((/msie/i.test(navigator.userAgent)) == false) {
			return alert("The post method is currently unsupported for the browser you are currently using.");
		}
		oForm = _getGUIObjectInstanceById(this.formID);
		if (!!oForm) {
			oForm.packet.value = packet;
			oForm.submit();
		}
	},
	methodGet : function(sPacket){
		var sUrl = this.getUrl() + sPacket;
		this.packetString = sPacket;
	
		aObj = _getGUIObjectInstanceById(this.ajaxID);
		if (!!aObj) {
			aObj.src = sUrl;
		}
	},
	iterateNamedContexts : function(func) {
		var i = -1;
		if ( (!!func) && (typeof func == const_function_symbol) ) {
			for (i = 1; i < this.namedContextStack.length; i++) {
				func(this.namedContextStack[i]);
			}
		}
	},
	addNamedContext : function(aName, parmsQueryString) {
		var aDict = -1;
		var oDict = -1;
		var pDict = -1;
		var argCnt = -1;
		var keys = '';
		var i = -1;
		var j = -1;
		var v = '';
		if (!this.namedContextCache[aName]) {
			aDict = DictionaryObj.getInstance(parmsQueryString);
			oDict = DictionaryObj.getInstance();
			pDict = DictionaryObj.getInstance();
			argCnt = aDict.length();
			keys = aDict.getKeys();
			for (i = 0, j = 1; i < keys.length; i++, j += 2) {
				oDict.push('arg' + j, keys[i]);
				v = aDict.getValueFor(keys[i]);
				oDict.push('arg' + (j + 1), v);
				pDict.push(keys[i], v);
			}
			DictionaryObj.removeInstance(aDict.id);
			this.namedContextCache[aName] = AJaxContextObj.getInstance(); 
			this.namedContextCache[aName].queryString = parmsQueryString;
			this.namedContextCache[aName].parmsDict = pDict;
			this.namedContextCache[aName].argsDict = oDict;
			this.namedContextStack.push(aName);
			this.currentContextName = aName;
		}
	},
	setContextName : function(aName) {
		if (!!this.namedContextCache[aName]) {
			this.currentContextName = aName;
		} else {
			alert('ERROR: Programming Error - Context Name (' + aName + ') is not valid at this time - the list of valid Context Names is (' + this.namedContextStack + ').');
		}
	},
	isCurrentContextValid : function() {
		return (!!this.namedContextCache[this.currentContextName]);
	},
	isIdle : function() {
		return ( (this.status.trim().toUpperCase() == this.Idle_symbol.trim().toUpperCase()) || ( (this.status.trim().toUpperCase() != this.Received_symbol.trim().toUpperCase()) && (this.status.trim().toUpperCase() != this.Sending_symbol.trim().toUpperCase()) ) );
	},
	init : function() {
		return this;
	},
	destructor : function() {
		return (this.id = AJAXEngine.instances[this.id] = this.data = this.names = null);
	}
};

menuEditorObj = function(id, div_menuBrowserID, menuBrowserID, _menu_textColor, _outerWidth) {
	this.id = id;									
	this.div_menuBrowserID = div_menuBrowserID;		
	this.menuBrowserID = menuBrowserID;				
	this.guiHTML = menuEditorObj.defaultGUI(this, _menu_textColor, _outerWidth); 
};

menuEditorObj.instances = [];

menuEditorObj.getInstance = function(_div_menuBrowserID, _menuBrowserID, menuTextColor, outerWidth) {
	var instance = menuEditorObj.instances[menuEditorObj.instances.length];
	if (instance == null) {
		instance = menuEditorObj.instances[menuEditorObj.instances.length] = new menuEditorObj(menuEditorObj.instances.length, _div_menuBrowserID, _menuBrowserID, menuTextColor, outerWidth);
	}
	return instance;
};

menuEditorObj.removeInstance = function(id) {
	var ret_val = false;
	if ( (id > -1) && (id < menuEditorObj.instances.length) ) {
		var instance = menuEditorObj.instances[id];
		if (!!instance) {
			menuEditorObj.instances[id] = object_destructor(instance);
			ret_val = (menuEditorObj.instances[id] == null);
		}
	}
	return ret_val;
};

menuEditorObj.removeInstances = function() {
	var ret_val = true;
	for (var i = 0; i < menuEditorObj.instances.length; i++) {
		menuEditorObj.removeInstance(i);
	}
	return ret_val;
};

menuEditorObj.const_clipboard_paste_to_menu = 'clipboard_paste_to_menu';

menuEditorObj.pasteSubMenuToMenu = function(_prompt, isAfter, _menuEditorObj) {
	_prompt = ((!!_prompt) ? _prompt : ' ');
	isAfter = ((!!isAfter) ? isAfter : false);
	return ( ( (!!_menuEditorObj) && (!!_prompt) && (!!isAfter) ) ? _menuEditorObj._pasteSubMenuToMenu(_prompt, isAfter) : alert('ERROR: Programming Error - Undefined Objects _menuEditorObj is (' + _menuEditorObj + '), _prompt is (' + _prompt + ') and isAfter is (' + isAfter + ') in function known as menuEditorObj.pasteSubMenuToMenu().'));
};

menuEditorObj._pasteSubMenuToMenu = function(v, isAfter, _menuEditorObj) {
	v = ((!!v) ? v : ' ');
	isAfter = ((!!isAfter) ? isAfter : false);
	return ( ( (!!_menuEditorObj) && (!!v) && (!!isAfter) ) ? _menuEditorObj.__pasteSubMenuToMenu(v, isAfter) : alert('ERROR: Programming Error - Undefined Objects _menuEditorObj is (' + _menuEditorObj + '), v is (' + v + ') and isAfter is (' + isAfter + ') in function known as menuEditorObj.pasteSubMenuToMenu().'));
};

menuEditorObj.processMenuCutToThinAir = function(brObj, _menuEditorObj) {
	return ( ( (!!_menuEditorObj) && (!!brObj) ) ? _menuEditorObj._processMenuCutToThinAir(brObj, false) : alert('ERROR: Programming Error - Undefined Objects _menuEditorObj is (' + _menuEditorObj + ') and brObj is (' + brObj + ') in function known as menuEditorObj.processMenuCutToThinAir().'));
};

menuEditorObj.processMenuCutToClipboard = function(brObj, _menuEditorObj) {
	return ( ( (!!_menuEditorObj) && (!!brObj) ) ? _menuEditorObj._processMenuCutToClipboard(brObj, true) : alert('ERROR: Programming Error - Undefined Objects _menuEditorObj is (' + _menuEditorObj + ') and brObj is (' + brObj + ') in function known as menuEditorObj.processMenuCutToClipboard().'));
};

menuEditorObj.processClipboardPasteToMenu = function(clipObj, _menuEditorObj) {
	return ( ( (!!_menuEditorObj) && (!!clipObj) ) ? _menuEditorObj._processClipboardPasteToMenu(clipObj) : alert('ERROR: Programming Error - Undefined Objects _menuEditorObj is (' + _menuEditorObj + ') and clipObj is (' + clipObj + ') in function known as menuEditorObj.processClipboardPasteToMenu().'));
};

menuEditorObj.processSelectedClipboardItem = function(clipObj, _menuEditorObj) {
	return ( ( (!!_menuEditorObj) && (!!clipObj) ) ? _menuEditorObj._processSelectedClipboardItem(clipObj) : alert('ERROR: Programming Error - Undefined Objects _menuEditorObj is (' + _menuEditorObj + ') and clipObj is (' + clipObj + ') in function known as menuEditorObj.processSelectedClipboardItem().'));
};

menuEditorObj.processMenuBrowseInto = function(brObj, _menuEditorObj) {
	return ( ( (!!_menuEditorObj) && (!!brObj) ) ? _menuEditorObj._processMenuBrowseInto(brObj) : alert('ERROR: Programming Error - Undefined Objects _menuEditorObj is (' + _menuEditorObj + ') and brObj is (' + brObj + ') in function known as menuEditorObj.processMenuBrowseInto().'));
};

menuEditorObj.processMenuBrowseOut = function(brObj, _menuEditorObj) {
	return ( ( (!!_menuEditorObj) && (!!brObj) ) ? _menuEditorObj._processMenuBrowseOut(brObj) : alert('ERROR: Programming Error - Undefined Objects _menuEditorObj is (' + _menuEditorObj + ') and brObj is (' + brObj + ') in function known as menuEditorObj.processMenuBrowseOut().'));
};

menuEditorObj.processCancelMenuItemEditor = function(_menuEditorObj) {
	return ( (!!_menuEditorObj) ? _menuEditorObj._processCancelMenuItemEditor() : alert('ERROR: Programming Error - Undefined Objects _menuEditorObj is (' + _menuEditorObj + ') in function known as menuEditorObj.processCancelMenuItemEditor().'));
};

menuEditorObj.processSaveMenuItemEditor = function(_menuEditorObj) {
	return ( (!!_menuEditorObj) ? _menuEditorObj._processSaveMenuItemEditor() : alert('ERROR: Programming Error - Undefined Objects _menuEditorObj is (' + _menuEditorObj + ') in function known as menuEditorObj.processSaveMenuItemEditor().'));
};

menuEditorObj.processMenuSubMenuAdditor = function(brObj, _menuEditorObj) {
	return ( ( (!!_menuEditorObj) && (!!brObj) ) ? _menuEditorObj._processMenuSubMenuAdditor(brObj) : alert('ERROR: Programming Error - Undefined Objects _menuEditorObj is (' + _menuEditorObj + ') and brObj is (' + brObj + ') in function known as menuEditorObj.processMenuSubMenuAdditor().'));
};

menuEditorObj.processMenuItemAdditor = function(brObj, _menuEditorObj) {
	return ( ( (!!_menuEditorObj) && (!!brObj) ) ? _menuEditorObj._processMenuItemAdditor(brObj) : alert('ERROR: Programming Error - Undefined Objects _menuEditorObj is (' + _menuEditorObj + ') and brObj is (' + brObj + ') in function known as menuEditorObj.processMenuItemAdditor().'));
};

menuEditorObj.processMenuItemEditor = function(brObj, _menuEditorObj) {
	return ( ( (!!_menuEditorObj) && (!!brObj) ) ? _menuEditorObj.__processMenuItemEditor(brObj) : alert('ERROR: Programming Error - Undefined Objects _menuEditorObj is (' + _menuEditorObj + ') and brObj is (' + brObj + ') in function known as menuEditorObj.processMenuItemEditor().'));
};

menuEditorObj.refreshMenuItemEditorSaveButton = function(_menuEditorObj) {
	return ( (!!_menuEditorObj) ? _menuEditorObj._refreshMenuItemEditorSaveButton() : alert('ERROR: Programming Error - Undefined Objects _menuEditorObj is (' + _menuEditorObj + ') in function known as menuEditorObj.refreshMenuItemEditorSaveButton().'));
};

menuEditorObj.handle_menuBrowser_dblclick = function(_menuEditorObj) {
	return ( (!!_menuEditorObj) ? _menuEditorObj._handle_menuBrowser_dblclick() : alert('ERROR: Programming Error - Undefined Objects _menuEditorObj is (' + _menuEditorObj + ') in function known as menuEditorObj.handle_menuBrowser_dblclick().'));
};

menuEditorObj.handle_menuBrowser_click = function(_menuEditorObj) {
	return ( (!!_menuEditorObj) ? _menuEditorObj._handle_menuBrowser_click() : alert('ERROR: Programming Error - Undefined Objects _menuEditorObj is (' + _menuEditorObj + ') in function known as menuEditorObj.handle_menuBrowser_click().'));
};

menuEditorObj.handle_menuBrowser_change = function(_menuEditorObj) {
	return ( (!!_menuEditorObj) ? _menuEditorObj._handle_menuBrowser_change() : alert('ERROR: Programming Error - Undefined Objects _menuEditorObj is (' + _menuEditorObj + ') in function known as menuEditorObj.handle_menuBrowser_change().'));
};

menuEditorObj.const_te_menuEditorPrompt_id = function(_menuEditorObj) {
	return ( (!!_menuEditorObj) ? _menuEditorObj.const_te_menuEditorPrompt_id : alert('ERROR: Programming Error - Undefined Objects _menuEditorObj is (' + _menuEditorObj + ') in function known as menuEditorObj.const_te_menuEditorPrompt_id().'));
};

menuEditorObj.btn_cutMenu2Clipboard = function() {
	return getGUIObjectInstanceById('btn_cutMenu2Clipboard');
};

menuEditorObj.btn_deleteMenuItem = function() {
	return getGUIObjectInstanceById('btn_deleteMenuItem');
};

menuEditorObj.btn_menuOpenSubMenu = function() {
	return getGUIObjectInstanceById('btn_menuOpenSubMenu');
};

menuEditorObj.btn_menuCloseSubMenu = function() {
	return getGUIObjectInstanceById('btn_menuCloseSubMenu');
};

menuEditorObj.menu_clipboard = function() {
	return getGUIObjectInstanceById('menu_clipboard');
};

menuEditorObj.btn_clipboard_paste_to_menu = function() {
	return getGUIObjectInstanceById(menuEditorObj.const_clipboard_paste_to_menu);
};

menuEditorObj.selectItemByUUID = function(brObj, aUUID) {
	var i = -1;
	if (!!brObj) {
		for (i = 0; i < brObj.options.length; i++) {
			if (brObj.options[i].value == aUUID) {
				brObj.selectedIndex = i;
				break;
			}
		}
	}
};

menuEditorObj.brObj = function(_menuEditorObj) {
	return ( (!!_menuEditorObj) ? _menuEditorObj.brObj() : alert('ERROR: Programming Error - Undefined Objects _menuEditorObj is (' + _menuEditorObj + ') in function known as menuEditorObj.brObj().'));
};

menuEditorObj.defaultGUI = function(_menuEditorObj, _site_menu_text_color, _outerTableWidth) {
	var _html = '';
	
	if ( (_menuEditorObj == null) || (_menuEditorObj.id == null) ) { 
		alert('ERROR: Programming Error - Missing _menuEditorObj (' + _menuEditorObj + ') _menuEditorObj.id = [' + _menuEditorObj.id + '] in menuEditorObj.defaultGUI().');
		return;
	}

	_site_menu_text_color = ((!!_site_menu_text_color) ? _site_menu_text_color : '');
	
	_outerTableWidth = ((!!_outerTableWidth) ? _outerTableWidth : 800);

	_html += '<table width="' + _outerTableWidth + '" border="0" cellpadding="-1" cellspacing="-1">';
	_html += '<tr>';
	_html += '<td align="left" valign="top">';
	_html += '<div>';
	_html += '<table width="*" cellpadding="-1" cellspacing="-1">';
	_html += '<tr>';
	_html += '<td width="*" align="right" valign="top">';
	_html += '<table width="100%" cellpadding="-1" cellspacing="-1">';
	_html += '<tr>';
	_html += '<td>';
	_html += '<table cellpadding="-1" cellspacing="-1">';
	_html += '<tr>';
	_html += '<td>';
	_html += '<div id="btn_menuItemEditor" style="display: inline;">';
	_html += '<input type="button" id="btn_editorMenuItem" value="Edit Menu Item" disabled class="buttonClass" title="Click this button to edit the selected menu item." onClick="var brObj = getGUIObjectInstanceById(\'menu_browser\'); var meObj = menuEditorObj.instances[' + _menuEditorObj.id + ']; if (!!meObj) { var edObj = getGUIObjectInstanceById(\'' + _menuEditorObj.const_te_menuEditorPrompt_id + '\'); var btnSave = getGUIObjectInstanceById(\'' + _menuEditorObj.const_btn_menuEditorSave + '\'); if ( (!!brObj) && (!!edObj) && (!!btnSave) ) { edObj.readonly = (((meObj.bool_suppressEvents == false) && (!!meObj.bool_menuEditorPromptsDisabled)) ? true : false); btnSave.disabled = (((meObj.bool_suppressEvents == false) && (!!meObj.bool_menuEditorPromptsDisabled)) ? false : true); menuEditorObj.processMenuItemEditor(brObj, meObj) } }; return false;">';
	_html += '</div>';
	_html += '</td>';
	_html += '</tr>';
	_html += '<tr>';
	_html += '<td>';
	_html += '&nbsp;';
	_html += '</td>';
	_html += '</tr>';
	_html += '<tr>';
	_html += '<td>';
	_html += '<div id="div_menuItemAdder" style="display: inline;">';
	_html += '<input type="button" id="btn_addMenuItem" value="Add Menu Item" class="buttonClass" title="Click this button to add a menu item." onClick="var brObj = getGUIObjectInstanceById(\'menu_browser\'); if (brObj != null) { menuEditorObj.processMenuItemAdditor(brObj, menuEditorObj.instances[' + _menuEditorObj.id + ']) } return false;">';
	_html += '</div>';
	_html += '</td>';
	_html += '</tr>';
	_html += '<tr>';
	_html += '<td>';
	_html += '&nbsp;';
	_html += '</td>';
	_html += '</tr>';
	_html += '<tr>';
	_html += '<td>';
	_html += '<div id="div_menuAdder" style="display: inline;">';
	_html += '<input type="button" id="btn_addEmptySubMenu" value="Add Empty\nSubMenu" class="buttonClass" title="Click this button to add a SubMenu Item." onClick="var brObj = getGUIObjectInstanceById(\'menu_browser\'); if (brObj != null) { menuEditorObj.processMenuSubMenuAdditor(brObj, menuEditorObj.instances[' + _menuEditorObj.id + ']) } return false;">';
	_html += '</div>';
	_html += '</td>';
	_html += '</tr>';
	_html += '<tr>';
	_html += '<td>';
	_html += '&nbsp;';
	_html += '</td>';
	_html += '</tr>';
	_html += '<tr>';
	_html += '<td>';
	_html += '&nbsp;';
	_html += '</td>';
	_html += '</tr>';
	_html += '</table>';
	_html += '</td>';
	_html += '</tr>';
	_html += '</table>';
	_html += '</td>';
	_html += '<td width="*" valign="top" align="right">';
	_html += '<table cellpadding="-1" cellspacing="-1">';
	_html += '<tr>';
	_html += '<td align="center" valign="top">';
	_html += '<table width="100%" cellpadding="-1" cellspacing="-1">';
	_html += '<tr>';
	_html += '<td bgcolor="#FFFF80">';
	_html += '<div id="div_menuEditor" style="display: inline;"></div>';
	_html += '</td>';
	_html += '</tr>';
	_html += '<tr>';
	_html += '<td>';
	_html += '<table width="100%" cellpadding="-1" cellspacing="-1">';
	_html += '<tr>';
	_html += '<td width="50%" align="left">';
	_html += '<input type="button" id="btn_menuOpenSubMenu" value="Open\nSub Menu" disabled class="buttonClass" title="Click this button to Open the selected SubMenu." onClick="var brObj = getGUIObjectInstanceById(\'menu_browser\'); if (brObj != null) { menuEditorObj.processMenuBrowseInto(brObj, menuEditorObj.instances[' + _menuEditorObj.id + ']) } return false;">';
	_html += '</td>';
	_html += '<td width="50%" align="right">';
	_html += '<input type="button" id="btn_menuCloseSubMenu" value="Close\nSub Menu" disabled class="buttonClass" title="Click this button to Close an open SubMenu." onClick="var brObj = getGUIObjectInstanceById(\'menu_browser\'); if (brObj != null) { menuEditorObj.processMenuBrowseOut(brObj, menuEditorObj.instances[' + _menuEditorObj.id + ']) } return false;">';
	_html += '</td>';
	_html += '</tr>';
	_html += '</table>';
	_html += '</td>';
	_html += '</tr>';
	_html += '</table>';
	_html += '</td>';
	_html += '<td align="center" valign="top">';
	_html += '<input type="button" id="btn_cutMenu2Clipboard" disabled value="Cut to\nClipboard" class="buttonClass" title="Click this button to Cut a Menu Item or SubMenu Item to the ClipBoard." onClick="var brObj = getGUIObjectInstanceById(\'menu_browser\'); if (brObj != null) { menuEditorObj.processMenuCutToClipboard(brObj, menuEditorObj.instances[' + _menuEditorObj.id + ']) } return false;">';
	_html += '<br><br>';
	_html += '<input type="button" id="btn_deleteMenuItem" disabled value="Delete\nItem" class="buttonClass" title="Click this button to delete a Menu Item from the Menu." onClick="var brObj = getGUIObjectInstanceById(\'menu_browser\'); if (brObj != null) { menuEditorObj.processMenuCutToThinAir(brObj, menuEditorObj.instances[' + _menuEditorObj.id + ']) } return false;">';
	_html += '</td>';
	_html += '</tr>';
	_html += '</table>';
	_html += '</td>';
	_html += '</tr>';
	_html += '</table>';
	_html += '</div>';
	_html += '</td>';
	_html += '<td align="left" valign="top">';
	_html += '<div id="div_clipboard_wrapper"></div>';
	_html += '</td>';
	_html += '</tr>';

	_html += '<tr>';
	_html += '<td>';
	_html += '<div id="div_menuItemEditor" style="display: none;"></div>';
	_html += '</td>';
	_html += '</tr>';

	_html += '</table>';

	return _html;
};

menuEditorObj.prototype = {
	id : -1,
	debugMode : false,
	bool_suppressEvents: false, 
	div_menuBrowserID : -1,
	menuBrowserID : -1,
	const_UUID_symbol : 'UUID',
	const_cancelButton_symbol : '[Cancel]',
	const_subMenu_symbol : '##',
	const_subMenuEnds_symbol : '##-1',
	const_placeholder_symbol : 'placeholder',
	listOfRequiredSpecialPages : '',
	const_menu_copy_to_clipboard_symbol : 'btn_deleteMenuItem',
	const_ClipboardEmpty_symbol : 'Clipboard Empty',
	const_btn_menuEditorSave : 'btn_menuEditorSave',
	const_btn_menuEditorCancel : 'btn_menuEditorCancel',
	const_te_menuEditorPrompt_id : 'te_menuEditorPrompt',
	const_ClipboardEmpty_value : -1,
	isAddingMenuItem : -1,
	isAddingMenuSubMenu : -1,
	isAutoLoadingMenu : false,
	isClipboardPaste : false,
	bool_autoHideShowEditorFormButtons : false, 
	const_empty_symbol : '',
	bool_menuEditorPromptsDisabled : true, 
	guiHTML : '',
	optionsGUI_id : '',
	_menu_in_browser : [],
	menuArray : [],
	_menu_stack : [],
	_menu_clipboard : [],
	_menu_widgets_stack : [],
	_menu_navigation_stack : [],
	_global_menu_mode : false, 
	toString : function() {
		var s = 'menuEditorObj :: id = [' + this.id + '] ';
		return s;
	},
	onSaveMenuItem : function(brObj, epObj) {
		return brObj; 
	},
	onEditMenuItem : function(brObj, epObj) {
		return epObj; 
	},
	onOpenAddMenuItem : function(brObj) {
		return brObj; 
	},
	onOpenAddSubMenu : function() {
		return -1; 
	},
	onCloseMenuItemEditor : function(brObj) {
		return brObj; 
	},
	onCommitSubMenu : function(v) {
		return v; 
	},
	onCommitMenuItem : function(v) {
		return v; 
	},
	onChangeMenuItem : function(v) {
		return v; 
	},
	onChangeSubMenu : function(v, offset) {
		return v; 
	},
	onOpenSubMenu : function(brObj) {
		return brObj; 
	},
	onCloseSubMenu : function(brObj, cbutObj) {
		return brObj; 
	},
	onClickMenuItem : function(brObj, bdelObj) {
		return brObj; 
	},
	onCutToClipboard : function(brObj, bcutObj) {
		return brObj; 
	},
	onDeleteMenuItem : function(brObj, bcutObj, bdelObj) {
		return brObj; 
	},
	onPasteFromClipboard : function(brObj, clipObj, bcpasteObj) {
		return brObj; 
	},
	onPopulateOptionsGUI : function() {
		return ''; 
	},
	_uuid : function() {
		return uuid();
	},
	uuid : function() {
		var v = (((!!this._uuid) && (typeof this._uuid == const_function_symbol)) ? this._uuid() : null);
		return ((!!v) ? v : uuid());
	},
	performMenuPasteAtLevel : function(value, offset) {
		if (!!this._menu_in_browser) {
			if (this.debugMode) alert('performMenuPasteAtLevel(value = [' + value + '], offset = [' + offset + '])' + ', (typeof this._menu_in_browser) = [' + (typeof this._menu_in_browser) + ']' + '\n' + this._menu_in_browser);
			insertArrayItem(this._menu_in_browser,value,offset);
		}
		return this._menu_in_browser;
	},
	performMenuCutAtLevel : function(offset) {
		if (!!this._menu_in_browser) {
			removeArrayItem(this._menu_in_browser,offset);
		}
		return this._menu_in_browser;
	},
	isClipboardActuallyEmpty : function() {
		var clipObj = getGUIObjectInstanceById('menu_clipboard');
		if (!!clipObj) {
			return ( (clipObj.options.length == 1) && (clipObj.options[0].text.toUpperCase() == this.const_ClipboardEmpty_symbol.toUpperCase()) );
		}
		return false;
	},
	retrieveMenuPrompt : function(mm) {
		if (typeof mm[0] == const_object_symbol) {
			return this.retrieveMenuPrompt(mm[0]);
		} else {
			var toks = mm[0].split('|');
			if (toks.length > 2) {
				return toks[2].trim();
			}
		}
		return '';
	},
	retrieveMenuUUID : function(mm) {
		if (typeof mm[0] == const_object_symbol) {
			return this.retrieveMenuUUID(mm[0]);
		} else {
			var toks = mm[0].split('|');
			if (toks.length > 2) {
				return toks[1].trim();
			}
		}
		return -1;
	},
	retrieveMenuByUUID : function(brObj, id, mm, bool_autoNavigate) {
		var _i = 0;
		var foundIt = false;
	
		function retrieveMenuByUUIDFromNode(c, obj) {
			var i = 0;
			var k = -1;
			var ar = [];
			
			function locateItem(_brObj, _id) {
				var j = -1;
				var _ar = [];
				for (j = 0; j < _brObj.options.length; j++) {
					_ar = _brObj.options[j].value.split('|');
					if ( (_ar.length > 1) && (_ar[1] == _id) ) {
						return j;
					}
				}
				return -1;
			}
			
			for (i = 0; i < c.length; i++) {
				if (!!c[i]) {
					if (typeof c[i] == const_object_symbol) {
						ar = c[i][0].split('|');
						if (ar[1] != id) {
							obj._menu_navigation_stack.push(i);
							brObj.selectedIndex = i;
							obj._processMenuBrowseInto(brObj);
							retrieveMenuByUUIDFromNode(c[i], obj);
						} else {
							foundIt = true;
							k = locateItem(brObj, id);
							if (k > -1) {
								brObj.selectedIndex = k;
								obj._menu_navigation_stack.push(brObj.selectedIndex);
								obj._processMenuBrowseInto(brObj);
							}
							break;
						}
					}
				}
			}
			if ( (foundIt == false) && (obj._menu_navigation_stack.length > 0) ) {
				while (obj._menu_navigation_stack.length > 0) {
					obj._processMenuBrowseOut(brObj);
					brObj.selectedIndex = obj._menu_navigation_stack.pop();
				}
			}
			return;
		}
		if (!!brObj) {
			return retrieveMenuByUUIDFromNode(mm, this);
		}
	},
	brObj : function() { 
		return getGUIObjectInstanceById('menu_browser');
	},
	navigateToUUID : function(id, bool_autoNavigate) { 
		var brObj = getGUIObjectInstanceById('menu_browser');
		if (!!brObj) {
			if (brObj.selectedIndex != 0) {
				brObj.selectedIndex = 0; 
			}
			return this.retrieveMenuByUUID(brObj, id, this.menuArray, bool_autoNavigate);
		}
	},
	navigateBackFromUUID : function(brObj) { 
		var brObj = ((!!brObj) ? brObj : getGUIObjectInstanceById('menu_browser'));
		if (!!brObj) {
			while (this._menu_navigation_stack.length > 0) {
				this._processMenuBrowseOut(brObj);
				brObj.selectedIndex = this._menu_navigation_stack.pop();
			}
		}
	},
	deleteDefaultPlaceHolder : function() { 
		var brObj = getGUIObjectInstanceById('menu_browser');
		if (!!brObj) {
			if (this._menu_in_browser.length > 0) {
				var c0 = this._menu_in_browser[0];
				var opts = brObj.options;
				if (opts.length == 1) {
					var opt = opts[0];
					if (opt.text.toUpperCase() == this.const_placeholder_symbol.toUpperCase()) {
						brObj.options[0].selected = true;
						this._processMenuCutToClipboard(brObj, false);
					}
				}
			}
		}
	},
	trueItemCountOfMenuContainer : function(m) {
		var a = [];
		var cnt = 0;
		if (m.length > 1) {
			for (var i = 1; i < m.length; i++) {
				var o = m[i];
				if ( (typeof o != const_object_symbol) && (!!o) ) {
					a = o.split('|');
					if (a.length == 3) {
						if ( (a[0].toString().trim().length > 0) && (a[0].toString().trim().toUpperCase() != this.const_subMenuEnds_symbol.trim().toUpperCase()) ) {
							cnt++;
						}
					}
				}
			}
		}
		return cnt;
	},
	processSelectedmenuItem : function(brObj) {
		var clipObj = getGUIObjectInstanceById('menu_clipboard');
		var bbutObj = getGUIObjectInstanceById('btn_menuOpenSubMenu');
		var bcutObj = getGUIObjectInstanceById('btn_cutMenu2Clipboard');
		var bcopyObj = getGUIObjectInstanceById(this.const_menu_copy_to_clipboard_symbol);
		var bcpasteObj = getGUIObjectInstanceById(menuEditorObj.const_clipboard_paste_to_menu);
		var edmiObj = getGUIObjectInstanceById('btn_editorMenuItem');
		var abObj = getGUIObjectInstanceById('btn_addMenuItem'); 
		var asObj = getGUIObjectInstanceById('btn_addEmptySubMenu');
		var bdelObj = getGUIObjectInstanceById('btn_deleteMenuItem');
		if ( (!!brObj) && (!!bbutObj) && (!!bcutObj) && (!!bcopyObj) && (!!edmiObj) && (!!abObj) && (!!asObj) ) {
			if (brObj.selectedIndex > -1) {
				edmiObj.disabled = false;
				bcutObj.disabled = false;
				abObj.disabled = false;
				asObj.disabled = false;
				if ( (!!clipObj) && ( (clipObj.selectedIndex == -1) || (this.isClipboardActuallyEmpty()) ) ) {
					if (!!bcpasteObj) bcpasteObj.disabled = true;
				} else {
					if (!!bcpasteObj) bcpasteObj.disabled = false;
				}
			} else {
				edmiObj.disabled = true;
				bcutObj.disabled = true;
				bcopyObj.disabled = true;
				if (!!bcpasteObj) bcpasteObj.disabled = true;
			}
			this.onClickMenuItem(brObj, bdelObj);
		}
	},
	_processMenuCutToThinAir : function(brObj) {
		var clipObj = getGUIObjectInstanceById('menu_clipboard');
		var bcutObj = getGUIObjectInstanceById('btn_cutMenu2Clipboard');
		var bcopyObj = getGUIObjectInstanceById(this.const_menu_copy_to_clipboard_symbol);
		var bcpasteObj = getGUIObjectInstanceById(menuEditorObj.const_clipboard_paste_to_menu);
		var bdelObj = getGUIObjectInstanceById('btn_deleteMenuItem');
		if ( (!!brObj) && (!!clipObj) && (!!bcutObj) && (!!bcopyObj) && (!!bcpasteObj) ) {
			this.onDeleteMenuItem(brObj, bcutObj, bdelObj);
		}
	},
	_processMenuCutToClipboard : function(brObj, bool_copy_to_clipboard) {
		var clipObj = getGUIObjectInstanceById('menu_clipboard');
		var bcutObj = getGUIObjectInstanceById('btn_cutMenu2Clipboard');
		var bcopyObj = getGUIObjectInstanceById(this.const_menu_copy_to_clipboard_symbol);
		var bcpasteObj = getGUIObjectInstanceById(menuEditorObj.const_clipboard_paste_to_menu);
		if ( (!!brObj) && (!!clipObj) && (!!bcutObj) && (!!bcopyObj) && (!!bcpasteObj) ) {
			this.onCutToClipboard(brObj, bcutObj);
		}
	},
	hideShowMenuSaveButtons : function(bool) { 
		var msbObj1 = getGUIObjectInstanceById('menu_savedata_button');
		var msbObj2 = getGUIObjectInstanceById('menu_savedata_button2');
		if ( (!!msbObj1) && (!!msbObj2) ) {
			msbObj1.style.display = ((bool == true) ? const_inline_style : const_none_style);
			msbObj2.style.display = ((bool == true) ? const_none_style : const_inline_style);
		}
	},
	_processClipboardPasteToMenu : function(clipObj) {
		var brObj = getGUIObjectInstanceById('menu_browser');
		var bcpasteObj = getGUIObjectInstanceById(menuEditorObj.const_clipboard_paste_to_menu);
		if ( (!!brObj) && (!!bcpasteObj) ) {
			this.onPasteFromClipboard(brObj, clipObj, bcpasteObj);
		}
	},
	_processClipboardRemoveSelected : function(clipObj) {
		var brObj = getGUIObjectInstanceById('menu_browser');
		var bcpasteObj = getGUIObjectInstanceById(menuEditorObj.const_clipboard_paste_to_menu);
		if ( (!!brObj) && (!!clipObj) && (!!bcpasteObj) ) {
			var sel = clipObj.selectedIndex;
			if (sel != -1) {
				clipObj.options[sel] = null;
				removeArrayItem(this._menu_clipboard,sel);
	
				if ( (clipObj.options.length == 0) || (this.isClipboardActuallyEmpty()) ) {
					bcpasteObj.disabled = true;
				} else {
					bcpasteObj.disabled = false;
				}
				if (clipObj.options.length == 0) {
					optObj = new Option(this.const_ClipboardEmpty_symbol, this.const_ClipboardEmpty_value);
					clipObj.options[0] = optObj;
					clipObj.options[0].selected = true;
				}
			}
		}
	},
	_processSelectedClipboardItem : function(clipObj) {
		var brObj = getGUIObjectInstanceById('menu_browser');
		var bcpasteObj = getGUIObjectInstanceById(menuEditorObj.const_clipboard_paste_to_menu);
		if ( (!!brObj) && (!!clipObj) && (!!bcpasteObj) ) {
			var _text = '';
			if (clipObj.selectedIndex != -1) {
				_text = clipObj.options[clipObj.selectedIndex].text;
			}
			if ( (brObj.selectedIndex == -1) && (brObj.options.length > 0) ) {
				brObj.options[brObj.options.length - 1].selected = true;
			}
			if ( ( (brObj.selectedIndex == -1) && (brObj.options.length > 0) ) ) {
				bcpasteObj.disabled = true;
			} else if (brObj.options.length == 0) {
				bcpasteObj.disabled = false;
			} else {
				bcpasteObj.disabled = false;
			}
		}
	},
	_processMenuBrowseInto : function(brObj) {
		var bbutObj = getGUIObjectInstanceById('btn_menuOpenSubMenu');
		var cbutObj = getGUIObjectInstanceById('btn_menuCloseSubMenu');
		if ( (!!brObj) && (!!bbutObj) && (!!cbutObj) ) {
			if (brObj.selectedIndex != -1) {
				bbutObj.disabled = true;
				cbutObj.disabled = false;
	
				this.onOpenSubMenu(brObj);

				brObj.disabled = false;
			}
		}
	},
	_processCancelMenuItemEditor : function() {
		var eObj = getGUIObjectInstanceById('div_menuItemEditor');
		var ebutObj = getGUIObjectInstanceById('btn_menuItemEditor');
		var abutObj = getGUIObjectInstanceById('div_menuItemAdder');
		var asbutObj = getGUIObjectInstanceById('div_menuAdder');
		var clipObj = getGUIObjectInstanceById('menu_clipboard'); 
		var brObj = getGUIObjectInstanceById('menu_browser'); 
		if ( (!!eObj) && (!!ebutObj) && (!!abutObj) && (!!asbutObj) && (!!clipObj) && (!!brObj) ) { 
			eObj.style.display = const_none_style;
			
			if (this.bool_autoHideShowEditorFormButtons) {
				ebutObj.style.display = const_inline_style; 
				abutObj.style.display = const_inline_style; 
				asbutObj.style.display = const_inline_style; 
			}
			brObj.disabled = false;
			this.onCloseMenuItemEditor(brObj);
		}
	},
	_processSaveMenuItemEditor : function() {
		var brObj = getGUIObjectInstanceById('menu_browser');
		var epObj = getGUIObjectInstanceById('te_menuEditorPrompt');
		if ( (!!epObj) && (!!brObj) ) {
			this.onSaveMenuItem(brObj, epObj);
		}
	
		return this._processCancelMenuItemEditor();
	},
	_processMenuItemEditor : function(brObj) {
		var ebObj = getGUIObjectInstanceById('btn_menuItemEditor');
		var abObj = getGUIObjectInstanceById('div_menuItemAdder'); 
		var asObj = getGUIObjectInstanceById('div_menuAdder');
		var edObj = getGUIObjectInstanceById('div_menuItemEditor');
		var epObj = getGUIObjectInstanceById('te_menuEditorPrompt');
		var clipObj = getGUIObjectInstanceById('menu_clipboard');
		if ( (!!brObj) && (!!ebObj) && (!!abObj) && (!!asObj) && (!!edObj) && (!!epObj) && (!!clipObj) ) {
			edObj.style.display = const_inline_style;
			
			if (this.bool_autoHideShowEditorFormButtons) {
				ebObj.style.display = const_none_style;
				abObj.style.display = const_none_style;
				asObj.style.display = const_none_style;
			}

			this.onEditMenuItem(brObj, epObj);	

			setFocusSafely(epObj);

			var b1Obj = getGUIObjectInstanceById('btn_menuOpenSubMenu');
			var b2Obj = getGUIObjectInstanceById('btn_menuCloseSubMenu');
			var b3Obj = getGUIObjectInstanceById('btn_cutMenu2Clipboard');
			var b3Obj = getGUIObjectInstanceById(this.const_menu_copy_to_clipboard_symbol);
			var b4Obj = getGUIObjectInstanceById(menuEditorObj.const_clipboard_paste_to_menu);
			var b5Obj = getGUIObjectInstanceById('btn_cutMenu2Clipboard');
			if ( (!!b1Obj) && (!!b2Obj) && (!!b3Obj) && (!!b4Obj) && (!!b5Obj) ) {
				var a = new Array(0);
				a[0] = b1Obj.id;
				a[1] = b1Obj.disabled;
				this._menu_widgets_stack.push(a);

				b1Obj.disabled = true;

				var a = new Array(0);
				a[0] = b2Obj.id;
				a[1] = b2Obj.disabled;
				this._menu_widgets_stack.push(a);

				b2Obj.disabled = true;

				var a = new Array(0);
				a[0] = b3Obj.id;
				a[1] = b3Obj.disabled;
				this._menu_widgets_stack.push(a);

				b3Obj.disabled = true;

				var a = new Array(0);
				a[0] = b4Obj.id;
				a[1] = b4Obj.disabled;
				this._menu_widgets_stack.push(a);

				b4Obj.disabled = true;

				var a = new Array(0);
				a[0] = b5Obj.id;
				a[1] = b5Obj.disabled;
				this._menu_widgets_stack.push(a);

				b5Obj.disabled = true;
			}

			var a = new Array(0);
			a[0] = clipObj.id;
			a[1] = clipObj.disabled;
			this._menu_widgets_stack.push(a);
			clipObj.disabled = true;

			var a = new Array(0);
			a[0] = brObj.id;
			a[1] = brObj.disabled;
			this._menu_widgets_stack.push(a);
			brObj.disabled = true;
		}
	},
	_processMenuSubMenuAdditor : function(brObj) {
		var tObj = getGUIObjectInstanceById('_menu_item_editor_title');
		if (!!tObj) {
			flushGUIObjectChildrenForObj(tObj);
			tObj.innerHTML = '<small><b>Add Empty SubMenu</b></small>';
		}
		this.isAddingMenuSubMenu = true;
		this.isAddingMenuItem = false;
		this.onOpenAddSubMenu();
		return this._processMenuItemEditor(brObj);
	},
	_processMenuItemAdditor : function(brObj) {
		var tObj = getGUIObjectInstanceById('_menu_item_editor_title');
		if (!!tObj) {
			flushGUIObjectChildrenForObj(tObj);
			tObj.innerHTML = '<small><b>Add Menu Item</b></small>';
		}
		this.isAddingMenuItem = true;
		this.isAddingMenuSubMenu = false;
		this.onOpenAddMenuItem(brObj);
		return this._processMenuItemEditor(brObj);
	},
	__processMenuItemEditor : function(brObj) {
		var tObj = getGUIObjectInstanceById('_menu_item_editor_title');
		if (!!tObj) {
			flushGUIObjectChildrenForObj(tObj);
			tObj.innerHTML = '<small><b>Edit Menu Item</b></small>';
		}
		this.isAddingMenuItem = false;
		this.isAddingMenuSubMenu = false;
		return this._processMenuItemEditor(brObj);
	},
	_refreshMenuItemEditorSaveButton : function() {
		var sbObj = getGUIObjectInstanceById(this.const_btn_menuEditorSave);
		var prObj = getGUIObjectInstanceById('te_menuEditorPrompt');
		if ( (!!sbObj) && (!!prObj) ) {
			if (this.isAddingMenuItem == true) {
				if (prObj.value.trim().length > 0) {
					sbObj.disabled = false;
				} else {
					sbObj.disabled = true;
				}
			} else {
				sbObj.disabled = false;
			}
		}
	},
	_processMenuBrowseOut : function(brObj) {
		var cbutObj = getGUIObjectInstanceById('btn_menuCloseSubMenu');
		if ( (!!brObj) && (!!cbutObj) ) {
			this.onCloseSubMenu(brObj, cbutObj);
		}
	},
	__pasteSubMenuToMenu : function(v, isAfter) {
		var _empty_subMenu = new Array(0);

		_empty_subMenu[0] = v;

		var _url = ' ';
		var _target = ' ';
		var _prompt = this.const_placeholder_symbol;
		if (_prompt.length == 0) {
			_prompt = ' ';
		}
		var v = _url.stripIllegalChars() + '|' + _target + '|' + _prompt.stripIllegalChars();

		_empty_subMenu[1] = v;
		_empty_subMenu[2] = this.const_subMenuEnds_symbol;

		this._pasteItemToMenu(_empty_subMenu, true);
	},
	_pasteSubMenuToMenu : function(_prompt, isAfter) {
		var _url = this.const_subMenu_symbol;

		var v = _url.stripIllegalChars() + '|' + this.uuid() + '|' + _prompt.stripIllegalChars();
		this.__pasteSubMenuToMenu(v, isAfter);
	},
	_handle_menuBrowser_click : function() { 
		var brObj = getGUIObjectInstanceById('menu_browser'); 
		var bdelObj = getGUIObjectInstanceById('btn_deleteMenuItem');
		if ( (!!brObj) && (!!bdelObj) ) { 
			if (brObj.selectedIndex > -1) {
				this.onClickMenuItem(brObj, bdelObj);
			}
		} 
		
		return false;
	},
	_handle_menuBrowser_dblclick : function() { 
		var brObj = getGUIObjectInstanceById('menu_browser'); 
		if (!!brObj) { 
			if (brObj.selectedIndex > -1) {
				this._processMenuBrowseInto(brObj);
			}
		} 
		
		return false;
	},
	_handle_menuBrowser_change : function() {
		var brObj = getGUIObjectInstanceById('menu_browser'); 
		if (!!brObj) { 
			this.processSelectedmenuItem(brObj);
		} 
		
		return false;
	},
	_setup_object_id : function (_id_) {
		return 'id="' + _id_ + '"';
	},
	initMenuEditorClipboardObjects : function() {
		var dObj = getGUIObjectInstanceById(this.div_menuBrowserID);
		if (!!dObj) {
			flushGUIObjectChildrenForObj(dObj);
			dObj.innerHTML = '<select id="' + this.menuBrowserID + '" size="10" style="font-size: 10px; line-height: 10px; width: 100%;" onclick="return menuEditorObj.handle_menuBrowser_click(menuEditorObj.instances[' + this.id + ']);" ondblclick="return menuEditorObj.handle_menuBrowser_dblclick(menuEditorObj.instances[' + this.id + ']);" onchange="return menuEditorObj.handle_menuBrowser_change(menuEditorObj.instances[' + this.id + ']);"></select>';
		}

		var rObj = getGUIObjectInstanceById('div_clipboard_wrapper');
		if (!!rObj) {
			var html = '';
			html += '<div id="right_side_content">';
			html += '<div id="welcome">';
			html += '</div>';
			html += '<table cellpadding="-1" cellspacing="-1">';
			html += '<tr>';
			html += '<td>';
		
			html += '<table cellpadding="-1" cellspacing="-1">';
			html += '<tr>';
			html += '<td>';
			html += '<center>';
			html += '<select id="menu_clipboard" size="5" style="font-size: 10px; line-height: 10px;" onchange="var clipObj = getGUIObjectInstanceById(\'menu_clipboard\'); if (!!clipObj) { menuEditorObj.processSelectedClipboardItem(clipObj, menuEditorObj.instances[' + this.id + ']) } return false;">';
			html += '</select>';
			html += '</center>';
			html += '</td>';
			html += '</tr>';
		
			html += '<tr>';
			html += '<td>';
		
			html += '<table cellpadding="-1" cellspacing="-1">';
			html += '<tr>';
			html += '<td>';
			var _html = this._setup_object_id(menuEditorObj.const_clipboard_paste_to_menu);
			html += '<input type="button" ' + _html + ' disabled value="Paste to Menu" class="buttonClass" title="Click this button to move a Menu Item or SubMenu Item from the ClipBoard to the Menu perhaps to a different position than the item had been in originally for the purpose or reorganizing or reordering the Menu." onClick="var clipObj = getGUIObjectInstanceById(\'menu_clipboard\'); if (!!clipObj) { menuEditorObj.processClipboardPasteToMenu(clipObj, menuEditorObj.instances[' + this.id + ']) } return false;">';
	
			html += '</td>';
			html += '</tr>';
			html += '</table>';
		
			html += '</td>';
			html += '</tr>';
			html += '</table>';
		
			html += '</td>';
			html += '</tr>';
			html += '</table>';
			html += '</div>';
			flushGUIObjectChildrenForObj(rObj);
			rObj.innerHTML = html;
			
			var sObj = getGUIObjectInstanceById('menu_clipboard');
			if (!!sObj) {
				var optObj;
				if (sObj.options.length == 0) {
					optObj = new Option(this.const_ClipboardEmpty_symbol, this.const_ClipboardEmpty_value);
					sObj.options[0] = optObj;
					sObj.options[0].selected = true;
				}
				sObj.disabled = true;
			} else {
				alert('ERROR: Programming Error - Missing div named (menu_clipboard).');
			}
		} else {
			alert('ERROR: Programming Error - Missing div named (div_clipboard_wrapper).');
		}
	
		var eObj = getGUIObjectInstanceById('div_menuItemEditor');
		if (!!eObj) {
			var html = '';
		
			var s = '';
			var sn = '';

			html += '<form>';
			html += '<table cellpadding="-1" cellspacing="-1">';
			html += '<tr bgcolor="#c0c0c0">';
			html += '<td align="center">';
			html += '<div id="_menu_item_editor_title">';
			html += '<small><b>Edit Menu Item</b></small>';
			html += '</div>';
			html += '</td>';
			html += '</tr>';
			html += '<tr>';
			html += '<td align="left">';
			html += '<font size="1"><small><b>Prompt:</b></small></font>&nbsp;<input type="text" id="' + this.const_te_menuEditorPrompt_id + '" size="39" maxlength="50" class="textEntryClass" onkeypress="return false;" onchange="return false;" onkeydown="return false;" onkeyup="return false;">';
			html += '</td>';
			html += '</tr>';
	
			html += '<tr>';
			html += '<td align="center" colspan="2">';
			html += '<table cellpadding="-1" cellspacing="-1">';
			html += '<tr>';
			html += '<td>';
			var _html = this._setup_object_id(this.const_btn_menuEditorSave);
			html += '<input type="button" ' + _html + ' disabled value="[Save]" class="buttonClass" title="Click this button to Save the Menu Item in the Menu.  Typically this button is used to Save any changes made to the Menu Item you may have been editing or adding to the Menu." onClick="menuEditorObj.processSaveMenuItemEditor(menuEditorObj.instances[' + this.id + ']); return false;">';
			html += '</td>';
			html += '<td>';
			html += '&nbsp;';
			html += '</td>';
			html += '<td>';
			var _html = this._setup_object_id(this.const_btn_menuEditorCancel);
			html += '<input type="button" ' + _html + ' value="' + this.const_cancelButton_symbol + '" class="buttonClass" title="Click this button to Cancel the operation currently in-process." onClick="menuEditorObj.processCancelMenuItemEditor(menuEditorObj.instances[' + this.id + ']); return false;">';
			html += '</td>';
			html += '</tr>';
			html += '</table>';
			html += '</td>';
			html += '</tr>';
			html += '</table>';
			html += '</form>';
	
			flushGUIObjectChildrenForObj(eObj);
			eObj.innerHTML = html;
		} else {
			alert('ERROR: Programming Error - Missing div named (div_menuItemEditor).');
		}
	},
	writeGUI : function() {
		document.write('<div id="div_menuEditor_container"></div>');
		var cObj = getGUIObjectInstanceById('div_menuEditor_container');
		if (!!cObj) {
			flushGUIObjectChildrenForObj(cObj);
			cObj.innerHTML = this.guiHTML;
		}
		this.initMenuEditorClipboardObjects();
	},
	getGUIcontainer : function(id) {
		var html = '';
		this.optionsGUI_id = '';
		id = ((!!id) ? id : 'div_menuEditor_container');
		this.optionsGUI_id = id + '_options';
		html += '<div id="' + id + '"></div>';
		html += '<div id="' + this.optionsGUI_id + '"></div>';
		return html;
	},
	populateGUIcontainer : function(id) {
		id = ((!!id) ? id : 'div_menuEditor_container');
		var cObj = getGUIObjectInstanceById(id);
		if (!!cObj) {
			flushGUIObjectChildrenForObj(cObj);
			cObj.innerHTML = this.guiHTML;
		}
		var cObj = getGUIObjectInstanceById(this.optionsGUI_id);
		if (!!cObj) {
			flushGUIObjectChildrenForObj(cObj);
			cObj.innerHTML = this.onPopulateOptionsGUI();
		}
		this.initMenuEditorClipboardObjects();
	},
	init : function() {
		return this;
	},
	destructor : function() {
		return (this.id = menuEditorObj.instances[this.id] = null);
	}
};

ClientMenuObj = function(id){
	this.id = id;
};

ClientMenuObj.instances = [];

ClientMenuObj.getInstance = function(oDict, uDict) {
	var instance = ClientMenuObj.instances[ClientMenuObj.instances.length];
	if (instance == null) {
		instance = ClientMenuObj.instances[ClientMenuObj.instances.length] = new ClientMenuObj(ClientMenuObj.instances.length, oDict, uDict);
	}
	return instance;
};

ClientMenuObj.removeInstance = function(id) {
	var ret_val = false;
	if ( (id > -1) && (id < ClientMenuObj.instances.length) ) {
		var instance = ClientMenuObj.instances[id];
		if (!!instance) {
			ClientMenuObj.instances[id] = object_destructor(instance);
			ret_val = (ClientMenuObj.instances[id] == null);
		}
	}
	return ret_val;
};

ClientMenuObj.removeInstances = function() {
	var ret_val = true;
	for (var i = 0; i < ClientMenuObj.instances.length; i++) {
		ClientMenuObj.removeInstance(i);
	}
	return ret_val;
};

ClientMenuObj.openClientMenuByUUID = function(oObj, aUUID) {
	try {
		oObj.openClientMenuByUUID(aUUID);
	} catch(e) {
		alert('Error :: Programming Error - ClientMenuObj.openClientMenuByUUID(oObj = [' + oObj + '], aUUID = [' + aUUID + ']) ' + ((!!jsErrorExplainer) ? '\nReason: (' + jsErrorExplainer(e, '') + ')' : '') + '.');
	} finally {
	}
};

ClientMenuObj.openClientSubMenuByUUID = function(oObj, aUUID, uuids) {
	try {
		oObj.openClientSubMenuByUUID(aUUID, uuids);
	} catch(e) {
		alert('Error :: Programming Error - ClientMenuObj.openClientSubMenuByUUID(oObj = [' + oObj + '], aUUID = [' + aUUID + '], uuids = [' + uuids + ']) (uuids is null = [' + (uuids == null) + ']) ' + ((!!jsErrorExplainer) ? '\nReason: (' + jsErrorExplainer(e, '') + ')' : '') + '.');
	} finally {
	}
};

ClientMenuObj.onCheckBoxClicked = function(oObj, id, bool) {
	try {
		oObj.onCheckBoxClicked(id, ((bool == true) ? bool : false), id.split('_'));
	} catch(e) {
		alert('Error :: Programming Error - ClientMenuObj.onCheckBoxClicked(oObj = [' + oObj + '], id = [' + id + '], bool = [' + bool + ']) ' + ((!!jsErrorExplainer) ? '\nReason: (' + jsErrorExplainer(e, '') + ')' : '') + '.');
	} finally {
	}
};

ClientMenuObj.prototype = {
	id : -1,
	coMenuDict : DictionaryObj.getInstance(),
	cuMenuDict : DictionaryObj.getInstance(),
	oMenuDict : DictionaryObj.getInstance(),
	uMenuDict : DictionaryObj.getInstance(),
	aMENUUUID : '',
	aSUBMENUUUID : '',
	bool_leaveMenusOpen : true,
	bool_adjustMarginLeft : false,
	toString : function() {
		var s = 'ClientMenuObj(' + this.id + ') :: (';
		s += ')';
		return s;
	},
	onCheckBoxClicked : function(id, bool, ar) {
	},
	onL2DecideToUseRadioButtonOrCheckBoxes : function(uuid) {
	},
	onL3DecideToUseRadioButtonOrCheckBoxes : function(uuid) {
	},
	onL2DecideToUseLinks : function(uuid) {
	},
	cutOrCopyItemsToClipBoard : function(_MENUUUID, _PARENTID) {
		var _aMENUUUID = -1;
		var selected_container = -1;
		var selected_Dict = -1;
		var selected_PARENTUUID = -1;
		var temp_Dict = -1;
		var new_container = -1;
		
		selected_Dict = DictionaryObj.getInstance(this.uMenuDict.getValueFor(_MENUUUID));
		selected_PARENTUUID = selected_Dict.getValueFor('PARENTUUID');

		this.cuMenuDict.push(_MENUUUID, selected_Dict.asQueryString());

		if (_PARENTID != null) {
			this.coMenuDict.push(_PARENTID, selected_Dict.asQueryString());

			selected_container = this.oMenuDict.getValueFor(_PARENTID);
			if (selected_container != null) {
				if (typeof selected_container != const_object_symbol) {
					var ar = [];
					ar.push(selected_container);
					selected_container = ar;
				}

				new_container = [];
				for (i = 0; i < selected_container.length; i++) {
					temp_Dict = DictionaryObj.getInstance(selected_container[i]);
					_aMENUUUID = temp_Dict.getValueFor('MENUUUID');
					if (_aMENUUUID != _MENUUUID) {
						new_container.push(selected_container[i]);
					}
					DictionaryObj.removeInstance(temp_Dict.id);
				}

				if (new_container.length == 0) {
					this.coMenuDict.drop(_PARENTID);
				} else {
					this.coMenuDict.put(_PARENTID, new_container);
				}
			}
		}

		selected_container = this.oMenuDict.getValueFor(_MENUUUID);
		if (selected_container != null) {
			this.coMenuDict.push(_MENUUUID, selected_container);
			for (i = 0; i < selected_container.length; i++) {
				temp_Dict = DictionaryObj.getInstance(selected_container[i]);
				_aMENUUUID = temp_Dict.getValueFor('MENUUUID');
			//	this.cutOrCopyItemsToClipBoard(_aMENUUUID); // this recurses through all the children however doing this for children that have no children causes problems...
				DictionaryObj.removeInstance(temp_Dict.id);
			}
		}
		DictionaryObj.removeInstance(selected_Dict.id);
	},
	openClientSubMenuByUUID : function(aUUID, uuids) {
		this.aSUBMENUUUID = aUUID;
		var iAR = [];
		var i = -1;
		var j = -1;
		var tDict = -1;
		var tDict3 = -1;
		var dObj = -1;
		var sAR = uuids.split(',');

		this.coMenuDict.init();
		this.cuMenuDict.init();

		this.cutOrCopyItemsToClipBoard(this.aSUBMENUUUID);

		for (i = 0; i < sAR.length; i++) {
			dObj = getGUIObjectInstanceById('div_subMenu_' + sAR[i]);
			if (!!dObj) {
				if (dObj.innerHTML.length > 0) {
					flushGUIObjectChildrenForObj(dObj);
					dObj.innerHTML = '';
					dObj.style.display = ((dObj.innerHTML.length > 0) ? const_inline_style : const_none_style);
				}
			}
		}

		iAR = this.coMenuDict.getValueFor(this.aSUBMENUUUID);
		if (!iAR) {
			iAR = [];
			iAR.push('&MENUUUID=&PROMPT=No SubMenu');
		} else if (typeof iAR != const_object_symbol) {
			var _ar = [];
			_ar.push(iAR);
			iAR = _ar;
		}

		var mUUID = -1;
		var _html = '';
		dObj = getGUIObjectInstanceById('div_subMenu_' + this.aSUBMENUUUID);
		if (!!dObj) {
			if (dObj.innerHTML.length > 0) {
				_html = '';
			} else {
				var oChildren = -1;
				var hasChildren = false;
				var bool_useRadioButtons = false;
				var bool_useLinks = false;
				bool_useRadioButtons = this.onL2DecideToUseRadioButtonOrCheckBoxes(aUUID);
				bool_useRadioButtons = ((bool_useRadioButtons == true) ? bool_useRadioButtons : false);
				this.bool_adjustMarginLeft = ((this.bool_adjustMarginLeft == true) ? this.bool_adjustMarginLeft : false);
				bool_useLinks = this.onL2DecideToUseLinks(aUUID);
				bool_useLinks = ((bool_useLinks == true) ? bool_useLinks : false);
				_html = '<table width="' + (156 + 20) + '" cellpadding="-1" cellspacing="-1"' + ((this.bool_adjustMarginLeft) ? ' style="margin-left: -20px;"' : '') + '>';
				for (i = 0; i < iAR.length; i++) {
					_html += '<tr class="sideMenuBG3">';
					tDict = DictionaryObj.getInstance(iAR[i]);
					mUUID = tDict.getValueFor('MENUUUID');
					oChildren = this.oMenuDict.getValueFor(mUUID);
					var _ar = [];
					oChildren = ((typeof oChildren == const_object_symbol) ? oChildren : _ar.push(oChildren));
					hasChildren = ( (!!oChildren) && (oChildren.length > 0) );
					_html += '<td class="sideMenuBG3a">';
					if (hasChildren) {
						bool_useRadioButtons = this.onL3DecideToUseRadioButtonOrCheckBoxes(mUUID);
						bool_useRadioButtons = ((bool_useRadioButtons == true) ? bool_useRadioButtons : false);
						_html += '<table width="100%" cellpadding="-1" cellspacing="-1" style="margin-top: 5px">';
						_html += '<tr class="sideMenuBG3a">';
						_html += '<td align="left">';
						_html += '<span class="menuClass"' + ((this.bool_adjustMarginLeft) ? ' style="margin-left: -10px;"' : '') + '>' + tDict.getValueFor('PROMPT') + '</span>';
						_html += '</td>';
						_html += '</tr>';
						var mUUID3 = -1;
						for (j = 0; j < oChildren.length; j++) {
							tDict3 = DictionaryObj.getInstance(oChildren[j]);
							_html += '<tr class="sideMenuBG3a">';
							_html += '<td align="left">';
							mUUID3 = tDict3.getValueFor('MENUUUID');
							_html += '<input type="' + ((bool_useRadioButtons == false) ? 'Checkbox' : 'Radio') + '" class="sideMenuCB" id="cb_menuItem_' + mUUID3 + '" onclick="ClientMenuObj.onCheckBoxClicked(ClientMenuObj.instances[' + this.id + '], this.id, this.checked); return true;">&nbsp;' + '<span class="menuClass">' + tDict3.getValueFor('PROMPT') + '</span>';
							_html += '</td>';
							_html += '</tr>';
							DictionaryObj.removeInstance(tDict3.id);
						}
						_html += '</table>';
					} else {
						if (bool_useLinks == false) {
							_html += ((mUUID.trim().length > 0) ? '<input type="' + ((bool_useRadioButtons == false) ? 'Checkbox' : 'Radio') + '" class="sideMenuCB" id="cb_menuItem_' + mUUID + '" onclick="ClientMenuObj.onCheckBoxClicked(ClientMenuObj.instances[' + this.id + '], this.id, this.checked); return true;">&nbsp;' : '');
						}
						_html += '<span' + ((bool_useLinks) ? ' class="sideMenuBG3Clickable" onclick="ClientMenuObj.onCheckBoxClicked(ClientMenuObj.instances[' + this.id + '], this.id, true); return false;"' : ' class="menuClass"') + '>' + tDict.getValueFor('PROMPT') + '</span>';
					}
					_html += '</td>';
					DictionaryObj.removeInstance(tDict.id);
					_html += '</tr>';
				}
				_html += '</table>';
			}
			flushGUIObjectChildrenForObj(dObj);
			dObj.innerHTML = _html;
			dObj.style.display = ((_html.length > 0) ? const_inline_style : const_none_style);
		}
	},
	openClientMenuByUUID : function(aUUID) {
		this.aMENUUUID = aUUID;
		var iAR = [];
		var i = -1;
		var tDict = -1;

		this.coMenuDict.init();
		this.cuMenuDict.init();

		this.cutOrCopyItemsToClipBoard(this.aMENUUUID);
		iAR = this.coMenuDict.getValueFor(this.aMENUUUID);
		if (typeof iAR != const_object_symbol) {
			var _ar = [];
			_ar.push(iAR);
			iAR = _ar;
		}
	//	alert('iAR = [' + iAR + ']' + ', this.coMenuDict = [' + this.coMenuDict + ']');

		var mUUID = -1;
		var siblingsUUIDs = [];
		var dObj = getGUIObjectInstanceById('div_clientSubMenuTest');
		if (!!dObj) {
			var _html = '<table width="156" cellpadding="-1" cellspacing="-1">';
			if (typeof iAR == const_object_symbol) {
				for (i = 0; i < iAR.length; i++) {
					tDict = DictionaryObj.getInstance(iAR[i]);
				//	alert('tDict = [' + tDict + ']' + ', iAR[' + i + '] = [' + iAR[i] + ']' + ', this.bool_leaveMenusOpen = [' + this.bool_leaveMenusOpen + ']');
					mUUID = tDict.getValueFor('MENUUUID');
					if (this.bool_leaveMenusOpen == false) {
						siblingsUUIDs.push(mUUID);
					}
					DictionaryObj.removeInstance(tDict.id);
				}
			//	alert('siblingsUUIDs = [' + siblingsUUIDs + ']');
				for (i = 0; i < iAR.length; i++) {
					_html += '<tr class="sideMenuBG">';
					tDict = DictionaryObj.getInstance(iAR[i]);
					mUUID = tDict.getValueFor('MENUUUID');
					_html += '<td><div id="div_menu_' + mUUID + '" onclick="ClientMenuObj.openClientSubMenuByUUID(ClientMenuObj.instances[' + this.id + '],\'' + mUUID + '\', \'' + siblingsUUIDs + '\'); return false;"><span class="menuClass">' + tDict.getValueFor('PROMPT') + '</span></div><div id="div_subMenu_' + mUUID + '" style="display: none;"></div></div></td>';
					DictionaryObj.removeInstance(tDict.id);
					_html += '</tr>';
				}
			} else {
				_html += '<tr class="sideMenuBG">';
				_html += '<td><span class="menuClass">No Menu Data</span></td>';
				_html += '</tr>';
			}
			_html += '</table>';
			flushGUIObjectChildrenForObj(dObj);
			dObj.innerHTML = _html;
		}
	},
	init : function() {
		this.coMenuDict.init();
		this.cuMenuDict.init();
		this.oMenuDict.init();
		this.uMenuDict.init();
		return this;
	},
	destructor : function() {
		DictionaryObj.removeInstance(this.coMenuDict.id);
		DictionaryObj.removeInstance(this.cuMenuDict.id);
		DictionaryObj.removeInstance(this.oMenuDict.id);
		DictionaryObj.removeInstance(this.uMenuDict.id);
		return (this.id = ClientMenuObj.instances[this.id] = this.coMenuDict = this.cuMenuDict = this.oMenuDict = this.uMenuDict = null);
	}
};
