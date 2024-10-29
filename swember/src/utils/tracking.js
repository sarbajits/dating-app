// Track page visit
window.onload = function() {
    fetch('/track_page_visit.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ page: window.location.pathname })
    });
};

// Track time spent on the page
let startTime = Date.now();
window.onbeforeunload = function() {
    let timeSpent = Date.now() - startTime;
    fetch('/track_time.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ page: window.location.pathname, timeSpent: timeSpent })
    });
};

// Track click events
document.addEventListener('click', function() {
    fetch('/track_click.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ page: window.location.pathname })
    });
});

// Track page load time
window.addEventListener('load', function() {
    let loadTime = Date.now() - performance.timing.navigationStart;
    fetch('/track_performance.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ page: window.location.pathname, loadTime: loadTime })
    });
});
