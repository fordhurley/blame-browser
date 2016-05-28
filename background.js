// Listen for the content script to send a message to the background page.
chrome.extension.onMessage.addListener(function onRequest(request, sender, sendResponse) {
  // Show the page action for the tab that the sender (content script) was on.
  if (request == "showIcon"){
    chrome.tabs.insertCSS({file: 'style.css'});
    chrome.pageAction.show(sender.tab.id);
  }
});
