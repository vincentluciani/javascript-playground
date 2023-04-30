var waitForElement = async function(selector) {
    /*return new Promise(resolve => {*/
    return new Promise( function(resolve,reject){
        setTimeout(function()
        {
            console.error("Could not find any element with id:"+selector);
            return null;
        },2000)

        if (document.getElementById(selector)) {
            return resolve(document.getElementById(selector));
        }

        const observer = new MutationObserver(mutations => {
            if (document.getElementById(selector)) {
                resolve(document.getElementById(selector));
                observer.disconnect();
            }
        });

        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    });
}