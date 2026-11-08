# Meu Cuidado — registro pessoal

Aplicativo web estático para acompanhar aplicações, refeições e medidas. Não precisa de build. O acesso exige autenticação com Google e sincronização com Supabase.

## Executar e publicar

Para testar a interface, abra `index.html` em um navegador. O uso dos registros permanece bloqueado até configurar Supabase e login Google; não existe modo de uso sem conta.

### GitHub Pages

1. Crie um repositório no GitHub e envie `index.html`, `style.css`, `app.js` e `supabase.sql`.
2. No repositório, abra **Settings > Pages**.
3. Em **Build and deployment**, selecione **Deploy from a branch**, escolha `main` e `/ (root)`, e salve.
4. Acesse a URL indicada pelo GitHub Pages.

Netlify, Cloudflare Pages e outros hosts estáticos também podem publicar os mesmos arquivos, sem build. Configure a URL HTTPS do site como URL de redirecionamento do Supabase e do provedor Google.

## Login Google e sincronização

O primeiro acesso com Google cria automaticamente uma conta no Supabase; nos acessos seguintes, a mesma conta é autenticada. O app não permite abrir os registros sem login. Para ativar:

1. Crie um projeto Supabase e execute `supabase.sql` no **SQL Editor**.
2. No Google Cloud Console, crie um cliente OAuth do tipo Web. Adicione `https://SEU-PROJETO.supabase.co/auth/v1/callback` como URI de redirecionamento autorizado.
3. No Supabase, ative **Authentication > Providers > Google** e informe o Client ID e o Client Secret do Google.
4. Em **Authentication > URL Configuration**, configure a URL pública do app como **Site URL** e como URL de redirecionamento permitida.
5. Em **Project Settings > API**, copie a Project URL e a chave pública `anon` para `SUPABASE_URL` e `SUPABASE_ANON_KEY` no início de `app.js`.
6. Publique o site novamente. A tela inicial apresentará **Continuar com Google**; o visitante autoriza a conta e retorna ao app autenticado.

A chave `anon` é pública e pode ser incluída no navegador; ela **não** substitui as regras de acesso. Nunca coloque a chave `service_role` no front-end. A tabela usa RLS e só permite que uma conta autenticada leia e altere a linha cujo `user_id` corresponde à própria conta. Os dados de cada conta são salvos no navegador e sincronizados com a nuvem. Configure as URLs autorizadas corretamente antes de compartilhar o site.

## Repositório privado e site público

É possível manter o repositório privado e conectar o deploy a um serviço de hospedagem, como Cloudflare Pages, autorizando-o a acessar esse repositório. O app publicado pode continuar público para visitantes. Porém, como HTML, CSS e JavaScript são enviados ao navegador, visitantes podem inspecionar e salvar o código entregue ao cliente. Tornar o repositório privado restringe a leitura do repositório no GitHub, mas **não esconde o código do site publicado**. Não inclua segredos no front-end; para manter lógica privada, ela precisa ficar em um backend.

GitHub Pages publica arquivos estáticos e a disponibilidade para repositórios privados depende do plano/configuração GitHub. Se o objetivo é manter o repositório privado sem pagar por Pages, conecte o repositório privado a uma hospedagem com plano gratuito e acesso a repositórios privados. A página publicada deve ser considerada pública.

## Privacidade e limites

O app registra informações de saúde e não oferece orientação médica. Use apenas em um dispositivo confiável, proteja sua conta Google e não compartilhe o acesso ao navegador. RLS reduz o risco de uma conta acessar dados de outra, mas nenhum serviço conectado à internet pode prometer risco zero: a segurança também depende da configuração do Google/Supabase, da hospedagem, do dispositivo e da manutenção do código. Antes de disponibilizar publicamente, prepare aviso de privacidade e consentimento adequados à LGPD.

Fotos são reduzidas no navegador e salvas como parte dos dados do perfil; não são publicadas em URLs abertas. Como a sincronização usa uma linha JSON por usuário, monitore o limite de armazenamento do seu plano Supabase. No plano grátis, projetos podem ser pausados por inatividade e há limites de armazenamento; exporte os dados periodicamente e não trate esse plano como backup garantido. O app atualmente não agenda notificações quando está fechado.

## Recursos atuais

- Registro de aplicação, dose, local, dor e notas; acompanhamento da próxima data e rodízio dos locais.
- Registro de refeições, calorias e macros, acompanhamento diário de água e meta editável.
- Assistente de preferências que gera sugestões de refeições e permite registrá-las na aba Nutrição.
- Peso, medidas, fotos de progresso, exportação e exclusão dos dados do perfil.
- Interface responsiva com suporte a movimento reduzido.

O acompanhamento de água não envia notificações e depende de abrir o app para registrar o consumo. Lembretes com o app fechado, comunidade e armazenamento de fotos dedicado ainda não estão implementados. A meta inicial de água é um valor editável para acompanhamento, não uma recomendação médica.
