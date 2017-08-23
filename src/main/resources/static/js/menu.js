/**
 * 
 */
/***********************************************************************************************
 * 2) Menu déroulant
 ***********************************************************************************************/
var measure;

$(window).on('load', setMeasure); // Indique comment les appels de fonction
$(document).on('click', '.gnb-menu-sub li, #gnb-menu li', menuItemClick); // Cliquez sur les appels de fonction de menu
$(document).on('click', '.pop-btn-cancel, #dim', popClose).on('keydown', keyEvents); // Fermez le popup
//get of database
// Cliquez sur la fonction de menu
function menuItemClick() {
	
	switch ($(this).attr('id')) {
		case 'gnb-menu-local':
			popOpen($('#pop-local')); // Sortie pop-up Local File Upload
			break;
			
		case 'gnb-menu-url':
			popOpen($('#pop-url')); // Liens Web sortie image pop-up
			break;
			
		case 'gnb-menu-drag':
			$(this).addClass('_active').siblings('li');
			setMeasure(); //Indique comment les appels de fonction
			break;
			
		case 'gnb-menu-percent':
		case 'gnb-menu-pixel':
			if (!$(this).hasClass('_active')) {
				if (confirm('Changing the unit will clear all the map elements. Do you want to continue?')) {
					$(this).addClass('_active').siblings('li').removeClass('_active');
					rulerInit(); // Règle créer un appel de fonction
					resetMapElView(); // Les éléments cartographiques enlevés
				}
			}			
			break;
		
		case 'gnb-menu-clear':
			if (confirm('Do you want to delete all the map elements?')) resetMapElView(); // Les éléments cartographiques enlevés
			else return;
			break;
			
		case 'gnb-menu-generate':
			generateCode(); // Code de fonction génération appel
			break;
			
		case 'gnb-load':
			popOpen($('#pop-load')); // Aide sortie pop-up
			break;
		case 'gnb-retour':
			if (confirm('Do you want to return the  elements?'))retourner();
			else popOpen($('#pop-info')); // Aide sortie pop-up
			break;	
	}
}

// Indique comment la fonction
function setMeasure() {
	measure = ($('#gnb-menu-drag').hasClass('_active')) ? 'drag' : 'click';
}


//Ouvrez la fenêtre pop-up
function popOpen($popup) {
	$('#dim').show().css({ opacity: 0.5 }); // Affichage de l'écran Dim
	
	$popup.show().css({ top: $(window).height() / 2 - $popup.height() / 2, left: $(window).width() / 2 - $popup.width() / 2 });	
	$popup.find('input').eq(0).focus(); //La première entrée mise au point automatique
}

//Fermez le popup
function popClose() {
	$('#dim, .pop').hide();
	$('.pop-content').each(function() { $(this).find('input[type="text"], input[type="file"]').val(''); }); // entrée d'initialisation
	
	//$("#workspace-img-wrap").load('js/app.js  #workspace-img-wrap');
	/*$.getScript( "js/app.js" )
	  .done(function( script, textStatus ) {
	    console.log( textStatus );
	  });
	   $.getScript( "js/appAngularjs.js" )
	  .done(function( script, textStatus ) {
	    console.log( textStatus );
	  });*/
	/*location="index";
	$("#workspace-img-wrap").load(location + " #workspace-img-wrap");
	 window.opener.location.reload();
    window.close(); //Ne touche pas cette function
*/}
//Evénements Keystroke
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