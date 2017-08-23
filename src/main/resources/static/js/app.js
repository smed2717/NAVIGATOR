/*  */

//Déclarations de variables globales
var i, $img, imgWidth, imgHeight, unit;
var phase = 0; // Étapes de commande de grille (0: Point de départ 1: point final, 2: Modifier)
var cnt=0 ; //Les cartes peuvent opposer
var j=0;

var assetreturn;
var x,w,h,t,l;
var vname;//variable for last asset i inserted in database
//var coords =[];
/***********************************************************************************************
 * 1) Rulers
 ***********************************************************************************************/
$(window).on('load', rulerInit); // Règle créer un appel de fonction
//$(window).on('load',loadByAsset); 
//Fonction Règle de génération
function rulerInit() {
	$('#workspace-ruler > div > div > div').remove(); //Initialisation de la règle existante

	$img = $('#workspace-img-wrap');
	imgWidth = 1300	;
	imgHeight = 1000;
	
	$('#workspace-ruler').css({ width: imgWidth, height: imgHeight }); // Ajuster à la taille de l'image
	$('#gnb').css({ maxWidth: imgWidth + $('#workspace-ruler-y').width() }); // Barre de menus Indique la longueur maximale à la largeur de l'image
	
	if ($('#gnb-menu-percent').hasClass('_active')) {
		unit = '%'; // Unités: Pourcentage
		
		//Insérez la grille
		for (i=0;i<10;i++) {
			$('#workspace-ruler-x-1').append('<div class="workspace-ruler-x-1-el"></div>');	
			$('#workspace-ruler-x-2').append('<div class="workspace-ruler-x-2-el">'+i*10+'%</div>');
			$('#workspace-ruler-y-1').append('<div class="workspace-ruler-y-1-el"></div>');
			$('#workspace-ruler-y-2').append('<div class="workspace-ruler-y-2-el">'+i*10+'%</div>');
		}
		
		// Cochez les paramètres de taille
		$('.workspace-ruler-x-1-el').css({ width: imgWidth / 10 });
		$('.workspace-ruler-x-2-el').css({ width: imgWidth / 10, border: 0 });
		$('.workspace-ruler-y-1-el').css({ height: imgHeight / 10 });
		$('.workspace-ruler-y-2-el').css({ height: 1000 / 10, border: 0 });
	} else {
		unit = 'px'; //Pixels
		
		for (i=0;i<imgWidth/10;i++)
			$('#workspace-ruler-x-1').append('<div class="workspace-ruler-x-1-el"></div>');	
		for (i=0;i<imgWidth/50;i++)
			$('#workspace-ruler-x-2').append('<div class="workspace-ruler-x-2-el">'+i*50+'px</div>');
		for (i=0;i<imgHeight/10;i++)
			$('#workspace-ruler-y-1').append('<div class="workspace-ruler-y-1-el"></div>');	
		for (i=0;i<imgHeight/50;i++)
			$('#workspace-ruler-y-2').append('<div class="workspace-ruler-y-2-el">'+i*50+'px</div>');
	}
	init();
	//getLast();
	
}

var getLast = function(){
	var vname=null;
	 $.ajax({//load data from database
		   type: "GET",
	       url: "/getLast",
		  dataType: "json",
		  async: false,
		  success: function(data)          
		  {
           console.log(JSON.stringify(data));
		    id = data[0];              
		   vname = data[0][1];
		 
		   console.log(vname);
		  
		   
		  
		   }
	 
	 });
	
	
	 return vname ; 
	
}

function init (){
	var asset=getLast();
	ZOOM(asset);
	
}

function ZOOM(Index) {//get asset and send to data base for get url//fonction pour topologie
	if ($('.grid-box._active').length > 0) {
		var Index = $('.grid-box._active').attr('id').split('-')[2]; // Index parse ID
           console.log(Index);
		if (confirm('Do you really want to zoom this element?')) {
			//$img = $('#workspace-img-wrap');
		//$('#workspace-img').attr("src",'../img/' + data.files);
			$('.grid-box._added').remove();
			loadByAssetassocie(Index);
			LoadByAsset(Index);
			popClose();
		}
	}else{
		
		$('.grid-box._added').remove();
		loadByAssetassocie(Index);
		LoadByAsset(Index);
	}
}
function LoadByAsset(assetnumr){
	   //asset=1000;
	   $.ajax({//load data from database
		   type: "GET",
	       url: "/getImageAsset/"+assetnumr,
	       async: false,
		  dataType: "json"
	       ,success: function(data) {
		console.log(JSON.stringify(data));
		
	$('#workspace-img').attr("src","../img/"+data.files );
	 assetreturn = data.assetassocie;
	
	
		}
	});
	  
	   return assetreturn;
	  
   }
 
   
   
function loadByAssetassocie(assetnum){//get les element de la carte
		 
	      $.ajax({//load data from database
		   type: "GET",
		   async:true,
	       url: "/getAllAsset/"+assetnum,
		  dataType: "json"
	              }).then(function(data) {
		console.log(JSON.stringify(data));

		$.each(data, function (el, data) {
	
	$img.append('<div class="grid-box _added " id="grid-box-' + (data.asset) + '">'
			+'<span class="grid-box-cnt">' + (data.asset) + '</span>'
			+'<span class="grid-box-close">&times;</span>'
			+'<span class="grid-box-link">DETAILS</span>'
			+' <div class="container" id="toggleblock" style="display:none">'
			   +' <blockquote class="quote-box">'
			    +'  <p class="quotation-mark">'
			   + '  </p>'
			    +'  <p class="quote-text">'
			   + 'ASSETNUM :' + (data.asset)  
			   + '  </p>'
			    +'  <hr>'
			    +'  <div class="blog-post-actions">'
			    + '   <p class="blog-post-bottom pull-left">'
			    +' ASSETNUM-ASSOCIE :'+ (data.assetassocie)  
			    + ' </p>'
			    + ' <p class="blog-post-bottom pull-right">'
			    + ' <span class="badge quote-badge">DESCRIPTION :</span>' 
			    +' </p>'
			    + ' </div>'
			    +'</blockquote>'+'</div>');
	$('#grid-box-'+(data.asset) + '').mouseout(function(){
		$("#toggleblock").hide();
		});
	$('#grid-box-'+(data.asset) + '').mouseover(function(){
	   $("#toggleblock").show();
		});
		$('#grid-box-' + data.asset).css({ //les coordinates de chaque cartographique
		width:data.largeur,
		height:data.hauteur,
		top: data.topper,
		left: data.lefter	
	});
		j++;
		
		console.log(j);
		
		})
	});
}
 //function indique le retour vers l'élément parent
function retourner(){
	var assetderetour=assetreturn;
	 console.log(assetderetour);
	 if(assetderetour != null){
	 $('.grid-box._added').remove();
	
	loadByAssetassocie(assetderetour);
   	LoadByAsset(assetderetour);
   	}else { alert("this element has no parent");}
   	}

