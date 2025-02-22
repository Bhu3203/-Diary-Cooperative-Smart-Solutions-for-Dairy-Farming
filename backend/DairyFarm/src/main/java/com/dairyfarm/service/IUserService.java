package com.dairyfarm.service;

import java.io.UnsupportedEncodingException;
import java.util.List;

import com.dairyfarm.dto.LoginRequest;
import com.dairyfarm.dto.LoginResponse;
import com.dairyfarm.dto.UserDto;

import jakarta.mail.MessagingException;


public interface IUserService {
Boolean register(UserDto user)throws UnsupportedEncodingException, MessagingException;

List<UserDto> getAllUser();

String deleteUserById(Integer id);

   LoginResponse login(LoginRequest loginRequest);
}
