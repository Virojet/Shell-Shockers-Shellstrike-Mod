/* Fixed Shellstrike preset. No settings, uploads, storage or network requests.
   Private copies of the game's particle atlas decorate blast smoke, shell shards
   and yolk bursts. Smoke/shard alpha and all sprite motion remain the game's.
   L3: a reversible cellIndex property on smoke sprites chooses the decorated puff
   only for large blasts. It never patches game code or changes hidden information.
   Verified pools: smoke300/non-additive, shells400, yolk100; 128px cells in a
   2048px inverted atlas. Cells130=yolk,131..134=shells,144=smoke,240=our copy.
   These shapes are checked at runtime. window.ssShellstrike.status() is read-only.
   Adapted from Virojet's MIT Smoke Logo starter. Artwork supplied by the user. */
(() => {
  'use strict';
  if (window.ssShellstrike) return;
  const VERSION='1.0.1', SIZE=128, ATLAS=2048, PUFF=144, LOGO=240;
  const IMAGE='__SHELLSTRIKE_PNG__';
  const YOLK_IMAGE='__SHELLSTRIKE_YOLK_PNG__';
  const warn=console.warn.bind(console,'[Shellstrike]'), warned=new Set();
  let running=false,timer=0,picture=null,yolkPicture=null,images=[],epoch=0,currentScene=null,paused=false,issue='';
  const managers=new Map(),textures=new Set(),cells=[];
  const warnOnce=e=>{const m=String(e?.message||e);issue=m;if(!warned.has(m)){warned.add(m);warn(m);}};
  const xy=n=>[n%16*SIZE,(15-Math.floor(n/16))*SIZE];
  function cropLogo(im){
    const source=document.createElement('canvas');source.width=im.naturalWidth;source.height=im.naturalHeight;
    const c=source.getContext('2d');if(!c)throw new Error('Canvas unavailable; ordinary effects retained.');
    c.drawImage(im,0,0);const d=c.getImageData(0,0,source.width,source.height).data;
    let x0=source.width,y0=source.height,x1=-1,y1=-1;
    for(let i=3;i<d.length;i+=4)if(d[i]>24){const p=(i-3)/4,x=p%source.width,y=Math.floor(p/source.width);x0=Math.min(x0,x);x1=Math.max(x1,x);y0=Math.min(y0,y);y1=Math.max(y1,y);}
    if(x1<x0)throw new Error('The embedded logo is empty.');
    const out=document.createElement('canvas');out.width=out.height=SIZE;
    const w=x1-x0+1,h=y1-y0+1,k=SIZE*.9/Math.max(w,h);
    out.getContext('2d').drawImage(source,x0,y0,w,h,(SIZE-w*k)/2,(SIZE-h*k)/2,w*k,h*k);return out;
  }
  function stamp(ctx,original,index,smoke=false){
    const [x,y]=xy(index),base=original.getImageData(x,y,SIZE,SIZE);
    let covered=0;for(let i=3;i<base.data.length;i+=4)if(base.data[i]>8)covered++;
    if(covered<500)throw new Error('Particle atlas changed; ordinary effects retained.');
    const tile=document.createElement('canvas');tile.width=tile.height=SIZE;
    const c=tile.getContext('2d');c.putImageData(base,0,0);c.globalCompositeOperation='source-atop';
    c.save();c.translate(0,SIZE);c.scale(1,-1);const margin=smoke?10:2;c.drawImage(picture,margin,margin,SIZE-margin*2,SIZE-margin*2);c.restore();
    const out=c.getImageData(0,0,SIZE,SIZE);for(let i=3;i<out.data.length;i+=4)out.data[i]=base.data[i];
    ctx.putImageData(out,...xy(smoke?LOGO:index));
  }
  function circleLogo(im){
    const out=document.createElement('canvas');out.width=out.height=SIZE;const c=out.getContext('2d');
    c.beginPath();c.arc(SIZE/2,SIZE/2,SIZE/2,0,Math.PI*2);c.clip();
    c.fillStyle='#2d2e30';c.fillRect(0,0,SIZE,SIZE);c.drawImage(im,0,0,SIZE,SIZE);return out;
  }
  function cloneTexture(original){
    if(!original||original.invertY!==true||typeof original.clone!=='function')throw new Error('Unsupported particle texture.');
    const source=original.getContext?.(),canvas=source?.canvas;
    if(!canvas||canvas.width!==ATLAS||canvas.height!==ATLAS)throw new Error('Particle atlas dimensions changed.');
    const free=source.getImageData(...xy(LOGO),SIZE,SIZE).data,puff=source.getImageData(...xy(PUFF),SIZE,SIZE).data;
    let used=false;for(let i=3;i<free.length;i+=4)if(free[i])used=true;
    // An installed Smoke Logo may already use this cell with the same alpha.
    if(used)for(let i=3;i<free.length;i+=4)if(free[i]!==puff[i])throw new Error('The reserved smoke cell has a different shape.');
    let copy=null;
    try{
      copy=original.clone();const ctx=copy&&copy!==original&&copy.getContext?.();
      if(!ctx||ctx===source||ctx.canvas===canvas||ctx.canvas.width!==ATLAS||ctx.canvas.height!==ATLAS||copy.invertY!==true||typeof copy.updateSamplingMode!=='function'||typeof copy.update!=='function'||typeof copy.dispose!=='function')throw new Error('Cannot make an independent particle texture.');
      copy.updateSamplingMode(original.samplingMode);if(copy.samplingMode!==original.samplingMode)throw new Error('Particle filtering changed.');
      ctx.putImageData(source.getImageData(0,0,ATLAS,ATLAS),0,0);
      stamp(ctx,source,PUFF,true);for(let n=131;n<=134;n++)stamp(ctx,source,n);
      const [x,y]=xy(130);ctx.clearRect(x,y,SIZE,SIZE);ctx.save();ctx.translate(x,y+SIZE);ctx.scale(1,-1);ctx.drawImage(yolkPicture,0,0);ctx.restore();
      copy.update();return copy;
    }catch(e){if(copy&&copy!==original)try{copy.dispose?.();}catch{}throw e;}
  }
  function attachSmoke(manager,copy){
    for(const sprite of manager.sprites){
      const original=Object.getOwnPropertyDescriptor(sprite,'cellIndex');
      if(original&&(!('value'in original)||!original.configurable||!original.writable))throw new Error('The smoke cell property changed.');
      // Native unused sprites have no cellIndex until the game first assigns it.
      if(!original)for(let p=Object.getPrototypeOf(sprite);p;p=Object.getPrototypeOf(p)){
        const inherited=Object.getOwnPropertyDescriptor(p,'cellIndex');
        if(inherited){if(!('value'in inherited)||!inherited.writable)throw new Error('Another mod owns the smoke cell property.');break;}
      }
      const state={sprite,original,value:sprite.cellIndex,assigned:false,live:true,get:null,set:null};
      state.get=function(){return state.live&&running&&manager.texture===copy&&state.value===PUFF&&this.size>.45&&this.startSize<0?LOGO:state.value;};
      state.set=function(v){state.value=v;state.assigned=true;};
      Object.defineProperty(sprite,'cellIndex',{configurable:true,enumerable:original?original.enumerable:true,get:state.get,set:state.set});cells.push(state);
    }
  }
  function release(){
    for(const state of cells){state.live=false;try{const now=Object.getOwnPropertyDescriptor(state.sprite,'cellIndex');if(now?.get===state.get&&now?.set===state.set){
      if(state.original)Object.defineProperty(state.sprite,'cellIndex',{...state.original,value:state.value});
      else if(state.assigned)Object.defineProperty(state.sprite,'cellIndex',{value:state.value,writable:true,enumerable:true,configurable:true});
      else delete state.sprite.cellIndex;
    }}catch{}}
    cells.length=0;
    for(const [m,e]of managers)try{if(m.texture===e.copy)m.texture=e.original;}catch{}
    managers.clear();for(const t of textures)try{t.dispose();}catch{}textures.clear();
  }
  function install(scene){
    const all=scene.spriteManagers;if(!Array.isArray(all))return;
    const choose=n=>all.filter(m=>m.sprites?.length===n&&m.cellWidth===SIZE&&m.cellHeight===SIZE&&(n!==300||m.blendMode!==1));
    const groups=[choose(300),choose(400),choose(100)];if(groups.some(a=>a.length!==1))return;
    const selected=groups.map(a=>a[0]),copies=new Map();
    try{
      for(const m of selected){const original=m.texture;let copy=copies.get(original);if(!copy){copy=cloneTexture(original);copies.set(original,copy);textures.add(copy);}managers.set(m,{original,copy});}
      const smoke=selected[0];attachSmoke(smoke,managers.get(smoke).copy);
      for(const [m,e]of managers){m.texture=e.copy;if(m.texture!==e.copy)throw new Error('Particle texture assignment failed.');}
      issue='';
    }catch(e){release();paused=true;warnOnce(e);}
  }
  function tick(){
    if(!running)return;
    try{
      const scene=window.P?.scene;
      if(scene!==currentScene){release();currentScene=scene;paused=false;}
      if(managers.size&&([...managers].some(([m,e])=>m.texture!==e.copy)||cells.some(s=>{const d=Object.getOwnPropertyDescriptor(s.sprite,'cellIndex');return d?.get!==s.get||d?.set!==s.set;}))){release();paused=true;issue='Another mod changed the particle texture; reload to retry.';}
      if(picture&&yolkPicture&&scene&&!paused&&!managers.size)install(scene);
    }catch(e){release();paused=true;warnOnce(e);}
  }
  function start(){
    if(running)return;running=true;paused=false;const token=++epoch;
    for(const [kind,data]of [['transparent',IMAGE],['circle',YOLK_IMAGE]]){
      const im=new Image();images.push(im);
      im.onload=()=>{if(!running||token!==epoch)return;try{if(kind==='transparent')picture=cropLogo(im);else yolkPicture=circleLogo(im);im.onload=im.onerror=null;if(picture&&yolkPicture)images=[];tick();}catch(e){warnOnce(e);}};
      im.onerror=()=>{if(running&&token===epoch)warnOnce('The embedded Shellstrike logo could not load.');};im.src=data;
    }
    timer=setInterval(tick,1000);tick();
  }
  function stop(){
    if(!running)return;running=false;epoch++;clearInterval(timer);timer=0;
    for(const im of images)im.onload=im.onerror=null;images=[];release();picture=yolkPicture=null;currentScene=null;paused=false;
  }
  window.ssShellstrike={version:VERSION,start,stop,status:()=>({running,ready:!!(picture&&yolkPicture),active:managers.size===3,managers:managers.size,textureCopies:textures.size,paused,issue,preset:'Shellstrike',phase:!running?'stopped':paused?'paused':!(picture&&yolkPicture)?'loading artwork':managers.size===3?'active':currentScene?'waiting for particle pools':'waiting for match'})};
  start();(window.ssModMenuQueue=window.ssModMenuQueue||[]).push({id:'shellstrike',name:'Shellstrike',version:VERSION,group:'mod',description:'Shellstrike smoke, yolk bursts and stamped shell fragments. Fixed preset.',enable:start,disable:stop});
})();
