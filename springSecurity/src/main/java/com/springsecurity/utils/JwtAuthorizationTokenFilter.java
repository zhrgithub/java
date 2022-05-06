package com.springsecurity.utils;

import io.jsonwebtoken.ExpiredJwtException;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

/**
 * @author zhr_java@163.com
 * @date 2022/5/5 18:00
 */
@Component
public class JwtAuthorizationTokenFilter extends OncePerRequestFilter {

  private final UserDetailsService userDetailsService;
  private final JwtTokenUtil jwtTokenUtil;
  private final String tokenHeader;

  public JwtAuthorizationTokenFilter(
      @Qualifier("jwtUserDetailsService") UserDetailsService userDetailsService,
      JwtTokenUtil jwtTokenUtil,
      @Value("${jwt.token}") String tokenHeader) {
    this.userDetailsService = userDetailsService;
    this.jwtTokenUtil = jwtTokenUtil;
    this.tokenHeader = tokenHeader;
  }

  @Override
  protected void doFilterInternal(
      HttpServletRequest request, HttpServletResponse response, FilterChain chain)
      throws ServletException, IOException {
    final String authToken = request.getHeader(this.tokenHeader);
    System.out.println(authToken);
    String username = null;
    if (authToken != null) {
      try {
        username = jwtTokenUtil.getUsernameFromToken(authToken);
        System.out.println(username);
      } catch (ExpiredJwtException e) {
      }
    }

    if (username != null && SecurityContextHolder.getContext().getAuthentication() == null) {

      UserDetails userDetails = this.userDetailsService.loadUserByUsername(username);

      if (jwtTokenUtil.validateToken(authToken, userDetails)) {
        UsernamePasswordAuthenticationToken authentication =
            new UsernamePasswordAuthenticationToken(
                userDetails, null, userDetails.getAuthorities());
        SecurityContextHolder.getContext().setAuthentication(authentication);
      }
    }
    chain.doFilter(request, response);
  }
}
