package com.example.rongyunserver.utils.methods.chatroom.block;

import com.example.rongyunserver.utils.RongCloud;
import com.example.rongyunserver.utils.models.*;
import com.example.rongyunserver.utils.models.chatroom.ChatroomMember;
import com.example.rongyunserver.utils.models.chatroom.ChatroomModel;
import com.example.rongyunserver.utils.models.response.ListBlockChatroomUserResult;
import com.example.rongyunserver.utils.models.response.ResponseResult;
import com.example.rongyunserver.utils.util.CommonUtil;
import com.example.rongyunserver.utils.util.GsonUtil;
import com.example.rongyunserver.utils.util.HttpUtil;

import java.net.HttpURLConnection;
import java.net.URLEncoder;

/**
 *
 * 聊天室封禁服务
 * docs: "http://www.rongcloud.cn/docs/server.html#chatroom_user_block"
 *
 * */
public class Block {
    private static final String UTF8 = "UTF-8";
    private static final String PATH = "chatroom/block";
    private String appKey;
    private String appSecret;
    private RongCloud rongCloud;

    public RongCloud getRongCloud() {
        return rongCloud;
    }
    public void setRongCloud(RongCloud rongCloud) {
        this.rongCloud = rongCloud;
    }
    public Block(String appKey, String appSecret) {
        this.appKey = appKey;
        this.appSecret = appSecret;

    }
    /**
     * 添加封禁聊天室成员方法
     *
     * @param  chatroom:聊天室信息，memberIds（必传支持多个最多20个）,minute:封禁时长，以分钟为单位，最大值为43200分钟。（必传）
     *
     * @return ResponseResult
     **/
    public ResponseResult add(ChatroomModel chatroom) throws Exception {
        String message = CommonUtil.checkFiled(chatroom,PATH, CheckMethod.ADD);
        if(null != message){
            return (ResponseResult)GsonUtil.fromJson(message,ResponseResult.class);
        }
        StringBuilder sb = new StringBuilder();
        ChatroomMember[] members = chatroom.getMembers();
        for(ChatroomMember member : members){
            sb.append("&userId=").append(URLEncoder.encode(member.getId(), UTF8));
        }
        sb.append("&chatroomId=").append(URLEncoder.encode(chatroom.getId().toString(), UTF8));
        sb.append("&minute=").append(URLEncoder.encode(chatroom.getMinute().toString(), UTF8));
        String body = sb.toString();
        if (body.indexOf("&") == 0) {
            body = body.substring(1, body.length());
        }

        HttpURLConnection conn = HttpUtil.CreatePostHttpConnection(rongCloud.getConfig(), appKey, appSecret,
                "/chatroom/user/block/add.json", "application/x-www-form-urlencoded");
        HttpUtil.setBodyParameter(body, conn, rongCloud.getConfig());

        return (ResponseResult) GsonUtil.fromJson(CommonUtil.getResponseByCode(PATH,CheckMethod.ADD,HttpUtil.returnResult(conn, rongCloud.getConfig())), ResponseResult.class);
    }

    /**
     * 查询被封禁聊天室成员方法
     *
     * @param  chatroomId:聊天室 Id。（必传）
     *
     * @return ListBlockChatroomUserResult
     **/
    public ListBlockChatroomUserResult getList(String chatroomId) throws Exception {
        String message = CommonUtil.checkParam("id",chatroomId,PATH,CheckMethod.GETLIST);
        if(null != message){
            return (ListBlockChatroomUserResult)GsonUtil.fromJson(message,ListBlockChatroomUserResult.class);
        }
        StringBuilder sb = new StringBuilder();
        sb.append("&chatroomId=").append(URLEncoder.encode(chatroomId.toString(), UTF8));
        String body = sb.toString();
        if (body.indexOf("&") == 0) {
            body = body.substring(1, body.length());
        }

        HttpURLConnection conn = HttpUtil.CreatePostHttpConnection(rongCloud.getConfig(), appKey, appSecret, "/chatroom/user/block/list.json", "application/x-www-form-urlencoded");
        HttpUtil.setBodyParameter(body, conn, rongCloud.getConfig());

        return (ListBlockChatroomUserResult) GsonUtil.fromJson(CommonUtil.getResponseByCode(PATH,CheckMethod.GETLIST,HttpUtil.returnResult(conn, rongCloud.getConfig())), ListBlockChatroomUserResult.class);
    }

    /**
     * 移除封禁聊天室成员方法
     *
     * @param  chatroom: 封禁的聊天室信息 其中聊天室 Id。（必传）,用户 Id。（必传）
     *
     * @return ResponseResult
     **/
    public ResponseResult remove(ChatroomModel chatroom) throws Exception {
        String message = CommonUtil.checkFiled(chatroom,PATH,CheckMethod.REMOVE);
        if(null != message){
            return (ResponseResult)GsonUtil.fromJson(message,ResponseResult.class);
        }

        StringBuilder sb = new StringBuilder();
        ChatroomMember[] members = chatroom.getMembers();
        for(ChatroomMember member : members){
            sb.append("&userId=").append(URLEncoder.encode(member.getId(), UTF8));
        }
        sb.append("&chatroomId=").append(URLEncoder.encode(chatroom.getId().toString(), UTF8));
        String body = sb.toString();
        if (body.indexOf("&") == 0) {
            body = body.substring(1, body.length());
        }

        HttpURLConnection conn = HttpUtil.CreatePostHttpConnection(rongCloud.getConfig(), appKey, appSecret, "/chatroom/user/block/rollback.json", "application/x-www-form-urlencoded");
        HttpUtil.setBodyParameter(body, conn, rongCloud.getConfig());

        return (ResponseResult) GsonUtil.fromJson(CommonUtil.getResponseByCode(PATH,CheckMethod.REMOVE,HttpUtil.returnResult(conn, rongCloud.getConfig())), ResponseResult.class);
    }
}
