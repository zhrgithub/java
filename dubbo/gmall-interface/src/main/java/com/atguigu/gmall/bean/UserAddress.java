package com.atguigu.gmall.bean;

import lombok.Data;

import java.io.Serializable;

/**
 * @author zhr_java@163.com
 * @date 2022/5/11 10:21
 */
@Data
public class UserAddress implements Serializable {
    private String address;
    private String userId;
    private String phone;
    private String userName;

    public UserAddress(String address, String userId, String phone, String userName) {
        this.address = address;
        this.userId = userId;
        this.phone = phone;
        this.userName = userName;
    }

}
