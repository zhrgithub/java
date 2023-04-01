package com.itheima.service;

import com.itheima.domain.User;
import org.springframework.context.annotation.Configuration;
import org.springframework.stereotype.Service;


public interface UserService {
    User findByName(String name);

    User findById(Integer id);
}
