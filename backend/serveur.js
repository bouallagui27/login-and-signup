const express = require('express');
const { Sequelize, where } = require('sequelize');
const cors = require('cors');
require('dotenv').config();
const User = require('./models/usermodel');
const bcrypt = require('bcrypt');

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

const sequelize = require('./database');
sequelize.sync({ force: false })
    .then(() => console.log('Tables created successfully! ✨'))
    .catch(err => console.log('Error creating tables: ' + err));
sequelize.authenticate()
    .then(() => console.log('Connection to MariaDB established successfully! 🐘✅'))
    .catch(err => console.error('Unable to connect to MariaDB: ❌', err));

app.post('/register', async (req, res) => {
             try{
                const { username, email, password } = req.body;
                 const hashPassword = await bcrypt.hash(password, 10);
                const newuser = await User.create({ username, email, password: hashPassword });
                res.status(201).json({ message: 'User registered successfully', user: newuser });




             }catch(err){
                 res.status(500).json({ message: 'Server error', error: err.message });
             }
}   ); 
app.post('/login',async (req,res)=>{
    try{
        const {email , password} = req.body;
            const exist = await User.findOne({where:{email:email}})
             if(!exist){
                return res.status(404).json({message:"User not found", error: "No user found with provided email"})
            }
            const ismatch = await bcrypt.compare(password, exist.password);
         
            if(exist && ismatch){
                res.status(200).json({message:"Login successful", user: exist})
            }else{
                res.status(401).json({message:"Invalid credentials" , error: "No user found with provided email and password"})
            }

    }catch(err){
        res.status(500).json({message:"Server error", error: err.message})
    }
});
app.get('/', (req, res) => { res.send('Users endpoint'); });
module.exports = sequelize;
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port} 🚀`);
});