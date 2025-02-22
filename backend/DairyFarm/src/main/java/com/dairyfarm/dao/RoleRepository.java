package com.dairyfarm.dao;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.dairyfarm.entity.Role;

public interface RoleRepository extends JpaRepository<Role, Integer> {
	
}
