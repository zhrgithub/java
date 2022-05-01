package com.ipstudy.utils;

import com.alibaba.fastjson.JSONObject;
import com.ipstudy.common.Api;
import com.ipstudy.config.WeatherConfig;
import com.ipstudy.pojo.Weather;
import com.ipstudy.utils.http.HttpRequest;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.util.ObjectUtils;
import org.springframework.util.StringUtils;

/**
 * @author zhr_java@163.com
 * @date 2022/5/1 16:22
 */
public class WeatherUtil {

    private static final Logger log = LoggerFactory.getLogger(WeatherUtil.class);

    public static Weather getWeatherByIp(String ip) {

        Weather weather;
        String params = "ip=" + ip + "&appid=" + WeatherConfig.AppId + "&appsecret=" + WeatherConfig.AppSecret;
        try {
            String rspStr = HttpRequest.sendGet(Api.weatherUrl, params, Api.GBK);
            if (ObjectUtils.isEmpty(rspStr)) {
                log.error("获取天气异常 {}", ip);
                return null;
            }
            System.out.println(rspStr);
            JSONObject obj = JSONObject.parseObject(rspStr);
            String errCode = obj.getString("errcode");
            if (!StringUtils.isEmpty(errCode)){
                return null;
            }
            String cityid = obj.getString("cityid");
            String city = obj.getString("city");
            String updateTime = obj.getString("update_time");
            String wea = obj.getString("wea");
            String weaImg = obj.getString("wea_img");
            String tem = obj.getString("tem");
            String temDay = obj.getString("tem_day");
            String temNight = obj.getString("tem_night");
            String win = obj.getString("win");
            String winSpeed = obj.getString("");
            String winMeter = obj.getString("win_meter");
            String air = obj.getString("air");

            weather = new Weather();
            weather.setCityId(cityid);
            weather.setCity(city);
            weather.setUpdateTime(updateTime);
            weather.setWea(wea);
            weather.setWeaImg(weaImg);
            weather.setTem(tem);
            weather.setTemDay(temDay);
            weather.setTemNight(temNight);
            weather.setWin(win);
            weather.setWinSpeed(winSpeed);
            weather.setWinMeter(winMeter);
            weather.setAir(air);
            return weather;
        } catch (Exception e) {
            log.error("获取天气异常 {}", e);
            return null;
        }
    }

}
