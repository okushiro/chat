

function makeMap(lat, lng) {    
    var canvas = document.getElementById('map'); // 地図を表示する要素を取得

    var latlng = new google.maps.LatLng(lat, lng);  // 中心の位置（緯度、経度）

    var mapOptions = {  // マップのオプション
        zoom: 10,
        center: latlng,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        mapTypeControl: false,
        overviewMapControl: false,
        zoomControl: true,
        draggable: true
    };

    var map = new google.maps.Map(canvas, mapOptions); //作成

    var marker = new google.maps.Marker({
        position: latlng, // マーカーを立てる位置を指定
        map: map, // マーカーを立てる地図を指定
        icon: {
            url:'https://maps.google.com/mapfiles/ms/icons/green-dot.png',
            labelOrigin: new google.maps.Point(20, 40)  //ラベルの基点
        },
        label: {
            text: localStorage.getItem('user'),         //ラベル文字
            color: '#ff3366',          //ラベル文字の色
            fontFamily: 'sans-serif',  //フォント 
            fontWeight: 'bold',        //フォントの太さ 
            fontSize: '20px'           //フォントのサイズ 
        },
        // animation: google.maps.Animation.DROP
    });

    return [map,marker];
}

function mapsInit(position){
    const lat = position.coords.latitude;
    const lng = position.coords.longitude;
    newPostRef.push({
        mapUser: localStorage.getItem('user'),
        lat: lat,
        lng: lng
    });
}

function mapsError(){
    newPostRef.push({
        mapUser: localStorage.getItem('user'),
        lat: 35.667224,
        lng: 139.713833
    });
}

const set = {
    enableHighAccuracy: true,
    maximumAge: 20000,
    timeout: 10000
}


//ページのロードが完了したら地図を読み込む
window.onload = function(){
    navigator.geolocation.getCurrentPosition(mapsInit,mapsError,set);
    newPostRef.on('child_added', function(data){
        let v = data.val();
        let k = data.key;

        if(v.mapUser){
            makeMap(v.lat, v.lng);
        }
    });   
};