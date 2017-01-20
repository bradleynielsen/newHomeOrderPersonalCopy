var NestApi = require('nest-api');
var nestApi = new NestApi('bradleynielsen@gmail.com', '*9Ph^VRrYU!1zZ6');

nestApi.login(function(data) {
  nestApi.get(function(data) {
    var shared = data.shared[Object.keys(data.schedule)[0]];
    console.log('Currently ' + shared.current_temperature + ' degrees celcius');
    console.log('Target is ' + shared.target_temperature + ' degrees celcius');
  });
});

// Below is an example data structure / JSON object returned from the Nest API:
// {
//   user_alert_dialog: { '###':  { /* ... */ } },
//   track:  { '0123456789ABCDEF': { /* ... */ }, /* ... */ },
//   message_center: { '###': { /* ... */ } },
//   utility: { /* ... */ },
//   where: { '### uuid ###': { /* ... */ },
//   structure: { '### uuid ###': { /* ... */ },
//   message: { '0123456789ABCDEF': { /* ... */ }, /* ... */ },
//   tuneups: { '0123456789ABCDEF': { /* ... */ }, /* ... */ },
//   device: { '0123456789ABCDEF': { /* ... */ }, /* ... */ },
//   demand_response: { '0123456789ABCDEF': { /* ... */ }, /* ... */ },
//   user: { '###': { /* ... */ },
//   link: { '0123456789ABCDEF': { /* ... */ }, /* ... */ },
//   device_alert_dialog: { '0123456789ABCDEF': { /* ... */ }, /* ... */ },
//   metadata: { '0123456789ABCDEF': { /* ... */ }, /* ... */ },
//   user_settings: { '###': { /* ... */ },
//   schedule: { '0123456789ABCDEF': { /* ... */ }, /* ... */ },
//   shared: { '0123456789ABCDEF': { /* ... */ }, /* ... */ }
//  }
