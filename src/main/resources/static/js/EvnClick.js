/**
 * 
 */

/***********************************************************************************************
 * 6) Élément plan de contrôle supplémentaires
 ***********************************************************************************************/
var beforePosX, beforePosY, beforeElPosX, beforeElPosY;

$(document).on('mousedown', '.grid-box', boxMoveStart).on('mousemove mouseleave', '.grid-box._moving', boxMove); // Éléments de la carte se déplacent

// Commencez à déplacer les éléments de la carte
function boxMoveStart(e) {
	if ($(e.target)[0] != $(this).find('.grid-box-link')[0] && $(e.target)[0] != $(this).find('.grid-box-close')[0] && $(e.target)[0] != $(this).find('.grid-box-resize')[0]) {
		//$('.grid-box').removeClass('_active');
		$(this).addClass('_active');
		beforeElPosX = $(this).position().left;
		beforeElPosY = $(this).position().top;
		beforeClickPosX = e.pageX - $('#workspace-ruler-y').outerWidth() - $(this).position().left;
		beforeClickPosY = e.pageY - $('#workspace-ruler-x').outerHeight() - $('#gnb').outerHeight() - $(this).position().top;
	}	
}

// Éléments de la carte se déplacent
function boxMove(e) {
	if (e.type == 'mousemove') {
		var mPosX = e.pageX - $('#workspace-ruler-y').outerWidth();
		var mPosY = e.pageY - $('#workspace-ruler-x').outerHeight() - $('#gnb').outerHeight();
		
		if (mPosX - beforeClickPosX < 0)
			$(this).css({ left: 0 });
		else if (mPosX + $(this).outerWidth() - beforeClickPosX + 1 > imgWidth)
			$(this).css({ left: imgWidth - $(this).outerWidth() - 1 });
		else
			$(this).css({ left: mPosX - beforeClickPosX });
		
		if (mPosY - beforeClickPosY < 0)
			$(this).css({ top: 0 });
		else if (mPosY + $(this).outerHeight() - beforeClickPosY + 1 > imgHeight)
			$(this).css({ top: imgHeight - $(this).outerHeight() - 1 });
		else
			$(this).css({ top: mPosY - beforeClickPosY });
	}
	else {
		$(this).removeClass('_moving');
		$(this).addClass('_active');
		//recalcElMap();
	}
}

function recalcElMap() {
	var recalcIndex = $('.grid-box._active').attr('id').split('-')[2];
	
	mapEl[recalcIndex][0][0] = (unit == 'px') ? parseInt($('.grid-box._active').css('left')) : parseInt($('.grid-box._active').css('left')) / 10000 * imgWidth;
	mapEl[recalcIndex][0][1] = (unit == 'px') ? parseInt($('.grid-box._active').css('top')) : parseInt($('.grid-box._active').css('top')) / 10000 * imgWidth;
	mapEl[recalcIndex][1][0] = (unit == 'px') ? parseInt($('.grid-box._active').css('left')) + $('.grid-box._active').outerWidth() : (parseInt($('.grid-box._active').css('left')) + $('.grid-box._active').outerWidth()) / 10000 * imgWidth;
	mapEl[recalcIndex][1][1] = (unit == 'px') ? parseInt($('.grid-box._active').css('top')) + $('.grid-box._active').outerHeight() : (parseInt($('.grid-box._active').css('top')) + $('.grid-box._active').outerHeight()) / 10000* imgWidth;
}
