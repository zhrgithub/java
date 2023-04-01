package com.example.rongyunserver.utils.example.chatroom;

import com.example.rongyunserver.utils.RongCloud;
import com.example.rongyunserver.utils.methods.chatroom.distribute.Distribute;
import com.example.rongyunserver.utils.models.chatroom.ChatroomModel;
import com.example.rongyunserver.utils.models.response.ResponseResult;

public class DistributeExample {
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

        Distribute distribute = rongCloud.chatroom.distribute;

        /**
         * API 文档: http://www.rongcloud.cn/docs/server_sdk_api/chatroom/distribute.html#stop
         *
         * 聊天室消息停止分发
         *
         */
        ChatroomModel chatroomModel = new ChatroomModel()
                .setId("d7ec7a8b8d8546c98b0973417209a548");
        ResponseResult result = distribute.stop(chatroomModel);

        System.out.println("stopDistributionMessage:  " + result.toString());

        /**
         * API 文档: http://www.rongcloud.cn/docs/server_sdk_api/chatroom/distribute.html#resume
         *
         * 聊天室消息恢复分发方法（每秒钟限 100 次）
         */
        ResponseResult resumeResult = distribute.resume(chatroomModel);
        System.out.println("resumeDistributionMessage:  " + resumeResult.toString());

    }
}
