# Arquitetura da Solução


Esta seção descreve a estrutura técnica da solução proposta, abrangendo desde a modelagem conceitual até a implementação física dos componentes. São apresentados o diagrama de classes, o modelo entidade-relacionamento (ER), o esquema relacional, além da arquitetura de hospedagem da aplicação. Também são detalhadas as tecnologias empregadas no desenvolvimento, ilustrando como elas se integram para atender aos requisitos do sistema.


![image](https://github.com/user-attachments/assets/f9f3d92f-f031-4ffe-8168-b5e75b450149)

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



## Qualidade de Software

No desenvolvimento do projeto **Gymtrack-Pro**, adotamos alguns aspectos de qualidade baseados na norma ISO/IEC 25010. A ideia é que, mesmo sendo um projeto acadêmico, possamos garantir que o software atenda às necessidades dos usuários e dos stakeholders. A seguir, descrevemos as principais sub-características de qualidade escolhidas, suas justificativas e as métricas que utilizaremos para avaliá-las.

---

## 1. Funcionalidade
- **Sub-características:**
  - *Completude Funcional*: Garantir que todas as funções definidas nos requisitos sejam implementadas.
  - *Exatidão Funcional*: As funções devem executar corretamente as tarefas para as quais foram projetadas.
- **Justificativa:**
  A funcionalidade é a base do sistema. Se as funções principais não estiverem implementadas ou funcionarem errado, o software não cumprirá seu objetivo.
- **Métricas Sugeridas:**
  - Percentual de requisitos implementados conforme o que foi planejado.
  - Número de defeitos encontrados durante os testes.
  - Taxa de sucesso na execução dos casos de uso.

---

## 2. Usabilidade
- **Sub-características:**
  - *Capacidade de Aprendizagem*: Facilidade com que novos usuários aprendem a usar o sistema.
  - *Operabilidade*: Simplicidade e facilidade de uso, diminuindo erros durante a utilização.
- **Justificativa:**
  Uma interface amigável é importante para que os usuários consigam usar o **Gymtrack-Pro** sem dificuldades, o que é fundamental em um aplicativo de organização.
- **Métricas Sugeridas:**
  - Tempo médio para a realização das tarefas mais importantes.
  - Índice de satisfação dos usuários.
  - Quantidade de erros cometidos pelos usuários ao usar o sistema.

---

## 3. Desempenho
- **Sub-características:**
  - *Tempo de Resposta*: Velocidade com que o sistema responde às ações dos usuários.
  - *Utilização de Recursos*: Eficiência no uso de memória e processamento.
- **Justificativa:**
  Um bom desempenho evita que o aplicativo fique lento ou trave, proporcionando uma melhor experiência de uso, principalmente em dispositivos móveis.
- **Métricas Sugeridas:**
  - Tempo médio de resposta.
  - Número de operações realizadas por unidade de tempo.
  - Monitoramento do uso de recursos, como CPU e memória.

---

## 4. Confiabilidade
- **Sub-características:**
  - *Disponibilidade*: O sistema deve estar sempre disponível para os usuários.
  - *Maturidade*: O sistema deve apresentar poucos erros durante o uso.
  - *Capacidade de Recuperação*: Rapidez e eficiência na recuperação após eventuais falhas.
- **Justificativa:**
  Para que os usuários confiem no **Gymtrack-Pro**, é necessário que o sistema funcione de forma contínua e consiga se recuperar rapidamente em caso de problemas.
- **Métricas Sugeridas:**
  - Número de falhas ou incidentes por período.
  - MTBF.
  - MTTR.

---

## 5. Segurança
- **Sub-características:**
  - *Confidencialidade*: Proteção dos dados contra acessos não autorizados.
  - *Integridade*: Garantir que os dados não sejam alterados indevidamente.
  - *Autenticidade*: Verificação da identidade dos usuários.
- **Justificativa:**
  A segurança é fundamental, pois o **Gymtrack-Pro** pode conter dados pessoais e informações importantes dos usuários. Assim, é preciso protegê-los para manter a confiança no sistema.
- **Métricas Sugeridas:**
  - Número de vulnerabilidades encontradas e corrigidas.
  - Tempo para aplicar correções de segurança.
  - Conformidade com boas práticas e normativas de segurança.

---

## 6. Manutenibilidade
- **Sub-características:**
  - *Modularidade*: Estruturação do código em partes independentes para facilitar alterações e expansões.
  - *Testabilidade*: Facilidade para criar e executar testes que garantam o funcionamento do sistema.
- **Justificativa:**
  Um código bem organizado e testado torna o sistema mais fácil de manter e atualizar, o que é importante tanto para a evolução do projeto quanto para correção de eventuais erros.
- **Métricas Sugeridas:**
  - Complexidade do código.
  - Percentual de cobertura dos testes automatizados.
  - Tempo médio para corrigir defeitos reportados.
