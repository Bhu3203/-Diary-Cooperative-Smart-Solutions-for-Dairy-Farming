package com.dairyfarm.dto;


import lombok.Builder;
import lombok.Data;


@Data
@Builder
public class LoginRequest {
	public String email;
	public String password;
}
