package com.dairyfarm.dao;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.dairyfarm.entity.User;

public interface UserRepository extends JpaRepository<User, Integer>{
Boolean existsByEmail(String email);
	
	Boolean existsByMobile(String mobile);
	
	Optional<User> findByEmail(String email);
	
	
	List<User> findAllByIsDeletedFalse();
}
