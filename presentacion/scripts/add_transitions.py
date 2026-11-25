"""Agrega transiciones de diapositiva al PPTX generado (pptxgenjs no las soporta).
Aperturas de capítulo: "empujar" hacia arriba. Resto: fundido suave.
Uso: python3 add_transitions.py archivo.pptx 5,7,10,11,13,15,20
"""
import re
import shutil
import sys
import zipfile

path = sys.argv[1]
chapters = {int(x) for x in sys.argv[2].split(',')}
PUSH = '<p:transition spd="slow"><p:push dir="u"/></p:transition>'
FADE = '<p:transition spd="med"><p:fade/></p:transition>'

tmp = path + '.tmp'
with zipfile.ZipFile(path) as zin, zipfile.ZipFile(tmp, 'w', zipfile.ZIP_DEFLATED) as zout:
    for item in zin.infolist():
        data = zin.read(item.filename)
        m = re.fullmatch(r'ppt/slides/slide(\d+)\.xml', item.filename)
        if m:
            xml = data.decode('utf-8')
            if '<p:transition' not in xml:
                tr = PUSH if int(m.group(1)) in chapters else FADE
                xml = xml.replace('</p:clrMapOvr>', '</p:clrMapOvr>' + tr, 1) if '</p:clrMapOvr>' in xml else xml.replace('</p:cSld>', '</p:cSld>' + tr, 1)
            data = xml.encode('utf-8')
        zout.writestr(item, data)
shutil.move(tmp, path)
print('transiciones agregadas')
