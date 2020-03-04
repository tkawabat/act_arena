export const postMessageFunc = `
// patch post message
var originalPostMessage = window.postMessage;
var patchedPostMessage = function(message, targetOrigin, transfer) { 
    originalPostMessage(message, targetOrigin, transfer);
};

patchedPostMessage.toString = function() { 
    return String(Object.hasOwnProperty).replace('hasOwnProperty', 'postMessage'); 
};
window.postMessage = patchedPostMessage;
`;