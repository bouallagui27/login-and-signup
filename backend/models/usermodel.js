const { DataTypes } = require('sequelize');
// 1. ناديو الـ instance (الخيط) من الملف اللي فيه الربط
// إما من '../database' إذا صنعت ملف وحده، أو من '../serveur'
const sequelize = require('../database'); 

// 2. تعريف الـ Model
const User = sequelize.define('User', {
    // نحددوا الـ ID (اختياري، Sequelize يصنعه وحده أما باهي تزيدو)
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true // باش ما يتعاودش نفس الاسم
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true // يثبت هل هو إيميل بالرسمي وإلا لا
        }
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    // خيارات إضافية
    timestamps: true // يصنعلك وحده createdAt و updatedAt (وقت التسجيل)
});

// 3. نخرجو الـ User باش السيرفر ينجم يراه
module.exports = User;