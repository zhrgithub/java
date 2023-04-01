package com.example.rongyunserver.utils.example.chatroom;

import com.example.rongyunserver.utils.RongCloud;
import com.example.rongyunserver.utils.methods.chatroom.Chatroom;
import com.example.rongyunserver.utils.models.chatroom.ChatroomMember;
import com.example.rongyunserver.utils.models.chatroom.ChatroomModel;
import com.example.rongyunserver.utils.models.response.*;

import java.io.Reader;

public class ChatroomExample {
    /**
     * 此处替换成您的appKey
     * */
    private static final String appKey = "appKey";
    /**
     * 此处替换成您的appSecret
     * */
    private static final String appSecret = "appSecret";
    /**
     * 自定义api地址
     * */
    private static final String api = "http://api-cn.ronghub.com";


    public static void main(String[] args) throws Exception {

        RongCloud rongCloud = RongCloud.getInstance(appKey, appSecret);
        //自定义 api地址方式
        //RongCloud rongCloud = RongCloud.getInstance(appKey, appSecret,api);

        Chatroom chatroom = rongCloud.chatroom;

        Reader reader = null;
        /**
         * API 文档: http://www.rongcloud.cn/docs/server_sdk_api/chatroom/chatroom.html#create
         *
         * 创建聊天室
         *
         * */
        ChatroomModel[] chatrooms = {
                new ChatroomModel().setId("chatroomId1").setName("chatroomName1"),
                new ChatroomModel().setId("chatroomId2").setName("chatroomName2")
        };
        ResponseResult result = chatroom.create(chatrooms);

        System.out.println("create:  " + result.toString());

        /**
         *
         * API 文档: http://www.rongcloud.cn/docs/server_sdk_api/chatroom/chatroom.html#destory
         * 销毁聊天室
         *
         * */
        ChatroomModel chatroomModel = new ChatroomModel()
                .setId("d7ec7a8b8d8546c98b0973417209a548");

        //ResponseResult chatroomDestroyResult = chatroom.destroy(chatroomModel);
        //System.out.println("destroy:  " + chatroomDestroyResult.toString());


        /**
         *
         * API 文档: http://www.rongcloud.cn/docs/server_sdk_api/chatroom/chatroom.html#getMembers
         * 查询聊天室成员demo
         *
         * */

        chatroomModel = new ChatroomModel()
                .setId("chatroomId1")
                .setCount(500)
                .setOrder(1);

        ChatroomUserQueryResult chatroomQueryUserResult = chatroom.get(chatroomModel);
        System.out.println("queryUser:  " + chatroomQueryUserResult.toString());

        /**
         *
         * API 文档: http://www.rongcloud.cn/docs/server_sdk_api/chatroom/chatroom.html#isExist
         * 查询聊天室成员是否存在
         *
         * */
        ChatroomMember member = new ChatroomMember()
                .setId("76894")
                .setChatroomId("76891");

        CheckChatRoomUserResult checkMemberResult = chatroom.isExist(member);
        System.out.println("checkChatroomUserResult:  " + checkMemberResult.isInChrm);


    }
}
