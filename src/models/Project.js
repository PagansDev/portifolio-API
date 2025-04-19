const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Project = sequelize.define(
  'Project',
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    thumbnailUrl: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'thumbnailUrl',
    },
    repositoryUrl: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'repositoryUrl',
    },
    siteUrl: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'siteUrl',
    },
    technologies: {
      type: DataTypes.JSON,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  {
    tableName: 'projects',
    timestamps: true,
    underscored: false,
  }
);

module.exports = Project;
