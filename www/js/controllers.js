angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope, $rootScope, $state, Chats, AjaxMethod, $cordovaBarcodeScanner, $ionicHistory) {
    $rootScope.goHome = function() {
        $state.go('home');
        $ionicHistory.removeBackView()
    };
    $scope.articles = Chats.all();
    $scope.redirect = function(urlRequest) {
        // $state.go(urlRequest.url, {siteId:urlRequest.siteId});
        // $scope.navigateTo({siteId:urlRequest.siteId, text:30061984});
        if(AjaxMethod.loadUrl(urlRequest.siteId, 30061984)) {
            $state.go('info');
        } else {
            alert('Invalid QR code');
        }
        /*$cordovaBarcodeScanner
            .scan()
            .then(function(barcodeData) {
                if(!barcodeData.cancelled) {                    
                    alert(barcodeData.format);
                    if(AjaxMethod.loadUrl(urlRequest.siteId, barcodeData.text)) {
                        $state.go('info');
                    } else {
                        alert('Invalid QR code');
                    }
                } else {
                    alert("Can't Scan the Code");
                }
            }, function(error) {
                alert("Can't Scan the Code");
            });*/      
    };
})

.controller('infoCtrl', function($scope, $ionicModal, $ionicLoading, $sce, AjaxMethod) {
    $scope.articles = {};

    $ionicModal.fromTemplateUrl('my-modal.html', {
        scope: $scope,
        animation: 'slide-in-up'
    }).then(function(modal) {
        $scope.modal = modal;
    });

    $scope.showLoader = function (opt) {
        if(opt) {
            $ionicLoading.show({
                template: 'Loading...'
            });
        } else {
            $ionicLoading.hide()
        }        
    }

    $scope.loadData = function () {
        $scope.showLoader(true);
        AjaxMethod.getMethod('', function (result) {
            if(result) {
                $scope.articles = {
                    story: result.body,
                    img: result.images,
                    cmts: result.comments,
                    author: result.author,
                    heading: result.headline
                }
                $scope.showLoader(false);
            } else {
                alert('Invalid QR_Code');
            }
        });
    };

    $scope.openModal = function(data) {
        $scope.dataType = '';
        if($scope.articles.hasOwnProperty(data)) {
            $scope.dataType = data;
            $scope.details = '';
            switch(data) {
                case 'story':
                    $scope.details = $sce.trustAsHtml($scope.articles[data]);
                break;
                case 'img':
                    if($scope.articles[data].length > 0) {
                        $scope.details = $scope.articles[data];
                    }
                break;
                case 'cmts':
                    if($scope.articles[data].length > 0) {
                        $scope.details = $scope.articles[data];
                    }
                break;
                default:
                break;
            }
            $scope.modal.show();
        } else {
            console.log('erroe');
        }
    };
    $scope.closeModal = function() {
        $scope.modal.hide();
    };
    // Cleanup the modal when we're done with it!
    $scope.$on('$destroy', function() {
        $scope.modal.remove();
    });
    // Execute action on hide modal
    $scope.$on('modal.hidden', function() {
    // Execute action
    });
    // Execute action on remove modal
    $scope.$on('modal.removed', function() {
    // Execute action
    });
});
