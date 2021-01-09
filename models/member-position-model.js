module.exports = (sequelize, DataTypes) => {
    return sequelize.define('MemberPosition', {
        position: {
            type: DataTypes.STRING(20),
            allowNull: false
        }
    }, {
        timestamps: false,
        charset: 'utf8', 
        collate: 'utf8_general_ci'
    });
};