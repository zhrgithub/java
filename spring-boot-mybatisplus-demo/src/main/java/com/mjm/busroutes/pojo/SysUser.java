package com.mjm.busroutes.pojo;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;
import lombok.ToString;

import java.io.Serializable;

@Data
@ToString
@TableName("tb_user")
public class SysUser implements Serializable {

    @TableId(value = "id",type = IdType.UUID)
    private String id;

    @TableField(value = "name")
    private String name;

    @TableField(value = "pass_word")
    private String passWord;
}
