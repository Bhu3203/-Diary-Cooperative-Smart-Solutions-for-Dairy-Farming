package com.dairyfarm.service;

import java.io.UnsupportedEncodingException;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.util.ObjectUtils;

import com.dairyfarm.config.security.CustomUserDetails;
import com.dairyfarm.dao.RoleRepository;
import com.dairyfarm.dao.UserRepository;
import com.dairyfarm.dto.EmailRequest;
import com.dairyfarm.dto.LoginRequest;
import com.dairyfarm.dto.LoginResponse;
import com.dairyfarm.dto.UserDto;
import com.dairyfarm.entity.AccountStatus;
import com.dairyfarm.entity.Role;
import com.dairyfarm.entity.User;
import com.dairyfarm.exception.ResourceNotFoundException;
import com.dairyfarm.util.Validation;

import jakarta.mail.MessagingException;

@Service
public class UserService implements IUserService{
	
	@Autowired
	private Validation validation;
	
	@Autowired
	private ModelMapper mapper;
	
	@Autowired
	private UserRepository userRepo;
	
	@Autowired
	private RoleRepository roleRepo;
	
	@Autowired
	private EmailService emailService;
	
	@Autowired
	private PasswordEncoder encoder;
	
	@Autowired
	private AuthenticationManager manager;
	
	@Autowired
	private  IJwtService jwtService;
	@Override
	public Boolean register(UserDto userDto) throws UnsupportedEncodingException, MessagingException {
		
		validation .validateUser(userDto);
		User newUser = mapper.map(userDto, User.class);
		
		setRoles(userDto, newUser);
		
		setStatus(newUser);
		newUser.setIsDeleted(false);
		newUser.setPassword(encoder.encode(newUser.getPassword()));
		User savedUser = userRepo.save(newUser);
		
		if(!ObjectUtils.isEmpty(savedUser)) {
			accountConfirmationMail(savedUser);
			return true;
		}
		return false;
	}
	
	private void accountConfirmationMail(User savedUser) throws UnsupportedEncodingException, MessagingException {
		
		String msg = "<h1>Hello [[fName]]</h1>"
				+ "<h5>Your account created successfully.</h5>"
				+ "<h1>Your FarmerId :  [[fId]]</h1>"
				+ "<p>to activate account <a href=[[URL]]>Click here</a></p><br/>"
				+ "<b>Thank you for joining us.</b>";
		
		String verificationCode = savedUser.getStatus().getVerificationCode();
		String verifyUrl = "http://localhost:6969/api/home/verify?userId="+savedUser.getId()+"&code="+verificationCode;
		
		msg = msg.replace("[[fName]]", savedUser.getFirstName());
		
		msg = msg.replace("[[URL]]", verifyUrl);
		msg =msg.replace("[[fId]]", savedUser.getId().toString());
		EmailRequest emailRequest=EmailRequest.builder()
				.to(savedUser.getEmail())
				.subject("Account created Successfully!!")
				.title("Account confirmation mail")
				.message(msg)
				.build();
				emailService.sendMail(emailRequest);
	}

	private void setRoles(UserDto userDto, User newUser) {
		List <Integer> roleIds = userDto.getRoles().stream().map(role-> role.getId()).toList();
		List<Role> roles = roleRepo.findAllById(roleIds);
		newUser.setRoles(roles);
	}
	
	@Override
	public List<UserDto> getAllUser() {
		List<UserDto> users = userRepo.findAllByIsDeletedFalse().stream().map(user -> mapper.map(user, UserDto.class)).toList();
		return users;
	}
	
	private void setStatus(User newUser) {
		AccountStatus status = new AccountStatus();
		status .setIsActive(false);
		status.setVerificationCode(UUID.randomUUID().toString());
		newUser.setStatus(status);
	}

	@Override
	public String deleteUserById(Integer id) {
		User foundUser = userRepo.findById(id).orElseThrow(()-> new ResourceNotFoundException("User Not found for id : "+ id));
		//userRepo.delete(foundUser);
		foundUser.setIsDeleted(true);
		foundUser.setEmail(null);
		userRepo.save(foundUser);
		return "User deleted Succefully";
	}

	
	//For Login Part
	
	//in this manager will get token as password and email and sent to provider to validate all these thing will be perform automatically
	
	@Override
	public LoginResponse login(LoginRequest loginRequest) {
		Authentication authenticate=manager.authenticate(new UsernamePasswordAuthenticationToken(loginRequest.getEmail(), loginRequest.getPassword()));
		if(authenticate.isAuthenticated()) {
			CustomUserDetails userDetails=(CustomUserDetails)authenticate.getPrincipal();
			 User  authenticateUser =userDetails.getUser();
			 //JWT TOKEN
			 String token=jwtService.generateJwToken(authenticateUser);
			 List<String> roleNames = authenticateUser.getRoles()
			            .stream()
			            .map(Role::getName)
			            .collect(Collectors.toList());
			return LoginResponse.builder()
					.token(token)
					.userDto(mapper.map(authenticateUser, UserDto.class))
					.roles(roleNames)
					.build();
		}else {
			throw new BadCredentialsException("Invalid Credentials!!");
		}
		
	}
	
}
























//import java.io.UnsupportedEncodingException;
//import java.util.List;
//import java.util.UUID;
//
//import org.modelmapper.ModelMapper;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.stereotype.Service;
//import org.springframework.util.ObjectUtils;
//
//import com.dairyfarm.dao.RoleRepository;
//import com.dairyfarm.dao.UserRepository;
//import com.dairyfarm.dto.EmailRequest;
//import com.dairyfarm.dto.UserDto;
//import com.dairyfarm.entity.AccountStatus;
//import com.dairyfarm.entity.Role;
//import com.dairyfarm.entity.User;
//import com.dairyfarm.exception.ResourceNotFoundException;
//import com.dairyfarm.util.Validation;
//
//import jakarta.mail.MessagingException;
//
//@Service
//public class UserService implements IUserService {
//
//	@Autowired
//	public UserRepository userRepo;
//	@Autowired
//	public RoleRepository roleRepo;
//	
//	@Autowired
//	public Validation validation;
//	
//	@Autowired 
//	ModelMapper mapper;
//
//	@Autowired
//	EmailService emailService;
////	@Autowired
////	PasswordEncoder passwordEncoder;
//	
//	
////	 public String encodePassword(String password) {
////	        return passwordEncoder.encode(password);
////	    }
//
//	@Override
//	public Boolean register(UserDto userDto)throws UnsupportedEncodingException, MessagingException {
//		validation.validateUser(userDto);
//
//		
////        String encodedPassword = passwordEncoder.encode(userDto.getPassword());
////        userDto.setPassword(encodedPassword);
////        
////        userDto.setPassword(null);
//        
//        
//		 User newUser= mapper.map(userDto, User.class);
//		 setRoles(userDto, newUser);
//	        setStatus(newUser);
//	        newUser.setIsDeleted(false);
//	        User savedUser = userRepo.save(newUser);
//	        
//	        if (!ObjectUtils.isEmpty(savedUser)) {
//	        	accountConformationMail(savedUser);
//	            
//	            return true;
//	        }
//	        return false;
//	    }
//	    
//	    private void accountConformationMail(User savedUser) throws UnsupportedEncodingException, MessagingException {
////	    	String msg="<h1><b>Hello [[fName]]</b></h1> <br/>"
////	    			+ "<p>Your account was created successfully!!</p><br/>"
////	    			+ "<p>to activate account <a href=[[URL]]>Click here</a></p><br/>"
////
//////	    			+ "<p> To activate your account<a href=[[URL]]>Click here</a></p><br/>"
////	    			+ "<b>Thank you for joining us.</b>";
//	    	
//	    	String msg="<h1><b>Hello [[fName]]</b></h1> <br/>"
//	    			+ "<p>Your account was created successfully!!</p> <br/>"
//	    			+ "<p> To activate your account <a href=[[URL]]>Click here</a></p> <br/>"
//	    			+ "<b>Thank you for joining us.</b>";
//	    	
//	    	String verificationCode=savedUser.getStatus().getVerificationCode();
//	    	
//	    	String verifyUrl="http://localhost:6969/api/home/verify?userId="+savedUser.getId()
//	    	+"&code="+verificationCode;
//	    	
//	    	msg=msg.replace("[[fName]]", savedUser.getFirstName());
//	    	
//	    	msg.replace("[[URL]]", verifyUrl);
//	    	
//	    	EmailRequest emailRequest = EmailRequest.builder()
//	                .to(savedUser.getEmail())
//	                .subject("Account created successfully!!")
//	                .title("Sadguru Dairy Farming")
//	                .message(msg)
//	                .build();
//	            emailService.sendMail(emailRequest);
//	            
//	        if("code"==verificationCode);
//	
//}
//
//		public void setStatus(User newUser) 
//	    {
//	        AccountStatus status = new AccountStatus();
//	        status.setIsActive(false);
//	        status.setVerificationCode(UUID.randomUUID().toString());
//	        newUser.setStatus(status);
//	    }
//	    
//	    private void setRoles(UserDto userDto, User newUser) {
//	        List<Integer> roleIds = userDto.getRoles().stream().map(role -> role.getId()).toList();
//	        List<Role> roles = roleRepo.findAllById(roleIds);
//	        newUser.setRoles(roles);
//	    }
//	    
////	    private String generateRoleId(String roleName) {
////	        String rolePrefix = getRolePrefix(roleName);
////	        Optional<Role> lastRole = roleRepo.findTopByIdStartingWithOrderByIdDesc(rolePrefix);
////	        int nextNumber = 100;
////	        
////	        if (lastRole.isPresent()) {
////	            String lastId = lastRole.get().getId();
////	            int lastNumber = Integer.parseInt(lastId.substring(1));
////	            nextNumber = lastNumber + 1;
////	        }
////	        return rolePrefix + nextNumber;
////	    }
////	    
////	    private String getRolePrefix(String roleName) {
////	        switch (roleName.toLowerCase()) {
////	            case "farmer": 
////	            	return "F";
////	            case "customer":
////	            	return "C";
////	            case "admin":
////	            	return "A";
////	            default:
////	            	throw new IllegalArgumentException("Invalid role name");
////	        }
////	    }
//	    
//	    @Override
//	    public List<UserDto> getAllUser() {
//	        return userRepo.findAllByIsDeletedFalse().stream()
//	                .map(user -> mapper.map(user, UserDto.class))
//	                .toList();
//	    }
//
//		@Override
//		public String deleteUserById(Integer id) {
//		User foundUser=	userRepo.findById(id).orElseThrow(()-> new ResourceNotFoundException("  Id Not found   "));
//		foundUser.setIsDeleted(true);
//		foundUser.setEmail(null);
//		userRepo.save(foundUser);
////			userRepo.delete(foundUser);
//			return("Deleted");
//			
//		}
//	        
//
//}
