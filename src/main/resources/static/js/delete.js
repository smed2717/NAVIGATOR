/**
 * phase of delete 
 */
$(document).on('mouseenter mouseleave', '.grid-box', overMapElView).on('mouseup', '.grid-box', clickMapElView).on('click', '.grid-box-close', removeMapElView);

//verification avant suppression
function check(index){
	var bool = false; 
    $.ajax({
    async: false,
    type: "GET",
    url: "/checkAsset/"+index,
   // contentType: "application/json; charset=utf-8",
    dataType: "json",
    success: function (data) {
    	console.log(data);
        if (data == true) {
            bool = false;
            console.log(data);
        }
        else {
            bool = true;
        }
    },
    error: function (data) {
        bool = true;
    },
    timeout: 2000
   
  });
    event.preventDefault();
   return bool;
	
}
// Les éléments cartographiques enlevés
function removeMapElView() {
	if ($('.grid-box._active._added').length > 0) {
		var delIndex = $('.grid-box._active').attr('id').split('-')[2]; // Index parse ID
           console.log(delIndex);
           var response = check(delIndex);
		if (confirm('Do you really want to delete this element?')) {
			
			 if(response == false){
			$('.grid-box._active').remove();
			$img.removeClass('_overmap');
			cnt--;
			mapEl.splice(delIndex, 1); // Que les noeuds d'index retirés du tableau
			//$('.grid-box').remove();
			deleteAsset(delIndex);
			for (i=0;i<cnt;i++) {
				addMapElView(i); // reconstruction de la commande
			}
			}else { alert ("error");}
		}
	}else{
		var delIndex = $('.grid-box._active').attr('id').split('-')[2]; // 

		if (confirm('Do you really want to delete this element?')) {
			$('.grid-box._active').remove();
		    $img.removeClass('_overmap');
			cnt--;
			mapEl.splice(delIndex, 1); //
			//$('.grid-box').remove();
			
			for (i=0;i<cnt;i++) {
				addMapElView(i); // 
			}
		}
		
	}
}
//delete from database
function deleteAsset(indexAsset){
	$.ajax({
		type: 'DELETE',
		url: "/delete/"+indexAsset,
		dataType: 'json',
		async: true,
		success: function(result) {
			alert('At ' + result.time
					+ ': ' + result.message);
			},
			error: function(jqXHR, textStatus, errorThrown) {
				alert(jqXHR.status + ' ' + jqXHR.responseText);
				}
			});
	}
