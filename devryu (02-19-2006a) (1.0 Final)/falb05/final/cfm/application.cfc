<cfcomponent>

	<cfinclude template="includes/cfinclude_explainError.cfm">
	<cfinclude template="includes/cfinclude_cflog.cfm">
	<cfinclude template="includes/cfinclude_cfdump.cfm">

	<cfscript>
		if (NOT IsDefined("This.name")) {
			aa = ListToArray(CGI.SCRIPT_NAME, '/');
			subName = aa[1];
			if (Len(subName) gt 0) {
				subName = '_' & subName;
			}

			myAppName = right(reReplace(CGI.SERVER_NAME & subName, "[^a-zA-Z]","_","all"), 64);
			myAppName = ArrayToList(ListToArray(myAppName, '_'), '_');
			This.name = UCASE(myAppName);
		}
		This.clientManagement = "Yes";
		This.sessionManagement = "Yes";
		This.sessionTimeout = "#CreateTimeSpan(0,1,0,0)#";
		This.applicationTimeout = "#CreateTimeSpan(1,0,0,0)#";
		This.clientStorage = "clientvars";
		This.loginStorage = "session";
		This.setClientCookies = "Yes";
		This.setDomainCookies = "No";
		This.scriptProtect = "All";
	</cfscript>
	
	<cffunction name="onError">
	   <cfargument name="Exception" required=true/>
	   <cfargument type="String" name="EventName" required=true/>

	   <cfscript>
			var errorExplanation = '';

			err_ajaxCode = false;
			err_ajaxCodeMsg = '';
			try {
				Request.commonCode = CreateObject("component", "cfc.ajaxCode");
			} catch(Any e) {
				Request.commonCode = -1;
				err_ajaxCode = true;
				err_ajaxCodeMsg = '(1) The ajaxCode component has NOT been created.';
				writeOutput('<font color="red"><b>#err_ajaxCodeMsg#</b></font><br>');
				writeOutput(explainErrorWithStack(e, false));
			}
			if (err_ajaxCode) {
				if (IsStruct(Request.commonCode)) Request.commonCode.cf_log(Application.applicationname, 'Error', '[#err_ajaxCodeMsg#]');
			}

			if (IsStruct(Request.commonCode)) errorExplanation = Request.commonCode.explainErrorWithStack(Exception, false);
			
			if ( (Len(Trim(EventName)) gt 0) AND (Len(Trim(errorExplanation)) gt 0) ) {
				if (IsStruct(Request.commonCode)) Request.commonCode.cf_log(Application.applicationname, 'Error', '[#EventName#] [#errorExplanation#]');
			}

			if (NOT ( (EventName IS "onSessionEnd") OR (EventName IS "onApplicationEnd") ) ) {
				writeOutput('<h2>An unexpected error occurred.</h2>');
				writeOutput('<p>Error Event: #EventName#</p>');
				writeOutput('<p>Error details:<br>');
				if (FindNoCase("DEEPSPACENINE", CGI.SERVER_NAME) gt 0) {
					if (IsStruct(Request.commonCode)) Request.commonCode.cf_dump(Exception, EventName, false);
					if (IsStruct(Request.commonCode)) writeOutput(Request.commonCode.explainErrorWithStack(Exception, true));
				} else {
					if (IsStruct(Request.commonCode)) writeOutput(Request.commonCode.explainErrorWithStack(Exception, true));
				}
			}
	   </cfscript>
	</cffunction>

	<cffunction name="onSessionStart">
	   <cfscript>
	      Session.started = now();
	      Session.shoppingCart = StructNew();
	      Session.shoppingCart.items =0;
	   </cfscript>
	      <cflock scope="Application" timeout="5" type="Exclusive">
	         <cfset Application.sessions = Application.sessions + 1>
	   </cflock>
		<cflog file="#Application.applicationName#" type="Information" text="Session #Session.sessionid# started. Active sessions: #Application.sessions#">
	</cffunction>

	<cffunction name="onSessionEnd">
		<cfargument name = "SessionScope" required=true/>
		<cfargument name = "AppScope" required=true/>
	
		<cfset var sessionLength = TimeFormat(Now() - SessionScope.started, "H:mm:ss")>
		<cflock name="AppLock" timeout="5" type="Exclusive">
			<cfif (NOT IsDefined("Arguments.AppScope.sessions"))>
				<cfset ApplicationScope.sessions = 0>
			</cfif>
			<cfset Arguments.AppScope.sessions = Arguments.AppScope.sessions - 1>
		</cflock>

		<cfscript>
			jsPath = ExpandPath('application.cfc');
			_jsName = Arguments.SessionScope.sessionid & '.dat';
			jsName = GetDirectoryFromPath(jsPath) & _jsName;
		</cfscript>
		
		<cfif (FileExists(jsName))>
			<cftry>
				<cffile action="DELETE" file="#jsName#">

				<cfcatch type="Any">
					<cflog file="#Arguments.AppScope.applicationName#" type="Information" text="Session #Arguments.SessionScope.sessionid# ended. Unable to delete file named '#jsName#' because: #cfcatch.message# and #cfcatch.detail#.">
				</cfcatch>
			</cftry>
		</cfif>
		
		<cflog file="#Arguments.AppScope.applicationName#" type="Information" text="Session #Arguments.SessionScope.sessionid# ended. Length: #sessionLength# Active sessions: #Arguments.AppScope.sessions#">
	</cffunction>

	<cffunction name="onApplicationStart" access="public">
		<cfif 0>
			<cftry>
				<!--- Test whether the DB is accessible by selecting some data. --->
				<cfquery name="testDB" dataSource="#Request.INTRANET_DS#">
					SELECT TOP 1 * FROM AvnUsers
				</cfquery>
				<!--- If we get a database error, report an error to the user, log the
				      error information, and do not start the application. --->
				<cfcatch type="database">
					<cfoutput>
						This application encountered an error<br>
						Unable to use the ColdFusion Data Source named "#Request.INTRANET_DS#"<br>
						Please contact support.
					</cfoutput>
					<cflog file="#This.Name#" type="error" text="#Request.INTRANET_DS# DSN is not available. message: #cfcatch.message# Detail: #cfcatch.detail# Native Error: #cfcatch.NativeErrorCode#" >
					<cfreturn False>
				</cfcatch>
			</cftry>
		</cfif>

		<cflog file="#This.Name#" type="Information" text="Application Started">
		<!--- You do not have to lock code in the onApplicationStart method that sets
		      Application scope variables. --->
		<cfscript>
			Application.sessions = 0;
		</cfscript>
		<cfreturn True>
	</cffunction>

	<cffunction name="onApplicationEnd" access="public">
		<cfargument name="ApplicationScope" required=true/>
		<cflog file="#This.Name#" type="Information" text="Application #Arguments.ApplicationScope.applicationname# Ended" >
	</cffunction>

	<cffunction name="onRequestStart" access="public">
		<cfargument name = "_targetPage" required=true/>

		<cfscript>
			var err_ajaxCode = false;
			var err_ajaxCodeMsg = '';
		</cfscript>

		<cfscript>
			Request.const_Cr = Chr(13);
			Request.const_Lf = Chr(10);
			Request.const_Tab = Chr(9);
			Request.const_CrLf = Request.const_Cr & Request.const_Lf;
			Request.parentKeyword = 'parent.';
			Request.cf_html_container_symbol = "html_container";
			Request.const_AJAX_loading_image = "images/loading.gif";
			Request.const_paper_color_light_yellow = '##FFFFBF';
			Request.const_color_light_blue = '##80FFFF';
			
			Request.cf_div_floating_debug_menu = 'div_floating_debug_menu';

			Request.const_SHA1PRNG = 'SHA1PRNG';
			Request.const_CFMX_COMPAT = 'CFMX_COMPAT';

			Request.const_encryption_method = 'BLOWFISH';
			Request.const_encryption_encoding = 'Hex';
			
			Request.const_js_gateway_time_out_symbol = 10; // allow user to take corrective action whenever the server doesn't respond in 10 secs...

			Request.AUTH_USER = 'admin';

			Randomize(Right('#GetTickCount()#', 9), 'SHA1PRNG');

			err_ajaxCode = false;
			err_ajaxCodeMsg = '';
			try {
			   Request.commonCode = CreateObject("component", "cfc.ajaxCode");
			} catch(Any e) {
				Request.commonCode = -1;
				err_ajaxCode = true;
				err_ajaxCodeMsg = '(1) The ajaxCode component has NOT been created.';
				writeOutput('<font color="red"><b>#err_ajaxCodeMsg#</b></font><br>');
			}
			if (err_ajaxCode) {
				if (IsStruct(Request.commonCode)) Request.commonCode.cf_log(Application.applicationname, 'Error', '[#err_ajaxCodeMsg#]');
			}

			// BEGIN: Notice when the URL Rewrite Engine is working and then force Apache to ignore rewriting by doing a redirect...
			sKeys = StructKeyList(URL, ",");
			Request.commonCode.cf_log(Application.applicationname, 'Information', '[' & CGI.SCRIPT_NAME & '?_parms=' & CGI.QUERY_STRING & ']' & 'sKeys = [#sKeys#]');
			if ( (StructCount(URL) eq 2) AND ( (sKeys eq "P,D") OR (sKeys eq "D,P") ) ) {
				if (IsStruct(Request.commonCode)) Request.commonCode.cf_location(CGI.SCRIPT_NAME & '?_parms=' & CGI.QUERY_STRING);
			}
			// END! Notice when the URL Rewrite Engine is working and then force Apache to ignore rewriting by doing a redirect...
		//	writeOutput('DEBUG: ' & 'StructCount(URL) = [#StructCount(URL)#] (#StructKeyList(URL, ",")#)' & ', CGI.QUERY_STRING = [#CGI.QUERY_STRING#]');
		</cfscript>

		<cfreturn (err_ajaxCode eq false)>
	</cffunction>

	<cffunction name="onRequestEnd" access="public">
		<cfargument name = "_targetPage" required=true/>
	</cffunction>
</cfcomponent>
