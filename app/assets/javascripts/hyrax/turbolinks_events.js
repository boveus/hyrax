// Fixes a problem with csrf tokens and turbolinks
// See https://github.com/rails/jquery-ujs/issues/456
$(document).on('turbolinks:load', function() {
  $.rails.refreshCSRFTokens();
  // Explicitly set flag to false to force loading of UV
  // See https://github.com/samvera/hyrax/issues/2906
  window.embedScriptIncluded = false;
});

// Fixes a back/forward navigation problem with UV and turbolinks
// See https://github.com/samvera/hyrax/issues/2964
// This is based on https://github.com/turbolinks/turbolinks/issues/219#issuecomment-275838923
$(window).on('popstate', function(event) {
  var turbolinks_location = Turbolinks.Location.wrap(window.location);
  if (Turbolinks.controller.location.requestURL === turbolinks_location.requestURL) {
    return;
  }
  if (event.state === undefined || event.state.turbolinks === undefined) {
    if (window.history.state !== null && window.history.state.turbolinks !== undefined) {
      Turbolinks.controller.historyPoppedToLocationWithRestorationIdentifier(turbolinks_location, window.history.state.turbolinks.restorationIdentifier);
    } else {
      Turbolinks.controller.historyPoppedToLocationWithRestorationIdentifier(turbolinks_location, Turbolinks.uuid());
    }
  }
});
