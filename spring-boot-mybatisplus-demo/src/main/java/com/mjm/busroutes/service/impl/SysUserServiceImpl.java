package com.mjm.busroutes.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.mjm.busroutes.mapper.SysUserMapper;
import com.mjm.busroutes.pojo.SysUser;
import com.mjm.busroutes.service.SysUserService;
import com.mjm.busroutes.util.R;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.ObjectUtils;

import java.util.List;

@Service
public class SysUserServiceImpl extends ServiceImpl<SysUserMapper, SysUser> implements SysUserService {

    @Autowired
    private SysUserMapper sysUserMapper;

    @Override
    public R findList(Integer currentPage, Integer pageSize) {
        List<SysUser> sysUserList =null;
        if (ObjectUtils.isEmpty(currentPage)||ObjectUtils.isEmpty(pageSize)){
            return R.error("参数错误");
        }
        Page<SysUser> page = new Page<>(currentPage,pageSize);
        QueryWrapper<SysUser> sysUserQueryWrapper = new QueryWrapper<>();
        IPage<SysUser> sysUserIPage = sysUserMapper.selectPage(page,sysUserQueryWrapper);
        return R.success().setData("sys_user_list",sysUserIPage.getRecords());
    }
}
