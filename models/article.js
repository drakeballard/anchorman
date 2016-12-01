'use strict';
module.exports = function(sequelize, DataTypes) {
    var Article = sequelize.define('Article', {
        userId: DataTypes.STRING,
        sourceId: DataTypes.STRING,
        author: DataTypes.STRING,
        title: DataTypes.STRING,
        description: DataTypes.STRING,
        articleUrl: DataTypes.STRING,
        articleImageUrl: DataTypes.STRING,
        publishedAt: DataTypes.STRING
    }, {

        underscored: true,
        freezeTableName: true,

        // define the table's name
        tableName: 'articles',

        classMethods: {
            associate: function(models) {
                Article.belongsTo(models.User, {
                    onDelete: "CASCADE",
                    foreignKey: {
                        allowNull: false
                    }
                })
            }
        }
    });
    return Article;
};
