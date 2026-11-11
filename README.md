# HW Marketing & Audiovisual

Site estático em HTML, CSS e JavaScript. As nove páginas ficam na raiz do pacote. A pasta assets contém o estilo, os comportamentos e a imagem ilustrativa de capa. O site funciona em subpastas de repositórios do GitHub Pages.

## Publicar no GitHub Pages

1. Extraia o ZIP e envie o conteúdo extraído para a raiz da branch main do repositório. Confira se index.html, .nojekyll e a pasta assets estão no mesmo nível.
2. No repositório, abra Settings → Pages. Em Source, selecione Deploy from a branch. Escolha main e /(root), depois salve.
3. Após a publicação, abra a URL informada em Settings → Pages e confira a navegação.

Documentação: https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site

## Ativar e testar o FormSubmit

1. Abra contato.html pela URL publicada. Preencha o formulário com dados de teste, marque o consentimento e envie. Complete o reCAPTCHA se ele aparecer.
2. Abra socialmiguelalmeidabr@gmail.com e siga o link de ativação enviado pelo FormSubmit. Confira o spam se necessário.
3. Envie uma nova mensagem de teste pela URL publicada. Confira se ela chegou à caixa de entrada, se Responder aponta para o endereço preenchido e se o navegador abriu sucesso.html.
4. Tente enviar com e-mail inválido ou sem consentimento. O navegador deve impedir o envio.
5. Para mudar a caixa, atualize a URL action em contato.html e os endereços exibidos em contato.html e privacidade.html. Repita a ativação e o teste. Se desejar usar o identificador fornecido na ativação, substitua o e-mail no action pelo identificador.

O POST é feito diretamente ao FormSubmit, com reCAPTCHA padrão e campo antispam _honey. O JavaScript calcula o endereço absoluto de sucesso.html com base na URL atual. O site não possui banco de dados próprio.

Documentação: https://formsubmit.co/documentation

## Testar a navegação

- Abra index.html para inspecionar o site localmente. Use a URL publicada para testar o envio real.
- Teste os quatro botões do mapa. O estado deve aparecer no painel e chegar preenchido ao formulário.
- Teste o botão de cada plano. A seleção deve chegar preenchida ao formulário.
- Em uma página recém-aberta, aguarde 45 segundos sem abrir Ajuda. Confira o convite, as respostas e o link para Contato.
- Em uma tela estreita, abra o menu e percorra as páginas. Confira também navegação por Tab e foco visível.
- Confira o destino de cada perfil social. Os links usam o identificador @hw.audiovisual informado.
- Confirme com a HW os dois números antes de criar links de WhatsApp e chamada. Edite contato.html e a resposta Contato em assets/site.js quando houver confirmação.
- Atualize o portfólio quando houver peças autorizadas para publicação. Confirme a periodicidade de Pro e Premium antes de acrescentá-la ao site.

## Mapa e vídeo

- Os contornos dos estados são da API de Malhas do IBGE, incorporados ao HTML. O mapa funciona sem consultar a API em tempo real. Selecione os estados com clique, toque ou Tab seguido de Enter ou Espaço.
- O vídeo de referência está no Início e em Quem somos. O player é carregado ao selecionar Reproduzir vídeo e começa aos 25 segundos. O link direto também está disponível.
- Fonte do mapa: https://servicodados.ibge.gov.br/api/docs/malhas?versao=3

## Valores e cobertura

- Os valores publicados são propostas mensais para avaliação interna, sujeitos à aprovação final dos sócios.
- Em Minas Gerais, o mapa mostra os valores-base. Em Espírito Santo, Rio de Janeiro e São Paulo, soma R$ 500 por mês a cada plano, inclusive o Start.
- Para revisar os preços, atualize os cartões em planos.html, os dados e a resposta de preços em assets/site.js e o painel inicial de Minas Gerais em onde-atendemos.html.
- Teste cada estado no mapa. Os totais esperados são 13 cidades em MG, 7 em ES, 24 em SP e 1 em RJ. Os links de preço devem preencher o plano e o estado no formulário.

## Mapa do Brasil, agenda e vídeos

- A Home inclui mapa do Brasil com as 27 UFs. Teste o Sudeste e um estado fora do Sudeste. O primeiro leva à cobertura detalhada com a UF selecionada. O segundo leva ao formulário com a UF preenchida.
- Na página Quem somos, a grade tem seis espaços 16:9. Um usa o vídeo de referência. Cinco aguardam os links definitivos.
- A oferta anual usa 15% de desconto e mais 5 pontos percentuais com Pix, totalizando 20% sobre 12 mensalidades. Valide a interpretação antes de publicar.
- A janela do Start vale para reuniões online. Os demais agendamentos dependem do escopo contratado e da disponibilidade da equipe.
