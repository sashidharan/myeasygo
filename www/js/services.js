angular.module('starter.services', [])

.factory('Chats', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var chats = [{
    id: 0,
    name: 'Bristol',
    url: 'scan',
    style: 'bristol',
    siteId: 276268,
    img: 'img/bristol.png'
  }, {
    id: 1,
    name: 'Notting Ham',
    url: 'info',
    style: 'hulldaily',
    siteId: 568577,
    img: 'img/nottingham.png'
  }, {
    id: 2,
    name: 'Hull Daily Mail',
    url: 'info',
    style: 'nottingham',
    siteId: 568577,
    img: 'img/hulldaily.png'
  }];

  return {
    all: function() {
      return chats;
    }
  };
})
.factory('AjaxMethod',  ['$http', function($http) {
    var urlBase = 'https://api.localworld.co.uk/articles/%SITE_ID%/detail/%ARTICLE_ID%';
    return {
        genUrl: '',
        callmethod:function(){
            alert('haide');
        },
        loadUrl: function (siteId, articleId) {
            this.genUrl = urlBase.replace(/%SITE_ID%/g, siteId);
            this.genUrl = this.genUrl.replace(/%ARTICLE_ID%/g, articleId);
            return true;
        },
        getMethod:function (url, callback) {
            console.log(this.genUrl);
            try {
                $http.get(this.genUrl)
                /*.then(function (response) {
                    console.log('response--->', response)
                    return response;
                });*/
                .success(function (response) {
                    callback(response);
                    return response;
                })
                .error(function(err) {
                    callback(err);
                    console.log(err);
                });
            } catch(e) {
                console.log(e);
            }
        },
        postMethod:function (parameter) {
            try {
                $http.post(urlBase, parameter)
                .success(function (response) {
                    return response;
                })
                .error(function(err) {
                    console.log(err);
                });
            } catch(e) {
                console.log(e);
            }
        }
    };
}]);
