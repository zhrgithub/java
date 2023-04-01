package com.example.rongyunserver.utils.models.message;

import com.example.rongyunserver.utils.models.user.UserModel;
import com.example.rongyunserver.utils.util.GsonUtil;

import java.util.HashMap;
import java.util.Set;

/**
 * 消息扩展信息
 */
public class ExpansionModel {

    /**
     * 消息唯一标识 ID，服务端可通过全量消息路由功能获取。
     */
    public String msgUID;
    /**
     * 需要设置扩展的消息发送用户 Id。
     */
    public String userId;
    /**
     * 会话类型，二人会话是 1 、群组会话是 3，只支持单聊、群组会话类型。
     */
    public Integer conversationType;
    /**
     * 目标 Id，根据不同的 conversationType，可能是用户 Id 或群组 Id。
     */
    private String targetId;
    /**
     * 消息自定义扩展内容，JSON 结构，以 Key、Value 的方式进行设置，如：{"type":"3"}，单条消息可设置 300 个扩展信息，一次最多可以设置 100 个。
     */
    private HashMap<String, String> extraKeyVal;
    /**
     * 需要删除的扩展信息的 Key 值，一次最多可以删除 100 个扩展信息
     */
    private Set extraKey;

    public ExpansionModel() {
    }

    public ExpansionModel(String msgUID, Integer conversationType, String userId, String targetId) {
        this.msgUID = msgUID;
        this.conversationType = conversationType;
        this.userId = userId;
        this.targetId = targetId;
    }

    public String getMsgUID() {
        return msgUID;
    }

    public void setMsgUID(String msgUID) {
        this.msgUID = msgUID;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public Integer getConversationType() {
        return conversationType;
    }

    public void setConversationType(Integer conversationType) {
        this.conversationType = conversationType;
    }

    public String getTargetId() {
        return targetId;
    }

    public void setTargetId(String targetId) {
        this.targetId = targetId;
    }

    public HashMap<String, String> getExtraKeyVal() {
        return extraKeyVal;
    }

    public void setExtraKeyVal(HashMap<String, String> extraKeyVal) {
        this.extraKeyVal = extraKeyVal;
    }

    public Set getExtraKey() {
        return extraKey;
    }

    public void setExtraKey(Set extraKey) {
        this.extraKey = extraKey;
    }

    @Override
    public String toString() {
        return GsonUtil.toJson(this, UserModel.class);
    }
}
