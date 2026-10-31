// Expose real Babylon classes from the locally captured game bundle, in tests only.
// No game code or captured assets are included in the delivered userscript folder.
const fs=require('fs'),vm=require('vm'),path=require('path');
module.exports=()=>{
 const s=fs.readFileSync(path.resolve(__dirname,'../gun-sounds-1.1.0/live-game-source.js'),'utf8');
 const thin=/var ([\w$]+)=class\{stopAnimation\(\)/.exec(s)?.[1];
 const sprite=new RegExp(',([\\w$]+)=class e extends '+thin+'\\{set fromIndex').exec(s)?.[1];
 const engine=/\.engine=new ([\w$]+)\(/.exec(s)?.[1];
 const scene=/([\w$]+)\.DefaultMaterialFactory=/.exec(s)?.[1];
 const texture=/=new ([\w$]+)\("",2048,/.exec(s)?.[1];
 const manager=/new ([\w$]+)\("","",e,128,s\)/.exec(s)?.[1];
 const cameraEnd=s.indexOf('getClassName(){return"FreeCamera"');
 const camera=/([\w$]+)$/.exec(s.slice(0,s.lastIndexOf('=class',cameraEnd)))?.[1];
 const vector=/this\.position=([\w$]+)\.Zero\(\)/.exec(s.slice(s.indexOf(sprite+'=class'),s.indexOf(sprite+'=class')+2000))?.[1];
 if([thin,sprite,engine,scene,texture,manager,camera,vector].some(x=>!x))throw new Error('Cannot identify captured library classes');
 const exportCode=';window.__real={Sprite:'+sprite+',Engine:'+engine+',Scene:'+scene+',Texture:'+texture+',Manager:'+manager+',Camera:'+camera+',Vector:'+vector+'};})();';
 // A successfully parsed statement boundary avoids evaluating game startup.
 for(const m of s.matchAll(/;var /g))if(m.index>1750000&&m.index<2400000){
  const code=s.slice(0,m.index+1)+exportCode;
  try{new vm.Script(code);return code;}catch(e){if(!(e instanceof SyntaxError))throw e;}
 }
 throw new Error('Could not find a complete library-only boundary');
};
