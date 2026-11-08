// A chave publishable é pública; nunca coloque chaves secret/service_role aqui.
const SUPABASE_URL = 'https://cprvwstvlqdmuusabina.supabase.co';
const SUPABASE_PUBLIC_KEY = 'sb_publishable_-UJMBgbbglRJKu0izI5J7A_U-Ptqo9u';

const cloud = window.supabase && SUPABASE_URL && SUPABASE_PUBLIC_KEY ? supabase.createClient(SUPABASE_URL, SUPABASE_PUBLIC_KEY) : null;
const KEY = 'doses-app-v1';
const ZONES = [['ab_sd', 'Abdômen superior direito', 326, 596, 31, 29], ['ab_se', 'Abdômen superior esquerdo', 451, 596, 31, 29],
  ['ab_id', 'Abdômen inferior direito', 326, 697, 31, 29], ['ab_ie', 'Abdômen inferior esquerdo', 451, 697, 31, 29],
  ['ab_ld', 'Lateral direita do abdômen', 244, 638, 20, 48], ['ab_le', 'Lateral esquerda do abdômen', 530, 638, 20, 48],
  ['c_ld', 'Coxa direita (lateral)', 227, 1001, 20, 48], ['c_fd', 'Coxa direita (frente)', 301, 1012, 33, 53],
  ['c_fe', 'Coxa esquerda (frente)', 473, 1012, 33, 53], ['c_le', 'Coxa esquerda (lateral)', 550, 1001, 20, 48],
  ['a_d', 'Braço direito', 169, 506, 24, 57], ['a_e', 'Braço esquerdo', 607, 506, 24, 57]];
const ML = { cafe: ['Café da manhã', '☕'], lanche_m: ['Lanche da manhã', '🍎'], almoco: ['Almoço', '🥗'], lanche_t: ['Lanche da tarde', '🍳'], jantar: ['Jantar', '🍜'], lanches: ['Lanches', '🍎'] };
const FOODS = [['Arroz branco (100 g)', 130, 2.7, 28, .3, .4], ['Feijão cozido (100 g)', 76, 4.8, 14, .5, 8.5], ['Peito de frango grelhado (100 g)', 165, 31, 0, 3.6, 0], ['Carne bovina grelhada (100 g)', 220, 26, 0, 12, 0], ['Ovo cozido (1 un)', 78, 6.3, .6, 5.3, 0], ['Pão francês (1 un)', 150, 4.7, 29, 1.5, 1.4], ['Banana (1 un)', 89, 1.1, 23, .3, 2.6], ['Maçã (1 un)', 72, .4, 19, .2, 3.3], ['Iogurte natural (170 g)', 104, 5.9, 8, 5.6, 0], ['Salada de alface (100 g)', 15, 1.4, 2.9, .2, 1.3], ['Café com leite (1 xícara)', 60, 3, 5, 3, 0], ['Whey protein (1 dose)', 120, 24, 3, 1.5, 0]];
const MEAL_OPTIONS = [['cafe', 'Café da manhã', '☕'], ['lanche_m', 'Lanche da manhã', '🍎'], ['almoco', 'Almoço', '🥗'], ['lanche_t', 'Lanche da tarde', '🍳'], ['jantar', 'Jantar', '🍜']];
const PLAN_RESTRICTIONS = [
  ['vegetarian', 'Vegetariano', 'Sem carne ou peixe'],
  ['dairy', 'Leite e derivados', 'Evitar lactose e laticínios'],
  ['gluten', 'Glúten', 'Evitar trigo, centeio e cevada'],
  ['fish', 'Peixes e frutos do mar', ''],
  ['nuts', 'Amendoim e castanhas', '']
];
const PLAN_AVOIDS = [['egg', 'Ovos'], ['chicken', 'Frango'], ['meat', 'Carne vermelha'], ['fish', 'Peixe'], ['dairy', 'Leite e iogurte'], ['banana', 'Banana'], ['oats', 'Aveia'], ['nuts', 'Castanhas']];
const PLAN_STYLES = [['varied', 'Variado', 'Um pouco de cada estilo'], ['home', 'Comida caseira', 'Sabores simples do dia a dia'], ['quick', 'Prático', 'Ideias rápidas de preparar']];
const PLAN_TIMES = [['any', 'Sem preferência', ''], ['quick', 'Até 15 minutos', ''], ['normal', 'Até 30 minutos', '']];
const RECIPES = [
  { id: 'cafe-ovo', meal: 'cafe', name: 'Ovos mexidos com pão e fruta', desc: 'Ovos mexidos, pão integral e uma fruta da estação.', kcal: 340, p: 18, c: 42, g: 11, f: 6, tags: ['egg', 'gluten'], minutes: 12, style: 'home' },
  { id: 'cafe-iogurte', meal: 'cafe', name: 'Iogurte com aveia e banana', desc: 'Iogurte natural, aveia e banana fatiada.', kcal: 310, p: 14, c: 48, g: 7, f: 6, tags: ['dairy', 'oats', 'gluten', 'banana'], minutes: 5, style: 'quick' },
  { id: 'cafe-tapioca', meal: 'cafe', name: 'Tapioca com ovo e tomate', desc: 'Tapioca recheada com ovo mexido e tomate.', kcal: 320, p: 14, c: 42, g: 10, f: 3, tags: ['egg'], minutes: 12, style: 'varied' },
  { id: 'lanche-fruta', meal: 'lanche_m', name: 'Maçã com pasta de amendoim', desc: 'Maçã fatiada com uma porção de pasta de amendoim.', kcal: 190, p: 5, c: 25, g: 9, f: 5, tags: ['nuts'], minutes: 3, style: 'quick' },
  { id: 'lanche-iogurte', meal: 'lanche_m', name: 'Iogurte com fruta', desc: 'Iogurte natural com fruta picada.', kcal: 160, p: 8, c: 25, g: 4, f: 3, tags: ['dairy', 'banana'], minutes: 3, style: 'quick' },
  { id: 'lanche-ovo', meal: 'lanche_m', name: 'Ovo cozido e fruta', desc: 'Ovo cozido acompanhado de uma fruta.', kcal: 150, p: 8, c: 20, g: 5, f: 3, tags: ['egg'], minutes: 10, style: 'home' },
  { id: 'almoco-frango', meal: 'almoco', name: 'Arroz, feijão e frango', desc: 'Arroz, feijão, frango grelhado e salada.', kcal: 520, p: 38, c: 62, g: 12, f: 10, tags: ['chicken'], minutes: 25, style: 'home' },
  { id: 'almoco-ovo', meal: 'almoco', name: 'Arroz, feijão e omelete', desc: 'Arroz, feijão, omelete e legumes.', kcal: 490, p: 24, c: 66, g: 14, f: 11, tags: ['egg'], minutes: 20, style: 'varied' },
  { id: 'almoco-lentilha', meal: 'almoco', name: 'Bowl de lentilha e legumes', desc: 'Lentilha, arroz e legumes assados.', kcal: 470, p: 21, c: 74, g: 10, f: 16, tags: ['vegetarian'], minutes: 25, style: 'quick' },
  { id: 'almoco-legumes', meal: 'almoco', name: 'Arroz, feijão e legumes', desc: 'Arroz, feijão e legumes refogados.', kcal: 430, p: 18, c: 70, g: 9, f: 13, tags: ['vegetarian'], minutes: 15, style: 'quick' },
  { id: 'lanche-tapioca', meal: 'lanche_t', name: 'Tapioca com queijo', desc: 'Tapioca recheada com queijo e tomate.', kcal: 240, p: 10, c: 37, g: 7, f: 2, tags: ['dairy'], minutes: 10, style: 'quick' },
  { id: 'lanche-banana', meal: 'lanche_t', name: 'Banana com aveia', desc: 'Banana com aveia e canela.', kcal: 210, p: 5, c: 42, g: 4, f: 7, tags: ['banana', 'oats', 'gluten'], minutes: 5, style: 'quick' },
  { id: 'lanche-sanduiche', meal: 'lanche_t', name: 'Sanduíche de frango', desc: 'Pão integral com frango desfiado e folhas.', kcal: 290, p: 23, c: 35, g: 7, f: 5, tags: ['chicken', 'gluten'], minutes: 12, style: 'home' },
  { id: 'jantar-sopa', meal: 'jantar', name: 'Sopa de legumes e feijão', desc: 'Sopa caseira de legumes com feijão.', kcal: 360, p: 17, c: 58, g: 7, f: 12, tags: ['vegetarian'], minutes: 25, style: 'home' },
  { id: 'jantar-omelete', meal: 'jantar', name: 'Omelete com salada', desc: 'Omelete de legumes acompanhada de salada.', kcal: 340, p: 22, c: 20, g: 18, f: 7, tags: ['egg'], minutes: 15, style: 'quick' },
  { id: 'jantar-frango', meal: 'jantar', name: 'Frango com legumes', desc: 'Frango grelhado com legumes cozidos.', kcal: 390, p: 35, c: 30, g: 13, f: 9, tags: ['chicken'], minutes: 25, style: 'varied' },
  { id: 'lanches-fruta', meal: 'lanches', name: 'Fruta com castanhas', desc: 'Uma fruta da estação com castanhas.', kcal: 200, p: 5, c: 24, g: 11, f: 5, tags: ['nuts'], minutes: 3, style: 'quick' },
  { id: 'lanches-iogurte', meal: 'lanches', name: 'Iogurte com aveia', desc: 'Iogurte natural, aveia e canela.', kcal: 220, p: 11, c: 31, g: 6, f: 4, tags: ['dairy', 'oats', 'gluten'], minutes: 3, style: 'home' }
];
const DS = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'], MES = ['jan', 'fev', 'mar', 'abr', 'mai', 'jun', 'jul', 'ago', 'set', 'out', 'nov', 'dez'];

const $ = s => document.querySelector(s);
const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const EMOJI_ICONS = {
  '💉': 'syringe', '🍴': 'utensils', '⚖️': 'scale', '🏠': 'house', '👥': 'users-round',
  '👤': 'user-round', '📅': 'calendar-days', '🔥': 'flame', '⚙️': 'settings', '📋': 'clipboard-list',
  '🥗': 'salad', '🫀': 'heart-pulse', '🚽': 'accessibility', '☕': 'coffee', '🍎': 'apple',
  '🍳': 'cooking-pot', '🍜': 'soup', '📷': 'camera', '✏️': 'pencil', '🔍': 'search',
  '📖': 'book-open', '🕘': 'clock-3', '🎁': 'gift', '📏': 'ruler', '🍑': 'activity',
  '💊': 'pill', '🧍': 'person-standing', '☹️': 'frown', '📍': 'map-pin', '📝': 'notebook-pen',
  '🍽️': 'utensils', '🕐': 'clock-1', '🕑': 'clock-2', '🕒': 'clock-3', '🕓': 'clock-4',
  '🕕': 'clock-6', '🕗': 'clock-8', '🕙': 'clock-10', '👍': 'thumbs-up'
};
const emojiPattern = new RegExp(Object.keys(EMOJI_ICONS).sort((a, b) => b.length - a.length)
  .map(value => value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|'), 'gu');
function replaceEmojis(root) {
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT), nodes = [];
  while (walker.nextNode()) nodes.push(walker.currentNode);
  nodes.forEach(node => {
    const text = node.nodeValue;
    emojiPattern.lastIndex = 0;
    if (!emojiPattern.test(text)) return;
    emojiPattern.lastIndex = 0;
    const fragment = document.createDocumentFragment();
    let offset = 0;
    for (const match of text.matchAll(emojiPattern)) {
      fragment.append(document.createTextNode(text.slice(offset, match.index)));
      const icon = document.createElement('i');
      icon.dataset.lucide = EMOJI_ICONS[match[0]];
      icon.setAttribute('aria-hidden', 'true');
      icon.className = 'icon';
      fragment.append(icon);
      offset = match.index + match[0].length;
    }
    fragment.append(document.createTextNode(text.slice(offset)));
    node.replaceWith(fragment);
  });
  if (window.lucide) window.lucide.createIcons({ attrs: { class: 'icon' } });
}
const pad = n => String(n).padStart(2, '0');
const ymd = d => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
const fdt = d => { d = new Date(d); return `${d.getDate()} ${MES[d.getMonth()]} ${pad(d.getHours())}:${pad(d.getMinutes())}` };
const fdate = d => { d = new Date(d); return `${d.getDate()} ${MES[d.getMonth()]} ${d.getFullYear()} às ${pad(d.getHours())}:${pad(d.getMinutes())}` };
const num = v => { const n = parseFloat(String(v ?? '').replace(',', '.')); return isNaN(n) ? null : n };
const loc = d => new Date(d.getTime() - d.getTimezoneOffset() * 6e4).toISOString().slice(0, 16);
const uid = () => Math.random().toString(36).slice(2, 10);
const kg = n => n == null ? '—' : n.toFixed(1).replace('.', ',');
const liters = ml => (ml / 1000).toLocaleString('pt-BR', { maximumFractionDigits: 2 });

const def = () => ({ name: '', email: '', theme: 'light', interval: 7, block: 30, medication: 'Mounjaro', kcal: 1800, macros: { p: 121, c: 217, g: 50, f: 25 }, waterGoal: 2000, waterByDay: {}, planPrefs: { restrictions: [], avoids: [], style: 'varied', time: 'any' }, planResult: [], wStart: null, wGoal: null, height: null, mealsOn: ['cafe', 'almoco', 'jantar', 'lanches'], planDone: false, closedStart: false, nextOverride: null, apps: [], weights: [], measures: { cintura: [], quadril: [] }, meals: [], saved: [], symptoms: [], bowel: [], photos: [], upd: 0 });
let S = def();
function loadStoredData(key) {
  try { return Object.assign(def(), JSON.parse(localStorage.getItem(key) || '{}')); }
  catch (error) { console.error('Não foi possível carregar os dados salvos neste aparelho.', error); return def(); }
}
let user = null, activeUserId = null, authReady = false, authRecovery = false, authMode = 'signin', tab = 'home', screen = null, day = ymd(new Date()), ctx = {}, pushT, sheetDrag = null;
const storageKey = () => user ? `${KEY}:${user.id}` : KEY;
let toastT;
function notify(message) {
  const toast = $('#toast');
  if (!toast) return;
  toast.textContent = message;
  toast.hidden = false;
  clearTimeout(toastT);
  toastT = setTimeout(() => { toast.hidden = true; }, 5000);
}
function persist() {
  try { localStorage.setItem(storageKey(), JSON.stringify(S)); }
  catch (error) { console.error('Não foi possível salvar os dados neste aparelho.', error); alert('Sem espaço para salvar. Exporte seus dados ou remova fotos antigas.'); }
}
function applyTheme() {
  const dark = S.theme === 'dark';
  document.documentElement.dataset.theme = dark ? 'dark' : 'light';
  document.querySelector('meta[name="theme-color"]')?.setAttribute('content', dark ? '#080d16' : '#f5f7f4');
}
function save() { S.upd = Date.now(); persist(); clearTimeout(pushT); pushT = setTimeout(push, 1200); }
async function push() {
  if (!cloud || !user) return true;
  try {
    const { error } = await cloud.from('user_data').upsert({ user_id: user.id, data: S, updated_at: new Date().toISOString() });
    if (error) throw error;
    return true;
  } catch (error) {
    console.error('Falha ao sincronizar os dados com o Supabase.', error);
    notify('Não foi possível sincronizar. Confira sua conexão e as configurações da nuvem.');
    return false;
  }
}
async function pull() {
  try {
    const { data, error } = await cloud.from('user_data').select('data').maybeSingle();
    if (error) throw error;
    if (data && (data.data.upd || 0) > S.upd) { S = Object.assign(def(), data.data); persist(); render(); return true; }
    return await push();
  } catch (error) {
    console.error('Falha ao carregar os dados do Supabase.', error);
    notify('Não foi possível carregar os dados da nuvem.');
    return false;
  }
}
const lastApp = () => [...S.apps].sort((a, b) => b.at.localeCompare(a.at))[0];
const nextDate = () => { if (S.nextOverride) return new Date(S.nextOverride); const l = lastApp(); return l ? new Date(new Date(l.at).getTime() + S.interval * 864e5) : null };
const curW = () => S.weights.length ? [...S.weights].sort((a, b) => a.d.localeCompare(b.d)).at(-1).kg : S.wStart;
const hM = () => S.height ? (S.height > 3 ? S.height / 100 : S.height) : null;
function streak() {
  const set = new Set([...S.apps.map(a => a.d), ...S.meals.map(m => m.date), ...S.weights.map(w => w.d)]);
  let n = 0, d = new Date(); if (!set.has(ymd(d))) d.setDate(d.getDate() - 1);
  while (set.has(ymd(d))) { n++; d.setDate(d.getDate() - 1) } return n;
}
function makePlan(meals, prefs = S.planPrefs, previous = []) {
  const forbidden = new Set(prefs.avoids || []);
  (prefs.restrictions || []).filter(value => value !== 'vegetarian').forEach(value => forbidden.add(value));
  return meals.map(type => {
    let options = RECIPES.filter(recipe => {
      if (recipe.meal !== type || recipe.tags.some(tag => forbidden.has(tag))) return false;
      if ((prefs.restrictions || []).includes('vegetarian') && recipe.tags.some(tag => ['chicken', 'meat', 'fish'].includes(tag))) return false;
      if (prefs.time === 'quick' && recipe.minutes > 15) return false;
      if (prefs.time === 'normal' && recipe.minutes > 30) return false;
      return true;
    });
    options.sort((a, b) => Number(b.style === prefs.style) - Number(a.style === prefs.style));
    const alternatives = options.filter(recipe => recipe.id !== previous.find(item => item.type === type)?.id);
    if (alternatives.length) options = alternatives;
    const chosen = options.length ? options[Math.floor(Math.random() * Math.min(options.length, 3))] : null;
    return { type, id: chosen?.id || null };
  });
}
function waterCard() {
  const goal = Math.max(250, Number(S.waterGoal) || 2000), consumed = Number(S.waterByDay?.[ymd(new Date())]) || 0;
  const cups = Math.min(14, Math.max(1, Math.ceil(goal / 250)));
  return `<section class="card water-card"><div class="water-head"><div class="water-title"><span class="ic water-icon"><i data-lucide="droplets" aria-hidden="true"></i></span><div><b class="ct">Água</b><p class="muted s">Acompanhe o que bebeu hoje</p></div></div><div class="water-total"><b>${liters(consumed)} L</b><span>/ ${liters(goal)} L</span></div></div>
  <div class="bar water-bar"><i style="width:${Math.min(100, consumed / goal * 100)}%"></i></div><div class="water-cups" aria-label="${consumed} ml de ${goal} ml">${Array.from({ length: cups }, (_, i) => `<i data-lucide="glass-water" class="water-cup ${consumed >= (i + 1) * 250 ? 'filled' : ''}" aria-hidden="true"></i>`).join('')}</div>
  <div class="water-actions"><span class="muted s">1 copo = 250 ml · Meta ajustável em Ajustes</span><div><button class="btn soft water-undo" data-a="waterUndo" aria-label="Desfazer um copo">−</button><button class="btn water-add" data-a="waterAdd"><i data-lucide="plus" aria-hidden="true"></i> 250 ml</button></div></div></section>`;
}
const shrink = (f, max = 640) => new Promise(r => { const i = new Image(); i.onload = () => { const k = Math.min(1, max / Math.max(i.width, i.height)), c = document.createElement('canvas'); c.width = i.width * k; c.height = i.height * k; c.getContext('2d').drawImage(i, 0, 0, c.width, c.height); r(c.toDataURL('image/jpeg', .7)) }; i.src = URL.createObjectURL(f) });

const zl = id => (ZONES.find(z => z[0] === id) || [0, id || '—'])[1];
// dias restantes de descanso do local na data informada (0 = livre)
const zoneLeft = (id, date) => { let m = 0; S.apps.forEach(a => { if (a.site !== id) return; const d = Math.abs(date - new Date(a.at)) / 864e5; if (d < S.block) m = Math.max(m, Math.ceil(S.block - d)) }); return m };
const suggest = date => { const lu = id => Math.max(0, ...S.apps.filter(a => a.site === id).map(a => +new Date(a.at))); return ZONES.map(z => z[0]).filter(id => !zoneLeft(id, date)).sort((a, b) => lu(a) - lu(b))[0] || '' };
function figure(sel, date, click) {
  const z = ZONES.map(([id, l, cx, cy, rx, ry]) => { const left = zoneLeft(id, date), cls = id === sel ? 'zs' : left ? 'zb' : 'zf';
    return `<g class="z ${cls} ${click ? 'z-clickable' : ''}" ${click ? `data-a="zone" data-v="${id}" role="button" tabindex="0" aria-label="${esc(l)}${left ? `, livre em ${left} dias` : ''}"` : ''}><title>${esc(l)}${left ? ` — livre em ${left}d` : ''}</title><ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}"/>${id === sel ? `<circle class="zone-selected-dot" cx="${cx}" cy="${cy}" r="8"/>` : ''}</g>` }).join('');
  return `<div class="fig-wrap">
    <img class="fig-photo" src="injection-map.png" alt="Ilustração frontal com os locais disponíveis para aplicação">
    <svg viewBox="0 0 768 1210" class="fig photo-fig" role="group" aria-label="Selecione um local para aplicação">${z}</svg>
  </div>`;
}
const grab = () => { ctx.f = Object.assign(ctx.f || {}, { at: $('#fa').value, notes: $('#fn').value, med: $('#fm').value, dose: $('#fd').value, pain: $('#fp').value }) };

const hd = (t, extra = '') => `<div class="hd"><h1>${t}</h1><div>${extra}<span class="fl">🔥 ${streak()}</span><button data-a="settings" aria-label="Ajustes">⚙️</button></div></div>`;
const back = (t, action = 'back', extra = '<span class="ttl-spacer" aria-hidden="true"></span>') => `<div class="ttl"><button class="back" data-a="${action}" aria-label="Voltar">‹</button><b>${t}</b>${extra}</div>`;

function nextCard() {
  const n = nextDate(), l = lastApp(); let body;
  if (!n) body = `<p class="big">Sem aplicações</p><p class="muted">Registre sua primeira dose para ver a data da próxima.</p>`;
  else {
    const ms = n - Date.now(), d = Math.round(ms / 864e5), late = ms < 0 && d < 0, gap = S.interval * 864e5;
    const pct = late ? 100 : Math.max(4, Math.min(100, (1 - ms / gap) * 100));
    body = `<p class="big ${late ? 'red' : 'green'}">${late ? `Atrasada há ${-d}d` : d <= 0 ? 'É hoje' : `Em ${d}d`}</p><div class="bar ${late ? 'late' : ''}"><i style="width:${pct}%"></i></div>
    <p class="muted s" style="margin-top:22px">Próxima dose</p><p class="m">${fdt(n)} (${esc(l ? l.dose : '')} mg • ${esc(l ? l.med : S.medication)})</p>`;
  }
  return `<section class="card"><b class="ct">💉 Próxima Aplicação</b>${body}<button class="btn" data-a="newApp">＋ Registrar aplicação</button>${n ? `<button class="lnk" data-a="chgNext">Alterar data da próxima dose ›</button>` : ''}</section>`;
}

function gauge(p, max) {
  const r = 80, C = 2 * Math.PI * r, arc = C * .75, f = Math.min(1, p / max) * arc, t = `fill="none" stroke-width="16" stroke-linecap="round" transform="rotate(135 100 100)"`;
  return `<svg viewBox="0 0 200 200" class="gauge"><circle cx="100" cy="100" r="80" stroke="#eef1f6" ${t} stroke-dasharray="${arc} ${C}"/><circle cx="100" cy="100" r="80" stroke="${p > max ? '#c9372c' : '#4b7557'}" ${t} stroke-dasharray="${f} ${C}"/><text x="100" y="108" text-anchor="middle" class="gn">${Math.round(p)}</text><text x="100" y="134" text-anchor="middle" class="gl">Calorias</text></svg>`;
}

const TB = {
  home() {
    const st = [S.apps.length > 0, S.meals.length > 0, S.planDone], nd = st.filter(Boolean).length;
    const start = S.closedStart || nd === 3 ? '' : `<section class="card"><div style="display:flex;justify-content:space-between;align-items:center"><b class="ct">Comece aqui</b><span class="muted">${nd}/3 <button data-a="closeStart" aria-label="Fechar" style="font-size:26px;margin-left:10px">✕</button></span></div>
    <div class="bar" style="margin:14px 0 8px"><i style="width:${nd / 3 * 100}%"></i></div>
    <button class="go" data-a="newApp"><span class="ic">💉</span>Registre sua primeira dose</button>
    <button class="go" data-a="mealFab"><span class="ic">🍴</span>Registre sua primeira refeição</button>
    <button class="go" data-a="plan"><span class="ic">📋</span>Monte seu cardápio</button></section>`;
    return `<div class="hd"><h1>Olá, ${esc(S.name || 'você')}</h1><div><button class="pill" data-a="today">📅 Hoje</button><span class="fl">🔥 ${streak()}</span></div></div>${start}${nextCard()}${waterCard()}`;
  },
  nutri() {
    const ms = S.meals.filter(m => m.date === day), t = k => ms.reduce((a, m) => a + (m[k] || 0), 0), n = nextDate(), G = S.macros;
    const sel = new Date(day + 'T12:00'), sun = new Date(sel); sun.setDate(sel.getDate() - sel.getDay());
    const wk = DS.map((nm, i) => { const d = new Date(sun); d.setDate(sun.getDate() + i); const k = ymd(d), inj = S.apps.some(a => a.d === k) || (n && ymd(n) === k); return `<button data-a="pick" data-v="${k}" class="${k === day ? 'on' : ''}">${nm}<b>${inj ? '💉' : d.getDate()}</b></button>` }).join('');
    const mac = [['Proteína', 'p', '#e0507a'], ['Carbo', 'c', '#e0a82e'], ['Gordura', 'g', '#3b5bdb'], ['Fibra', 'f', '#4b7557']].map(([l, k, c]) => `<div><span>${l}</span><div class="bar"><i style="width:${Math.min(100, t(k) / G[k] * 100)}%;background:${c}"></i></div><b style="color:${c}">${Math.round(t(k))}g</b> <span class="muted">/${G[k]}g</span></div>`).join('');
    const rows = S.mealsOn.map(id => { const it = ms.filter(m => m.type === id); return `<div class="mrow"><span class="em">${ML[id][1]}</span><div>${ML[id][0]}${it.map(m => `<div class="muted s" data-a="delMeal" data-v="${m.id}">${esc(m.name)} · ${Math.round(m.kcal || 0)} kcal ✕</div>`).join('')}</div><button class="plus" data-a="addMeal" data-v="${id}" aria-label="Adicionar">＋</button></div>` }).join('');
    return `${hd('Nutrição', '<button class="pill" data-a="today">📅 Hoje</button>')}<div class="wk">${wk}</div>
    <section class="card"><div style="display:flex;justify-content:space-between;align-items:center"><b class="ct">🍴 Resumo</b><span class="tag">Meta: ${S.kcal.toLocaleString('pt-BR')} kcal</span></div>${gauge(t('kcal'), S.kcal)}<div class="mc">${mac}</div>
    <hr style="border:0;border-top:1px solid var(--ln);margin:22px 0"><div class="me2" style="border:0;padding:0"><span class="ic">🍴</span><div style="flex:1"><b style="font-weight:700;font-size:22px">Meu cardápio</b><p class="muted" style="margin:4px 0">${S.planDone ? 'Suas refeições do dia estão configuradas.' : 'Vamos criar um cardápio completo personalizado para você'}</p></div></div>
    <button class="lnk" style="color:var(--g)" data-a="${S.planDone ? 'generated' : 'plan'}">${S.planDone ? 'Ver meu cardápio' : 'Montar meu cardápio'} ›</button></section><h2>Refeições</h2>${rows}`;
  },
  comm() { return `${hd('Comunidade')}<section class="card emp">👥<b>Comunidade em breve</b>Aqui você vai poder trocar experiências com outras pessoas.</section>${share()}`; },
  doses() {
    const list = a => a.slice(-3).reverse().map(x => `<div class="row"><span>${esc(x.txt || 'Registro')}</span><span class="muted s">${fdt(x.at)}</span></div>`).join('');
    const hist = [...S.apps].sort((a, b) => b.at.localeCompare(a.at)).slice(0, 8).map(a => `<div class="row"><div><b>${fdate(a.at)}</b><br><span class="muted s">${esc(a.dose)} mg • ${esc(a.med)} • ${esc(zl(a.site))} • dor ${esc(a.pain)}${a.notes ? ' • ' + esc(a.notes) : ''}</span></div><button data-a="delApp" data-v="${a.id}" aria-label="Excluir" class="muted">✕</button></div>`).join('');
    return `${hd('Doses')}${nextCard()}<section class="card"><b class="ct">🧍 Rodízio dos locais</b>${figure(null, new Date(), 0)}<p class="muted s" style="text-align:center">Locais em cinza foram usados nos últimos ${S.block} dias e ficam bloqueados.</p></section>
    <section class="card"><b class="ct">🫀 Sintomas</b>${S.symptoms.length ? list(S.symptoms) : '<p class="muted" style="text-align:center;font-size:18px;margin:26px 0">Anote como você se sente e acompanhe como seu corpo responde ao tratamento</p>'}<button class="btn soft" data-a="addSym">＋ Registrar sintomas</button></section>
    <section class="card"><b class="ct">🚽 Intestino</b>${S.bowel.length ? list(S.bowel) : '<p class="muted" style="text-align:center;font-size:18px;margin:26px 0">Acompanhe sua rotina intestinal</p>'}<button class="btn soft" data-a="addBowel">＋ Registrar evacuação</button></section>
    ${hist ? `<section class="card"><b class="ct">Histórico de aplicações</b>${hist}</section>` : ''}`;
  },
  perfil() {
    const cw = curW(), h = hM(), bmi = cw && h ? cw / (h * h) : null, diff = S.wStart && cw ? S.wStart - cw : 0;
    const pct = S.wStart && S.wGoal && S.wStart !== S.wGoal ? Math.max(0, Math.min(100, (S.wStart - cw) / (S.wStart - S.wGoal) * 100)) : 0;
    const ms = ['cintura', 'quadril'].map(k => { const a = S.measures[k], l = a.at(-1); return `<div class="me2"><span class="ic">${k === 'cintura' ? '📏' : '🍑'}</span><div style="flex:1"><b>${k[0].toUpperCase() + k.slice(1)}</b><br><span class="muted">${l ? kg(l.v) + ' cm' : 'Ainda não medida'}</span></div><button data-a="addMeasure" data-v="${k}" style="color:var(--g);font-weight:600;font-size:18px">Adicionar</button></div>` }).join('');
    const ph = S.photos, box = (p, t) => `<div>${p ? `<img alt="${t}" src="${p.img}">` : t}</div>`;
    const cat = bmi == null ? '' : bmi < 18.5 ? ['Abaixo do peso', '#3b82c4'] : bmi < 25 ? ['Saudável', '#4caf50'] : bmi < 30 ? ['Sobrepeso', '#e8a23a'] : ['Obeso', '#c9372c'];
    const pos = bmi == null ? 0 : Math.max(1, Math.min(99, (bmi - 15) / 25 * 100));
    return `${hd('Meu Perfil')}<div class="me"><div class="av">${esc((S.name || 'V')[0].toUpperCase())}</div><div><b>${esc(S.name || 'Você')}</b><br><span class="muted">${esc(S.email || 'Modo local neste aparelho')}</span></div></div>${share()}
    <div style="text-align:center;font-weight:600;padding:14px;border-bottom:2px solid var(--ink);margin-bottom:16px">Progresso</div>
    <section class="card"><div style="display:flex;justify-content:space-between;align-items:center"><span style="font-size:20px">Peso atual</span><button class="plus" data-a="addWeight" aria-label="Registrar peso">＋</button></div>
    ${cw ? `<div style="display:flex;justify-content:space-between;align-items:center;margin:14px 0"><span class="pw">${kg(cw)} <small>kg</small></span>${diff > 0 ? `<span class="chip">↓ ${kg(diff).replace(',0', '')} kg</span>` : ''}</div>
    <div class="bar"><i style="width:${pct}%"></i></div><div class="sp"><span>Início: ${kg(S.wStart).replace(',0', '')} kg</span><span>Meta: ${S.wGoal ? kg(S.wGoal).replace(',0', '') + ' kg' : '—'}</span></div>
    <button class="lnk" style="color:var(--g);font-weight:600" data-a="stats">Ver estatísticas</button>` : `<p class="muted" style="margin:16px 0">Registre seu peso para acompanhar o progresso.</p><button class="btn soft" data-a="settings">Definir peso, meta e altura</button>`}</section>
    <section class="card"><div style="display:flex;justify-content:space-between;align-items:center"><span style="font-size:20px">Medidas corporais</span></div>${ms}</section>
    <section class="card"><b class="ct">Fotos de progresso</b><div class="ph">${box(ph[0], 'Antes')}<span class="muted" style="font-size:30px">→</span>${box(ph.length > 1 ? ph.at(-1) : null, 'Depois')}</div><p class="muted" style="text-align:center">Compare sua primeira foto com seu progresso mais recente</p><button class="btn soft" data-a="addPhoto">📷 Adicionar foto</button>${ph.length ? `<button class="lnk s" data-a="delPhoto">Excluir última foto</button>` : ''}</section>
    ${bmi ? `<section class="card"><b class="ct">IMC</b><div style="display:flex;justify-content:space-between;align-items:center;margin-top:10px"><span class="pw" style="font-size:56px">${bmi.toFixed(1)}</span><span class="tag" style="color:${cat[1]};background:${cat[1]}22">${cat[0]}</span></div><p class="muted s">${cw.toFixed(1)} kg ÷ (${h.toFixed(2)} m)²</p><div class="imc"><i style="left:${pos}%"></i></div><div class="lg"><span style="color:#3b82c4">Abaixo do peso</span><span style="color:#4caf50">Saudável</span><span style="color:#e8a23a">Sobrepeso</span><span style="color:#c9372c">Obeso</span></div></section>` : ''}`;
  }
};
const share = () => `<button class="card go" style="display:flex;width:100%;padding:18px" data-a="share"><span class="ic" style="border-radius:16px">🎁</span><span><b>Indique um amigo</b><br><span class="muted">Compartilhe o app</span></span></button>`;

const SC = {
  app() {
    ctx.f = ctx.f || {}; const F = ctx.f; F.at = F.at || loc(new Date()); const date = new Date(F.at);
    if (F.site === undefined) F.site = suggest(date);
    const sheet = ctx.sheet ? `<div class="ov" data-a="closeSheet"></div><div class="bs"><i class="hdl" data-sheet-handle aria-hidden="true"></i><div class="site-sheet-head"><h2>Local da aplicação</h2><button class="site-sheet-close" type="button" data-a="closeSheet" aria-label="Cancelar escolha do local">×</button></div>${figure(ctx.pick, date, 1)}<p class="zlab ${ctx.err ? 'red' : ''}">${ctx.err || '📍 ' + esc(zl(ctx.pick))}</p><div class="site-sheet-actions"><button class="btn soft" data-a="closeSheet">Cancelar</button><button class="btn" data-a="selSite">Selecionar local</button></div></div>` : '';
    return `${back('Registrar aplicação', 'cancelApp', '<button class="app-cancel" data-a="cancelApp">Cancelar</button>')}<p class="app-form-hint">Preencha os dados e escolha um local. Você pode cancelar sem salvar.</p><label class="rw"><span>📅 Data</span><input id="fa" type="datetime-local" value="${esc(F.at)}"></label><h2>Aplicação de hoje</h2>
    <label class="rw"><span>📝 Notas</span><input id="fn" placeholder="Adicionar notas" value="${esc(F.notes || '')}"></label>
    <label class="rw"><span>💉 Medicação</span><input id="fm" value="${esc(F.med ?? S.medication)}"></label>
    <label class="rw"><span>💊 Dose (mg)</span><input id="fd" inputmode="decimal" placeholder="ex.: 5" value="${esc(F.dose ?? (lastApp() ? lastApp().dose : ''))}"></label>
    <button class="rw" style="width:100%;text-align:left" data-a="sites"><span>🧍 Local</span><span style="flex:1;text-align:right;color:${F.site ? 'var(--mu)' : 'var(--r)'};font-weight:500;font-size:17px">${F.site ? esc(zl(F.site)) : 'Todos em descanso'}</span><span class="muted">›</span></button>
    <div class="card"><div class="rw0"><b>☹️ Nível de dor</b><b id="pv">${esc(F.pain ?? 0)}</b></div><input id="fp" type="range" min="0" max="10" value="${esc(F.pain ?? 0)}" oninput="pv.textContent=this.value"></div>
    <button class="btn bot" data-a="saveApp">Salvar aplicação</button>${sheet}`;
  },
  meal() {
    const rec = [], seen = new Set(); [...S.meals].reverse().forEach(m => { if (!seen.has(m.name) && rec.length < 8) { seen.add(m.name); rec.push(m) } });
    const lst = ctx.mt === 's' ? S.saved : rec; ctx.list = lst;
    const body = lst.length ? lst.map((m, i) => `<button class="mrow" style="width:100%;text-align:left" data-a="reuse" data-v="${i}"><div>${esc(m.name)}<div class="muted s">${Math.round(m.kcal || 0)} kcal</div></div><span class="plus" style="display:grid;place-items:center">＋</span></button>`).join('')
      : `<div class="emp">🕘<b>${ctx.mt === 's' ? 'Sem refeições salvas' : 'Sem refeições recentes'}</b>${ctx.mt === 's' ? 'Marque "Salvar" ao descrever uma refeição.' : 'As refeições que você registrar aparecem aqui pra registrar rápido.'}</div>`;
    return `${back('Nova refeição')}<div class="tiles"><button class="tile" data-a="mealPhoto"><i>📷</i>Tirar foto</button><button class="tile" data-a="describe"><i>✏️</i>Descrever</button><button class="tile" data-a="search"><i>🔍</i>Buscar</button></div>
    <button class="box" data-a="plan">📖 Criar um plano alimentar</button><div class="tb"><button data-a="mt" data-v="r" class="${ctx.mt !== 's' ? 'on' : ''}">Recentes</button><button data-a="mt" data-v="s" class="${ctx.mt === 's' ? 'on' : ''}">Salvas</button></div>${body}`;
  },
  describe() {
    return `${back('Descrever refeição')}<input class="fi" id="dn" placeholder="O que você comeu?"><input class="fi" id="dk" inputmode="decimal" placeholder="Calorias (kcal)">
    <input class="fi" id="dp" inputmode="decimal" placeholder="Proteína (g)"><input class="fi" id="dc" inputmode="decimal" placeholder="Carboidrato (g)"><input class="fi" id="dg" inputmode="decimal" placeholder="Gordura (g)"><input class="fi" id="df" inputmode="decimal" placeholder="Fibra (g)">
    <label style="display:flex;gap:10px;align-items:center;margin:8px 0"><input type="checkbox" id="ds"> Salvar para reutilizar</label><button class="btn bot" data-a="saveDesc">Adicionar à refeição</button>`;
  },
  search() {
    return `${back('Buscar alimento')}<input class="fi" placeholder="Ex.: arroz, banana…" oninput="A.filter(this.value)" autofocus><div id="fl">${foodList('')}</div><p class="muted s">Valores aproximados por porção.</p>`;
  },
  plan() {
    const prefs = ctx.plan || (ctx.plan = { meals: [...S.mealsOn], restrictions: [...(S.planPrefs?.restrictions || [])], avoids: [...(S.planPrefs?.avoids || [])], style: S.planPrefs?.style || 'varied', time: S.planPrefs?.time || 'any' });
    const step = ctx.planStep || 0;
    const titles = ['Quais refeições fazem parte da sua rotina?', 'Você tem alguma restrição alimentar?', 'O que prefere evitar?', 'Qual estilo combina mais com você?', 'Quanto tempo costuma ter para cozinhar?'];
    const descriptions = [
      'Escolha as refeições que gostaria de ver no seu cardápio.',
      'Marque o que precisa evitar. O app não substitui orientação de um profissional.',
      'Assim, as sugestões não incluem esses ingredientes.',
      'Vamos usar sua preferência para escolher ideias mais parecidas com o seu dia a dia.',
      'Vamos priorizar opções que caibam no tempo que você tem.'
    ];
    let options = [];
    if (step === 0) options = MEAL_OPTIONS.map(([id, name, emoji]) => [id, name, emoji, '']);
    if (step === 1) options = [['none', 'Não tenho restrições', '👍', ''], ...PLAN_RESTRICTIONS.map(([id, name, desc]) => [id, name, '', desc])];
    if (step === 2) options = [['none', 'Como de tudo', '👍', ''], ...PLAN_AVOIDS.map(([id, name]) => [id, name, '', 'Não incluir nas sugestões'])];
    if (step === 3) options = PLAN_STYLES.map(([id, name, desc]) => [id, name, '', desc]);
    if (step === 4) options = PLAN_TIMES.map(([id, name, desc]) => [id, name, '', desc]);
    const selected = value => step === 0 ? prefs.meals.includes(value)
      : step === 1 ? value === 'none' ? !prefs.restrictions.length : prefs.restrictions.includes(value)
        : step === 2 ? value === 'none' ? !prefs.avoids.length : prefs.avoids.includes(value)
          : step === 3 ? prefs.style === value : prefs.time === value;
    const cards = options.map(([id, name, emoji, desc]) => `<button class="opt ${selected(id) ? 'on' : ''}" data-a="planChoice" data-kind="${step}" data-v="${id}" aria-pressed="${selected(id)}">${emoji ? `<i>${emoji}</i>` : ''}<span class="plan-choice-copy"><b>${name}</b>${desc ? `<small>${desc}</small>` : ''}</span><u>${selected(id) ? '✓' : ''}</u></button>`).join('');
    return `<div class="plan-wizard"><div class="plan-wizard-head"><button class="back" data-a="${step ? 'planPrev' : 'back'}" aria-label="Voltar">‹</button><div class="prog plan-progress"><i style="width:${(step + 1) / titles.length * 100}%"></i></div><span class="muted s">${step + 1}/${titles.length}</span></div>
    <h1 class="plan-question">${titles[step]}</h1><p class="muted plan-description">${descriptions[step]}</p><div class="plan-choices">${cards}</div>
    <button class="btn plan-next" data-a="${step === titles.length - 1 ? 'planGenerate' : 'planNext'}">${step === titles.length - 1 ? 'Gerar meu cardápio' : 'Continuar'}</button></div>`;
  },
  generated() {
    const items = S.planResult?.length ? S.planResult : makePlan(S.mealsOn, S.planPrefs);
    const total = items.reduce((sum, item) => sum + (RECIPES.find(recipe => recipe.id === item.id)?.kcal || 0), 0);
    const cards = items.map(item => {
      const recipe = RECIPES.find(entry => entry.id === item.id);
      const meal = ML[item.type];
      return `<article class="generated-meal"><div class="generated-meal-head"><span class="ic">${meal?.[1] || ''}</span><span class="muted s">${meal?.[0] || ''}</span></div>
      ${recipe ? `<h2>${esc(recipe.name)}</h2><p class="muted">${esc(recipe.desc)}</p><div class="generated-meta"><span><i data-lucide="flame" aria-hidden="true"></i> ~${recipe.kcal} kcal</span><span><i data-lucide="clock-3" aria-hidden="true"></i> ${recipe.minutes} min</span></div><button class="lnk generated-log" data-a="logPlanMeal" data-v="${item.type}">Registrar refeição <span>›</span></button>` : '<p class="muted">Não encontramos uma sugestão com essas combinações. Edite as preferências para ampliar as opções.</p>'}
      </article>`;
    }).join('');
    return `${back('Seu cardápio')}<div class="generated-intro"><span class="generated-mark"><i data-lucide="sparkles" aria-hidden="true"></i></span><h1>Seu cardápio de hoje</h1><p class="muted">Sugestões montadas a partir das suas preferências.</p></div>
    <section class="generated-summary"><div><b>${items.length}</b><span>refeições</span></div><div><b>~${total.toLocaleString('pt-BR')}</b><span>kcal estimadas</span></div><div><b>${items.filter(item => item.id).length}</b><span>sugestões</span></div></section>
    <div class="generated-list">${cards}</div><p class="muted s plan-disclaimer">As calorias são estimativas. Este cardápio oferece ideias gerais e não é uma prescrição alimentar ou médica. Ajuste as porções às suas necessidades e converse com um nutricionista em caso de alergias ou condições de saúde.</p>
    <button class="btn soft" data-a="regeneratePlan">Gerar outras sugestões</button><button class="btn" data-a="editPlan">Ajustar preferências</button>`;
  },
  stats() {
    const w = [...S.weights].sort((a, b) => b.d.localeCompare(a.d));
    return `${back('Estatísticas de peso')}<section class="card">${w.length ? w.map(x => `<div class="row"><span>${x.d.split('-').reverse().join('/')}</span><b>${kg(x.kg)} kg</b></div>`).join('') : '<p class="muted">Sem registros.</p>'}</section>`;
  },
  settings() {
    const f = (id, l, v, ph = '') => `<label class="f" for="${id}">${l}</label><input id="${id}" value="${esc(v ?? '')}" placeholder="${ph}">`;
    return `${back('Ajustes')}<section class="card theme-card"><div><b class="ct">Aparência</b><p class="muted s">O tema fica salvo no seu perfil e sincroniza entre aparelhos.</p></div><button class="theme-toggle" type="button" data-a="toggleTheme" aria-pressed="${S.theme === 'dark'}"><i data-lucide="${S.theme === 'dark' ? 'sun' : 'moon'}" aria-hidden="true"></i><span>${S.theme === 'dark' ? 'Usar tema claro' : 'Ativar tema noturno'}</span><span class="theme-state">${S.theme === 'dark' ? 'Noturno' : 'Claro'}</span></button></section>
    <section class="card">${f('sn', 'Seu nome', S.name)}${f('sh', 'Altura (m)', S.height, 'ex.: 1,76')}${f('sw', 'Peso inicial (kg)', S.wStart)}${f('sg', 'Peso meta (kg)', S.wGoal)}${f('sk', 'Meta de calorias por dia', S.kcal)}${f('swater', 'Meta diária de água (ml)', S.waterGoal, 'ex.: 2000')}<p class="muted s">Ajuste conforme sua rotina e orientação profissional; esta meta é apenas para acompanhamento.</p>${f('si', 'Intervalo entre doses (dias)', S.interval)}${f('sb', 'Dias sem repetir o mesmo local', S.block)}${f('sm', 'Medicação', S.medication)}<button class="btn" data-a="saveSet">Salvar ajustes</button></section>
    <section class="card"><b class="ct">Conta e dados</b><p class="muted s">Conectado: ${esc(user?.email || S.email)}. Seus dados sincronizam com a nuvem e só esta conta pode acessá-los.</p>
    <button class="btn soft" data-a="logout">Sair da conta</button>
    <button class="btn soft" data-a="export">Exportar meus dados</button><button class="btn soft out" data-a="wipe">Apagar todos os meus dados</button></section>`;
  }
};
const foodList = q => FOODS.map((f, i) => [f, i]).filter(([f]) => f[0].toLowerCase().includes(q.toLowerCase())).map(([f, i]) => `<button class="mrow" style="width:100%;text-align:left" data-a="food" data-v="${i}"><div>${esc(f[0])}<div class="muted s">${f[1]} kcal · P ${f[2]} · C ${f[3]} · G ${f[4]}</div></div><span class="plus" style="display:grid;place-items:center">＋</span></button>`).join('') || '<p class="muted">Nada encontrado.</p>';

function authView() {
  const configured = !!cloud;
  const content = !configured
    ? `<div class="auth-notice"><i data-lucide="shield-alert" aria-hidden="true"></i><div><b>Login ainda não configurado</b><p>Para liberar o app, conecte o Supabase. Enquanto isso, os registros permanecem bloqueados.</p></div></div>
      <a class="auth-help" href="README.md" target="_blank" rel="noopener">Ver instruções de configuração <i data-lucide="arrow-up-right" aria-hidden="true"></i></a>`
    : !authReady
      ? `<div class="auth-loading"><span class="auth-spinner"></span><p>Verificando sua conta...</p></div>`
      : authRecovery
        ? `<form class="auth-form" id="authForm"><label class="auth-label" for="authPassword">Nova senha</label>
            <input class="auth-input" id="authPassword" name="password" type="password" autocomplete="new-password" minlength="8" placeholder="Pelo menos 8 caracteres" required>
            <button class="btn auth-submit" type="submit">Salvar nova senha</button></form>`
        : `<div class="auth-tabs" role="tablist" aria-label="Acesso à conta">
            <button type="button" role="tab" aria-selected="${authMode === 'signin'}" class="${authMode === 'signin' ? 'active' : ''}" data-a="authMode" data-v="signin">Entrar</button>
            <button type="button" role="tab" aria-selected="${authMode === 'signup'}" class="${authMode === 'signup' ? 'active' : ''}" data-a="authMode" data-v="signup">Criar conta</button>
          </div>
          <form class="auth-form" id="authForm">
            <label class="auth-label" for="authEmail">E-mail</label>
            <input class="auth-input" id="authEmail" name="email" type="email" autocomplete="email" placeholder="voce@exemplo.com" required>
            <label class="auth-label" for="authPassword">Senha</label>
            <input class="auth-input" id="authPassword" name="password" type="password" autocomplete="${authMode === 'signup' ? 'new-password' : 'current-password'}" minlength="8" placeholder="Pelo menos 8 caracteres" required>
            ${authMode === 'signin' ? `<button type="button" class="auth-forgot" data-a="resetPassword">Esqueci minha senha</button>` : ''}
            <button class="btn auth-submit" type="submit">${authMode === 'signup' ? 'Criar minha conta' : 'Entrar com e-mail'}</button>
          </form>
          ${authMode === 'signup'
            ? `<p class="auth-signup-hint"><i data-lucide="mail-check" aria-hidden="true"></i> Enviaremos um link para confirmar seu e-mail antes do primeiro acesso.</p>`
            : ''}
          <div class="auth-divider"><span>ou</span></div>
          <button class="btn auth-google" data-a="login"><span class="google-mark" aria-hidden="true">G</span> Continuar com Google</button>`;
  return `<section class="auth-screen"><div class="auth-brand"><span class="auth-mark"><i data-lucide="heart-pulse" aria-hidden="true"></i></span><span>MEU CUIDADO</span></div>
    <div class="auth-card"><span class="auth-shield"><i data-lucide="lock-keyhole" aria-hidden="true"></i></span><p class="auth-eyebrow">SEU ESPAÇO PESSOAL</p>
    <h1>${authRecovery ? 'Defina uma nova senha' : authMode === 'signup' ? 'Crie sua conta' : 'Entre para continuar'}</h1><p class="muted auth-description">${authRecovery ? 'Escolha uma senha segura para sua conta.' : authMode === 'signup' ? 'Cadastre-se para começar a registrar e acompanhar seus dados.' : 'Entre para acessar e sincronizar seus registros pessoais.'}</p>${content}
    <p class="auth-privacy"><i data-lucide="shield-check" aria-hidden="true"></i> Seus dados ficam associados à sua conta e protegidos por regras de acesso.</p></div>
    <p class="auth-footnote">Meu Cuidado é um diário pessoal. Não substitui orientação médica ou nutricional.</p></section>`;
}

function render() {
  applyTheme();
  if (authRecovery) {
    $('#app').innerHTML = authView();
    $('#app').dataset.view = 'auth';
    replaceEmojis($('#app'));
    $('#tabs').hidden = true; $('#fab').hidden = true; $('#fab2').hidden = true; $('#sheet').hidden = true;
    return;
  }
  if (!cloud || !authReady || !user) {
    $('#app').innerHTML = authView();
    $('#app').dataset.view = 'auth';
    replaceEmojis($('#app'));
    $('#tabs').hidden = true; $('#fab').hidden = true; $('#fab2').hidden = true; $('#sheet').hidden = true;
    return;
  }
  const sc = !!screen;
  $('#app').innerHTML = sc ? SC[screen]() : TB[tab]();
  $('#app').dataset.view = screen || tab;
  replaceEmojis($('#app'));
  replaceEmojis($('#sheet'));
  $('#tabs').hidden = sc; $('#fab').hidden = sc || tab === 'nutri' || tab === 'comm'; $('#fab2').hidden = sc || tab !== 'nutri'; $('#sheet').hidden = true;
  document.querySelectorAll('#tabs button').forEach(b => b.classList.toggle('on', b.dataset.v === tab));
}
const go = (s, c = {}) => { screen = s; ctx = c; render(); scrollTo(0, 0) };
const home = t => { screen = null; if (t) tab = t; ctx = {}; render(); scrollTo(0, 0) };
const guess = () => { const h = new Date().getHours(), t = h < 10 ? 'cafe' : h < 14 ? 'almoco' : h < 18 ? 'lanches' : 'jantar'; return S.mealsOn.includes(t) ? t : S.mealsOn[0] };
function addMeal(m) { S.meals.push({ id: uid(), date: day, type: ctx.type, name: m.name, kcal: m.kcal || 0, p: m.p || 0, c: m.c || 0, g: m.g || 0, f: m.f || 0, img: m.img }); save(); home('nutri'); }
const ask = (q, ok) => { const v = prompt(q); if (v != null && v.trim()) ok(v.trim()) };

const A = {
  tab: v => home(v), back: () => home(), cancelApp: () => home(ctx.returnTab || 'home'), today: () => { day = ymd(new Date()); render() }, pick: v => { day = v; render() },
  fab: () => { $('#sheet').hidden = !$('#sheet').hidden }, settings: () => go('settings'), stats: () => go('stats'),
  toggleTheme() { S.theme = S.theme === 'dark' ? 'light' : 'dark'; save(); render() },
  newApp: () => go('app', { returnTab: tab }), closeStart: () => { S.closedStart = true; save(); render() },
  saveApp() {
    grab(); const F = ctx.f, at = new Date(F.at), dose = num(F.dose); if (isNaN(at) || !dose || dose <= 0) return alert('Informe a data e a dose.');
    if (!F.site) return alert('Escolha o local da aplicação.');
    const left = zoneLeft(F.site, at); if (left) return alert(`${zl(F.site)} está em descanso: livre em ${left} dia(s). Escolha outro local.`);
    S.medication = (F.med || '').trim() || S.medication;
    S.apps.push({ id: uid(), at: at.toISOString(), d: ymd(at), med: S.medication, dose, site: F.site, pain: +F.pain, notes: (F.notes || '').trim() });
    S.nextOverride = null; save(); home(tab === 'nutri' ? 'home' : tab);
  },
  sites() { grab(); ctx.sheet = true; ctx.pick = ctx.f.site; ctx.err = ''; render() },
  zone(v) { const left = zoneLeft(v, new Date(ctx.f.at)); if (left) ctx.err = `${zl(v)} em descanso: livre em ${left} dia${left > 1 ? 's' : ''}.`; else { ctx.pick = v; ctx.err = '' } render() },
  selSite() { if (!ctx.pick) return; ctx.f.site = ctx.pick; ctx.sheet = false; render() },
  closeSheet() { ctx.sheet = false; render() },
  chgNext() { const n = nextDate(); ask('Nova data e hora da próxima dose (AAAA-MM-DD HH:MM):', v => { const d = new Date(v.replace(' ', 'T')); if (isNaN(d)) return alert('Data inválida.'); S.nextOverride = d.toISOString(); save(); render() }) },
  delApp: v => { if (confirm('Excluir esta aplicação?')) { S.apps = S.apps.filter(a => a.id !== v); S.nextOverride = null; save(); render() } },
  addSym: () => ask('Como você está se sentindo? (ex.: náusea leve)', v => { S.symptoms.push({ id: uid(), at: new Date().toISOString(), txt: v }); save(); render() }),
  addBowel: () => { const v = prompt('Observação (opcional):'); if (v != null) { S.bowel.push({ id: uid(), at: new Date().toISOString(), txt: v.trim() || 'Evacuação registrada' }); save(); render() } },
  addWeight: () => ask('Peso atual (kg):', v => { const n = num(v); if (!n || n < 20 || n > 400) return alert('Peso inválido.'); if (!S.wStart) S.wStart = n; S.weights.push({ d: ymd(new Date()), kg: n }); save(); home('perfil') }),
  addMeasure: v => ask(`${v[0].toUpperCase() + v.slice(1)} (cm):`, x => { const n = num(x); if (!n) return alert('Valor inválido.'); S.measures[v].push({ d: ymd(new Date()), v: n }); save(); render() }),
  addPhoto: () => $('#pf').click(),
  delPhoto: () => { if (confirm('Excluir a última foto?')) { S.photos.pop(); save(); render() } },
  share: async () => { const d = { title: 'Doses', text: 'Acompanhe suas aplicações, refeições e progresso.', url: location.href }; try { navigator.share ? await navigator.share(d) : (await navigator.clipboard.writeText(location.href), alert('Link copiado.')) } catch (e) { } },
  mealFab: () => go('meal', { type: guess() }), addMeal: v => go('meal', { type: v }), mt: v => { ctx.mt = v; render() },
  mealPhoto: () => $('#mf').click(), describe: () => go('describe', { type: ctx.type }), search: () => go('search', { type: ctx.type }),
  filter: q => { $('#fl').innerHTML = foodList(q) }, food: v => { const f = FOODS[v]; addMeal({ name: f[0], kcal: f[1], p: f[2], c: f[3], g: f[4], f: f[5] }) },
  reuse: v => addMeal(ctx.list[v]),
  saveDesc() {
    const name = $('#dn').value.trim(); if (!name) return alert('Diga o que você comeu.');
    const m = { name, kcal: num($('#dk').value), p: num($('#dp').value), c: num($('#dc').value), g: num($('#dg').value), f: num($('#df').value) };
    if ($('#ds').checked) S.saved.push(m); addMeal(m);
  },
  delMeal: v => { if (confirm('Remover este item?')) { S.meals = S.meals.filter(m => m.id !== v); save(); render() } },
  waterAdd() {
    const date = ymd(new Date());
    S.waterByDay[date] = (Number(S.waterByDay[date]) || 0) + 250;
    save(); render();
  },
  waterUndo() {
    const date = ymd(new Date());
    S.waterByDay[date] = Math.max(0, (Number(S.waterByDay[date]) || 0) - 250);
    save(); render();
  },
  plan: () => go('plan', { plan: { meals: [...S.mealsOn], restrictions: [...(S.planPrefs?.restrictions || [])], avoids: [...(S.planPrefs?.avoids || [])], style: S.planPrefs?.style || 'varied', time: S.planPrefs?.time || 'any' }, planStep: 0 }),
  planChoice(v) {
    const step = Number(ctx.planStep) || 0, prefs = ctx.plan;
    if (step === 0) {
      prefs.meals = prefs.meals.includes(v) ? prefs.meals.filter(value => value !== v) : [...prefs.meals, v];
    } else if (step === 1 || step === 2) {
      const key = step === 1 ? 'restrictions' : 'avoids';
      prefs[key] = v === 'none' ? [] : prefs[key].includes(v) ? prefs[key].filter(value => value !== v) : [...prefs[key], v];
    } else if (step === 3) prefs.style = v;
    else prefs.time = v;
    render();
  },
  planNext() {
    if (Number(ctx.planStep) === 0 && !ctx.plan.meals.length) return notify('Escolha pelo menos uma refeição para continuar.');
    ctx.planStep = (Number(ctx.planStep) || 0) + 1;
    render();
  },
  planPrev() { ctx.planStep = Math.max(0, (Number(ctx.planStep) || 0) - 1); render(); },
  planGenerate() {
    if (!ctx.plan.meals.length) return notify('Escolha pelo menos uma refeição para gerar seu cardápio.');
    S.mealsOn = MEAL_OPTIONS.map(([id]) => id).filter(id => ctx.plan.meals.includes(id));
    S.planPrefs = { restrictions: [...ctx.plan.restrictions], avoids: [...ctx.plan.avoids], style: ctx.plan.style, time: ctx.plan.time };
    S.planResult = makePlan(S.mealsOn, S.planPrefs);
    S.planDone = true;
    save();
    go('generated');
  },
  generated() {
    if (!S.planResult?.length) { S.planResult = makePlan(S.mealsOn, S.planPrefs); save(); }
    go('generated');
  },
  editPlan: () => A.plan(),
  regeneratePlan() { S.planResult = makePlan(S.mealsOn, S.planPrefs, S.planResult); save(); render(); },
  logPlanMeal(v) {
    const recipe = RECIPES.find(entry => entry.id === S.planResult.find(item => item.type === v)?.id);
    if (!recipe) return notify('Não há uma sugestão para registrar. Ajuste suas preferências.');
    S.meals.push({ id: uid(), date: day, type: v, name: recipe.name, kcal: recipe.kcal, p: recipe.p, c: recipe.c, g: recipe.g, f: recipe.f });
    save(); home('nutri');
  },
  saveSet() {
    const k = num($('#sk').value) || S.kcal; let h = num($('#sh').value); if (h && h > 3) h /= 100;
    const waterGoal = num($('#swater').value);
    if (!waterGoal || waterGoal < 250 || waterGoal > 10000) return alert('Informe uma meta de água entre 250 e 10.000 ml.');
    Object.assign(S, { name: $('#sn').value.trim(), height: h, wStart: num($('#sw').value), wGoal: num($('#sg').value), kcal: k, waterGoal: Math.round(waterGoal), interval: Math.max(1, Math.min(60, Math.round(num($('#si').value) || 7))), block: Math.max(1, Math.min(365, Math.round(num($('#sb').value) || 30))), medication: $('#sm').value.trim() || S.medication });
    S.macros = { p: Math.round(k * .27 / 4), c: Math.round(k * .483 / 4), g: Math.round(k * .25 / 9), f: Math.round(k / 72) }; save(); home();
  },
  login: async () => {
    if (!cloud) return;
    try {
      const { error } = await cloud.auth.signInWithOAuth({ provider: 'google', options: { redirectTo: location.origin + location.pathname } });
      if (error) throw error;
    } catch (error) {
      console.error('Falha ao iniciar o login com Google.', error);
      notify('Não foi possível iniciar o login com Google. Confira a configuração do Supabase.');
    }
  },
  authMode: mode => { if (mode === 'signin' || mode === 'signup') { authMode = mode; render(); } },
  resetPassword: async () => {
    const email = $('#authEmail')?.value.trim();
    if (!email) return notify('Informe seu e-mail para receber o link de redefinição.');
    try {
      const { error } = await cloud.auth.resetPasswordForEmail(email, { redirectTo: location.origin + location.pathname });
      if (error) throw error;
      notify('Se este e-mail estiver cadastrado, você receberá um link para redefinir a senha.');
    } catch (error) {
      console.error('Falha ao solicitar redefinição de senha.', error);
      notify('Não foi possível solicitar a redefinição. Confira o e-mail e tente novamente.');
    }
  },
  logout: async () => {
    const { error } = await cloud.auth.signOut();
    if (error) { console.error('Falha ao sair da conta.', error); notify('Não foi possível sair da conta.'); }
  },
  export() { const a = document.createElement('a'); a.href = URL.createObjectURL(new Blob([JSON.stringify(S, null, 1)], { type: 'application/json' })); a.download = 'meus-dados.json'; a.click() },
  async wipe() {
    if (!confirm('Apagar TODOS os seus dados salvos neste perfil? Isso não pode ser desfeito.')) return;
    const e = S.email, n = S.name;
    S = Object.assign(def(), { email: e, name: n });
    persist();
    if (cloud && user && !(await push())) { home('home'); return; }
    home('home');
    notify(cloud && user ? 'Os dados deste perfil foram apagados.' : 'Os dados locais deste perfil foram apagados.');
  }
};
$('#app').addEventListener('submit', async e => {
  if (e.target.id !== 'authForm') return;
  e.preventDefault();
  if (!cloud || !authReady || (user && !authRecovery)) return;
  const form = new FormData(e.target), email = String(form.get('email') || '').trim(), password = String(form.get('password') || '');
  if (password.length < 8) return notify('A senha precisa ter pelo menos 8 caracteres.');
  const submit = e.target.querySelector('[type="submit"]');
  submit.disabled = true;
  try {
    if (authRecovery) {
      const { error } = await cloud.auth.updateUser({ password });
      if (error) throw error;
      authRecovery = false;
      authMode = 'signin';
      notify('Senha atualizada com sucesso.');
      render();
    } else if (authMode === 'signup') {
      const { data, error } = await cloud.auth.signUp({ email, password, options: { emailRedirectTo: location.origin + location.pathname } });
      if (error) throw error;
      if (!data.session) notify('Cadastro iniciado. Confira seu e-mail para confirmar a conta e entrar.');
    } else {
      const { error } = await cloud.auth.signInWithPassword({ email, password });
      if (error) throw error;
    }
  } catch (error) {
    console.error('Falha na autenticação por e-mail.', error);
    const message = String(error?.message || '').toLowerCase();
    const code = String(error?.code || '').toLowerCase();
    const status = Number(error?.status);
    notify(status === 429 || /rate.limit|over_email_send_rate_limit/.test(`${code} ${message}`) ? 'Muitos e-mails de confirmação foram solicitados. Aguarde um pouco e tente novamente.' :
      /invalid login credentials/.test(message) || code === 'invalid_credentials' ? 'E-mail ou senha incorretos.' :
      /already registered|already exists/.test(message) || /user_already_exists|user_already_registered/.test(code) ? 'Este e-mail já possui uma conta. Tente entrar.' :
      /email not confirmed/.test(message) || code === 'email_not_confirmed' ? 'Confirme seu e-mail antes de entrar. Confira também a caixa de spam.' :
      /weak password|password.*(short|length)/.test(message) || code === 'weak_password' ? 'A senha não atende aos requisitos do Supabase. Use uma senha mais longa.' :
      /invalid email|email.*invalid/.test(message) || code === 'email_address_invalid' ? 'O formato do e-mail não foi aceito. Confira o endereço e tente novamente.' :
      /signup.*disabled|signups not allowed/.test(message) || code === 'signup_disabled' ? 'O cadastro está desativado no Supabase. Ative “Allow new users to sign up” nas configurações de autenticação.' :
      /captcha/.test(`${code} ${message}`) ? 'O Supabase exige uma verificação anti-robô que ainda não está configurada no app.' :
      `Erro do Supabase${code ? ` (${code})` : status ? ` (HTTP ${status})` : ''}: ${error?.message || 'não foi possível autenticar'}`);
  } finally {
    if (submit.isConnected) submit.disabled = false;
  }
});
document.addEventListener('click', e => {
  const t = e.target.closest('[data-a]');
  if (!t) { if (!e.target.closest('#sheet,#fab')) $('#sheet').hidden = true; return; }
  if (t.dataset.a === 'login' && cloud && authReady && !user) { A.login(); return; }
  if (['authMode', 'resetPassword'].includes(t.dataset.a) && cloud && authReady && !user) { A[t.dataset.a](t.dataset.v); return; }
  if (!cloud || !authReady || !user) return;
  if (A[t.dataset.a]) A[t.dataset.a](t.dataset.v);
});
document.addEventListener('keydown', e => {
  if (e.key !== 'Enter' && e.key !== ' ') return;
  const t = e.target.closest('g.z-clickable[data-a="zone"]');
  if (t) { e.preventDefault(); t.click() }
});
document.addEventListener('pointerdown', e => {
  const handle = e.target.closest('[data-sheet-handle]');
  const sheet = document.querySelector('.bs');
  if (!handle || !sheet || e.button !== 0) return;
  sheetDrag = { id: e.pointerId, y: e.clientY, distance: 0, sheet };
  sheet.classList.add('is-dragging');
  handle.setPointerCapture(e.pointerId);
});
document.addEventListener('pointermove', e => {
  if (!sheetDrag || e.pointerId !== sheetDrag.id) return;
  const distance = Math.max(0, e.clientY - sheetDrag.y);
  sheetDrag.distance = distance;
  sheetDrag.sheet.style.transform = `translateY(${Math.min(distance, 220)}px)`;
});
function finishSheetDrag(e) {
  if (!sheetDrag || e.pointerId !== sheetDrag.id) return;
  const drag = sheetDrag;
  sheetDrag = null;
  drag.sheet.classList.remove('is-dragging');
  if (drag.distance >= 72) A.closeSheet();
  else drag.sheet.style.transform = '';
}
document.addEventListener('pointerup', finishSheetDrag);
document.addEventListener('pointercancel', finishSheetDrag);
$('#mf').onchange = async e => { const f = e.target.files[0]; e.target.value = ''; if (!f) return; const img = await shrink(f), name = prompt('Nome da refeição:'); if (!name) return; addMeal({ name, kcal: num(prompt('Calorias (kcal):')) || 0, img }) };
$('#pf').onchange = async e => { const f = e.target.files[0]; e.target.value = ''; if (!f) return; S.photos.push({ d: ymd(new Date()), img: await shrink(f, 600) }); save(); render() };

if (cloud) cloud.auth.onAuthStateChange((event, s) => {
  const nextUser = s?.user || null;
  const nextUserId = nextUser?.id || null;
  if (event === 'PASSWORD_RECOVERY') { authRecovery = true; authMode = 'update'; }
  if (event === 'SIGNED_OUT') { authRecovery = false; authMode = 'signin'; }
  authReady = true;
  if (nextUserId !== activeUserId) {
    user = nextUser;
    activeUserId = nextUserId;
    S = user ? loadStoredData(storageKey()) : def();
    screen = null; tab = 'home'; ctx = {};
    if (user) {
      S.email = user.email || '';
      if (!S.name) S.name = (user.user_metadata?.full_name || '').split(' ')[0];
      setTimeout(pull, 0);
    }
  } else user = nextUser;
  render();
});
render();
