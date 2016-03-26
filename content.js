if (window.location.href.indexOf("/blame/") !== -1) {
  chrome.extension.sendMessage("showIcon", function(response) {
    console.log("response from showIcon request:", response);
    addLinks();
  });
}

function addLinks() {
  var commits = window.document.getElementsByClassName("blame-commit");
  Array.prototype.forEach.call(commits, function(commit) {
    var info = commit.getElementsByClassName("blame-commit-info")[0];
    var shaLink = info.getElementsByClassName('blame-sha')[0];
    var sha = shaLink.textContent
    var line = commit.nextElementSibling
    var lineNum = line.getElementsByClassName('blob-num')[0].id;
    var link = document.createElement("a");
    link.href = blameLink(sha, lineNum);
    link.innerHTML = 'blame parent';
    link.style.float = 'right';
    link.style.clear = 'right';
    link.style.fontSize = '10px';
    info.insertBefore(link, info.getElementsByClassName('blame-commit-title')[0]);
  });
}

function blameLink(sha, lineNum) {
  var parts = window.location.href.split('/');
  parts[6] = sha+'^';
  parts[parts.length-1] = parts[parts.length-1].split('#')[0] + '#' + lineNum
  return parts.join('/');
}
