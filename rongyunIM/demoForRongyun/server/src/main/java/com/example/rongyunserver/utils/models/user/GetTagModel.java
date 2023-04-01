package com.example.rongyunserver.utils.models.user;

import com.example.rongyunserver.utils.util.GsonUtil;

/**
 * 批量用户标签信息
 *
 */
public class GetTagModel {

    /**
     *  用户 Id，一次最多支持 50 个用户。（必传）
     */
    private String[] userIds;

    public String[] getUserIds() {
        return userIds;
    }

    public void setUserIds(String[] userIds) {
        this.userIds = userIds;
    }

    @Override
    public String toString() {
        return GsonUtil.toJson(this, GetTagModel.class);
    }
}