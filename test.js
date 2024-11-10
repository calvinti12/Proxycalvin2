// Test functions for SwitchyOmega
function testProfileSwitch(profileName) {
    chrome.runtime.sendMessage({
        method: 'applyProfile',
        args: [profileName],
        refreshActivePage: true
    }, (response) => {
        document.getElementById('test-results').innerHTML += 
            `<p>Profile switch test (${profileName}): ${JSON.stringify(response)}</p>`;
    });
}

function testDataClearing() {
    chrome.runtime.sendMessage({
        method: 'clearAndReload',
        profileName: 'test'
    }, (response) => {
        document.getElementById('test-results').innerHTML += 
            `<p>Data clearing test: ${JSON.stringify(response)}</p>`;
    });
}

function setTestData() {
    // Set cookies
    document.cookie = "testCookie1=value1; path=/";
    document.cookie = "testCookie2=value2; path=/";
    
    // Set localStorage
    localStorage.setItem('testKey1', 'value1');
    localStorage.setItem('testKey2', 'value2');
    
    // Set sessionStorage
    sessionStorage.setItem('testKey1', 'value1');
    sessionStorage.setItem('testKey2', 'value2');
    
    updateStorageInfo();
}

function updateStorageInfo() {
    const storageInfo = {
        cookies: document.cookie,
        localStorage: Object.keys(localStorage),
        sessionStorage: Object.keys(sessionStorage)
    };
    
    document.getElementById('storage-info').innerHTML = 
        `<pre>Current Storage State:\n${JSON.stringify(storageInfo, null, 2)}</pre>`;
}

// Add event listeners after DOM loads
document.addEventListener('DOMContentLoaded', () => {
    // Add click handlers for test buttons
    document.getElementById('test-direct').addEventListener('click', () => testProfileSwitch('direct'));
    document.getElementById('test-system').addEventListener('click', () => testProfileSwitch('system'));
    document.getElementById('test-clearing').addEventListener('click', () => testDataClearing());
    document.getElementById('test-set-data').addEventListener('click', () => setTestData());
    
    // Show initial storage state
    updateStorageInfo();
    
    // Update storage info periodically
    setInterval(updateStorageInfo, 1000);
}); 