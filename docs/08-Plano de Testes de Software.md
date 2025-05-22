# Plano de Testes de Software

Os testes funcionais serão conduzidos por participantes do grupo que não estiveram diretamente envolvidos no desenvolvimento das funcionalidades testadas, visando garantir uma avaliação imparcial e isenta de vieses.

#### CT-1
|     Caso de teste     | CT-01 – Cadastrar conta |                                                                                                                                
|:---|:---|
| Requisitos Associados | RF-01 A aplicação deve permitir ao usuário cadastrar uma conta.                                                  |
|   Objetivo do Teste   | Verificar se ao preencher os campos necessários para cadastro e clicar no botão "Cadastrar", é criada uma conta para o usuário.                                                                                  |
|        Passos         | 1 - Clicar no botão "Cadastre-se!";<br> 2 - Preencher os campos "Nome", "Email", "Login de acesso" e "Senha";<br> 3 - Clicar no botão "Cadastrar".  |
|  Critérios de Êxito   | Ao preencher os campos necessários para cadastro e clicar em "Cadastrar" deverá exibir uma mensagem “Cadastro realizado com sucesso” e em seguida o usuário deve ser redirecionado para a tela de acesso.  |

![image](https://github.com/user-attachments/assets/4547acec-0cf1-4bae-9921-f66ba45b60f9)



#### CT-2
|     Caso de teste     | CT-02 – Efetuar login |                                                                                                                                
|:---|:---|
| Requisitos Associados | RF-02 Permitir que o usuário acesse sua conta na aplicação..                                                  |
|   Objetivo do Teste   | Verificar se os dados cadastrados foram efetuados.                                                                                  |
|        Passos         | 1 - Clicar no botão "Faça seu login!";<br> 2 - Preencher os campos "Email ou Login de acesso", "Senha";<br> 3 - Clicar no botão "Login".  |
|  Critérios de Êxito   | O aplicação deve permitir o acesso usuário através dos dados cadastrados. | 

![image](https://github.com/user-attachments/assets/0e46e35a-3b33-406f-b171-02ab447ce5ad)


#### CT-3
|Caso de Teste    | CT-3 - Gerenciar conta |
|:---|:---|
| Requisitos Associados | RF-03	A aplicação deve permitir que o usuário gerencie sua conta.|
| Objetivo do Teste | Verificar se ao entrar na página do seu perfil, o usuário conseguirá deletar sua conta. |
| Passos | 1 - Na tela de perfil clicar em deletar conta;<br> 2 - Confirmar que deseja deletar sua conta.<br> |
| Critérios de êxito | Ao clicar em deletar conta deve aparecer uma mensagem confirmando se o usuário deseja deletar a conta e, a partir desta confirmação, o usuário deve ser capaz de excluir sua conta no aplicativo.| 

![image](https://github.com/user-attachments/assets/f7adaa58-fb28-491a-bb7b-56d7649877bf)




#### CT-4
|Caso de Teste    | CT-4 – Gerenciar perfil |
|:---|:---|
| Requisitos Associados |RF-04	A aplicação deve permitir que o usuário gerencie seu perfil.|
| Objetivo do Teste | Verificar se a aplicação permite aos usuários gerenciar seu perfil, alterando informações pessoais|
| Passos | Na tela de perfil clicar em alterar informações pessoais;<br> 3 - Clicar em confirmar.  |
| Critérios de êxito | Ao clicar nestas opções o usuário deve conseguir alterar  informações pessoais, como sua bio.|

![image](https://github.com/user-attachments/assets/a3615d86-0b08-4ad6-9115-b648c5d7174b)

#### CT-4
|Caso de Teste    | CT-4 – Acompanhar exercícios do Dia |
|:---|:---|
| Requisitos Associados |RF-04	A aplicação deve permitir que o usuário acompanha seus exercícios do dia.|
| Objetivo do Teste | Verificar quais exercícios ele deve fazer para qual músculo aperfeiçoar. |
| Passos | Clicando no ícone exercícos ele vai ser levado a sua lista diaria |
| Critérios de êxito | Ao clicar nesta opção o usuário vai  acompanhar melhor sua rotina de treino.|


![image](https://github.com/user-attachments/assets/15a046ee-a569-4034-afed-558aa2c31cf1)


#### CT-5
| **Caso de Teste 05** 	| **RF-05 – Permitir que o aluno consulte fichas de treino.** 	|
|:---:	|:---:	|
|	Requisito Associado 	| RF-05 A aplicação deve permitir que o usuário consulte fichas de treino.|
| Objetivo do Teste 	| Verificar se ao entrar na página do seu perfil, o usuário conseguirá consultar as fichas de treino. |
|Critério de Êxito | O aplicação deve permitir o usuario adicionar e remover as fixas de treino. |

![CT 5](https://github.com/user-attachments/assets/e0ec28ab-8cc4-4ff1-8b0c-a331702d9b13)

| **Caso de Teste 06** 	| **RF-07 – Permita que o aluno visualize seu plano.** 	|
|:---:	|:---:	|
|	Requisito Associado 	| RF-07 A aplicação deve permitir que o aluno visualize seu plano.|
| Objetivo do Teste 	| Verificar se ao entrar na página do seu perfil, o usuário conseguirá vizualizar as fixas disponiveis. |
|Critério de Êxito | O aplicação deve permitir o usuário no Banco de Dados. <br>visualize seu plano disponivel na plataforma. |

![Ct 7](https://github.com/user-attachments/assets/4a7a5c95-e3b3-41c3-97b5-a5ed6a60ffb9)


## Ferramentas de Testes (Opcional)

Os testes serão realizados diretamente na aplicação assim que seu desenvolvimento for concluído.
