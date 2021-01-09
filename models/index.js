const Sequelize = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];
const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

db.sequelize = sequelize;
db.Sequelize = Sequelize;

// 생성한 모델
db.User = require('./user-model')(sequelize, Sequelize);
db.Member = require('./member-model')(sequelize, Sequelize);
db.MemberPosition = require('./member-position-model')(sequelize, Sequelize);
db.MemberActivity = require('./member-activity-model')(sequelize, Sequelize);
db.Project = require('./project-model')(sequelize, Sequelize);
db.ProjectMember = require('./project-member-model')(sequelize, Sequelize);
db.ProjectPosition = require('./project-position-model')(sequelize, Sequelize);
db.ProjectApplicant = require('./project-applicant-model')(sequelize, Sequelize);

// 1: M 관계 User-Member
db.User.hasMany(db.Member);
db.Member.belongsTo(db.User, {
  foreignKey: {
    // name: 'userId',
    allowNull: false
  },
  onDelete: 'CASCADE'
});

// 1: M 관계 Member-MemberPosition
db.Member.hasMany(db.MemberPosition);
db.MemberPosition.belongsTo(db.Member, {
  foreignKey: {
    // name: 'memberId',
    allowNull: false
  },
  onDelete: 'CASCADE'
});

// 1: M 관계 Member-MemberActivity
db.Member.hasMany(db.MemberActivity);
db.MemberActivity.belongsTo(db.Member, {
  foreignKey: {
    // name: 'memberId',
    allowNull: false
  },
  onDelete: 'CASCADE'
});

// 1: M 관계 User-Project
db.User.hasMany(db.Project);
db.Project.belongsTo(db.User, {
  foreignKey: {
    // name: 'userId',
    allowNull: false
  },
  onDelete: 'CASCADE'
});

// 1: M 관계 Member-ProjectMember
db.Member.hasMany(db.ProjectMember);
db.ProjectMember.belongsTo(db.Member, {
  foreignKey: {
    // name: 'memberId',
    allowNull: false
  },
  onDelete: 'CASCADE'
});

// 1: M 관계 User-ProjectMember
db.User.hasMany(db.ProjectMember);
db.ProjectMember.belongsTo(db.User, {
  foreignKey: {
    // name: 'userId',
    allowNull: false
  },
  onDelete: 'CASCADE'
});

// 1: M 관계 Project-ProjectMember
db.Project.hasMany(db.ProjectMember);
db.ProjectMember.belongsTo(db.Project, {
  foreignKey: {
    // name: 'projectId',
    allowNull: false
  },
  onDelete: 'CASCADE'
});

// 1: M 관계 Project-ProjectPosition
db.Project.hasMany(db.ProjectPosition);
db.ProjectMember.belongsTo(db.Project, {
  foreignKey: {
    // name: 'projectId',
    allowNull: false
  },
  onDelete: 'CASCADE'
});


// 1: M 관계 Member-ProjectApplicant
db.Member.hasMany(db.ProjectApplicant);
db.ProjectApplicant.belongsTo(db.Member, {
  foreignKey: {
    // name: 'memberId',
    allowNull: false
  },
  onDelete: 'CASCADE'
});

// 1: M 관계 User-ProjectApplicant
db.User.hasMany(db.ProjectApplicant);
db.ProjectApplicant.belongsTo(db.User, {
  foreignKey: {
    // name: 'userId',
    allowNull: false
  },
  onDelete: 'CASCADE'
});

// 1: M 관계 Project-ProjectApplicant
db.Project.hasMany(db.ProjectApplicant);
db.ProjectApplicant.belongsTo(db.Project, {
  foreignKey: {
    // name: 'projectId',
    allowNull: false
  },
  onDelete: 'CASCADE'
});

module.exports = db;