package com.example.rongyunserver.utils.methods.group.ban.whitelist;

import com.example.rongyunserver.utils.RongCloud;

/**
 * 群组禁言用户白名单服务
 * 在群组被禁言状态下，如果需要某些用户可以发言时，可将此用户加入到群组禁言用户白名单中。群禁言用户白名单，只有群组被设置为全部禁言时才会生效
 * docs : https://www.rongcloud.cn/docs/server.html#group_ban_whitelist
 * @author rc
 *
 * */
public class Whitelist {
    private static final String UTF8 = "UTF-8";
    private static final String PATH = "group/ban/whitelist";
    private String appKey;
    private String appSecret;
    private RongCloud rongCloud;
    public User user;

    public RongCloud getRongCloud() {
        return rongCloud;
    }
    public void setRongCloud(RongCloud rongCloud) {
        this.rongCloud = rongCloud;
    }
    public Whitelist(String appKey, String appSecret, RongCloud rongCloud) {
        this.appKey = appKey;
        this.appSecret = appSecret;
        this.rongCloud = rongCloud;
        this.user = new User(appKey,appSecret,rongCloud);
    }
}
