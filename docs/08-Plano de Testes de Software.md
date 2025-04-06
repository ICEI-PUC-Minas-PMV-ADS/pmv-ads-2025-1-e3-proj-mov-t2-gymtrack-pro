# Plano de Testes de Software

Os testes funcionais serão conduzidos por participantes do grupo que não estiveram diretamente envolvidos no desenvolvimento das funcionalidades testadas, visando garantir uma avaliação imparcial e isenta de vieses.

#### CT-1
|     Caso de teste     | CT-01 – Cadastrar conta |                                                                                                                                
|:---|:---|
| Requisitos Associados | RF-01 A aplicação deve permitir ao usuário cadastrar uma conta.                                                  |
|   Objetivo do Teste   | Verificar se ao preencher os campos necessários para cadastro e clicar no botão "Cadastrar", é criada uma conta para o usuário.                                                                                  |
|        Passos         | 1 - Clicar no botão "Cadastre-se!";<br> 2 - Preencher os campos "Nome", "Email", "Login de acesso" e "Senha";<br> 3 - Clicar no botão "Cadastrar".  |
|  Critérios de Êxito   | Ao preencher os campos necessários para cadastro e clicar em "Cadastrar" deverá exibir uma mensagem “Cadastro realizado com sucesso” e em seguida o usuário deve ser redirecionado para a tela de acesso.  |

#### CT-2
|     Caso de teste     | CT-02 – Efetuar login |                                                                                                                                
|:---|:---|
| Requisitos Associados | RF-02 Permitir que o usuário acesse sua conta na aplicação..                                                  |
|   Objetivo do Teste   | Verificar se os dados cadastrados foram efetuados.                                                                                  |
|        Passos         | 1 - Clicar no botão "Faça seu login!";<br> 2 - Preencher os campos "Email ou Login de acesso", "Senha";<br> 3 - Clicar no botão "Login".  |
|  Critérios de Êxito   | O aplicação deve permitir o acesso usuário através dos dados cadastrados. | 

#### CT-3
|Caso de Teste    | CT-3 - Gerenciar conta |
|:---|:---|
| Requisitos Associados | RF-03	A aplicação deve permitir que o usuário gerencie sua conta.|
| Objetivo do Teste | Verificar se ao entrar na página do seu perfil, o usuário conseguirá deletar sua conta. |
| Passos | 1 - Na tela de perfil clicar em deletar conta;<br> 2 - Confirmar que deseja deletar sua conta.<br> |
| Critérios de êxito | Ao clicar em deletar conta deve aparecer uma mensagem confirmando se o usuário deseja deletar a conta e, a partir desta confirmação, o usuário deve ser capaz de excluir sua conta no aplicativo.|

#### CT-4
|Caso de Teste    | CT-4 – Gerenciar perfil |
|:---|:---|
| Requisitos Associados |RF-04	A aplicação deve permitir que o usuário gerencie seu perfil.|
| Objetivo do Teste | Verificar se a aplicação permite aos usuários gerenciar seu perfil, alterando fotos e informações pessoais|
| Passos | 1 - Na tela de perfil clicar em alterar/excluir foto;<br> 2 - Na tela de perfil clicar em alterar informações pessoais;<br> 3 - Clicar em confirmar.  |
| Critérios de êxito | Ao clicar nestas opções o usuário deve conseguir alterar ou excluir sua foto e informações pessoais, como sua bio.|


## Ferramentas de Testes (Opcional)

Os testes serão realizados diretamente na aplicação assim que seu desenvolvimento for concluído.
