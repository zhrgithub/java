package com.example.rongyunserver.utils.example.chatroom;

import com.example.rongyunserver.utils.RongCloud;
import com.example.rongyunserver.utils.methods.chatroom.ban.BanAllMember;
import com.example.rongyunserver.utils.models.chatroom.ChatroomModel;
import com.example.rongyunserver.utils.models.response.ChatroomBanListResult;
import com.example.rongyunserver.utils.models.response.ResponseResult;
import com.example.rongyunserver.utils.models.response.StatusResult;

/**
 * 聊天室全体成员禁言
 * @author RongCloud
 */
public class BanAllMemberExample {

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
        BanAllMember banAllMember = rongCloud.chatroom.banAllMember;

        /**
         * API 文档: https://docs.rongcloud.cn/v4/views/im/server/chatroom/ban.html#ban-add
         * 添加聊天室全体成员禁言
         * */
        ChatroomModel chatroom = new ChatroomModel();
        chatroom.setId("RC_Test_chatroom1");

        ResponseResult result = banAllMember.add(chatroom);
        System.out.println("addBanAllMember:  " + result.toString());

        /**
         * API 文档: https://docs.rongcloud.cn/v4/views/im/server/chatroom/ban.html#ban-add
         * 聊天室全体禁言状态检查
         * */
        StatusResult statusResult = banAllMember.check(chatroom);
        System.out.println("checkBanAllMember:  " + statusResult.toString());

        /**
         *
         * API 文档: https://docs.rongcloud.cn/v4/views/im/server/chatroom/ban.html#ban-query
         * 获取聊天室全体禁言列表
         */
        ChatroomBanListResult chatroomBanListResult = banAllMember.getList(10,1);
        System.out.println("listBanAllMember:  " + chatroomBanListResult.toString());

        /**
         *
         * API 文档: https://docs.rongcloud.cn/v4/views/im/server/chatroom/ban.html#ban-rollback
         * 删除聊天室全体禁言
         */
        ResponseResult removeResult = banAllMember.remove(chatroom);
        System.out.println("removeBanAllMember:  " + removeResult.toString());
    }
}
