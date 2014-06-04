(function() {
  "use strict";

  var subscribeToSelection = function() {
    var selectionSubscription = model.selection.subscribe(function(payload) {
      if (!payload) return

      console.info('AC: examining initial selection')
      var si = payload.spec_ids
      var sik = Object.keys(si)
      if (sik.length == 1) {
        if (sik[0].match('/pa/units/commanders/')) {
          if (si[sik[0]].length == 1) {
            api.camera.track(true)
          } else {
            console.info('AC: more than one commander, NOP')
            setTimeout(api.select.empty, 200)
          }
        }
      }

      selectionSubscription.dispose()
    })
  }

  model.showLanding.subscribe(function(show) {
    if (show == false) {
      console.info('AC: Landed')
      subscribeToSelection()
      setTimeout(api.select.commander, 300)
    }
  })
})()
