<!DOCTYPE html>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<title>MAXIMO NAVIGATOR</title>
<link rel="stylesheet" href="css/style.css">
<link rel="stylesheet" href="css/bootstrap.css">
 <link href="css/css/bootstrap.css" rel="stylesheet" type="text/css">
  <link href="css/font-awesome.css" rel="stylesheet" type="text/css">
<script src="module/jquery-1.12.4.min.js"></script>
<script src="module/screenfull.js"></script>
<script src="module/angular.min.js"></script>
<script src="js/menu.js"></script>
<script src="js/image.js"></script>
<script src="js/crud.js"></script>
<script src="js/EvnClick.js"></script>
<script src="js/app.js"></script>
<script src="js/update.js"></script>
<script src="js/appAngularjs.js"></script>
<script type="text/javascript" >

//var $ = jQuery;
		$(function () {
			$('#supported').text('Supported/allowed: ' + !!screenfull.enabled);

			if (!screenfull.enabled) {
				return false;
			}

			

			$('#toggle').click(function () {
				screenfull.toggle($('#container')[0]);
			});	
		});
		
</script>
</head>
<body ng-app="MyApp" ng-controller="MyController"  >

 
<!-- Dim l'écran-->
<div id="dim"></div>

<div class="pop" id="pop-local">
	<p class="pop-title">LOAD LOCAL IMAGE</p>
	<div  class="pop-content">
		  <form id="localeForm">
		  <label>IMAGErrrr<input type="file" id="pop-local-input" name="uploadfile" ></label>
		 <label for="repeatSelect">ASSET</label>
		 <select id="pop-url-input" name="repeatSelect"  ng-model="option"  ng-options="option as option.ASSETNUM for option in data.availableOptions">
      <option  ng-value="{{option.ASSETNUM}}"></option>
    </select></form>
	</div>
	<div class="pop-btn">
		<div class="pop-btn-confirm">LOAD</div>
		<div class="pop-btn-cancel">CANCEL</div>
	</div>
</div>

<div class="pop" id="pop-load">
	<p class="pop-title">ASSETNUM</p>
	<div class="pop-content">
		<label for="repeatSelect">ASSET</label>
		 <select id="pop-addlink-input-asset" name="repeatSelect"  ng-model="option"  ng-options="option as option.ASSETNUM for option in data.availableOptions">
      <option  ng-value="{{option.ASSETNUM}}"></option>
    </select>
	</div>
	<div class="pop-btn">
		<button  onclick="LOAD();" >VIEW</button>
		
	</div>	
</div>
<div class="pop" id="pop-addlink">
	<p class="pop-title">ADD DATA</p>
	<div class="pop-content">
	       
		<form id="submitForm"   >
		   <label for="upload-file-input">Upload your file:</label>
           <input id="upload-file-input" type="file" name="uploadfile" accept="*" required />
           <br />
           <span id="upload-file-message"></span>
		   <label for="repeatSelect">ASSET</label>
		   <select id="pop-addlink-input-asset" name="repeatSelect"  ng-model="option"  ng-options="option as option.ASSETNUM for option in data.availableOptions">
              <option  ng-value="{{option.ASSETNUM}}"></option>
           </select>
	       <label>ASSETASSOCIE<input  type="text" id="pop-addlink-input-parent" disabled  ng-value="{{option.PARENT}}" ></label>
		   <label>DESCRIPTION<input type="text" id="pop-addlink-input-desc" disabled  value="{{option.DESCRIPTION}}" ></label>
	       <label>SITEID<input type="text" id="pop-addlink-input-siteid" disabled  value="{{option.SITEID}}" ></label>
		<input type="submit" value="Create"  onclick="uploadData();"/>
		<input type="submit" value="update"  onclick="setLinkToMapEl();"/>
		<button  onclick="ZOOM()" >VIEW</button>
		</form>
	
 
	</div>
	<div class="pop-btn" >
		<!--  <div class="pop-btn-confirm">ADD</div>
		<div class="pop-btn-cancel">CANCEL</div>-->
		
		
	</div>
</div>

<!-- Header -->
<div id="gnb">
	<a id="gnb-title" href="#" >&#8635; REFRESH</a>
	
	<!-- Menu déroulant -->
	<ul id="gnb-menu">
	    <li id="gnb-menu-drag" class="_active" style="display: none;">DRAG<em>&nbsp;&#10003;</em></li>
		<li id="gnb-menu-source">
			<span>SOURCE &#9662;</span>
			<ul class="gnb-menu-sub">
				<li id="gnb-menu-local">LOCAL</li>
				
			</ul>
		</li>
		<li id="gnb-retour">RETURN</li>
		<li id="gnb-load">LOAD</li>
		<li class="">
			    <div class="full-screen">
				    <section class="full-top">
					<button id="toggle"><i class="fa fa-arrows-alt" aria-hidden="true"></i></button>	
				    </section>
			    </div>
			</li>
	</ul>
</div>

<!-- Workspaces -->
<div id="workspace" style="height:1000px;">
	<!-- Rulers -->
	<div id="workspace-ruler">
		<div id="workspace-ruler-x">
			<div id="workspace-ruler-x-2"></div>
			<div id="workspace-ruler-x-1"></div>
		</div>
		<div id="workspace-ruler-y">
			<div id="workspace-ruler-y-2"></div>
			<div id="workspace-ruler-y-1"></div>
		</div>
	</div>
	
	<!--  Images -->
	<div id="workspace-img-wrap">
		<img  id="workspace-img"  style="min-width:1250px; " > <!-- min-height:1000px; -->
		
		<!-- grille -->
		<div id="grid-x1" class="grid-1"></div>
		<div id="grid-y1" class="grid-1"></div>
		<div id="grid-x2" class="grid-2"></div>
		<div id="grid-y2" class="grid-2"></div>
		<span id="grid-coords"></span>
		
			</div>
	
</div>

</body>
</html>