package com.dairyfarm.config;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.AuditorAware;

import com.dairyfarm.entity.User;
import com.dairyfarm.util.LoggedUsersId;

public class AuditorAwareConfig implements AuditorAware<Integer> {

	@Autowired
	private LoggedUsersId users;
	@Override
	public Optional<Integer> getCurrentAuditor() {
		User loggedInUser = users.getLoggedInUser();
		return Optional.of(loggedInUser.getId());
	}

}
