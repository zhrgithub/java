package com.ipstudy.utils;

import com.alibaba.fastjson.JSONObject;
import com.ipstudy.common.Api;
import com.ipstudy.pojo.Address;
import com.ipstudy.utils.http.HttpRequest;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.util.ObjectUtils;

/**
 * 获取地址类
 *
 * @author ruoyi
 */
public class AddressUtil {

    private static final Logger log = LoggerFactory.getLogger(AddressUtil.class);


    public static Address getRealAddressByIP(String ip) {

        Address address;
        try {
            String rspStr = HttpRequest.sendGet(Api.addressUrl,"ip="+ip+"&json=true",Api.GBK);
            if (ObjectUtils.isEmpty(rspStr)) {
                log.error("获取地理位置异常 {}", ip);
                return null;
            }
            JSONObject obj = JSONObject.parseObject(rspStr);
            String province = obj.getString("pro");
            String city = obj.getString("city");
            String addr =obj.getString("addr");
            String region = obj.getString("region");

            address = new Address();
            address.setCity(city);
            address.setProvince(province);
            address.setRegion(region);
            address.setAddr(addr);
            return address;
        } catch (Exception e) {
            log.error("获取地理位置异常 {}", e);
            return null;
        }
    }

}
