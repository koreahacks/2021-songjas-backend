module.exports = (sequelize, DataTypes) => {
    return sequelize.define('ProjectPosition', {
        position: {
            type: DataTypes.STRING(20),
            allowNull: false
        },
        headCount: {
            type: DataTypes.INTEGER(3),
            allowNull: false
        },
    }, {
        timestamps: false,
        charset: 'utf8', 
        collate: 'utf8_general_ci'
    });
};