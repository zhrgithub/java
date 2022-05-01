package com.ipstudy.controller;

import com.ipstudy.pojo.Address;
import com.ipstudy.utils.AddressUtil;
import com.ipstudy.utils.IpUtils;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

/**
 * @author zhr_java@163.com
 * @date 2022/5/1 15:16
 */
@RestController
@RequestMapping("ip")
public class AddressController {

    @GetMapping("address")
    public Address getAddress() {

        Address address = null;
        try {
            address = AddressUtil.getRealAddressByIP(IpUtils.getIpAddress());
            return address;
        } catch (Exception e) {
            return null;
        }
    }

}
