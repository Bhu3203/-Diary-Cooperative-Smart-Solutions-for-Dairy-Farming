package com.dairyfarm.config.security;

import java.io.IOException;

//import org.hibernate.annotations.Comment;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;
import com.dairyfarm.service.JwtService;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
@Component
public class JwtFilter extends OncePerRequestFilter {

	@Autowired
	private CustomUserDetailsService userDetailsService;
	
	@Autowired
	private JwtService jwtService;
	
	@Override
	protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
			throws ServletException, IOException {
		String authHeader =request.getHeader("Authorization");
		String token =null;
		//JwtException
		try {
			if(authHeader !=null && authHeader.startsWith("Bearer ")){
				token= authHeader.substring(7);
				String userName=jwtService.extractUserName(token);
				if(userName !=null && SecurityContextHolder.getContext().getAuthentication()==null) {
					
					UserDetails userDetails=  userDetailsService.loadUserByUsername(userName);
					Boolean isValidated= jwtService.validateToken(token, userDetails);
					if(isValidated) {
						UsernamePasswordAuthenticationToken authentication = 
								new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());
						
						authentication.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
						SecurityContextHolder.getContext().setAuthentication(authentication);
					}
				}
			}
		} catch (Exception e) {
			
			response.setContentType("application/json");
			response.setStatus(HttpStatus.UNAUTHORIZED.value());
			response.getWriter().write(e.getMessage());
			//jar hite exception all tar application stop karyna sathi return dila aahe nahi tar te fudcha part run karel
			return;
		}
		filterChain.doFilter(request, response);
	}

	
}
