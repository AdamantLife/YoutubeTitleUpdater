let CURRENT;
let OBSERVER;

function checkURL() {
    if (document.title != CURRENT) {
        updateTitle();
        CURRENT = document.title;
    }
}

function tryCheckURL(){
    try{
        checkURL();
    }
    catch(e){
        console.log(e);
    }
}

function updateTitle() {
    let title = document.title;
    let type = document.location.pathname.match(/\/(watch|playlist|results)/)?.[1];
    let tag = "";
    if(type == "watch") {
        let channelele = document.querySelector("#upload-info #channel-name a");
        tag = channelele.textContent;
    }
    // The Channel name is already in the URL, so this is redundant
    // Kept in case it changes in the future
    // else if(type == "channel" || type == "@") {
    //     let channelele = document.querySelector("#header #channel-name #text");
    //     tag = channelele.textContent;
    // }
    else if(type == "playlist") {
        let channelele = document.querySelector("#owner-text a");
        tag = channelele.textContent;
    }
    else if(type == "results") {
        tag = "Search Results";
    }
    console.log(tag);
    document.title = title.replace(/ - YouTube$.*/, " - YouTube" + tag ? " -" + tag: "");
}


OBSERVER = new MutationObserver(tryCheckURL);
OBSERVER.observe(document, {subtree: true, childList: true});
let setupLoop = ()=>{
    tryCheckURL();
    if(!CURRENT) setTimeout(setupLoop, 1000);
}
setupLoop();