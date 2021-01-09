module.exports = (sequelize, DataTypes) => {
    return sequelize.define('ProjectApplicant', {
    }, {
        timestamps: false,
        charset: 'utf8', 
        collate: 'utf8_general_ci'
    });
};
