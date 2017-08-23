/**
 * 
 */
$(document).on('click', '.grid-box-link', addLinkToMapEl).on('click', '#pop-addlink .pop-btn-confirm', setLinkToMapEl);

var resultat;
function returnId(asset_for_update){
	$.ajax({
		type: 'GET',
		url: "/getId/"+asset_for_update,
		dataType: 'json',
		async: false,
		success: function(result) {
			console.log(result);
			resultat=result;
			alert('success');
			},
			error: function(jqXHR, textStatus, errorThrown) {
				alert('error');
				}
			});
	console.log(resultat);
	
	return resultat;
	
}
//console.log(resultat);
// Lien vers l'ensemble carte d'élément***********update***
function setLinkToMapEl() {
	var addIndex = $('.grid-box._active').attr('id').split('-')[2];
	var id=returnId(addIndex);
	timeout:5000;
	console.log(id);
	if ($('#pop-addlink-input-asset').find(":selected").text() && $('#pop-addlink-input-desc').val()&& id!=null ) {		
		update(id);
		
	}
	else {
		alert('No input value');
		return false;
	}
	$('.grid-box._active').addClass('_added');
	$('.grid-box._active .grid-box-link').text('UPDATE ELEMENT');
	popClose();
}

function update(id_asset){ //fonction for update juste por les champs inputs
	$.ajax({
	    url: "/uploadFile",
	    type: "POST",
	    data: new FormData($("#submitForm")[0]),
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
	
	   var asset = $('#pop-addlink-input-asset').find(":selected").text();
	   var assetAssocie = $('#pop-addlink-input-parent').val();
	   var description = $('#pop-addlink-input-desc').val();
	   var siteid = $('#pop-addlink-input-siteid').val();
	   var json = { "assetf" : asset, "assetp" : assetAssocie};
	  
	   console.log(json);
	   $.ajax({
	        url:"/update/"+id_asset,
	        data:JSON.stringify(json),
	        type: "PUT",
	        beforeSend: function(xhr) {
	            xhr.setRequestHeader("Accept", "application/json");
	            xhr.setRequestHeader("Content-Type", "application/json");},
	        success: function(data) {
	        	console.log(data);
	          
	        }
	    }); 
	      
	    event.preventDefault();
	   
	
	
	
}