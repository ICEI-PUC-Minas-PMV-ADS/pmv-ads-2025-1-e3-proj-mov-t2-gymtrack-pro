
# Metodologia

<span style="color:red">Pré-requisitos: <a href="2-Especificação do Projeto.md"> Documentação de Especificação</a></span>

O grupo adotou a metodologia ágil Scrum para organizar o desenvolvimento do projeto, com sprints semanais e divisão clara de tarefas entre os membros. A equipe utiliza o recurso GitHub Projects para gerenciar as atividades, acompanhar o andamento do projeto e visualizar o status de cada tarefa em um quadro Kanban. A comunicação é feita principalmente pelo WhatsApp, para trocas rápidas, e pelo Microsoft Teams, usado para reuniões e organização mais estruturada. O código-fonte é armazenado e versionado no GitHub, permitindo o controle de alterações e a colaboração entre os integrantes. Foram definidos três ambientes principais: desenvolvimento, homologação e produção, garantindo uma estrutura organizada e segura para testes, validações e publicação da aplicação. Essa abordagem permite que o time trabalhe de forma colaborativa, ágil e com foco na entrega contínua de valor.

## Relação de Ambientes de Trabalho

| Ambiente            | Plataforma        | Link de Acesso                       |
|---------------------|-------------------|--------------------------------------|
| Desenvolvimento     |                   |              -------                 |
| Homologação         |                   |              -------                 |
| Produção            |                   |              -------                 |
| Repositório Git     | GitHub            |https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2025-1-e3-proj-mov-t2-gymtrack-pro|
| Desenvolvimento Móvel |                 |              -------                 |
| Testes              |                   |              -------                 |
| API Backend         |                   |              -------                 |

## Controle de Versão

A ferramenta de controle de versão adotada no projeto foi o
[Git](https://git-scm.com/), sendo que o [Github](https://github.com)
foi utilizado para hospedagem do repositório.

O projeto segue a seguinte convenção para o nome de branches:

- `main`: versão estável já testada do software
- `unstable`: versão já testada do software, porém instável
- `testing`: versão em testes do software
- `dev`: versão de desenvolvimento do software

Quanto à gerência de issues, o projeto adota a seguinte convenção para
etiquetas:

- `documentation`: melhorias ou acréscimos à documentação
- `bug`: uma funcionalidade encontra-se com problemas
- `enhancement`: uma funcionalidade precisa ser melhorada
- `feature`: uma nova funcionalidade precisa ser introduzida

Discuta como a configuração do projeto foi feita na ferramenta de versionamento escolhida. Exponha como a gerência de tags, merges, commits e branchs é realizada. Discuta como a gerência de issues foi realizada.

> **Links Úteis**:
> - [Microfundamento: Gerência de Configuração](https://pucminas.instructure.com/courses/87878/)
> - [Tutorial GitHub](https://guides.github.com/activities/hello-world/)
> - [Git e Github](https://www.youtube.com/playlist?list=PLHz_AreHm4dm7ZULPAmadvNhH6vk9oNZA)
>  - [Comparando fluxos de trabalho](https://www.atlassian.com/br/git/tutorials/comparing-workflows)
> - [Understanding the GitHub flow](https://guides.github.com/introduction/flow/)
> - [The gitflow workflow - in less than 5 mins](https://www.youtube.com/watch?v=1SXpE08hvGs)

## Gerenciamento de Projeto

### Divisão de Papéis

- Scrum Master: Responsável por facilitar as cerimônias Scrum, remover impedimentos e garantir que a equipe siga as práticas ágeis.
   >***Eduardo Porto Botelho***</br>

- Product Owner: Responsável pela definição e priorização dos requisitos do produto, garantindo que a equipe esteja sempre focada nas necessidades do cliente.
  >***Thiago Vinícius Martins Murtinho***</br>
  >***Eduardo Porto Botelho***</br>

- Equipe de Desenvolvimento: Responsável por implementar e testar o código, desenvolver as funcionalidades, realizar correções e entregar as soluções. No estágio atual do projeto, o desenvolvimento está focado em React Native.
   >***Álvaro Natali Kumaira da Fonseca</br>
   Vitor de Paula Andrade***</br>
   >***Thiago Vinícius Martins Murtinho***</br>

- Equipe de Design: Responsável pela criação da interface gráfica, experiência do usuário (UX) e elementos visuais do aplicativo. No momento, a equipe está desenvolvendo o design da página inicial.</br>
   >***Ana Carolina Alves de Sousa </br>
   >Beatriz Rodrigues Martins***</br>
   >***João Gabriel Barrozo Rocha***</br>

### Processo

O grupo está utilizando a metodologia ágil Scrum para organizar o desenvolvimento do projeto. As atividades são divididas em sprints semanais, com definição de tarefas e acompanhamento do progresso ao longo do tempo. Para gerenciar essas tarefas e monitorar o andamento do projeto, está sendo utilizado o recurso GitHub Projects, que permite organizar as atividades em um quadro Kanban. Dessa forma, é possível visualizar facilmente o status de cada tarefa, facilitar a comunicação entre os membros da equipe e manter o controle do desenvolvimento da solução de forma centralizada.
![image](https://github.com/user-attachments/assets/91b863a7-2f14-4d02-b0ff-8a41623cf9b2)

### Ferramentas

| Categoria               | Ferramenta         | Justificativa                                                               |
|------------------------|--------------------|-----------------------------------------------------------------------------|
| Editor de Código        | Visual Studio Code | Integração com Git, leve, extensível e amplamente utilizado                |
| Controle de Versão      | GitHub             | Armazenamento do código, versionamento e colaboração entre a equipe        |
| Comunicação             | WhatsApp           | Comunicação rápida e prática no dia a dia                                  |
| Comunicação             | Microsoft Teams    | Organização de reuniões e arquivos, integração com ferramentas da Microsoft|
| Desenho de Tela         | Figma              | Ferramenta online e colaborativa, ideal para wireframes e protótipos       |
| Diagramas               | Lucidchart         | Criação de diagramas de forma visual e intuitiva, ideal para documentação   |
