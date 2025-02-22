package com.dairyfarm.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.util.CollectionUtils;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.dairyfarm.dto.UserDto;
import com.dairyfarm.service.IUserService;
@RestController
@RequestMapping("/api/user")
@CrossOrigin("*")
public class UserController {
	@Autowired
	private IUserService userService;
	
		
		
		@GetMapping("/all")
		@PreAuthorize("hasRole('Admin')")
		public ResponseEntity<?> allUsers(){
			List<UserDto>allUser=userService.getAllUser();
			if(CollectionUtils.isEmpty(allUser)) {
//				return ResponseEntity.noContent().build();
				return new ResponseEntity<>("User Not Available",HttpStatus.NO_CONTENT);
			}
			return ResponseEntity.ok(allUser);
		}
		
		@DeleteMapping("/delete/{id}")
		@PreAuthorize("hasRole('Admin')")
		public ResponseEntity<?> deleteUserById(@PathVariable Integer id){
			return ResponseEntity.ok(userService.deleteUserById(id));
		}
		
		
		@GetMapping("/forAdmin")
		@PreAuthorize("hasRole('Admin')")
		public ResponseEntity<?> endpointOfAdmin(){
			return ResponseEntity.ok("This Api of Admin");
					
		}
		@GetMapping("/forUser")
		@PreAuthorize("hasRole('Farmer')")
		public ResponseEntity<?> endpointOfUser(){
			return ResponseEntity.ok("This Api of User");
			
		}
		@GetMapping("/forBoth")
		@PreAuthorize("hasAnyRole('Admin','Farmer')")
		public ResponseEntity<?> endpointOfBothUserAndAdmin(){
			return ResponseEntity.ok("This Api of User");
		}
}
