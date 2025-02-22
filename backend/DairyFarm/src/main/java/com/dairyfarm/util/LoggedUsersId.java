package com.dairyfarm.util;

import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;

import com.dairyfarm.config.security.CustomUserDetails;
import com.dairyfarm.entity.User;
@Component
public class LoggedUsersId {

	public int getLoggedInUserId() {
		CustomUserDetails userDetails=(CustomUserDetails)SecurityContextHolder.getContext().getAuthentication().getPrincipal();
		Integer id=userDetails.getUser().getId();
		return id;
	}
	public User getLoggedInUser() {
		CustomUserDetails userDetails=(CustomUserDetails)SecurityContextHolder.getContext().getAuthentication().getPrincipal();
		Integer id=userDetails.getUser().getId();
		return userDetails.getUser();
	}
}
