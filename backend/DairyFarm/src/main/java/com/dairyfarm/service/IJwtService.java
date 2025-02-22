package com.dairyfarm.service;

import org.springframework.security.core.userdetails.UserDetails;

import com.dairyfarm.entity.User;

public interface IJwtService {
	String generateJwToken(User user);
	
	String extractUserName(String token);
	Boolean validateToken(String token, UserDetails userDetails);
}
