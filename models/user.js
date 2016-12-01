'use strict';
module.exports = function(sequelize, DataTypes) {
    var User = sequelize.define('User', {
        userName: DataTypes.STRING,
        email: DataTypes.STRING,
        pwdHash: DataTypes.STRING
    }, {

        underscored: true,
        freezeTableName: true,

        // define the table's name
        tableName: 'users',

        classMethods: {
            associate: function(models) {
                // associations can be defined here
                User.hasMany(models.Article, {
                    onDelete: "CASCADE",
                    hooks: true,
                    foreignKey: {
                        allowNull: false
                    }
                })
            }
        }
    });
    return User;
};
