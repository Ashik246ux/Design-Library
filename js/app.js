/* ============================================
   Design Library
   Application logic: rendering, navigation, search, modal,
   bookmarks, team activity & notifications
   ============================================ */

const SAVED_IDS_KEY='design-library-saved';
let savedIds=new Set([1,10,15,25,29,44,48,55,63]);
let browseFilter='All';
let browseSort='pop';
let homeFilter='All';
let catFilter='All';
let catSort='rating';
let editResourceId=null;
let currentDetail=null;
let lastPage='home';
const BCMAP={home:'Dashboard',browse:'Browse All',bookmarks:'Saved',category:'Categories',detail:'Resource Detail',team:'Team'};

const CATEGORIES=['UI Design','Animation','Color','Icons','Illustration','Typography','Design Systems','AI Tools','Logo Generators','Accessibility'];
const STORAGE_KEY='design-library-state';

const CURRENT_USER=TEAM.find(t=>t.isCurrentUser)||TEAM[0];

let notifications=[
{icon:'fa-user-plus',text:'New resource added: <b>Awwwards</b> to UI Design',time:'2h ago'},
{icon:'fa-user-plus',text:'New resource added: <b>Framer</b> to Animation',time:'5h ago'},
{icon:'fa-user-plus',text:'New resource added: <b>21st.dev</b> to UI Design',time:'1d ago'}
];

let prefs={dark:true,email:false,digest:true,teamalerts:true};

function fav(url){try{return'https://www.google.com/s2/favicons?domain='+new URL(url).hostname+'&sz=64';}catch(e){return'';}}
function priceCls(p){return p==='Free'?'price-free':p==='Freemium'?'price-freemium':'price-paid';}

function renderCategorySelect(){
  const sel=document.getElementById('res-cat');
  if(!sel) return;
  sel.innerHTML='<option value="">Select a category</option>' +
    CATEGORIES.map(cat=>`<option>${cat}</option>`).join('') +
    '<option>Other</option>';
}

function generateCategoryColor(name){
  const text=name.toLowerCase().trim();
  let hash=0;
  for(const char of text){
    hash = char.charCodeAt(0) + ((hash << 5) - hash);
  }
  const hue = ((hash % 360) + 360) % 360;
  const saturation=70;
  const lightness=58;
  const c = (1 - Math.abs(2 * lightness / 100 - 1)) * (saturation / 100);
  const x = c * (1 - Math.abs((hue / 60) % 2 - 1));
  const m = lightness / 100 - c / 2;
  let [r,g,b] = [0,0,0];
  if(hue < 60){[r,g,b]=[c,x,0];}
  else if(hue < 120){[r,g,b]=[x,c,0];}
  else if(hue < 180){[r,g,b]=[0,c,x];}
  else if(hue < 240){[r,g,b]=[0,x,c];}
  else if(hue < 300){[r,g,b]=[x,0,c];}
  else {[r,g,b]=[c,0,x];}
  const toHex = v => {
    const hex=Math.round((v+m)*255).toString(16).padStart(2,'0');
    return hex;
  };
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

function getCategoryColor(cat){
  if(CC[cat]) return CC[cat];
  const color = generateCategoryColor(cat);
  CC[cat] = color;
  return color;
}

function getCategoryIcon(cat){
  if(CI[cat]) return CI[cat];
  CI[cat] = 'fas fa-tag';
  return CI[cat];
}

function loadState(){
  try{
    const saved=localStorage.getItem(STORAGE_KEY);
    if(!saved) return;
    const parsed=JSON.parse(saved);
    if(parsed && Array.isArray(parsed.DATA)){
      DATA.length=0;
      DATA.push(...parsed.DATA);
    }
    if(parsed && Array.isArray(parsed.CATEGORIES)){
      CATEGORIES.length=0;
      CATEGORIES.push(...parsed.CATEGORIES);
    }
    if(parsed && Array.isArray(parsed.savedIds)){
      savedIds = new Set(parsed.savedIds.filter(id=>typeof id==='number'));
    }
  }catch(e){console.warn('Failed to load saved library state',e);}
}

function loadSavedIds(){
  try{
    const saved=localStorage.getItem(SAVED_IDS_KEY);
    if(!saved) return;
    const parsed=JSON.parse(saved);
    if(Array.isArray(parsed)){
      savedIds = new Set(parsed.filter(id=>typeof id==='number'));
    }
  }catch(e){console.warn('Failed to load saved ids',e);}
}

function saveState(){
  try{
    localStorage.setItem(STORAGE_KEY, JSON.stringify({DATA,CATEGORIES,savedIds:[...savedIds]}));
    localStorage.setItem(SAVED_IDS_KEY, JSON.stringify([...savedIds]));
  }catch(e){console.warn('Failed to persist library state',e);}
}

function renderCategorySidebar(){
  const container=document.getElementById('category-list');
  if(!container) return;
  container.innerHTML=CATEGORIES.map(cat=>{
    const count=DATA.filter(r=>r.cat===cat).length;
    const color=getCategoryColor(cat);
    return `<button class="ni" data-cat="${cat}" onclick="showCat('${cat}')"><span class="cdot" style="background:${color}"></span>${cat}<span class="nb">${count}</span></button>`;
  }).join('');
}

function handleCategoryChange(){
  const sel=document.getElementById('res-cat');
  const otherGroup=document.getElementById('other-cat-group');
  const otherInput=document.getElementById('res-cat-other');
  if(!sel||!otherGroup||!otherInput) return;
  const isOther=sel.value==='Other';
  otherGroup.classList.toggle('hidden', !isOther);
  if(!isOther) otherInput.value='';
}

function addCategoryIfNew(cat){
  if(!cat || cat==='Other') return;
  const normalized=CATEGORIES.find(existing=>existing.toLowerCase()===cat.toLowerCase());
  if(normalized) return;
  CATEGORIES.push(cat);
  getCategoryColor(cat);
  getCategoryIcon(cat);
  renderCategorySelect();
  renderCategorySidebar();
  saveState();
}

function getFaviconUrl(url){
  try{const host=new URL(url).hostname;return'https://www.google.com/s2/favicons?domain='+encodeURIComponent(host)+'&sz=128';}
  catch(e){return'';}
}

function getClearbitLogo(url){
  try{const host=new URL(url).hostname;return'https://logo.clearbit.com/'+encodeURIComponent(host)+'?size=128';}
  catch(e){return'';}
}

function card(r){
const saved=savedIds.has(r.id);
const c=getCategoryColor(r.cat);
const fi=fav(r.url);
return`<div class="rc" tabindex="0" role="article" aria-label="${r.name}, ${r.cat}, ${r.price}">
<div class="rci" style="background:${c}10">
<img src="${fi}" width="52" height="52" class="fav-img" alt="${r.name} logo" loading="lazy" onerror="this.parentElement.innerHTML='<span style=width:52px;height:52px;background:${c};border-radius:8px;display:flex;align-items:center;justify-content:center;font-size:18px;font-weight:700;color:#000'>${r.name.charAt(0)}</span>'"> 
</div>
<button class="cbm${saved?' saved':''}" onclick="event.stopPropagation();toggleSave(${r.id},this)" aria-label="${saved?'Remove':'Save'} ${r.name}"><i class="fas fa-bookmark"></i></button>
<button class="cbm del" onclick="event.stopPropagation();removeResource(${r.id})" aria-label="Delete ${r.name}"><i class="fas fa-trash"></i></button>
<div class="rcn">${r.name}</div>
<div class="rcd">${r.desc}</div>
<div class="rc-meta">
<span class="ctag" style="background:${c}18;color:${c};border:1px solid ${c}35;font-size:10px;padding:2px 7px;border-radius:10px;font-weight:500">${r.cat}</span>
<span class="${priceCls(r.price)}">${r.price}</span>
</div>
<div class="rc-actions">
<a class="rc-btn rc-link" href="${r.url}" target="_blank" rel="noopener noreferrer" onclick="event.stopPropagation()"><i class="fas fa-external-link-alt"></i>Visit Website</a>
<button class="rc-btn" onclick="event.stopPropagation();showDetail(${r.id})" aria-label="View details for ${r.name}"><i class="fas fa-info-circle"></i>View Details</button>
</div>
</div>`;
}

function tCard(r,rank){
const c=getCategoryColor(r.cat);
const pct=Math.round(r.rating*7+rank);
return`<div class="tc" onclick="showDetail(${r.id})" tabindex="0" role="article" aria-label="Trending ${rank}: ${r.name}" onkeydown="if(event.key==='Enter')showDetail(${r.id})">
<span class="trk">${rank}</span>
<div class="tlo" style="background:${c}18;border-color:${c}35"><img src="${fav(r.url)}" width="20" height="20" alt="${r.name}" style="object-fit:contain;border-radius:4px" onerror="this.style.display='none'"></div>
<div class="ti2"><div class="tn">${r.name}</div><div class="tcat">${r.cat}</div></div>
<div class="tup"><i class="fas fa-arrow-up" style="font-size:9px"></i>+${pct}%</div>
<span class="${priceCls(r.price)}">${r.price}</span>
</div>`;
}

function syncSavedUI(){
const nb=document.getElementById('bm-nb');if(nb)nb.textContent=savedIds.size;
const sub=document.getElementById('bm-sub');if(sub)sub.textContent=savedIds.size+' saved resources';
renderBM();
}

function toggleSave(id,btn){
if(savedIds.has(id)){savedIds.delete(id);btn.classList.remove('saved');btn.setAttribute('aria-label','Save resource');showToast('Removed from saved');}
else{savedIds.add(id);btn.classList.add('saved');btn.setAttribute('aria-label','Remove from saved');showToast('Saved to library');}
syncSavedUI();
  saveState();
if(currentDetail&&currentDetail.id===id){
const sl=document.getElementById('det-save-lbl');if(sl)sl.textContent=savedIds.has(id)?'Saved':'Save';
document.getElementById('det-save-btn').classList.toggle('done',savedIds.has(id));
}
}
window.toggleSave=toggleSave;

function detSave(){
if(!currentDetail)return;
const saved=savedIds.has(currentDetail.id);
if(saved){savedIds.delete(currentDetail.id);showToast('Removed from saved');}
else{savedIds.add(currentDetail.id);showToast('Saved to library');}
document.getElementById('det-save-lbl').textContent=savedIds.has(currentDetail.id)?'Saved':'Save';
document.getElementById('det-save-btn').classList.toggle('done',savedIds.has(currentDetail.id));
syncSavedUI();
 saveState();
}
window.detSave=detSave;

function detCopy(){
if(!currentDetail)return;
try{navigator.clipboard.writeText(currentDetail.url).then(()=>showToast('Link copied to clipboard'));}
catch(e){showToast('Link: '+currentDetail.url);}
}
window.detCopy=detCopy;

function renderHome(f){
const d=f==='All'?DATA:DATA.filter(r=>r.cat===f);
const featured=[...d].sort((a,b)=>b.rating-a.rating).slice(0,6);
document.getElementById('home-feat').innerHTML=featured.map(r=>card(r)).join('');
document.getElementById('home-recent').innerHTML=d.slice(0,4).map(r=>card(r)).join('');
}

function renderBrowse(f,s){
let d=[...DATA];
if(f==='Free')d=d.filter(r=>r.price==='Free');
else if(f==='Freemium')d=d.filter(r=>r.price==='Freemium');
else if(f!=='All')d=d.filter(r=>r.cat===f);
if(s==='az')d.sort((a,b)=>a.name.localeCompare(b.name));
else if(s==='rating')d.sort((a,b)=>b.rating-a.rating);
document.getElementById('browse-sub').textContent=d.length+' resources';
document.getElementById('browse-grid').innerHTML=d.map(r=>card(r)).join('');
}

function renderBM(){
const d=DATA.filter(r=>savedIds.has(r.id));
document.getElementById('bm-grid').innerHTML=d.length?d.map(r=>card(r)).join(''):'<div style="color:var(--text3);font-size:13px;grid-column:1/-1;padding:32px 0;text-align:center"><i class="fas fa-bookmark" style="font-size:24px;margin-bottom:10px;display:block;opacity:.3"></i>No saved resources yet.<br>Click the bookmark icon on any card.</div>';
}





/* NOTIFICATIONS */
function pushNotification(text){
// Notifications are stored for potential future use, but no panel is shown in the UI.
notifications.unshift({icon:'fa-user-plus',text,time:'just now'});
if(notifications.length>20)notifications=notifications.slice(0,20);
}

/* PREFERENCES */
function applyTheme(){
document.documentElement.setAttribute('data-theme',prefs.dark?'dark':'light');
}

function togglePref(key,el){
prefs[key]=!prefs[key];
el.classList.toggle('on',prefs[key]);
el.setAttribute('aria-checked',String(prefs[key]));
if(key==='dark'){
applyTheme();
showToast(prefs.dark?'Dark mode enabled':'Light mode enabled');
}else if(key==='email'){
showToast(prefs.email?'Email notifications enabled':'Email notifications disabled');
}else if(key==='digest'){
showToast(prefs.digest?'Weekly digest enabled':'Weekly digest disabled');
}else if(key==='teamalerts'){
showToast(prefs.teamalerts?'Team alerts enabled':'Team alerts disabled');
}
}
window.togglePref=togglePref;

let curCat='';
function showCat(cat){
  curCat=cat;lastPage='category';
  const c=getCategoryColor(cat);
  const ci=getCategoryIcon(cat);
  document.getElementById('cat-title').textContent=cat;
  const d=DATA.filter(r=>r.cat===cat);
  document.getElementById('cat-count').textContent=d.length+' resources';
  document.getElementById('cat-desc').textContent=CD[cat]||'';
  const wrap=document.getElementById('cat-icon-wrap');
  wrap.style.background=c+'20';wrap.style.borderColor=c+'40';
  wrap.innerHTML=`<i class="${ci}" style="color:${c};font-size:16px" aria-hidden="true"></i>`;
  document.getElementById('cat-grid').innerHTML=d.map(r=>card(r)).join('');
  pg('category');
  document.querySelectorAll('#category-list .ni').forEach(btn=>{
    btn.classList.toggle('active', btn.dataset.cat===cat);
  });
}
window.showCat=showCat;

function showDetail(id){
const r=DATA.find(d=>d.id===id);
if(!r)return;
currentDetail=r;
lastPage=document.querySelector('.pg.active')?.id?.replace('pg-','')||'home';
const c=getCategoryColor(r.cat);
const logo=document.getElementById('det-logo');
const detailLogo=r.logo||fav(r.url);
logo.style.background=c+'18';logo.style.borderColor=c+'35';
logo.innerHTML=`<img src="${detailLogo}" width="36" height="36" alt="${r.name}" style="object-fit:contain;border-radius:8px" onerror="this.style.display='none';this.nextSibling.style.display='flex'"><span style="display:none;width:36px;height:36px;background:${c};border-radius:8px;align-items:center;justify-content:center;font-size:18px;font-weight:700;color:#000">${r.name.charAt(0)}</span>`;
document.getElementById('det-name').textContent=r.name;
document.getElementById('dcat').textContent=r.cat;
document.getElementById('dprice').textContent=r.price;
document.getElementById('drating').textContent='★ '+r.rating+' / 5';
document.getElementById('durl').textContent=r.url.replace('https://','').replace(/\/$/,'');
document.getElementById('det-desc').textContent=r.desc;
document.getElementById('det-meta-row').innerHTML=`<span class="ctag" style="background:${c}18;color:${c};border:1px solid ${c}35;font-size:10px;padding:2px 8px;border-radius:10px;font-weight:500">${r.cat}</span><span class="${priceCls(r.price)}">${r.price}</span>`;
document.getElementById('det-link').href=r.url;
const saved=savedIds.has(r.id);
document.getElementById('det-save-lbl').textContent=saved?'Saved':'Save';
document.getElementById('det-save-btn').classList.toggle('done',saved);
document.getElementById('det-back-btn').onclick=()=>pg(lastPage);
pg('detail');
}
window.showDetail=showDetail;

function pg(id){
document.querySelectorAll('.pg').forEach(p=>p.classList.remove('active'));
document.querySelectorAll('.ni').forEach(n=>n.classList.remove('active'));
const el=document.getElementById('pg-'+id);if(el)el.classList.add('active');
document.getElementById('scroll-area').scrollTop=0;
const title=BCMAP[id]||id;
document.getElementById('bc-current').textContent=title;
const map={home:'Dashboard',browse:'Browse All',bookmarks:'Saved'};
document.querySelectorAll('.ni').forEach(n=>{if(map[id]&&n.textContent.trim().startsWith(map[id].split(' ')[0]))n.classList.add('active');});
if(id==='bookmarks')renderBM();
}
window.pg=pg;

function filterHome(el,f){
homeFilter=f;
document.getElementById('home-pills').querySelectorAll('.cpill').forEach(p=>p.classList.remove('active'));
el.classList.add('active');renderHome(f);
}
window.filterHome=filterHome;

function filterBrowse(el,f){
browseFilter=f;
document.querySelector('#pg-browse .filter-bar').querySelectorAll('.fc').forEach(c=>c.classList.remove('active'));
el.classList.add('active');renderBrowse(f,browseSort);
}
window.filterBrowse=filterBrowse;

function sortBrowse(v){browseSort=v;renderBrowse(browseFilter,v);}
window.sortBrowse=sortBrowse;

function renderCat(cat,f,s){
  let d=DATA.filter(r=>r.cat===cat);
  if(f==='Free') d=d.filter(r=>r.price==='Free');
  else if(f==='Freemium') d=d.filter(r=>r.price==='Freemium');
  if(s==='az') d.sort((a,b)=>a.name.localeCompare(b.name));
  else d.sort((a,b)=>b.rating-a.rating);
  document.getElementById('cat-grid').innerHTML=d.map(r=>card(r)).join('');
}

function filterCat(el,f){
  catFilter=f;
  document.querySelector('#pg-category .filter-bar').querySelectorAll('.fc').forEach(c=>c.classList.remove('active'));
  el.classList.add('active');
  renderCat(curCat,catFilter,catSort);
}
window.filterCat=filterCat;

function sortCat(v){catSort=v;renderCat(curCat,catFilter,v);}
window.sortCat=sortCat;

function liveSearch(v){
  const q=v.trim().toLowerCase();
  const browseActive=document.getElementById('pg-browse').classList.contains('active');
  const categoryActive=document.getElementById('pg-category').classList.contains('active');
  const bookmarksActive=document.getElementById('pg-bookmarks').classList.contains('active');

  if(!q){
    if(browseActive) renderBrowse(browseFilter,browseSort);
    else if(categoryActive) renderCat(curCat,catFilter,catSort);
    else if(bookmarksActive) renderBM();
    else renderHome(homeFilter);
    return;
  }

  const res=DATA.filter(r=>
    r.name.toLowerCase().includes(q) ||
    r.desc.toLowerCase().includes(q) ||
    r.cat.toLowerCase().includes(q) ||
    r.url.toLowerCase().includes(q)
  );

  if(browseActive){
    let d=[...res];
    if(browseFilter==='Free') d=d.filter(r=>r.price==='Free');
    else if(browseFilter==='Freemium') d=d.filter(r=>r.price==='Freemium');
    else if(browseFilter!=='All') d=d.filter(r=>r.cat===browseFilter);
    if(browseSort==='az') d.sort((a,b)=>a.name.localeCompare(b.name));
    else if(browseSort==='rating') d.sort((a,b)=>b.rating-a.rating);
    document.getElementById('browse-sub').textContent=d.length+' results';
    document.getElementById('browse-grid').innerHTML=d.length?d.map(r=>card(r)).join(''):`<div style="color:var(--text3);font-size:12px;grid-column:1/-1;padding:24px 0;text-align:center">No results for "${v}"</div>`;
    return;
  }

  if(categoryActive){
    let d=res.filter(r=>r.cat===curCat);
    if(catFilter==='Free') d=d.filter(r=>r.price==='Free');
    else if(catFilter==='Freemium') d=d.filter(r=>r.price==='Freemium');
    if(catSort==='az') d.sort((a,b)=>a.name.localeCompare(b.name));
    else d.sort((a,b)=>b.rating-a.rating);
    document.getElementById('cat-grid').innerHTML=d.length?d.map(r=>card(r)).join(''):`<div style="color:var(--text3);font-size:12px;grid-column:1/-1;padding:24px 0;text-align:center">No results for "${v}"</div>`;
    return;
  }

  if(bookmarksActive){
    const d=res.filter(r=>savedIds.has(r.id));
    document.getElementById('bm-sub').textContent=d.length+' saved resources';
    document.getElementById('bm-grid').innerHTML=d.length?d.map(r=>card(r)).join(''):`<div style="color:var(--text3);font-size:13px;grid-column:1/-1;padding:32px 0;text-align:center"><i class="fas fa-bookmark" style="font-size:24px;margin-bottom:10px;display:block;opacity:.3"></i>No results for "${v}"</div>`;
    return;
  }

  document.getElementById('home-feat').innerHTML=res.length?res.slice(0,6).map(r=>card(r)).join(''):`<div style="color:var(--text3);font-size:12px;grid-column:1/-1;padding:24px 0;text-align:center">No results for "${v}"</div>`;
  document.getElementById('home-recent').innerHTML='';
}
window.liveSearch=liveSearch;

/* ADD RESOURCE MODAL */
const CAT_KEYWORDS={
'UI Design':['ui','design','landing','portfolio','showcase','gallery','web','site','interface'],
'Animation':['animation','motion','gsap','css','transition','interactive','effect','canvas'],
'Color':['color','palette','hue','gradient','scheme'],
'Icons':['icon','svg','symbol','glyph'],
'Illustration':['illustration','vector','image','art','drawing'],
'Typography':['font','type','typeface','typography','lettering'],
'Design Systems':['design system','component','library','ui kit','pattern','radix','shadcn','tailwind'],
'AI Tools':['ai','artificial intelligence','generate','prompt','machine learning','gpt','bot'],
'Accessibility':['accessibility','wcag','a11y','contrast','aria','screen reader']
};

function guessCategory(url,name,desc){
const text=(url+' '+name+' '+desc).toLowerCase();
for(const [cat,kws] of Object.entries(CAT_KEYWORDS)){
if(kws.some(k=>text.includes(k)))return cat;
}
return 'UI Design';
}

function guessPricing(url,desc){
const text=(url+' '+desc).toLowerCase();
if(text.includes('free')&&!text.includes('freemium')&&!text.includes('paid')&&!text.includes('pro plan')&&!text.includes('upgrade'))return'Free';
if(text.includes('credit')||text.includes('freemium')||text.includes('pro plan')||text.includes('upgrade')||text.includes('premium'))return'Freemium';
if(text.includes('paid')||text.includes('$')||text.includes('purchase'))return'Paid';
return'Free';
}

function refreshCategoryCounts(){
  document.querySelectorAll('.sidebar-cats button[data-cat]').forEach(btn=>{
    const cat=btn.dataset.cat;
    const nb=btn.querySelector('.nb');
    if(nb) nb.textContent=DATA.filter(r=>r.cat===cat).length;
  });
}

function openEditModal(id){
  const resource=DATA.find(r=>r.id===id);
  if(!resource) return;
  editResourceId=id;
  document.getElementById('modal-heading').textContent='Edit Resource';
  const actionBtn=document.querySelector('#add-modal .tbtn.primary');
  if(actionBtn) actionBtn.innerHTML='<i class="fas fa-save"></i> Save changes';
  document.getElementById('add-modal').classList.remove('hidden');
  document.getElementById('res-url').focus();
  document.getElementById('res-url').value=resource.url;
  document.getElementById('res-name').value=resource.name;
  document.getElementById('res-desc').value=resource.desc;
  document.getElementById('res-cat').value=resource.cat;
  document.getElementById('res-price').value=resource.price;
  document.getElementById('res-logo').value=resource.logo||'';
}
window.openEditModal=openEditModal;

function removeResource(id){
  const idx=DATA.findIndex(r=>r.id===id);
  if(idx===-1) return;
  const name=DATA[idx].name;
  DATA.splice(idx,1);
  saveState();
  showToast('Removed '+name);
  if(currentDetail&&currentDetail.id===id){currentDetail=null;pg('home');}
  renderHome(homeFilter);
  renderBrowse(browseFilter,browseSort);
  renderBM();
  refreshCategoryCounts();
  const topSearch=document.getElementById('top-search');
  if(topSearch) topSearch.placeholder='Search '+DATA.length+' design resources...';
}
window.removeResource=removeResource;

function openAddModal(){
  editResourceId=null;
  document.getElementById('modal-heading').textContent='Add New Resource';
  const actionBtn=document.querySelector('#add-modal .tbtn.primary');
  if(actionBtn) actionBtn.innerHTML='<i class="fas fa-plus"></i>Add resource';
  document.getElementById('add-modal').classList.remove('hidden');
  document.getElementById('res-url').focus();
  document.getElementById('res-url').value='';
  document.getElementById('res-name').value='';
  document.getElementById('res-desc').value='';
  document.getElementById('res-cat').value='';
  document.getElementById('res-cat-other').value='';
  document.getElementById('other-cat-group').classList.add('hidden');
  document.getElementById('res-price').value='Free';
  document.getElementById('res-logo').value='';
}
window.openAddModal=openAddModal;

function closeAddModal(){document.getElementById('add-modal').classList.add('hidden');}
window.closeAddModal=closeAddModal;

function closeIfOverlay(e){if(e.target===document.getElementById('add-modal'))closeAddModal();}
window.closeIfOverlay=closeIfOverlay;

function submitResource(){
  const url=document.getElementById('res-url').value.trim();
  const name=document.getElementById('res-name').value.trim();
  let cat=document.getElementById('res-cat').value;
  if(!url||!name||!cat){showToast('URL, name and category are required');return;}
  function normalizeUrl(value){
    try{const u=new URL(value);return u.origin + u.pathname.replace(/\/\/+$/, '');}catch(e){return value.toLowerCase().replace(/\/$/, '');}
  }
  const normalizedUrl=normalizeUrl(url);
  const duplicate=DATA.find(r=>normalizeUrl(r.url)===normalizedUrl);
  if(duplicate && !editResourceId){
    showToast('Resource already exists in the library');
    return;
  }
  if(cat==='Other'){
    const custom=document.getElementById('res-cat-other').value.trim();
    if(!custom){showToast('Enter a custom category name');return;}
    cat=custom;
    addCategoryIfNew(cat);
  }
  const desc=document.getElementById('res-desc').value||'Design resource.';
  const price=document.getElementById('res-price').value||'Free';
  let logo=document.getElementById('res-logo').value;
  if(editResourceId){
    const idx=DATA.findIndex(r=>r.id===editResourceId);
    if(idx===-1){showToast('Unable to update resource');return;}
    if(!logo) logo=DATA[idx].logo||getFaviconUrl(url);
    DATA[idx]={...DATA[idx],url,name,desc,cat,price,logo};
    showToast('Resource updated: '+name);
    closeAddModal();
    saveState();
    if(currentDetail&&currentDetail.id===editResourceId) showDetail(editResourceId);
    renderHome(homeFilter);
    renderBrowse(browseFilter,browseSort);
    renderBM();
    refreshCategoryCounts();
    const topSearch=document.getElementById('top-search');
    if(topSearch) topSearch.placeholder='Search '+DATA.length+' design resources...';
    return;
  }
  const maxId=DATA.reduce((m,r)=>Math.max(m,r.id),0);
  const newRes={
    id:maxId+1,name,url,
    desc,cat,price,rating:4.5,logo,
    addedBy:CURRENT_USER.id
  };
  DATA.unshift(newRes);
  saveState();
  showToast('Resource added: '+name);
  closeAddModal();

  /* Live-refresh every section that could show this resource */
  renderHome(homeFilter);
  renderBrowse(browseFilter,browseSort);
  if(document.getElementById('pg-category').classList.contains('active')&&curCat===cat){
    showCat(cat);
  }
  const catBadge=document.querySelector(`.sidebar-cats button[data-cat="${cat}"] .nb`);
  if(catBadge)catBadge.textContent=DATA.filter(r=>r.cat===cat).length;
  const topSearch=document.getElementById('top-search');
  if(topSearch)topSearch.placeholder='Search '+DATA.length+' design resources...';

  /* Notify the community */
  pushNotification(`New resource added: <b>${name}</b> to ${cat}`);
}
window.submitResource=submitResource;

function showToast(msg){
  const t=document.getElementById('toast');
  t.textContent=msg; t.classList.add('show');
  setTimeout(()=>t.classList.remove('show'),2500);
}
window.showToast=showToast;

function renderMyContributions(){
  // Placeholder for legacy initialization; no active UI section uses this currently.
}
window.renderMyContributions=renderMyContributions;

/* INIT */
loadState();
loadSavedIds();
applyTheme();
renderCategorySelect();
renderCategorySidebar();
renderHome('All');
renderBrowse('All','pop');
renderBM();
syncSavedUI();
refreshCategoryCounts();