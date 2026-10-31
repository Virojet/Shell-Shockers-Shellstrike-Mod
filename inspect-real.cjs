const {chromium}=require('C:/Users/ltgre/AppData/Local/ms-playwright-go/1.50.1/package');
(async()=>{const browser=await chromium.launch({executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe',headless:true,args:['--use-angle=swiftshader','--enable-unsafe-swiftshader']});try{
 const page=await browser.newPage();page.on('pageerror',e=>console.log('PAGEERROR',String(e).slice(0,300)));
 await page.setContent('<canvas id="canvas" width="640" height="360"></canvas>');
 await page.addScriptTag({content:require('./real-library.cjs')()});
 console.log(await page.evaluate(()=>{
  const l=window.__real,engine=new l.Engine(document.querySelector('canvas'),true,{preserveDrawingBuffer:true,stencil:true},false),scene=new l.Scene(engine),texture=new l.Texture('test',2048,scene,true,2),manager=new l.Manager('test','',300,128,scene),sprite=new l.Sprite('unused',manager);manager.texture=texture;
  return{engine:engine.getClassName(),sprite:sprite.constructor.name,hasOwnCell:Object.hasOwn(sprite,'cellIndex'),cell:sprite.cellIndex,size:sprite.size,width:sprite.width,height:sprite.height,canvas:[texture.getContext().canvas.width,texture.getContext().canvas.height],invertY:texture.invertY,sampler:texture.samplingMode};
 }));
 }finally{await browser.close();}})().catch(e=>{console.error(e.stack);process.exitCode=1;});
