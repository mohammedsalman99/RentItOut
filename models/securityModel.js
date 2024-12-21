module.exports = (sequelize, DataTypes) => {
    const securityModel = sequelize.define('securityModel', {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      transactionId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Transactions',
          key: 'id',
        },
      },
      amount: {
        type: DataTypes.DOUBLE,
        allowNull: false,
      },
      status: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    }, {
      tableName: 'securityModel',
    });
  
    return securityModel;
  };
  
