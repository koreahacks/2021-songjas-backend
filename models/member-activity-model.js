module.exports = (sequelize, DataTypes) => {
    return sequelize.define('MemberActivity', {
        content: {
            type: DataTypes.STRING(20),
            allowNull: false
        },
        date: {
            type: DataTypes.DATEONLY,
            allowNull: false
        }
    }, {
        timestamps: false,
        charset: 'utf8', 
        collate: 'utf8_general_ci'
    });
};