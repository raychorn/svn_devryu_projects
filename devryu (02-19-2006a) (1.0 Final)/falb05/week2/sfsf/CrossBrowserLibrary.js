/** BEGIN: Globals ************************************************************************/
const_block_style = 'block';
const_inline_style = 'inline';
const_none_style = 'none';

_cache_gui_objects = [];

const_text_symbol = 'text';
const_hidden_symbol = 'hidden';
const_textarea_symbol = 'textarea';
const_password_symbol = 'password';

const_blank_symbol = '_blank';
const_slash_slash_symbol = '//';
const_slash_symbol = '/';
const_indexcfm_symbol = 'index.cfm';

const_http_symbol = 'http://';
const_https_symbol = 'https://';
const_mailto_symbol = 'mailto:';
const_ftp_symbol = 'ftp://';
const_other_symbol = '(other)';

const_cursor_hand = 'hand';
const_cursor_default = 'default';

const_object_symbol = 'object';
const_number_symbol = 'number';
const_function_symbol = 'function';

const_radio_symbol = 'radio';
const_checkbox_symbol = 'checkbox';
const_button_symbol = 'button';

const_submit_symbol = 'submit';
const_cancel_symbol = 'cancel';

const_backgroundColor_symbol = 'backgroundColor';

const_no_response_symbol = 'No';

const_true_value_symbol = 'True';

const_gif_filetype_symbol = '.gif';
const_jpg_filetype_symbol = '.jpg';
const_jpeg_filetype_symbol = '.jpeg';

const_images_symbol = '/images/';             		// used by _autoCorrectLinksAndImages()
const_components_symbol = '/components/';     		// used by _autoCorrectLinksAndImages()
const_images_prime_symbol = 'images/';        		// used by _autoCorrectLinksAndImages()
const_images_uploaded_symbol = '/uploaded-images/'; // used by _autoCorrectLinksAndImages()

const_panagons_link_symbol = 'http://panagons';

const_anchor_menu_anchorStyles = 'text-decoration: none; font-weight: bold; color: white; padding: 2px;';

/** END! Globals ************************************************************************/

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

function initGUIObjectCache() {
	_cache_gui_objects = [];
}

function flushGUIObjectChildrenForObj(obj) {
	if (obj != null) {
		var sfEls = obj.getElementsByTagName("*");
		for (var i = 0; i < sfEls.length; i++) {
			events_unHookAllEventHandlers(sfEls[i]);
			if (sfEls[i].id) {
				_cache_gui_objects[sfEls[i].id] = null;
			}
		}
	}
}

function flushGUIObjectChildrenForObj(obj) {
	if (obj != null) {
		var sfEls = obj.getElementsByTagName("*");
		for (var i = 0; i < sfEls.length; i++) {
			if (sfEls[i].id) {
				_cache_gui_objects[sfEls[i].id] = null;
			}
		}
	}
}

function _getGUIObjectInstanceById(id) {
	var obj = -1;
	obj = ((document.getElementById) ? document.getElementById(id) : ((document.all) ? document.all[id] : ((document.layers) ? document.layers[id] : null)));
	return obj;
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

function jsErrorExplainer(e, funcName) {
	var _db = ''; 
	_db += "e.number is: " + (e.number & 0xFFFF) + '\n'; 
	_db += "e.description is: " + e.description + '\n'; 
	_db += "e.name is: " + e.name + '\n'; 
	_db += "e.message is: " + e.message + '\n';
	alert(funcName + '\n' + e.toString() + '\n' + _db);
}

function jsEventExplainer(e, newLine) {
	var _db = ''; 

	try {
		if (e.data) _db += "e.data is: " + e.data + newLine; 
	} catch(e) {
		_db += 'e.data is: -- UNKNOWN --' + newLine; 
	} finally {
	}

	try {
		if (e.height) _db += "e.height is: " + e.height + newLine; 
	} catch(e) {
		_db += 'e.height is: -- UNKNOWN --' + newLine; 
	} finally {
	}

	try {
		if (e.layerX) _db += "e.layerX is: " + e.layerX + newLine; 
	} catch(e) {
		_db += 'e.layerX is: -- UNKNOWN --' + newLine; 
	} finally {
	}

	try {
		if (e.layerY) _db += "e.layerY is: " + e.layerY + newLine; 
	} catch(e) {
		_db += 'e.layerY is: -- UNKNOWN --' + newLine; 
	} finally {
	}

	try {
		if (e.modifiers) _db += "e.modifiers is: " + e.modifiers + newLine; 
	} catch(e) {
		_db += 'e.modifiers is: -- UNKNOWN --' + newLine; 
	} finally {
	}

	try {
		if (e.pageX) _db += "e.pageX is: " + e.pageX + newLine; 
	} catch(e) {
		_db += 'e.pageX is: -- UNKNOWN --' + newLine; 
	} finally {
	}

	try {
		if (e.pageY) _db += "e.pageY is: " + e.pageY + newLine; 
	} catch(e) {
		_db += 'e.pageY is: -- UNKNOWN --' + newLine; 
	} finally {
	}

	try {
		if (e.screenX) _db += "e.screenX is: " + e.screenX + newLine; 
	} catch(e) {
		_db += 'e.screenX is: -- UNKNOWN --' + newLine; 
	} finally {
	}

	try {
		if (e.screenY) _db += "e.screenY is: " + e.screenY + newLine; 
	} catch(e) {
		_db += 'e.screenY is: -- UNKNOWN --' + newLine; 
	} finally {
	}

	try {
		if (e.target) _db += "e.target is: " + e.target + newLine; 
	} catch(e) {
		_db += 'e.target is: -- UNKNOWN --' + newLine; 
	} finally {
	}

	try {
		if (e.type) _db += "e.type is: " + e.type + newLine; 
	} catch(e) {
		_db += 'e.type is: -- UNKNOWN --' + newLine; 
	} finally {
	}

	try {
		if (e.which) _db += "e.which is: " + e.which + newLine; 
	} catch(e) {
		_db += 'e.which is: -- UNKNOWN --' + newLine; 
	} finally {
	}

	try {
		if (e.width) _db += "e.width is: " + e.width + newLine; 
	} catch(e) {
		_db += 'e.width is: -- UNKNOWN --' + newLine; 
	} finally {
	}

	try {
		if (e.x) _db += "e.x is: " + e.x + newLine; 
	} catch(e) {
		_db += 'e.x is: -- UNKNOWN --' + newLine; 
	} finally {
	}

	try {
		if (e.y) _db += "e.y is: " + e.y + newLine; 
	} catch(e) {
		_db += 'e.y is: -- UNKNOWN --' + newLine; 
	} finally {
	}
	return _db;
}

function jsObjectExplainer(o) {
	var _db = ''; 
	var m = -1;
	var o_m = -1;
	var typOf = typeof o;

	if (typOf == const_object_symbol) {
		for (m in o) {
			_db += 'o[' + m + '] = '; 
			try {
				o_m = o[m];
			} catch(e) {
				o_m = 'undefined';
			} finally {
			}
			_db += '(' + o_m + ')\n'; 
		}
	}
	alert('jsObjectExplainer(' + o + ', typOf = [' + typOf + ']) ::' + ((o.length) ? ' o.length = [' + ((o.length) ? o.length : 'undefined') + ']' : '') + '\n' + _db);
}

//*** BEGIN: cross-browser getSelection() ***********************************************************************/

function _getSelection() {
	var txt = '';
	if (window.getSelection) {
		txt = window.getSelection();
	}
	else if (document.getSelection)	{
		txt = document.getSelection();
	}
	else if (document.selection) {
		var r = document.selection.createRange();
		txt = r.text;
	}
	else return;
}

//*** END! cross-browser getSelection() ***********************************************************************/

//*** BEGIN: URLEncode() ***********************************************************************/

function URLEncode(plaintext) {
	// The Javascript escape and unescape functions do not correspond
	// with what browsers actually do...
	var SAFECHARS = "0123456789" +					// Numeric
					"ABCDEFGHIJKLMNOPQRSTUVWXYZ" +	// Alphabetic
					"abcdefghijklmnopqrstuvwxyz" +
					"-_.!~*'()";					// RFC2396 Mark characters
	var HEX = "0123456789ABCDEF";

	var encoded = "";
	if (plaintext != null) {
		for (var i = 0; i < plaintext.length; i++ ) {
			var ch = plaintext.charAt(i);
		    if (ch == " ") {
			    encoded += "+";				// x-www-urlencoded, rather than %20
			} else if (SAFECHARS.indexOf(ch) != -1) {
			    encoded += ch;
			} else {
			    var charCode = ch.charCodeAt(0);
				if (charCode > 255) {
				    alert( "Unicode Character '" 
	                        + ch 
	                        + "' cannot be encoded using standard URL encoding.\n" +
					          "(URL encoding only supports 8-bit characters.)\n" +
							  "A space (+) will be substituted." );
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

//*** END! URLEncode() ***********************************************************************/


//*** BEGIN: URLDecode() ***********************************************************************/

function URLDecode(encoded) {
   // Replace + with ' '
   // Replace %xx with equivalent character
   // Put [ERROR] in output if %xx is invalid.
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
				alert( 'Bad escape combination near ...' + encoded.substr(i) );
				plaintext += "%[ERROR]";
				i++;
			}
		} else {
		   plaintext += ch;
		   i++;
		}
	} // while
   return plaintext;
}

//*** END! URLDecode() ***********************************************************************/


//**************************************************************************/

/** MathAndStringExtend.js
 *  JavaScript to extend String class
 *  - added trim methods 
 *    - uses regular expressions and pattern matching. 
 * *  eg. *    var s1 = new String("   abc   "); 
 *    var trimmedS1 = s1.trim(); 
 * *  similary for String.triml() and String.trimr(). 
 *
 //**************************************************************************/
 
function _int(i){
	var _s = i.toString().split(".");
	return eval(_s[0]);
};

// Relaxed the requirement than "SBC" MSIE Browsers be used - now any MSIE browser that's not a disallowed type such as Opera or Netscape or Mozilla will be allowed without warning.
browser_is_ie = ( /msie/i.test(navigator.userAgent) &&	!/opera/i.test(navigator.userAgent) &&	!/Gecko/i.test(navigator.userAgent) &&	!/Netscape/i.test(navigator.userAgent) &&	!/Firefox/i.test(navigator.userAgent) ); //  && /sbc/i.test(navigator.userAgent)

if (browser_is_ie == false) {
//	alert('Unsupported Browser has been detected !  Some site functionality may not be available.  This site supports the SBC Standard Microsoft IE Browser. Your browser appears to be (' + navigator.userAgent + ').');
}

/**************************************************************************/

function caselessIndexOfAll(s) {
	var _f = 0;
	var _fr = 0;
	var a = [];
	var sl = s.trim().length;
	var st = this.trim().length;
	while ((_f = this.trim().toUpperCase().indexOf(s.trim().toUpperCase(), _fr)) != -1) {
		a.push(_f);
		_fr += _f + sl;
		if (_fr >= st) {
			break;
		}
	}
	return a;
}

String.prototype.caselessIndexOfAll = caselessIndexOfAll;

/**************************************************************************/

function keywordSearchCaseless(kw) {
	var const_begin_tag_symbol = '<';
	var const_end_tag_symbol = '>';
	var const_begin_literal_symbol = '&';
	var const_end_literal_symbol = ';';

	var _debug_output = '';

	function gobbleUpCharsUntil(e_ch, _s) {
		var _ch = '';
		for (; i < _s.length; i++) {
			_ch = _s.substr(i, 1); // charAt(i);
			if (_ch == e_ch) {
				i++;
				_ch = _s.substr(i, 1); // charAt(i);
				break;
			}
		}
		return _ch;
	}

	var _s = this.trim().stripHTML().trim();
	var _hasHTMLtags = this.trim().length != _s.length;
	var _kw = kw.trim().stripHTML().trim().toUpperCase();
	var _f = _s.toUpperCase().indexOf(_kw);
	if ( (_f != -1) && (_hasHTMLtags) ) {
		// found something - try to map it back into the HTML...
		// (1). scan thru this breaking apart words based on where the words fall relative to HTML tags.
		var _ch = '';
		var _word = '';
		var _words_array = [];
		_ch = this.substr(i, 1); // charAt(i);
		for (var i = 0; i < this.length; i++) {
			if (_ch == const_begin_tag_symbol) {
				// gobble-up chars until we reach the end tag symbol
				_ch = gobbleUpCharsUntil(const_end_tag_symbol, this);
			}
			if (_ch == const_begin_literal_symbol) {
				// gobble-up chars until we reach the end literal symbol
				_ch = gobbleUpCharsUntil(const_end_literal_symbol, this);
			}
			// now _ch should be at a char not within an HTML'ish tag or literal...
			// now collect chars until we encounter another HTML'ish symbol be it tag or literal...
			if ( (_ch != const_begin_tag_symbol) && (_ch != const_begin_literal_symbol) ) {
				_word = '';
				for (; i < this.length; i++) {
					_ch = this.substr(i, 1); // charAt(i);
					if ( (_ch == const_begin_tag_symbol) || (_ch == const_begin_literal_symbol) ) {
						break;
					}
					_word += _ch;
				}
				if (_word.trim().length > 0) {
					// store the word in the array along with the index for the word...
					a = [];
					a.push(_word);
					a.push(i - _word.length);
					_words_array.push(a);
				}
			}
			_ch = this.substr(i, 1); // charAt(i);
		}
		if (_words_array.length > 0) {
			// we found some words so now we search the _words_array for the keyword...
			var a = [];
			for (i = 0; i < _words_array.length; i++) {
				a = _words_array[i];
				_s = a[0];
				var _ff = _s.toUpperCase().indexOf(_kw);
				if (_ff != -1) {
					// found the keyword...
					var o_f = _f;
					_f = a[1] + _ff;
					break;
				}
			}
		}
	} else if (_hasHTMLtags == false) {
		// there are no HTML tags to account for so just do the silly search...
		var _f = this.toUpperCase().indexOf(kw.toUpperCase());
	}
	return _f;
}

String.prototype.keywordSearchCaseless = keywordSearchCaseless;

/**************************************************************************/

function countCrs() {
	var cnt = 0;
	for (var i = 0; i < this.length; i++) {
		_ch = this.substr(i, 1); // charAt(i);
		if (_ch == '\n') {
			cnt++;
		}
	}
	return cnt;
}

String.prototype.countCrs = countCrs;

/**************************************************************************/

function countCrLfs() {
	var cnt = 0;
	for (var i = 0; i < this.length; i++) {
		_ch = this.substr(i, 1); // charAt(i);
		if ( (_ch == '\n') || (_ch == '\r') ) {
			cnt++;
		}
	}
	return cnt;
}

String.prototype.countCrLfs = countCrLfs;

/**************************************************************************/

function stripHTML() {
	var s = null;
	s = this.replace(/(<([^>]+)>)/ig,""); // trim everything that's between < and >
	s = s.replace(/(&([^;]+);)/ig,""); // trim everything that's between & and ;
	return s;
}

String.prototype.stripHTML = stripHTML;

/**************************************************************************/

function stripTickMarks() {
	return this.replace(/\'/ig, "");
}

String.prototype.stripTickMarks = stripTickMarks;

/**************************************************************************/

function replaceTickMarksWith(ch) {
	return this.replace(/\'/ig, ch);
}

String.prototype.replaceTickMarksWith = replaceTickMarksWith;

/**************************************************************************/

function stripIllegalChars() {
	return this.URLEncode(); // .replace(/,/ig, "").replace(/\|/ig, "");
}

String.prototype.stripIllegalChars = stripIllegalChars;

/**************************************************************************/

function _URLEncode() {
	return URLEncode(this);
}

String.prototype.URLEncode = _URLEncode;

/**************************************************************************/

function _URLDecode() {
	return URLDecode(this);
}

String.prototype.URLDecode = _URLDecode;

/**************************************************************************/

function stripCrLfs() {
	return this.replace(/\n/ig, "").replace(/\r/ig, "");
}

String.prototype.stripCrLfs = stripCrLfs;

/**************************************************************************/

function replaceSubString(i, j, s) {
	var s = this.substring(0, i) + s + this.substring(j, this.length);
	return s;
}

String.prototype.replaceSubString = replaceSubString;

/**************************************************************************/

function clipCaselessReplace(keyword, sText) {
	var _ff = this.toUpperCase().indexOf(keyword.toUpperCase());
	if (_ff != -1) {
		return this.replaceSubString(_ff, _ff + keyword.length, sText);
	}

	return this;
}

String.prototype.clipCaselessReplace = clipCaselessReplace;

/**************************************************************************/

function trim() {  
 	var s = null;
	// trim white space from the left  
	s = this.replace(/^[\s]+/,"");  
	// trim white space from the right  
	s = s.replace(/[\s]+$/,"");  
	return s;
}

function triml() {  
	// trim white space from the left   
	return this.replace(/^[\s]+/,"");
}

function trimr() {  
	// trim white space from the right  
	return this.replace(/[\s]+$/,"");
}

String.prototype.trim = trim;
String.prototype.triml = triml;
String.prototype.trimr = trimr;

/**************************************************************************/

function mungeIntoSymbol() {
	var _symbol = "";

	for (var i = 0; i < this.length; i++) {
		var ch = this.substring(i, i + 1);
		if ( (ch >= "0") && (ch <= "z") ) {
			_symbol += ch;
		} else {
			_symbol += "_";
		}
	}

	return _symbol;
}

String.prototype.mungeIntoSymbol = mungeIntoSymbol;
 
/**************************************************************************/

function replaceDelims(d1, d2) {
	var a = this.split(d1);
	var s_new = a.join(d2);

	return s_new;
}

String.prototype.replaceDelims = replaceDelims;
 
/**************************************************************************/

function sum() {
	var _sum = 0;

	for (i = 0; i < this.length; i++) {
		_sum += this[i];
	}

	return _sum;
}

Array.prototype.sum = sum;

/**************************************************************************/

function avg() {
	return (this.sum()/this.length);
}

Array.prototype.avg = avg;

/**************************************************************************/

function max() {
	var m = -1;
	if (typeof this[0] == const_number_symbol) {
		m = this[0];
	}
	for (var i = this.length; i > 0; i--) {
		if (typeof this[i] == const_number_symbol) {
			m = Math.max(m, this[i]);
		}
	}
	return m;
}

Array.prototype.max = max;

/**************************************************************************/

function min() {
	var m = -1;
	if (typeof this[0] == const_number_symbol) {
		m = this[0];
	}
	for (var i = this.length; i > 0; i--) {
		if (typeof this[i] == const_number_symbol) {
			m = Math.min(m, this[i]);
		}
	}
	return m;
}

Array.prototype.min = min;

/**************************************************************************/

function iMax() {
	var m = this.max();

	for (var i = 0; i < this.length; i++) {
		if (this[i] == m) {
			return i;
		}
	}
	return -1;
}

Array.prototype.iMax = iMax;

/**************************************************************************/

function iMin() {
	var m = this.min();

	for (var i = 0; i < this.length; i++) {
		if (this[i] == m) {
			return i;
		}
	}
	return -1;
}

Array.prototype.iMin = iMin;

/**************************************************************************/

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

/**************************************************************************/

function keyValFromKey(keyName) {
	var val = -1;
	var aa = [];

	keyName = keyName.trim().toUpperCase();
	for (var i = 0; i < this.length; i++) {
		aa = this[i].toString().split(',');
		if (aa.length == 2) {
			if (aa[0].trim().toUpperCase() == keyName) {
				val = aa[1];
				break;
			}
		}
	}
	return val;
}

Array.prototype.keyValFromKey = keyValFromKey;

/**************************************************************************/


