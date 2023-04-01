package com.example.rongyunserver.dto;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;
import lombok.ToString;

@Data
@ToString
@TableName(value = "t_new_info")
public class NewInfo {

    // 消息ID
    @TableId(value = "id", type = IdType.ASSIGN_UUID)
    private String id;

    // 发送者ID
    @TableField(value = "client_id")
    private String clientId;

    // 发送者昵称
    @TableField(value = "nick_name")
    private String nickName;

    // 发送者头像
    @TableField(value = "avatar")
    private String avatar;

    // 更新时间
    @TableField(value = "update_time")
    private String updateTime;

    // 消息状态
    @TableField(value = "status")
    private String status;

}
