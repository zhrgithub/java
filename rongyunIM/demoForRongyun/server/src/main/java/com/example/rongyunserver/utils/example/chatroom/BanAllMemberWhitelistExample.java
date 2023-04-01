package com.example.rongyunserver.utils.example.chatroom;

import com.example.rongyunserver.utils.RongCloud;
import com.example.rongyunserver.utils.methods.chatroom.ban.BanAllMemberWhitelist;
import com.example.rongyunserver.utils.models.chatroom.ChatroomMember;
import com.example.rongyunserver.utils.models.chatroom.ChatroomModel;
import com.example.rongyunserver.utils.models.response.*;

/**
 * 聊天室全体成员禁言白名单
 * @author RongCloud
 */
public class BanAllMemberWhitelistExample {

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
        BanAllMemberWhitelist banAllMemberWhitelist = rongCloud.chatroom.banAllMemberWhitelist;

        /**
         * API 文档: https://docs.rongcloud.cn/v4/views/im/server/chatroom/ban.html#whitelist-add
         * 添加聊天室全体禁言白名单
         * */
        ChatroomMember[] members = {
                new ChatroomMember().setId("qawr34h"),
                new ChatroomMember().setId("qawr35h")
        };
        ChatroomModel chatroom = new ChatroomModel()
                .setMembers(members)
                .setId("RC_Test_chatroom1");

        ResponseResult result = banAllMemberWhitelist.add(chatroom);
        System.out.println("addBanAllMemberWhitelist:  " + result.toString());

        /**
         *
         * API 文档: https://docs.rongcloud.cn/v4/views/im/server/chatroom/ban.html#whitelist-query
         * 获取聊天室全体禁言白名单列表
         */
        GroupBanWhitelistResult groupBanWhitelistResult = banAllMemberWhitelist.getList(chatroom.getId());
        System.out.println("listBanAllMemberWhitelist:  " + groupBanWhitelistResult.toString());

        /**
         *
         * API 文档: https://docs.rongcloud.cn/v4/views/im/server/chatroom/ban.html#whitelist-rollback
         * 删除聊天室全体禁言白名单
         */
        ResponseResult removeResult = banAllMemberWhitelist.remove(chatroom);
        System.out.println("removeBanAllMemberWhitelist:  " + removeResult.toString());
    }
}
