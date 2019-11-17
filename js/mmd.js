// グローバル
var container, stats;
var camera, scene, renderer;
var directionalLight;
var directionalLight
var control;
var helper, loader;
var ready = false;
var debug = false;
var mouseX = 0, mouseY = 0;
var windowHalfX = window.innerWidth / 2;
var windowHalfY = window.innerHeight / 2;
var clock = new THREE.Clock();
var boneDictionary = {};
var modelDictionary = {};
var motionDictionary = {};
var morphDictionary = null;
var model_y = 0;       // model_Yはカメラ位置
var model_z = 30.4;
var camera_y = -4.1;       // camera_yはlookAt;
var fps = 60;
var lag = 0;




// パラメータ機能
$(function() {
    $(window).focus(function() {
        if (ready){
            $("#mmd_setting").slideDown();
        }
    });

    $(window).blur(function() {
        if (ready){
            $("#mmd_setting").slideUp();
        }
    });
});

$(document).on("input", "#camera_y", function(){
    model_y = Number(this.value);
});
$(document).on("input", "#camera_z", function(){
    model_z = Number(this.value);
});
$(document).on("input", "#look_at_y", function(){
    camera_y = Number(this.value);
});
$(document).on("input", "#blight", function(){
    directionalLight.intensity = Number(this.value);
});
$(document).on("input", "#lag", function(){
    $("#lag_label").text("音ズレ: "+this.value + "s");
    lag = Number(this.value);
    fix_lag();
});

$( "#fps" ).on( "input", function() {
  fps = this.value;
  $("#fps_label").text(fps.toString() + "fps");
}).val( fps );



// 便利機能
function randomIntFromInterval(min,max){
    return Math.floor(Math.random()*(max-min+1)+min);
}


// ステータス
var motionStatus = {
    inAnimation: false,
    //    elapsedTime: 0.0,
    //    duration: 0.0,
    name: '',
    index: 0, 
    changeMotion: false,    // ここがtrueになった瞬間モーションが切り替わり始める
    changeMotionIndex: 0    // 切り替え先のモーションインデックス
};

// モデルパラメータ
var modelParams = [
    {
        name: 'miku',
        file: '',     // ここは後で入れる必要がある
        position: new THREE.Vector3( 0, -15,  0 )
    }
];

// モーションパラメータ
var motionParams = [
    {
        name: 'sing',
        motions: []
    }
];
var motionNames = [
    {
        name: 'sing',
        motions: []
    }
];


// 瞬きモーション(マニュアルモーション)
var blinkMorphName = 'まばたき';   // ここはモデルによって名前が違うけどまあ大体これ
var blinkVmd = {
    metadata: {
        name: 'blink',
        coordinateSystem: 'right',
        morphCount: 11,
        cameraCount: 0,
        motionCount: 0
    },
    morphs: [
        { frameNum:   0, morphName: blinkMorphName, weight: 0.0 },
        { frameNum:  10, morphName: blinkMorphName, weight: 0.0 },
        { frameNum:  15, morphName: blinkMorphName, weight: 1.0 },
        { frameNum:  20, morphName: blinkMorphName, weight: 0.0 },
        { frameNum:  40, morphName: blinkMorphName, weight: 0.0 },
        { frameNum:  43, morphName: blinkMorphName, weight: 1.0 },
        { frameNum:  46, morphName: blinkMorphName, weight: 0.0 },
        { frameNum:  49, morphName: blinkMorphName, weight: 0.0 },
        { frameNum:  52, morphName: blinkMorphName, weight: 1.0 },
        { frameNum:  55, morphName: blinkMorphName, weight: 0.0 },
        { frameNum: 200, morphName: blinkMorphName, weight: 0.0 },
    ],
    cameras: [],
    motions: []   // おそらくこの中を上のようにframeNumとかを記述すればできるはず(やりたくはない)
};


// モデルのロード時に呼ばれる関数
var onProgress = function ( xhr ) {
    if ( xhr.lengthComputable ) {
        var percentComplete = xhr.loaded / xhr.total * 100;
        console.log( Math.round(percentComplete, 2) + '% downloaded' );
    }
};
var onError = function ( xhr ) {
};




// pmd/pmxファイル受付処理
var fs, err = function(e) {
    var msg = '';
    switch (e.code) {
        case FileError.QUOTA_EXCEEDED_ERR:
            msg = 'QUOTA_EXCEEDED_ERR';
            break;
        case FileError.NOT_FOUND_ERR:
            msg = 'NOT_FOUND_ERR';
            break;
        case FileError.SECURITY_ERR:
            msg = 'SECURITY_ERR';
            break;
        case FileError.INVALID_MODIFICATION_ERR:
            msg = 'INVALID_MODIFICATION_ERR';
            break;
        case FileError.INVALID_STATE_ERR:
            msg = 'INVALID_STATE_ERR';
            break;
        default:
            msg = 'Unknown Error';
            break;
    };
    console.log('Error: ' + msg);
};

webkitRequestFileSystem(window.TEMPORARY, 5*1024*1024, function(_fs) {
    fs = _fs;
},err);

var mmd_url = "";
var load_start = false;
// モデルをファイルシステムに保存
$(":file#mmd_load").on("change", function() {
    load_start = false;
    var files = this.files;     // ファイルリスト
    if(!files) return;

    // 過去のデータを削除
    var dirReader = fs.root.createReader();
    dirReader.readEntries (function(results) {
        for (var i in results){
            if(results[i]["isFile"]){
                results[i].remove(function() {
                    console.log('File removed.');
                },  err);
            }else if(results[i]["isDirectory"]){
                results[i].removeRecursively(function() {
                    console.log('Directory removed.');
                }, err);
            }
        }
        save(0);
    });


    // i番目のデータをローカルストレージにコピーする
    function save(i) {              
        var file = files[i];
        var text = file ? file.name : "Done!";

        if(!file) {         // 全てのファイルをファイルシステムに保存し終えた時の処理
            var dirReader = fs.root.createReader();
            // Call the reader.readEntries() until no more results are returned.
            var readEntries = function() {
                dirReader.readEntries (function(results) {
                    for (var i in results){
                        file_names = results[i].name.split(".");
                        file_type = file_names[file_names.length-1];
                        if (file_type == "pmx" || file_type == "pmd"){
                            mmd_url = results[i].toURL();
                            modelParams[0]["file"] = mmd_url;
                        }
                    }
                    if (mmd_url != ""){
                        load_start = true;
                        $("#init_vmd_load").css("display", "block");
                        $("#init_vmd_load_label").css("display", "block");
                    }else{
                        alert(MMDモデルのフォルダ構造が正しくありません);
                    }
                });
            };
            readEntries(); // Start reading dirs.
            return
        };


        // フォルダ構造を作る
        var sub_dir_info = file["webkitRelativePath"].split("/");
        var sub_dir_path = sub_dir_info.slice(1,sub_dir_info.length-1).join("/") + "/";
        function createDir(rootDirEntry, folders) {
            // Throw out './' or '/' and move on to prevent something like '/foo/.//bar'.
            if (folders[0] == '.' || folders[0] == '') {
                folders = folders.slice(1);
            }
            rootDirEntry.getDirectory(folders[0], {create: true}, function(dirEntry) {
                // Recursively add the new subfolder (if we still have another to create).
                if (folders.length) {
                    createDir(dirEntry, folders.slice(1));
                }
            }, err);
        };

        if (sub_dir_path != "/"){
            createDir(fs.root, sub_dir_path.split('/'));
            fs.root.getDirectory(sub_dir_path, {create: true}, function(dirEntry) {
                dirEntry.getFile(file.name, { create: true }, function(fileEntry) {
                    // i番目のファイルをblob化して保存
                    fileEntry.createWriter(function(writer) {
                        writer.onwriteend = function() {
                            save(i+1);      // 次のファイルを保存する
                        };
                        writer.onerror = err;

                        var fr = new FileReader;        // File API呼び出し 新しいblobを作る
                        fr.onloadend = function() {
                            var blob = new Blob([fr.result]);
                            writer.write(blob);
                        };
                        fr.onerror = err;
                        fr.readAsArrayBuffer(file);     // ここでArrayBufferとしてfrを読み込んでいる
                    }, err);
                }, err);
            }, err);
        }else{
            fs.root.getFile(file.name, { create: true }, function(fileEntry) {
                // i番目のファイルをblob化して保存
                fileEntry.createWriter(function(writer) {
                    writer.onwriteend = function() {
                        save(i+1);      // 次のファイルを保存する
                    };
                    writer.onerror = err;

                    var fr = new FileReader;        // File API呼び出し 新しいblobを作る
                    fr.onloadend = function() {
                        var blob = new Blob([fr.result]);
                        writer.write(blob);
                    };
                    fr.onerror = err;
                    fr.readAsArrayBuffer(file);     // ここでArrayBufferとしてfrを読み込んでいる
                }, err);
            }, err);
        }
    }
});


// はじめに動かすモーションファイルをファイルシステムに保存
var init_vmd_f = false;
$(":file#init_vmd_load").on("change", function() {
    var files = this.files;     // ファイルリスト
    if(!files) return;
    if(files[0].name.split(".").slice(-1)[0] != "vmd"){
        alert("vmdファイルを選択してください")
        return;
    }
    fs.root.getDirectory('motion', {create: true}, function(dirEntry) {
        dirEntry.getFile(files[0].name, { create: true }, function(fileEntry) {
            // i番目のファイルをblob化して保存
            motionNames[0]["motions"].push(files[0].name);
            fileEntry.createWriter(function(writer) {
                var fr = new FileReader;        // File API呼び出し 新しいblobを作る
                fr.onloadend = function() {
                    var blob = new Blob([fr.result]);
                    writer.write(blob);
                    motionParams[0]["motions"].push({files:[fileEntry.toURL()]})
                    init_vmd_f = true;
                };
                fr.onerror = err;
                fr.readAsArrayBuffer(files[0]);     // ここでArrayBufferとしてfrを読み込んでいる
                $("#random_vmd_load").css("display", "block");
                $("#random_vmd_load_label").css("display", "block");
                $("#phy_label").css("display", "block");
                $(".phy_radio").css("display", "block");
                $("#lip_label").css("display", "block");
                $(".lip_radio").css("display", "block");
                $("#start_button").css("display", "block");
            }, err);
        }, err);
    },  err);
});



var random_vmd_f = false;
var random_length = 0;

// ランダムに動かすモーションファイルをファイルシステムに保存
$(":file#random_vmd_load").on("change", function() {
    var files = this.files;     // ファイルリスト
    if(!files) return;

    function save(i){
        if(!files[i]) {         // 全てのファイルをファイルシステムに保存し終えた時の処理
            random_vmd_f = true;
            return
        };
        if(files[i].name.split(".").slice(-1)[0] != "vmd"){
            save(i+1);      // vmdファイル以外は無視する
            return;
        }else{
            random_length += 1;
        }

        fs.root.getDirectory('motion', {create: false}, function(dirEntry) {
            dirEntry.getFile(files[i].name, { create: true }, function(fileEntry) {
                // i番目のファイルをblob化して保存
                motionNames[0]["motions"].push(files[i].name);
                fileEntry.createWriter(function(writer) {
                    writer.onwriteend = function() {
                        save(i+1);      // 次のファイルを保存する
                    };
                    writer.onerror = err;

                    var fr = new FileReader;        // File API呼び出し 新しいblobを作る
                    fr.onloadend = function() {
                        var blob = new Blob([fr.result]);
                        writer.write(blob);
                        motionParams[0]["motions"].push({files:[fileEntry.toURL()]})
                    };
                    fr.onerror = err;
                    fr.readAsArrayBuffer(files[i]);     // ここでArrayBufferとしてfrを読み込んでいる
                }, err);
            }, err);
        },  err);
    }
    save(0);
});










$(document).on("click", "#start_button", function(){
    if (document.title == "MMD 未接続です"){
        alert("YouTubeとのペアリングが正しく行われていません．MMDパネルを消してもう一度開き直してください");
    }else if (load_start == false){
        alert("モデルのディレクトリを選択してください");
    }else if (init_vmd_f == false){
        alert("モーションファイルを選択してください");
    }else{
        $(this).text("Now Loading");
        $("#mmd_params").fadeOut();
        $("#caution").fadeIn();
        init();
        animate();
    }
});



function init() {
    // bodyに追加
    // カメラ
    camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 2000 );
    camera.position.y = 15;
    camera.position.z = 26;
    // シーンとライト
    scene = new THREE.Scene();
    var ambient = new THREE.AmbientLight( 0x666666 );
    scene.add( ambient );
    directionalLight = new THREE.DirectionalLight( 0x887766 );
    directionalLight.position.set( -1, 1, 1 ).normalize();
    scene.add( directionalLight );
    // レンダラ
    renderer = new THREE.WebGLRenderer( { antialias: true } );
    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize( window.innerWidth, window.innerHeight );
    renderer.setClearColor( new THREE.Color( 'black' ) );
    document.getElementById('mmd').appendChild(renderer.domElement);
    // マウスコントロール
    //    control = new THREE.OrbitControls(camera, renderer.domElement);       // マウス
    //    control.minDistance = 20;
    // モデル
    helper = new THREE.MMDHelper( renderer );
    loader = new THREE.MMDLoader();
    //loader.setDefaultTexturePath( 'model/default' );
    loadModels( function () {       // ロード関数 モデルをロードする
        var mesh = helper.meshes[ 0 ];
        loadVmds( mesh, function () {
            createDictionary( mesh );   //ボーンやmorphの辞書を作る
            if (random_vmd_f == true || $('input[name=mmd_lip]:checked').val() == "on"){
                removeBlinkFromMorphAnimations( mesh );   // 既存の瞬きモーションを消す
                removeMouseFromMorphAnimations( mesh );   // 既存の口モーションを消す
                loader.pourVmdIntoModel( mesh, blinkVmd, 'blink' );   //これがないとモデルにvmdを適応できない 瞬きモーションをモデルに注ぐ
            }

            helper.setAnimation( mesh );
            for ( var i = 0; i < motionParams.length; i++ ) {
                var param = motionParams[ i ];
                for ( var j = 0; j < param.motions.length; j++ ) {
                    var name = param.name + j;
                    mesh.mixer.clipAction( name ).stop();
                    mesh.mixer.clipAction( name + 'Morph' ).stop();
                    //mesh.mixer.clipAction( name + 'Morph' ).weight = 0.4;
                    // 自分でモーションのタイミングとかを制御したい時はループさせない
                    mesh.mixer.clipAction( name ).loop = THREE.LoopOnce;      // ループ処理   
                    //mesh.mixer.clipAction( name + 'Morph' ).loop = THREE.LoopOnce;  
                    mesh.mixer.clipAction( name ).clampWhenFinished = true;     //モーション終了時に固定する
                }
            }
            //controll_mouse(mesh);
            if (random_vmd_f == true || $('input[name=mmd_lip]:checked').val() == "on"){
                startBlink( mesh );   // 瞬き開始
            }
            startMotion( "sing", 0, 0);   // モーションの指定と開始時刻，スタート
            ready = true;
            chrome.tabs.query({url:parentURL}, function(results){
                chrome.tabs.sendMessage(results[0].id, 
                                        {from: 'mmd', subject: 'get_play_status'}, 
                                        function (response) {
                                            if (response.paused == true){
                                                helper.meshes[0].mixer.clipAction(motionStatus.name+motionStatus.index).paused = true;      //
                                                helper.meshes[0].mixer.clipAction(motionStatus.name+motionStatus.index + 'Morph').paused = true;      //
                                                paused = true;
                                            }
                                        });
            });
        });
    });
    // イベントハンドラ
    window.addEventListener( 'resize', onWindowResize, false );
}



// MMDモデルをロードする関数
function loadModels ( callback ) {
    function load ( index ) {
        if ( index >= modelParams.length ) {
            callback();
            return;
        }
        var param = modelParams[ index ];
        loader.loadModel( param.file, function ( object ) {
            var mesh = object;
            mesh.position.copy( param.position );
            helper.add( mesh );
            if ($('input[name=mmd_phy]:checked').val() == "on"){
                helper.setPhysics( mesh ); //物理演算
            }
            scene.add( mesh );
            load( index + 1 );
        }, onProgress, onError );
    }
    load(0);  // とりあえず0番目のモデルをロード
}


// モーションファイルをロードする
function loadVmds ( mesh, callback ) {
    function load ( paramIndex, motionIndex ) {
        if ( paramIndex >= motionParams.length ) {
            callback();
            return;
        }
        var param = motionParams[ paramIndex ];
        loader.loadVmds( param.motions[ motionIndex ].files, function ( vmd ) {
            loader.pourVmdIntoModel( mesh, vmd, param.name + motionIndex );
            motionIndex++;
            if ( motionIndex >= param.motions.length ) {
                paramIndex++;
                motionIndex = 0;
            }
            load( paramIndex, motionIndex );
        }, onProgress, onError );
    }
    // 第一引数はmotionParamsのindex 今回は最初はstandのモーション．
    // 第二引数は今回はstandモーションの0番目のモーション
    load( 0, 0 );       
}




// ウィンドウのサイズを変えた時の調整
function onWindowResize() {
    windowHalfX = window.innerWidth / 2;
    windowHalfY = window.innerHeight / 2;
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize( window.innerWidth, window.innerHeight );
}


function animate() {
    setTimeout( function() {
        requestAnimationFrame( animate );
    },  1000 /fps );
    render();
}
var first_model_load = true;
function render() {
    if ( ready ) {
        if (first_model_load == true){
           // $("#mmd_params").fadeOut();
            $("#mmd_bg").fadeOut();
            $("#mmd_cover").fadeOut();
            $("#caution").fadeOut();
            $("#mmd").fadeIn("slow");
            if (document.hasFocus()){
                $("#mmd_setting").slideDown();
            }
            first_model_load = false;
        }
        var delta = clock.getDelta();
        if (random_vmd_f == true || $('input[name=mmd_lip]:checked').val() == "on"){
            manageAnimation( delta );   // アニメーションの制御(切り替え)
        }
        lookModel();        // 常にミクを見る
        helper.animate( delta );
        helper.render( scene, camera );
        //control.update();
    } else {
        renderer.clear();
        renderer.render( scene, camera );
    }
}


function manageAnimation ( delta ) {
    if ( motionStatus.inAnimation === false ) {
        return;
    }
    var mesh = helper.meshes[ 0 ];
    var p = motionParams[ motionDictionary[ motionStatus.name ] ];
    //motionStatus.elapsedTime += delta;
    if (motionStatus.changeMotion == true){
        var fromName = motionStatus.name + motionStatus.index;
        var toName = motionStatus.name + motionStatus.changeMotionIndex;
        mesh.mixer.clipAction( fromName ).weight -= 2*delta;
        mesh.mixer.clipAction( toName ).weight += 2*delta;
        mesh.mixer.clipAction( fromName + "Morph" ).weight -= 2*delta;
        mesh.mixer.clipAction( toName + "Morph" ).weight += 2*delta;
        if (mesh.mixer.clipAction( fromName ).weight <= 0){
            motionStatus.changeMotion = false;
            motionStatus.index = motionStatus.changeMotionIndex;
            mesh.mixer.clipAction( fromName ).stop();
            mesh.mixer.clipAction( fromName + "Morph" ).stop();
        }
    }
}


function lookModel(){
    var mesh = helper.meshes[ 0 ];
    var index = boneDictionary["センター"];
    var model_position = mesh.skeleton.bones[index].position;
    camera.lookAt({x:model_position.x, y:camera_y, z:model_position.z});
    camera.position.x = model_position.x;
    camera.position.y = model_y;
    camera.position.z = model_position.z+model_z;
}



function createDictionary ( mesh ) {
    var bones = mesh.skeleton.bones;
    for ( var i = 0; i < bones.length; i++ ) {
        var b = bones[ i ];
        boneDictionary[ b.originalName ] = i;
    }
    for ( var i = 0; i < motionParams.length; i++ ) {
        var p = motionParams[ i ];
        motionDictionary[ p.name ] = i;
    }
    morphDictionary = mesh.morphTargetDictionary;
}


function changeMotion (index, time) { 
    if (motionStatus.changeMotion == false){
        console.log("CHANGE MOTION")
        motionStatus.changeMotion = true;
        motionStatus.changeMotionIndex = index;
        var mesh = helper.meshes[ 0 ];
        var name = motionStatus.name + index;
        mesh.mixer.clipAction( name ).time = time;
        mesh.mixer.clipAction( name ).weight = 0;
        mesh.mixer.clipAction( name ).play();
        mesh.mixer.clipAction( name + 'Morph' ).play();
        $("#motionName").text("モーション " + motionNames[0].motions[index]);
    }
}


// 指定されたkeyのモーションを始める    
// モーションステータスをいろいろ変えたりもする
// 開始時刻も設定できるようにする
function startMotion ( key, index, time) {   // indexは各モーションkeyの中の別のモーションの場所 基本的に一番最初にしか使わない
    if ( motionStatus.name !== '' ) {
        stopMotion( motionStatus.name );
    }
    if ( index === undefined ) {
        index = 0;
    }
    var mesh = helper.meshes[ 0 ];
    //motionStatus.elapsedTime = 0.0;
    motionStatus.name = key;
    motionStatus.inAnimation = true;
    motionStatus.index = index;
    var name = key + motionStatus.index;
    mesh.mixer.clipAction( name ).time = time;
    mesh.mixer.clipAction( name ).play();
    mesh.mixer.clipAction( name + 'Morph' ).play();
    //motionStatus.duration = mesh.mixer.clipAction( name )._clip.duration;
    $("#motionName").text("モーション " + motionNames[0].motions[motionStatus.index]);
}




// 指定されたkeyのモーションを止める
function stopMotion ( key ) {
    var name = key + motionStatus.index;
    motionStatus.name = '';
    //    motionStatus.elapsedTime = 0.0;
    //    motionStatus.duration = 0.0;
    motionStatus.inAnimation = false;
    motionStatus.index = 0;
    var mesh = helper.meshes[ 0 ];
    mesh.mixer.clipAction( name ).stop();
    mesh.mixer.clipAction( name + 'Morph' ).stop();
}


function fix_lag(){       //random motionの時は使わない
    if (random_vmd_f == false){
        var mesh = helper.meshes[0];
        var name = motionStatus.name + motionStatus.index;
        chrome.tabs.query({url:parentURL}, function(results){
            chrome.tabs.sendMessage(results[0].id, 
                                    {from: 'mmd', subject: 'get_play_status'}, 
                                    function (response) {
                                        var fix_time = response.currentTime + lag;
                                        if (fix_time < 0){      //TODO
                                        }else{
                                            mesh.mixer.clipAction( name ).time = fix_time;
                                            mesh.mixer.clipAction( name + 'Morph').time = fix_time;
                                        }
                                    });
        });
    }
}

// 瞬き関係
// 瞬き開始
function startBlink ( mesh ) {
    mesh.mixer.clipAction( 'blinkMorph' ).play();
}

// 瞬き停止
function stopBlink ( mesh ) {
    mesh.mixer.clipAction( 'blinkMorph' ).stop();
}

// すでにモーション内に瞬きがある場合がある．なので，モーションファイルから瞬きに関連する部分を消す
function removeBlinkFromMorphAnimations ( mesh ) {
    var index = mesh.morphTargetDictionary[ blinkMorphName ];
    if ( index === undefined ) {
        return;
    }
    for ( var i = 0; i < mesh.geometry.animations.length; i++ ) {
        var tracks = mesh.geometry.animations[ i ].tracks;
        for ( var j = 0; j < tracks.length; j++ ) {
            if ( tracks[ j ].name === ".morphTargetInfluences[" + index + "]" ) {
                mesh.geometry.animations[ i ].tracks.splice( j, 1 );
                break;
            }
        }
    }
}


// すでにモーション内に口の動きがある場合がある．なので，モーションファイルから消す
function removeMouseFromMorphAnimations ( mesh ) {
    for ( var i = 0; i < mesh.geometry.animations.length; i++ ) {
        var tracks = mesh.geometry.animations[ i ].tracks;
        for ( var j = 0; j < tracks.length; j++ ) {
            if ( tracks[ j ].name === ".morphTargetInfluences[" + morphDictionary['あ'] + "]" ) {
                mesh.geometry.animations[ i ].tracks.splice( j, 1 );
            }else if ( tracks[ j ].name === ".morphTargetInfluences[" + morphDictionary['い'] + "]" ) {
                mesh.geometry.animations[ i ].tracks.splice( j, 1 );
            }else if ( tracks[ j ].name === ".morphTargetInfluences[" + morphDictionary['う'] + "]" ) {
                mesh.geometry.animations[ i ].tracks.splice( j, 1 );
            }else if ( tracks[ j ].name === ".morphTargetInfluences[" + morphDictionary['え'] + "]" ) {
                mesh.geometry.animations[ i ].tracks.splice( j, 1 );
            }else if ( tracks[ j ].name === ".morphTargetInfluences[" + morphDictionary['お'] + "]" ) {
                mesh.geometry.animations[ i ].tracks.splice( j, 1 );
            }
        }
    }
}

function changeVowel(vowel){
    var mesh = helper.meshes[ 0 ];
    if (vowel == "あ"){
        mesh.morphTargetInfluences[ morphDictionary['あ']] = 0.6;
        mesh.morphTargetInfluences[ morphDictionary['い']] = 0.0;
        mesh.morphTargetInfluences[ morphDictionary['う']] = 0.0;
        mesh.morphTargetInfluences[ morphDictionary['え']] = 0.0;
        mesh.morphTargetInfluences[ morphDictionary['お']] = 0.0;
    }else if (vowel == "い"){
        mesh.morphTargetInfluences[ morphDictionary['あ']] = 0.0;
        mesh.morphTargetInfluences[ morphDictionary['い']] = 0.6;
        mesh.morphTargetInfluences[ morphDictionary['う']] = 0.0;
        mesh.morphTargetInfluences[ morphDictionary['え']] = 0.0;
        mesh.morphTargetInfluences[ morphDictionary['お']] = 0.0;
    }else if (vowel == "う"){
        mesh.morphTargetInfluences[ morphDictionary['あ']] = 0.0;
        mesh.morphTargetInfluences[ morphDictionary['い']] = 0.0;
        mesh.morphTargetInfluences[ morphDictionary['う']] = 0.6;
        mesh.morphTargetInfluences[ morphDictionary['え']] = 0.0;
        mesh.morphTargetInfluences[ morphDictionary['お']] = 0.0;
    }else if (vowel == "え"){
        mesh.morphTargetInfluences[ morphDictionary['あ']] = 0.0;
        mesh.morphTargetInfluences[ morphDictionary['い']] = 0.0;
        mesh.morphTargetInfluences[ morphDictionary['う']] = 0.0;
        mesh.morphTargetInfluences[ morphDictionary['え']] = 0.6;
        mesh.morphTargetInfluences[ morphDictionary['お']] = 0.0;
    }else if (vowel == "お"){
        mesh.morphTargetInfluences[ morphDictionary['あ']] = 0.0;
        mesh.morphTargetInfluences[ morphDictionary['い']] = 0.0;
        mesh.morphTargetInfluences[ morphDictionary['う']] = 0.0;
        mesh.morphTargetInfluences[ morphDictionary['え']] = 0.0;
        mesh.morphTargetInfluences[ morphDictionary['お']] = 0.6;
    }else{
        mesh.morphTargetInfluences[ morphDictionary['あ']] = 0.0;
        mesh.morphTargetInfluences[ morphDictionary['い']] = 0.0;
        mesh.morphTargetInfluences[ morphDictionary['う']] = 0.0;
        mesh.morphTargetInfluences[ morphDictionary['え']] = 0.0;
        mesh.morphTargetInfluences[ morphDictionary['お']] = 0.0;
    }
}



function controll_mouse(mesh){
    $(document).on("keydown",  function(event){ 
        if (event.which == 65){
            mesh.morphTargetInfluences[ morphDictionary['あ']] = 0.8;
        }else if (event.which == 73){
            mesh.morphTargetInfluences[ morphDictionary['い']] = 0.8;
        }else if (event.which == 85){
            mesh.morphTargetInfluences[ morphDictionary['う']] = 0.8;
        }else if (event.which == 69){
            mesh.morphTargetInfluences[ morphDictionary['え']] = 0.8;
        }else if (event.which == 79){
            mesh.morphTargetInfluences[ morphDictionary['お']] = 0.8;
        }
    });
    $(document).on("keyup",  function(event){ 
        if (event.which == 65){
            mesh.morphTargetInfluences[ morphDictionary['あ']] = 0;
        }else if (event.which == 73){
            mesh.morphTargetInfluences[ morphDictionary['い']] = 0;
        }else if (event.which == 85){
            mesh.morphTargetInfluences[ morphDictionary['う']] = 0;
        }else if (event.which == 69){
            mesh.morphTargetInfluences[ morphDictionary['え']] = 0;
        }else if (event.which == 79){
            mesh.morphTargetInfluences[ morphDictionary['お']] = 0;
        }
    });
}







// 子ウインドウを消すとき，親のMMDフラグを消す
window.addEventListener('beforeunload',  function(e) {
    chrome.tabs.query({url:parentURL}, function(results){
        chrome.tabs.sendMessage(results[0].id, 
                                {from: 'mmd', subject: 'closeMMD'}, 
                                function () {
                                });
    });
}, false);


//イベント
var parentURL;
var first_load = true;
var mmd_id;
var paused = false;
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse){
    if ((request.from ==='content') && (request.subject === 'sendVowel') && (request.parentURL === parentURL)){
        if (ready && random_vmd_f || $('input[name=mmd_lip]:checked').val() == "on"){
            changeVowel(request.vowel);
        }
    }
    else if ((request.from ==='content') && (request.subject === 'changeMotion') && (request.parentURL === parentURL)){
        if (ready && paused == false && (random_vmd_f == true || $('input[name=mmd_lip]:checked').val() == "on")){
            while (true){
                var dance_index = randomIntFromInterval(1, random_length);      //TODO
                if (dance_index != motionStatus.index){
                    break;
                }
            }
            var dance_duration = helper.meshes[0].mixer.clipAction(motionStatus.name+motionStatus.index)._clip.duration;
            var dance_time = randomIntFromInterval(20, dance_duration);
            if (request.duration-request.currentTime <= 30){
                console.log("LAST MOTION")
                changeMotion(dance_index, dance_duration-(request.duration-request.currentTime));
            }else{
                changeMotion(dance_index, dance_time);
            }
        }
    }
    else if ((request.from ==='content') && (request.subject === 'playMotion') && (request.parentURL === parentURL)){
        if (ready){
            helper.meshes[0].mixer.clipAction(motionStatus.name+motionStatus.index).paused = false;
            helper.meshes[0].mixer.clipAction(motionStatus.name+motionStatus.index + 'Morph').paused = false;      //
            paused = false;
        }
    }
    else if ((request.from ==='content') && (request.subject === 'pauseMotion') && (request.parentURL === parentURL)){
        if (ready){
            helper.meshes[0].mixer.clipAction(motionStatus.name+motionStatus.index).paused = true;
            helper.meshes[0].mixer.clipAction(motionStatus.name+motionStatus.index + 'Morph').paused = true;      //
            paused = true;
        }
    }
    // モーションの再生位置の変更(ただしrandom motionの時は無視)
    else if ((request.from ==='content') && (request.subject === 'play') && (request.mmd_id === mmd_id)){
        var mesh = helper.meshes[0];
        var name = motionStatus.name + motionStatus.index;
        if (random_vmd_f == false){
            //mesh.mixer.clipAction( name ).time = request.currentTime;
            //mesh.mixer.clipAction( name + 'Morph').time = request.currentTime;
            var fix_time = request.currentTime + lag;
            if (fix_time < 0){          //TODO
            }else{
                mesh.mixer.clipAction( name ).time = fix_time;
                mesh.mixer.clipAction( name + 'Morph').time = fix_time;
            }
        }
        if (request.paused == false){
            mesh.mixer.clipAction( name ).paused = false;
            mesh.mixer.clipAction( name + 'Morph').paused = false;
        }
    }
    else if ((request.from ==='content') && (request.subject === 'saveParentMMD')){
        if (first_load == true){
            parentURL = request.parentURL;
            $("#mmd_bg")
            .css("background", "url(" + "https://i.ytimg.com/vi/" + request.movieId + "/hqdefault.jpg" + ") no-repeat center")
            .css("background-size", "cover");
            mmd_id = request.mmd_id;
            first_load = false;
            document.title = 'MMD - ' + request.title;
            console.log(request.movieId);
        }
    }
    else if ((request.from ==='content') && (request.subject === 'closeMMD')){
        if (parentURL == request.parentURL){
            window.close();
        }
    }
    else if ((request.from ==='content') && (request.subject === 'resetParentMMD') && (request.mmd_id === mmd_id)){
        document.title = 'MMD - ' + request.title;
        $("#mmd_bg")
        .css("background", "url(" + "https://i.ytimg.com/vi/" + request.movieId + "/hqdefault.jpg" + ") no-repeat center")
        .css("background-size", "cover");
        parentURL = request.parentURL;
        if (ready){
            helper.meshes[0].mixer.clipAction(motionStatus.name+motionStatus.index).paused = false;
            helper.meshes[0].mixer.clipAction(motionStatus.name+motionStatus.index + 'Morph').paused = false;      //
            paused = false;
            changeMotion(0, 0);
        }
    }
    else if (request.type === 'getDoc') {
        var name = motionStatus.name + motionStatus.index;
        var mesh = helper.meshes[0];
        mesh.mixer.clipAction( name ).time = 0;
        mesh.mixer.clipAction( name + 'Morph').time = 0;
        mesh.mixer.clipAction( name ).paused = true;
        mesh.mixer.clipAction( name + 'Morph').paused = true;
    }

    return true;
});


