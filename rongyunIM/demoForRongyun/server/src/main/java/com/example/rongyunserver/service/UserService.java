package com.example.rongyunserver.service;

import com.baomidou.mybatisplus.extension.service.IService;
import com.example.rongyunserver.dto.User;
import com.example.rongyunserver.utils.R;

public interface UserService extends IService<User> {

    //新增用户
    public int add(User user);

    //删除用户
    public int delUser(String id);

    //修改用户
    public int modifyUser(User user);

    //根据ID查询用户
    public User getInfoById(String id);


}
