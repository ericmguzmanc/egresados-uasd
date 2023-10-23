export const environment = {
  production: true,
  json_server_url: 'https://egresados-uasd-server.onrender.com/v1',
  express_server_url: 'https://egresados-uasd-server.onrender.com/v2',
  cloudinary: {
    upload_url: 'https://api.cloudinary.com/v1_1/egcss/image/upload',
    api_secret: 'dX-sQZGzfP4Qi_nz9zuIu2r5B74',
    api_key: '113187432484716',
    cloud_name: 'egcss',
    profilePic_folter: 'egresados-uasd/profilePics',
    eager: 'w_400,h_300,c_pad|w_260,h_200,c_crop',
    upload_preset: 'ml_default'
  }
};
