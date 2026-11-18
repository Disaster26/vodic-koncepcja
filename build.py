s=open('src.html',encoding='utf-8').read()
s=s.replace('{{BADGE_STYLE}}',open('badge_style.part',encoding='utf-8').read().replace('<style>','').replace('</style>',''))
s=s.replace('{{BADGE_LINK}}',open('badge_link.part',encoding='utf-8').read())
open('index.html','w',encoding='utf-8').write(s)
