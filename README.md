<h1 align = "center">Sing me a song</h1>

<div align="center">

  <h3></h3>


  <img src="https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white" height="30px"/>
  <img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" height="30px"/>
  <img src="https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white" height="30px"/> 
  <img src="https://img.shields.io/badge/Express.js-404D59?style=for-the-badge&logo=express.js&logoColor=white" height="30px"/>
  <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" height="30px"/>
  
  <!-- Badges source: https://dev.to/envoy_/150-badges-for-github-pnk -->
</div>


##  :clipboard: Descrição

Sing me a song simula um aplicativo de recomendação de músicas. 

***

## :computer:	 Funcionalidades

- Recomendar uma música; 
- Curtir e descurtir as recomendações;
- Na aba "top", mostra as músicas com maiores numeros de curtidas;
- Na aba "random", mostra uma recomendação aleatória

***


## 🏁 Rodando a aplicação

### 🏁 Clonando a aplicação


Primeiro, faça o clone desse repositório na sua maquina:

```
git clone git@github.com:geicybeatriz/sing-me-a-song.git
```

### 🏁 Rodando teste com cypress

No terminal da pasta back-end, rode os seguintes comandos:

```
npm install
npm run dev:test
```

No terminal da pasta front-end, rode os seguintes comandos:

```
npm install
npm run start
```

Abra outro terminal na pasta front-end e rode o seguinte comando:

```
npx cypress run
```

### 🏁 Rodando testes de integração

No terminal da pasta back-end, rode os seguintes comandos:

```
npm install
npm run test:int
```

### 🏁 Rodando testes unitários

No terminal da pasta back-end, rode os seguintes comandos:

```
npm install
npm run test:unit
```

<!-- Para testar com o ThunderClient, há um arquivo .json na raiz do projeto. Você pode importá-lo e executar. -->
<!-- :stop_sign: Não esqueça de repetir os passos acima com o [repositório](https://github.com/luanalessa/projeto-frontend.git) que contem a interface da aplicação, para testar o projeto por completo. -->
