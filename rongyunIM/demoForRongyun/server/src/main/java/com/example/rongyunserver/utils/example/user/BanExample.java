package com.example.rongyunserver.utils.example.user;

import com.example.rongyunserver.utils.RongCloud;
import com.example.rongyunserver.utils.methods.user.chat.Ban;
import com.example.rongyunserver.utils.models.Result;
import com.example.rongyunserver.utils.models.response.BanListResult;
import com.example.rongyunserver.utils.models.user.BanListModel;
import com.example.rongyunserver.utils.models.user.BanModel;

/**
 * Demo class
 *
 * @author RongCloud
 */
public class BanExample {

    /**
     * 此处替换成您的appKey
     */
    private static final String appKey = "qd46yzrfqde4f";
    /**
     * 此处替换成您的appSecret
     */
    private static final String appSecret = "Cy5Euhxrcl9b";
    /**
     * 自定义api地址
     */
    private static final String api = "http://api-cn.ronghub.com";

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

        Ban ban = rongCloud.user.ban;

        /**
         * API 文档: https://docs.rongcloud.cn/v4/5X/views/im/server/user/ban.html#ban-set
         *
         * 设置用户禁言
         */
        BanModel model = new BanModel()
                .setUserId(new String[]{"CHIQ1", "CHIQ2"})
                .setState(1)
                .setType("PERSON");

        Result result = ban.set(model);
        System.out.println("set:  " + result.toString());


        BanListModel blModel = new BanListModel()
                .setType("PERSON");
        /**
         *
         * API 文档: https://docs.rongcloud.cn/v4/5X/views/im/server/user/ban.html#ban-querylist
         *
         * 查询禁言用户列表
         */
        BanListResult blResult = ban.getList(blModel);
        System.out.println("getList:  " + blResult.toString());


    }
}
