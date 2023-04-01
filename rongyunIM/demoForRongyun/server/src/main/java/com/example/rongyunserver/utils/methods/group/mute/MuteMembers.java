package com.example.rongyunserver.utils.methods.group.mute;

import com.example.rongyunserver.utils.RongCloud;
import com.example.rongyunserver.utils.models.CheckMethod;
import com.example.rongyunserver.utils.models.Result;
import com.example.rongyunserver.utils.models.group.GroupMember;
import com.example.rongyunserver.utils.models.group.GroupModel;
import com.example.rongyunserver.utils.models.response.GroupMuteMembersListResult;
import com.example.rongyunserver.utils.models.response.ListGagGroupUserResult;
import com.example.rongyunserver.utils.models.response.ResponseResult;
import com.example.rongyunserver.utils.util.CommonUtil;
import com.example.rongyunserver.utils.util.GsonUtil;
import com.example.rongyunserver.utils.util.HttpUtil;

import java.net.HttpURLConnection;
import java.net.URLEncoder;

/**
 * 群组成员禁言服务
 * docs : http://www.rongcloud.cn/docs/server.html#group_user_gag
 *
 * */
public class MuteMembers {
    private static final String UTF8 = "UTF-8";
    private static final String PATH = "group/mute/members";
    private String appKey;
    private String appSecret;
    private RongCloud rongCloud;

    public RongCloud getRongCloud() {
        return rongCloud;
    }
    public void setRongCloud(RongCloud rongCloud) {
        this.rongCloud = rongCloud;
    }
    public MuteMembers(String appKey, String appSecret, RongCloud rongCloud) {
        this.appKey = appKey;
        this.appSecret = appSecret;
        this.rongCloud = rongCloud;

    }
    /**
     * 添加禁言群成员方法（在 App 中如果不想让某一用户在群中发言时，可将此用户在群组中禁言，被禁言用户可以接收查看群组中用户聊天信息，但不能发送消息。）
     *
     * @param group:群组信息。id , munite , memberIds（必传）
     *
     * @return Result
     **/
    public Result add(GroupModel group) throws Exception {
        String message = CommonUtil.checkFiled(group,PATH,CheckMethod.ADD);
        if(null != message){
            return (ResponseResult)GsonUtil.fromJson(message,ResponseResult.class);
        }

        StringBuilder sb = new StringBuilder();
        GroupMember[] members = group.getMembers();
        for(GroupMember member : members){
            sb.append("&userId=").append(URLEncoder.encode(member.getId(), UTF8));
        }
        sb.append("&groupId=").append(URLEncoder.encode(group.getId(), UTF8));
        sb.append("&minute=").append(URLEncoder.encode(group.getMinute().toString(), UTF8));
        String body = sb.toString();
        if (body.indexOf("&") == 0) {
            body = body.substring(1, body.length());
        }

        HttpURLConnection conn = HttpUtil.CreatePostHttpConnection(rongCloud.getConfig(), appKey, appSecret, "/group/user/gag/add.json", "application/x-www-form-urlencoded");
        HttpUtil.setBodyParameter(body, conn, rongCloud.getConfig());

        return (ResponseResult) GsonUtil.fromJson(CommonUtil.getResponseByCode(PATH,CheckMethod.ADD,HttpUtil.returnResult(conn, rongCloud.getConfig())), ResponseResult.class);
    }

    /**
     * 查询被禁言群成员方法
     *
     * @param  groupId:群组Id。（必传）
     *
     * @return ListGagGroupUserResult
     **/
    public GroupMuteMembersListResult getList(String groupId) throws Exception {
        String message = CommonUtil.checkParam("id",groupId,PATH,CheckMethod.GETLIST);
        if(null != message){
            return (GroupMuteMembersListResult)GsonUtil.fromJson(message,ListGagGroupUserResult.class);
        }
        StringBuilder sb = new StringBuilder();
        sb.append("&groupId=").append(URLEncoder.encode(groupId, UTF8));
        String body = sb.toString();
        if (body.indexOf("&") == 0) {
            body = body.substring(1, body.length());
        }

        HttpURLConnection conn = HttpUtil.CreatePostHttpConnection(rongCloud.getConfig(), appKey, appSecret, "/group/user/gag/list.json", "application/x-www-form-urlencoded");
        HttpUtil.setBodyParameter(body, conn, rongCloud.getConfig());

        return (GroupMuteMembersListResult) GsonUtil.fromJson(CommonUtil.getResponseByCode(PATH,CheckMethod.GETLIST,HttpUtil.returnResult(conn, rongCloud.getConfig())), GroupMuteMembersListResult.class);
    }

    /**
     * 移除禁言群成员方法
     *
     * @param  group:群组（必传）
     *
     * @return ResponseResult
     **/
    public Result remove(GroupModel group) throws Exception {
        //参数校验
        String message = CommonUtil.checkFiled(group,PATH, CheckMethod.REMOVE);
        if(null != message){
            return (ResponseResult)GsonUtil.fromJson(message,ResponseResult.class);
        }
        StringBuilder sb = new StringBuilder();

        GroupMember[] members = group.getMembers();
        for(GroupMember member : members){
            sb.append("&userId=").append(URLEncoder.encode(member.getId(), UTF8));
        }

        sb.append("&groupId=").append(URLEncoder.encode(group.getId(), UTF8));
        String body = sb.toString();
        if (body.indexOf("&") == 0) {
            body = body.substring(1, body.length());
        }

        HttpURLConnection conn = HttpUtil.CreatePostHttpConnection(rongCloud.getConfig(), appKey, appSecret, "/group/user/gag/rollback.json", "application/x-www-form-urlencoded");
        HttpUtil.setBodyParameter(body, conn, rongCloud.getConfig());

        return (ResponseResult) GsonUtil.fromJson(CommonUtil.getResponseByCode(PATH,CheckMethod.REMOVE,HttpUtil.returnResult(conn, rongCloud.getConfig())), ResponseResult.class);
    }
}

