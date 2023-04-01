package com.example.rongyunserver.utils.models.response;

import com.example.rongyunserver.utils.models.Result;
import com.example.rongyunserver.utils.models.group.GroupModel;
import com.example.rongyunserver.utils.util.GsonUtil;

public class GroupMuteAllMembersListResult extends Result {
    public GroupMuteAllMembersListResult(Integer code, String errorMessage, GroupModel[] groups) {
        super(code, errorMessage);
        this.groups = groups;
    }

    private GroupModel[] groups;

    public GroupModel[] getGroups() {
        return groups;
    }

    public void setGroups(GroupModel[] groups) {
        this.groups = groups;
    }

    @Override
    public String toString() {
        return GsonUtil.toJson(this, GroupMuteAllMembersListResult.class);
    }
}
