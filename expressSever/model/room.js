module.exports = (sequelize, DataTypes) => {
    const Room = sequelize.define('tb_room', {
      room_key: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        comment: 'room pk',
      },
      room_name: {
        type: DataTypes.STRING(50),
        allowNull: false,
        comment: '방제',
      },
      room_host: {
        type: DataTypes.INTEGER,
        allowNull: false,
        comment: '방 생성자',
      },
      room_constraint: {
        type: DataTypes.CHAR(1),
        allowNull: false,
        defaultValue: 'N',
        validate: {
          isIn: [['Y', 'N']],
        },
        comment: '방 제한',
      },
      password: {
        type: DataTypes.STRING(500),
        allowNull: true,
        comment: '방 비밀번호',
      },
      room_comment: {
        type: DataTypes.STRING(200),
        allowNull: true,
        comment: '방 설명',
      },
      create_date: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        comment: '방 생성일',
      },
    }, {
      tableName: 'tb_room',
      timestamps: false, 
    });
  
    return Room;
  };
  