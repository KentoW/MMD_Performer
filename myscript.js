var first_load_f = true;
var context;
var videoEl;
var source;
var analyser;
var dry, wet;
var _bass, _middle, _treble;
var processor;
var xhr;
var url;

// Web Audio API
function load_web_audio_api(){
    window.AudioContext = window.AudioContext || window.webkitAudioContext;
    context = new AudioContext();

    // for selecting optimized buffer size
    var getBufferSize = function() {
        if (/(Win(dows )?NT 6\.2)/.test(navigator.userAgent)) {
            return 1024;  // Windows 8
        } else if (/(Win(dows )?NT 6\.1)/.test(navigator.userAgent)) {
            return 1024;  // Windows 7
        } else if (/(Win(dows )?NT 6\.0)/.test(navigator.userAgent)) {
            return 2048;  // Windows Vista
        } else if (/Win(dows )?(NT 5\.1|XP)/.test(navigator.userAgent)) {
            return 4096;  // Windows XP
        } else if (/Mac|PPC/.test(navigator.userAgent)) {
            return 2048;  // Mac OS X
        } else if (/Linux/.test(navigator.userAgent)) {
            return 8192;  // Linux
        } else if (/iPhone|iPad|iPod/.test(navigator.userAgent)) {
            return 2048;  // iOS
        } else {
            return 16384;  // Otherwise
        }
    };

    processor = context.createScriptProcessor(getBufferSize(), 2, 2);
    videoEl = document.querySelector('video');
    source;
    dry, wet;
    _bass, _middle, _treble;
    xhr = new XMLHttpRequest();
    url = chrome.extension.getURL('audio/Impulse.wav');
    xhr.responseType = 'arraybuffer';
    xhr.onload = function() {
        if (xhr.status === 200) {
            var arrayBuffer = xhr.response;
            if (arrayBuffer instanceof ArrayBuffer) {
                // The 2nd argument for decodeAudioData
                var successCallback = function(audioBuffer) {
                    source = context.createMediaElementSource(videoEl);
                    // EQ
                    // Create the instance of BiquadFilterNode
                    _bass   = context.createBiquadFilter();
                    _middle = context.createBiquadFilter();
                    _treble = context.createBiquadFilter();
                    // Set type
                    _bass.type   = (typeof _bass.type   === 'string') ? 'lowshelf'  : 3;
                    _middle.type = (typeof _middle.type === 'string') ? 'peaking'   : 5;
                    _treble.type = (typeof _treble.type === 'string') ? 'highshelf' : 4;
                    // Set frequency
                    _bass.frequency.value   =  500;  //  500 Hz
                    _middle.frequency.value = 1000;  // 1000 Hz
                    _treble.frequency.value = 2000;  // 2000 Hz
                    // Set Q (Quality Factor)
                    _middle.Q.value = Math.SQRT1_2;
                    // Set EQ
                    _bass.gain.value   =  11;
                    _middle.gain.value = 7;
                    _treble.gain.value =  18;  
                    // REVERB
                    var convolver = context.createConvolver();
                    convolver.buffer = audioBuffer;
                    context.createGain = context.createGain || context.createGainNode;
                    // Create the instance of GainNode
                    dry = context.createGain();  // for gain of original sound
                    wet = context.createGain();  // for gain of effect (Revreb) sound
                    // Set parameters
                    dry.gain.value = 1.0;
                    wet.gain.value = 0.5;
                    // Connect vocal cancel
                    source.connect(processor);
                    // Connect original source
                    processor.connect(_bass);
                    _bass.connect(_middle);
                    _middle.connect(_treble);
                    _treble.connect(dry);
                    dry.connect(context.destination);
                    // Connect reverbed source
                    _treble.connect(convolver);
                    convolver.connect(wet);
                    wet.connect(context.destination);

                    depth = 0.0;
                    processor.onaudioprocess = function(event) {
                        // Get the instance of Float32Array for input data (Array size equals buffer size)
                        var inputLs = event.inputBuffer.getChannelData(0);  // Left  channel
                        var inputRs = event.inputBuffer.getChannelData(1);  // Right channel
                        // Get the instance of Float32Array for output data (Array size equals buffer size)
                        var outputLs = event.outputBuffer.getChannelData(0);  // Left  channel
                        var outputRs = event.outputBuffer.getChannelData(1);  // Right channel
                        // Cancel Vocal
                        for (var i = 0; i < this.bufferSize; i++) {
                            outputLs[i] = inputLs[i] - (depth * inputRs[i]);
                            outputRs[i] = inputRs[i] - (depth * inputLs[i]);
                        }
                    };
                };
                // The 3rd argument for decodeAudioData
                var errorCallback = function(error) {
                    if (error instanceof Error) {
                        window.alert(error.message);
                    } else {
                        window.alert('Error : "decodeAudioData" method.');
                    }
                };
                // Create the instance of AudioBuffer (Asynchronously)
                context.decodeAudioData(arrayBuffer, successCallback, errorCallback);
            }
        }
    };
    xhr.open('GET', url, true);
    xhr.send(null);

    // Video Event
    videoEl.onloadstart = function() {      // videoがロードし始めたら(都合の良いことに2番目からのビデオしか反映されない)
        console.log("LOAD START");
        if (mmd_status){
            chrome.runtime.sendMessage({
                from:    'content', 
                subject: 'cancel_motion', 
                parentURL: window.location.href
            });
        }
        setTimeout("videoEl.pause();", 100);
        setTimeout("videoEl.currentTime = 0;", 2000);
        setTimeout("reset_mmd();", 2000);
        setTimeout("reset_piano();", 2000);
    };
    videoEl.onended = function() {
        if (mmd_status){
            chrome.runtime.sendMessage({
                from:    'content', 
                subject: 'playMotion', 
                parentURL: window.location.href
            });
        }
    };
    videoEl.onplay = function() {
        set_chord_schedule();
        console.log("PLAY");
        if (mmd_status){
            chrome.runtime.sendMessage({
                from:    'content', 
                subject: 'playMotion', 
                parentURL: window.location.href
            });
        }
    };
    videoEl.onpause = function() {
        clear_chord_schedule();
        console.log("PAUSE");
        if (mmd_status){
            chrome.runtime.sendMessage({
                from:    'content', 
                subject: 'pauseMotion', 
                parentURL: window.location.href
            });
        }
        if (piano_status){
            chrome.runtime.sendMessage({
                from:    'content', 
                subject: 'pausePIANO', 
                parentURL: window.location.href
            });
        }
    };
    videoEl.onseeked = function() {
        if(videoEl.paused == true){
            clear_chord_schedule();
            send_current();
            if (piano_status){
                chrome.runtime.sendMessage({
                    from:    'content', 
                    subject: 'pausePIANO', 
                    parentURL: window.location.href
                });
            }
        }else{
            set_chord_schedule();
            send_current();
        }
        console.log("SEEKED");
    };
    videoEl.onplaying = function() {
        set_chord_schedule();
        send_current();
        console.log("PLAYING");
        if (mmd_status){
            chrome.runtime.sendMessage({
                from:    'content', 
                subject: 'playMotion', 
                parentURL: window.location.href
            });
        }
    };
    videoEl.onwaiting = function() {
        clear_chord_schedule();
        console.log("WAITING");
        if (mmd_status){
            chrome.runtime.sendMessage({
                from:    'content', 
                subject: 'pauseMotion', 
                parentURL: window.location.href
            });
        }
        if (piano_status){
            chrome.runtime.sendMessage({
                from:    'content', 
                subject: 'pausePIANO', 
                parentURL: window.location.href
            });
        }
    };
    videoEl.ontimeupdate = function(){
        var cTime_ratio = videoEl.currentTime/videoEl.duration
        //var line_position = cTime_ratio*$("#play_position_field").width();
        $("#play_position").css("left", String(cTime_ratio*100)+"%");
    };
}

// Animation
var _animationID;
function update(){
    var mfccs = getMFCCs({
        minFreq: 0, 
        maxFreq: 8000, 
        filterBanks: 25
    });
    if(mfccs.length) {
        mfccs = mfccs.slice(0, 25);
        var position = normalize(mfccs);
        var vowel_result = get_vowel(position);
        if (vowel_result && mmd_status){
            chrome.runtime.sendMessage({
                from:    'content', 
                subject: 'sendVowel', 
                parentURL: window.location.href, 
                vowel: vowel_result
            });
        }
    }
    _animationID = requestAnimationFrame(update);
}

// Vowel Estimation
function get_vowel(position){
    p1 = position[0];
    p2 = position[1];
    if (-0.09 <= p1 && p1 < 0.1 && 0.79 <= p2 && p2 < 1.03){
        return "お";
    }
    if (0.01 <= p1 && p1 < 0.16 && 0.8 <= p2 && p2 < 1.02){
        return "あ";
    }
    if (0.03 <= p1 && p1 < 0.19 && 0.77 <= p2 && p2 < 1.05){
        return "え";
    }
    if (0.05 <= p1 && p1 < 0.3 && 0.64 <= p2 && p2 < 0.9){
        return "い";
    }
    if (0.03 <= p1 && p1 < 0.26 && 0.94 <= p2 && p2 < 1.05){
        return "う";
    }
    return null;
}

// Append the Extend Player to HTML
var reload_flag = 0;
function write_html(){
    reload_flag = 0;
    // songleWidgetの埋め込み
    var songle_url = "www" + window.location.href.split("www").slice(1).join("www").split("&")[0];
    songle(songle_url, "#info-contents");
    get_chord(songle_url);      // コードの取得とscheduleのセット
    get_chorus(songle_url);      // コーラス(繰り返し)の取得とscheduleのセット
    // general panelの埋め込み
    control_panel("#info-contents");
    if (mmd_status == true){
        $("#mmd_control_light").addClass("sel");
    }
    if (piano_status == true){
        $("#piano_control_light").addClass("sel");
    }
}

// コード関係
var _chords = [];
function get_chord(url){
    $.ajax({
        type: "GET", 
        scriptCharset: 'utf-8', 
        dataType:'json',
        url: 'https://widget.songle.jp/api/v1/song/chord.json',
        data: {url: url}, 
        success: function(json){
            _chords = json.chords;
            set_chord_schedule();
        }, 
        error:function(){
            console.log("TODO エラー処理");
            _chords = [];
            clear_chord_schedule();
        }
    });
}

var chord_schedule = [];
function clear_chord_schedule(){
    for (var i=0; i<chord_schedule.length; i++){
        clearTimeout(chord_schedule[i]);    // まずはセットされたscheduleをすべて消す
    }
    chord_schedule = [];
}

function set_chord_schedule(){
    for (var i=0; i<chord_schedule.length; i++){
        clearTimeout(chord_schedule[i]);    // まずはセットされたscheduleをすべて消す
    }
    chord_schedule = [];
    for (var i=0; i<_chords.length; i++){
        var fire_time =_chords[i].start-(videoEl.currentTime*1000) - 300;         // TODO 誤差修正
        if (fire_time > 0){
            doSetTimeout_chord(i, fire_time);
        }
    }
}

function doSetTimeout_chord(i, fire_time) {
    chord_schedule.push(setTimeout(function(){fire_chord(i);}, fire_time));
}

function fire_chord(chords_id){
    if (piano_status == true){
        chrome.runtime.sendMessage({
            from:    'content', 
            subject: 'chord_idx', 
            parentURL: window.location.href, 
            piano_id: piano_id, 
            chord_idx: chords_id
        });
    }
}


// コーラス(繰り返し)関係
// 繰り返しの初めと終わりの時刻を_chorusesに入れる(ダンスの切り替えタイミング 例え時刻が近寄っていても，
// モーションの切替中は別のモーションに切り替えられないので大丈夫)
var _choruses = [];
function get_chorus(url){
    $.ajax({
        type: "GET", 
        scriptCharset: 'utf-8', 
        dataType:'json',
        url: 'https://widget.songle.jp/api/v1/song/chorus.json',
        data: {url: url}, 
        success: function(json){
            _choruses = [];
            for (var j=1; j<=5; j++){
                var normal_repeats = json.repeatSegments[j].repeats;
                for (var i in normal_repeats){
                    _choruses.push(normal_repeats[i].start);
                    _choruses.push(normal_repeats[i].start+normal_repeats[i].duration);
                }
            }
            set_chorus_schedule();
        }, 
        error:function(){
            console.log("TODO エラー処理");
            _choruses = [];
            clear_chorus_schedule();
        }
    });
}

var chorus_schedule = [];
function clear_chorus_schedule(){
    for (var i=0; i<chorus_schedule.length; i++){
        clearTimeout(chorus_schedule[i]);    // まずはセットされたscheduleをすべて消す
    }
    chorus_schedule = [];
}

function set_chorus_schedule(){
    for (var i=0; i<chorus_schedule.length; i++){
        clearTimeout(chorus_schedule[i]);    // まずはセットされたscheduleをすべて消す
    }
    chorus_schedule = [];
    for (var i=0; i<_choruses.length; i++){
        var fire_time =_choruses[i]-(videoEl.currentTime*1000);
        if (fire_time > 0){
            doSetTimeout_chorus(i, fire_time);
        }
    }
}

function doSetTimeout_chorus(i, fire_time) {
    chorus_schedule.push(setTimeout(function(){fire_chorus(i);}, fire_time));
}

function fire_chorus(choruss_id){
    if (mmd_status == true){
        chrome.runtime.sendMessage({
            from:    'content', 
            subject: 'changeMotion', 
            currentTime: videoEl.currentTime, 
            duration: videoEl.duration, 
            parentURL: window.location.href
        });
    }
}


// 子供にビデオの状態を送る
function send_current(){
    if (piano_status == true || mmd_status == true){
        chrome.runtime.sendMessage({
            from:    'content', 
            subject: 'play', 
            parentURL: window.location.href, 
            piano_id: piano_id, 
            mmd_id: mmd_id, 
            currentTime:videoEl.currentTime, 
            duration:videoEl.duration, 
            paused:videoEl.paused
        });
    }
}

// repeat機能
$(document).on("click", "#repeat_control_button", function(){
    var repeat_status = $("#repeat_control_light").hasClass("sel");
    if (repeat_status == true){
        videoEl.loop = false;
        $("#repeat_control_light").removeClass("sel");
    }else{
        videoEl.loop = true;
        $("#repeat_control_light").addClass("sel");
    }
});

// MMD機能
var mmd_status = false;
$(document).on("click", "#mmd_control_button", function(){
    if (mmd_status == true){
        mmd_status = false;
        cancelAnimationFrame(_animationID);
        $("#mmd_control_light").removeClass("sel");
        chrome.runtime.sendMessage({
            from:    'content', 
            subject: 'closeMMD', 
            parentURL: window.location.href
        });
    }else{
        mmd_status = true;
        _animationID = requestAnimationFrame(update);
        $("#mmd_control_light").addClass("sel");
        chrome.runtime.sendMessage({
            from:    'content', 
            subject: 'openMMD'
        });
        videoEl.pause();
        videoEl.currentTime = 0;
        setTimeout("send_url2mmd()", 1000);       // この処理は頭わるい
    }
});

var mmd_id;
function send_url2mmd(){
    mmd_id = getUniqueStr()
    chrome.runtime.sendMessage({
        from:    'content', 
        subject: 'saveParentMMD', 
        parentURL: window.location.href, 
        movieId: getUrlParameter("v"), 
        title: $("#eow-title").text(), 
        mmd_id: mmd_id
    });
}

function reset_mmd(){
    chrome.runtime.sendMessage({
        from:    'content', 
        subject: 'resetParentMMD', 
        parentURL: window.location.href, 
        movieId: getUrlParameter("v"), 
        title: $("#eow-title").text(), 
        mmd_id: mmd_id
    });
}

// PIANO機能
var piano_status = false;
$(document).on("click", "#piano_control_button", function(){
    if (piano_status == true){
        piano_status = false;
        $("#piano_control_light").removeClass("sel");
        chrome.runtime.sendMessage({
            from:    'content', 
            subject: 'closePIANO', 
            parentURL: window.location.href
        });
    }else{
        piano_status = true;
        $("#piano_control_light").addClass("sel");
        chrome.runtime.sendMessage({
            from:    'content', 
            subject: 'openPIANO'
        });
        videoEl.pause();
        videoEl.currentTime = 0;
        setTimeout("send_url2piano()", 1000);       // この処理は頭わるい
    }
});

var piano_id;
function send_url2piano(){
    piano_id = getUniqueStr()
    chrome.runtime.sendMessage({
        from:    'content', 
        subject: 'saveParentPIANO', 
        parentURL: window.location.href, 
        movieId: getUrlParameter("v"), 
        title: $("#eow-title").text(), 
        piano_id: piano_id, 
        chord: _chords, 
        duration: videoEl.duration
    });
}

function reset_piano(){
    chrome.runtime.sendMessage({
        from:    'content', 
        subject: 'resetParentPIANO', 
        parentURL: window.location.href, 
        movieId: getUrlParameter("v"), 
        title: $("#eow-title").text(), 
        piano_id: piano_id, 
        chord: _chords, 
        duration: videoEl.duration
    });
}

// ウインドウを消す場合は子ウインドウも消す
window.addEventListener('beforeunload',  function(e) {
    chrome.runtime.sendMessage({
        from:    'content', 
        subject: 'closeMMD', 
        parentURL: window.location.href
    });
    chrome.runtime.sendMessage({
        from:    'content', 
        subject: 'closePIANO', 
        parentURL: window.location.href
    });
},  false);

// メッセージ
var old_url;
chrome.extension.onMessage.addListener(function(request, sender, response) {
    // Reload Event
    if (request.type === 'getDoc') {
        console.log("Reload Page");
        chrome.runtime.sendMessage({from: "content", subject: "check_extension"},  function(response) {
            var on_off = response.res;
            if (on_off == "false"){
                chrome.runtime.sendMessage({
                    from:    'content', 
                    subject: 'closeMMD', 
                    parentURL: old_url
                });
                mmd_status = false;
                $("#mmd_control_light").removeClass("sel");
                chrome.runtime.sendMessage({
                    from:    'content', 
                    subject: 'closePIANO', 
                    parentURL: old_url
                });
                piano_status = false;
                $("#piano_control_light").removeClass("sel");
            }
            console.log(on_off);
            if (first_load_f == true && window.location.href.startsWith('https://www.youtube.com/watch') && on_off == "true"){
                load_web_audio_api();
                first_load_f = false;
            }
            clear_chord_schedule();
            clear_chorus_schedule();
            if (reload_flag == 0 && window.location.href.startsWith('https://www.youtube.com/watch') && on_off == "true"){
                setTimeout("write_html()", 2000);       // この処理は頭わるい
                setTimeout("reset_mmd()", 4000);       
                setTimeout("reset_piano()", 4000);       
                reload_flag = 1;
            }
            old_url = window.location.href;
        });
    }
    // mmd window を消した時
    if ((request.from === "mmd") && (request.subject === "closeMMD")){
        mmd_status = false;
        $("#mmd_control_light").removeClass("sel");
    }
    // piano window を消した時
    if ((request.from === "piano") && (request.subject === "closePIANO")){
        piano_status = false;
        $("#piano_control_light").removeClass("sel");
    }
    // pianoから再生の依頼を受けた場合
    if ((request.from === "piano") && (request.subject === "playChord")){
        send_current();
    }
    // pianoからYTの再生を受けた場合
    if ((request.from === "piano") && (request.subject === "play_yt")){
        videoEl.play();
    }
    if ((request.from === "piano") && (request.subject === "pause_yt")){
        videoEl.pause();
    }
    // pianoからvocal cancelを受けた場合
    if ((request.from === "piano") && (request.subject === "vocal_cancel_off")){
        depth = 0.0;
    }
    if ((request.from === "piano") && (request.subject === "vocal_cancel_on")){
        depth = 1.0;
    }
    // 現在のYouTubeの状態を返す
    if ((request.from === "piano") && (request.subject === "get_play_status")){
        response({paused:videoEl.paused, currentTime:videoEl.currentTime, duration:videoEl.duration});
    }
    if ((request.from === "mmd") && (request.subject === "get_play_status")){
        response({paused:videoEl.paused, currentTime:videoEl.currentTime, duration:videoEl.duration});
    }
});

// child_idを作る
function getUniqueStr(myStrong){
    var strong = 1000;
    if (myStrong) strong = myStrong;
    return new Date().getTime().toString(16)  + Math.floor(strong*Math.random()).toString(16)
}
