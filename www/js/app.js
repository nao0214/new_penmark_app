var app = ons.bootstrap();

var items = [
  {name:"１つ目"},
  {name:"２つ目"},
  {name:"３つ目"}
];

app.controller('NaviCtrl', function() {
    //ブラウザ設定
    $(document).on('click', 'a', function(event){
        event.preventDefault();
        window.open(event.target.href,"_blank");
    });
});
app.controller('TabCtrl', function() {
  loginModal.show()
});

app.controller('NewsCtrl',function($scope, $http){
    $scope.items = items;
    $http({
        method: 'GET',
        url: 'https://news.penmark.jp/wp-json/wp/v2/posts?_embed&tags=40'
    }).then(function (response){
        $scope.pickupPost = response.data;
    },function (error){
        alert("カテゴリー情報の取得に失敗しました。");
    });

    $http({
        method: 'GET',
        url: 'https://news.penmark.jp/wp-json/wp/v2/posts?_embed'
    }).then(function (response){
        $scope.newPost = response.data;
    },function (error){
        alert("記事情報の取得に失敗しました。");
    });

    $scope.onClick = function (e) {
        articleId = $(e.currentTarget).data("id");//記事のidをグローバル変数に
        myNavigator.pushPage('page/news/news-detail.html');
    };
});
app.controller('NewsDetailCtrl',function($scope, $http){
    $http({
        method: 'GET',
        url: "https://news.penmark.jp/wp-json/wp/v2/posts/"+articleId+"/?_embed"
    }).then(function (response){
        //var thumbnail = 
        var content = response.data.content.rendered;
        var thumbUrl = response.data['_embedded']['wp:featuredmedia'][0]['media_details']['sizes']['full']['source_url'];
        var thumbnail = "<img style='width:100%;' src='"+thumbUrl+"'>";
        var post = thumbnail + content;
        document.querySelector(".content").innerHTML = post;
    },function (error){
        alert("情報の取得に失敗しました。");
    });
});