package com.example.rongyunserver.utils.example.group.ban.whitelist;

import com.example.rongyunserver.utils.RongCloud;
import com.example.rongyunserver.utils.methods.group.Group;
import com.example.rongyunserver.utils.models.Result;
import com.example.rongyunserver.utils.models.group.GroupMember;
import com.example.rongyunserver.utils.models.group.GroupModel;
import com.example.rongyunserver.utils.models.response.GroupBanWhitelistResult;

public class WhitelistExample {
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
        RongCloud rongCloud = RongCloud.getInstance(appKey, appSecret);
        //自定义 api 地址方式
        // RongCloud rongCloud = RongCloud.getInstance(appKey, appSecret,api);

        Group group = rongCloud.group;

        /**
         * API 文档:
         * 添加禁言白名单用户方法
         */

        GroupMember[] members = {new GroupMember().setId("ghJiu7H1"),new GroupMember().setId("ghJiu7H2")};

        GroupModel groupModel = new GroupModel()
                .setId("groupId")
                .setMembers(members);
        Result result = group.ban.whitelist.user.add(groupModel);
        System.out.println("group.ban.add:  " + result.toString());

        /**
         * API 文档:
         * 查询禁言白名单用户方法
         */
        groupModel = new GroupModel()
                .setId("12");
        GroupBanWhitelistResult GroupBanResult = (GroupBanWhitelistResult) group.ban.whitelist.user.getList("groupId");
        System.out.println("group.ban.getList:  " + GroupBanResult.toString());

        /**
         * API 文档:
         * 移除禁言白名单用户方法
         */
        groupModel = new GroupModel()
                .setMembers(members)
                .setId("groupId");
        Result groupRollBackGagUserResult =  group.ban.whitelist.user.remove(groupModel);
        System.out.println("group.ban.remove:  " + groupRollBackGagUserResult.toString());


    }
}
