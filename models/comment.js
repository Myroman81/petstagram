const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');
const sequelize = require('../config/connection');

class Comment extends Model { }

Comment.init(
    {
        id: {
         type: DataTypes.INTEGER,
         allowNull: false,
         primaryKey: true,
         autoIncrement: true,
        },
        body: {
         type: DataTypes.TEXT,
         allowNull: false,
        },
        post_id: {
         type: DataTypes.INTEGER,
         references: {
           model: 'post',
           key: 'id'
            },
        },
        created_at: {
         type: DataTypes.DATE,
        },
    },
    {
     sequelize,
     freezeTableName: true,
     underscored: true,
     modelName: 'comment',   
    }
);

module.exports = Comment