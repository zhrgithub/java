package com.example.rongyunserver.utils.example.conversation;

import com.example.rongyunserver.utils.RongCloud;
import com.example.rongyunserver.utils.methods.conversation.Conversation;
import com.example.rongyunserver.utils.models.conversation.ConversationModel;
import com.example.rongyunserver.utils.models.response.ConversationNotificationResult;
import com.example.rongyunserver.utils.models.response.ResponseResult;
import com.example.rongyunserver.utils.util.CodeUtil.ConversationType;

/**
 *
 * 绘话示例
 * @author RongCloud
 *
 * @version 3.0.0
 */
public class ConversationExample {
    /**
     * 此处替换成您的appKey
     * */
    private static final String appKey = "appKey";
    /**
     * 此处替换成您的appSecret
     * */
    private static final String appSecret = "appSercet";
    /**
     * 自定义api地址
     * */
    private static final String api = "http://api-cn.ronghub.com";

    public static void main(String[] args) throws Exception {

        RongCloud rongCloud = RongCloud.getInstance(appKey, appSecret);
        //自定义 api 地址方式
        // RongCloud rongCloud = RongCloud.getInstance(appKey, appSecret,api);

        Conversation Conversation = rongCloud.conversation;

        ConversationModel conversation = new ConversationModel()
                .setType(ConversationType.PRIVATE.getName())
                .setUserId("UgYzcDZSisNyYaZ83WXcEk11")
                .setTargetId("2iXiqVWUAWwaKA55FuZvY31");
        /**
         *
         * API 文档: http://www.rongcloud.cn/docs/server_sdk_api/conversation/conversation.html#mute
         * 设置消息免打扰
         *
         */
        ResponseResult muteConversationResult = Conversation.mute(conversation);

        System.out.println("muteConversationResult:  " + muteConversationResult.toString());

        /**
         *
         * API 文档: http://www.rongcloud.cn/docs/server_sdk_api/conversation/conversation.html#unmute
         * 解除消息免打扰
         *
         * */
        ResponseResult unMuteConversationResult = Conversation.unMute(conversation);

        System.out.println("unMuteConversationResult:  " + unMuteConversationResult.toString());
        /**
         *
         * API 文档: https://www.rongcloud.cn/docs/server.html#conversation_notification_get
         * 获取消息免打扰
         *
         * */
        ConversationNotificationResult getMuteConversationResult = (ConversationNotificationResult)Conversation.get(conversation);

        System.out.println("getMuteConversationResult:  " + getMuteConversationResult.toString());
    }
}
