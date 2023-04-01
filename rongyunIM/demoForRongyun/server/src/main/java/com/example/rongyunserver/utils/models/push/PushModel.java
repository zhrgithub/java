package com.example.rongyunserver.utils.models.push;

import com.example.rongyunserver.utils.util.GsonUtil;

/**
 * 推送消息体
 */
public class PushModel extends BroadcastPushPublicPart {

    @Override
    public String toString() {
        return GsonUtil.toJson(this, PushModel.class);
    }
}