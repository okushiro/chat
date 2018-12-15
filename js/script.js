
// ログイン時の表示

$('#title-btn').on('click',function(){
    user = window.prompt('ユーザー名を入力してください', '');
    localStorage.setItem('user',user);
    if(user != "" && user != null){
		location.href = 'simple.html';
	}else{
		window.alert('キャンセルされました');
	}
});