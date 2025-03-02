In order to start, please create a config.env file and insert this tempalte
NODE_ENV=development
PORT=8000
(Inputyour own mongodb connection string following this tempalte)
DATABASE= mongodb+srv://(changeThisToYourUserName):<PASSWORD>@cluster0.rb8b8.mongodb.net/advert_db?retryWrites=true&w=majority&appName=Cluster0
DATABASE_PASSWORD=(your mongoDB password)
JWT_SECRET=myultra-secret
JWT_EXPIRES_IN=5m

in terminal type: npm start    in order to run

There is also admin webpage on this side in vanilal js,
start with live server admin.html do login/signup and you can add
Categories, advertisements, edit and delete them. Admin side endpoints requires authentification 
so without login it wont work, on the otherhand the client side will allow unregistered users to use most things except comments


You can add images to you advertisement and it will be converted to basestring and stored in mongoDB, 
