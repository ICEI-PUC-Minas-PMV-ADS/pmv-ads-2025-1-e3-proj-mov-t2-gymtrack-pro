
# Metodologia

O grupo adotou a metodologia ágil Scrum para organizar o desenvolvimento do projeto, com sprints semanais e divisão clara de tarefas entre os membros. A equipe utiliza o recurso GitHub Projects para gerenciar as atividades, acompanhar o andamento do projeto e visualizar o status de cada tarefa em um quadro Kanban. A comunicação é feita principalmente pelo WhatsApp, para trocas rápidas, e pelo Microsoft Teams, usado para reuniões e organização mais estruturada. O código-fonte é armazenado e versionado no GitHub, permitindo o controle de alterações e a colaboração entre os integrantes. Foram definidos três ambientes principais: desenvolvimento, homologação e produção, garantindo uma estrutura organizada e segura para testes, validações e publicação da aplicação. Essa abordagem permite que o time trabalhe de forma colaborativa, ágil e com foco na entrega contínua de valor.

## Relação de Ambientes de Trabalho

| AMBIENTE | PLATAFORMA | LINK DE ACESSO | DESCRIÇÃO
|------------|---------------| ----------- |--------------- |
| Repositório de Código | GitHub | [Repositorio do projeto](https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2025-1-e3-proj-mov-t2-gymtrack-pro) | Hospedagem do código fonte do projeto, com versionamento e controle de branches. |
| Gestão de Tarefas | GitHub | [Quadro Kanban](https://github.com/orgs/ICEI-PUC-Minas-PMV-ADS/projects/1968/views/1) | Quadro Kanban para organização das tarefas do projeto. |
| Comunicação | Discord | [Canal de Comunicação](https://discord.com/channels/1159300798967201855/1159300799537631334) | Comunicação da equipe em canais específicos para discussões técnicas e gerais. |
| Design de Interfaces | Figma |[Projeto do Figma](https://www.figma.com/design/KewUNUxrZ0W4zBahBr3R6U/vitor.andrade.1497790-s-team-library?node-id=0-1&p=f&t=kATT6cUnB6ttBX2T-0) | Prototipagem e design das interfaces do aplicativo móvel. |
| Hospedagem | --- | [Hospedagem do Projeto]() |Hospedagem do backend e frontend projeto, além do Banco de Dados. |
|Banco de Dados| --- | [Banco de Dados]() | Banco de dados em tempo real e autenticação para aplicativos móveis. |
| Desenvolvimento Mobile | Expo | [Dev Mobile]() | IDE para desenvolvimento de aplicativos, com emuladores e ferramentas de debug. |
## Controle de Versão

A ferramenta de controle de versão adotada no projeto foi o
[Git](https://git-scm.com/), sendo que o [Github](https://github.com)
foi utilizado para hospedagem do repositório.

O projeto segue a seguinte convenção para o nome de branches:

- `main`: versão estável já testada do software e em produção.
- `staging`: versão já testada do software, porém instável mas indicara para release.
- `develop`: versão de desenvolvimento do software
- `fetura/*`: branch de trabalho do desenvolvedor sobre uma funcionalidade.

Quanto à gerência de issues, o projeto adota a seguinte convenção para
etiquetas:

- `documentation`: melhorias ou acréscimos à documentação;
- `bug`: uma funcionalidade encontra-se com problemas;
- `enhancement`: uma funcionalidade precisa ser melhorada;
- `feature`: uma nova funcionalidade precisa ser introduzida;
- `Design`: Criação do modelo feito no figma;
- `Help Wanted`: Sinalização de um problema que exige maior atenção por parte dos 
membros do grupo;
- `Question`: Requisição de mais informações para que a tarefa possa ser concluída;
- `Figma`: telas do site/esboços;
- `Tests`: testes das páginas feitas;
- `Wontfix`: não será trabalhado.


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

Com o objetivo de tornar o processo mais eficiente e organizado, decidimos utilizar o GitHub como ferramenta para distribuir e acompanhar as tarefas entre os membros do grupo. As atividades foram categorizadas da seguinte forma: Backlog: Representa todas as tarefas que precisam ser realizadas ao longo do desenvolvimento do projeto;

Ready: Tarefas que foram selecionadas do backlog e estão prontas para serem desenvolvidas durante a sprint;

In Progress: Tarefas que já estão em desenvolvimento pela equipe;

In Review: Tarefas finalizadas que estão em processo de revisão, aguardando validação ou feedback;

Correction: Tarefas que passaram pela revisão e precisam de ajustes ou correções antes de serem concluídas;

Done: Tarefas totalmente finalizadas, revisadas e aprovadas, prontas para entrega ou já implementadas.

O quadro Kanban desenvolvido pelo grupo pode ser acessado clicando [aqui](https://github.com/orgs/ICEI-PUC-Minas-PMV-ADS/projects/1968/views/1). Abaixo, é possível ver uma representação dele.

 ![Captura_de_tela_de_2025-05-09_20-09-33](https://github.com/user-attachments/assets/c464d794-6ed2-431a-87b6-2bee1509ab89)




O grupo está adotando a metodologia ágil Scrum para organizar o desenvolvimento do projeto. As atividades são distribuídas em sprints semanais, com definição clara de tarefas e acompanhamento contínuo do progresso. Para o gerenciamento dessas tarefas e o monitoramento do andamento do projeto, está sendo utilizado o recurso GitHub Projects, estruturado em um quadro Kanban.

Essa abordagem permite visualizar facilmente o status de cada atividade, facilita a comunicação entre os membros da equipe e centraliza o controle sobre o desenvolvimento da solução.

| Semana       | Atividades Realizadas na Etapa 3                                                                                                                                                                                                                                                                          | Responsável      |
|--------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|------------------|
| 9ª semana    | - Programação de funcionalidades<br>- Criação do modelo físico do banco de dados<br>- Criação de scripts SQL de DML<br>- Desenvolvimento das funcionalidades das telas principais                                                                                                                         | Thiago, Álvaro e João        |
| 10ª semana   | - Continuação da programação de funcionalidades<br>- Implementação dos CRUDs<br>- Implementação do sistema de autenticação<br>- Aplicação de padrões de projeto na codificação<br>- Evidências de implementação das funcionalidades de CRUD e autenticação                                    |  Thiago, Álvaro e João        |
| 11ª semana   | - Continuação da programação de funcionalidades<br>- Melhorias nos CRUDs e autenticação<br>- Adoção de padrões de projeto<br>- Registro de evidências de implementação<br>- Atualização do quadro visual de gestão de trabalho<br>- Status atual das contribuições e comentários individuais |  Vitor, Beatriz, Ana e Eduardo        |
| 12ª semana   | - Finalização da programação de funcionalidades<br>- Evidências consolidadas de CRUDs e autenticação<br>- Atualização do quadro visual de gestão de trabalho e participação do time<br>- Elaboração dos planos de testes de funcionalidades e usabilidade<br>- Início dos testes registrados     |  Vitor, Beatriz, Ana e Eduardo        |
| 13ª semana   | Planos de testes de funcionalidades e usabilidade<br>- Registros completos dos testes realizados nas funcionalidades principais e na experiência de uso                                                                                                                       |  Vitor, Beatriz, Ana e Eduardo        |


### Ferramentas

As ferramentas utilizadas ao longo do projeto são:

- Editor de código;
- Ferramentas de comunicação;
- Ferramentas de design;
- Ferramentas de diagramação.

A escolha do editor de código foi motivada pelo impacto direto no controle de versionamento do projeto, garantindo rastreabilidade e organização no desenvolvimento. Além disso, o uso de ferramentas de comunicação, tanto para troca de mensagens instantâneas quanto para reuniões diárias, tornou-se essencial para promover a integração e o alinhamento entre os membros da equipe. Para a etapa de design, ferramentas específicas foram utilizadas na prototipação inicial da solução, permitindo a edição simultânea por um ou mais integrantes, o que favoreceu a colaboração e agilidade no processo criativo. Por fim, uma ferramenta de diagramação foi selecionada para mapear as necessidades do produto, proporcionando uma visão clara e estruturada do que está sendo desenvolvido. 

| CATEGORIA | FERRAMENTA | JUSTIFICATIVA | 
|------------|---------------| ----------- |
| Editor de Código | VS Code | Escolhido por ser um editor leve, altamente personalizável e com suporte a extensões que aumentam a produtividade, como integração com Git, depuração e linting. |
| Editor de código | Expo | Utilizado para desenvolvimento de aplicações mobile com React Native, oferecendo um ambiente de desenvolvimento simplificado, com hot reloading e acesso a APIs nativas sem necessidade de configuração complexa. |
| Comunicação| Discord, WhatsApp, Microsoft Teams | Facilidade de uso e colaboração em tempo real. |
| Controle de Versão | Git e Github | Padrão da indústria e facilidade de colaboração. |
| Wireframing | Figma | Colaboração em tempo real e recursos avançados de prototipagem. |
| Diagrama | Lucid app | Escolhido por ser uma ferramenta de diagramação colaborativa em tempo real, com uma interface intuitiva e suporte a diversos tipos de diagramas (fluxogramas, wireframes, UML, etc.). |
| Diagrama | Merma Id | Utilizado para criação de diagramas diretamente em arquivos Markdown, permitindo versionamento junto com o código e integração em documentações técnicas. |
