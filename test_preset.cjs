const L=require('../smoke-logo-parallel-checks/home-lib.cjs'),fs=require('fs'),path=require('path'),crypto=require('crypto');
const file=path.resolve(__dirname,'../../Shellstrike-Theme/Shellshockers-Shellstrike-Mod.user.js');
const FIXTURE=process.argv.includes('--fixture'),source=fs.readFileSync(file,'utf8');
(async()=>{const h=await L.open({file:FIXTURE?'none':file,out:__dirname,label:'shellstrike'});const{page,ev,check,info}=h;page.on('console',m=>{if(/\[Shellstrike\]/.test(m.text()))h.R.logs.push(m.type()+': '+m.text());});try{
 if(FIXTURE){
  await h.ctx.route('https://shellstrike.test/',r=>r.fulfill({contentType:'text/html',body:'<!doctype html><title>Real Babylon particle regression</title><style>body{margin:0;background:#18232b;color:white;font:18px sans-serif}canvas{display:block;width:960px;height:600px}</style><canvas id="canvas" width="960" height="600"></canvas>'}));
  await h.ctx.addInitScript({content:source});await page.goto('https://shellstrike.test/');
  await page.addScriptTag({content:require('./real-library.cjs')()});
  const asset='data:image/png;base64,'+fs.readFileSync(path.resolve(__dirname,'../grenade-tint/probes/out-atlas/atlas.png')).toString('base64');
  const native=await ev(data=>new Promise(resolve=>{const image=new Image();image.onload=()=>{
   const l=window.__real,engine=new l.Engine(document.querySelector('canvas'),true,{preserveDrawingBuffer:true,stencil:true},false),scene=new l.Scene(engine);
   scene.activeCamera=new l.Camera('test-camera',new l.Vector(0,0,-7),scene);scene.activeCamera.setTarget(l.Vector.Zero());
   const texture=new l.Texture('real-particle-atlas',2048,scene,true,2);texture.getContext().drawImage(image,0,0);texture.update();
   for(const [count,blend]of [[300,2],[300,1],[400,2],[100,2]]){const m=new l.Manager('pool-'+count+'-'+blend,'',count,128,scene);m.blendMode=blend;m.texture=texture;for(let i=0;i<count;i++)new l.Sprite('',m).isVisible=false;}
   window.P=scene.spriteManagers.find(m=>m.sprites.length===400);window.__nativeScene={scene,engine};
   resolve({engine:engine.getClassName(),sprites:scene.spriteManagers.reduce((n,m)=>n+m.sprites.length,0),unusedCells:scene.spriteManagers[0].sprites.filter(s=>!Object.hasOwn(s,'cellIndex')).length,size:scene.spriteManagers[0].sprites[0].size});
  };image.src=data;}),asset);
  info('native game classes',native);
  h.R.environment='Real captured Babylon Engine/Scene/SpriteManager/Sprite/DynamicTexture and game atlas in isolated WebGL; no server match';
 }else{await L.home(h);h.R.environment='Current game';}
 await page.waitForFunction(()=>window.ssShellstrike?.status().ready,null,{timeout:15000});
 check('preset starts automatically',await ev(()=>window.ssShellstrike.status().running&&window.ssShellstrike.status().preset==='Shellstrike'));
 check('no settings, upload control or settings API',await ev(()=>!window.ssShellstrike.set&&!window.ssShellstrike.openSettings&&!document.querySelector('[id^="ss-shellstrike"]')));
 check('no persistent preset storage',await ev(()=>localStorage.getItem('ssShellstrike')===null));
 check('77 domains and local-only update metadata',(source.match(/^\/\/ @match\s/gm)||[]).length===77&&/^\/\/ @updateURL\s+none$/m.test(source));
 if(!FIXTURE)await L.createRoom(h,true);await page.waitForFunction(()=>window.ssShellstrike.status().active||window.ssShellstrike.status().paused,null,{timeout:60000});
 const startup=await ev(()=>window.ssShellstrike.status());check('activates on unused native sprites',startup.active,startup);if(!startup.active)throw new Error('Native startup failure: '+startup.issue);
 const atlas=await ev(()=>{
  const all=window.P.scene.spriteManagers,sm=all.find(m=>m.sprites.length===300&&m.blendMode!==1),fire=all.find(m=>m.sprites.length===300&&m.blendMode===1),shell=all.find(m=>m.sprites.length===400),yolk=all.find(m=>m.sprites.length===100);
  window.__ssTest={sm,fire,shell,yolk,original:fire.texture};
  const a=fire.texture.getContext(),b=sm.texture.getContext(),at=(ctx,n)=>ctx.getImageData(n%16*128,(15-Math.floor(n/16))*128,128,128).data;
  const compare=(n,m=n)=>{const x=at(a,n),y=at(b,m);let alpha=0,rgb=0,transparent=0,blue=0,white=0;for(let i=0;i<x.length;i+=4){alpha=Math.max(alpha,Math.abs(x[i+3]-y[i+3]));if(y[i+3]===0)transparent++;if(y[i+3]>40){if(y[i+2]>y[i]+50)blue++;if(y[i]>180&&y[i+1]>180&&y[i+2]>180)white++;}if(Math.abs(x[i]-y[i])+Math.abs(x[i+1]-y[i+1])+Math.abs(x[i+2]-y[i+2])>40)rgb++;}return{alpha,rgb,transparent,blue,white};};
  const canvas=document.createElement('canvas');canvas.width=1536;canvas.height=580;const c=canvas.getContext('2d');c.fillStyle='#18232b';c.fillRect(0,0,canvas.width,canvas.height);c.font='bold 22px sans-serif';c.fillStyle='white';
  const ids=[144,130,131,132,133,134],labels=['Smoke','Yolk','Shell 1','Shell 2','Shell 3','Shell 4'];
  ids.forEach((n,i)=>{c.fillText(labels[i],i*256+12,28);for(let row=0;row<2;row++){const ctx=row?b:a,id=row&&n===144?240:n,t=document.createElement('canvas');t.width=t.height=128;t.getContext('2d').putImageData(ctx.getImageData(id%16*128,(15-Math.floor(id/16))*128,128,128),0,0);c.save();c.translate(i*256,40+row*270+256);c.scale(2,-2);c.drawImage(t,0,0);c.restore();}});
  window.__ssTest.preview=canvas.toDataURL('image/png');
  return{status:window.ssShellstrike.status(),private:sm.texture!==fire.texture&&shell.texture===sm.texture&&yolk.texture===sm.texture,filter:[fire.texture.samplingMode,sm.texture.samplingMode],smoke:compare(144,240),shells:[131,132,133,134].map(n=>compare(n)),yolk:compare(130),puffUnchanged:compare(144).rgb===0,fireOriginal:fire.texture===window.__ssTest.original};
 });info('atlas',atlas);
 check('three target pools share one private copy',atlas.private&&atlas.status.textureCopies===1&&atlas.status.managers===3);
 check('original filtering retained',atlas.filter[0]===atlas.filter[1]);
 check('smoke alpha exactly preserved, logo changes RGB',atlas.smoke.alpha===0&&atlas.smoke.rgb>100,atlas.smoke);
 check('all four shell silhouettes preserved and stamped',atlas.shells.every(x=>x.alpha===0&&x.rgb>100),atlas.shells);
 const circle=await ev(()=>{const ctx=window.__ssTest.yolk.texture.getContext(),d=ctx.getImageData(2*128,7*128,128,128).data;let inside=255,outside=0,gray=0;for(let y=0;y<128;y++)for(let x=0;x<128;x++){const i=(y*128+x)*4,r=Math.hypot(x+.5-64,y+.5-64);if(r<61)inside=Math.min(inside,d[i+3]);if(r>65)outside=Math.max(outside,d[i+3]);if(d[i+3]===255&&Math.abs(d[i]-d[i+1])<15&&Math.abs(d[i+1]-d[i+2])<15&&d[i]<90)gray++;}return{inside,outside,gray};});
 check('yolk is an opaque gray-background circle with transparent exterior',circle.inside===255&&circle.outside===0&&circle.gray>1000&&atlas.yolk.transparent>3000&&atlas.yolk.blue>100,circle);
 check('original puff and fire remain unchanged',atlas.puffUnchanged&&atlas.fireOriginal);
 const png=await ev(()=>window.__ssTest.preview);fs.writeFileSync(path.join(__dirname,'particle-proof.png'),Buffer.from(png.split(',')[1],'base64'));
 const targeting=await ev(()=>{const s=window.__ssTest.sm.sprites[0],v=[{pos:0,color:{r:1,g:1,b:1,a:1}}];s.cellIndex=144;s.size=1;s.startSize=-1;s.animColors=v;const blast=s.cellIndex;s.size=.4;const small=s.cellIndex;s.size=1;s.startSize=.1;const bullet=s.cellIndex;s.startSize=-1;s.cellIndex=148;const item=s.cellIndex;s.cellIndex=144;s.isVisible=false;return{blast,small,bullet,item,gradient:s.animColors===v};});
 check('only large default blast smoke selects the logo cell',targeting.blast===240&&targeting.small===144&&targeting.bullet===144&&targeting.item===148,targeting);
 check('gradient identity remains untouched',targeting.gradient);
 await ev(()=>{window.ssShellstrike.stop();window.ssShellstrike.stop();});
 check('stop restores textures and original cell properties',await ev(()=>{const t=window.__ssTest,d=Object.getOwnPropertyDescriptor(t.sm.sprites[0],'cellIndex');return[t.sm,t.shell,t.yolk].every(m=>m.texture===t.original)&&'value'in d&&d.value===144&&!window.ssShellstrike.status().active;}));
 check('untouched native sprites regain their absent cellIndex property',await ev(()=>window.__ssTest.sm.sprites.slice(1).every(s=>!Object.hasOwn(s,'cellIndex'))));
 await ev(()=>{window.ssShellstrike.start();window.ssShellstrike.start();});await page.waitForFunction(()=>window.ssShellstrike.status().active);
 check('restart is idempotent',await ev(()=>window.ssShellstrike.status().textureCopies===1));
 await ev(()=>{const t=window.__ssTest;t.shell.texture=t.original;});await page.waitForFunction(()=>window.ssShellstrike.status().paused);
 check('foreign texture retained and own changes released',await ev(()=>{const t=window.__ssTest;return[t.sm,t.shell,t.yolk].every(m=>m.texture===t.original)&&window.ssShellstrike.status().textureCopies===0;}));
 await ev(()=>window.ssShellstrike.stop());
 if(FIXTURE){
  const renderProof=await ev(async()=>{
   const t=window.__ssTest,{engine,scene}=window.__nativeScene;
   scene.clearColor=new t.sm.sprites[0].color.constructor(.08,.12,.14,1);
   const items=[[t.sm,0,144],[t.yolk,0,130],...[131,132,133,134].map((c,i)=>[t.shell,i,c])];
   items.forEach(([m,index,cell],i)=>{const s=m.sprites[index];s.cellIndex=cell;s.size=1.2;s.startSize=-1;s.position.set((i-2.5)*1.35,0,0);s.color.copyFromFloats(1,1,1,1);s.isVisible=true;});
   const frame=async()=>{for(let i=0;i<25;i++){engine.beginFrame();scene.render();engine.endFrame();await new Promise(r=>setTimeout(r,40));}const pixels=await engine.readPixels(0,0,engine.getRenderWidth(),engine.getRenderHeight());let blue=0,bright=0;for(let i=0;i<pixels.length;i+=4){if(pixels[i+2]>pixels[i]+35&&pixels[i+2]>pixels[i+1]+10)blue++;if(pixels[i]>170&&pixels[i+1]>170&&pixels[i+2]>170)bright++;}return{blue,bright,png:engine.getRenderingCanvas().toDataURL('image/png')};};
   const before=await frame();window.ssShellstrike.start();for(let i=0;i<100&&!window.ssShellstrike.status().active;i++)await new Promise(r=>setTimeout(r,50));const after=await frame();const active=window.ssShellstrike.status().active;
   window.ssShellstrike.stop();for(const [m,index]of items)m.sprites[index].isVisible=false;
   return{before,after,active};
  });
  fs.writeFileSync(path.join(__dirname,'real-render-before.png'),Buffer.from(renderProof.before.png.split(',')[1],'base64'));
  fs.writeFileSync(path.join(__dirname,'real-render-after.png'),Buffer.from(renderProof.after.png.split(',')[1],'base64'));
  check('actual WebGL renderer displays the Shellstrike effects',renderProof.active&&renderProof.after.blue>renderProof.before.blue+100&&renderProof.after.bright>100,{beforeBlue:renderProof.before.blue,afterBlue:renderProof.after.blue,bright:renderProof.after.bright});
 }
 check('no page errors',h.R.pageErrors.length===0,h.R.pageErrors);
 const errors=h.R.logs.filter(x=>/^(error|warning):.*(INIT|Shellstrike)/.test(x));check('no mod errors',errors.length===0,errors);
 h.R.sha256=crypto.createHash('sha256').update(source).digest('hex');fs.writeFileSync(path.join(__dirname,'results.json'),JSON.stringify(h.R,null,2));
 console.log('RESULT '+h.R.checks.filter(x=>x.ok).length+'/'+h.R.checks.length);if(h.R.checks.some(x=>!x.ok))process.exitCode=1;
 }finally{await h.browser.close();}})().catch(e=>{console.error(e.stack);process.exitCode=1;});
