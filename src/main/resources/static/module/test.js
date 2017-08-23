/**
 * 
 */
(function() {
        var app = angular.module('ngImgDemo', ['ngImgMap']);

        app.controller('DemoCtrl', function($scope) {

            // ================= Vous devez configurer =================

            // Les données les plus élémentaires dans le format suivant, la description de la propriété personnalisée
            $scope.img = {
                "pic_url": "../img/test.jpg",
                "maps": [
                    {"coords":[0,
        96,
        68,
        123], "description": "I am batman", "link_url": "#"},
                    {"coords":[296,
        77,
        358,
        155], "description": "I am superman", "link_url": "https://www.baidu.com/s?ie=utf-8&fr=bks0000&wd=SUPERMAN"}
                ]
            };



            // ================= Vous devez configurer =================

            // Jeu de configuration
            $scope.mapFns = {
                // Obtenez taille de la canvas
                getCanSize: function() {
                    return [950, 1000];
                },
                // Obtenez taille de l'image
                getImgSize: function(img) {
                    return _getImgSize(img.pic_url) || [550, 500];
                }
            };

            // Obtenez largeur et hauteur de l'image
            function _getImgSize(url) {
                var reg = new RegExp('(\\d+)x(\\d+)\.');
                result = reg.exec(url);
                if (result && result.length > 1) {
                    return result.slice(1);
                } else {
                    return false;
                }
            }

            // Ajouter area
            $scope.addArea = function(img) {
                if (!img || !img.maps || !angular.isArray(img.maps)) {
                    img = angular.isObject(img) ? img : {};
                    img.maps = [];
                };
                var calculation = img.getCalculation(),
                    lastImg = img.maps.slice(-1)[0],
                    lastImgLeft = lastImg ? lastImg.coords[0] : 0,
                    lastImgTop = lastImg ? lastImg.coords[1] : 0,
                    newImgCoords = [lastImgLeft + 30, lastImgTop + 30, lastImgLeft + 100, lastImgTop + 100];

                if (calculation) {
                    img.maps.push({coords: calculation.checkCoords(newImgCoords) });
                } else {
                    img.maps.push({coords: newImgCoords });
                }
            };

            // =================== optimisation ===================

            // Lorsque vous modifiez le lien, activer la sélection correspondante
            $scope.catchArea = function(area){area.isDraging = true;};

            // Laissant le lien modifier, désactiver la circonscription correspondante
            $scope.releaseArea = function(area){
                if (area.hasOwnProperty('isDraging')) {
                    delete area.isDraging
                };
            };

            // ================== imgJson ===================
            $scope.$watch('img', function(nVal, oVal){
                $scope.imgJson = angular.toJson(nVal, true);
            }, true);

        });

    })();