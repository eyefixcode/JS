javascript:(function(){ 


// Define the function
function convertToVscodeDev(url) {
    // Check if the URL already contains 'vscode.dev/'
    if (url.startsWith('https://vscode.dev/')) {
        return url;
    }

    // Add the prefix
    let vscodeDevUrl = 'https://vscode.dev/' + url;

    return vscodeDevUrl;
}

// Test cases
let originalUrl = window.location.href;
let vscodeDevUrl = convertToVscodeDev(originalUrl);

// Reload the page with the new URL appended
window.location.href = vscodeDevUrl;

})();