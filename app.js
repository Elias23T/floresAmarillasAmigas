const $ = (id) => document.getElementById(id);
let person = '', current = 0;
const opened = new Set();
const wishes = new Map();
let turning = false;
const photoDescriptions = ['Un girasol de pétalos dorados','Tulipanes amarillos de primavera','Una delicada margarita amarilla','Una rosa de pétalos color crema','Una peonía rosa en flor','Orquídeas blancas sobre un fondo rosado','Cosmos rosados movidos por el viento','Hortensias de tonos azules y rosas','Un iris violeta contra el cielo azul','Tulipanes amarillos entre sombras','Flores silvestres violetas entre el verde','Flores de cerezo blancas y rosadas','Un ramo de narcisos amarillos en un florero','Una dalia de pétalos anaranjados','Una orquídea blanca de pétalos abiertos','Una peonía rosa en un jardín en penumbra','Hortensias blancas y crema','Un iris blanco sobre un fondo oscuro','Un campo de amapolas rojas','Lavanda violeta en un jardín verde','Narcisos amarillos en un florero de cristal','Lirios amarillos sobre un fondo claro','Peonías rosas reunidas en un jardín','Un iris de color violeta intenso','Pétalos amarillos desenfocados bajo luz suave','Orquídeas blancas junto a hojas verdes','Ramas de cerezo en flor bajo el cielo','Dos peonías blancas en flor','Un narciso amarillo de primavera','Un iris blanco con detalles amarillos'];
// Treinta fotografías: cada una pertenece a un solo capítulo.
const photoLayouts = Array.from({length:10},(_,i)=>[i*3,i*3+1,i*3+2]);
photoLayouts[8]=[25,24,26];
photoLayouts[9]=[29,27,28];
function flowerShape(index) {
  const ring=(count,rx,ry,color,offset=0)=>Array.from({length:count},(_,p)=>`<ellipse cy="-20" rx="${rx}" ry="${ry}" fill="${p%2?color:'#ead59d'}" transform="rotate(${p*360/count+offset})"/>`).join('');
  const center='<circle r="6" fill="#b39350"/>';
  switch(index){
    case 0:return ring(18,5,20,'#d9b852')+'<circle r="12" fill="#887047"/>';
    case 1:return '<path d="M-27-28Q-29 30 0 32Q29 30 27-28L10-12L0-37L-10-12Z" fill="#deb466"/><path d="M0 28Q-18 10-15-22M0 28Q18 10 15-22" stroke="#b68c53" stroke-width="1.5"/>';
    case 2:return ring(7,17,23,'#cba29c')+'<g transform="scale(.65) rotate(22)">'+ring(6,16,20,'#b88c86')+'</g><path d="M-9 2Q-14-12 0-11Q15-9 6 4Q-2 12-8 5" stroke="#966e6a" stroke-width="3" fill="none"/>';
    case 3:return ring(8,11,18,'#c1a2b5')+center;
    case 4:return Array.from({length:7},(_,p)=>`<ellipse cx="${p%2?-5:5}" cy="${10-p*8}" rx="7" ry="10" fill="${p%2?'#a99bb6':'#c3b6c9'}" transform="rotate(${p%2?-12:12})"/>`).join('');
    case 5:return ring(12,13,22,'#d4afa5')+'<g transform="scale(.7) rotate(15)">'+ring(10,12,21,'#bd938b')+'</g>'+center;
    case 6:return ring(4,23,26,'#c98772',45)+'<circle r="9" fill="#696153"/>';
    case 7:return Array.from({length:6},(_,p)=>`<path d="M0 3Q-21-20 0-48Q21-20 0 3" fill="${p%2?'#edce85':'#d8b36f'}" transform="rotate(${p*60})"/>`).join('')+center;
    case 8:return '<ellipse cy="-23" rx="13" ry="22" fill="#e8dfce"/><ellipse cx="-23" cy="-5" rx="24" ry="16" fill="#ded1bf" transform="rotate(20)"/><ellipse cx="23" cy="-5" rx="24" ry="16" fill="#ded1bf" transform="rotate(-20)"/><path d="M0 0Q-30 27-9 34L0 22L9 34Q30 27 0 0" fill="#c4a278"/>'+center;
    default:return '<path d="M0 5Q-35-6-19-40Q5-38 0 5M0 5Q35-6 19-40Q-5-38 0 5" fill="#aaa1bd"/><path d="M0-7Q-43 4-32 27Q-10 35 0 5Q10 35 32 27Q43 4 0-7" fill="#c7bcd1"/><path d="M-18 19L0 0L18 19" stroke="#d6ba66" stroke-width="4"/>';
  }
}
function floralDrawing(index) {
  const heads = [[60+index%3*10,85],[165,50+index%4*8],[260-index%4*8,115]];
  return `<svg viewBox="0 0 320 300" xmlns="http://www.w3.org/2000/svg" fill="none"><g stroke="#89917a" stroke-width="2">${heads.map(([x,y],i)=>`<path d="M${100+i*45} 300 Q${x-40} 185 ${x} ${y}"/><path d="M${x+8} ${y+94}q-44-3-42-36q34 1 42 36m4 16q42-8 43-39q-37 8-43 39" fill="#adb39b" stroke="none"/><g transform="translate(${x} ${y}) rotate(${i*12-10})" stroke="none">${flowerShape(index)}</g>`).join('')}</g></svg>`;
}
function collage(index, mobile = false) {
  return `<div class="photo-collage layout-${index%5} ${mobile?'mobile-collage':''}" aria-label="Un jardín para una amiga"><div class="botanical-backdrop" aria-hidden="true">${floralDrawing(index)}</div>${photoLayouts[index].map((photo,i)=>`<figure class="photo-frame photo-${i+1}"><img src="assets/garden/flower-${photo+1}.jpg" alt="${photoDescriptions[photo]}" decoding="async" width="780" height="780"><span class="photo-tape" aria-hidden="true"></span></figure>`).join('')}<span class="collage-spark" aria-hidden="true">✧</span></div>`;
}
const escapeHTML = (value) => value.replace(/[&<>"']/g, (char) => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
function bouquet(seed = 0) {
  const blooms = [[87,100,25],[148,72,30],[205,109,27],[115,153,25],[177,157,29],[57,151,20],[226,164,21]];
  return `<svg viewBox="0 0 300 320" xmlns="http://www.w3.org/2000/svg"><g class="stem-sway" fill="none" stroke="#6f8050" stroke-width="2.3">${blooms.map(([x,y])=>`<path d="M150 294 Q${x+25} 212 ${x} ${y}"/>`).join('')}<g fill="#899560" stroke="none"><path d="M144 239Q82 238 79 194Q130 193 144 239"/><path d="M158 232Q214 231 219 195Q173 191 158 232"/><path d="M120 198Q65 195 69 173Q103 167 120 198"/><path d="M176 206Q232 201 236 179Q195 168 176 206"/><path d="M139 271Q93 272 91 242Q124 240 139 271"/></g>${blooms.map(([x,y,r],i)=>`<g transform="translate(${x} ${y}) rotate(${i*19+seed*7})" stroke="none">${Array.from({length:12},(_,j)=>`<ellipse cy="-${r*.59}" rx="${r*.24}" ry="${r*.63}" transform="rotate(${j*30})" fill="${j%2?'#e6b735':'#f1cb51'}"/>`).join('')}<circle r="${r*.29}" fill="#96712e"/><circle r="${r*.2}" fill="#b28b3d"/><g fill="#795f2c"><circle cx="-3" cy="-2" r="1"/><circle cx="3" cy="2" r="1"/><circle cx="0" cy="4" r="1"/></g></g>`).join('')}<path d="M134 270q18 10 31 0m-13 5q-35-28-29-8q2 11 29 8q31-26 25-8q-3 13-25 8l-12 30m12-30 15 27" stroke="#c6ae77" stroke-width="3"/></g></svg>`;
}
$('cover-bouquet').innerHTML = bouquet();
try { $('name').value = localStorage.getItem('flower-book-name') || ''; } catch {}
const chapters = [
  {label:'Flores para una amiga',title:n=>`Estas flores son para ti, ${n}.`,copy:'Este 21 de septiembre quería regalarte algo que pudieras guardar y volver a mirar cuando necesites una sonrisa. Por eso preparé este pequeño jardín de palabras para ti.',quote:n=>`${n}, gracias por ser una de esas amigas que hacen más bonitos los días.`,foot:'Un detalle de tu amigo Elias, con mucho cariño.'},
  {label:'Qué suerte encontrarte',title:n=>`Qué bonito tenerte como amiga, ${n}.`,copy:'Una amistad puede empezar con una conversación cualquiera y terminar llenando la vida de anécdotas. Me alegra que nuestros caminos se hayan cruzado.',quote:n=>`${n}, entre tantas personas, qué suerte haber coincidido contigo.`},
  {label:'Una amistad sincera',title:n=>`Aquí puedes ser tú, ${n}.`,copy:'No hace falta tener siempre una historia divertida ni estar de buen ánimo para compartir un rato. También hay lugar para los días tranquilos, las dudas y las conversaciones sin prisa.',quote:n=>`${n}, valoro tu amistad por la persona que eres, incluso en los días en que tú misma lo olvidas.`},
  {label:'Lo bonito de ti',title:n=>`Hay mucho que agradecerte, ${n}.`,copy:'A veces damos por sentados los pequeños gestos que hacen especial a una amiga. Hoy quiero detenerme en algunos. Toca cada tarjeta.',type:'cards'},
  {label:'Deseos para tu vida',title:n=>`Tres deseos para ti, ${n}.`,copy:'Cada flor guarda algo bonito que deseo para tu camino. Elige una y llévate sus palabras contigo.',type:'wishes'},
  {label:'Una carta de tu amigo',title:n=>`Querida amiga ${n}…`,copy:'Entre las prisas de cada día, a veces se nos pasa decirles a nuestras amigas cuánto las apreciamos. Esta carta es para eso.',type:'letter'},
  {label:'Momentos que suman',title:n=>`Contigo, lo sencillo se disfruta más, ${n}.`,copy:'No siempre hace falta un gran plan. Una charla, algo rico para comer o una ocurrencia a tiempo pueden convertirse en un recuerdo que nos acompañe por años.',type:'moments'},
  {label:'Un jardín para ti',title:n=>`Que nunca te falten flores, ${n}.`,copy:'Aquí tienes un poquito de primavera para acompañar tu día. Ojalá estas flores te recuerden que mereces tiempo para descansar, celebrar tus logros y disfrutar lo que te hace feliz.',quote:n=>`${n}, crece a tu ritmo. Tu amigo también estará para celebrar tus pequeños pasos.`,type:'bouquet'},
  {label:'Un mensaje especial',title:n=>`Todavía quería decirte algo, ${n}…`,copy:'Guardé unas palabras más en este sobre. Ábrelo cuando quieras recibir un pequeño abrazo de tu amigo.',type:'envelope'},
  {label:'Por más momentos juntos',title:n=>`Feliz 21 de septiembre, ${n}.`,copy:'Aquí termina el libro, pero quedan muchas conversaciones, risas y planes por compartir. Gracias por formar parte de mi vida y por dejarme ser parte de la tuya.',quote:n=>`${n}, que este nuevo comienzo de primavera te encuentre rodeada de cariño y de amistades que te hagan bien.`,type:'end'}
];
function render(focus = false) {
  const c = chapters[current], n = escapeHTML(person);
  $('reader-name').textContent = person;
  $('chapter-number').textContent = `${String(current+1).padStart(2,'0')} / 10`;
  $('book').dataset.theme = String(current);
  $('illustration-page').innerHTML = collage(current);
  let extra = '';
  if(c.type==='cards') extra = `<div class="reveal-grid">${['Tu forma de escuchar','Tu sentido del humor','Tu manera de ser'].map((t,i)=>`<button class="reveal-card ${opened.has('card'+i)?'revealed':''}" data-card="${i}" aria-expanded="${opened.has('card'+i)}">${opened.has('card'+i)?cardText(i,n):'✧ &nbsp; '+t+' &nbsp; +'}</button>`).join('')}</div>`;
  if(c.type==='wishes') extra = `<div class="wish-grid">${[0,1,2].map((i)=>`<button class="wish-flower" data-wish="${i}" aria-label="Descubrir deseo ${i+1}"><svg viewBox="-55 -55 110 110" aria-hidden="true">${flowerShape([1,8,3][i])}</svg></button>`).join('')}</div><p class="wish-result" id="wish-result" aria-live="polite">${wishes.has('selected')?wishText(wishes.get('selected'),n):'Elige una flor: hay un buen deseo esperando por ti…'}</p>`;
  if(c.type==='letter') extra = `<div class="letter">${n},<br><br>Gracias por tu amistad, por las conversaciones y por esos detalles que a veces parecen pequeños, pero significan mucho.<br><br>Quería recordarte que no tienes que poder con todo tú sola. Puedes contar conmigo para escucharte, compartir una risa o acompañarte cuando el día se ponga difícil.<br><br>Ojalá esta primavera te traiga motivos para ilusionarte, y que podamos celebrar juntos muchos de ellos.<br><br>Con cariño,<br>tu amigo Elias.</div>`;
  if(c.type==='moments') extra = `<ul class="memory-list"><li><span>01</span> ${n}, por las risas que empiezan con cualquier ocurrencia.</li><li><span>02</span> Por las conversaciones que se alargan porque todavía queda algo que contar.</li><li><span>03</span> Por los planes sencillos y las anécdotas que aún nos esperan.</li></ul>`;
  if(c.type==='bouquet') extra = `<div class="pressed-flower" aria-hidden="true">${floralDrawing(current)}</div>`;
  if(c.type==='envelope') extra = `<button class="envelope" id="envelope" aria-expanded="${opened.has('envelope')}" aria-label="Abrir sobre">${opened.has('envelope')?'♡':'✉'}</button><div class="letter" id="secret" ${opened.has('envelope')?'':'hidden'}>${n},<br><br>Qué alegría poder llamarte amiga. Gracias por los ratos compartidos, por tu confianza y por hacer que tantos momentos sencillos se vuelvan especiales.<br><br>Aunque a veces las ocupaciones nos dejen menos tiempo para hablar, quiero que sepas que te aprecio y que me alegra saber de ti.<br><br>Ojalá sigamos sumando paseos, conversaciones, comidas y esas risas que después se convierten en nuestras mejores anécdotas.<br><br>Estas flores son una pequeña forma de decirte: gracias por tu amistad.<br><br>Un abrazo de tu amigo Elias.</div>`;
  if(c.type==='end') extra = `<button class="primary small-action" id="restart">Volver a leer ↺</button><div class="petals" aria-hidden="true">${Array.from({length:9},(_,i)=>`<span class="petal" style="left:${i*12}%;animation-delay:${i*.6}s"></span>`).join('')}</div>`;
  $('page').innerHTML = `${collage(current,true)}<span class="page-kicker">CAPÍTULO ${String(current+1).padStart(2,'0')} · ${c.label}</span><h2>${c.title(n)}</h2><p class="page-copy">${c.copy}</p>${c.quote?`<blockquote class="page-quote">${c.quote(n)}</blockquote>`:''}${extra}<div class="page-decoration" aria-hidden="true">✳</div>${c.foot?`<p class="page-copy">${c.foot}</p>`:''}`;
  $('previous').disabled = current===0; $('next').disabled = current===9;
  $('progress').innerHTML = chapters.map((c,i)=>`<button data-page="${i}" aria-label="Página ${i+1}: ${c.label}" ${i===current?'aria-current="page"':''}></button>`).join('');
  if(focus){$('page').focus({preventScroll:true});$('reader').scrollIntoView({block:'start',behavior:'auto'});}
}
function cardText(i,n){return [`${n}, gracias por escuchar con atención y hacer que una conversación se sienta como un descanso.`,`${n}, tu risa y tus ocurrencias pueden convertir un día cualquiera en una buena anécdota.`,`${n}, valoro tu sinceridad y la confianza de poder ser nosotros mismos cuando compartimos un rato.`][i];}
function wishText(i,n){return [`${n}, que encuentres oportunidades para tus sueños y confianza para intentarlo, incluso cuando dé un poco de miedo.`,`${n}, que tengas salud, tranquilidad y tiempo para disfrutar las cosas que te hacen sonreír.`,`${n}, que siempre tengas cerca personas que te escuchen, te respeten y celebren contigo tus alegrías.`][i];}
$('name-form').addEventListener('submit',event=>{event.preventDefault();person=$('name').value.trim();if(!person){$('name-error').textContent='Amiga, escribe tu nombre para abrir tu regalo.';$('name').focus();return;}$('name-error').textContent='';try{localStorage.setItem('flower-book-name',person);}catch{}current=0;opened.clear();wishes.clear();$('welcome').hidden=true;$('reader').hidden=false;render(true);});
$('back-home').addEventListener('click',()=>{$('reader').hidden=true;$('welcome').hidden=false;$('name').focus();});
function leafCopy(source) {
  const copy = source.cloneNode(true);
  copy.removeAttribute('id');
  copy.removeAttribute('tabindex');
  copy.querySelectorAll('[id]').forEach(node=>node.removeAttribute('id'));
  copy.setAttribute('aria-hidden','true');
  copy.inert = true;
  return copy;
}
async function go(index){
  if(turning||index<0||index>=chapters.length||index===current)return;
  if(window.matchMedia('(prefers-reduced-motion: reduce)').matches){current=index;render(true);return;}
  turning=true;
  const book=$('book'), backward=index<current, mobile=window.matchMedia('(max-width: 760px)').matches;
  const oldHeight=book.offsetHeight;
  const front=leafCopy(!mobile&&backward?$('illustration-page'):$('page'));
  current=index;render(false);
  const back=leafCopy(!mobile&&!backward?$('illustration-page'):$('page'));
  const height=Math.max(oldHeight,book.offsetHeight);
  book.style.minHeight=`${height}px`;
  const sheet=document.createElement('div');
  sheet.className=`turning-sheet ${backward?'backward':'forward'}`;
  sheet.setAttribute('aria-hidden','true');
  sheet.inert=true;
  front.classList.add('leaf-face','leaf-front');back.classList.add('leaf-face','leaf-back');
  sheet.append(front,back);book.append(sheet);
  book.classList.add('is-turning');book.setAttribute('aria-busy','true');
  document.querySelectorAll('.book-controls button, #back-home').forEach(button=>button.disabled=true);
  $('reader').scrollIntoView({block:'start',behavior:'auto'});
  try {
    const angle=backward?180:-180;
    await sheet.animate([
      {transform:'rotateY(0deg)'},
      {transform:`rotateY(${angle*.46}deg)`,offset:.46},
      {transform:`rotateY(${angle}deg)`}
    ],{duration:1600,easing:'cubic-bezier(.45,0,.55,1)',fill:'forwards'}).finished;
  } finally {
    sheet.remove();book.classList.remove('is-turning');book.style.minHeight='';book.removeAttribute('aria-busy');
    turning=false;
    document.querySelectorAll('.book-controls button, #back-home').forEach(button=>button.disabled=false);
    $('previous').disabled=current===0;$('next').disabled=current===chapters.length-1;
    $('page').focus({preventScroll:true});
  }
}
$('previous').addEventListener('click',()=>go(current-1));$('next').addEventListener('click',()=>go(current+1));
$('progress').addEventListener('click',e=>{const button=e.target.closest('[data-page]');if(button)go(Number(button.dataset.page));});
$('page').addEventListener('click',e=>{const card=e.target.closest('[data-card]');if(card){opened.add('card'+card.dataset.card);card.textContent=cardText(Number(card.dataset.card),person);card.classList.add('revealed');card.setAttribute('aria-expanded','true');}const wish=e.target.closest('[data-wish]');if(wish){wishes.set('selected',Number(wish.dataset.wish));$('wish-result').textContent=wishText(Number(wish.dataset.wish),person);}if(e.target.closest('#envelope')){opened.add('envelope');$('secret').hidden=false;$('envelope').textContent='♡';$('envelope').setAttribute('aria-expanded','true');}if(e.target.closest('#restart'))go(0);});
document.addEventListener('keydown',e=>{if($('reader').hidden||e.target.matches('input,textarea'))return;if(e.key==='ArrowRight'){e.preventDefault();go(current+1);}if(e.key==='ArrowLeft'){e.preventDefault();go(current-1);}});

// El navegador decide si permite audio sin interacción. Reintentamos al primer gesto.
const soundtrack=$('soundtrack');
soundtrack.volume=.55;
let startingAudio=false;
async function startSoundtrack(){
  if(startingAudio||!soundtrack.paused||soundtrack.error)return;
  startingAudio=true;
  try{await soundtrack.play();}catch(error){
    if(error.name!=='NotAllowedError'&&error.name!=='AbortError')$('track-status').textContent='La canción no está disponible';
  }finally{startingAudio=false;}
}
function showSoundControl(){
  $('sound-toggle').hidden=false;
  $('track-info').classList.add('is-playing');
}
soundtrack.addEventListener('playing',showSoundControl);
// El autoplay nativo puede haber comenzado antes de cargar este script.
if(!soundtrack.paused)showSoundControl();
soundtrack.addEventListener('error',()=>{$('track-status').textContent='La canción no está disponible';});
$('sound-toggle').addEventListener('click',()=>{
  soundtrack.muted=!soundtrack.muted;
  $('sound-toggle').setAttribute('aria-pressed',String(soundtrack.muted));
  $('sound-toggle').setAttribute('aria-label',soundtrack.muted?'Restaurar sonido':'Silenciar música');
  $('sound-toggle').title=soundtrack.muted?'Restaurar sonido':'Silenciar música';
  $('sound-toggle').textContent=soundtrack.muted?'♪ ×':'♫';
  $('track-info').classList.toggle('is-muted',soundtrack.muted);
});
['pointerdown','touchend','click','keydown'].forEach(type=>document.addEventListener(type,startSoundtrack,{passive:true}));
startSoundtrack();
