var getUrlParameter = function getUrlParameter(sParam) {
    var sPageURL = decodeURIComponent(window.location.search.substring(1)),
        sURLVariables = sPageURL.split('&'),
            sParameterName,
            i;
            for (i = 0; i < sURLVariables.length; i++) {
                sParameterName = sURLVariables[i].split('=');
                if (sParameterName[0] === sParam) {
                    return sParameterName[1] === undefined ? true : sParameterName[1];
                }
            }
};


function control_panel($selector){
    var $panel = $("<div/>").attr("id", "main_panel");

    $("<div/>").attr("id", "panel_bg")
    .css("background", "url(" + "https://i.ytimg.com/vi/" + getUrlParameter("v") + "/hqdefault.jpg" + ") no-repeat center")
    .css("background-size", "cover")
    .appendTo($panel);
    $("<div/>").attr("id", "panel_cover").appendTo($panel);

    $("<div/>").attr("id", "main_panel_title").text("MMD Performer (β)").appendTo($panel);
    if (window.localStorage.getItem("mmd_performer_open") == null){
        $("<div/>").attr("id", "close_button").addClass("close").text("close").appendTo($panel);
    }else if (window.localStorage.getItem("mmd_performer_open") == "true"){
        $("<div/>").attr("id", "close_button").addClass("close").text("close").appendTo($panel);
    }else if (window.localStorage.getItem("mmd_performer_open") == "false"){
        $("<div/>").attr("id", "close_button").addClass("open").text("open").appendTo($panel);
    }

    // MMD PIANO AUDIO 関係
    var $general = $("<div/>").attr("id", "general_control").text("General");
    var $mmd = $("<div/>").attr("id", "mmd_control");
    $("<div/>").attr("id", "mmd_control_label").text("MMD").appendTo($mmd);
    $("<div/>").attr("id", "mmd_control_light").appendTo($mmd);
    $("<div/>").attr("id", "mmd_control_button").appendTo($mmd);

    var $piano = $("<div/>").attr("id", "piano_control");
    $("<div/>").attr("id", "piano_control_label").text("PIANO").appendTo($piano);
    $("<div/>").attr("id", "piano_control_light").appendTo($piano);
    $("<div/>").attr("id", "piano_control_button").appendTo($piano);

    var $repeat = $("<div/>").attr("id", "repeat_control");
    $("<div/>").attr("id", "repeat_control_label").text("REPEAT").appendTo($repeat);
    $("<div/>").attr("id", "repeat_control_light").appendTo($repeat);
    $("<div/>").attr("id", "repeat_control_button").appendTo($repeat);


    $general.append($mmd).append($piano).append($repeat);
    $panel.append($general);




    // EQ関係
    var $eq = $("<div/>").attr("id", "eq_control").text("Equalizer");
    var $eqh = $("<div/>").attr("id", "eq_h");
    $("<div/>").addClass("eq_label").text("HIGH").appendTo($eqh);
    $("<input/>").attr("type", "range").attr("min", -40).attr("max", 40).attr("step", 1).attr("value", _treble.gain.value).attr("id", "eq_dial_h").width("40%").css("top", "7px").css("left", "25%").css("position", "relative").appendTo($eqh);
    //$("<div/>").addClass("eq_dial").append($("<div/>").attr("id", "eq_dial_h").addClass("tk-audial")).appendTo($eqh);



    var $eqm = $("<div/>").attr("id", "eq_m");
    $("<div/>").addClass("eq_label").text("MID").appendTo($eqm);
    $("<input/>").attr("type", "range").attr("min", -40).attr("max", 40).attr("step", 1).attr("value", _middle.gain.value).attr("id", "eq_dial_m").width("40%").css("top", "7px").css("left", "25%").css("position", "relative").appendTo($eqm);
    //$("<div/>").addClass("eq_dial").append($("<div/>").attr("id", "eq_dial_m").addClass("tk-audial")).appendTo($eqm);


    var $eql = $("<div/>").attr("id", "eq_l");
    $("<div/>").addClass("eq_label").text("LOW").appendTo($eql);
    $("<input/>").attr("type", "range").attr("min", -40).attr("max", 40).attr("step", 1).attr("value", _bass.gain.value).attr("id", "eq_dial_l").width("40%").css("top", "7px").css("left", "25%").css("position", "relative").appendTo($eql);
    //$("<div/>").addClass("eq_dial").append($("<div/>").attr("id", "eq_dial_l").addClass("tk-audial")).appendTo($eql);




    $eq.append($eqh).append($eqm).append($eql);
    $panel.append($eq);


    // REVERB関係
    var $reverb = $("<div/>").attr("id", "reverb_control").text("Reverb");

    var $dry = $("<div/>").attr("id", "wet_control").text("Dry");
    for (var i=0; i<=10; i++){
        $("<div/>").addClass("indi_line").css("top", (i*11 + 25)).appendTo($dry);
    }
    $("<input/>").attr("type", "range").attr("min", 0).attr("max", 1).attr("step", 0.01).attr("value", dry.gain.value).attr("id", "dry_input").appendTo($dry);

    var $wet = $("<div/>").attr("id", "dry_control").text("Wet");
    for (var i=0; i<=10; i++){
        $("<div/>").addClass("indi_line").css("top", (i*11 + 25)).appendTo($wet);
    }
    $("<input/>").attr("type", "range").attr("min", 0).attr("max", 1).attr("step", 0.01).attr("value", wet.gain.value).attr("id", "wet_input").appendTo($wet);

    $reverb.append($dry).append($wet);
    $panel.append($reverb);



    //MASTER関係
    var $master = $("<div/>").attr("id", "master_control").text("Output");
    var $master_vol = $("<div/>").attr("id", "master_vol").text("Vol");
    for (var i=0; i<=10; i++){
        $("<div/>").addClass("indi_line").css("top", (i*11 + 25)).appendTo($master_vol);
    }
    $("<input/>").attr("type", "range").attr("min", 0).attr("max", 1).attr("step", 0.01).attr("value", videoEl.volume).attr("id", "vol_input").appendTo($master_vol);

    $master.append($master_vol);
    $panel.append($master).css("display", "none");

    $($selector).before($panel);
    $("#main_panel").slideDown();


    if (window.localStorage.getItem("mmd_performer_open") == "false"){
        $("#main_panel").css({height: '19px'});
    }


    // イコライザダイアルの設定

//    var eq_h = document.querySelector('#eq_dial_h');
//    var eq_h_Dial = new TkAudial(eq_h, {
//        type: 'gain', 
//        display: 'notch', 
//        min:-40, 
//        max:40, 
//        step:1, 
//        value:_treble.gain.value, 
//        borderWidth: 5, 
//        valueFontSize:'8px', 
//        inputId:'eq_h_input'
//    });
//    var eq_m = document.querySelector('#eq_dial_m');
//    var eq_m_Dial = new TkAudial(eq_m, {
//        type: 'gain', 
//        display: 'notch', 
//        min:-40, 
//        max:40, 
//        step:1, 
//        value:_middle.gain.value, 
//        borderWidth: 5, 
//        valueFontSize:'8px', 
//        inputId:'eq_m_input'
//    });
//    var eq_l = document.querySelector('#eq_dial_l');
//    var eq_l_Dial = new TkAudial(eq_l, {
//        type: 'gain', 
//        display: 'notch', 
//        min:-40, 
//        max:40, 
//        step:1, 
//        value:_bass.gain.value, 
//        borderWidth: 5, 
//        valueFontSize:'8px', 
//        inputId:'eq_l_input'
//    });


    $(document).on("input", "#dry_input", function(){
        dry.gain.value = this.value;
    });

    $(document).on("input", "#wet_input", function(){
        wet.gain.value = this.value;
    });

    $(document).on("input", "#vol_input", function(){
        videoEl.volume = this.value;
        $(".ytp-volume-panel").attr("aria-valuenow", parseInt(this.value*100));
        $(".ytp-volume-panel").attr("aria-valuetext", parseInt(this.value*100) + "% 音量");
        $(".ytp-volume-slider-handle").css("left", (40*this.value) + "px");
    });

    $("#eq_dial_h").change(function () {
        _treble.gain.value = $(this).val();
    });
    $("#eq_dial_m").change(function () {
        _middle.gain.value = $(this).val();
    });
    $("#eq_dial_l").change(function () {
        _bass.gain.value = $(this).val();
    });
    
    // コントロールパネルの開閉
    $(document).on("click", "#close_button.close", function(){
        $(this).removeClass("close").addClass("open").text("open");
        $("#main_panel").animate({height: '19px'});
        window.localStorage.setItem("mmd_performer_open", "false");
    });
    $(document).on("click", "#close_button.open", function(){
        $(this).removeClass("open").addClass("close").text("close");
        $("#main_panel").animate({height: '200px'});
        window.localStorage.setItem("mmd_performer_open", "true");
    });
}





