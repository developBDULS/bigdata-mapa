mapboxgl.accessToken = "pk.eyJ1Ijoiam1hcnRpbmV6Y2wiLCJhIjoiY2w1c2RwYmk0Mjl3MzNrcGl3bDIzcWd2cyJ9.H09NN_RapDgKq1sBJPZRUA";
const map = new mapboxgl.Map({
  container: 'map', // container ID
  style: 'mapbox://styles/jmartinezcl/cl5slj3ld000k15nb9c6tuley', // style URL
  center: [-56.149,-11.217], // starting position [lng, lat]
  zoom: 2, // starting zoom
  projection: 'globe' // display the map as a 3D globe
});
map.on('style.load', () => {
  map.setFog({}); // Set the default atmosphere style
});

const serena = [-71.2717840270455, -29.912309205381106]
const lima = [-77.03588842732569, -12.05537483058261]

const popup_a = new mapboxgl.Popup({offset:25}).setText(
  'Bigdata ULS'
);
const popup_b = new mapboxgl.Popup({offset:25}).setText(
  'Universidad Nacional Mayor de San Marcos'
);

const div_a = document.createElement('div');
div_a.id = "div_a";
const div_b = document.createElement('div');
div_b.id = "div_b";

new mapboxgl.Marker(div_a)
  .setLngLat(serena)
  .setPopup(popup_a)
  .addTo(map);
new mapboxgl.Marker(div_b)
  .setLngLat(lima)
  .setPopup(popup_b)
  .addTo(map);

const secondsPerRevolution = 120;
const maxSpinZoom = 5;
const slowSpinZoom = 3;
let userInteracting = false;
let spinEnabled = true;

function spinGlobe(){
  const zoom = map.getZoom();
  if(spinEnabled && !userInteracting && zoom < maxSpinZoom){
    let distancePerSecond = 360/ secondsPerRevolution;
    if(zoom > slowSpinZoom){
      const zoomDif = (maxSpinZoom - zoom)/(maxSpinZoom - slowSpinZoom);
      distancePerSecond *= zoomDif;
    }
    const center = map.getCenter();
    center.lng -= distancePerSecond;
    map.easeTo({ center, duration:1000, easing:(n)=> n});
  }
}
map.on('mousedown', ()=>{
  userInteracting = true;
});
map.on('mouseup', ()=> {
  userinteracting = false;
  spinGlobe();
});
map.on('dragend', () => {
    userInteracting = false;
    spinGlobe();
});
map.on('pitchend', () => {
    userInteracting = false;
    spinGlobe();
});
map.on('rotateend', () => {
    userInteracting = false;
    spinGlobe();
});
map.on('moveend', ()=> {
  spinGlobe();
});
spinGlobe();

/*ICONOS E IMAGENES*/
const img = document.createElement('img');
img.src = 'media/BIG DATA GEOREFERENCIACION 2-02.png';
const info = document.getElementById('bduls-container');
info.appendChild(img);

const title_container = document.getElementById('map-title');
const title_value = document.createElement('span');
title_value.innerHTML = "<b>Bigdata ULS Internacional</b>";
title_container.appendChild(title_value);

const layers = [
    'Presencia de Bigdata ULS',
];

const colors = [
    '#400AB2',
];

const legend = document.getElementById('legend');

layers.forEach((layer, i) => {
    const color = colors[i];
    const item = document.createElement('div');
    const key = document.createElement('span');
    key.className = 'legend-key';
    key.style.backgroundColor = color;
    
    const value = document.createElement('span');
    value.innerHTML = `${layer}`;
    item.appendChild(key);
    item.appendChild(value);
    legend.appendChild(item);
    });