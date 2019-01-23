if (window.localStorage.getItem("mmd_performer") == null){
    window.localStorage.setItem("mmd_performer", "true");
}

$(document).on("click", "#work_label", function(){
    if (window.localStorage.getItem("mmd_performer") == "true"){
        window.localStorage.setItem("mmd_performer", "false");
        chrome.runtime.sendMessage({
            from:    'popup', 
            subject: 'extension_off' 
        });
        window.close();
    }else{
        window.localStorage.setItem("mmd_performer", "true");
        chrome.runtime.sendMessage({
            from:    'popup', 
            subject: 'extension_on' 
        });
        window.close();
    }
}); 
