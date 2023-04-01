package com.mjm.busroutes.util;

import com.mjm.busroutes.constant.RestCode;
import lombok.Getter;
import lombok.ToString;

import java.io.Serializable;
import java.util.HashMap;
import java.util.Map;

@Getter
@ToString
public class R implements Serializable {
    // 响应编码
    private Integer code;
    // 响应信息
    private String message;
    // 响应数据
    private Map<String,Object> data = new HashMap<>();

    public static R success() {
        R r = new R();
        r.code = RestCode.SUCCESS;
        r.message = "当前请求操作成功";
        return r;
    }

    public static R success(String message) {
        R r = new R();
        r.code = RestCode.SUCCESS;
        r.message = message;
        return r;
    }

    public static R unAuthorize() {
        R r = new R();
        r.code = RestCode.UN_AUTHORIZE;
        r.message = "未登录";
        return r;
    }

    public static R error() {
        R r = new R();
        r.code = RestCode.ERROR;
        r.message = "当前请求操作失败";
        return r;
    }

    public static R error(String message) {
        R r = new R();
        r.code = RestCode.ERROR;
        r.message = message;
        return r;
    }

    public R setMessage(String message) {
        this.message = message;
        return this;
    }

    public R setData(String key, Object value) {
        this.data.put(key, value);
        return this;
    }
}
