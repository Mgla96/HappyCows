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
We just need to worry about setting up the tables properly which are all located in the routes folder


## Reference Docs
http://sequelize.readthedocs.io/en/1.7.0/articles/express/

