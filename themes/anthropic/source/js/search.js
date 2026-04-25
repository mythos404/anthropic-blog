(function () {
  var input = document.getElementById('search-input');
  var results = document.getElementById('search-results');
  if (!input || !results) return;

  var source = input.dataset.source || '/search.xml';
  var index = null;
  var loading = null;

  function load() {
    if (index) return Promise.resolve(index);
    if (loading) return loading;
    loading = fetch(source)
      .then(function (r) { return r.text(); })
      .then(function (xml) {
        var doc = new DOMParser().parseFromString(xml, 'text/xml');
        var entries = doc.getElementsByTagName('entry');
        var out = [];
        for (var i = 0; i < entries.length; i++) {
          var e = entries[i];
          var get = function (tag) {
            var el = e.getElementsByTagName(tag)[0];
            return el ? el.textContent : '';
          };
          out.push({
            title: get('title'),
            url: get('url'),
            content: get('content').replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim()
          });
        }
        index = out;
        return index;
      });
    return loading;
  }

  function escapeHtml(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }

  function snippet(text, query) {
    var lc = text.toLowerCase();
    var i = lc.indexOf(query);
    if (i < 0) return text.slice(0, 180);
    var start = Math.max(0, i - 60);
    var end = Math.min(text.length, i + query.length + 120);
    return (start > 0 ? '…' : '') + text.slice(start, end) + (end < text.length ? '…' : '');
  }

  function render(query) {
    query = query.trim().toLowerCase();
    if (!query) { results.innerHTML = ''; return; }
    if (!index) { results.innerHTML = '<div class="search-empty">Loading…</div>'; return; }
    var matches = [];
    for (var i = 0; i < index.length && matches.length < 30; i++) {
      var e = index[i];
      if (e.title.toLowerCase().indexOf(query) !== -1 || e.content.toLowerCase().indexOf(query) !== -1) {
        matches.push(e);
      }
    }
    if (!matches.length) {
      results.innerHTML = '<div class="search-empty">No results for &ldquo;' + escapeHtml(query) + '&rdquo;.</div>';
      return;
    }
    results.innerHTML = matches.map(function (m) {
      return '<article class="search-result">' +
        '<a href="' + escapeHtml(m.url) + '">' + escapeHtml(m.title) + '</a>' +
        '<p>' + escapeHtml(snippet(m.content, query)) + '</p>' +
        '</article>';
    }).join('');
  }

  input.addEventListener('input', function () {
    load().then(function () { render(input.value); });
  });
  load();
})();
