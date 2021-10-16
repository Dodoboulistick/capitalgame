module.exports = (sequelize, Sequelize) => {
    const Score = sequelize.define("score", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      value: {
        type: Sequelize.BIGINT,
      },
      user: {
        type: Sequelize.STRING
      },
      type: {
        type: Sequelize.STRING
      },
      createdAt: {
        type : Sequelize.DATEONLY,
        defaultValue: Sequelize.NOW
      }
    });
  
    return Score;
  };