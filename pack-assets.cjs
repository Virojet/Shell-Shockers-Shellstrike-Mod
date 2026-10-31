// Losslessly package the exact 128px textures the full script renders at runtime.
const {chromium}=require('C:/Users/ltgre/AppData/Local/ms-playwright-go/1.50.1/package');
const {PNG}=require('C:/Users/ltgre/AppData/Local/ms-playwright-go/1.50.1/package/lib/utilsBundle.js');
const fs=require('fs'),path=require('path');
(async()=>{const browser=await chromium.launch({executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe',headless:true});try{
 const page=await browser.newPage(),root=path.resolve(__dirname,'../../Shellstrike-Theme'),t=fs.readFileSync(path.join(__dirname,'preset.template.js'),'utf8');
 const crop=t.slice(t.indexOf('  function cropLogo('),t.indexOf('  function stamp('));
 const circle=t.slice(t.indexOf('  function circleLogo('),t.indexOf('  function cloneTexture('));
 await page.addScriptTag({content:'const SIZE=128;'+crop+circle+';window.__make=[cropLogo,circleLogo];'});
 for(const [index,name,out]of [[0,'shellstrike-transparent.png','shellstrike-logo-128.png'],[1,'shellstrike-original.png','shellstrike-yolk-128.png']]){
  const src='data:image/png;base64,'+fs.readFileSync(path.join(root,'assets',name)).toString('base64');
  const png=await page.evaluate(({src,index})=>new Promise((resolve,reject)=>{const im=new Image();im.onerror=()=>reject(new Error('Image load failed'));im.onload=()=>resolve(window.__make[index](im).toDataURL('image/png'));im.src=src;}),{src,index});
  const original=Buffer.from(png.split(',')[1],'base64'),decoded=PNG.sync.read(original);let best=original;
  for(const deflateStrategy of [0,1,2,3])for(const filterType of [-1,0,1,2,3,4]){const candidate=PNG.sync.write(decoded,{deflateLevel:9,deflateStrategy,filterType});if(candidate.length<best.length)best=candidate;}
  if(!PNG.sync.read(best).data.equals(decoded.data))throw new Error('Texture pixels changed');
  fs.writeFileSync(path.join(root,'assets',out),best);console.log(out,best.length,'bytes; pixel-identical');
 }
 }finally{await browser.close();}})().catch(e=>{console.error(e);process.exitCode=1;});
