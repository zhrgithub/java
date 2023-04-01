package com.example.rongyunserver.utils.example.chatroom;

import com.example.rongyunserver.utils.RongCloud;
import com.example.rongyunserver.utils.methods.chatroom.keepalive.Keepalive;
import com.example.rongyunserver.utils.models.chatroom.ChatroomModel;
import com.example.rongyunserver.utils.models.response.ChatroomKeepaliveResult;
import com.example.rongyunserver.utils.models.response.ResponseResult;

/**
 *
 * 聊天时保活示例
 * @author RongCloud
 *
 * @version 3.0.0
 */
public class KeepaliveExample {
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

        Keepalive keepalive = rongCloud.chatroom.keepalive;

        /**
         * API 文档: http://www.rongcloud.cn/docs/server_sdk_api/chatroom/keepalive.html#add
         *
         * 添加保活聊天室
         *
         **/
        ChatroomModel chatroom = new ChatroomModel()
                .setId("d7ec7a8b8d8546c98b0973417209a548");
        ResponseResult addResult = keepalive.add(chatroom);
        System.out.println("add keepalive result"+addResult.toString());

        /**
         * API 文档: http://www.rongcloud.cn/docs/server_sdk_api/chatroom/keepalive.html#remove
         *
         * 删除保活聊天室
         *
         **/
        ResponseResult removeResult = keepalive.remove(chatroom);
        System.out.println("keepalive remove"+removeResult.toString());

        /**
         *
         * API 文档: http://www.rongcloud.cn/docs/server_sdk_api/chatroom/keepalive.html#getList
         *
         * 获取保活聊天室
         *
         **/
        ChatroomKeepaliveResult result = keepalive.getList();

        System.out.println("keepalive getList"+result.toString());
    }

}
