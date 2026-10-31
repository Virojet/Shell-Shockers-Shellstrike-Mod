from pathlib import Path
import base64,re,shutil

root=Path(__file__).resolve().parents[2]
out=root/'Shellstrike-Theme'
base=(root/'smoke-logo-codex/Shell-Shockers-Smoke-Logo.user.js').read_text(encoding='utf-8')
header=base.split('// ==/UserScript==',1)[0]+'// ==/UserScript=='
header=header.replace('Shell Shockers Smoke Logo','Shellshockers Shellstrike Mod')
header=re.sub(r'^// @version.*$','// @version 1.0.2',header,flags=re.M)
header=re.sub(r'^// @description.*$','// @description Fixed Shellstrike smoke, shell fragments and circular yolk. No settings.',header,flags=re.M)
header=re.sub(r'^// @(downloadURL|updateURL).*$',r'// @\1 none',header,flags=re.M)
icon='data:image/png;base64,'+base64.b64encode((out/'assets/shellstrike-icon-32.png').read_bytes()).decode()
header=header.replace('// @license      MIT','// @license MIT\n// @icon '+icon)
header=re.sub(r'^(// @\w+)[ \t]+',r'\1 ',header,flags=re.M)
body=(Path(__file__).parent/'preset.template.js').read_text(encoding='utf-8')
body=body[:body.index('  function cropLogo(')]+body[body.index('  function stamp('):]
body=body[:body.index('  function circleLogo(')]+body[body.index('  function cloneTexture('):]
body=body.replace("VERSION='1.0.1'","VERSION='1.0.2'")
body=body.replace('picture=cropLogo(im)','picture=im').replace('yolkPicture=circleLogo(im)','yolkPicture=im')
body=re.sub(r'/\*.*?\*/','',body,flags=re.S)
body=re.sub(r'^\s*//.*\n','',body,flags=re.M)
body='\n'.join(line.strip() for line in body.splitlines() if line.strip())
for marker,name in [('__SHELLSTRIKE_PNG__','shellstrike-logo-128.png'),('__SHELLSTRIKE_YOLK_PNG__','shellstrike-yolk-128.png')]:
    body=body.replace(marker,'data:image/png;base64,'+base64.b64encode((out/'assets'/name).read_bytes()).decode())
data=(header+'\n'+body+'\n').encode('utf-8')
assert len(data)<50000,'Discord preview budget exceeded'
script=out/'Shellshockers-Shellstrike-Mod.user.js'
script.write_bytes(data)
(out/'Shellshockers-Shellstrike-Mod.txt').write_bytes(data)
print(f'Built userscript + identical Discord TXT: {len(data):,} bytes ({len(data)/1000:.1f} KB) each')
