if (window.location.href.indexOf("/blame/") !== -1) {
  chrome.extension.sendMessage("showIcon", function(response) {
    console.log("response from showIcon request:", response);
    addLinks();
  });
}

function addLinks() {
    var infos = window.document.getElementsByClassName("blame-commit-info");
    Array.prototype.forEach.call(infos, function(info, index) {
      var link = document.createElement("a");
      link.href = window.location.href + "#L" + index;
      link.innerHTML = "test";
      info.appendChild(link);
    });
  }
