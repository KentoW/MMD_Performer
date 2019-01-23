var songle_duration = 0;
var exit_data = false;

function songle(url, $selector){
    var $widget = $("<div/>").attr("id", "songle_widget");

    // songle widgetの作成
    var $songle_title = $("<div/>").attr("id", "songle_top");
    var $link_box = $("<div/>").attr("id", "link_box");

    var $repeat_line = $("<div/>").attr("id", "repeat_line");
    var $sabi_bar = $("<div/>").addClass("sabi_bar").appendTo($repeat_line);
    for (var i=0; i<= 4; i++){
        $("<div/>").addClass("normal_bar").attr("id", "r"+i).appendTo($repeat_line);
    }
    // シークするための場所を追加
    $("<div/>").attr("id", "play_position_field").appendTo($repeat_line);
    // 現在再生箇所の線を追加
    $("<div/>").attr("id", "play_position").appendTo($repeat_line)

    $widget.append($songle_title);
    $widget.append($link_box);
    $widget.append($repeat_line);
    $widget.css("display", "none");
    $($selector).before($widget);


    // タイトルの追加
    $.ajax({
        type: "GET", 
        scriptCharset: 'utf-8', 
        dataType:'json',
        url: 'https://widget.songle.jp/api/v1/song.json',
        data: {url: url}, 
        success: function(json){
            songle_duration = Number(json.duration);
            $("<div/>").attr("id", "songle_artist").attr("href", json.url).attr("target", "_blank").text(json.artist.name).appendTo($("#songle_top"));
            $("<div/>").attr("id", "songle_title").attr("href", json.url).attr("target", "_blank").text("♪"+json.title).appendTo($("#songle_top"));

            $("<div/>").attr("id", "songle_fix").attr("href", json.url).attr("target", "_blank").text("Songleでサビ訂正").appendTo($("#link_box"));
            $("<a/>").attr("id", "songle_credit").attr("href", "http://widget.songle.jp/").attr("target", "_blank").text("By Songle Widget").appendTo($("#link_box"));
            get_repeat();
            exit_data = true;
        }, 
        error:function(){
            $("<div/>").attr("id", "songle_artist").attr("href", "http://songle.jp/songs/" + encodeURIComponent(url)).attr("target", "_blank").text("不明").appendTo($("#songle_top"));
            $("<div/>").attr("id", "songle_title").attr("href", "http://songle.jp/songs/" + encodeURIComponent(url)).attr("target", "_blank").text("♪この楽曲をソングルに登録する").appendTo($("#songle_top"));

            $("<div/>").attr("id", "songle_fix").attr("href", "http://songle.jp/songs/" + encodeURIComponent(url)).attr("target", "_blank").text("この楽曲は未解析です").appendTo($("#link_box"));
            $("<a/>").attr("id", "songle_credit").attr("href", "http://widget.songle.jp/").attr("target", "_blank").text("By Songle Widget").appendTo($("#link_box"));
            get_repeat();
            exit_data = false;
        }
    });

    // 繰り返しの追加
    function get_repeat(){
        $.ajax({
            type: "GET", 
            scriptCharset: 'utf-8', 
            dataType:'json',
            url: 'https://widget.songle.jp/api/v1/song/chorus.json',
            data: {url: url}, 
            success: function(json){
                var chorus_repeats = json.chorusSegments[0].repeats;
                var total_duration = songle_duration;
                if (total_duration == 0){
                  total_duration = videoEl.duration*1000;
                }
                for (var i in chorus_repeats){
                    var left_ratio = String(100*chorus_repeats[i].start/total_duration)+"%";
                    var width_ratio = "calc(" + String(100*chorus_repeats[i].duration/total_duration)+"% - 2px)";
                    var start_time = chorus_repeats[i].start/1000;
                    $("<div/>").addClass("sabi_repeat").attr("start", start_time).css("left", left_ratio).css("width", width_ratio).appendTo($(".sabi_bar"));
                }
                for (var j=1; j<=5; j++){
                    var normal_repeats = json.repeatSegments[j].repeats;
                    for (var i in normal_repeats){
                        var left_ratio = String(100*normal_repeats[i].start/total_duration)+"%";
                        var width_ratio = "calc(" + String(100*normal_repeats[i].duration/total_duration)+"% - 2px)";
                        var start_time = normal_repeats[i].start/1000;
                        $("<div/>").addClass("normal_repeat").attr("start", start_time).css("left", left_ratio).css("width", width_ratio).appendTo($("#r"+(j-1)));
                    }
                }
                $("#songle_widget").slideDown();
            }, 
            error:function(){
                $("#songle_widget").slideDown();
            }
        });
    }
    
    
    
}

$(document).on("click", "#songle_title, #songle_artist, #songle_fix", function(e){
    videoEl.pause();
    if (exit_data == true){
        var win = window.open($(this).attr("href") + "#at=" + videoEl.currentTime, '_blank');
    }else{
        var win = window.open($(this).attr("href"), '_blank');
    }
    win.focus();
})


$(document).on("click", "#play_position_field", function(e){
    var parentOffset = $(this).offset(); 
    var relX = e.pageX - parentOffset.left;
    var position = relX / $(this).width();
    var duration = videoEl.duration;
    videoEl.currentTime = duration*position;
});

$(document).on("click", ".sabi_repeat", function(){
    videoEl.currentTime = parseInt($(this).attr("start"));
});

$(document).on("click", ".normal_repeat", function(){
    videoEl.currentTime = parseInt($(this).attr("start"));
});

