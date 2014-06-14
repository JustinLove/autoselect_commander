(function() {
  "use strict";

  var subscribeToArmy = function() {
    var armySubscription = model.armySize.subscribe(function(size) {
      console.info('AC: army size', size)
      if (size == 1) {
        api.select.commander()
        api.camera.track(true)
      }

      if (size > 0) {
        armySubscription.dispose()
      }
    })
  }

  model.showLanding.subscribe(function(show) {
    if (show == false) {
      console.info('AC: Landed')
      subscribeToArmy()
    }
  })
})()
