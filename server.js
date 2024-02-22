const express = require('express');
const cors = require('cors');
const epsg3395proxy = require('./index.js');

const app = (
  express()
  .use(cors())
  .use('/yandex-map/:z/:x/:y', epsg3395proxy('https://core-renderer-tiles.maps.yandex.net/tiles?l=skl&v=23.11.12-2-b231030182430&x={x}&y={y}&z={z}&scale=1&lang=en_FR'))
  .use('/yandex-sat/:z/:x/:y', epsg3395proxy("https://core-sat.maps.yandex.net/tiles?l=sat&v=3.1123.0&x={x}&y={y}&z={z}&lang=en_FR"))
  .listen(80,()=>{
    console.log("epsg3395 proxy has been listening on 80")
  })
);

process.on('SIGINT', function() {
  app.close();
});

// http://localhost:8000/yandex-map/8/181/90
// http://localhost:8000/yandex-sat/8/181/90
