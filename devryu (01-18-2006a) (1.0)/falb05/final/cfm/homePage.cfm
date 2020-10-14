<cfsetting showdebugoutput="no">
<cfoutput>
	<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
	<head>
	#Request.commonCode.html_nocache()#
	<meta http-equiv="Content-Type" content="text/html; charset=iso-8859-1" />
	<title>Home Page</title>
	<link rel="stylesheet" href="../StyleSheet.css" type="text/css" />
	<cfinclude template="cfinclude_load_javascript.cfm">
	
	<script language="JavaScript1.3" type="text/javascript">
		function switchContentPages(p) {
			if (!!p) {
				cObj = getGUIObjectInstanceById('contentPage');
				if (!!cObj) {
					cObj.src = p;
				}
			}
		}
	</script>
	</head>
	
	<body>
	<table width="100%" align="center" cellpadding="-1" cellspacing="-1">
	<tr valign="top">
	<td width="10" align="center" valign="top">
		&nbsp;
	</td>
	<td width="100" align="center" valign="top">
		<iframe src="menuPage.cfm?nocache=" name="menu0" width="100%" height="600" marginwidth="-1" marginheight="-1" scrolling="auto" frameborder="0"></iframe>
	</td>
	<td width="*" align="center" valign="top">
		<iframe src="contentPage0.cfm" id="contentPage" name="contentPage" width="100%" height="600" marginwidth="-1" marginheight="-1" scrolling="auto" frameborder="0"></iframe>
	</td>
	</tr>
	</table>
	</body>
	</html>
</cfoutput>
