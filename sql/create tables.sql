CREATE TABLE tb_user (
	user_key int primary key comment 'user pk',
    user_id varchar(50) not null comment '유저 아이디',
    user_name varchar(50) not null comment '유저명',
    password varchar(200) not null comment '유저 비밀번호',
    profile_img varchar(300)  null comment '유저 프로필', 
    refresh_token varchar(500) null comment '리프레시 토큰', 
    token_update datetime null comment '리프레시 토큰 갱신일',
    create_date datetime default current_timestamp() comment '가입일' 
) ENGINE = InnoDB CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;


CREATE TABLE tb_room (
	room_key int primary key comment 'room pk',
    room_name varchar(50) not null comment '방제',
    room_host int not null comment '방 생성자', 
    room_constraint char(1) not null default 'N' check (room_constraint in('Y', 'N')) comment '방 제한',
    password varchar(500) null comment '방 비밀번호',
    room_comment varchar(200) null comment '방 설명',
    create_date datetime default current_timestamp() comment '방 생성일'
) ENGINE = InnoDB CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

CREATE TABLE tb_room_user (
	room_user_key int primary key comment 'room user pk', 
    room_key int not null comment 'room pk',
    user_id int not null comment 'user pk', 
    join_date datetime default current_timestamp() comment '채팅방 참가일'
) ENGINE = InnoDB CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;


CREATE TABLE tb_friend_request (
	friend_request_key int primary key comment 'friend request pk',
    requester int not null comment '요청인', 
    receiver int not null comment '수신자', 
    status varchar(20) not null default 'pending' check (status in ('pending', 'approved', 'rejected')) comment '요청 상태',
	regdate datetime default current_timestamp() comment '요청일'
) ENGINE = InnoDB CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

CREATE TABLE tb_friend (
	friend_key int primary key comment 'friend pk',
    user_key int not null comment 'user pk', 
    friend_user_key int not null comment 'friend user pk',
    regdate datetime default current_timestamp() comment '친구등록일'
) ENGINE = InnoDB CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;