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

Apresente aqui os problemas existentes que viabilizam sua proposta. Apresente o modelo do sistema como ele funciona hoje. Caso sua proposta seja inovadora e não existam processos claramente definidos, apresente como as tarefas que o seu sistema pretende implementar são executadas atualmente, mesmo que não se utilize tecnologia computacional. 

### Descrição Geral da Proposta

Apresente aqui uma descrição da sua proposta abordando seus limites e suas ligações com as estratégias e objetivos do negócio. Apresente aqui as oportunidades de melhorias.

### Processo 1 – NOME DO PROCESSO

Apresente aqui o nome e as oportunidades de melhorias para o processo 1. Em seguida, apresente o modelo do processo 1, descrito no padrão BPMN. 

![Processo 1](img/02-bpmn-proc1.png)

### Processo 2 – NOME DO PROCESSO

Apresente aqui o nome e as oportunidades de melhorias para o processo 2. Em seguida, apresente o modelo do processo 2, descrito no padrão BPMN.

![Processo 2](img/02-bpmn-proc2.png)

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
| RF-001 | Permitir que a recepcionista mude as fichas de treino disponiveis.      | ALTA       |
| RF-002 | Permitir que a recepcionista mude planos dos alunos. | ALTA       |
| RF-003 | Permitir que o aluno consulte suas informações de cadastro.      | ALTA       |
| RF-004 | Permitir que o aluno mude sua meta de treinos mensais.             | ALTA       |
| RF-005 | Permitir que o aluno consulte suas fichas de treino.             | ALTA       |
| RF-006 | Permitir que a recepcionista edite as suas informações pessoais dos aluno.  | MÉDIA      |
| RF-007 | Permitir que o aluno visualize seu plano.                      | MÉDIA      |
| RF-008 | Permitir que o recepcionista visualize o plano de cada aluno. | ALTA       |
| RF-009 | Permitir que a recepcionista faça a matrícula dos alunos.               | ALTA       |
| RF-010 | Permitir que o aluno marque aulas com os treinadores disponíveis. | MÉDIA      |
| RF-011 | Permitir que o aluno visualize os dias em que foi treinar.              | MÉDIA      |
| RF-012 | Permitir que o usuário entre em sua conta com um login simples (e-mail e senha). | ALTA       |


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

Com diagramas bem organizados que permitem gerenciar o tempo nos projetos, o gerente de projetos agenda e coordena tarefas dentro de um projeto para estimar o tempo necessário de conclusão.

![Diagrama de rede simplificado notação francesa (método francês)](img/02-diagrama-rede-simplificado.png)

O gráfico de Gantt ou diagrama de Gantt também é uma ferramenta visual utilizada para controlar e gerenciar o cronograma de atividades de um projeto. Com ele, é possível listar tudo que precisa ser feito para colocar o projeto em prática, dividir em atividades e estimar o tempo necessário para executá-las.

![Gráfico de Gantt](img/02-grafico-gantt.png)

## Gerenciamento de Equipe

![image](https://github.com/user-attachments/assets/dfaa5d3c-4a06-4536-aee2-96e3c319a489)

## Gestão de Orçamento

![image](https://github.com/user-attachments/assets/b4d9f100-2bd0-4ac5-9a83-99a39e01321d)

