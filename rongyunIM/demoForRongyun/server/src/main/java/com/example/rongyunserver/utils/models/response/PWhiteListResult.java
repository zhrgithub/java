package com.example.rongyunserver.utils.models.response;

import com.example.rongyunserver.utils.models.Result;
import com.example.rongyunserver.utils.models.user.UserModel;
import com.example.rongyunserver.utils.util.GsonUtil;

/**
 * @author RongCloud
 */
public class PWhiteListResult extends Result {
    /**
     * 单聊白名单用户列表
     */
    UserModel[] users;

    public PWhiteListResult(Integer code, String errorMessage) {
        super(code, errorMessage);
    }

    public PWhiteListResult(Integer code, String msg, UserModel[] users) {
        super(code, msg);
        this.users = users;
    }

    public PWhiteListResult(UserModel[] users) {
        this.users = users;
    }

    /**
     * 获取users
     *
     * @return User[]
     */
    public UserModel[] getUsers() {
        return this.users;
    }
    /**
     * 设置users
     *
     */
    public void setUsers(UserModel[] users) {
        this.users = users;
    }

    @Override
    public String toString() {
        return GsonUtil.toJson(this, PWhiteListResult.class);
    }

}
