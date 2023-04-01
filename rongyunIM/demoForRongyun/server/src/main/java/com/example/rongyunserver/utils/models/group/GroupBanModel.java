package com.example.rongyunserver.utils.models.group;

import com.example.rongyunserver.utils.models.Result;
import com.example.rongyunserver.utils.models.response.GroupBanInfo;
import com.example.rongyunserver.utils.util.GsonUtil;

public class GroupBanModel extends Result {
    private GroupBanInfo[] groupinfo;

    public GroupBanInfo[] getGroupinfo() {
        return groupinfo;
    }

    public void setGroupinfo(GroupBanInfo[] groupinfo) {
        this.groupinfo = groupinfo;
    }

    @Override
    public String toString() {
        return GsonUtil.toJson(this, GroupBanModel.class);
    }
}
