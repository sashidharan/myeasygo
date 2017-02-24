angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope, $rootScope, $state, Chats, AjaxMethod, $ionicHistory) {
    /*$rootScope.goHome = function() {
        $state.go('home');
        $ionicHistory.clearHistory();
    };*/
    $scope.articles = Chats.all();
    $scope.redirect = function(urlRequest) {
    $state.go(urlRequest.url, {siteId:urlRequest.siteId});
    };
})

.controller('scanCtrl', function($scope, $state, $stateParams, AjaxMethod, $cordovaBarcodeScanner, $ionicLoading) {
    $scope.scanBarcode = function() {
        /*if(AjaxMethod.loadUrl($stateParams.siteId, 30061984)) {
            $state.go('info');
        } else {
            alert('Invalid QR code');
        }*/
        // AjaxMethod.loadUrl($stateParams.siteId, 30061984);
        // $state.go('info');
        $cordovaBarcodeScanner
            .scan()
            .then(function(barcodeData) {
                // alert(barcodeData.text+'---'+barcodeData.format+'----'+barcodeData.cancelled);
                if(AjaxMethod.loadUrl($stateParams.siteId, barcodeData.text)) {
                    $state.go('info');
                } else {
                    alert('Invalid QR code');
                }
                // console.log(barcodeData);
            }, function(error) {
                console.log('erroe->', error)
                // An error occurred
        });
        // NOTE: encoding not functioning yet
        /*$cordovaBarcodeScanner
            .encode(BarcodeScanner.Encode.TEXT_TYPE, "http://www.nytimes.com")
            .then(function(success) {
                // Success!
                console.log('encode---->',success)
            }, function(error) {
                // An error occurred
        });*/
    }
})

.controller('infoCtrl', function($scope, $ionicModal, $sce, AjaxMethod) {
    $scope.articles = {};

    $ionicModal.fromTemplateUrl('my-modal.html', {
        scope: $scope,
        animation: 'slide-in-up'
    }).then(function(modal) {
        $scope.modal = modal;
    });

    $scope.loadData = function () {
        AjaxMethod.getMethod('', function (result) {
            if(result) {
                $scope.articles = {
                    story: result.body,
                    img: result.images,
                    cmts: result.comments,
                    author: result.author,
                    heading: result.headline
                }                
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
