module.exports = (sequelize, DataTypes) => {
    const RoomUser = sequelize.define('tb_room_user', {
      room_user_key: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        comment: 'room user pk',
      },
      room_key: {
        type: DataTypes.INTEGER,
        allowNull: false,
        comment: 'room pk',
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        comment: 'user pk',
      },
      join_date: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        comment: '채팅방 참가일',
      },
    }, {
      tableName: 'tb_room_user',
      timestamps: false,
    });
  
    return RoomUser;
  };
  