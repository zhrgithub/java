package com.example.rongyunserver.utils.models.response;

import com.example.rongyunserver.utils.models.BlockUsers;
import com.example.rongyunserver.utils.models.Result;
import com.example.rongyunserver.utils.util.GsonUtil;

import java.util.List;

public class BlockUserResult extends Result {
    // 被封禁用户列表。
    List<BlockUsers> users;

    public BlockUserResult(Integer code, String errorMessage, List<BlockUsers> users) {
        super(code, errorMessage);
        this.users = users;
    }
    /**
     * 设置users
     *
     */
    public void setUsers(List<BlockUsers> users) {
        this.users = users;
    }

    /**
     * 获取users
     *
     * @return List
     */
    public List<BlockUsers> getUsers() {
        return users;
    }
    @Override
    public String toString() {
        return GsonUtil.toJson(this, BlockUserResult.class);
    }

}
