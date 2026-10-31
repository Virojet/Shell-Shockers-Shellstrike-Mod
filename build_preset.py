from pathlib import Path
import base64,re,shutil,sys,runpy
if '--full' not in sys.argv:
    runpy.run_path(str(Path(__file__).with_name('build_small.py')))
    raise SystemExit(0)
root=Path(__file__).resolve().parents[2]
out=root/'Shellstrike-Theme'
(out/'assets').mkdir(parents=True,exist_ok=True)
asset=out/'assets/shellstrike-transparent.png'
if not asset.exists(): shutil.copyfile(root/'Shellstrike-Kill-Effects/assets/shellstrike-transparent.png',asset)
base=(root/'smoke-logo-codex/Shell-Shockers-Smoke-Logo.user.js').read_text(encoding='utf-8')
header=base[:base.index('// ==/UserScript==')+len('// ==/UserScript==')]
header=header.replace('Shell Shockers Smoke Logo','Shellshockers Shellstrike Mod')
header=re.sub(r'^// @version.*$','// @version      1.0.1',header,flags=re.M)
header=re.sub(r'^// @description.*$',"// @description  Fixed Shellstrike logos on blast smoke, yolk bursts and shell fragments. No settings.",header,flags=re.M)
header=re.sub(r'^// @(downloadURL|updateURL).*$',r'// @\1    none',header,flags=re.M)
icon='data:image/png;base64,'+base64.b64encode((out/'assets/shellstrike-icon-64.png').read_bytes()).decode()
icon64='data:image/png;base64,'+base64.b64encode((out/'assets/shellstrike-icon-128.png').read_bytes()).decode()
header=header.replace('// @license      MIT','// @license      MIT\n// @icon         '+icon+'\n// @icon64       '+icon64)
body=(Path(__file__).parent/'preset.template.js').read_text(encoding='utf-8')
body=body.replace('__SHELLSTRIKE_PNG__','data:image/png;base64,'+base64.b64encode(asset.read_bytes()).decode())
body=body.replace('__SHELLSTRIKE_YOLK_PNG__','data:image/png;base64,'+base64.b64encode((out/'assets/shellstrike-original.png').read_bytes()).decode())
(out/'Shellshockers-Shellstrike-Mod.full.user.js').write_text(header+'\n\n'+body,encoding='utf-8',newline='\n')
shutil.copyfile(root/'smoke-logo-codex/LICENSE',out/'LICENSE')
print('Built full-resolution variant:',(out/'Shellshockers-Shellstrike-Mod.full.user.js').stat().st_size,'bytes')
