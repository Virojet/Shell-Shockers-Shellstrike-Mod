// Package the existing logo as small userscript metadata thumbnails.
const {chromium}=require('C:/Users/ltgre/AppData/Local/ms-playwright-go/1.50.1/package');
const fs=require('fs'),path=require('path');
const {PNG}=require('C:/Users/ltgre/AppData/Local/ms-playwright-go/1.50.1/package/lib/utilsBundle.js');
const sizes=process.argv.includes('--small')?[32]:[32,64,128];
(async()=>{const browser=await chromium.launch({executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe',headless:true});try{
 const page=await browser.newPage();
 const asset=path.resolve(__dirname,'../../Shellstrike-Theme/assets');
 const src='data:image/png;base64,'+fs.readFileSync(path.join(asset,'shellstrike-transparent.png')).toString('base64');
 const icons=await page.evaluate(({src,sizes})=>new Promise((resolve,reject)=>{const im=new Image();im.onerror=()=>reject(new Error('Logo could not load'));im.onload=()=>{
  const c=document.createElement('canvas');c.width=im.naturalWidth;c.height=im.naturalHeight;const ctx=c.getContext('2d');ctx.drawImage(im,0,0);const d=ctx.getImageData(0,0,c.width,c.height).data;
  let l=c.width,t=c.height,r=0,b=0;for(let i=3;i<d.length;i+=4)if(d[i]>24){const p=(i-3)/4,x=p%c.width,y=Math.floor(p/c.width);l=Math.min(l,x);r=Math.max(r,x);t=Math.min(t,y);b=Math.max(b,y);}
  resolve(sizes.map(size=>{const out=document.createElement('canvas');out.width=out.height=size;const x=out.getContext('2d');x.beginPath();x.arc(size/2,size/2,size/2,0,Math.PI*2);x.fillStyle='#2d2e30';x.fill();const w=r-l+1,h=b-t+1,k=size*.9/Math.max(w,h);x.drawImage(im,l,t,w,h,(size-w*k)/2,(size-h*k)/2,w*k,h*k);return{size,data:out.toDataURL('image/png')};}));
 };im.src=src;}),{src,sizes});
 for(const icon of icons){
  let best=Buffer.from(icon.data.split(',')[1],'base64');const decoded=PNG.sync.read(best);
  for(const deflateStrategy of [0,1,2,3])for(const filterType of [-1,0,1,2,3,4]){const p=PNG.sync.write(decoded,{deflateLevel:9,deflateStrategy,filterType});if(p.length<best.length)best=p;}
  if(!PNG.sync.read(best).data.equals(decoded.data))throw new Error('Icon compression changed pixels');
  fs.writeFileSync(path.join(asset,'shellstrike-icon-'+icon.size+'.png'),best);console.log(icon.size+'px icon:',best.length,'bytes');
 }
 }finally{await browser.close();}})().catch(e=>{console.error(e);process.exitCode=1;});
