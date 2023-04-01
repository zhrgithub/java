package com.example.rongyunserver.controller;

import com.example.rongyunserver.dto.User;
import com.example.rongyunserver.service.UserService;
import com.example.rongyunserver.utils.R;
import com.example.rongyunserver.utils.example.user.UserExample;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.util.ObjectUtils;
import org.springframework.web.bind.annotation.*;

import java.util.Map;


@RestController("rongYunController")
@RequestMapping("/rongyun")
@CrossOrigin
public class RongYunController {

    @Autowired
    private UserService userService;

    /**
     * 新增、删除、修改
     *
     * @param requestObject
     * @return
     * @throws Exception
     */
    @PostMapping("addOrUpdateOrDel")
    public R addOrUpdateOrDel(@RequestBody Map<String, Object> requestObject) throws Exception {
        //0表示新增，1表示删除，2表示修改
        int status = (int) requestObject.get("status");
        Object obj = requestObject.get("user");
        ObjectMapper objectMapper = new ObjectMapper();
        User user = objectMapper.convertValue(obj, User.class);

        if (status == 0) {
            if (ObjectUtils.isEmpty(userService.getInfoById(user.getSenderId()))) {
                String token = UserExample.getToken(user.getSenderId(), user.getSenderName(), user.getSenderAvatar());
                user.setToken(token);
                return R.success().setData("message", userService.add(user)).setData("token", token);
            }
        } else if (status == 1) {
            return R.success().setData("message", userService.delUser(user.getSenderId()));
        } else if (status == 2) {
            return R.success().setData("message", userService.modifyUser(user));
        }

        return R.error();
    }

    /**
     * 获取token
     *
     * @param requestObject
     * @return
     * @throws Exception
     */
    @PostMapping("getToken")
    public R getToken(@RequestBody Map<String, Object> requestObject) throws Exception {
        Object obj = requestObject.get("sendUser");
        ObjectMapper objectMapper = new ObjectMapper();
        User user = objectMapper.convertValue(obj, User.class);
        String token = UserExample.getToken(user.getSenderId(), user.getSenderName(), user.getSenderAvatar());
        return R.success().setData("token", token);
    }


    //查询用户信息
    @PostMapping("find")
    public R find(String id) {
        return R.success().setData("user", userService.getInfoById(id));
    }

}
