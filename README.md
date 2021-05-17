Projeto Centro-Despite-Covid19

Projeto desenvolvido por https://github.com/Oz0nO e https://github.com/VoidTallica

Página incial com gráficos de casos no mundo e em Portugal.

Consiste num website com FrontEnd em Angular e uma BackEnd em Nodejs. Contém 4 estruturas sendo estas: users, techs, admins e requests.

Sistema de autenticação de users, techs e admins (login e signup) e modificação de password.

Criação de requests para realização de testes de covid e armazenamento de todos estes dados do utilizador, para além de upload de ficheiros pdf.
Os techs têm acesso aos pedidos realizados pelos utilizadores.
Os admins têm acesso a todos os dados de techs,users e requests.

Users -> GET, GET ALL, POST, PATCH, DELETE
Techs -> GET, GET ALL, POST, PATCH, DELETE
Requests -> GET, GET ALL, POST, PATCH, DELETE
Admins -> POST, DELETE

Histórico de pedidos e estatisticas destes.
