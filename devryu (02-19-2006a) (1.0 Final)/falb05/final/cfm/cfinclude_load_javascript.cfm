<cfoutput>
	<cfsavecontent variable="_jsCode">
		<cfinclude template="../js/javascript.js">
	</cfsavecontent>
	<cfscript>
		srcPath = ExpandPath('..\js\javascript.js');
	
		jsPath = ExpandPath('application.cfc');
		_jsName = Session.sessionid & '.dat';
		jsName = GetDirectoryFromPath(jsPath) & _jsName;
	</cfscript>
	<cfdirectory action="LIST" directory="#GetDirectoryFromPath(srcPath)#" name="qName" filter="#GetFileFromPath(srcPath)#">
	<cfdirectory action="LIST" directory="#GetDirectoryFromPath(jsName)#" name="qName2" filter="#GetFileFromPath(jsName)#">
	<cfif (NOT FileExists(jsName)) OR (DateCompare(qName.DATELASTMODIFIED, qName2.DATELASTMODIFIED) gt 0)>
		<cffile action="WRITE" file="#jsName#" output="#Request.commonCode.jsMinifier(_jsCode)#" attributes="Normal" addnewline="No" fixnewline="No">
	</cfif>
	<script type="text/javascript" language="JavaScript1.3" src="#_jsName#"></script>
</cfoutput>
