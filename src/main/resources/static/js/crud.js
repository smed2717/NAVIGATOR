/**
 * 
 */
/***********************************************************************************************
 * 4)grille/insetion/delete/update
 ***********************************************************************************************/
var  $activeGridX, $activeGridY,measure,posX, posY;


// Grille coordonnées déclaration de tableau
var pointStart = new Array();
var pointEnd = new Array();
var mapEl = new Array(); // Chaque objet stocke un tableau de coordonnées en trois dimensions

$(document).on('mousemove', '#workspace-img-wrap', drawGrid).on('mousedown mouseup', '#workspace-img-wrap', setGrid).on('mouseleave', '#workspace-img-wrap', resetGrid);
$(document).on('mouseenter mouseleave', '.grid-box', overMapElView).on('mouseup', '.grid-box', clickMapElView).on('click', '.grid-box-close', removeMapElView);


$(document).on('mousedown', '#workspace-ruler', function() { return false; })

// Grille fonction de contrôle de position
function drawGrid(e) {
	if (phase == 1) $img.addClass('_phase1');
	else $img.removeClass('_phase1');
	
	// Étape par étape de la grille de commande de sélection
	$activeGridX = (phase == 0) ? $('#grid-x1') : $('#grid-x2');
	$activeGridY = (phase == 0) ? $('#grid-y1') : $('#grid-y2');

	// Grille de contrôle de position
	$activeGridX.css({ top: e.pageY - $('#gnb').height() - $('#workspace-ruler-x').height() - 1 });
	$activeGridY.css({ left: e.pageX - $('#workspace-ruler-y').width() - 1 });
	
	// Système de coordonnées de sortie de commande de position
	$('#grid-coords').css({
		top: (e.pageY < $('#gnb').height() + $('#workspace-ruler-x').height() + imgHeight - $('#grid-coords').outerHeight() - 5 ) ? e.pageY - $('#gnb').height() - $('#workspace-ruler-x').height() + 5 : e.pageY - $('#gnb').height() - $('#workspace-ruler-x').height() - $('#grid-coords').outerHeight() - 6,
		left: (e.pageX < $('#workspace-ruler-y').width() + imgWidth - $('#grid-coords').outerWidth() - 5) ? e.pageX - $('#workspace-ruler-y').width() + 5 : e.pageX - $('#workspace-ruler-y').width() - $('#grid-coords').outerWidth() - 6
	});
		
	// positions stockées
	posX = (unit == 'px') ? $activeGridY.position().left + 1 : (($activeGridY.position().left) / (imgWidth - 2) * 100).toFixed(2);
	posY = (unit == 'px') ? $activeGridX.position().top + 1 : (($activeGridX.position().top) / (imgHeight - 2) * 100).toFixed(2);

	$('#grid-coords').text(posX + unit + ', ' + posY + unit); // sortie Position
}

// grille fixe
function setGrid(e) {
	if (!$img.hasClass('_overmap')) {
		$('.grid-box').removeClass('_active');
		
		if (measure == 'drag') {
			if (e.type == 'mousedown') setGridPoint(pointStart);
			else if (phase == 0) return false;
			else setGridPoint(pointEnd);
		} else {
			if (e.type == 'mouseup') {
				if (phase == 0) setGridPoint(pointStart);
				else setGridPoint(pointEnd);
			} else return;
		}
		
		var limX = (unit == 'px') ? Math.abs(pointStart[0] - pointEnd[0]) : Math.abs(pixelize(pointStart[0], 'x') - pixelize(pointEnd[0], 'x'));
		var limY = (unit == 'px') ? Math.abs(pointStart[1] - pointEnd[1]) : Math.abs(pixelize(pointStart[1], 'y') - pixelize(pointEnd[1], 'y'));
		
		if (limX < 20 || limY < 20) return false; // Elément horizontal ou vertical interdit généré lorsque la carte est inférieure à 20px
		
		if (phase == 0 ) {
			
			cnt++;
			mapEl.push([pointStart.slice(0), pointEnd.slice(0)]); // Baie de stockage en trois dimensions (Call by value)
           
			addMapElView(cnt - 1);
		}
		
		event.preventDefault();
	} else return;
}

function pixelize(val, axis) {
	var valOut = (axis == 'x') ? imgWidth * val / 100 : imgHeight * val / 100;
	return valOut;
	//console.log(valOut);
}

// Enregistrer les coordonnées du point de grille
function setGridPoint(point) {
	point[0] = posX; // Enregistrer l'axe X valeur de coordonnées
	point[1] = posY; // Save the axe Y valeurs de coordonnées
	
	phase = (phase == 0) ? 1 : 0; // Étape toggle
}

// L'initialisation du vue
function resetGrid() {
	phase = 0;
	$img.removeClass('_phase1');
	$('#grid-x1').css({ top: posY - 1 });
	$('#grid-y1').css({ left: posX - 1 });
}


// Ajouter des éléments cartographiques
function addMapElView(index) {
   //if(index >=j ){
	$img.append('<div class="grid-box _active" id="grid-box-' + index + '"><span class="grid-box-cnt">' + (index + 1) + '</span><span class="grid-box-close">&times;</span><span class="grid-box-link">ADD</span></div>');
	
	$('#grid-box-' + index).css({ //les coordinates de chaque cartographique
		width: (unit == 'px') ? Math.abs(mapEl[index][1][0] - mapEl[index][0][0]) : Math.abs(mapEl[index][1][0] - mapEl[index][0][0]) / 100 * imgWidth,
		height: (unit == 'px') ? Math.abs(mapEl[index][1][1] - mapEl[index][0][1]) : Math.abs(mapEl[index][1][1] - mapEl[index][0][1]) / 100 * imgHeight,
		top: (unit == 'px') ? Math.min(mapEl[index][0][1], mapEl[index][1][1]) : Math.min(mapEl[index][0][1], mapEl[j][1][1]) / 100 * imgHeight,
		left: (unit == 'px') ? Math.min(mapEl[index][0][0], mapEl[index][1][0]) : Math.min(mapEl[index][0][0], mapEl[index][1][0]) / 100 * imgWidth
	
	
	});
	
 
	//popOpen($('#pop-addlink'));
	//if ($('#grid-box-' + index).width() < 50 || $('#grid-box-' + index).height() < 50) $('#grid-box-' + index).addClass('_errorhash');
	
      /* if (mapEl[index][2]) {
		$('#grid-box-' + index).addClass('_active');
		$('#grid-box-' + index).find('.grid-box-link').text('CHANGE LINK');
	}*/
	
}


/**
 * Upload the file sending it via Ajax.*****************
 */
$(document).ready(function() {
	  $("#upload-file-input").on("change", uploadFile);
	});

function uploadFile() {
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
} // function uploadFile

		   
function uploadData() {//upload data
		
		$img = $('#workspace-img-wrap');
		imgWidth = $img.width() + 1;
		imgHeight = $img.height() + 1;
		var imgsrc = ($('#workspace-img').attr('src').slice(0, 4) == 'blob') ? '<em>filepath</em>' : $('#workspace-img').attr('src'); // image Source
        console.log(imgsrc);

		for (i=0;i<cnt;i++) {
			// A Type de Tag et les coordonnées de taille
			var top = (unit == 'px') ? $('#grid-box-' + i).position().top + 1 : ($('#grid-box-' + i).position().top / (imgHeight - 2) * 100).toFixed(2);
			var left = (unit == 'px') ? $('#grid-box-' + i).position().left + 1 : ($('#grid-box-' + i).position().left / (imgWidth - 2) * 100).toFixed(2);
			var width = (unit == 'px') ? $('#grid-box-' + i).width() : ($('#grid-box-' + i).width() / imgWidth * 100).toFixed(2);
			var height = (unit == 'px') ? $('#grid-box-' + i).height() : ($('#grid-box-' + i).height() / imgHeight * 100).toFixed(2);
		}
		   var asset = $('#pop-addlink-input-asset').find(":selected").text();
		   var assetAssocie = $('#pop-addlink-input-parent').val();
		   var description = $('#pop-addlink-input-desc').val();
		   var siteid = $('#pop-addlink-input-siteid').val();
		   console.log(assetAssocie,description,siteid);
		   var json = { "asset" : asset, "assetAssocie" : assetAssocie, "lefter": left,"topper":top,"largeur":width,"hauteur":height};
		  
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
		      
		    event.preventDefault();
		    popClose(); 
}
		    

// Passez la souris sur les éléments de la carte
function overMapElView(e) {
	if (e.type == 'mouseenter' && phase == 0) $img.addClass('_overmap');
	else $img.removeClass('_overmap');
}

//Cliquez éléments cartographiques
function clickMapElView() {
	if ($(this).hasClass('_moving')) {
		$('.grid-box').removeClass('_active');
		$(this).removeClass('_moving');
		$(this).addClass('_active');
		//recalcElMap();
		//console.log(coords);
	}
}
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

// Réinitialiser la carte des éléments
function resetMapElView() {
	$img.removeClass('_overmap');
	$('.grid-box').remove();
	cnt = 0;
	mapEl = [];
}
//load details
/*function CHARGE() {
	popOpen($('#pop-addlink-details'));
	
	if ($('.grid-box._added')) {
		$('#pop-addlink .pop-title').text('ZOOM');
		
	} else {
		$('#pop-addlink .pop-title').text('ADD URL LINK');
		$('#pop-addlink .pop-btn-confirm').text('ADD');
		$('input[name="pop-addlink-target"]').eq(0).prop('checked', true);
	}
		
	return false;
}*/
//D'autres éléments carte lien
function addLinkToMapEl() {
	popOpen($('#pop-addlink'));
	
	
	if ($('.grid-box._active').hasClass('_added')) {
		/*var targetIndex = $('.grid-box._active').attr('id').split('-')[2];
		var urlink = mapEl[targetIndex][2];
		var target = mapEl[targetIndex][3];*/
		$('#pop-addlink .pop-title').text('VIEW DETAILS');
		$('#pop-addlink .pop-btn-confirm').text('UPDATE');
	/*	$('#pop-addlink-input').val(urlink);
		$('input[name="pop-addlink-target"][value="'+ target +'"]').prop('checked', true);*/
	} else {
		$('#pop-addlink .pop-title').text('ADD DATA');
		$('#pop-addlink .pop-btn-confirm').text('ADD');
		//$('input[name="pop-addlink-target"]').eq(0).prop('checked', true);
	}
		
	return false;
}

// Evénements Keystroke
function keyEvents(e) {
	switch (e.keyCode) {
		case 27: // ESC 
			if ($('#dim').css('display') == 'block') popClose(); // Fermez le popup
			else if (phase == 1) resetGrid(); // L'initialisation du réseau de courant
			break;
		case 46: // DEL 
			removeMapElView();
			break;
	}
}
