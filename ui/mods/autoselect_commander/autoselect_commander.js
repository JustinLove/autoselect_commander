(function() {
  model.autoselectCommanderOnSpawn = ko.observable(true).extend({local: 'autoselect_commander_on_spawn'})

  model.showLanding.subscribe(function(show) {
    if (show == false && model.autoselectCommanderOnSpawn() == true) {
      setTimeout(function() {
        api.select.commander()
        api.camera.track(true)
      }, 200)
    }
  })

  $('.div_launch_msg .div_message_display_cont').prepend('<div>Autoselect Commander: <input type="checkbox" data-bind="checked: autoselectCommanderOnSpawn"/></div></div>')
})()
