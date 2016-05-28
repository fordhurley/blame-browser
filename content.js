if (window.location.href.indexOf('/blame/') !== -1) {
  chrome.extension.sendMessage('showIcon', function(response) {
    addLinks();
  });
}

function addLinks() {
  var commits = window.document.getElementsByClassName('blame-commit');
  for (var i = 0; i < commits.length; i++) {
    var commit = commits[i];
    var info = commit.getElementsByClassName('blame-commit-info')[0];
    var shaLink = info.getElementsByClassName('blame-sha')[0];
    var sha = shaLink.textContent
    var line = commit.nextElementSibling
    var lineNum = line.getElementsByClassName('blob-num')[0].id;
    var link = document.createElement('a');
    link.className = 'blame-parent';
    link.innerHTML = 'blame parent';
    link.href = blameLink(sha, lineNum);
    var meta = info.getElementsByClassName('blame-commit-meta')[0];
    meta.appendChild(link);
  }
}

function blameLink(sha, lineNum) {
  var parts = window.location.href.split('/');
  parts[6] = sha+'^';
  parts[parts.length-1] = parts[parts.length-1].split('#')[0] + '#' + lineNum
  return parts.join('/');
}
