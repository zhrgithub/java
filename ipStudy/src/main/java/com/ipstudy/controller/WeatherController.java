package com.ipstudy.controller;

import com.ipstudy.pojo.Weather;
import com.ipstudy.utils.IpUtils;
import com.ipstudy.utils.WeatherUtil;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

/**
 * @author zhr_java@163.com
 * @date 2022/5/1 16:13
 */
@RestController
@RequestMapping("weather")
public class WeatherController {

    @RequestMapping("search")
    public Weather searWeather() {
        try {
            return WeatherUtil.getWeatherByIp(IpUtils.getIpAddress());
        } catch (Exception e) {
            return null;
        }

    }

}
