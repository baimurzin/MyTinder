/**
 * Created by vbaimurzin on 03.11.2015.
 */
var cloudinary = require('cloudinary');
var cfg = require("../config/config").get("cloudinary");

cloudinary.config({
    cloud_name: cfg.cloud_name,
    api_key: cfg.api_key,
    api_secret: cfg.api_secret
});

cloudinary.uploader.upload("sample.jpg", function(result) {
    console.log(result)
},{
    public_id: 'sample_id',
    crop: 'limit',
    width: 2000,
    height: 2000,
    eager: [
        { width: 200, height: 200, crop: 'thumb', gravity: 'face',
            radius: 20, effect: 'sepia' },
        { width: 100, height: 150, crop: 'fit', format: 'png' }
    ],
    tags: ['special', 'for_homepage']
}   );