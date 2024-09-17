//Function to change CSS
function changeCSS() {
    const selectors = ['.playback-overlay__container.vod', '.playback-header__container', '.playback-overlay__container.singleliveevent'];

    selectors.forEach(selector => {
        let element = document.querySelector(selector);
        if (element) {
            element.style.setProperty('background', 'linear-gradient(1turn, #0000 16%, #0000 64%)', 'important');
        } else {
            //console.log(`Element not found for selector '${selector}'`);
        }
    });
}


let url = location.href;

// Function to handle video change detection
function onVideoChange() {
    changeCSS(); // Trigger changeCSS function when a new video is loaded
}

// MutationObserver configuration that triggers onVideoChange
const observer = new MutationObserver(mutations => {
    for (let mutation of mutations) {
        if (mutation.type === 'childList' || mutation.type === 'attributes') {
            onVideoChange();
            break;
        }
    }
});

// Start observing the entire document for changes
observer.observe(document, { childList: true, subtree: true, attributes: true });

// Polling for URL changes
setInterval(() => {
    if (location.href !== url) {
        url = location.href;
        onVideoChange();
    }
}, 500);
