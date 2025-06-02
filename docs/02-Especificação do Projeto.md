# Especificações do Projeto

| Perfis de Administrador | Perfil de Cliente |
|-------------------------|--------------------|
| Usuário responsável pelo gerenciamento e abastecimento do site. | Usuário que irá utilizar o conteúdo e a interface como consumidor.|
| Abastecer a página inicial com informações de notícias atualizadas, verificadas e que promovam interesse pela plataforma. | Ter acesso ao seu perfil próprio, onde consiga visualizar e programar suas rotinas de treino de forma centralizada e intuitiva. |

## Personas

| **João - Gerente de Academia** | ![João - Gerente de Academia](https://github.com/user-attachments/assets/20545550-4d50-443e-8fb4-31708ee3d0f5) |
|-------------------------------|------------------------------------------------------------|
| **Idade:**                     | 35 anos                                                    |
| **Ocupação:**                  | Gerente de Academia                                         |
| **Necessidades:**              | Sistema simples e eficiente para gerenciar cadastros e documentos dos alunos. |
| **Frustrações:**               | Processos manuais e perda de dados em sistemas desatualizados. |
| **Hobbies:**                   | Natação, futebol                                            |

| **Maria - Aluna**              | ![Maria - Aluna](https://github.com/user-attachments/assets/568ce894-ec57-4fb9-b986-c90249a38b9d)  |
|-------------------------------|------------------------------------------------------------|
| **Idade:**                     | 28 anos                                                    |
| **Ocupação:**                  | Aluna                                                      |
| **Necessidades:**              | Acessar facilmente suas informações de cadastro e planos.  |
| **Frustrações:**               | Dificuldade em acessar informações sobre seu plano de treino e pagamentos. |
| **Hobbies:**                   | Correr, yoga                                                |

| **Carlos - Proprietário de Academia** | ![Carlos - Proprietário de Academia](https://github.com/user-attachments/assets/c29c537c-a421-4882-af78-3205e380e914) |
|--------------------------------------|-------------------------------------------------------------|
| **Idade:**                          | 45 anos                                                     |
| **Ocupação:**                       | Proprietário de Academia                                    |
| **Necessidades:**                   | Sistema eficiente para controlar planos, pagamentos e cadastros de alunos. |
| **Frustrações:**                    | Falta de uma solução integrada para gerenciar a academia.   |
| **Hobbies:**                        | Golfe, leitura de livros de gestão                          |

| **Juliana - Aluna Iniciante**       | ![Juliana - Aluna Iniciante](https://github.com/user-attachments/assets/a8a9bf23-ce19-4993-b4dd-9a2cbd970cde)  |
|-------------------------------------|-------------------------------------------------------------|
| **Idade:**                          | 22 anos                                                     |
| **Ocupação:**                       | Aluna                                                       |
| **Necessidades:**                   | Acesso fácil ao seu progresso, planos e sugestões de treino.|
| **Frustrações:**                    | Dificuldade em entender seu plano de treino e acompanhar seu progresso. |
| **Hobbies:**                        | Dança, caminhada                                             |

| **Ricardo - Recepcionista de Academia** | ![Ricardo - Recepcionista](https://github.com/user-attachments/assets/7cadd68c-f62e-4bf9-98e6-1a25ac8cda8c) |
|----------------------------------------|-------------------------------------------------------------|
| **Idade:**                             | 30 anos                                                     |
| **Ocupação:**                          | Recepcionista de Academia                                   |
| **Necessidades:**                      | Sistema rápido para registrar novos membros e organizar planos e pagamentos. |
| **Frustrações:**                       | Falta de um sistema centralizado, causando lentidão no atendimento. |
| **Hobbies:**                           | Cinema, culinária                                            |
                   

## Histórias de Usuários

| **EU COMO...** `Aluna`                  | **QUERO/PRECISO** acessar facilmente minhas informações de cadastro e plano de treino | **PARA** poder acompanhar meu progresso e garantir que estou seguindo corretamente as orientações |
|-----------------------------------------|----------------------------------------------------------------------------------------|---------------------------------------------------------------------------------------------------|
| **EU COMO...** `Aluna`                  | **QUERO/PRECISO** consultar o seu plano atual.                      | **PARA** ter controle financeiro e saber quando precisar renovar.                                  |
| **EU COMO...** `Gerente de Academia`    | **QUERO/PRECISO** adicionar e atualizar os cadastros de novos alunos.                    | **PARA** manter as informações da academia sempre atualizadas.                                   |
| **EU COMO...** `Proprietário de Academia` | **QUERO/PRECISO** ver relatórios de desempenho financeiro da academia.                  | **PARA** poder tomar decisões estratégicas para melhorar os lucros e serviços oferecidos.          |
| **EU COMO...** `Proprietário de Academia` | **QUERO/PRECISO** editar planos de treino e serviços oferecidos.                        | **PARA** personalizar conforme as necessidades da academia.                                       |
| **EU COMO...** `Recepcionista de Academia` | **QUERO/PRECISO** registrar novos membros rapidamente.                                  | **PARA** facilitar o processo de matrícula.                                                         |
| **EU COMO...** `Recepcionista de Academia` | **QUERO/PRECISO** acessar rapidamente o planos dos alunos.          | **PARA** fornecer um atendimento mais eficiente.                                                   |

## Modelagem do Processo de Negócio 

### Análise da Situação Atual

Problemas Identificados:

  Métodos Manuais ou Obsoletos:
  Muitas academias utilizam anotações em papel ou sistemas desatualizados para gerenciar o cadastro dos usuários e de atividades, o que dificulta o controle e a atualização dos dados.
  
  Organização e Acessibilidade dos Dados:
  A ausência de um sistema integrado resulta em informações dispersas, dificultando o acesso rápido e seguro tanto para a administração quanto para os alunos.
  
  Atrasos no Atendimento:
  Processos manuais podem causar lentidão no cadastro e atualização de informações, impactando negativamente a experiência dos usuários.
  
  Riscos de Erros e Falhas:
  A manipulação manual dos dados aumenta a possibilidade de erros, como cadastros duplicados ou informações incorretas, comprometendo a eficiência da gestão.

### Descrição Geral da Proposta

Resumo da Proposta:

  O projeto propõe o desenvolvimento de um aplicativo móvel para academias que visa modernizar e otimizar a gestão dos cadastros de usuários e de treinos executados pelos alunos. A ferramenta será voltada tanto para a administração (que terá um sistema seguro para armazenamento e gerenciamento dos dados) quanto para os alunos (que terão acesso fácil e intuitivo às suas informações e seus treinos).

Limites e Conexões com a Estratégia de Negócio:

  Limites:
  O sistema focará inicialmente na gestão de cadastros e atualização de informações do usuário e de seus treinos. Funcionalidades extras, como agendamento de aulas ou controle de pagamentos, poderão ser implementadas em fases posteriores, de acordo com a evolução e as necessidades do negócio.

Estratégia e Objetivos:

Objetivo Principal: Resolver os desafios atuais na gestão das academias, proporcionando agilidade e segurança para a academia e seus usuários.

Objetivos Específicos:

  Implementar um sistema que centralize os dados dos usuários.
  
  Desenvolver uma interface intuitiva que facilite a visualização e a interatividade dos alunos.
  
Oportunidades de Melhoria:

  Automatização dos Processos:
  Eliminar etapas manuais por meio da automação, reduzindo erros e aumentando a eficiência.
  
  Acesso em Tempo Real:
  Permitir que tanto a administração quanto os alunos tenham acesso instantâneo às informações, promovendo uma experiência mais dinâmica e interativa.
  
  Segurança dos Dados:
  Implantar práticas de segurança modernas para proteger os dados sensíveis dos usuários, garantindo conformidade com as melhores práticas e legislações vigentes.

### Processo 1 – Cadastro e Gestão de Usuários

Nome do Processo: Cadastro e Gestão de Usuários

Oportunidades de Melhoria Identificadas:

  Centralização de Dados:
  Transição de sistemas manuais ou desconexos para uma base única e integrada.
  
  Automação do Fluxo de Cadastro:
  Implementar etapas automatizadas que reduzam a intervenção manual e, consequentemente, erros e atrasos.
  
  Interface Amigável e Responsiva:
  Desenvolver uma interface intuitiva para que os usuários possam atualizar suas informações de forma autônoma e segura.

  ![image](https://github.com/user-attachments/assets/c0f9dd89-c6e3-4c0c-b46d-fe7f028d4ad0)


### Processo 2 – Acesso e Atualização da Ficha de Treino

Nome do Processo: Acesso e Atualização da Ficha de Treino

Oportunidades de Melhoria:

  Atualização em Tempo Real:
  Permitir que o profissional acompanhe e atualize as informações dos treinos conforme a evolução dos alunos, garantindo maior precisão nos dados.
  
  Comunicação Direta:
  Facilitar a interação entre o profissional e o aluno, possibilitando feedbacks e ajustes rápidos no plano de treino.
  
  Gestão unificada do usuário:
  Vincular a ficha de treino com o cadastro dos usuários, centralizando informações e facilitando a gestão geral da academia.

  ![image](https://github.com/user-attachments/assets/eb9c1c5a-fa88-42de-908c-dccbc4ebe618)


## Indicadores de Desempenho

| Nº | INDICADOR                          | OBJETIVOS                                                | DESCRIÇÃO                                                                 | CÁLCULO                                                                            | FONTE DE DADOS                               | PERSPECTIVA  |
|----|------------------------------------|----------------------------------------------------------|---------------------------------------------------------------------------|------------------------------------------------------------------------------------|------------------------------------------------|--------------|
| 1  | TEMPO MÉDIO PARA CADASTRO          | Reduzir o tempo gasto no processo de cadastramento       | Tempo médio que um funcionário leva para cadastrar um aluno               | Tempo total para cadastro manual / digital ÷ nº de cadastros                      | Observação direta e testes no sistema         | Processo     |
| 2  | ECONOMIA OPERACIONAL               | Avaliar o impacto do sistema na redução de custos        | Compara o custo do processo manual com o custo do processo digital        | (Custo manual - Custo digital) / Custo manual × 100                               | Relatórios financeiros e operacionais         | Negócios     |
| 3  | TAXA DE SATISFAÇÃO DO USUÁRIO      | Medir a satisfação dos alunos com o sistema              | Percentual de alunos satisfeitos com o uso do sistema                     | Nº de alunos satisfeitos / Nº total de alunos pesquisados × 100                  | Formulário de feedback dos usuários           | Cliente      |
| 4  | TAXA DE ERROS NO CADASTRO          | Reduzir falhas no preenchimento de dados                 | Percentual de cadastros com erros (campos faltando, dados inválidos etc.) | Nº de cadastros com erro / Nº total de cadastros × 100                           | Banco de dados do sistema                     | Qualidade    |
| 5  | TEMPO DE ACESSO ÀS INFORMAÇÕES     | Melhorar a eficiência na consulta de dados do aluno      | Tempo médio para acessar informações como plano e matrícula               | Soma dos tempos de acesso / Nº de acessos                                         | Logs do sistema                               | Técnico     |

## Requisitos

As tabelas que se seguem apresentam os requisitos funcionais e não funcionais que detalham o escopo do projeto. Para determinar a prioridade de requisitos, aplicar uma técnica de priorização de requisitos e detalhar como a técnica foi aplicada.

### Requisitos Funcionais

| ID     | Descrição do Requisito                                           | Prioridade |
|--------|------------------------------------------------------------------|------------|
| RF-001 | Permitir que o usuário cadastre uma conta.      | ALTA       |
| RF-002 | Permitir que o usuário acesse sua conta.. | ALTA       |
| RF-003 | Permitir que o aluno consulte suas informações de cadastro.      | ALTA       |
| RF-004 | Permitir que o usuário gerencie seu perfil.             | ALTA       |
| RF-005 | Permitir que o aluno consulte suas fichas de treino.             | ALTA       |
| RF-006 | Permitir que o usuário monte suas fichas de treino.  | MÉDIA      |
| RF-007 | Permitir que o aluno visualize seu plano.                      | MÉDIA      |
| RF-008 | Permitir que o ADM monte a ficha dos alunos. | ALTA       |
| RF-009 | Permitir que a ADM preencha o dashboard dos alunos .               | ALTA       |
| RF-010 | Permitir que o usuário visualize seu dashboard de treinos faltados. | MÉDIA      |
| RF-011 | Permitir que o aluno tenha controle sobre os dias em que foi treinar.              | MÉDIA      |
| RF-012 | Permitir que o usuário visualize seu dashboard de treinos feitos. | ALTA       |


### Requisitos não Funcionais

| ID    | Descrição do Requisito                                         | Prioridade |
|-------|---------------------------------------------------------------|------------|
| RNF-001| O sistema deve ser responsivo para dispositivos móveis.       | MÉDIA      |
| RNF-002| A aplicação deve ser compatível com os navegadores mais usados.| ALTA       |
| RNF-003| O sistema deve carregar em até 3 segundos.                    | ALTA       |
| RNF-004| O sistema deve ser seguro, protegendo os dados do usuário.    | ALTA       |
| RNF-005| O sistema deve ser fácil de usar.                             | MÉDIA      |
| RNF-006| O sistema deve funcionar sem erros em diferentes dispositivos.| BAIXA      |

## Restrições

O projeto está restrito pelos itens apresentados na tabela a seguir.

|ID| Restrição                                                                 |
|--|---------------------------------------------------------------------------|
|01| O projeto deverá ser entregue até o final do semestre letivo              |
|02| O sistema deve ser desenvolvido exclusivamente pelos integrantes do grupo |
|03| O sistema deve ser compatível com dispositivos móveis                     |
|04| O projeto deve ser desenvolvido com ferramentas e tecnologias gratuitas   |
|05| O sistema deve possuir uma interface simples e de fácil utilização        |


## Diagrama de Casos de Uso

![image](https://github.com/user-attachments/assets/1f05e2db-cc32-4d70-a1b7-fdd57b9e005d)


# Matriz de Rastreabilidade

![matriz_rastreabilidade_completa](https://github.com/user-attachments/assets/4d36d027-a9cb-44be-81de-5feb2926632d)


# Gerenciamento de Projeto

Este projeto será gerenciado conforme as boas práticas definidas pelo PMBoK (6ª edição), focando especialmente nas áreas mais críticas para sua execução bem-sucedida: **Integração, Escopo, Cronograma (Tempo), Qualidade, Comunicação e Partes Interessadas**.

O gerenciamento ocorrerá de maneira integrada, compreendendo que alterações em uma área influenciam diretamente outras áreas relacionadas.

### Áreas Prioritárias:

- **Integração:** Reuniões periódicas para assegurar alinhamento e coerência entre os diversos aspectos do projeto e objetivos estratégicos.
- **Escopo:** Controle rigoroso das funcionalidades, garantindo a entrega completa dos requisitos essenciais antes de aceitar novas demandas.
- **Cronograma:** Acompanhamento semanal utilizando ferramentas como gráfico de Gantt para manter as entregas dentro do prazo.
- **Qualidade:** Testes regulares para garantir o cumprimento dos requisitos funcionais e não funcionais definidos.
- **Comunicação:** Comunicação frequente e clara com todas as partes interessadas por meio de relatórios semanais de progresso.
- **Partes Interessadas:** Engajamento ativo e constante comunicação com stakeholders (administradores, clientes e equipe de desenvolvimento).


## Gerenciamento de Tempo

O gerenciamento de tempo será realizado utilizando ferramentas tradicionais como o Diagrama de Rede e o Gráfico de Gantt.

### Diagrama de Rede

Será utilizado para visualizar claramente as tarefas, identificar dependências e definir o caminho crítico para o projeto. Utilizará a notação francesa pela clareza na representação gráfica das atividades e dependências.

- **Identificação das tarefas:** Definir e descrever claramente cada atividade necessária.
- **Dependências entre tarefas:** Indicar claramente quais atividades são dependentes umas das outras para evitar bloqueios.
- **Caminho Crítico:** Monitoramento constante das tarefas críticas, garantindo o cumprimento dos prazos.

### Gráfico de Gantt

Ferramenta visual essencial para controlar o cronograma, mostrando as datas previstas de início e fim para cada tarefa, facilitando o acompanhamento contínuo do progresso do projeto.

- **Listagem clara das atividades:** Descrição detalhada das atividades e principais marcos.
- **Estimativa realista dos tempos:** Cada atividade terá tempo estimado com base na capacidade produtiva da equipe.
- **Monitoramento semanal:** Revisão periódica para garantir o cumprimento do cronograma estabelecido.

Dessa forma, a equipe terá controle total sobre o andamento do projeto, garantindo entregas organizadas e pontuais.

## Gerenciamento de Equipe

![image](https://github.com/user-attachments/assets/dfaa5d3c-4a06-4536-aee2-96e3c319a489)

## Gestão de Orçamento

![image](https://github.com/user-attachments/assets/b4d9f100-2bd0-4ac5-9a83-99a39e01321d)

