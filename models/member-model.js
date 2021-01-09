module.exports = (sequelize, DataTypes) => {
    return sequelize.define('Member', {
        title: {
            type: DataTypes.STRING(30),
            allowNull: false
        },
        type: {
            type: DataTypes.STRING(20),
            allowNull: false
        },
        field: {
            type: DataTypes.STRING(20),
            allowNull: false
        },
        content: {
            type: DataTypes.STRING,
            allowNull: false
        },
        link: {
            type: DataTypes.STRING,
            allowNull: true
        },
        open: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        },
    }, {
        timestamps: true, //createdAt 설정
        createdAt: true,
        updatedAt: false,
        charset: 'utf8', 
        collate: 'utf8_general_ci'
    });
};