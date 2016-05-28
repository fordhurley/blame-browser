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
    link.href = blameLink(sha, lineNum);
    link.innerHTML = 'blame parent';
    link.style.float = 'right';
    link.style.fontSize = '10px';
    var meta = info.getElementsByClassName('blame-commit-meta')[0];
    if (meta.getElementsByTagName('svg').length > 0) {
      // There is a comment link icon, so space it out.
      // FIXME: just do this with CSS.
      link.style.marginRight = '1em';
    }
    meta.appendChild(link);
  }
}

function blameLink(sha, lineNum) {
  var parts = window.location.href.split('/');
  parts[6] = sha+'^';
  parts[parts.length-1] = parts[parts.length-1].split('#')[0] + '#' + lineNum
  return parts.join('/');
}
