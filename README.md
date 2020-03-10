# HappyCows
Private Repo to develop backend

<p align="center">
<img src="https://media.giphy.com/media/W54Zt0bgS87x6/giphy.gif" width="50%" alt="gif">
</p>


## Getting Started
You can run this program by using this command: (although you might need to install some dependencies first)
```bash
./bin/www 
```
You can access the game by visiting 127.0.0.1:3000 <br>
You can also access subpages like so 127.0.0.1:3000/subpagename

**Resetting Tables** <br>
If the tables are corrupted in the database you can drop the tables<br>
The uncomment out these functions from app.js
```javascript
//db.Users.sync();
//db.UserCommons.sync();
//db.Commons.sync();
//db.Configs.sync();
//db.Cows.sync();
//db.TieredTaxings.sync();
//db.UserWealths.sync();
```
Then run: 
```bash
node app.js 
```

**Running Locally** <br>
Install MySQL on your computer and change accordingly in `config/config.js`.  

Then, you can create tables by following command:
```bash
npx sequelize-cli db:migrate 
```
Or you can use following script to force update tables:
```javascript
var db = require("models/index")
db.Users.sync({force: true});
....
```
Or you can uncomment out these functions from app.js : (* Recommended *)
```javascript
//db.Users.sync();
//db.UserCommons.sync();
//db.Commons.sync();
//db.Configs.sync();
//db.Cows.sync();
//db.TieredTaxings.sync();
//db.UserWealths.sync();
```
Then run: 
```bash
node app.js 
```

If you want to have demo data, run following command: (no demo data here so will not work currently)
```bash
npx sequelize-cli db:seed:all  
```
## How to write APIs
**STEP 1**   
Create `[your_name].js` at `/routes` directory with following content
```javascript
var express = require('express');
var router = express.Router();

module.exports = router;
```
**STEP 2**   
Importing `route/[your_name].js` in `/app.js`
```javascript
var yourNameRouter = require('./routes/your_name');
```
And add following line to register your route:
```javascript
app.use('/yourName', yourNameRouter);
```
Now `http://server/yourName/*` is all yours.

**STEP 3**   
Create file `/apis/your_name/your_api.js` and write your api functions like
```javascript
var db = require("../../models/index"); // model is defined in /model
// assume table banana exists
// get all bananas
function get_banana(req, res) {
  db.Banana.findAll().then((dbRes)=>{
    res.json({success: true, data: dbRes}) // send json request back
  })
}
module.exports = {get_banana};
```
For `req` and `res` structs, refer to expressjs docs.  
For `db` struct, refer to sequelize docs.

**STEP 4**   
Import `/apis/your_name/your_api.js` at `route/[your_name].js`
```javascript
var {get_banana} = require("../apis/admin/users");
```
And register the subroute
```javascript
router.get('/banana', get_banana);
```
Now you can use curl to test it out or visit with browser directly!

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

### Express Article
http://sequelize.readthedocs.io/en/1.7.0/articles/express/

### Helpful article on sequelize associations
https://lorenstewart.me/2016/09/12/sequelize-table-associations-joins/

### Helpful article explaining migrations & seeds 
https://sequelize.org/master/manual/migrations.html

### RESTful Info
https://www.restapitutorial.com/lessons/restquicktips.html  
I assume we are using restful + json?
