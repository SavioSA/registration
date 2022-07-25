How to setup:
If you don't want to setup manually you just have to run the file "setup.sh" on project source.but if you do, here goes a simple walkthrough:
Note: check if you already have a mysql instance running on default port if you do, change it in .env.example (this is for to setup script too).

1. Use the .env.example file to generate a .env file.
2. It's recommend down any others containers running.
3. Go to project source and run docker-compose up --build .
4. Registration project will be running on http://localhost:5173/users .

Scrpit SQL used to create table:
CREATE TABLE user (id int NOT NULL AUTO_INCREMENT, name varchar(255) NOT NULL, birthday DATE NOT NULL, PRIMARY KEY (id))

################################################################################################################

Como configurar:
Se você não quiser configurar manualmente, basta executar o arquivo "setup.sh" na fonte do projeto. Mas se quiser, aqui vai um passo a passo simples:
Nota: verifique se você já tem uma instância mysql rodando na porta padrão, se tiver, altere-a em .env.example (isso serve para o script também).

1. Use o arquivo .env.example para gerar um arquivo .env .
2. É recomendado que outros containers estejam em execução.
3. Vá para a raiz do projeto e execute docker-compose up --build .
4. O projeto Registration será executado em http://localhost:5173/users .

Script SQL usado para criar a tabela:
CREATE TABLE user (id int NOT NULL AUTO_INCREMENT, name varchar(255) NOT NULL, birthday DATE NOT NULL, PRIMARY KEY (id))
