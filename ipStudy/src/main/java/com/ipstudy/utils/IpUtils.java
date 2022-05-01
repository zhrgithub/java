package com.ipstudy.utils;

import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

/**
 * @author zhr_java@163.com
 * @date 2022/5/1 17:05
 */
public class IpUtils {

    public static String getIpAddress(){
        ServletRequestAttributes servletRequestAttributes = (ServletRequestAttributes) RequestContextHolder.getRequestAttributes();
        return servletRequestAttributes.getRequest().getRemoteHost();
    };

}
