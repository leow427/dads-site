from pathlib import Path
from urllib.request import urlopen,Request
from concurrent.futures import ThreadPoolExecutor
from urllib.parse import urlparse
import hashlib,json
root=Path.cwd();data=json.loads((root/'app/original-content.json').read_text());out=root/'public/images/original';out.mkdir(exist_ok=True)
jobs={}
for page in data:
 for b in page['blocks']:
  if b['type']=='image':
   url=b['source'];ext=Path(urlparse(url).path).suffix.lower();ext=ext if ext in ('.jpg','.jpeg','.png','.gif') else '.jpg'
   name=hashlib.sha256(url.encode()).hexdigest()[:12]+ext;b['src']='/images/original/'+name
   jobs[url]=(url,out/name)
def fetch(job):
 url,path=job
 if not path.exists():path.write_bytes(urlopen(Request(url+'?format=1000w',headers={'User-Agent':'Mozilla/5.0'}),timeout=35).read())
 return path.name,path.stat().st_size
results=list(ThreadPoolExecutor(8).map(fetch,jobs.values()));(root/'app/original-content.json').write_text(json.dumps(data,ensure_ascii=False,indent=2));print('Saved',len(results),'original images;',sum(r[1] for r in results),'bytes')
