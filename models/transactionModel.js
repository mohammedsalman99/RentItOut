module.exports = (sequelize, DataTypes) => {
  const Transaction = sequelize.define(
    'Transaction',
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      itemId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'items',
          key: 'id',
        },
      },
      renterId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'users',
          key: 'id',
        },
      },
      rentalDuration: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          min: 1,
        },
      },
     
      pricePerDay: {
        type: DataTypes.DOUBLE,
        allowNull: false,
      },
      priceToPay: {
        type: DataTypes.DOUBLE,
        allowNull: false,
      },
    },
    {
      timestamps: true,
    }
  );

  return Transaction;
};
