/* Cada módulo tem exatamente 5 perguntas.
   q = pergunta, o = alternativas, a = índice da correta (começa em 0), e = explicação */
var MODS = [
 {id:1,t:"O que é um ataque de força bruta",sub:"Dicionário, híbrido, pivoting e o seu papel",qs:[
  {q:"Seu colega errou a senha duas vezes por digitação. Já é um ataque de força bruta?",
   o:["Não. Força bruta é uma ação automatizada e maliciosa, que testa milhares de combinações","Sim, qualquer erro de senha já é um ataque","Sim, se acontecer de manhã","Só se ele estiver usando o notebook da instituição"],
   a:0,e:"Errar a senha de vez em quando é super normal! A força bruta é outra coisa: é uma ação automatizada e maliciosa, que testa sistematicamente milhares de combinações até achar a senha."},
  {q:"Um programa tenta, uma por uma, as senhas mais comuns, como 123456, senha e admin. Que tipo de ataque é esse?",
   o:["Força bruta tradicional","Ataque de dicionário","Ataque híbrido","Pivoting"],
   a:1,e:"É o ataque de dicionário: uma lista pronta com as senhas mais comuns e palavras conhecidas."},
  {q:"E se o atacante pega uma palavra comum e acrescenta números e símbolos, como Senha2026! ou Admin#123?",
   o:["Ataque híbrido","Ataque offline","Varredura massiva","Rate limiting"],
   a:0,e:"Esse é o ataque híbrido: mistura palavras do dicionário com variações numéricas ou caracteres especiais. Trocar uma letra por símbolo não engana ninguém."},
  {q:"O atacante entrou numa conta comum e usa ela para tentar chegar a sistemas mais importantes. Como o guia chama isso?",
   o:["Rate limiting","Ponto de apoio (pivoting)","Hash de senha","Dupla etapa"],
   a:1,e:"No pivoting, uma conta simples comprometida vira trampolim para sistemas mais críticos. Por isso toda conta importa, mesmo a que parece \"sem poder nenhum\"."},
  {q:"Você percebeu um sinal estranho na sua conta. Qual é o seu papel, segundo o guia?",
   o:["Investigar por conta própria quem está atacando","Identificar o sinal e avisar rápido pelo canal correto; a investigação fica com a TI","Esperar para ver se passa sozinho","Comentar no grupo do setor"],
   a:1,e:"Você não precisa virar detetive. Seu papel é perceber o sinal (como notificações incomuns) e comunicar rápido. Investigar a causa é trabalho da equipe de TI."}
 ]},
 {id:2,t:"Online vs. Offline, Spraying e Stuffing",sub:"As modalidades de ataque e como elas funcionam",qs:[
  {q:"Num ataque ONLINE, as tentativas acontecem direto na tela de login. O que ajuda a se defender?",
   o:["Senhas longas guardadas no computador do atacante","Bloqueio temporário de conta, CAPTCHA e MFA","Reiniciar o computador","Desligar o Wi-Fi"],
   a:1,e:"Bloqueio temporário, CAPTCHA e autenticação multifator (MFA) fazem o ataque online perder força."},
  {q:"E no ataque OFFLINE? O que o atacante faz?",
   o:["Tenta senhas direto no servidor, em tempo real","Tem uma cópia criptografada do banco de senhas e tenta \"quebrá-la\" no próprio computador","Só ataca quando o computador está desligado","Espera você clicar em um link"],
   a:1,e:"Ele testa senhas sem falar com o servidor da instituição. Aqui o que protege são senhas longas e criptografia forte feita pela TI."},
  {q:"Qual modalidade o servidor da instituição consegue bloquear quando percebe muitas tentativas seguidas?",
   o:["O ataque online, porque acontece em tempo real no servidor","O ataque offline, porque acontece no computador do atacante","As duas, do mesmo jeito","Nenhuma"],
   a:0,e:"No ataque online o servidor está \"ao vivo\" e pode bloquear o atacante. No offline, o atacante testa senhas no próprio computador, sem interagir com o servidor."},
  {q:"Imagine um atacante que tenta a senha \"Mudar123\" em 1.000 contas diferentes, uma vez em cada. Como se chama isso?",
   o:["Credential stuffing","Password spraying","Ataque offline","Hash de senha"],
   a:1,e:"É o password spraying (\"pulverização de senhas\"). Como ele só tenta uma vez por conta, não dispara bloqueio. A moral: nada de senha fraca e comum tipo Mudar123."},
  {q:"A Ana usa a mesma senha na loja online e no sistema da instituição. A loja é invadida e as senhas vazam. O que pode acontecer?",
   o:["Nada, são sistemas diferentes","Os criminosos testam essa senha no sistema da instituição (credential stuffing)","A senha é trocada automaticamente","O antivírus resolve"],
   a:1,e:"Criminosos pegam listas de e-mails e senhas vazadas e testam em outros sistemas. Por isso a regra de ouro: nunca reutilize senhas institucionais!"}
 ]},
 {id:3,t:"Sinais de alerta e diagnóstico",sub:"Como saber se é erro seu ou ataque de verdade",qs:[
  {q:"O Pedro acordou e viu um monte de e-mails de \"tentativa de login malsucedida\" que chegaram de madrugada. Como interpretar?",
   o:["Problema comum no computador","Forte indício de tentativa de invasão na conta dele","Senha expirada","Não é nada, ignora"],
   a:1,e:"Se você estava dormindo e o sistema registrou várias tentativas, é forte indício de invasão. Hora de avisar a TI."},
  {q:"De repente, chega um código de MFA no seu celular, mas você não estava tentando entrar em nada. O que isso sugere?",
   o:["Alguém acertou sua senha e está parado na 2ª etapa","Seu celular está com defeito","Foi erro seu de digitação","Atualização do sistema"],
   a:0,e:"Sugere que alguém já acertou sua senha e só não passou porque travou na segunda etapa. Boa notícia: o MFA fez o trabalho dele! Má notícia: sua senha precisa ser trocada."},
  {q:"Sua senha parou de funcionar do nada e chegou um aviso \"Senha alterada com sucesso\", que você não fez. E agora?",
   o:["Deve ser erro do sistema, é só ignorar","Incidente provável: a conta pode ter sido comprometida","É só a senha que expirou","Reiniciar o computador resolve"],
   a:1,e:"Esse aviso sem você ter pedido é um alerta vermelho. Achar que é \"erro do sistema\" e ignorar é justamente uma das coisas que o guia pede para evitar."},
  {q:"Você errou a senha duas vezes e o sistema pediu para esperar 1 minuto. Precisa se preocupar?",
   o:["Sim, é sinal certo de ataque","Não, é normal: é o sistema se protegendo","Sim, é vazamento de dados","Sim, é vírus"],
   a:1,e:"Calma, respira. Isso é só o sistema fazendo o papel dele. Não é indício de ataque."},
  {q:"Bateu a dúvida: será que foi um deslize seu ou uma tentativa de ataque? O que o guia recomenda?",
   o:["Esperar para ver se acontece de novo","Notificar a TI mesmo assim","Pedir a senha de um colega para testar","Deixar para lá"],
   a:1,e:"Na dúvida, notifique! É sempre melhor um alerta desnecessário do que um ataque de verdade ignorado. Ninguém vai te julgar por avisar."}
 ]},
 {id:4,t:"Protocolo de resposta",sub:"O passo a passo para quando algo der errado",qs:[
  {q:"Você suspeita que a conta foi comprometida. Qual é a ordem certa do protocolo de resposta?",
   o:["Notificar → validar → trocar senha → registrar","Validação rápida → registro de evidências → notificação oficial → isolamento (alterar a senha)","Trocar a senha → apagar os e-mails → avisar os colegas → esperar","Registrar → divulgar no grupo → validar → notificar"],
   a:1,e:"A ordem é: 1) validação rápida, 2) registro de evidências, 3) notificação oficial à TI e 4) isolamento, alterando a senha para uma combinação forte e única, se ainda tiver acesso."},
  {q:"No primeiro passo (validação rápida), o que você deve verificar?",
   o:["Se os colegas também estão com o computador lento","Se recebeu e-mails oficiais de alerta de login ou se o problema afeta também o código MFA no celular","Se o antivírus está atualizado","Quem está atacando a instituição"],
   a:1,e:"A validação rápida é conferir se existem e-mails oficiais de alerta de login ou se o problema também aparece no código MFA do seu celular."},
  {q:"No segundo passo (registro de evidências), o que fazer?",
   o:["Apagar as mensagens suspeitas","Anotar a hora exata, tirar print da tela de erro ou do e-mail de notificação e guardar os registros","Encaminhar a mensagem para todos os colegas","Esperar o problema se repetir"],
   a:1,e:"Anote a hora exata e tire print. Esses registros ajudam muito a TI a entender o que aconteceu."},
  {q:"No terceiro passo (notificação oficial), como avisar a TI?",
   o:["Imediatamente, pelo canal oficial (chamado interno ou e-mail de emergência), enviando as evidências","Só no dia seguinte, com calma","Por um grupo de mensagens do setor","Pessoalmente, sem registrar nada"],
   a:0,e:"Acione a equipe de TI/Suporte imediatamente pelo canal oficial e já mande as evidências que você guardou."},
  {q:"Durante o incidente, qual destas atitudes é a que mais atrapalha?",
   o:["Anotar a hora exata do problema","Tirar print da tela de erro","Contar em grupos de mensagem que a instituição está \"sob ataque\"","Abrir chamado no canal oficial"],
   a:2,e:"Espalhar a notícia nos grupos gera pânico e atrapalha. O guia também pede para NÃO investigar por conta própria, NÃO compartilhar a nova senha com colegas e NÃO ignorar avisos de alteração de senha."}
 ]},
 {id:5,t:"Práticas de higiene digital",sub:"As regras de ouro para as suas senhas",qs:[
  {q:"Entre CafeComLeiteEmPalmas2026! e F1#x, qual senha é melhor segundo o guia?",
   o:["A F1#x, porque tem símbolos","A frase longa, porque tamanho é mais importante que complexidade","As duas são iguais","Nenhuma serve"],
   a:1,e:"Uma frase longa é mais difícil de descobrir e mais fácil de lembrar do que uma senha curta cheia de símbolos."},
  {q:"O que significa \"exclusividade absoluta\" nas regras de ouro?",
   o:["Usar a mesma senha em tudo, para não esquecer","Ter uma senha para a vida pessoal e outra totalmente diferente para o ambiente institucional","Trocar de senha toda semana","Usar o nome do setor como senha"],
   a:1,e:"Senha pessoal é uma, senha institucional é outra, totalmente diferente. Assim, um vazamento lá fora não abre a porta da instituição."},
  {q:"Por que ativar o MFA (dupla etapa) sempre que possível?",
   o:["Porque deixa o login mais rápido","Porque, mesmo que descubram sua senha, não conseguirão entrar sem a segunda validação","Porque dispensa o uso de senha","Porque evita vírus no computador"],
   a:1,e:"Com MFA, a senha sozinha não basta: ainda é preciso a validação pelo celular ou aplicativo."},
  {q:"Qual destas senhas está na lista dos padrões proibidos (muito vulneráveis)?",
   o:["Uma frase longa e exclusiva","joao1990 (nome próprio com ano)","Uma senha gerada por gerenciador homologado","Uma senha só para o ambiente institucional"],
   a:1,e:"Estão proibidas sequências numéricas (123456), termos óbvios (senha123, admin123), nome da cidade ou da instituição (palmas2026, uft2026) e nome próprio com ano (joao1990, maria2024)."},
  {q:"Onde é mais seguro guardar suas senhas?",
   o:["Em papeizinhos no monitor","Num bloco de notas no computador","Num gerenciador de senhas homologado","Numa mensagem para si mesmo no celular"],
   a:2,e:"Gerenciadores homologados guardam tudo protegido, e você só precisa lembrar de uma senha mestra forte."}
 ]},
 {id:6,t:"Glossário e perguntas frequentes",sub:"Módulos 6 e 6.1: termos e dúvidas comuns",qs:[
  {q:"O sistema limita a quantidade de tentativas de login por minuto. Como esse recurso se chama?",
   o:["CAPTCHA","Rate limiting","Hash de senha","MFA"],
   a:1,e:"Isso é rate limiting. O CAPTCHA é o teste visual (\"selecione as imagens com semáforo\"), e o hash é o código que guarda a senha de forma criptografada."},
  {q:"O que é o hash de senha?",
   o:["Um código gerado para armazenar a senha de forma criptografada no banco de dados","Um teste visual para barrar robôs","Uma segunda camada de segurança no celular","Uma lista de senhas vazadas"],
   a:0,e:"O hash é como a senha fica guardada de forma criptografada no banco de dados, e não em texto aberto."},
  {q:"Alguém tentou um ataque de força bruta na sua conta. Seus dados pessoais são roubados automaticamente?",
   o:["Sim, na hora","Não: a força bruta é só a tentativa de abrir a \"porta\". Com senha forte ou bloqueio ativo, o atacante não entra","Sim, mas só os do e-mail","Depende do antivírus"],
   a:1,e:"O ataque é a tentativa de abrir a porta. Se a senha for forte ou o sistema tiver bloqueio ativado, o atacante não consegue entrar e nenhum dado é roubado."},
  {q:"Meu antivírus está em dia. Ele impede um ataque de força bruta ao sistema da instituição?",
   o:["Sim, totalmente","Não diretamente: ele protege o seu computador, e o ataque acontece na página de login","Só se estiver atualizado","Só no modo offline"],
   a:1,e:"O antivírus cuida do seu computador contra programas maliciosos. O ataque acontece na página de login (rede/servidor). Sua melhor defesa é senha forte com MFA ativado."},
  {q:"Se um ataque acertar a senha de alguém, a pessoa pode ser responsabilizada?",
   o:["Sempre, sem exceção","Pode, se usou senha fraca, óbvia ou a compartilhou com terceiros","Nunca","Só se avisar a TI"],
   a:1,e:"Quem seguiu as boas práticas e avisou a TI ao perceber o problema agiu certo, como defensor do sistema. A responsabilização por negligência vem de senha fraca, óbvia ou compartilhada."}
 ]},
 {id:7,t:"Checklist rápido e avaliação",sub:"O que fazer em caso de suspeita e a fixação final",qs:[
  {q:"O que caracteriza um ataque de Password Spraying?",
   o:["Testar milhares de senhas contra uma única conta até bloqueá-la","Testar uma senha fraca e comum contra diversas contas diferentes","Enviar vírus anexado em e-mails em massa","Pedir a senha por telefone"],
   a:1,e:"É testar uma senha fraca e comum contra várias contas, justamente para não bloquear nenhuma delas."},
  {q:"Por que reutilizar a senha pessoal no e-mail corporativo é perigoso?",
   o:["Porque o computador fica mais lento","Porque, se um site externo vazar sua senha, atacantes poderão usá-la no sistema corporativo (credential stuffing)","Porque sobrecarrega a TI","Não há perigo algum"],
   a:1,e:"Essa é uma das questões de fixação do próprio guia. O vazamento em um site externo expõe também o seu acesso institucional."},
  {q:"Pelo checklist, depois de tirar print e anotar a hora exata, qual é o próximo passo?",
   o:["Esperar um dia para ver se passa","Notificar imediatamente a TI pelos kanals oficiais de chamado/suporte","Contar para os colegas","Apagar os prints"],
   a:1,e:"No checklist: perceber o sinal, confirmar que não foi esquecimento, registrar (print e hora) e notificar a TI imediatamente pelos canais oficiais."},
  {q:"Se você ainda tem acesso à conta suspeita, o checklist manda alterar a senha para:",
   o:["Uma frase longa e exclusiva","A mesma senha com um número a mais","A senha de um colega de confiança","Uma sequência fácil, para não esquecer"],
   a:0,e:"Altere para uma frase longa e exclusiva, sem compartilhar detalhes nem senhas com colegas de trabalho."},
  {q:"Segundo o fechamento do guia, qual é a sua contribuição mais valiosa?",
   o:["Ser especialista em tecnologia","Observar, registrar e comunicar corretamente","Investigar quem está atacando","Resolver o problema sozinho"],
   a:1,e:"Você não precisa ser especialista para fazer a diferença. Observar, registrar e comunicar corretamente já é a sua contribuição mais valiosa. 💙"}
 ]}
];

var OK_HEAD=["Isso aí! 🎉","Mandou bem! 👏","Acertou em cheio! ✅","Boa! Você pegou o espírito. 😄","Perfeito! 🙌","É isso mesmo! 💪"];
var BAD_HEAD=["Quase! Acontece. 😉","Opa, não foi dessa vez, mas vamos entender juntos. 🤝","Essa pega muita gente. 🙂","Sem problemas, olha só. 💡","Por pouco! Vem cá que eu explico. 😊"];

var $=function(i){return document.getElementById(i)};
function shuffle(a){for(var i=a.length-1;i>0;i--){var j=Math.floor(Math.random()*(i+1));var t=a[i];a[i]=a[j];a[j]=t;}return a;}
function pickOne(a){return a[Math.floor(Math.random()*a.length)]}

var who='', best={}, cur=null, order=[], idx=0, score=0, answered=false, log=[], seqMode=false;

function home(){
  ['game','round'].forEach(function(i){$(i).classList.add('hidden')});
  $('home').classList.remove('hidden');
  $('hello').classList.toggle('hidden', Object.keys(best).length>0);
  var done=Object.keys(best).length, tot=0, got=0;
  MODS.forEach(function(m){ if(best[m.id]!==undefined){tot+=5;got+=best[m.id];} });
  $('prog').textContent = done===0 ? 'Escolha um módulo para começar:' :
     (done===MODS.length ? 'Você completou os '+MODS.length+' módulos! Acertos nas melhores tentativas: '+got+' de '+tot+'. 🌟'
                         : 'Módulos concluídos: '+done+' de '+MODS.length+' · Acertos até agora: '+got+' de '+tot);
  $('pb').style.width=(done/MODS.length*100)+'%';
  var box=$('mods');box.innerHTML='';
  MODS.forEach(function(m,k){
    var b=document.createElement('button');b.type='button';
    b.className='mc'+(best[m.id]!==undefined?' done':'');
    b.style.animationDelay=(k*0.05)+'s';
    b.innerHTML='<div class="n"></div><div class="t"><b></b><span></span></div><div class="s"></div>';
    b.querySelector('.n').textContent=m.id;
    b.querySelector('b').textContent=m.t;
    b.querySelector('span').textContent=m.sub+' · 5 perguntas';
    b.querySelector('.s').textContent = best[m.id]!==undefined ? best[m.id]+'/5 ✓' : '—';
    b.onclick=function(){seqMode=false;startRound(m)};
    box.appendChild(b);
  });
  $('seq').textContent = done===0 ? '▶ Fazer todos em sequência' : '▶ Continuar em sequência';
}

function nextUndone(after){
  for(var i=0;i<MODS.length;i++){ var m=MODS[(after+i)%MODS.length]; if(best[m.id]===undefined) return m; }
  return null;
}

function startRound(m){
  who=($('nm').value||who||'').trim();
  cur=m; order=shuffle(m.qs.map(function(_,i){return i})); idx=0; score=0; log=[];
  $('home').classList.add('hidden');$('round').classList.add('hidden');$('game').classList.remove('hidden');
  window.scrollTo(0,0);
  render();
}

function render(){
  var item=cur.qs[order[idx]]; answered=false;
  $('num').textContent='Pergunta '+(idx+1)+' de 5';
  $('sc').textContent='Acertos: '+score;
  $('pb').style.width=(idx/5*100)+'%';
  $('mod').textContent='Módulo '+cur.id+' · '+cur.t;
  $('q').textContent=item.q;
  $('q').style.animation='none';void $('q').offsetWidth;$('q').style.animation='';
  var opts=shuffle(item.o.map(function(t,i){return {t:t,c:i===item.a}}));
  var box=$('opts');box.innerHTML='';
  opts.forEach(function(o,k){
    var b=document.createElement('button');b.className='opt';b.type='button';
    b.innerHTML='<b>'+'ABCD'[k]+'</b><span></span>';
    b.lastChild.textContent=o.t;
    b.onclick=function(){pick(b,o.c)};
    b.dataset.c=o.c?'1':'0';
    box.appendChild(b);
  });
  $('fb').className='fb';$('fb').innerHTML='';
  $('next').classList.add('hidden');
  $('next').textContent=(idx===4)?'Ver resultado do módulo':'Próxima';
}

function pick(btn,ok){
  if(answered)return;answered=true;
  var item=cur.qs[order[idx]];
  [].forEach.call($('opts').children,function(b){
    b.disabled=true;
    if(b.dataset.c==='1')b.classList.add('right');
  });
  if(ok){score++;}else{btn.classList.add('wrong');}
  $('sc').textContent='Acertos: '+score;
  var head=ok?pickOne(OK_HEAD):pickOne(BAD_HEAD);
  if(who&&Math.random()<0.4){head=who+', '+head.charAt(0).toLowerCase()+head.slice(1);}
  var fb=$('fb');fb.className='fb show'+(ok?'':' miss');
  fb.innerHTML='<div class="av">🛡️</div><div class="bub"><strong></strong><div class="why"></div><div class="src"></div></div>';
  fb.querySelector('strong').textContent=head;
  fb.querySelector('.why').textContent=item.e;
  fb.querySelector('.src').textContent='Quer rever? Está no Módulo '+(cur.id===6?'6 / 6.1':cur.id)+' do guia.';
  log.push({q:item.q,ok:ok,e:item.e});
  $('next').classList.remove('hidden');
  $('pb').style.width=((idx+1)/5*100)+'%';
}

function endRound(){
  $('game').classList.add('hidden');$('round').classList.remove('hidden');
  window.scrollTo(0,0);
  if(best[cur.id]===undefined || score>best[cur.id]) best[cur.id]=score;
  $('rmod').textContent='Módulo '+cur.id+' · '+cur.t;
  $('rscore').textContent=score+'/5';
  $('rstars').textContent='★'.repeat(score)+'☆'.repeat(5-score);
  var n=who?who+', ':'';
  var m;
  if(score===5) m=n+'gabaritou o módulo! 🎉 Dá gosto de ver. Que tal explicar esse assunto para um colega?';
  else if(score>=4) m=n+'muito bem! 👏 Quase tudo certo. Dá uma olhadinha no que escapou logo abaixo.';
  else if(score>=3) m=n+'bom caminho! 🙂 Você já pegou boa parte. Vale rever os pontos abaixo.';
  else m=n+'tudo bem, de verdade. 💙 Esse módulo pede uma releitura no guia, sem pressa. Depois é só tentar de novo.';
  $('rmsg').textContent=m;
  var rev=$('rrev');rev.innerHTML='';
  var wrong=log.filter(function(l){return !l.ok});
  if(wrong.length){
    var h=document.createElement('h3');h.textContent='Para dar uma revisadinha:';rev.appendChild(h);
    wrong.forEach(function(l){
      var d=document.createElement('div');d.textContent=l.q;
      var em=document.createElement('em');em.textContent=l.e;d.appendChild(em);
      rev.appendChild(d);
    });
  }
  var btns=$('rbtns');btns.innerHTML='';
  var nx=nextUndone(MODS.indexOf(cur)+1);
  function mk(txt,cls,fn){var b=document.createElement('button');b.type='button';b.className='btn'+(cls?' '+cls:'');b.textContent=txt;b.onclick=fn;btns.appendChild(b);}
  if(nx && nx!==cur){ mk('Próximo: Módulo '+nx.id+' →','',function(){startRound(nx)}); }
  mk('Refazer este módulo',nx&&nx!==cur?'ghost':'',function(){startRound(cur)});
  mk('Ver todos os módulos','ghost',home);
  $('pb').style.width='100%';
}

$('seq').onclick=function(){ seqMode=true; var m=nextUndone(0)||MODS[0]; startRound(m); };
$('next').onclick=function(){ if(idx===4){endRound();}else{idx++;render();} };
$('nm').addEventListener('input',function(){ who=$('nm').value.trim(); });
document.addEventListener('keydown',function(e){
  if($('game').classList.contains('hidden'))return;
  var k=e.key;
  if('1234'.indexOf(k)>-1&&!answered){var b=$('opts').children[+k-1];if(b)b.click();}
  else if((k==='Enter'||k==='ArrowRight')&&answered){$('next').click();}
});
home();