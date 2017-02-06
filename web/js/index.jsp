<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
  <head>
    <base href="<%=basePath%>">
    
    <title>a</title>
    <script type="text/javascript">
    
    	function init(){
    		try{
				return new XMLHttpRequest();
			}catch(e){
				try{
					return new ActiveXObject("Msxml2.XMLHTTP");
				}catch(e){
					try{
						return new ActiveXObject("Microsoft.XMLHTTP");
					}catch(e){
						var h = document.getElementById("text");
						h.innerHTML = "草";
						throw e;
					}
				}
			}
    	}
    	
		window.onload = function(){
			
			var btn = document.getElementById("btn");
			btn.onclick = function(){
				
				var xmlhttp = init();
				
				xmlhttp.open("GET","<c:url value='/servlet/testAjax' />",true);
				
				xmlhttp.send(null);			
			
				xmlhttp.onreadystatechange = function(){
				
					if(xmlhttp.readyState == 4 && xmlhttp.status == 200){
						var text = xmlhttp.responseText;
						
						var h1 = document.getElementById("text");
						
						h1.innerHTML = text;
					}
				
				};
			};
		};    
    </script>
  </head>


  <body>

	<button id="btn">点击</button>
	<h1 id="text"></h1>


  </body>
</html>
