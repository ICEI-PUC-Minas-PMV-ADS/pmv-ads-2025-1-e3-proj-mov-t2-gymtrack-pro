# Arquitetura da Solução


Esta seção descreve a estrutura técnica da solução proposta, abrangendo desde a modelagem conceitual até a implementação física dos componentes. São apresentados o diagrama de classes, o modelo entidade-relacionamento (ER), o esquema relacional, além da arquitetura de hospedagem da aplicação. Também são detalhadas as tecnologias empregadas no desenvolvimento, ilustrando como elas se integram para atender aos requisitos do sistema.


![Arquitetura da Solução](img/02-mob-arch.png)

## Diagrama de Classes
![gymtrack_pro_class_diagram](https://github.com/user-attachments/assets/9cd63745-c8f0-43ec-aede-8937adefe974)

O diagrama de classes ilustra graficamente como será a estrutura do software, e como cada uma das classes da sua estrutura estarão interligadas. Essas classes servem de modelo para materializar os objetos que executarão na memória.


## Modelo ER

O Modelo ER representa através de um diagrama como as entidades (coisas, objetos) se relacionam entre si na aplicação interativa.

![Modelo ER](https://github.com/user-attachments/assets/0ca3f55f-ec52-4035-b805-43c795931049)


## Esquema Relacional

O Esquema Relacional corresponde à representação dos dados em tabelas juntamente com as restrições de integridade e chave primária.
 
![Relacional](https://github.com/user-attachments/assets/2c0afe69-30a0-4806-a831-326a7b2b5c0d)


## Modelo Físico

Entregar um arquivo banco.sql contendo os scripts de criação das tabelas do banco de dados. Este arquivo deverá ser incluído dentro da pasta src\bd.

## Tecnologias Utilizadas

Descreva aqui qual(is) tecnologias você vai usar para resolver o seu problema, ou seja, implementar a sua solução. Liste todas as tecnologias envolvidas, linguagens a serem utilizadas, serviços web, frameworks, bibliotecas, IDEs de desenvolvimento, e ferramentas.

Apresente também uma figura explicando como as tecnologias estão relacionadas ou como uma interação do usuário com o sistema vai ser conduzida, por onde ela passa até retornar uma resposta ao usuário.

## Hospedagem


## Qualidade de Software

| Característica        | Subcaracterística   | Justificativa                                                                 | Métrica de Avaliação                                  |
|------------------------|----------------------|-------------------------------------------------------------------------------|--------------------------------------------------------|
| Usabilidade            | Apreensibilidade     | O sistema precisa ser fácil de entender, principalmente para recepcionistas  | Tempo médio para concluir um cadastro                 |
| Eficiência de desempenho | Tempo de resposta  | Os usuários devem conseguir acessar seus dados sem demora                    | Tempo de carregamento das principais funcionalidades   |
| Funcionalidade         | Adequação funcional  | As funcionalidades devem atender de forma completa às necessidades da academia | Percentual de funcionalidades implementadas           |
| Confiabilidade         | Maturidade           | O sistema deve funcionar de forma estável, sem apresentar falhas frequentes  | Número de falhas relatadas por semana                 |
| Segurança              | Confidencialidade    | Os dados dos alunos e funcionários devem estar protegidos contra acessos indevidos | Número de acessos não autorizados identificados    |
