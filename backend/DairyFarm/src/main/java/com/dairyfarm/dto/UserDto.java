package com.dairyfarm.dto;

import java.util.List;

import com.dairyfarm.entity.Role;
import com.dairyfarm.entity.User;

import jakarta.persistence.CascadeType;

import jakarta.persistence.FetchType;
import jakarta.persistence.OneToMany;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@AllArgsConstructor
@Setter
@Getter
@Builder
public class UserDto {

	private Integer id;
	private String firstName;
	private String lastName;
	private String email;
	private String mobile;
	private String password;
	
	
	@OneToMany(cascade = CascadeType.ALL, fetch = FetchType.EAGER)

	private List<RoleDto> roles;
	
	@NoArgsConstructor
	@AllArgsConstructor
	@Setter
	@Getter
	@Builder
	public static class RoleDto{
		public Integer id;
		public String name;
	}
}
