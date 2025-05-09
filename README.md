# GymTrack Pro

Análise e Desenvolvimento de sistemas

Eixo 3 - Projeto: Desenvolvimento de uma Aplicação Móvel em um Ambiente de Negócio - Turma 02 -

3° SEMESTRE/2025

O projeto em desenvolvimento é uma plataforma digital voltada para o acompanhamento de alunos na academia. Ao criar uma conta, o usuário tem acesso a uma área personalizada, onde pode visualizar demonstrações de exercícios em vídeo, além de receber sugestões de fichas de treino adaptadas aos seus objetivos e nível de condicionamento físico. A plataforma também oferece a possibilidade de acompanhar o progresso, registrar os treinos realizados e ajustar as recomendações de exercícios conforme a evolução do aluno, proporcionando uma experiência mais eficiente e orientada ao resultado.

Além disso, o sistema permite que o aluno interaja com planos de treino pré-definidos ou personalize seu próprio programa, com base em suas preferências e metas, como emagrecimento, ganho de massa muscular ou condicionamento geral. A plataforma visa facilitar o acesso a treinos bem estruturados e orientar os usuários de forma contínua, promovendo engajamento e melhores resultados na prática esportiva.
## Integrantes

* Álvaro Natali Kumaira da Fonseca
* Ana Carolina Alves de Sousa
* Beatriz Rodrigues Martins
* Eduardo Porto Botelho
* Thiago Vinicius Martins Murtinho
* Vitor de Paula Andrade
* João Gabriel Barrozo Rocha

## Orientador

* Udo Fritzke Junior

## Instruções de utilização

Assim que a primeira versão do sistema estiver disponível, deverá complementar com as instruções de utilização. Descreva como instalar eventuais dependências e como executar a aplicação.

# Documentação

<ol>
<li><a href="docs/01-Documentação de Contexto.md"> Documentação de Contexto</a></li>
<li><a href="docs/02-Especificação do Projeto.md"> Especificação do Projeto</a></li>
<li><a href="docs/03-Metodologia.md"> Metodologia</a></li>
<li><a href="docs/04-Projeto de Interface.md"> Projeto de Interface</a></li>
<li><a href="docs/05-Arquitetura da Solução.md"> Arquitetura da Solução</a></li>
<li><a href="docs/06-Template Padrão da Aplicação.md"> Template Padrão da Aplicação</a></li>
<li><a href="docs/07-Programação de Funcionalidades.md"> Programação de Funcionalidades</a></li>
<li><a href="docs/08-Plano de Testes de Software.md"> Plano de Testes de Software</a></li>
<li><a href="docs/09-Registro de Testes de Software.md"> Registro de Testes de Software</a></li>
<li><a href="docs/10-Plano de Testes de Usabilidade.md"> Plano de Testes de Usabilidade</a></li>
<li><a href="docs/11-Registro de Testes de Usabilidade.md"> Registro de Testes de Usabilidade</a></li>
<li><a href="docs/12-Apresentação do Projeto.md"> Apresentação do Projeto</a></li>
<li><a href="docs/13-Referências.md"> Referências</a></li>
</ol>

# Código

<li><a href="src/README.md"> Código Fonte</a></li>

# Apresentação

<li><a href="presentation/README.md"> Apresentação da solução</a></li>

## Como Rodar o Projeto Localmente

### Passo 1: Clonar o Repositório

Clone o repositório do projeto para sua máquina local:

```bash
git clone https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2025-1-e3-proj-mov-t2-gymtrack-pro.git
cd pmv-ads-2025-1-e3-proj-mov-t2-gymtrack-pro
```

### Como Instalar o Docker Desktop

#### Windows
1. Acesse o site oficial do Docker: [https://www.docker.com/products/docker-desktop](https://www.docker.com/products/docker-desktop).
2. Baixe o instalador para Windows.
3. Execute o instalador e siga as instruções na tela.
4. Após a instalação, reinicie o computador se solicitado.
5. Certifique-se de que o Docker Desktop está rodando e configurado corretamente.

#### Mac
1. Acesse o site oficial do Docker: [https://www.docker.com/products/docker-desktop](https://www.docker.com/products/docker-desktop).
2. Baixe o instalador para macOS.
3. Abra o arquivo `.dmg` baixado e arraste o ícone do Docker para a pasta `Applications`.
4. Inicie o Docker Desktop a partir da pasta `Applications`.
5. Siga as instruções para concluir a configuração inicial.

#### Linux
1. Abra o terminal e execute os seguintes comandos para instalar o Docker:

```bash
sudo apt update
sudo apt install docker.io
```

2. Para instalar o Docker Compose, execute:

```bash
sudo apt install docker-compose
```

3. Adicione seu usuário ao grupo `docker` para evitar usar `sudo` em cada comando:

```bash
sudo usermod -aG docker $USER
```

4. Reinicie o computador ou faça logout/login para aplicar as mudanças.
5. Verifique se o Docker está instalado corretamente:

```bash
docker --version
docker-compose --version
```

### Passo 2: Configurar o Banco de Dados

1. Certifique-se de que o Docker está instalado e rodando.
2. Suba o banco de dados com o comando:

```bash
docker-compose up -d
```

### Passo 3: Configurar Variáveis de Ambiente

Crie um arquivo `.env.local` na pasta `src/backend` com as seguintes variáveis:

```env
DATABASE_URL=postgres://postgres:password@localhost:5432/postgres
```

### Passo 4: Instalar Dependências

#### Backend (Next.js)

```bash
cd src/backend
npm install
```

#### Mobile (Expo)

```bash
cd ../mobile
npm install
```

### Passo 5: Configurar o Banco de Dados com Drizzle

1. Navegue até a pasta do backend:

```bash
cd ../backend
```

2. Execute o comando para aplicar as migrações:

```bash
npm run db:push
```

### Passo 6: Rodar o Backend

Para iniciar o servidor backend (Next.js):

```bash
npm run dev
```

O servidor estará disponível em [http://localhost:3000](http://localhost:3000).

### Passo 7: Rodar o Mobile

Para iniciar o aplicativo mobile (Expo):

1. Navegue até a pasta do mobile:

```bash
cd ../mobile
```

2. Inicie o Expo:

```bash
npm run start
```

3. Siga as instruções no terminal para abrir o aplicativo no emulador ou dispositivo físico.

### Passo 8: Importar o Swagger.json no Postman ou Insomnia

O projeto possui uma documentação da API no formato Swagger. Para importar no Postman ou Insomnia:

1. Certifique-se de que o backend está rodando (veja o Passo 6).
2. Acesse o arquivo `swagger.json` disponível no endpoint:

```
http://localhost:3000/api/docs/swagger
```

3. No Postman:
   - Abra o Postman.
   - Clique em **Import** no canto superior esquerdo.
   - Escolha a opção **Link** e cole o URL acima.
   - Clique em **Continue** e depois em **Import**.

4. No Insomnia:
   - Abra o Insomnia.
   - Clique em **Create** e escolha **Request Collection**.
   - Clique em **Import/Export** no canto superior direito.
   - Escolha **Import Data** > **From URL**.
   - Cole o URL acima e clique em **Fetch & Import**.

Agora você pode explorar e testar os endpoints da API diretamente no Postman ou Insomnia.
