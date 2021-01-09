module.exports = (sequelize, DataTypes) => {
    return sequelize.define('ProjectMember', {
    }, {
        timestamps: false,
        charset: 'utf8', 
        collate: 'utf8_general_ci'
    });
};