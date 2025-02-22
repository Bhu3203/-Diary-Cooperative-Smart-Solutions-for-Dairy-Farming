package com.dairyfarm.controller;

import java.io.UnsupportedEncodingException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.util.CollectionUtils;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.dairyfarm.dto.LoginRequest;
import com.dairyfarm.dto.LoginResponse;
import com.dairyfarm.dto.UserDto;
import com.dairyfarm.service.IUserService;


import jakarta.mail.MessagingException;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin("*")
public class AuthController {

	@Autowired
	private IUserService userService;
	
	@PostMapping("/register")
	public ResponseEntity<?>registerUser(@RequestBody UserDto userDto) throws UnsupportedEncodingException, MessagingException{
		Boolean isRegistered = userService.register(userDto);
		if(isRegistered) {
			return new ResponseEntity<>("User Registered Successfully", HttpStatus.CREATED);
		}else {
			return new ResponseEntity<>("User Registered Failed", HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}@PostMapping("/login")
	public ResponseEntity<?>LoginUser(@RequestBody LoginRequest loginRequest) throws UnsupportedEncodingException, MessagingException{
		LoginResponse loginResponse = userService.login(loginRequest);
		
			return ResponseEntity.ok(loginResponse);	
	}

}
