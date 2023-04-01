package com.mjm.busroutes.service;

import com.baomidou.mybatisplus.extension.service.IService;
import com.mjm.busroutes.pojo.SysUser;
import com.mjm.busroutes.util.R;


public interface SysUserService extends IService<SysUser> {
    R findList(Integer currentPage,Integer pageSize);
}
