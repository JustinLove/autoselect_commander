(function() {
  "use strict";

  var subscribeToSelection = function() {
    var original_selection = handlers.selection
    var triggered = false
    handlers.selection = function(payload) {
      original_selection(payload)
      if (!payload) return

      console.info('AC: examining initial selection')
      var si = payload.spec_ids
      var sik = Object.keys(si)
      if (sik.length == 0) {
        if (!triggered) api.select.commander()
        triggered = true
      } else if (sik.length == 1) {
        handlers.selection = original_selection
        if (sik[0].match('/pa/units/commanders/')) {
          if (si[sik[0]].length == 1) {
            api.camera.track(true)
          } else {
            console.info('AC: more than one commander, NOP')
            api.select.empty()
          }
        }
      } else {
        handlers.selection = original_selection
      }
    }
  }

  model.showLanding.subscribe(function(show) {
    if (show == false) {
      console.info('AC: Landed')
      subscribeToSelection()
    }
  })
})()
