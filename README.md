# HappyCows
Private Repo to develop backend

<p align="center">
<img src="https://media.giphy.com/media/W54Zt0bgS87x6/giphy.gif" width="50%" alt="gif">
</p>

## Backend Stack 
* MySQL
* Sequelize
* Express.js
* Node.js

## Info
For maintainable application, we will put all the database logic into the models folder. 
We have automatic table creation if they don't exist in database which sequelize provides in the bin/www file - models.sequelize.sync().
We just need to worry about setting up the tables properly which are all located in the models folder. Note when we change data in models, we might need to modify the migrations file of that model. 

The seeders folder allows us to put in sample data so we could run "npx sequelize-cli db:seed:all" command to put it in our data tables  

## Reference Docs
http://sequelize.readthedocs.io/en/1.7.0/articles/express/

### Helpful article on sequelize associations
https://lorenstewart.me/2016/09/12/sequelize-table-associations-joins/

### Helpful article explaining migrations & seeds 
https://sequelize.org/master/manual/migrations.html

## Testing Instructions
Sequelize CLI
npx sequelize --help

Using MySQL, MySQL Workbench
When MySQL server running locally can type 
npx sequelize db:create 

-npx sequelize-cli db:migrate 
 
- creating a seed to put demo data in a table which can be initialized later (don't need to do because we already created seeds for tables)
npx sequelize-cli seed:generate --name demo-user

- inserts demo data (seeds) into database
npx sequelize-cli db:seed:all  