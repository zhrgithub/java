package com.example.rongyunserver.utils.example.group.mute;

import com.example.rongyunserver.utils.RongCloud;
import com.example.rongyunserver.utils.methods.group.mute.MuteAllMembers;
import com.example.rongyunserver.utils.models.Result;
import com.example.rongyunserver.utils.models.response.GroupMuteAllMembersCheckResult;
import com.example.rongyunserver.utils.models.response.GroupMuteAllMembersListResult;

/**
 *
 * 群组禁言例子
 * @author RongCloud
 *
 * @version 3.0
 */
public class MuteAllMembersExample {
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

    /**
     * 本地调用测试
     *
     *
     * @throws Exception
     */
    public static void main(String[] args) throws Exception {
        //RongCloud rongCloud = RongCloud.getInstance(appKey, appSecret);
        //自定义 api 地址方式
        RongCloud rongCloud = RongCloud.getInstance(appKey, appSecret,api);

        MuteAllMembers muteAllMembers = rongCloud.group.muteAllMembers;
        /**
         * API 文档:
         * 添加禁言群方法
         */
        String[] groupIds = {"ghJiu7H1","ghJiu7H2","ghJiu7H3","ghJiu7H4","ghJiu7H712","ghJiu7H6","ghJiu7H7","ghJiu7H8","ghJiu7H9","ghJiu7H10","ghJiu7H11","ghJiu7H12","ghJiu7H13","ghJiu7H14","ghJiu7H15","ghJiu7H16","ghJiu7H12","ghJiu7H18"};
        Result result = muteAllMembers.add(groupIds);
        System.out.println("group.muteAllMembers.add:  " + result.toString());

        /**
         * API 文档: http://www.rongcloud.cn/docs/server_sdk_api/group/gag.html#getList
         * 查询所有设置禁言群方法
         */
        GroupMuteAllMembersListResult GroupMuteAllMembersResult = (GroupMuteAllMembersListResult)muteAllMembers.getList();
        System.out.println("group.muteAllMembers.getList:  " + GroupMuteAllMembersResult.toString());

        /**
         * API 文档: http://www.rongcloud.cn/docs/server_sdk_api/group/gag.html#getList
         * 检查禁言群方法
         */
        GroupMuteAllMembersCheckResult GroupBanCheckResult = (GroupMuteAllMembersCheckResult)muteAllMembers.check(groupIds);
        System.out.println("group.muteAllMembers.check:  " + GroupBanCheckResult.toString());

        /**s
         * API 文档: http://www.rongcloud.cn/docs/server_sdk_api/group/gag.html#remove
         * 移除禁言群方法
         */
        Result groupMuteAllMembersResult = muteAllMembers.remove(groupIds);
        System.out.println("group.muteAllMembers.remove:  " + groupMuteAllMembersResult.toString());


    }
}
