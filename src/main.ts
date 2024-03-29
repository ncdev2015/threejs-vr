import './style.css'
import { Vreffect } from './vreffect.ts';

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div>
    <h1>VR Cardboard test</h1>
    <button id='fullscreen-btn'>Full screen</button>
    <br/>
    <br/>
    <div id="viewer"></div>    
  </div>
`

const viewerSize = {
  width: 800,
  height: 600
}

let isFullScreen: boolean = false;

const viewer = new Vreffect("viewer", viewerSize.width, viewerSize.height);

viewer.setup();

document.getElementById('fullscreen-btn')!.addEventListener('click', function() {  
  let canvas = document.querySelector('canvas')!;

  viewer.setSize(window.innerWidth, window.innerHeight);
  canvas.requestFullscreen && canvas.requestFullscreen();
});

document.addEventListener("fullscreenchange", function() {
  isFullScreen = !isFullScreen;

  if (!isFullScreen) {
    viewer.setSize(viewerSize.width, viewerSize.height);
  }

});