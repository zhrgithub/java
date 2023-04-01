package com.example.rongyunserver.utils.models.response;

import com.example.rongyunserver.utils.models.BlockUsers;
import com.example.rongyunserver.utils.util.GsonUtil;

public class ExtraContent {

    String v;
    String ts;

    public ExtraContent(String v, String ts) {
        this.v = v;
        this.ts = ts;
    }

    public String getV() {
        return v;
    }

    public void setV(String v) {
        this.v = v;
    }

    public String getTs() {
        return ts;
    }

    public void setTs(String ts) {
        this.ts = ts;
    }
    @Override
    public String toString() {
        return GsonUtil.toJson(this, BlockUsers.class);
    }
}
