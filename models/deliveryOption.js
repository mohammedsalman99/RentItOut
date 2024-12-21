module.exports = (sequelize, DataTypes) => {
    const DeliveryOption = sequelize.define(
      'DeliveryOption',
      {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        type: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        fee: {
          type: DataTypes.DOUBLE,
          allowNull: false,
        },
        estimatedTime: {
          type: DataTypes.INTEGER, 
          allowNull: false,
        },
        description: {
          type: DataTypes.TEXT,
          allowNull: true,
        },
        
      },
    
    {
      timestamps: true,
    }
    );
  
    return DeliveryOption;
  };
  