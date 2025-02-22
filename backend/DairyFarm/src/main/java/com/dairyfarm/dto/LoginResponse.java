package com.dairyfarm.dto;

import java.util.List;

import com.dairyfarm.dto.UserDto.RoleDto;
import com.dairyfarm.entity.Role;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class LoginResponse {
	private String token;
	
	private UserDto userDto;
	private List<String> roles;
}
