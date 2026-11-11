'use strict';
const menu = document.querySelector('.menu');
const nav = document.getElementById('nav');
const mobile = matchMedia('(max-width: 850px)');
function setMenu(open) {
  menu.hidden = !mobile.matches;
  menu.setAttribute('aria-expanded', String(open));
  nav.classList.toggle('collapsed', mobile.matches && !open);
}
setMenu(false);
mobile.addEventListener('change', () => setMenu(false));
menu.addEventListener('click', () => setMenu(menu.getAttribute('aria-expanded') !== 'true'));

const states = {"RO":"Rondônia","AC":"Acre","AM":"Amazonas","RR":"Roraima","PA":"Pará","AP":"Amapá","TO":"Tocantins","MA":"Maranhão","PI":"Piauí","CE":"Ceará","RN":"Rio Grande do Norte","PB":"Paraíba","PE":"Pernambuco","AL":"Alagoas","SE":"Sergipe","BA":"Bahia","MG":"Minas Gerais","ES":"Espírito Santo","RJ":"Rio de Janeiro","SP":"São Paulo","PR":"Paraná","SC":"Santa Catarina","RS":"Rio Grande do Sul","MS":"Mato Grosso do Sul","MT":"Mato Grosso","GO":"Goiás","DF":"Distrito Federal"};
const plans = [{"name":"Start","price":899,"discount":"Sem desconto em serviços adicionais","scope":"100% online, sem captação.","copy":"Para manter a produção de conteúdo com uma operação totalmente remota."},{"name":"Plus","price":1497,"discount":"8% de desconto em serviços adicionais","scope":"Duas captações anuais, agendadas pela HW.","copy":"Para planejar a presença digital com produção presencial ao longo do ano."},{"name":"Pro","price":2497,"discount":"14% de desconto em serviços adicionais","scope":"Uma captação, com periodicidade a confirmar.","copy":"Para marcas que precisam integrar conteúdo e produção presencial."},{"name":"Premium","price":3997,"discount":"Até 20% de desconto em serviços adicionais","scope":"Uma captação com drone, com periodicidade a confirmar.","copy":"Para ampliar as possibilidades de produção, incluindo imagens aéreas."}];
const regions = {"MG":{"name":"Minas Gerais","extra":0,"label":"Cidades atendidas","cities":["Ribeirão das Neves","Belo Horizonte","Esmeraldas","Nova Lima","Sete Lagoas","Lagoa Santa","Vespasiano","Santa Luzia","Sabará","Ibirité","Pedro Leopoldo","Confins","Matozinhos"]},"ES":{"name":"Espírito Santo","extra":500,"label":"Grande Vitória","cities":["Vitória","Vila Velha","Serra","Cariacica","Viana","Guarapari","Fundão"]},"SP":{"name":"São Paulo","extra":500,"label":"Capital, rede ferroviária metropolitana e Cabreúva","cities":["São Paulo","Osasco","Carapicuíba","Barueri","Jandira","Itapevi","São Caetano do Sul","Santo André","Mauá","Ribeirão Pires","Rio Grande da Serra","Ferraz de Vasconcelos","Poá","Suzano","Mogi das Cruzes","Itaquaquecetuba","Guarulhos","Caieiras","Franco da Rocha","Francisco Morato","Campo Limpo Paulista","Várzea Paulista","Jundiaí","Cabreúva"],"note":"O Metrô atende a capital. Os demais municípios são referências de atendimento pela rede de trens metropolitanos e conexões regionais. A lista não indica estações de Metrô em todas as cidades."},"RJ":{"name":"Rio de Janeiro","extra":500,"label":"Atendimento na capital","cities":["Rio de Janeiro — RJ"]}};
const money = value => new Intl.NumberFormat('pt-BR',{style:'currency',currency:'BRL',maximumFractionDigits:0}).format(value);
function renderRegion(state) {
 const region = regions[state];
 return `<h2 id="state-name">${region.name}</h2><p class="city-count">+${region.cities.length} ${region.cities.length===1?'cidade atendida':'cidades atendidas'}</p><h3>${region.label}</h3><ul class="city-list">${region.cities.map(city=>'<li>'+city+'</li>').join('')}</ul>${region.note?'<p class="region-note">'+region.note+'</p>':''}<div class="regional-pricing"><h3>Planos na região</h3><p>${region.extra?'Acréscimo regional de R$ 500 por plano/mês, já incluído nos valores abaixo.':'Valores-base mensais para as cidades listadas.'}</p><ul class="regional-plans">${plans.map(plan=>`<li><a href="contato.html?estado=${state}&amp;plano=${plan.name}"><span>${plan.name}</span><strong>A partir de ${money(plan.price+region.extra)}<small>/mês ↗</small></strong></a></li>`).join('')}</ul><p class="region-note">Proposta sujeita à aprovação final dos sócios. Deslocamentos e outras taxas podem ser cobrados separadamente. O Start é 100% online, sem captação.</p></div><a id="state-link" href="contato.html?estado=${state}">Consultar atendimento ↗</a>`;
}
const mapButtons = document.querySelectorAll('[data-state]');
mapButtons.forEach(button => {
  button.addEventListener('click', () => {
    const state = button.dataset.state;
    mapButtons.forEach(item => item.setAttribute('aria-pressed', String(item === button)));
    document.getElementById('region-details').innerHTML = renderRegion(state);
  });
});

const redirect = document.getElementById('redirect');
if (redirect) {
  if (/^https?:$/.test(location.protocol)) redirect.value = new URL('sucesso.html', location.href).href;
  else redirect.disabled = true;
  const params = new URLSearchParams(location.search);
  const plan = params.get('plano');
  if (['Start','Plus','Pro','Premium'].includes(plan)) document.getElementById('plano').value = plan;
  const state = params.get('estado');
  if (Object.hasOwn(states, state)) document.getElementById('localidade').value = states[state];
}

const chat = document.createElement('aside');
chat.className = 'chat';
chat.setAttribute('aria-label', 'Assistente da HW');
chat.innerHTML = `<div class="invite" role="status" hidden><span>Precisa de ajuda?</span><button type="button" class="dismiss" aria-label="Dispensar convite">×</button></div>
<section class="chat-panel" id="chat-panel" aria-label="Perguntas frequentes" hidden>
<h2>Perguntas frequentes</h2><div class="faq-options"></div><p class="chat-answer" aria-live="polite">Selecione um assunto.</p><a href="contato.html">Falar com a HW ↗</a></section>
<button type="button" class="button chat-toggle" aria-controls="chat-panel" aria-expanded="false">Ajuda</button>`;
document.body.append(chat);
const panel = chat.querySelector('.chat-panel');
const invite = chat.querySelector('.invite');
const toggle = chat.querySelector('.chat-toggle');
const questions = {
  'Planos':'O Start é online e sem captação. O Plus tem duas captações anuais agendadas pela HW. Pro e Premium têm uma captação cada, com periodicidade a confirmar. O Premium inclui drone.',
  'Preços':'Valores mensais propostos a partir de R$ 899 no Start, R$ 1.497 no Plus, R$ 2.497 no Pro e R$ 3.997 no Premium. ES, RJ e SP têm acréscimo de R$ 500 por plano/mês. Valores e condições dependem da aprovação final dos sócios. Consulte a página Planos.',
  'Pagamento anual':'A contratação anual tem 15% de desconto. No Pix anual, são mais 5 pontos percentuais, totalizando 20%. Condições sujeitas à aprovação dos sócios.',
  'Agendamento':'Solicite data e horário conforme disponibilidade. A janela abre até 1 mês antes no Premium, 3 semanas no Pro, 2 semanas no Plus e 5 dias no Start, para reuniões online.',
  'Atendimento':'Consulte a página Onde atendemos para selecionar seu estado. Para captação, informe sua cidade e a data desejada.',
  'Contato':'Use o formulário ou o e-mail da página Contato. Os números de WhatsApp e telefone aguardam confirmação.'
};
Object.entries(questions).forEach(([question,answer]) => {
  const choice = document.createElement('button');
  choice.type = 'button';
  choice.textContent = question;
  choice.addEventListener('click', () => { chat.querySelector('.chat-answer').textContent = answer; });
  chat.querySelector('.faq-options').append(choice);
});
const invitationTimer = setTimeout(() => { if (panel.hidden) invite.hidden = false; }, 45000);
function setChat(open) {
  clearTimeout(invitationTimer);
  invite.hidden = true;
  panel.hidden = !open;
  toggle.setAttribute('aria-expanded', String(open));
  toggle.textContent = open ? 'Fechar ajuda' : 'Ajuda';
  if (open) panel.querySelector('button').focus();
  else toggle.focus();
}
toggle.addEventListener('click', () => setChat(panel.hidden));
chat.querySelector('.dismiss').addEventListener('click', () => {
  invite.hidden = true;
  toggle.focus();
});
chat.addEventListener('keydown', event => {
  if (event.key === 'Escape' && !panel.hidden) setChat(false);
});


mapButtons.forEach(button => {
  button.addEventListener('keydown', event => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      button.dispatchEvent(new Event('click'));
    }
  });
});
document.querySelectorAll('.video-play').forEach(button => {
  button.hidden = false;
  button.addEventListener('click', () => {
    const video = document.createElement('iframe');
    video.src = 'https://www.youtube-nocookie.com/embed/3toyc5TNcxc?start=25&autoplay=1';
    video.title = 'Vídeo de referência da HW no YouTube';
    video.allow = 'autoplay; encrypted-media; picture-in-picture; fullscreen';
    video.allowFullscreen = true;
    button.replaceWith(video);
    video.focus();
  });
});


const brazilSelect = document.getElementById('brazil-state-select');
if (brazilSelect) {
  const statesOnMap = [...document.querySelectorAll('[data-br-state]')];
  const stateName = document.getElementById('brazil-state-name');
  const stateCopy = document.getElementById('brazil-state-copy');
  const stateLink = document.getElementById('brazil-state-link');
  function showBrazilState(code) {
    const selected = statesOnMap.find(item => item.dataset.brState === code);
    statesOnMap.forEach(item => item.setAttribute('aria-pressed', String(item === selected)));
    brazilSelect.value = code;
    if (!selected) {
      stateName.textContent = '45 cidades no Sudeste';
      stateCopy.textContent = 'Explore o mapa ou selecione um estado para ver as condições de atendimento.';
      stateLink.href = 'onde-atendemos.html';
      stateLink.textContent = 'Ver cobertura no Sudeste ↗';
      return;
    }
    const cities = Number(selected.dataset.cities);
    stateName.textContent = selected.dataset.name;
    stateCopy.textContent = cities
      ? 'Atendemos ' + cities + (cities === 1 ? ' cidade.' : ' cidades.') + ' Consulte a aba Onde atendemos para ver cidades e planos.'
      : 'Atendemos mediante orçamento. Informe sua cidade e conte o que você precisa produzir.';
    stateLink.href = cities ? 'onde-atendemos.html?estado=' + code : 'contato.html?estado=' + code;
    stateLink.textContent = cities ? 'Ver cidades e planos ↗' : 'Solicitar orçamento ↗';
  }
  brazilSelect.addEventListener('change', () => showBrazilState(brazilSelect.value));
  statesOnMap.forEach(item => {
    item.addEventListener('click', () => showBrazilState(item.dataset.brState));
    item.addEventListener('keydown', event => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        showBrazilState(item.dataset.brState);
      }
    });
  });
}

const requestedState = new URLSearchParams(location.search).get('estado');
if (requestedState) {
  [...mapButtons].find(item => item.dataset.state === requestedState)?.dispatchEvent(new Event('click'));
}

