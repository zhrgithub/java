package com.example.rongyunserver.utils.models.response;

import com.example.rongyunserver.utils.models.Result;
import com.example.rongyunserver.utils.util.GsonUtil;

public class ChatroomKeepaliveResult extends Result{
    private String[] chatrooms;

    public ChatroomKeepaliveResult(Integer code, String msg, String[] chatrooms) {
        super(code, msg);
        this.chatrooms = chatrooms;
    }

    public String[] getChatrooms() {
        return this.chatrooms;
    }

    public void setChatrooms(String[] chatrooms) {
        this.chatrooms = chatrooms;
    }

    @Override
    public String toString() {
        return GsonUtil.toJson(this, ChatroomKeepaliveResult.class);
    }
}
