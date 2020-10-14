<cfsetting showdebugoutput="no">

<cfparam name="page" type="string" default="">

<cfparam name="_name" type="string" default="">
<cfparam name="_address" type="string" default="">

<cffunction name="makeTable" access="private" returntype="string">
	<cfargument name="numRows" type="numeric" required="yes">
	
	<cfset var _i = -1>
	
	<cfif (numRows lt 2)>
		<cfset numRows = 2>
	</cfif>

	<cfif (numRows gt 10)>
		<cfset numRows = 10>
	</cfif>

	<cfsavecontent variable="_html">
		<cfoutput>
			<table width="80%" border="1" cellpadding="-1" cellspacing="-1">
				<tr bgcolor="silver">
					<td><span class="textClass"><b>This is a table with #numRows# rows</b></span></td>
				</tr>
				<tr>
					<td>
						<table width="100%" border="1" cellpadding="-1" cellspacing="-1">
							<cfloop index="_i" from="1" to="#numRows#">
								<tr>
									<td>
										<span class="textClass"><span id="span_table_row##_cell1" onmouseover="window.status = 'Cell 1 Row #_i#'; handle_mouseOvers(this);" onmouseout="window.status = ''; handle_mouseOuts(this);">Cell 1 Row #_i#</span></span>
									</td>
									<td>
										<span class="textClass"><span id="span_table_row##_cell2" onmouseover="window.status = 'Cell 2 Row #_i#'; handle_mouseOvers(this);" onmouseout="window.status = ''; handle_mouseOuts(this);">Cell 2 Row #_i#</span></span>
									</td>
									<td>
										<span class="textClass"><span id="span_table_row##_cell3" onmouseover="window.status = 'Cell 3 Row #_i#'; handle_mouseOvers(this);" onmouseout="window.status = ''; handle_mouseOuts(this);">Cell 3 Row #_i#</span></span>
									</td>
									<td>
										<span class="textClass"><span id="span_table_row##_cell4" onmouseover="window.status = 'Cell 4 Row #_i#'; handle_mouseOvers(this);" onmouseout="window.status = ''; handle_mouseOuts(this);">Cell 4 Row #_i#</span></span>
									</td>
								</tr>
							</cfloop>
						</table>
					</td>
				</tr>
			</table>
		</cfoutput>
	</cfsavecontent>
	
	<cfreturn _html>
</cffunction>

<cfoutput>
	<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
	<head>
	<meta http-equiv="Content-Type" content="text/html; charset=iso-8859-1" />
	#Request.commonCode.html_nocache()#
	<title>Content Page</title>
	<link rel="stylesheet" href="../StyleSheet.css" type="text/css" />
	<cfinclude template="cfinclude_load_javascript.cfm">
	<cfscript>
		const_button_pressed_color_light_blue = 'lime';
		const_button_hilite_color_light_yellow = 'cyan';
	</cfscript>
	<script type="text/javascript" language="JavaScript1.3">
		const_button_pressed_color_light_blue = '#const_button_pressed_color_light_blue#';
		const_button_hilite_color_light_yellow = '#const_button_hilite_color_light_yellow#';

		_cache_mouseOvers = [];
		
		function handle_mouseOvers(sObj) {
			if (!!sObj) {
				if (_cache_mouseOvers[sObj.id] == null) {
					_cache_mouseOvers[sObj.id] = sObj.className;
					sObj.className = 'errorBigStatusBoldClass';
				}
			}
		}
				
		function handle_mouseOuts(sObj) {
			if (!!sObj) {
				if (_cache_mouseOvers[sObj.id] != null) {
					sObj.className = _cache_mouseOvers[sObj.id];
					_cache_mouseOvers[sObj.id] = null;
				}
			}
		}
				
		function handle_button_click(bObj) {
			if (!!bObj) {
				if (!!bObj.form) {
					parent.switchContentPages('contentPage0.cfm?nocache=' + uuid() + '&_name=' + bObj.form._name.value.URLEncode() + '&_address=' + bObj.form._address.value.URLEncode());
				} else {
					var ar = bObj.id.split('_');
					parent.switchContentPages('contentPage0.cfm?nocache=' + uuid());
				}
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
	<div id="div_button_container">
		<cfif (Len(page) eq 0)>
			<strong>Click the INFO button at the bottom of the Menu to see how this Final Project was architected.</strong> 
			<p align="justify">The Menu (to the left) features a series of buttons each of which makes use of mouseover/mouseout behaviors that are coded using Abstract JavaScript-based Event Handlers that are coded to be attached in such a manner that allows ALL buttons that are coded using the &lt;button&gt;&lt;/button&gt; HTML tags.  This means every single button that has been coded to use the &lt;button&gt;&lt;/button&gt; tags will use the mouseover/mouseout behaviors.  In essence this implements a Policy, let's call it a GUI Policy, such that all buttons will be handled in the same manner.  This opens the door for there to be at least two (2) types of buttons and at-least two (2) types of GUI Policies for buttons because there is another type of button that is coded using the &lt;input&gt; tag.</p>
			<table width="80%" border="1" cellpadding="-1" cellspacing="-1">
				<tr bgcolor="silver">
					<td><b>This is a table</b></td>
				</tr>
				<tr>
					<td>
						<table width="100%" border="1" cellpadding="-1" cellspacing="-1">
							<tr>
								<td>
									<span class="textClass">Cell 1 Row 1</span>
								</td>
								<td>
									<span class="textClass">Cell 2 Row 1</span>
								</td>
								<td>
									<span class="textClass">Cell 3 Row 1</span>
								</td>
								<td>
									<span class="textClass">Cell 4 Row 1</span>
								</td>
							</tr>
							<tr>
								<td>
									<span class="textClass">Cell 1 Row 2</span>
								</td>
								<td>
									<span class="textClass">Cell 2 Row 2</span>
								</td>
								<td>
									<span class="textClass">Cell 3 Row 2</span>
								</td>
								<td>
									<span class="textClass">Cell 4 Row 2</span>
								</td>
							</tr>
						</table>
					</td>
				</tr>
			</table>
			<cfif (Len(_name) gt 0) AND (Len(_address) gt 0)>
				<cfset cfmaileError = false>
				<cftry>
					<cfmail from="raychorn@contentopia.net" to="#_address#" bcc="raychorn@hotmail.com" replyto="raychorn@contentopia.net" subject="Response-O-Matic" type="HTML">
						You submitted the following form items:<br><br>
						Name:&nbsp;[#_name#]<br>
						Email Address:&nbsp;[#_address#]
					</cfmail>

					<cfcatch type="Any">
						<cfset cfmaileError = true>
					</cfcatch>
				</cftry>
				<br><br>
				<cfif (NOT cfmaileError)>
					<span class="normalStatusBoldClass">Your Email was sent.</span><br>
				<cfelse>
					<span class="errorStatusBoldClass">Your Email was NOT sent due to errors.</span><br>
				</cfif>
			</cfif>
			<form action="#CGI.SCRIPT_NAME#" target="_self" enctype="application/x-www-form-urlencoded">
				Name:&nbsp;<input type="text" class="textClass" name="_name" id="_name" size="30" maxlength="50" value="#_name#" /><br>
				Email Address:&nbsp;<input type="text" class="textClass" name="_address" id="_address" size="30" maxlength="50" value="#_address#" /><br>
				<button id="btn_submit" class="buttonClass" onclick="handle_button_click(this); return true;">Submit</button>
			</form>
		<cfelse>
			<button id="btn_home_page" class="buttonClass" onclick="handle_button_click(this); return true;">Home Page</button>
			<cfif (page is "page1")>
				<br><br><b>Page 1</b>
				<hr width="80%" color="blue">
				#makeTable(RandRange(1, 10, Request.const_SHA1PRNG))#
			<cfelseif (page is "page2")>
				<br><br><b>Page 2</b>
				<hr width="80%" color="blue">
				#makeTable(RandRange(1, 10, Request.const_SHA1PRNG))#
			<cfelseif (page is "page3")>
				<br><br><b>Page 3</b>
				<hr width="80%" color="blue">
				#makeTable(RandRange(1, 10, Request.const_SHA1PRNG))#
			<cfelseif (page is "page4")>
				<br><br><b>Page 4</b>
				<hr width="80%" color="blue">
				#makeTable(RandRange(1, 10, Request.const_SHA1PRNG))#
			<cfelseif (page is "page5")>
				<br><br><b>Page 5</b>
				<hr width="80%" color="blue">
				#makeTable(RandRange(1, 10, Request.const_SHA1PRNG))#
			<cfelseif (page is "page6")>
				<br><br><b>Page 6</b>
				<hr width="80%" color="blue">
				#makeTable(RandRange(1, 10, Request.const_SHA1PRNG))#
			<cfelseif (page is "pageINFO")>
				<br><br>
				<p align="justify">This Final Project was architected using the latest state-of-the-art tricks and techniques I, Ray Horn, have learned over the past several years.</p>
				<p align="justify">The bulk of the JavaScript has been hidden and obfuscated to maintain the Intellectual Property Rights of the author.  SDA (Self-Decrypting Archive) techniques could have been used to better hide the JavaScript from those who may have wished to see the code however at this time there is enough code (approx 3000 lines) that has been obfuscated just enough so that it would take someone long enough to make the code just readable enough to be able to reuse it that the use of SDA would not be necessary.  In any case, it is not possible to "see" the contents of the Frames that were used so it is unlikely the casual site visitor won't be able to determine how the JavaScript was delivered or used.</p>
				<p align="justify">The only deviation from the assignment is the use of buttons with mouse-over effects rather than links but this was done because the Author doesn't much like links for menus because buttons look nicer. The Author doesn't much like plain buttons for menus because images work better however for this assignment the use of colors for the button events is a nice way to show-off that mouse events are being handled.</p>
				<p align="justify">Mouseover effects are handled using Abstract Event Handlers. Abstract Event Handlers are coded in such a way so as to cause the events to be handled in a consistent manner without the need to individually code each event handler.  Abstract Event Handlers allows a GUI Policy to be established so that all buttons that are coded in a specific manner are handled the same regardless of how many buttons are coded.  In fact the Abstract Event Handler code was coded in such a manner so as to allow any HTML object, not only buttons, to be handled without the need to write any additional code.  It would take very little effort, for the Author, to make it possible for differing sets of buttons to have differing sets of GUI Policies using the same Abstract Event Handlers that are seen working for this site.  At present however the Abstract Event Handlers only know how to process one type of coloration effects but the code is there that supports taking this code to the next level of evolution.</p>
				<p align="justify">Site visitors are not allowed to see the contents of the various Frames that are used.  You may assume the required FrameSets were used however since you are not able to see how they were formed they could have been formed using FrameSets, IFrames or Tables.  When you cannot tell how things are done you are left to assume the required technique was used.  The reason the various Frames have blocked the visitor's ability to view source was to protect the Intellectual Property Rights of the Author.</p>
				<p align="justify">This Final Project is best when viewed using IE 6.x but then everything is best when viewed with IE 6.x now isn't it ?</p>
				<p align="justify">Some features such as the way button mouseover events are handled won't appear to work when using Firefox or Mozilla, well that's life.  Like the site says, it is best when viewed using IE 6.x.</p>
			</cfif>
		</cfif>
	</div>
	</body>
	</html>
</cfoutput>
