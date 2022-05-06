package com.springsecurity.service;

import com.springsecurity.config.SecurityUserDetails;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

/**
 * @author zhr_java@163.com
 * @date 2022/5/5 17:52
 */
@Service
public class JwtUserDetailsService implements UserDetailsService {

    @Override
    public UserDetails loadUserByUsername(String user) throws UsernameNotFoundException {
        System.out.println("JwtUserDetailsService:" + user);
        List<GrantedAuthority> authorityList = new ArrayList<>();
        /**
         * 此处可以从数据库中查询用户具有的角色，然后进行授权
         */
        authorityList.add(new SimpleGrantedAuthority("ROLE_ADMIN"));
        return new SecurityUserDetails(user,authorityList);
    }

}

