from html.parser import HTMLParser
from html import escape, unescape
from pathlib import Path
import json,re
from urllib.request import urlopen, Request
class Node:
 def __init__(self,tag='',attrs=None,parent=None):self.tag=tag;self.attrs=dict(attrs or []);self.children=[];self.parent=parent
 def text(self):return ''.join(x.text() if isinstance(x,Node) else x for x in self.children)
 def find(self,p):
  out=[]
  for n in self.children:
   if isinstance(n,Node):
    if p(n):out.append(n)
    out+=n.find(p)
  return out
class Parser(HTMLParser):
 def __init__(self):super().__init__();self.root=Node('root');self.node=self.root
 def handle_starttag(self,t,a):
  n=Node(t,a,self.node);self.node.children.append(n)
  if t not in ['area','base','br','col','embed','hr','img','input','link','meta','param','source','track','wbr']:self.node=n
 def handle_endtag(self,t):
  n=self.node
  while n.parent:
   if n.tag==t:self.node=n.parent;return
   n=n.parent
 def handle_data(self,d):self.node.children.append(d)
def text(n):return re.sub(r'\s+',' ',n.text()).strip()
allowed={'h1','h2','h3','h4','h5','h6','p','strong','b','em','i','ul','ol','li','br','a','blockquote'}
def clean(n):
 if isinstance(n,str):return escape(n)
 if n.tag in ('script','style','iframe'):return ''
 inside=''.join(clean(c) for c in n.children)
 if n.tag not in allowed:return inside
 tag=n.tag
 attrs=''
 if tag=='a':
  href=n.attrs.get('href','')
  if href.startswith('/') and not href.startswith('//'):href='https://gocreativeprograms.com'+href
  if href.startswith(('https://','http://','mailto:','tel:','#')):attrs=' href="'+escape(href,quote=True)+'"'
  else:return inside
 if tag=='br':return '<br/>'
 return '<'+tag+attrs+'>'+inside+'</'+tag+'>'
def read(page,path):
 if not Path(path).exists():
  Path(path).write_bytes(urlopen(Request('https://gocreativeprograms.com/'+page,headers={'User-Agent':'Mozilla/5.0'}),timeout=30).read())
 parser=Parser();parser.feed(Path(path).read_text());root=parser.root
 content=root.find(lambda n:n.attrs.get('id')=='content')[0]
 blocks=[]
 for b in content.find(lambda n:'sqs-block ' in n.attrs.get('class','')):
  c=b.attrs.get('class','')
  if 'sqs-block-html' in c:
   cs=b.find(lambda n:'sqs-html-content' in n.attrs.get('class',''));n=cs[0] if cs else b
   if text(n):blocks.append({'type':'text','html':clean(n),'text':text(n)})
  elif 'sqs-block-image' in c:
   imgs=b.find(lambda n:n.tag=='img')
   if imgs:
    n=imgs[0];u=n.attrs.get('data-src',n.attrs.get('src',''));blocks.append({'type':'image','source':u,'alt':n.attrs.get('alt',''),'dimensions':n.attrs.get('data-image-dimensions','')})
  elif 'sqs-block-button' in c:
   anchors=b.find(lambda n:n.tag=='a')
   if anchors:blocks.append({'type':'button','text':text(anchors[0]),'href':anchors[0].attrs.get('href','')})
  elif 'sqs-block-video' in c:
   urls=[]
   for node in [b]+b.find(lambda n:True):
    for v in node.attrs.values():
     for match in re.findall(r'https?[^\s"<>]+',unescape(v)):
      if 'youtu' in match:urls.append(match)
   blocks.append({'type':'video','urls':list(dict.fromkeys(urls))})
 d={'slug':page,'blocks':blocks}
 Path('/tmp/gocreative-structured-'+page+'.json').write_text(json.dumps(d,ensure_ascii=False,indent=2))
 print(page,'blocks',len(blocks))
 for i,b in enumerate(blocks):
  if b['type']!='image':print(i,b)
  else:print(i,'IMAGE',b['source'].split('/')[-1])
 return d
pages=['new-page','musicababy','business-solutions','being-bilingual-rocks','bbrband','new-page-2','collaborations','about-us']
all=[]
for page in pages:all.append(read(page,'/tmp/gocreative-'+('original' if page=='new-page' else page)+'.html'))
Path('app/original-content.json').write_text(json.dumps(all,ensure_ascii=False,indent=2))
