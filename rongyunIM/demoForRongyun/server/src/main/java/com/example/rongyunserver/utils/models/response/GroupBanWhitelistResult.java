package com.example.rongyunserver.utils.models.response;

import com.example.rongyunserver.utils.models.Result;
import com.example.rongyunserver.utils.util.GsonUtil;

public class GroupBanWhitelistResult extends Result {
    private String[] userIds;
    private String reqBody;

    public String[] getUserIds() {
        return userIds;
    }

    public void setUserIds(String[] userIds) {
        this.userIds = userIds;
    }

    public String getReqBody() {
        return reqBody;
    }

    public void setReqBody(String reqBody) {
        this.reqBody = reqBody;
    }

    public GroupBanWhitelistResult(){

    }

    public GroupBanWhitelistResult(Integer code, String msg) {
        super(code, msg);
        this.code = code;
        this.errorMessage = msg;
    }

    @Override
    public String toString() {
        return GsonUtil.toJson(this, GroupBanWhitelistResult.class);
    }
}
