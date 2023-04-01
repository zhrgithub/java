package com.example.rongyunserver.utils.methods.message.expansion;

import com.alibaba.fastjson.JSONException;
import com.example.rongyunserver.utils.RongCloud;
import com.example.rongyunserver.utils.models.CheckMethod;
import com.example.rongyunserver.utils.models.Result;
import com.example.rongyunserver.utils.models.message.ExpansionModel;
import com.example.rongyunserver.utils.models.response.ExpansionResult;
import com.example.rongyunserver.utils.models.response.ResponseResult;
import com.example.rongyunserver.utils.util.CommonUtil;
import com.example.rongyunserver.utils.util.GsonUtil;
import com.example.rongyunserver.utils.util.HttpUtil;
import com.fasterxml.jackson.core.JsonParseException;

import java.net.HttpURLConnection;
import java.net.URLEncoder;

/**
 * 消息扩展
 * docs: "https://doc.rongcloud.cn/imserver/server/v1/message/expansion"
 */
public class Expansion {
    private static final String UTF8 = "UTF-8";
    private static final String PATH = "message/expansion";
    private String appKey;
    private String appSecret;
    private RongCloud rongCloud;

    public RongCloud getRongCloud() {
        return rongCloud;
    }

    public void setRongCloud(RongCloud rongCloud) {
        this.rongCloud = rongCloud;
    }

    public Expansion(String appKey, String appSecret) {
        this.appKey = appKey;
        this.appSecret = appSecret;

    }


    /**
     * 设置消息扩展
     *
     * @param msg : 消息扩展参数
     * @return Result
     **/
    public ResponseResult set(ExpansionModel msg) throws Exception {
        String message = CommonUtil.checkFiled(msg, PATH, CheckMethod.SET);
        if (null != message) {
            return (ResponseResult) GsonUtil.fromJson(message, ResponseResult.class);
        }

        StringBuilder sb = new StringBuilder();
        sb.append("&msgUID=").append(URLEncoder.encode(msg.getMsgUID(), UTF8));
        sb.append("&conversationType=").append(URLEncoder.encode(msg.getConversationType().toString(), UTF8));
        sb.append("&userId=").append(URLEncoder.encode(msg.getUserId(), UTF8));
        sb.append("&targetId=").append(URLEncoder.encode(msg.getTargetId(), UTF8));
        sb.append("&extraKeyVal=").append(URLEncoder.encode(GsonUtil.toJson(msg.getExtraKeyVal()), UTF8));
        String body = sb.toString();
        if (body.indexOf("&") == 0) {
            body = body.substring(1, body.length());
        }

        HttpURLConnection conn = HttpUtil.CreatePostHttpConnection(rongCloud.getConfig(), appKey, appSecret,
                "/message/expansion/set.json", "application/x-www-form-urlencoded");
        HttpUtil.setBodyParameter(body, conn, rongCloud.getConfig());

        ResponseResult result = null;
        String response = "";
        try {
            response = HttpUtil.returnResult(conn, rongCloud.getConfig());
            result = (ResponseResult) GsonUtil.fromJson(CommonUtil.getResponseByCode(PATH, CheckMethod.SET, response), ResponseResult.class);
        } catch (JSONException | JsonParseException | IllegalStateException e) {
            rongCloud.getConfig().errorCounter.incrementAndGet();
            result = new ResponseResult(500, "request:" + conn.getURL() + " ,response:" + response + " ,JSONException:" + e.getMessage());
        }
        result.setReqBody(body);
        return result;
    }

    /**
     * 删除消息扩展
     *
     * @param msg : 消息扩展参数
     * @return ResponseResult
     **/
    public ResponseResult remove(ExpansionModel msg) throws Exception {
        //参数校验
        String message = CommonUtil.checkFiled(msg, PATH, CheckMethod.REMOVE);
        if (null != message) {
            return (ResponseResult) GsonUtil.fromJson(message, ResponseResult.class);
        }

        StringBuilder sb = new StringBuilder();
        sb.append("&msgUID=").append(URLEncoder.encode(msg.getMsgUID(), UTF8));
        sb.append("&conversationType=").append(URLEncoder.encode(msg.getConversationType().toString(), UTF8));
        sb.append("&userId=").append(URLEncoder.encode(msg.getUserId(), UTF8));
        sb.append("&targetId=").append(URLEncoder.encode(msg.getTargetId(), UTF8));
        sb.append("&extraKey=").append(URLEncoder.encode(GsonUtil.toJson(msg.getExtraKey()), UTF8));
        String body = sb.toString();
        if (body.indexOf("&") == 0) {
            body = body.substring(1, body.length());
        }

        HttpURLConnection conn = HttpUtil.CreatePostHttpConnection(rongCloud.getConfig(), appKey, appSecret,
                "/message/expansion/delete.json", "application/x-www-form-urlencoded");
        HttpUtil.setBodyParameter(body, conn, rongCloud.getConfig());

        ResponseResult result = null;
        String response = "";
        try {
            response = HttpUtil.returnResult(conn, rongCloud.getConfig());
            result = (ResponseResult) GsonUtil.fromJson(CommonUtil.getResponseByCode(PATH, CheckMethod.REMOVE, response), ResponseResult.class);
        } catch (JSONException | JsonParseException | IllegalStateException e) {
            rongCloud.getConfig().errorCounter.incrementAndGet();
            result = new ResponseResult(500, "request:" + conn.getURL() + " ,response:" + response + " ,JSONException:" + e.getMessage());
        }
        result.setReqBody(body);
        return result;
    }

    /**
     * 获取扩展信息
     *
     * @return ExpansionResult
     **/
    public Result getList(String msgUID, String pageNo) throws Exception {
        //参数校验
        String message = CommonUtil.checkParam("msgUID", msgUID, PATH, CheckMethod.GETLIST);
        if (null != message) {
            return (ResponseResult) GsonUtil.fromJson(message, ResponseResult.class);
        }
        StringBuilder sb = new StringBuilder();
        sb.append("&msgUID=").append(URLEncoder.encode(msgUID, UTF8));
        if (pageNo != null) {
            sb.append("&pageNo=").append(URLEncoder.encode(pageNo, UTF8));
        }
        String body = sb.toString();
        if (body.indexOf("&") == 0) {
            body = body.substring(1, body.length());
        }

        HttpURLConnection conn = HttpUtil.CreatePostHttpConnection(rongCloud.getConfig(), appKey, appSecret,
                "/message/expansion/query.json", "application/x-www-form-urlencoded");
        HttpUtil.setBodyParameter(body, conn, rongCloud.getConfig());

        ExpansionResult result = null;
        String response = "";
        try {
            response = HttpUtil.returnResult(conn, rongCloud.getConfig());
            result = (ExpansionResult) GsonUtil.fromJson(CommonUtil.getResponseByCode(PATH, CheckMethod.GETLIST, response), ExpansionResult.class);
        } catch (JSONException | JsonParseException | IllegalStateException e) {
            rongCloud.getConfig().errorCounter.incrementAndGet();
            result = new ExpansionResult(500, "request:" + conn.getURL() + " ,response:" + response + " ,JSONException:" + e.getMessage());
        }
        result.setReqBody(body);
        return result;
    }

    public Result getList(String msgUID) throws Exception {
        return getList(msgUID, null);
    }
}
