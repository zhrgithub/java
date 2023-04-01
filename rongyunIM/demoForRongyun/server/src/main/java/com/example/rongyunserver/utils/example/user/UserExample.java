package com.example.rongyunserver.utils.example.user;

import com.example.rongyunserver.utils.RongCloud;
import com.example.rongyunserver.utils.methods.user.User;
import com.example.rongyunserver.utils.models.*;
import com.example.rongyunserver.utils.models.response.*;
import com.example.rongyunserver.utils.models.user.ExpireModel;
import com.example.rongyunserver.utils.models.user.UserModel;

/**
 * Demo class
 *
 * @author RongCloud
 */
public class UserExample {

    /**
     * 此处替换成您的appKey
     */
    private static final String appKey = "p5tvi9dspv574";
    /**
     * 此处替换成您的appSecret
     */
    private static final String appSecret = "cNnXrHLckVQ";
    /**
     * 自定义api地址
     */
    private static final String api = "http://api-cn.ronghub.com";

    private static final RongCloud rongCloud = RongCloud.getInstance(appKey, appSecret);


    /**
     * 注册用户，生成用户在融云的唯一身份标识 Token
     *
     * @param userId
     * @param userName
     * @param avatar
     * @return
     * @throws Exception
     */
    public static String getToken(String userId, String userName, String avatar) throws Exception {
        User userInfo = rongCloud.user;
        UserModel user = new UserModel()
                .setId(userId)
                .setName(userName)
                .setPortrait(avatar);
        TokenResult result = userInfo.register(user);
        System.out.println("getToken:  " + result.toString());
        return result.getToken();
    };

    public static void main(String[] args) throws Exception {

        RongCloud rongCloud = RongCloud.getInstance(appKey, appSecret);
        // 自定义 api 地址方式
        // RongCloud rongCloud = RongCloud.getInstance(appKey, appSecret,api);
        // 使用 百度 HTTPDNS 获取最快的 IP 地址进行连接
        // BaiduHttpDNSUtil.setHostTypeIp("account_id", "secret", rongCloud.getApiHostType());

        // 设置连接超时时间
        // rongCloud.getApiHostType().setConnectTimeout(10000);
        // 设置读取超时时间
        // rongCloud.getApiHostType().setReadTimeout(10000);
        // 获取备用域名List
        // List<HostType> hosttypes = rongCloud.getApiHostListBackUp();
        // 设置连接、读取超时时间
        // for (HostType hosttype : hosttypes) {
        //     hosttype.setConnectTimeout(10000);
        //     hosttype.setReadTimeout(10000);
        // }

        User User = rongCloud.user;

        /**
         * API 文档: http://www.rongcloud.cn/docs/server_sdk_api/user/user.html#register
         *
         * 注册用户，生成用户在融云的唯一身份标识 Token
         */
        UserModel user = new UserModel()
                .setId("userId1")
                .setName("zhangsan")
                .setPortrait("http://www.rongcloud.cn/images/logo.png");
        TokenResult result = User.register(user);
        System.out.println("getToken:  " + result.toString());

        /**
         *
         * API 文档: http://www.rongcloud.cn/docs/server_sdk_api/user/user.html#refresh
         *
         * 刷新用户信息方法
         */
        Result refreshResult = User.update(user);
        System.out.println("refresh:  " + refreshResult.toString());

        /**
         *
         * API 文档: http://www.rongcloud.cn/docs/server_sdk_api/user/user.html#get
         *
         * 查询用户信息方法
         */
        UserResult userResult = User.get(user);
        System.out.println("getUserInfo:  " + userResult.toString());

        /**
         *
         * API 文档: http://www.rongcloud.cn/docs/server_sdk_api/user/user.html#get
         *
         * 查询用户所在群组
         */
        UserGroupQueryResult userGroupResult = User.getGroups(user);
        System.out.println("getGroups:  " + userGroupResult.toString());


        ExpireModel expireModel = new ExpireModel()
                .setUserId(new String[]{"CHIQ1", "CHIQ2"})
                .setTime(1623123911000L);
        /**
         *
         * API 文档: https://docs.rongcloud.cn/v4/5X/views/im/server/user/expire.html
         *
         * Token 失效
         */
//        refreshResult = User.expire(expireModel);
//        System.out.println("expire:  " + refreshResult.toString());


    }
}
