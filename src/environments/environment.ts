// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  json_server_url: 'http://localhost:3006',
  cloudinary: {
    api_secret: 'dX-sQZGzfP4Qi_nz9zuIu2r5B74',
    api_key: '113187432484716',
    cloud_name: 'egcss',
    profilePic_folter: 'egresados-uasd/profilePics',
    eager: 'w_400,h_300,c_pad|w_260,h_200,c_crop',
    upload_preset: 'ml_default'
  }
}

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
