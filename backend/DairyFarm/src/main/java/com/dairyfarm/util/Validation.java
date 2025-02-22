package com.dairyfarm.util;

import java.io.UnsupportedEncodingException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.util.CollectionUtils;
import org.springframework.util.StringUtils;

import com.dairyfarm.dao.RoleRepository;
import com.dairyfarm.dao.UserRepository;
import com.dairyfarm.dto.UserDto;

import jakarta.mail.MessagingException;

@Component
public class Validation {
	
	@Autowired
	public UserRepository userRepo;
	
	@Autowired
	public RoleRepository roleRepo;
	
	
	
	public static final  String EMAIL_REGEX="^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$";
	public static final  String Password_REGEX="^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$";
	public static final  String MobileNO_REGEX="^(\\+\\d{1,3}[- ]?)?\\d{10}$";
	
	public void validateUser(UserDto user)throws UnsupportedEncodingException, MessagingException {
		
		if(!StringUtils.hasText(user.getFirstName())) {
			throw new IllegalArgumentException("Invalid First Name");
		}
		if(!StringUtils.hasText(user.getLastName())) {
			throw new IllegalArgumentException("Invalid Last Name");
		}
		if(!StringUtils.hasText(user.getEmail()) || !user.getEmail().matches(EMAIL_REGEX)) {
			throw new IllegalArgumentException("Invalid Email");
		}else if (userRepo.existsByEmail(user.getEmail())){
			throw new IllegalArgumentException("Email Already In Use");
		}
		if(!StringUtils.hasText(user.getPassword()) || !user.getPassword().matches(Password_REGEX)) {
			throw new IllegalArgumentException("Invalid Password");
		}
		if(!StringUtils.hasText(user.getMobile()) || !user.getMobile().matches(MobileNO_REGEX)) {
			throw new IllegalArgumentException("Invalid Mobile NO");
		}else if(userRepo.existsByMobile(user.getMobile())) {
			throw new IllegalArgumentException("Mobile No Already Registered");
		}
		if(CollectionUtils.isEmpty(user.getRoles())) {
			 throw  new IllegalArgumentException("Role Must Be Defined !");
		}
		else {
			List<Integer> avaliableRoleIds = roleRepo.findAll().stream().map(role -> role.getId()).toList();
			List<Integer> invalidRoleIds = user.getRoles().stream().map(role -> role.getId()).filter(roleIds -> !avaliableRoleIds.contains(roleIds)).toList();
		
			if(!CollectionUtils.isEmpty(invalidRoleIds)) 
			 {
				 throw  new IllegalArgumentException("Invalid Role");
			 }
		}
	}
}
