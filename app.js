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
  return `<div class="photo-collage layout-${index%5} ${mobile?'mobile-collage':''}" aria-label="Un jardín de recuerdos"><div class="botanical-backdrop" aria-hidden="true">${floralDrawing(index)}</div>${photoLayouts[index].map((photo,i)=>`<figure class="photo-frame photo-${i+1}"><img src="assets/garden/flower-${photo+1}.jpg" alt="${photoDescriptions[photo]}" decoding="async" width="780" height="780"><span class="photo-tape" aria-hidden="true"></span></figure>`).join('')}<span class="collage-spark" aria-hidden="true">✧</span></div>`;
}
const escapeHTML = (value) => value.replace(/[&<>"']/g, (char) => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
function bouquet(seed = 0) {
  const blooms = [[87,100,25],[148,72,30],[205,109,27],[115,153,25],[177,157,29],[57,151,20],[226,164,21]];
  return `<svg viewBox="0 0 300 320" xmlns="http://www.w3.org/2000/svg"><g class="stem-sway" fill="none" stroke="#6f8050" stroke-width="2.3">${blooms.map(([x,y])=>`<path d="M150 294 Q${x+25} 212 ${x} ${y}"/>`).join('')}<g fill="#899560" stroke="none"><path d="M144 239Q82 238 79 194Q130 193 144 239"/><path d="M158 232Q214 231 219 195Q173 191 158 232"/><path d="M120 198Q65 195 69 173Q103 167 120 198"/><path d="M176 206Q232 201 236 179Q195 168 176 206"/><path d="M139 271Q93 272 91 242Q124 240 139 271"/></g>${blooms.map(([x,y,r],i)=>`<g transform="translate(${x} ${y}) rotate(${i*19+seed*7})" stroke="none">${Array.from({length:12},(_,j)=>`<ellipse cy="-${r*.59}" rx="${r*.24}" ry="${r*.63}" transform="rotate(${j*30})" fill="${j%2?'#e6b735':'#f1cb51'}"/>`).join('')}<circle r="${r*.29}" fill="#96712e"/><circle r="${r*.2}" fill="#b28b3d"/><g fill="#795f2c"><circle cx="-3" cy="-2" r="1"/><circle cx="3" cy="2" r="1"/><circle cx="0" cy="4" r="1"/></g></g>`).join('')}<path d="M134 270q18 10 31 0m-13 5q-35-28-29-8q2 11 29 8q31-26 25-8q-3 13-25 8l-12 30m12-30 15 27" stroke="#c6ae77" stroke-width="3"/></g></svg>`;
}
$('cover-bouquet').innerHTML = bouquet();
try { $('name').value = localStorage.getItem('flower-book-name') || ''; } catch {}
const chapters = [
  {label:'Lo que quedó',title:n=>`Todavía hay flores para ti, ${n}.`,copy:'Volvió septiembre. En la esquina venden flores amarillas y, por un instante, pensé en comprarte unas. Después recordé que ya no sé dónde encontrarte.',quote:n=>`${n}, hay gestos que el corazón recuerda mucho después de aprender la despedida.`,foot:'Estas páginas guardan lo que no supe decir.'},
  {label:'Antes de nosotros',title:n=>`No sabía que ibas a importarme tanto, ${n}.`,copy:'Al principio eras una conversación más. Después empecé a guardar pequeñas cosas del día para contártelas. Sin darme cuenta, te había hecho un lugar en todas mis tardes.',quote:n=>`${n}, extraño esa época en la que todavía no tenía miedo de perderte.`},
  {label:'El amor que no pasó',title:n=>`También dolió lo que no fuimos, ${n}.`,copy:'Nunca tuvimos una fecha que celebrar. Hubo miradas, mensajes escritos a medias y un futuro que solo me atreví a imaginar. A veces me pregunto si tú también lo viste.',quote:n=>`${n}, tuve que despedirme de una historia que ni siquiera había comenzado.`},
  {label:'Lo que callé',title:n=>`Me faltó valor, ${n}.`,copy:'Hay palabras que dejé para después, como si el tiempo nos debiera otra oportunidad. Toca estos pequeños silencios.',type:'cards'},
  {label:'Desde la distancia',title:n=>`Aún te deseo cosas bonitas, ${n}.`,copy:'Aunque ya no me toque saber cómo te fue, aunque aprender a soltar duela. Cada flor guarda un deseo que no necesita respuesta.',type:'wishes'},
  {label:'Una carta sin enviar',title:n=>`No voy a enviarte esta carta, ${n}.`,copy:'La escribo para dejar de ensayar nuestra última conversación cada vez que la casa se queda en silencio.',type:'letter'},
  {label:'Las cosas que regresan',title:n=>`A veces vuelves en lo pequeño, ${n}.`,copy:'No apareces en la puerta. Apareces en una canción, en una calle, en la costumbre de mirar el teléfono cuando ocurre algo bonito.',type:'moments'},
  {label:'Septiembre sin ti',title:n=>`Las flores llegaron igual, ${n}.`,copy:'El mundo no se detuvo cuando nos perdimos. Eso fue lo más extraño: los días seguían siendo hermosos, incluso cuando yo no sabía qué hacer con tanta ausencia.',quote:n=>`${n}, hoy dejé flores junto a la ventana. Esta vez también quise que hubiera algo bonito para mí.`,type:'bouquet'},
  {label:'La última vez',title:n=>`Si pudiera decirte algo más, ${n}…`,copy:'No sería una forma de pedirte que volvieras. Solo una manera de despedirme con la ternura que no me salió aquel día.',type:'envelope'},
  {label:'Dejarte ir',title:n=>`Te quise. Ahora sigo, ${n}.`,copy:'No sé en qué momento dejará de doler. Pero hoy pude recordar algo bonito sin desear cambiar el final. Quizá sanar comience así, con un instante pequeño de paz.',quote:n=>`${n}, ojalá la vida te cuide. Yo voy a aprender a cuidarme también.`,type:'end'}
];
function render(focus = false) {
  const c = chapters[current], n = escapeHTML(person);
  $('reader-name').textContent = person;
  $('chapter-number').textContent = `${String(current+1).padStart(2,'0')} / 10`;
  $('book').dataset.theme = String(current);
  $('illustration-page').innerHTML = collage(current);
  let extra = '';
  if(c.type==='cards') extra = `<div class="reveal-grid">${['Lo que iba a decirte','El mensaje que borré','Lo que aún recuerdo'].map((t,i)=>`<button class="reveal-card ${opened.has('card'+i)?'revealed':''}" data-card="${i}" aria-expanded="${opened.has('card'+i)}">${opened.has('card'+i)?cardText(i,n):'✧ &nbsp; '+t+' &nbsp; +'}</button>`).join('')}</div>`;
  if(c.type==='wishes') extra = `<div class="wish-grid">${[0,1,2].map((i)=>`<button class="wish-flower" data-wish="${i}" aria-label="Descubrir deseo ${i+1}"><svg viewBox="-55 -55 110 110" aria-hidden="true">${flowerShape([1,8,3][i])}</svg></button>`).join('')}</div><p class="wish-result" id="wish-result" aria-live="polite">${wishes.has('selected')?wishText(wishes.get('selected'),n):'Hay cariño que aprende a quedarse lejos…'}</p>`;
  if(c.type==='letter') extra = `<div class="letter">${n},<br><br>Me acostumbré a imaginarte en mis días. Por eso tu ausencia estuvo en tantos lugares a la vez.<br><br>No te escribo para pedirte que regreses. Solo necesitaba admitir que te quise, que me dolió y que todavía estoy aprendiendo a hablar de ti en pasado.<br><br>Ojalá algún día pueda recordarnos sin quedarme a vivir en ese recuerdo.<br><br>Con el cariño que sí fue real.</div>`;
  if(c.type==='moments') extra = `<ul class="memory-list"><li><span>01</span> ${n}, esa canción que todavía no consigo escuchar de fondo.</li><li><span>02</span> La calle por la que camino más despacio, aunque sé que no vas a estar.</li><li><span>03</span> Las buenas noticias que, por un segundo, aún pienso contarte.</li></ul>`;
  if(c.type==='bouquet') extra = `<div class="pressed-flower" aria-hidden="true">${floralDrawing(current)}</div>`;
  if(c.type==='envelope') extra = `<button class="envelope" id="envelope" aria-expanded="${opened.has('envelope')}" aria-label="Abrir sobre">${opened.has('envelope')?'♡':'✉'}</button><div class="letter" id="secret" ${opened.has('envelope')?'':'hidden'}>${n},<br><br>Cada vez que vuelvo a los lugares por los que caminamos juntos, a las plazas o a los sitios donde solíamos comer, me invaden los recuerdos de lo que vivimos.<br><br>Me dolía tanto estar allí sin ti que incluso me cambié de ciudad, buscando un poco de calma. Pero cada vez que regreso a mi pueblo, donde compartimos tantos momentos felices, vuelvo a sentir el peso de tu ausencia.<br><br>Tal vez ya no recuerdes esos días como yo, pero quería darte las gracias por haberlos compartido conmigo. Fueron algunos de los mejores momentos de mi vida, y tuve la suerte de vivirlos contigo a mi lado.<br><br>Gracias por todo lo bonito que vivimos juntos.</div>`;
  if(c.type==='end') extra = `<button class="primary small-action" id="restart">Volver a leer ↺</button><div class="petals" aria-hidden="true">${Array.from({length:9},(_,i)=>`<span class="petal" style="left:${i*12}%;animation-delay:${i*.6}s"></span>`).join('')}</div>`;
  $('page').innerHTML = `${collage(current,true)}<span class="page-kicker">CAPÍTULO ${String(current+1).padStart(2,'0')} · ${c.label}</span><h2>${c.title(n)}</h2><p class="page-copy">${c.copy}</p>${c.quote?`<blockquote class="page-quote">${c.quote(n)}</blockquote>`:''}${extra}<div class="page-decoration" aria-hidden="true">✳</div>${c.foot?`<p class="page-copy">${c.foot}</p>`:''}`;
  $('previous').disabled = current===0; $('next').disabled = current===9;
  $('progress').innerHTML = chapters.map((c,i)=>`<button data-page="${i}" aria-label="Página ${i+1}: ${c.label}" ${i===current?'aria-current="page"':''}></button>`).join('');
  if(focus){$('page').focus({preventScroll:true});$('reader').scrollIntoView({block:'start',behavior:'auto'});}
}
function cardText(i,n){return [`${n}, cuando preguntaba si habías llegado bien, también estaba diciendo cuánto me importabas.`,`${n}, escribí que te extrañaba. Lo borré porque no sabía si todavía tenía un lugar en tu día.`,`${n}, a veces recuerdo tu risa con tanta claridad que el silencio que viene después pesa un poco más.`][i];}
function wishText(i,n){return [`${n}, ojalá encuentres un amor junto al que puedas descansar, sin preguntarte si mañana seguirá ahí.`,`${n}, deseo que vuelvas a ilusionarte. Aunque yo tenga que aprender a no estar en esa historia.`,`${n}, que un día ambos podamos recordar lo nuestro sin sentir que nos falta el aire.`][i];}
$('name-form').addEventListener('submit',event=>{event.preventDefault();person=$('name').value.trim();if(!person){$('name-error').textContent='Escribe el nombre que guarda esta historia.';$('name').focus();return;}$('name-error').textContent='';try{localStorage.setItem('flower-book-name',person);}catch{}current=0;opened.clear();wishes.clear();$('welcome').hidden=true;$('reader').hidden=false;render(true);});
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
