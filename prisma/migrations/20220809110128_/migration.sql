-- CreateTable
CREATE TABLE "User" (
    "username" TEXT NOT NULL,
    "avatar" TEXT,
    "token42_api" TEXT NOT NULL,
    "email" TEXT,
    "phoneNumber" TEXT,
    "tokenGoogle_api" TEXT,
    "tokenSms_api" TEXT,
    "losses" INTEGER NOT NULL,
    "wins" INTEGER NOT NULL,
    "ladder_level" INTEGER NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("username")
);

-- CreateTable
CREATE TABLE "UserInRoom" (
    "userName" TEXT NOT NULL,
    "roomName" TEXT NOT NULL,
    "user_role" TEXT NOT NULL,

    CONSTRAINT "UserInRoom_pkey" PRIMARY KEY ("userName","roomName")
);

-- CreateTable
CREATE TABLE "Room" (
    "name" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "owner" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "Room_pkey" PRIMARY KEY ("name")
);

-- CreateTable
CREATE TABLE "MessageRoom" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "from" TEXT NOT NULL,
    "to_room" TEXT NOT NULL,
    "content_msg" TEXT NOT NULL,
    "wasRead" BOOLEAN NOT NULL,

    CONSTRAINT "MessageRoom_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Friendship" (
    "id" SERIAL NOT NULL,
    "user_1" TEXT NOT NULL,
    "user_2" TEXT NOT NULL,
    "state_block" BOOLEAN NOT NULL,

    CONSTRAINT "Friendship_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "InvitationFriend" (
    "id" SERIAL NOT NULL,
    "user_1" TEXT NOT NULL,
    "user_2" TEXT NOT NULL,

    CONSTRAINT "InvitationFriend_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_token42_api_key" ON "User"("token42_api");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_phoneNumber_key" ON "User"("phoneNumber");

-- CreateIndex
CREATE UNIQUE INDEX "User_tokenGoogle_api_key" ON "User"("tokenGoogle_api");

-- CreateIndex
CREATE UNIQUE INDEX "User_tokenSms_api_key" ON "User"("tokenSms_api");

-- AddForeignKey
ALTER TABLE "UserInRoom" ADD CONSTRAINT "UserInRoom_userName_fkey" FOREIGN KEY ("userName") REFERENCES "User"("username") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserInRoom" ADD CONSTRAINT "UserInRoom_roomName_fkey" FOREIGN KEY ("roomName") REFERENCES "Room"("name") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Room" ADD CONSTRAINT "Room_owner_fkey" FOREIGN KEY ("owner") REFERENCES "User"("username") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MessageRoom" ADD CONSTRAINT "MessageRoom_from_fkey" FOREIGN KEY ("from") REFERENCES "User"("username") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MessageRoom" ADD CONSTRAINT "MessageRoom_to_room_fkey" FOREIGN KEY ("to_room") REFERENCES "Room"("name") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Friendship" ADD CONSTRAINT "Friendship_user_1_fkey" FOREIGN KEY ("user_1") REFERENCES "User"("username") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Friendship" ADD CONSTRAINT "Friendship_user_2_fkey" FOREIGN KEY ("user_2") REFERENCES "User"("username") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InvitationFriend" ADD CONSTRAINT "InvitationFriend_user_1_fkey" FOREIGN KEY ("user_1") REFERENCES "User"("username") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InvitationFriend" ADD CONSTRAINT "InvitationFriend_user_2_fkey" FOREIGN KEY ("user_2") REFERENCES "User"("username") ON DELETE RESTRICT ON UPDATE CASCADE;
