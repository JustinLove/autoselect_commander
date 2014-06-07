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
        console.log('AC: nothing selected')
        if (!triggered) api.select.commander()
        triggered = true
      } else {
        console.log('AC: at least one thing selected')
        handlers.selection = original_selection

        var commanders = 0
        sik.forEach(function(id) {
          console.log('AC: ', id)
          if (id.match('/pa/units/commanders/')) {
            commanders += si[id].length
          }
        })

        console.log('AC: commanders selected: ', commanders)
        if (commanders == 1) {
          console.log('AC: one commander')
          api.camera.track(true)
        } else {
          console.info('AC: something else, NOP')
          api.select.empty()
        }
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
