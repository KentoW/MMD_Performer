

var chord2key = {
  N:[], 

  C:["C2", "E2", "G2"],   // メジャー
  "C#":["Db2", "F2", "Ab2"], 
  Db:["Db2", "F2", "Ab2"], 
  D:["D2", "Gb2", "A2"], 
  Eb:["Eb2", "G2", "Bb2"], 
  E:["E2", "Ab2", "B2"], 
  Fb:["E2", "Ab2", "B2"], 
  F:["F2", "A2", "C3"], 
  "F#":["Gb2", "Bb2", "Db3"], 
  Gb:["Gb2", "Bb2", "Db3"], 
  G:["G2", "B2", "D3"], 
  "G#":["Ab2", "C3", "Eb3"], 
  Ab:["Ab2", "C3", "Eb3"], 
  A:["A1", "Db2", "E2"], 
  Bb:["Bb1", "D2", "F2"], 
  B:["B1", "Eb2", "Gb2"], 
  Cb:["B1", "Eb2", "Gb2"], 

  C7:["C2", "E2", "G2", "Bb2"],  //セブンス
  "C#7":["Db2", "F2", "A2", "C3"], 
  Db7:["Db2", "F2", "A2", "C3"], 
  D7:["D2", "Gb2", "A2", "C3"], 
  Eb7:["Eb2", "G2", "Bb2", "Db3"], 
  E7:["E2", "Ab2", "B2", "D3"], 
  F7:["F2", "A2", "C3", "Eb3"], 
  "F#7":["Gb2", "Bb2", "Db3", "E3"], 
  Gb7:["Gb2", "Bb2", "Db3", "E3"], 
  G7:["G1", "B1", "D2", "F2"], 
  "G#7":["Ab1", "C2", "Eb2", "Gb2"], 
  Ab7:["Ab1", "C2", "Eb2", "Gb2"], 
  A7:["A1", "Db2", "E2", "G2"], 
  Bb7:["Bb1", "D2", "F2", "Ab2"], 
  B7:["B1", "Eb2", "Gb2", "A2"], 

  CM7:["C2", "E2", "G2", "B2"],   // メジャーセブンス
  "C#M7":["Db2", "F2", "Ab2", "C3"], 
  DbM7:["Db2", "F2", "Ab2", "C3"], 
  DM7:["D2", "Gb2", "A2", "Db3"], 
  EbM7:["Eb2", "G2", "Bb2", "D3"], 
  EM7:["E2", "Ab2", "B2", "Eb3"], 
  FM7:["F2", "A2", "C3", "E3"], 
  "F#M7":["Gb1", "Bb1", "Db2", "F2"], 
  GbM7:["Gb1", "Bb1", "Db2", "F2"], 
  GM7:["G1", "B1", "D2", "Gb2"], 
  "G#M7":["Ab1", "C2", "Eb2", "G2"], 
  AbM7:["Ab1", "C2", "Eb2", "G2"], 
  AM7:["A1", "Db2", "E2", "Ab2"], 
  BbM7:["Bb1", "D2", "F2", "A2"], 
  BM7:["B1", "Eb2", "Gb2", "Bb2"], 
  CbM7:["B1", "Eb2", "Gb2", "Bb2"], 


  "CM7(9)":["C2", "E2", "G2", "B2"],   // メジャーセブンス
  "C#M7(9)":["Db2", "F2", "Ab2", "C3"], 
  "DbM7(9)":["Db2", "F2", "Ab2", "C3"], 
  "DM7(9)":["D2", "Gb2", "A2", "Db3"], 
  "EbM7(9)":["Eb2", "G2", "Bb2", "D3"], 
  "EM7(9)":["E2", "Ab2", "B2", "Eb3"], 
  "FM7(9)":["F2", "A2", "C3", "E3"], 
  "F#M7(9)":["Gb1", "Bb1", "Db2", "F2"], 
  "GbM7(9)":["Gb1", "Bb1", "Db2", "F2"], 
  "GM7(9)":["G1", "B1", "D2", "Gb2"], 
  "G#M7(9)":["Ab1", "C2", "Eb2", "G2"], 
  "AbM7(9)":["Ab1", "C2", "Eb2", "G2"], 
  "AM7(9)":["A1", "Db2", "E2", "Ab2"], 
  "BbM7(9)":["Bb1", "D2", "F2", "A2"], 
  "BM7(9)":["B1", "Eb2", "Gb2", "Bb2"], 
  "CbM7(9)":["B1", "Eb2", "Gb2", "Bb2"], 



  Cm:["C2", "Eb2", "G2"],  //マイナー
  "C#m":["Bb2", "E2", "Ab2"], 
  Dbm:["Db2", "E2", "Ab2"], 
  Dm:["D2", "F2", "A2"], 
  "D#m":["Eb2", "Gb2", "Bb2"], 
  Ebm:["Eb2", "Gb2", "Bb2"], 
  Em:["E2", "G2", "B2"], 
  "E#m":["F2", "Ab2", "C3"], 
  Fm:["F2", "Ab2", "C3"], 
  "F#m":["Gb2", "A2", "Db3"], 
  Gbm:["Gb2", "A2", "Db3"], 
  Gm:["G2", "Bb2", "D3"], 
  "G#m":["Ab2", "B2", "Eb3"], 
  Abm:["Ab2", "B2", "Eb3"], 
  Am:["A2", "C3", "E3"], 
  "A#m":["Bb1", "Db2", "F2"], 
  Bbm:["Bb1", "Db2", "F2"], 
  Bm:["B1", "D2", "Gb2"], 

  Cm7:["C2", "Eb2", "G2", "Bb2"],   // マイナーセブンス
  "C#m7":["Db2", "E2", "Ab2", "B2"], 
  Dbm7:["Db2", "E2", "Ab2", "B2"], 
  Dm7:["D2", "F2", "A2", "C3"], 
  "D#m7":["Eb2", "Gb2", "Bb2", "Db3"], 
  Ebm7:["Eb2", "Gb2", "Bb2", "Db3"], 
  Em7:["E2", "G2", "B2", "D3"], 
  "E#7":["F2", "Ab2", "C3", "Eb3"], 
  Fm7:["F2", "Ab2", "C3", "Eb3"], 
  "F#m7":["Gb2", "A2", "Db3", "E3"], 
  Gbm7:["Gb2", "A2", "Db3", "E3"], 
  Gm7:["G1", "Bb1", "D2", "F2"], 
  "G#m7":["Ab1", "B1", "Eb2", "Gb2"], 
  Abm7:["Ab1", "B1", "Eb2", "Gb2"], 
  Am7:["A1", "C2", "E2", "G2"], 
  "A#m7":["Bb1", "Db2", "F2", "Ab2"], 
  Bbm7:["Bb1", "Db2", "F2", "Ab2"], 
  Bm7:["B1", "D2", "Gb2", "A2"], 

  CmM7:["C2", "Eb2", "G2", "B2"],   // マイナーメジャーセブンス
  "C#mM7":["Db2", "E2", "Ab2", "C3"], 
  DbmM7:["Db2", "E2", "Ab2", "C2"], 
  DmM7:["D2", "F2", "A2", "Db3"], 
  "D#mM7":["Eb2", "Gb2", "Bb2", "D3"], 
  EbmM7:["Eb2", "Gb2", "Bb2", "D3"], 
  EmM7:["E2", "G2", "B2", "Eb3"], 
  "E#M7":["F2", "Ab2", "C3", "E3"], 
  FmM7:["F2", "Ab2", "C3", "E3"], 
  "F#mM7":["Gb2", "A2", "Db3", "F3"], 
  GmM7:["G1", "Bb1", "D2", "Gb2"], 
  "G#mM7":["Ab1", "B1", "Eb2", "G2"], 
  AbmM7:["Ab1", "B1", "Eb2", "G2"], 
  AmM7:["A1", "C2", "E2", "Ab2"], 
  "A#mM7":["Bb1", "Db2", "F2", "A2"], 
  BbmM7:["Bb1", "Db2", "F2", "A2"], 
  BmM7:["B1", "D2", "Gb2", "Bb2"], 


  Caug:["C2", "E2", "Ab2"],   // メジャー
  "C#aug":["Db2", "F2", "A2"], 
  Dbaug:["Db2", "F2", "A2"], 
  Daug:["D2", "Gb2", "Bb2"], 
  Ebaug:["Eb2", "G2", "B2"], 
  Eaug:["E2", "Ab2", "C3"], 
  Fbaug:["E2", "Ab2", "C3"], 
  Faug:["F2", "A2", "Db3"], 
  "F#aug":["Gb2", "Bb2", "D3"], 
  Gbaug:["Gb2", "Bb2", "D3"], 
  Gaug:["G2", "B2", "Eb3"], 
  "G#aug":["Ab2", "C3", "Eb3"], 
  Abaug:["Ab2", "C3", "E3"], 
  Aaug:["A1", "Db2", "F2"], 
  Bbaug:["Bb1", "D2", "Gb2"], 
  Baug:["B1", "Eb2", "G2"], 
  Cbaug:["B1", "Eb2", "G2"], 


  Csus4:["C2", "F2", "G2"], 
  "C#sus4":["Db2", "Gb2", "Ab2"], 
  Dsus4:["D2", "G2", "A1"], 
  Ebsus4:["Eb2", "Ab2", "Bb2"], 
  Esus4:["E2", "A2", "B2"], 
  Fsus4:["F2", "Bb2", "C3"], 
  "F#sus4":["Gb2", "B2", "Db3"], 
  Gsus4:["G2", "C3", "D3"], 
  Absus4:["Ab2", "Db3", "Eb3"], 
  Asus4:["A2", "D3", "E3"], 
  Bbsus4:["Bb1", "Eb2", "F2"], 
  Bsus4:["B1", "E2", "Gb2"], 

  Csus2:["C2", "D2", "G2"], 
  "C#sus2":["Db2", "Eb2", "Ab2"], 
  Dsus2: ["D2", "E2", "A2"], 
  Ebsus2:["Eb2", "F2", "Bb2"], 
  Esus2:["E2", "Gb2", "B2"], 
  Fsus2:["F2", "G2", "C3"], 
  "F#sus2":["Gb2", "Ab2", "Db3"], 
  Gsus2:["G2", "A2", "D3"], 
  Absus2:["Ab2", "Bb2", "Eb3"], 
  Asus2:["A2", "B2", "E3"], 
  Bbsus2:["Bb1", "C2", "F2"], 
  Bsus2:["B1", "Db2", "Gb2"], 


  C6:["C2", "E2", "G2"],   // メジャー
  "C#6":["Db2", "F2", "Ab2"], 
  Db6:["Db2", "F2", "Ab2"], 
  D6:["D2", "Gb2", "A2"], 
  Eb6:["Eb2", "G2", "Bb2"], 
  E6:["E2", "Ab2", "B2"], 
  Fb6:["E2", "Ab2", "B2"], 
  F6:["F2", "A2", "C3"], 
  "F#6":["Gb2", "Bb2", "Db3"], 
  Gb6:["Gb2", "Bb2", "Db3"], 
  G6:["G2", "B2", "D3"], 
  "G#6":["Ab2", "C3", "Eb3"], 
  Ab6:["Ab2", "C3", "Eb3"], 
  A6:["A1", "Db2", "E2"], 
  Bb6:["Bb1", "D2", "F2"], 
  B6:["B1", "Eb2", "Gb2"], 
  Cb6:["B1", "Eb2", "Gb2"], 

  Cadd9:["C2", "E2", "G2"],   // メジャー
  "C#add9":["Db2", "F2", "Ab2"], 
  Dbadd9:["Db2", "F2", "Ab2"], 
  Dadd9:["D2", "Gb2", "A2"], 
  Ebadd9:["Eb2", "G2", "Bb2"], 
  Eadd9:["E2", "Ab2", "B2"], 
  Fbadd9:["E2", "Ab2", "B2"], 
  Fadd9:["F2", "A2", "C3"], 
  "F#add9":["Gb2", "Bb2", "Db3"], 
  Gbadd9:["Gb2", "Bb2", "Db3"], 
  Gadd9:["G2", "B2", "D3"], 
  "G#add9":["Ab2", "C3", "Eb3"], 
  Abadd9:["Ab2", "C3", "Eb3"], 
  Aadd9:["A1", "Db2", "E2"], 
  Bbadd9:["Bb1", "D2", "F2"], 
  Badd9:["B1", "Eb2", "Gb2"], 
  Cbadd9:["B1", "Eb2", "Gb2"], 


  Fm9:["F2", "Ab2", "C3", "Eb3"], 
  Gm9:["G2", "Bb2", "D3", "F3"], 


  "C(11)":["C2", "E2", "G2"],   // メジャー
  "C#(11)":["Db2", "F2", "Ab2"], 
  "Db(11)":["Db2", "F2", "Ab2"], 
  "D(11)":["D2", "Gb2", "A2"], 
  "Eb(11)":["Eb2", "G2", "Bb2"], 
  "E(11)":["E2", "Ab2", "B2"], 
  "Fb(11)":["E2", "Ab2", "B2"], 
  "F(11)":["F2", "A2", "C3"], 
  "F#(11)":["Gb2", "Bb2", "Db3"], 
  "Gb(11)":["Gb2", "Bb2", "Db3"], 
  "G(11)":["G2", "B2", "D3"], 
  "G#(11)":["Ab2", "C3", "Eb3"], 
  "Ab(11)":["Ab2", "C3", "Eb3"], 
  "A(11)":["A1", "Db2", "E2"], 
  "Bb(11)":["Bb1", "D2", "F2"], 
  "B(11)":["B1", "Eb2", "Gb2"], 
  "Cb(11)":["B1", "Eb2", "Gb2"], 

  Cdim:["C2", "Eb2", "Gb2"],   // diminished
  "C#dim":["Db2", "E2", "G2"], 
  Dbdim:["Db2", "E2", "G2"], 
  Ddim:["D2", "F2", "Ab2"], 
  Ebdim:["Eb2", "Gb2", "A2"], 
  Edim:["E2", "G2", "Bb2"], 
  Fbdim:["E2", "G2", "Bb2"], 
  Fdim:["F2", "Ab2", "Cb3"], 
  "F#dim":["Gb2", "A2", "C3"], 
  Gbdim:["Gb2", "A2", "C3"], 
  Gdim:["G2", "Bb2", "Db3"], 
  "G#dim":["Ab2", "B3", "D3"], 
  Abdim:["Ab2", "B3", "D3"], 
  Adim:["A1", "C2", "Eb2"], 
  Bbdim:["Bb1", "Db2", "E2"], 
  Bdim:["B1", "D2", "F2"], 
}

var bass_chord2key = {
  F:"F1", 
  "F#":"Gb1", 
  Gb:"Gb1", 
  G:"G1", 
  "G#":"Ab1", 
  Ab:"Ab1", 
  A:"A1", 
  "A#":"Bb1", 
  Bb:"Bb1", 
  B:"B1", 
  C:"C2", 
  "C#":"Db2", 
  Db:"Db2", 
  D:"D2", 
  "D#":"Eb2", 
  Eb:"Eb2", 
  E:"E2"
}

var key_board_note = {
    C2:1, 
    D2:1, 
    E2:1, 
    F2:1, 
    G2:1, 
    A2:1, 
    B2:1, 
    Db2:1, 
    Eb2:1, 
    Gb2:1, 
    Ab2:1, 
    Bb2:1
}

var key2number = {
    C:0, 
    Db:1, 
    D:2, 
    Eb:3, 
    E:4, 
    F:5, 
    Gb:6, 
    G:7, 
    Ab:8, 
    A:9, 
    Bb:10, 
    B:11
}







var current_assistant = "none";



// 子ウインドウを消すとき，親のPIANOフラグを消す
window.addEventListener('beforeunload',  function(e) {
  chrome.tabs.query({url:parentURL}, function(results){
    chrome.tabs.sendMessage(results[0].id, 
                            {from: 'piano', subject: 'closePIANO'}, 
                            function () {
                            });
  });
}, false);


function request_play(){
  chrome.tabs.query({url:parentURL}, function(results){
    chrome.tabs.sendMessage(results[0].id, 
                            {from: 'piano', subject: 'playChord'}, 
                            function (response) {
                                console.log("PLAY");
                            });
  });
}


$(document).on("click", "#play_pause", function(){
    chrome.tabs.query({url:parentURL}, function(results){
        chrome.tabs.sendMessage(results[0].id, 
                                {from: 'piano', subject: 'get_play_status'}, 
                                function (response) {
                                    if (response.paused == true){
                                        chrome.tabs.sendMessage(results[0].id, 
                                                                {from: 'piano', subject: 'play_yt'}, 
                                                                function (response) {
                                                                    console.log("PLAY");
                                                                });
                                    }else{
                                        chrome.tabs.sendMessage(results[0].id, 
                                                                {from: 'piano', subject: 'pause_yt'}, 
                                                                function (response) {
                                                                    console.log("PAUSE");
                                                                });
                                    }
                                });
  });
});




//コードアシストの鍵盤位置を計算する
function get_assist_chord(t_keys){  
    if (current_assistant == "none"){
        return t_keys
    }else if (current_assistant == "4"){
        return t_keys
    }else if (current_assistant == "3"){
        return t_keys.slice(0, 3);
    }else if (current_assistant == "2"){
        var new_keys =[];
        for (var i in t_keys){
            if (key_board_note[t_keys[i]] == 1){
                new_keys.push(t_keys[i]);
                if (new_keys.length == 2){
                    break;
                }
            }
        }
        return new_keys;
    }else if (current_assistant == "1"){
        for (var i in t_keys){
            if (key_board_note[t_keys[i]] == 1){
                return [t_keys[i]];
            }
        }
    }
}





//イベント
var parentURL;
var first_load = true;
var piano_id;
var _chords = [];
var video_duration = 0;
var on_chord = [];
var keys = [];
var light_keys = [];
var _current_chord_keys = [];
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse){
  // 鍵盤を光らせる
  if ((request.from ==='content') && (request.subject === 'chord_idx') && (request.piano_id === piano_id)){
    // 現在コード(アシスト)
    var temp_name = _chords[request.chord_idx].name;
    if (temp_name == "N"){
        $("#chord_name").text("-");
    }else{
        $("#chord_name").text(temp_name);
    }
    if (temp_name.split())
    var current_chord_keys = [];
    if (temp_name.split("/").length == 1){
      current_chord_keys = chord2key[temp_name];
    }else{
      for (var i in chord2key[temp_name.split("/")[0]]){
        current_chord_keys.push(chord2key[temp_name.split("/")[0]][i]);
      }
      current_chord_keys.push(bass_chord2key[temp_name.split("/")[1]]);
    }
    var all_keys = current_chord_keys.concat();
    current_chord_keys = get_assist_chord(current_chord_keys);

    if (on_chord.length > 0){
    //  MIDI.chordOff(0, on_chord, 0);    //TODO
    }
    on_chord = [];
    var oct = Number($("#r_octave").val());
    for (var i=0; i<all_keys.length; i++){
      on_chord.push(MIDI.keyToNote[all_keys[i]]+(12*(oct+1)));
    }
    if (on_chord.length > 0){
    //  MIDI.chordOn(0, on_chord, 64, 0);   //TODO
    }


    // 現在コード(アシスト)
    _current_chord_keys = [];
    for (var i in current_chord_keys){
        _current_chord_keys.push(key2number[current_chord_keys[i].slice(0, -1)]);
    }
    
    // 予測コード
    var chord_name = _chords[request.chord_idx+1].name;   // TODO ここを+1すると予測になる
    if (chord_name == "N"){
        $("#next_chord_name").text("-");
    }else{
        $("#next_chord_name").text(chord_name);
    }
    keys = [];
    if (chord_name.split("/").length == 1){
      keys = chord2key[chord_name];
    }else{
      for (var i in chord2key[chord_name.split("/")[0]]){
        keys.push(chord2key[chord_name.split("/")[0]][i]);
      }
      keys.push(bass_chord2key[chord_name.split("/")[1]]);
    }

    light_keys = get_assist_chord(keys);
    $(".wkey").removeClass("keyPredict");
    $(".bkey").removeClass("keyPredict");
    for (var i=0; i<light_keys.length; i++){
      $("#"+light_keys[i]).addClass("keyPredict");
    }
  }
  // 再生位置の変更と再生
  else if ((request.from ==='content') && (request.subject === 'play') && (request.piano_id === piano_id)){
    var duration = String(request.duration*1000 - request.currentTime*1000) + "ms";
    var current_pix = String(-1*((request.duration*1000-request.currentTime*1000)*bairitu-$("#p_notes").height())) + "px";
    var aim_pix = String($("#p_notes").height()) +"px";
    //キーブレームアニメーションの定義
    var a3d_define = {
        frames:{
            "0%":
                {
                trans:{"y":current_pix}
            },
            "100%":
                {
                trans:{"y":aim_pix}
            }
        }             
        ,
    config:{
        duration:duration,
        state:"running",
        easing:"linear"
    }
    };
    //アニメーションの実行
    $(".note_line").a3d(a3d_define); 
    if (request.paused == true){
        $(".note_line").a3dstate("paused"); 
    }

  }
  // IDの登録
  else if ((request.from ==='content') && (request.subject === 'saveParentPIANO')){
    if (first_load == true){
      parentURL = request.parentURL;
      piano_id = request.piano_id;
      first_load = false;
      document.title = 'PIANO - ' + request.title;
      video_duration = request.duration*1000;
      _chords = request.chord;
      draw_chord(_chords);
    $("#piano_bg")
    .css("background", "url(" + "https://i.ytimg.com/vi/" + request.movieId + "/hqdefault.jpg" + ") no-repeat center")
    .css("background-size", "cover");
    //request_play();
    }
  }
  // コードを止める
  else if ((request.from ==='content') && (request.subject === 'pausePIANO')){
    if (parentURL == request.parentURL){
        $(".note_line").a3dstate("paused"); 
    }
  }
  // 窓を閉じる
  else if ((request.from ==='content') && (request.subject === 'closePIANO')){
    if (parentURL == request.parentURL){
      window.close();
    }
  }
  // IDを登録し直す
  else if ((request.from ==='content') && (request.subject === 'resetParentPIANO') && (request.piano_id === piano_id)){
    document.title = 'PIANO - ' + request.title;
    parentURL = request.parentURL;
    console.log(request.duration);
    video_duration = request.duration*1000;
    _chords = request.chord;
    draw_chord(_chords);
    console.log(request.movieId);
    $("#piano_bg")
    .css("background", "url(" + "https://i.ytimg.com/vi/" + request.movieId + "/hqdefault.jpg" + ") no-repeat center")
    .css("background-size", "cover");
    //request_play();
  }
});

var bairitu = 0.1;

function draw_chord(chords){
    console.log("DRAW CHORD");
    console.log(video_duration);
    console.log(chords.length);
    $(".note").remove();
    $(".wkey").removeClass("keyPredict");
    $(".bkey").removeClass("keyPredict");
    $(".note_line").css("height", video_duration*bairitu + $("#p_notes").height());

    for (var x=0; x<chords.length; x++){
        var chord_name = chords[x].name;
        if (chord_name == "N"){
            continue;
        }
        var temp = chord_name.split("/");
        var t_keys = [];
        for (var i in chord2key[temp[0]]){
            t_keys.push(chord2key[temp[0]][i]);
        }
        if (temp.length == 2){
            t_keys.push(bass_chord2key[temp[1]]);
        }


        t_keys = get_assist_chord(t_keys);


        for (var j in t_keys){
            $("<div/>").addClass("note")
            .css("height", chords[x].duration*bairitu-2)
            .css("top", (video_duration-chords[x].start-chords[x].duration)*bairitu+2)
            .appendTo($("#n_"+t_keys[j]));
        }
    }
}






MIDI.loadPlugin({
  instruments: [ "acoustic_grand_piano", "acoustic_guitar_nylon", "clarinet", "electric_bass_pick", "english_horn", "flute", "overdriven_guitar", "shamisen", "string_ensemble_1", "synth_bass_2", "violin"], // or multiple instruments
  onprogress: function(state, progress) {
  },
  onsuccess: function() {
    MIDI.setVolume(0, 127);
    navigator.requestMIDIAccess({sysex : true}).then(successCallback,  errorCallback);

    $("select#tone_type").change(function() {
      MIDI.programChange(0, MIDI.GM.byName[$(this).val()].number);
    });

    $(document).on("click", "#oc_down", function(){
      $("#r_octave").val(Number($("#r_octave").val())-1);
    });
    $(document).on("click", "#oc_up", function(){
      $("#r_octave").val(Number($("#r_octave").val())+1);
    });

    $(document).on("input", "#r_volume", function(){
      masterVolume = this.value;
    });

  }
});


var sustain_f = false;
var on_notes = new Set();
var non_off_notes = new Set();
var assist_on_note;

var successCallback = function(midiAccess) {
  var inputs  = [];
  var outputs = [];
  if (typeof midiAccess === 'function') {
    // Legacy Chrome
    inputs  = midiAccess.inputs();
    outputs = midiAccess.outputs();
  } else {
    // Chrome 39 and later
    var inputIterator  = midiAccess.inputs.values();
    var outputIterator = midiAccess.outputs.values();
    for (var i = inputIterator.next(); !i.done; i = inputIterator.next()) {
      inputs.push(i.value);
    }
    for (var o = outputIterator.next(); !o.done; o = outputIterator.next()) {
      outputs.push(o.value);
    }
  }

  inputs.forEach(function(element, index) {
    var option = document.createElement('option');
    option.appendChild(document.createTextNode(element.name));
    option.setAttribute('value', index);
    document.getElementById('hard').appendChild(option);
  });

  document.getElementById('hard').onchange = function() {
    inputs.forEach(function(input) {
      input.onmidimessage = null;
    });
    if (this.value === '') {
      return;
    }
    inputs[this.value].onmidimessage = function(event) {
        console.log(event.data);
      switch (event.data[0]) {
        case 144 :
          var key_name = MIDI.noteToKey[event.data[1]];
          var oct = Number($("#r_octave").val())+2;
          var key_head = key_name.slice(0, key_name.length-1);
          var key_tail = Number(key_name.slice(key_name.length-1)) - oct;
          $("#"+key_head+key_tail).addClass("keydown");


          if (current_assistant == "none"){
            noteOn(event.data[1], event.data[2]);
            on_notes.add(event.data[1]);
            non_off_notes.add(event.data[1]);
          }
          else if(playing_chord == false && in_chord(event.data[1])) {
              if (on_chord.length > 0){
                  old_chord = on_chord.concat();
                  MIDI.chordOn(0, old_chord, event.data[2], 0);   //TODO
                  assist_on_note = event.data[1];
                  playing_chord = true;         //TODO サステイン
              }
          }

          break;
        case 128 :
          on_notes.delete(event.data[1]);
          if (sustain_f == false){

            var key_name = MIDI.noteToKey[event.data[1]];
            var oct = Number($("#r_octave").val())+2;
            var key_head = key_name.slice(0, key_name.length-1);
            var key_tail = Number(key_name.slice(key_name.length-1)) - oct;
            $("#"+key_head+key_tail).removeClass("keydown");

            if (current_assistant == "none"){
                noteOff(event.data[1], event.data[2]);
                non_off_notes.delete(event.data[1]);
            }
            else if(playing_chord == true) {
                if (old_chord.length > 0 && assist_on_note == event.data[1]){
                    MIDI.chordOff(0, old_chord, 0);    //TODO
                    playing_chord = false;
                }
            }
          }
          break;
      case 176 :
          if (event.data[1] == 64){
              if (event.data[2] == 0){      // vocal
                  chrome.tabs.query({url:parentURL}, function(results){
                      chrome.tabs.sendMessage(results[0].id, 
                                              {from: 'piano', subject: 'vocal_cancel_off'}, 
                                              function (response) {
                                              });
                  });
              }else{        // vocal chancel
                  chrome.tabs.query({url:parentURL}, function(results){
                      chrome.tabs.sendMessage(results[0].id, 
                                              {from: 'piano', subject: 'vocal_cancel_on'}, 
                                              function (response) {
                                              });
                  });
              }
          }else if (event.data[1] == 7){
              MIDI.setVolume(0, event.data[2]);
          }else if ((event.data[1] == 114 || event.data[1] == 115) && event.data[2] == 127){
              chrome.tabs.query({url:parentURL}, function(results){
                  chrome.tabs.sendMessage(results[0].id, 
                                          {from: 'piano', subject: 'get_play_status'}, 
                                          function (response) {
                                              if (response.paused == true){
                                                  chrome.tabs.sendMessage(results[0].id, 
                                                                          {from: 'piano', subject: 'play_yt'}, 
                                                                          function (response) {
                                                                              console.log("PLAY");
                                                                          });
                                              }else{
                                                  chrome.tabs.sendMessage(results[0].id, 
                                                                          {from: 'piano', subject: 'pause_yt'}, 
                                                                          function (response) {
                                                                              console.log("PAUSE");
                                                                          });
                                              }
                                          });
              });
          }
          break;
      default :
          break;
      }
    };
  };
};


var allowed_A = true; //65
var allowed_W = true; //87
var allowed_S = true; //83
var allowed_E = true; //69
var allowed_D = true; //68
var allowed_F = true; //70
var allowed_T = true; //84
var allowed_G = true; //71
var allowed_Y = true; //89
var allowed_H = true; //72
var allowed_U = true; //85
var allowed_J = true; //74



var playing_chord = false;
var old_chord = [];
$(document).on("keydown",  function(event){  // 長さはあまり変わらないがわかりやすくなった気がする
    //console.log(event.which);
    if (event.which == 65){
        if(allowed_A) {
            allowed_A = false;
            var oct = Number($("#r_octave").val());
            if (current_assistant == "none"){
                noteOn(60+(oct*12), 64);
            }
            else if(playing_chord == false && in_chord(60+(oct*12))) {
                if (on_chord.length > 0){
                    old_chord = on_chord.concat();
                    MIDI.chordOn(0, old_chord, 64, 0);   //TODO
                    playing_chord = true;
                }
            }
            $("#C2").addClass("keydown");
        }
    }
    else if (event.which == 87){
        if(allowed_W) {
            allowed_W = false;
            var oct = Number($("#r_octave").val());
            if (current_assistant == "none"){
                noteOn(61+(oct*12), 64);
            }
            else if(playing_chord == false && in_chord(61+(oct*12))) {
                if (on_chord.length > 0){
                    old_chord = on_chord.concat();
                    MIDI.chordOn(0, old_chord, 64, 0);   //TODO
                    playing_chord = true;
                }
            }
            $("#Db2").addClass("keydown");
        }
    }
    else if (event.which == 83){
        if(allowed_S) {
            allowed_S = false;
            var oct = Number($("#r_octave").val());
            if (current_assistant == "none"){
                noteOn(62+(oct*12), 64);
            }
            else if(playing_chord == false && in_chord(62+(oct*12))) {
                if (on_chord.length > 0){
                    old_chord = on_chord.concat();
                    MIDI.chordOn(0, old_chord, 64, 0);   //TODO
                    playing_chord = true;
                }
            }
            $("#D2").addClass("keydown");
        }
    }
    else if (event.which == 69){
        if(allowed_E) {
            allowed_E = false;
            var oct = Number($("#r_octave").val());
            if (current_assistant == "none"){
                noteOn(63+(oct*12), 64);
            }
            else if(playing_chord == false && in_chord(63+(oct*12))) {
                if (on_chord.length > 0){
                    old_chord = on_chord.concat();
                    MIDI.chordOn(0, old_chord, 64, 0);   //TODO
                    playing_chord = true;
                }
            }
            $("#Eb2").addClass("keydown");
        }
    }
    else if (event.which == 68){
        if(allowed_D) {
            allowed_D = false;
            var oct = Number($("#r_octave").val());
            if (current_assistant == "none"){
                noteOn(64+(oct*12), 64);
            }
            else if(playing_chord == false && in_chord(64+(oct*12))) {
                if (on_chord.length > 0){
                    old_chord = on_chord.concat();
                    MIDI.chordOn(0, old_chord, 64, 0);   //TODO
                    playing_chord = true;
                }
            }
            $("#E2").addClass("keydown");
        }
    }
    else if (event.which == 70){
        if(allowed_F) {
            allowed_F = false;
            var oct = Number($("#r_octave").val());
            if (current_assistant == "none"){
                noteOn(65+(oct*12), 64);
            }
            else if(playing_chord == false && in_chord(65+(oct*12))) {
                if (on_chord.length > 0){
                    old_chord = on_chord.concat();
                    MIDI.chordOn(0, old_chord, 64, 0);   //TODO
                    playing_chord = true;
                }
            }
            $("#F2").addClass("keydown");
        }
    }
    else if (event.which == 84){
        if(allowed_T) {
            allowed_T = false;
            var oct = Number($("#r_octave").val());
            if (current_assistant == "none"){
                noteOn(66+(oct*12), 64);
            }
            else if(playing_chord == false && in_chord(66+(oct*12))) {
                if (on_chord.length > 0){
                    old_chord = on_chord.concat();
                    MIDI.chordOn(0, old_chord, 64, 0);   //TODO
                    playing_chord = true;
                }
            }
            $("#Gb2").addClass("keydown");
        }
    }
    else if (event.which == 71){
        if(allowed_G) {
            allowed_G = false;
            var oct = Number($("#r_octave").val());
            if (current_assistant == "none"){
                noteOn(67+(oct*12), 64);
            }
            else if(playing_chord == false && in_chord(67+(oct*12))) {
                if (on_chord.length > 0){
                    old_chord = on_chord.concat();
                    MIDI.chordOn(0, old_chord, 64, 0);   //TODO
                    playing_chord = true;
                }
            }
            $("#G2").addClass("keydown");
        }
    }
    else if (event.which == 89){
        if(allowed_Y) {
            allowed_Y = false;
            var oct = Number($("#r_octave").val());
            if (current_assistant == "none"){
                noteOn(68+(oct*12), 64);
            }
            else if(playing_chord == false && in_chord(68+(oct*12))) {
                if (on_chord.length > 0){
                    old_chord = on_chord.concat();
                    MIDI.chordOn(0, old_chord, 64, 0);   //TODO
                    playing_chord = true;
                }
            }
            $("#Ab2").addClass("keydown");
        }
    }
    else if (event.which == 72){
        if(allowed_H) {
            allowed_H = false;
            var oct = Number($("#r_octave").val());
            if (current_assistant == "none"){
                noteOn(69+(oct*12), 64);
            }
            else if(playing_chord == false && in_chord(69+(oct*12))) {
                if (on_chord.length > 0){
                    old_chord = on_chord.concat();
                    MIDI.chordOn(0, old_chord, 64, 0);   //TODO
                    playing_chord = true;
                }
            }
            $("#A2").addClass("keydown");
        }
    }
    else if (event.which == 85){
        if(allowed_U) {
            allowed_U = false;
            var oct = Number($("#r_octave").val());
            if (current_assistant == "none"){
                noteOn(70+(oct*12), 64);
            }
            else if(playing_chord == false && in_chord(70+(oct*12))) {
                if (on_chord.length > 0){
                    old_chord = on_chord.concat();
                    MIDI.chordOn(0, old_chord, 64, 0);   //TODO
                    playing_chord = true;
                }
            }
            $("#Bb2").addClass("keydown");
        }
    }
    else if (event.which == 74){
        if(allowed_J) {
            allowed_J = false;
            var oct = Number($("#r_octave").val());
            if (current_assistant == "none"){
                noteOn(71+(oct*12), 64);
            }
            else if(playing_chord == false && in_chord(71+(oct*12))) {
                if (on_chord.length > 0){
                    old_chord = on_chord.concat();
                    MIDI.chordOn(0, old_chord, 64, 0);   //TODO
                    playing_chord = true;
                }
            }
            $("#B2").addClass("keydown");
        }
    }
    else if (event.which == 32){        // vocal chancel
        chrome.tabs.query({url:parentURL}, function(results){
            chrome.tabs.sendMessage(results[0].id, 
                    {from: 'piano', subject: 'vocal_cancel_on'}, 
                    function (response) {
                    });
        });
    }
});

$(document).on("keyup",  function(event){  // 長さはあまり変わらないがわかりやすくなった気がする
    console.log(event.which);
    if (event.which == 65){
        allowed_A = true;
        var oct = Number($("#r_octave").val());
        if (current_assistant == "none"){
            noteOff(60+(oct*12), 0);
        }
        else if(playing_chord == true) {
            if (old_chord.length > 0){
                MIDI.chordOff(0, old_chord, 0);    //TODO
                playing_chord = false;
            }
        }
        $("#C2").removeClass("keydown");
    }
    else if (event.which == 87){
        allowed_W = true;
        var oct = Number($("#r_octave").val());
        if (current_assistant == "none"){
            noteOff(61+(oct*12), 0);
        }
        else if(playing_chord == true) {
            if (old_chord.length > 0){
                MIDI.chordOff(0, old_chord, 0);    //TODO
                playing_chord = false;
            }
        }
        $("#Db2").removeClass("keydown");
    }
    else if (event.which == 83){
        allowed_S = true;
        var oct = Number($("#r_octave").val());
        if (current_assistant == "none"){
            noteOff(62+(oct*12), 0);
        }
        else if(playing_chord == true) {
            if (old_chord.length > 0){
                MIDI.chordOff(0, old_chord, 0);    //TODO
                playing_chord = false;
            }
        }
        $("#D2").removeClass("keydown");
    }
    else if (event.which == 69){
        allowed_E = true;
        var oct = Number($("#r_octave").val());
        if (current_assistant == "none"){
            noteOff(63+(oct*12), 0);
        }
        else if(playing_chord == true) {
            if (old_chord.length > 0){
                MIDI.chordOff(0, old_chord, 0);    //TODO
                playing_chord = false;
            }
        }
        $("#Eb2").removeClass("keydown");
    }
    else if (event.which == 68){
        allowed_D = true;
        var oct = Number($("#r_octave").val());
        if (current_assistant == "none"){
            noteOff(64+(oct*12), 0);
        }
        else if(playing_chord == true) {
            if (old_chord.length > 0){
                MIDI.chordOff(0, old_chord, 0);    //TODO
                playing_chord = false;
            }
        }
        $("#E2").removeClass("keydown");
    }
    else if (event.which == 70){
        allowed_F = true;
        var oct = Number($("#r_octave").val());
        if (current_assistant == "none"){
            noteOff(65+(oct*12), 0);
        }
        else if(playing_chord == true) {
            if (old_chord.length > 0){
                MIDI.chordOff(0, old_chord, 0);    //TODO
                playing_chord = false;
            }
        }
        $("#F2").removeClass("keydown");
    }
    else if (event.which == 84){
        allowed_T = true;
        var oct = Number($("#r_octave").val());
        if (current_assistant == "none"){
            noteOff(66+(oct*12), 0);
        }
        else if(playing_chord == true) {
            if (old_chord.length > 0){
                MIDI.chordOff(0, old_chord, 0);    //TODO
                playing_chord = false;
            }
        }
        $("#Gb2").removeClass("keydown");
    }
    else if (event.which == 71){
        allowed_G = true;
        var oct = Number($("#r_octave").val());
        if (current_assistant == "none"){
            noteOff(67+(oct*12), 0);
        }
        else if(playing_chord == true) {
            if (old_chord.length > 0){
                MIDI.chordOff(0, old_chord, 0);    //TODO
                playing_chord = false;
            }
        }
        $("#G2").removeClass("keydown");
    }
    else if (event.which == 89){
        allowed_Y = true;
        var oct = Number($("#r_octave").val());
        if (current_assistant == "none"){
            noteOff(68+(oct*12), 0);
        }
        else if(playing_chord == true) {
            if (old_chord.length > 0){
                MIDI.chordOff(0, old_chord, 0);    //TODO
                playing_chord = false;
            }
        }
        $("#Ab2").removeClass("keydown");
    }
    else if (event.which == 72){
        allowed_H = true;
        var oct = Number($("#r_octave").val());
        if (current_assistant == "none"){
            noteOff(69+(oct*12), 0);
        }
        else if(playing_chord == true) {
            if (old_chord.length > 0){
                MIDI.chordOff(0, old_chord, 0);    //TODO
                playing_chord = false;
            }
        }
        $("#A2").removeClass("keydown");
    }
    else if (event.which == 85){
        allowed_U = true;
        var oct = Number($("#r_octave").val());
        if (current_assistant == "none"){
            noteOff(70+(oct*12), 0);
        }
        else if(playing_chord == true) {
            if (old_chord.length > 0){
                MIDI.chordOff(0, old_chord, 0);    //TODO
                playing_chord = false;
            }
        }
        $("#Bb2").removeClass("keydown");
    }
    else if (event.which == 74){
        allowed_J = true;
        var oct = Number($("#r_octave").val());
        if (current_assistant == "none"){
            noteOff(71+(oct*12), 0);
        }
        else if(playing_chord == true) {
            if (old_chord.length > 0){
                MIDI.chordOff(0, old_chord, 0);    //TODO
                playing_chord = false;
            }
        }
        $("#B2").removeClass("keydown");
    }
    else if (event.which == 32){        // vocal chancel
        chrome.tabs.query({url:parentURL}, function(results){
            chrome.tabs.sendMessage(results[0].id, 
                    {from: 'piano', subject: 'vocal_cancel_off'}, 
                    function (response) {
                    });
        });
    }
});


function in_chord(note_num){
    for (var i in _current_chord_keys){
        if ((note_num+12)%12 == _current_chord_keys[i]){
            return true;
        }
    }
    return false;
}



var errorCallback = function(error) {
  console.dir(error);
};


var noteOn = function(noteNumber, velocity) {
  MIDI.noteOn(0, noteNumber, velocity, 0);
}

var noteOff = function(noteNumber, velocity) {
  MIDI.noteOff(0, noteNumber, 0);
}



// アシスト機能の変更
$(document).on("click", "#f_1>.fin_button", function(){
    if ($("#f_1>.fin_light").hasClass("sel")){
        $("#f_1>.fin_light").removeClass("sel");
        current_assistant = "none";
    }else{
        $(".fin_light.sel").removeClass("sel");
        $("#f_1>.fin_light").addClass("sel");
        current_assistant = "1";
    }
    draw_chord(_chords);
});
$(document).on("click", "#f_2>.fin_button", function(){
    if ($("#f_2>.fin_light").hasClass("sel")){
        $("#f_2>.fin_light").removeClass("sel");
        current_assistant = "none";
    }else{
        $(".fin_light.sel").removeClass("sel");
        $("#f_2>.fin_light").addClass("sel");
        current_assistant = "2";
    }
    draw_chord(_chords);
});
$(document).on("click", "#f_3>.fin_button", function(){
    if ($("#f_3>.fin_light").hasClass("sel")){
        $("#f_3>.fin_light").removeClass("sel");
        current_assistant = "none";
    }else{
        $(".fin_light.sel").removeClass("sel");
        $("#f_3>.fin_light").addClass("sel");
        current_assistant = "3";
    }
    draw_chord(_chords);
});
$(document).on("click", "#f_4>.fin_button", function(){
    if ($("#f_4>.fin_light").hasClass("sel")){
        $("#f_4>.fin_light").removeClass("sel");
        current_assistant = "none";
    }else{
        $(".fin_light.sel").removeClass("sel");
        $("#f_4>.fin_light").addClass("sel");
        current_assistant = "4";
    }
    draw_chord(_chords);
});







// ウィンドウのサイズを変えた時の調整
window.addEventListener( 'resize', onWindowResize, false );

function onWindowResize() {
    draw_chord(_chords);
    chrome.tabs.query({url:parentURL}, function(results){
        chrome.tabs.sendMessage(results[0].id, {from: 'piano', subject: 'get_play_status'}, function (response) {
            var duration = String(response.duration*1000 - response.currentTime*1000) + "ms";
            var current_pix = String(-1*((response.duration*1000-response.currentTime*1000)*bairitu-$("#p_notes").height())) + "px";
            var aim_pix = String($("#p_notes").height()) +"px";
            //キーブレームアニメーションの定義
            var a3d_define = {
                frames:{
                    "0%":
                        {
                            trans:{"y":current_pix}
                        },
                        "100%":
                            {
                                trans:{"y":aim_pix}
                            }
                },
                config:{
                    duration:duration,
                    state:"running",
                    easing:"linear"
                }
            };
            //アニメーションの実行
            $(".note_line").a3d(a3d_define); 
            if (response.paused == true){
                $(".note_line").a3dstate("paused");
            }
        });
    });
}








