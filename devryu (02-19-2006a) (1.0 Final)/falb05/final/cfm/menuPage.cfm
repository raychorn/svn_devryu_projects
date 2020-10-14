<cfsetting showdebugoutput="no">
<cfoutput>
	<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
	<head>
	<meta http-equiv="Content-Type" content="text/html; charset=iso-8859-1" />
	#Request.commonCode.html_nocache()#
	<title>Menu Page</title>
	<link rel="stylesheet" href="../StyleSheet.css" type="text/css" />
	<cfinclude template="cfinclude_load_javascript.cfm">
	<cfscript>
		const_button_pressed_color_light_blue = 'lime';
		const_button_hilite_color_light_yellow = 'cyan';
	</cfscript>
	<script type="text/javascript" language="JavaScript1.3">
		const_button_pressed_color_light_blue = '#const_button_pressed_color_light_blue#';
		const_button_hilite_color_light_yellow = '#const_button_hilite_color_light_yellow#';
		
		function handle_button_click(bObj) {
			if (!!bObj) {
				var ar = bObj.id.split('_');
				parent.switchContentPages('contentPage0.cfm?nocache=' + uuid() + '&page=' + ar[ar.length - 1]);
				window.status = 'bObj.id = [' + bObj.id + ']' + ', ar = [' + ar + ']';
			}
		}
		
		window.onload = function () {
			dObj = getGUIObjectInstanceById('div_button_container');
			if (!!dObj) {
			//	window.status = 'window.onload';
				handle_mouseFuncs(dObj, 'BUTTON');
			}
		};
	</script>
	</head>
	
	<body>
	<cfif 0>
		<cfdump var="#qName#" label="qName" expand="No">
		<cfdump var="#qName2#" label="qName2" expand="No">
		<cfscript>
			writeOutput('DateCompare(qName.DATELASTMODIFIED, qName2.DATELASTMODIFIED) = [#DateCompare(qName.DATELASTMODIFIED, qName2.DATELASTMODIFIED)#]');
		</cfscript>
	</cfif>
	<cfif 0>
		<cfdump var="#Session#" label="Session Scope" expand="No">
	</cfif>
	<div id="div_button_container">
		<table width="100%" border="0" cellspacing="-1" cellpadding="-1" align="center">
		  <tr>
		    <td><button id="btn_menu_page1" class="buttonClass" onclick="handle_button_click(this); return true;">Page 1</button></td>
		  </tr>
		  <tr>
		    <td><button id="btn_menu_page2" class="buttonClass" onclick="handle_button_click(this); return true;">Page 2</button></td>
		  </tr>
		  <tr>
		    <td><button id="btn_menu_page3" class="buttonClass" onclick="handle_button_click(this); return true;">Page 3</button></td>
		  </tr>
		  <tr>
		    <td><button id="btn_menu_page4" class="buttonClass" onclick="handle_button_click(this); return true;">Page 4</button></td>
		  </tr>
		  <tr>
		    <td><button id="btn_menu_page5" class="buttonClass" onclick="handle_button_click(this); return true;">Page 5</button></td>
		  </tr>
		  <tr>
		    <td><button id="btn_menu_page6" class="buttonClass" onclick="handle_button_click(this); return true;">Page 6</button></td>
		  </tr>
		  <tr>
		    <td><button id="btn_menu_pageINFO" class="buttonClass" onclick="handle_button_click(this); return true;">INFO</button></td>
		  </tr>
		</table>
	</div>

	</body>
	
	</html>
</cfoutput>
