# Meu Cuidado — registro pessoal

Aplicativo web estático para acompanhar aplicações, refeições e medidas. Não precisa de build. O acesso exige autenticação por e-mail/senha ou Google e sincronização com Supabase.

## Executar e publicar

Repositório público: [imatheusbueno/saude-com-monju](https://github.com/imatheusbueno/saude-com-monju). Site: [https://imatheusbueno.github.io/saude-com-monju/](https://imatheusbueno.github.io/saude-com-monju/).

O site já está publicado e conectado ao Supabase. O cadastro por e-mail/senha está disponível após a publicação da versão mais recente; o login Google ainda depende da configuração do OAuth. Para testar apenas a interface, abra `index.html` em um navegador.

### GitHub Pages

1. No repositório, abra **Settings > Pages**.
2. Em **Build and deployment**, selecione **Deploy from a branch**, escolha `main` e `/ (root)`, e salve.
3. O endereço público é `https://imatheusbueno.github.io/saude-com-monju/`.

Netlify, Cloudflare Pages e outros hosts estáticos também podem publicar os mesmos arquivos, sem build. Configure a URL HTTPS do site como URL de redirecionamento do Supabase e do provedor Google.

## Cadastro, login e sincronização

O app oferece cadastro e login com e-mail e senha, redefinição de senha por e-mail e login opcional com Google. Todos os métodos autenticam no Supabase e os registros só abrem após a autenticação. O projeto Supabase já está conectado, com tabela, RLS e URLs de retorno configuradas.

1. A tabela `public.user_data` tem RLS habilitado e uma policy que permite acesso apenas à linha do usuário autenticado.
2. O Supabase usa `https://imatheusbueno.github.io/saude-com-monju/` como URL do app e URL permitida de retorno para login e confirmação por e-mail.
3. O provedor Email está ativo e a confirmação de e-mail é exigida antes do primeiro login.
4. `app.js` contém a URL do projeto e a chave pública **publishable**, destinada ao navegador. Não substitua por `service_role` ou outra chave secreta.
5. Após a publicação, o usuário poderá criar uma conta por e-mail e senha e confirmar o endereço recebido por e-mail.

### Ativar Google OAuth (opcional)

1. No Google Cloud Console, crie ou selecione um projeto e configure a **OAuth consent screen** com as informações do app. Para testes em modo **Testing**, inclua os e-mails de teste; a publicação para qualquer pessoa pode exigir validação do Google.
2. Crie um **OAuth Client ID** do tipo **Web application**. Em **Authorized JavaScript origins**, informe somente `https://imatheusbueno.github.io` (sem `/saude-com-monju/` no final). Em **Authorized redirect URIs**, adicione `https://cprvwstvlqdmuusabina.supabase.co/auth/v1/callback`.
3. Copie o Client ID e o Client Secret do Google para **Supabase > Authentication > Providers > Google** e habilite o provedor.
4. Salve a configuração e teste o botão **Continuar com Google** no site publicado.

O login Google ainda depende da configuração do OAuth Client ID/Secret no Google Cloud e no Supabase. Client Secret do Google só deve ser informado no painel Supabase, nunca no código, GitHub ou chat.

### Erro ao criar conta: limite de e-mail

Se o Supabase responder `email rate limit exceeded` (HTTP 429), ele bloqueou temporariamente o envio de mensagens de confirmação após muitas tentativas. Aguarde o limite ser liberado antes de tentar novamente e evite clicar várias vezes em **Criar conta**. O SMTP padrão do Supabase tem limite baixo; para uso público, configure um provedor SMTP próprio nas configurações de autenticação do Supabase. Nunca coloque credenciais SMTP no front-end.

A chave `publishable` é pública e pode ser incluída no navegador; ela **não** substitui as regras de acesso. Nunca coloque a chave `secret`/`service_role` no front-end. A tabela usa RLS e só permite que uma conta autenticada leia e altere a linha cujo `user_id` corresponde à própria conta. Os dados de cada conta são salvos no navegador e sincronizados com a nuvem. Configure as URLs autorizadas corretamente antes de compartilhar o site.

## Código público e site público

Este projeto usa um repositório público para publicar gratuitamente no GitHub Pages. Visitantes podem ler o código no GitHub e inspecionar o HTML, CSS e JavaScript enviados ao navegador. Não inclua segredos no front-end; para manter lógica privada, ela precisa ficar em um backend.

O app publicado não revela a chave `service_role` nem segredos do Google, que devem permanecer nos painéis dos respectivos serviços. A página e o repositório devem ser considerados públicos.

## Privacidade e limites

O app registra informações de saúde e não oferece orientação médica. Use apenas em um dispositivo confiável, proteja sua conta Google e não compartilhe o acesso ao navegador. RLS reduz o risco de uma conta acessar dados de outra, mas nenhum serviço conectado à internet pode prometer risco zero: a segurança também depende da configuração do Google/Supabase, da hospedagem, do dispositivo e da manutenção do código. Antes de disponibilizar publicamente, prepare aviso de privacidade e consentimento adequados à LGPD.

Fotos são reduzidas no navegador e salvas como parte dos dados do perfil; não são publicadas em URLs abertas. Como a sincronização usa uma linha JSON por usuário, monitore o limite de armazenamento do seu plano Supabase. No plano grátis, projetos podem ser pausados por inatividade e há limites de armazenamento; exporte os dados periodicamente e não trate esse plano como backup garantido. O app atualmente não agenda notificações quando está fechado.

## Recursos atuais

- Registro de aplicação, dose, local, dor e notas; acompanhamento da próxima data e rodízio dos locais.
- Registro de refeições, calorias e macros, acompanhamento diário de água e meta editável.
- Assistente de preferências que gera sugestões de refeições e permite registrá-las na aba Nutrição.
- Peso, medidas, fotos de progresso, exportação e exclusão dos dados do perfil.
- Interface responsiva com suporte a movimento reduzido.
- Tema noturno preto e azul, selecionável em Ajustes e salvo junto ao perfil para sincronizar entre aparelhos.
- No topo das abas principais, puxe para baixo para sincronizar os dados; no mapa de aplicação, arraste a alça do painel para baixo para fechá-lo sem atualizar a página.
- Ícone dedicado para a tela inicial do iPhone (`apple-touch-icon.png`) e favicon (`icon.svg`). Para adicionar, abra o site no Safari, toque em **Compartilhar > Adicionar à Tela de Início**.

O acompanhamento de água não envia notificações e depende de abrir o app para registrar o consumo. Lembretes com o app fechado, comunidade e armazenamento de fotos dedicado ainda não estão implementados. A meta inicial de água é um valor editável para acompanhamento, não uma recomendação médica.
