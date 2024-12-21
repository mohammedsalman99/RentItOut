module.exports = (sequelize, DataTypes) => {
    const Dispute = sequelize.define('Dispute', {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Users', 
          key: 'id',
        },
      },
      itemId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Items',
          key: 'id',
        },
      },
      type: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
    }, {
      tableName: 'Disputes',
      timestamps: true, 
    });
  
    Dispute.associate = (models) => {
      Dispute.belongsTo(models.User, {
        foreignKey: 'userId',
        as: 'user',
      });
      Dispute.belongsTo(models.Item, {
        foreignKey: 'itemId',
        as: 'item',
      });
    };
  
    return Dispute;
  };