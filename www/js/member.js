// APIキーの設定とSDK初期化
var appKey    = "ac239658c2abc8cefb210157a247f845e8da1edb1d70853b17b336740feea5b6";
var clientKey = "3a6cb6e1dae538fb1f3f0108aeda869fa48b8030c12f549a9a4ff24b40a5c165";
var ncmb = new NCMB(appKey, clientKey);

// ログイン中の会員
var currentLoginUser;

/********** メールアドレス / PW 認証 **********/
// 「登録する」ボタン押下時の処理
function onRegisterBtn() {
    /* loading の表示
    $.mobile.loading('show');*/
    // 入力フォームからメールアドレス(mailAddress)を取得
    var mailAddress = $("#reg_mailAddress").val();
    // [NCMB] メールアドレス に会員登録を行うためのメールを送信
    ncmb.User.requestSignUpEmail(mailAddress)
             .then(function(user){
                 /* 処理成功 */
                 alert("新規登録メールを配信しました。");
                 console.log("新規登録メールを配信しました。");
                 alert("届いたメールに記載されているURLにアクセスし、パスワードを登録してください。");
                 // フィールドを空に
                 $("#reg_mailAddress").val("");
                 /* loading の表示終了
                 $.mobile.loading('hide');*/
                 // 【メール / PW 認証】ログインページへ移動
                 loginModal.show();
                 registerModal.hide()
             })
             .catch(function(error){
                 /* 処理失敗 */
                 alert("新規登録メールの配信に失敗しました。");
                 console.log("新規登録メールの配信に失敗しました。" + error);
                 /* loading の表示終了
                 $.mobile.loading('hide');*/
             });
}

// 「ログインする」ボタン押下時の処理
function onLoginBtn() {
    // 入力フォームからメールアドレス(mailAddress)とPW(password)を取得
    var mailAddress = $("#login_mailAddress").val();
    var password = $("#login_password").val();
    /* loading の表示
    $.mobile.loading('show');*/
    // [NCMB] メール / PW でログイン
    ncmb.User.loginWithMailAddress(mailAddress, password)
             .then(function(user) {
                 /* 処理成功 */
                 console.log("ログインに成功しました。");
                 alert("ログインに成功しました。");
                 // [NCMB] ログイン中の会員情報の取得
                 currentLoginUser = ncmb.User.getCurrentUser();
                 // フィールドを空に
                 $("#login_mailAddress").val("");
                 $("#login_password").val("");
                 // 詳細ページへ移動
                 loginModal.hide();
             })
             .catch(function(error) {
                 /* 処理失敗 */
                 console.log("ログインに失敗しました。 + error");
                 alert("ログインに失敗しました。");
                 // フィールドを空に
                 $("#login_mailAddress").val("");
                 $("#login_password").val("");
                 /* loading の表示
                 $.mobile.loading('hide');*/
             });
}