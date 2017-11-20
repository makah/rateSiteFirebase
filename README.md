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
4. Adicionar o login e dashboard - [commit]()
5. Para a utilizar o CanActivate para controlar o acesso ao dashboard - [Rangle.io](https://angular-2-training-book.rangle.io/handout/routing/route_guards.html) e [markgoho](https://github.com/angular/angularfire2/issues/282#issuecomment-304092627)
 

