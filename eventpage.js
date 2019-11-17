

if (window.localStorage.getItem("mmd_performer") == null){
    chrome.browserAction.setBadgeText({ text: "ON" });
}else if (window.localStorage.getItem("mmd_performer") == "true"){
    chrome.browserAction.setBadgeText({ text: "ON" });
}else if (window.localStorage.getItem("mmd_performer") == "false"){
    chrome.browserAction.setBadgeText({ text: "OFF" });
}


chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
    if (changeInfo.status === 'complete') {
        chrome.tabs.sendMessage(tabId, {type: 'getDoc'}, function (doc) {
            console.log(doc);
        });
    }
    return true;
});


chrome.runtime.onMessage.addListener(function (msg, sender, sendResponse) {
    console.log(msg);
    if ((msg.from === 'content') && (msg.subject === 'openMMD')) {
        chrome.windows.create({
            url: 'html/mmd.html', 
            type: 'popup', 
            width:820, 
            height:720},  
            function(window){});
    }
    else if ((msg.from === 'content') && (msg.subject === 'openPIANO')) {
        chrome.windows.create({
            url: 'html/piano.html', 
            type: 'popup', 
            width:900, 
            height:810},  
            function(window){});
    }
    else if ((msg.from === 'content') && (msg.subject === 'check_extension')) {
        if (window.localStorage.getItem("mmd_performer") == "false"){
            sendResponse({res: "false"});
        }else{
            sendResponse({res: "true"});
        }
    }
    else if ((msg.from === 'popup') && (msg.subject === 'extension_off')) {
        chrome.browserAction.setBadgeText({ text: "OFF" });
    }
    else if ((msg.from === 'popup') && (msg.subject === 'extension_on')) {
        chrome.browserAction.setBadgeText({ text: "ON" });
    }
    return true;
});


