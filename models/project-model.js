module.exports = (sequelize, DataTypes) => {
    return sequelize.define('Project', {
        img: {
            type: DataTypes.STRING,
            allowNull: true
        },
        title: {
            type: DataTypes.STRING(60),
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
        startDate: {
            type: DataTypes.DATEONLY,
            allowNull: false
        },
        endDate: {
            type: DataTypes.DATEONLY,
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
        morning: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        },
        night: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        },
        dawn: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        },
        plan: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        },
        cramming: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        },
        leader: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        },
        follower: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        },
        challenge: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        },
        realistic: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        },
        largeAddress: {
            type: DataTypes.STRING(10),
            allowNull: false
        },
        smallAddress: {
            type: DataTypes.STRING(10),
            allowNull: false
        },
        limitUniv: {
            type: DataTypes.STRING(20),
            allowNull: false
        },
        open: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
        room: {
            type: DataTypes.STRING,
            allowNull: true
        }
    }, {
        timestamps: true,
        createdAt: true,
        updatedAt: false,
        charset: 'utf8', 
        collate: 'utf8_general_ci'
    });
};
