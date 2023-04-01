package com.example.rongyunserver.dto;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;
import lombok.ToString;

@Data
@ToString
@TableName(value = "t_user")
public class User {

    // 发送者ID
    @TableId(value = "sender_id", type = IdType.ASSIGN_UUID)
    private String senderId;

    // 发送者姓名
    @TableField(value = "sender_name")
    private String senderName;

    // 发送者头像
    @TableField(value = "sender_avatar")
    private String senderAvatar;

    // 接收人ID
    @TableField(value = "receiver_id")
    private String receiverId;

    // 接收人姓名
    @TableField(value = "receiver_name")
    private String receiverName;

    // 接收人头像
    @TableField(value = "receiver_avatar")
    private String receiverAvatar;

    //token
    @TableField(value = "token")
    private String token;






}
