/**
 * 
 */

/***********************************************************************************************
 * 3) Importation d'images
 ***********************************************************************************************/

var  filepath;

$(document).on('click', '#pop-local .pop-btn-confirm, #pop-url .pop-btn-confirm', loadImgSrc); //Fonction de la charge de la source d'image
$(document).on('change', '#pop-local-input', parsePath); // Local image Passe fonction d'analyse d'appel
//fonction d'insertion image au dossier "onchange"
$(document).ready(function() {
	  $("#pop-local-input").on("change", uploadLocaleFile);
	  //console.log();
	});
function uploadLocaleFile() {
	  $.ajax({
	    url: "/uploadFile",
	    type: "POST",
	    data: new FormData($("#localeForm")[0]),
	    enctype: 'multipart/form-data',
	    processData: false,
	    contentType: false,
	    cache: false,
	    success: function () {
	      // Handle upload success
	      $("#upload-file-message").text("File succesfully uploaded");
	    },
	    error: function () {
	      // Handle upload error
	      $("#upload-file-message").text(
	          "File not uploaded (perhaps it's too much big)");
	    }
	  });
}
function InitialInsertion(){
	
	var asset = $('#pop-url-input').find(":selected").text();
	console.log(asset)
	  // var assetAssocie = $('#pop-addlink-input-desc').val();
	   var json = { "asset" : asset};
	  
	   console.log(json);
	   $.ajax({
	        url:"/save",
	        data:JSON.stringify(json),
	        type: "POST",
	        beforeSend: function(xhr) {
	            xhr.setRequestHeader("Accept", "application/json");
	            xhr.setRequestHeader("Content-Type", "application/json");},
	        success: function(data) {
	        	console.log(data);
	          
	        }
	    }); 
	
	
};
// Fonction de la charge de la source d'image
function loadImgSrc() {
	// Vérification de la valeur d'entrée
	if ($(this).parents('.pop').find('input').val()) {
		$('#workspace-img').remove(); // Suppression d'images
		InitialInsertion();
		if ($(this).parents('.pop').attr('id') == 'pop-local')
		{	$img.prepend('<img src="' + filepath + '" id="workspace-img">');
			init();
			console.log(filepath);}
		else
			$img.prepend('<img src="' + $('#pop-url-input').val() + '" id="workspace-img">');
	} else {
		alert('No input value');
		return false;
	}
	
	popClose();
	resetMapElView();
	$('#workspace-img').on('load', rulerInit); // Après avoir chargé les dirigeants d'image réinitialisés
}
//load asset
function LOAD(){
	
	 var asset = $('#pop-addlink-input-asset').find(":selected").text();
	ZOOM(asset);
	popClose();
	
}
// Passe locale image fonction d'analyse
function parsePath(e) {
	var URL = window.webkitURL || window.URL;
	console.log(URL);
    filepath = URL.createObjectURL(e.target.files[0]);
    console.log(filepath);
}
