package com.example.rongyunserver.utils.methods.push;

import com.alibaba.fastjson.JSONException;

import com.example.rongyunserver.utils.RongCloud;
import com.example.rongyunserver.utils.models.CheckMethod;
import com.example.rongyunserver.utils.models.push.BroadcastModel;
import com.example.rongyunserver.utils.models.push.PushModel;
import com.example.rongyunserver.utils.models.response.PushResult;
import com.example.rongyunserver.utils.util.CommonUtil;
import com.example.rongyunserver.utils.util.GsonUtil;
import com.example.rongyunserver.utils.util.HttpUtil;
import com.fasterxml.jackson.core.JsonParseException;

import java.net.HttpURLConnection;

/**
 * 推送服务
 * <p>
 * docs https://www.rongcloud.cn/docs/push_service.html#broadcast
 * https://www.rongcloud.cn/docs/push_service.html#push
 */
public class Push {

    private static final String UTF8 = "UTF-8";
    private static final String PATH = "push";
    private String appKey;
    private String appSecret;
    private RongCloud rongCloud;

    public RongCloud getRongCloud() {
        return rongCloud;
    }

    public void setRongCloud(RongCloud rongCloud) {
        this.rongCloud = rongCloud;
    }

    public Push(String appKey, String appSecret) {
        this.appKey = appKey;
        this.appSecret = appSecret;
    }

    /**
     * 广播
     *
     * @param broadcast 广播数据
     * @return PushResult
     **/
    public PushResult message(BroadcastModel broadcast) throws Exception {
        // 需要校验的字段
        String message = CommonUtil.checkFiled(broadcast, PATH, CheckMethod.BROADCAST);
        if (null != message) {
            return (PushResult) GsonUtil.fromJson(message, PushResult.class);
        }

        HttpURLConnection conn = HttpUtil.CreatePostHttpConnection(rongCloud.getConfig(), appKey, appSecret, "/push.json",
                "application/json");
        HttpUtil.setBodyParameter(broadcast.toString(), conn, rongCloud.getConfig());

        return (PushResult) GsonUtil.fromJson(
                CommonUtil.getResponseByCode(PATH, CheckMethod.BROADCAST, HttpUtil.returnResult(conn, rongCloud.getConfig())),
                PushResult.class);
    }

    /**
     * 推送
     *
     * @param push 推送数据
     * @return PushResult
     **/
    public PushResult push(PushModel push) throws Exception {
        // 需要校验的字段
        String message = CommonUtil.checkFiled(push, PATH, CheckMethod.PUSH);
        if (null != message) {
            return (PushResult) GsonUtil.fromJson(message, PushResult.class);
        }

        HttpURLConnection conn = HttpUtil.CreatePostHttpConnection(rongCloud.getConfig(), appKey, appSecret, "/push.json",
                "application/json");

        HttpUtil.setBodyParameter(push.toString(), conn, rongCloud.getConfig());

        PushResult result = null;
        String response = "";
        try {
            response = HttpUtil.returnResult(conn, rongCloud.getConfig());
            result = (PushResult) GsonUtil.fromJson(CommonUtil.getResponseByCode(PATH, CheckMethod.PUSH, response), PushResult.class);
        } catch (JSONException | JsonParseException | IllegalStateException e) {
            rongCloud.getConfig().errorCounter.incrementAndGet();
            result = new PushResult(500, "");
            result.setErrorMessage("request:" + conn.getURL() + " ,response:" + response + " ,JSONException:" + e.getMessage());
        }
        result.setReqBody(push.toString());
        return result;
    }

}