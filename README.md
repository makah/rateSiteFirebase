# angular2-firabase-auth
Primeiro teste com angular2 e firebase.
Vou usar como base o meu [primeiro projeto Sails](https://github.com/makah/sails-rateSite).

#### Fase 1 ####
1. Criar um projeto no [Cloud9](https://c9.io/)
2. Criar projeto no [Firebase](https://console.firebase.google.com/)
3. Instalar [Angular CLI](https://angular.io/tutorial/toh-pt0)
3.1. Para rodar legal coloquei `ng serve --host 0.0.0.0 --port 8080 --live-reload-port 8081 --public-host=http://myProject.c9users.io/`
4. Primeiro Commit

#### Fase 2 ####
1. Copiar as páginas do projeto anterior, são elas: home; signin; login; dashboard (private area) - [commit](https://github.com/makah/angular2-firabase-auth/commit/5a0062ce64a2d3ebb3459e0c8f690f930290c21a).
    1.1. editar o `app.component.html` com as informações da home
    1.1. `ng generate component` ...
    1.2. Adicionar o route module via CLI [tutorial](https://angular.io/tutorial/toh-pt5)
2. Adicionar o projeto Firebase que criei - [tutorial](https://github.com/rhroyston/firebase-auth) - [commit]()
    2.1. Adicionar dependências no `app.modules.ts`
    2.2. Criar um serviço `ng generate service services/auth` onde ficara a comunicação com o firebase.
3. Adicionar o signup - [commit](https://github.com/makah/angular2-firabase-auth/commit/e222077fa14e2568a56479ffaceec6cc86147883)
4. Adicionar o login e dashboard - [commit](https://github.com/makah/rateSiteFirebase/commit/90fd7366cf40cb1775f9709848218d3c999cbbc4)
    4.1. Para a utilizar o CanActivate para controlar o acesso ao dashboard - [Rangle.io](https://angular-2-training-book.rangle.io/handout/routing/route_guards.html) e [markgoho](https://github.com/angular/angularfire2/issues/282#issuecomment-304092627)

#### Fase 3 ####
1. Cria a tabela Users. Primeira informação no database - [commit](https://github.com/makah/rateSiteFirebase/commit/6e00b74400a3c2ef0457ba57855c03d552195e5e)
2. Utiliza o Firedatabase Store e Location - [commit](https://github.com/makah/rateSiteFirebase/commit/52414c9f6c16b44c5cabde603047515d7b05ba2d)
    2.1. Criei interfaces para organizar e validar as informações do Store e Location (classes em `module`)
    2.2. Criei um serviço para organizar as chamadas de store e ocultar as redundâncias [guia](https://firebase.google.com/docs/database/web/structure-data). Como `Location` só faz sentido com o `Store`, utilizei o [multi-location update](https://firebase.googleblog.com/2015/09/introducing-multi-location-updates-and_86.html) (atômico).
    2.3. Criei a página new-store com uma loja hardcoded
3. Cria a página de SearchComponent - [commit](https://github.com/makah/rateSiteFirebase/commit/e5c89a8889db32351943586c69a99c0a47991e4e)
    3.1. Utiliza a leitura do Firebase via valuechanges().
    3.2. Para recplicar o once() do Firebase no AngularFire2 basta utilizar o método do Observable `take(1)`. Exemplo `this.searchObservable.take(1).subscribe(stores => this.stores = stores;);`
4. Cria a página da loja - [commit](https://github.com/makah/rateSiteFirebase/commit/7a9cc456d5c4b8c631c502408a18611ecd94a298) e [commit](https://github.com/makah/rateSiteFirebase/commit/e46030f4d8977cd2f19f294d1c83946ea474b198)
5. Cria o conceito de review e adiciona na pagina da loja.
    5.1 Cria a primeira página, com o Create Review e list Review - [commit](https://github.com/makah/rateSiteFirebase/commit/6db5c00b3dde34ff3a71023f0e72860b5fbfcef0)
    5.2 Para recuperar o nome do usuário no comentário é necessário desnormalizar a tabela seguinto o [tutorial](https://firebase.googleblog.com/2013/04/denormalizing-your-data-is-normal.html). Tive o mesmo dilema da [pergunta do stackoverflow](https://stackoverflow.com/questions/43830610/how-to-denormalize-normalize-data-structure-for-firebase-realtime-database) e [esta](https://stackoverflow.com/questions/30693785/how-to-write-denormalized-data-in-firebase) - [commit]()
        5.2.1 Para isso eu adicionei o nome do usuário em cada 'review'.
        5.2.2 Preferi utilizar o 'Cloud Functions' para testar essa funcionalidade
        5.2.3 Criei uma chamada para trocar o nome do usuário para testar a consistência
    5.3 Fazer paginação dos comentários de trás para frente utilizando o .once()/take(1) para a tela não ser atualizada enquanto o cliente está lendo [tutorial](https://angularfirebase.com/lessons/infinite-scroll-firestore-angular/) - [commit]()
