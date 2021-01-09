const bcrypt = require('bcrypt')

module.exports = (sequelize, DataTypes) => {
    return sequelize.define('User', {
        email: {
            type: DataTypes.STRING(50),
            allowNull: false,
            unique: true
        },
        pwd: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        name: {
            type: DataTypes.STRING(10),
            allowNull: false,
            unique: true
        },
        largeAddress: {
            type: DataTypes.STRING(10),
            allowNull: false
        },
        smallAddress: {
            type: DataTypes.STRING(10),
            allowNull: false
        },
        univ: {
            type: DataTypes.STRING(20),
            allowNull: false
        },
        major: {
            type: DataTypes.STRING(20),
            allowNull: false
        },
        grade: {
            type: DataTypes.INTEGER(1),
            allowNull: false
        },
        img: {
            type: DataTypes.STRING,
            allowNull: true
        },
        morning: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
        night: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
        dawn: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
        plan: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
        cramming: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
        leader: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
        follower: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
        challenge: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
        realistic: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        }
    }, {
        timestamps: false,
        charset: 'utf8', 
        collate: 'utf8_general_ci',
        hooks: {
            beforeCreate: (user) => {
              const salt = bcrypt.genSaltSync();
              user.pwd = bcrypt.hashSync(user.pwd, salt);
            }
        },
        instanceMethods: {
            validPassword: function(pwd) {
              return bcrypt.compareSync(pwd, this.pwd);
            }
        }  
    });
}