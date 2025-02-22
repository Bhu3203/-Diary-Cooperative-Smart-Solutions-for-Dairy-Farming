//package com.dairyfarm.util;
//
//import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
//
//public class Classs {
//	
//	@Override
//	public LoginResponse login(LoginRequest loginRequest) throws AccountInActiveException {
//	    User foundUser = userRepo.findByEmail(loginRequest.getEmail())
//	        .orElseThrow(() -> new ResourceNotFoundExceptionClass("User not found"));
//
//	    if (!foundUser.getStatus().getIsActive()) {
//	        throw new AccountInActiveException("Can't login, first verify email.");
//	    }
//
//	    Authentication authenticate = authenticationManager.authenticate(
//	        new UsernamePasswordAuthenticationToken(loginRequest.getEmail(), loginRequest.getPassword()));
//
//	    if (authenticate.isAuthenticated()) {
//	        CustomUserDetails userDetails = (CustomUserDetails) authenticate.getPrincipal();
//	        User authenticatedUser = userDetails.getUser();
//
//	        String token = jwtService.generateJwToken(authenticatedUser);
//
//	        // Extract all role names
//	        List<String> roleNames = authenticatedUser.getRoles()
//	            .stream()
//	            .map(Role::getName)
//	            .collect(Collectors.toList());
//
//	        return LoginResponse.builder()
//	            .tokan(token)
//	            .userDto(mapper.map(authenticatedUser, UserDto.class))
//	            .roles(roleNames)  // Send list of roles
//	            .build();
//	    } else {
//	        throw new BadCredentialsException("Invalid Credentials!!");
//	    }
//	}
//	//======================================================================================
//
//	//@Override
//	//public Boolean addMilkRecord(MilkRecordsDto milkRecordsDto) throws IOException, MessagingException {
////	    if (milkRecordsDto == null || milkRecordsDto.getId() == null) {
////	        throw new IllegalArgumentException("Milk record data or farmer ID cannot be null");
////	    }
//	//
////	    // 🔹 Fetch the farmer from the database to ensure it's managed by JPA
////	    Optional<User> farmerOptional = userRepo.findById(milkRecordsDto.getId());
////	    if (farmerOptional.isEmpty()) {
////	        throw new IllegalArgumentException("Farmer ID not found in database");
////	    }
//	//
////	    User farmer = farmerOptional.get();  // ✅ Get the farmer (managed entity)
//	//
////	    // 🔹 Map DTO to Entity
////	    MilkRecord milkRecord = mapper.map(milkRecordsDto, MilkRecord.class);
////	    milkRecord.setUser(farmer); // ✅ Set farmer after fetching from DB
//	//
////	    // 🔹 Debugging
////	    System.out.println("Farmer ID set to: " + milkRecord.getUser().getId());
////	    System.out.println("Farmer ID set to: " + milkRecord.getUser().getFirstName());
//	//
////	    // 🔹 Save the milk record
////	    MilkRecord savedRecord = milkRecordRepo.save(milkRecord);
//	//
////	    if (!ObjectUtils.isEmpty(savedRecord)) {
////	        mail(savedRecord);
////	        return true;
////	    }
////	    return false;
//	//}
//
//
////		@Override
////		public Boolean addMilkRecord(MilkRecordsDto milkRecordsDto) throws IOException, MessagingException {
////			 int farmer=2;
////			MilkRecord milkRecord=mapper.map(milkRecordsDto, MilkRecord.class);
////			milkRecord.setId(farmer);
//////			milkRecord.setId(farmer.getId());		
////			MilkRecord savedRecord=milkRecordRepo.save(milkRecord);
////			if(!ObjectUtils.isEmpty(savedRecord)) {
////				mail(savedRecord);	
////				return true;
////			}
////			return false;
////			Optional<User> farmerId = userRepo.findById(milkRecordsDto.getUser().getId());
//////			System.out.println(user);		
////			if(farmerId.isPresent()) {
////				User farmer = farmerId.get();
//////				System.out.println(farmerId);		
////				if(farmer.getRoles().getFirst().getId()==2) {
//////					MilkRecord milkRecord = MilkRecord.builder()
////////							.id(farmer.getId())
//////		                    .user(farmer)
//////		                    .time(milkRecordsDto.getTime())
//////		                    .cattle(milkRecordsDto.getCattle())
//////		                    .litre(milkRecordsDto.getLitre())
//////		                    .fat(milkRecordsDto.getFat())
//////		                    .snf(milkRecordsDto.getSnf())
//////		                    .isDeleted(false) 
//////		                    .build();
////					MilkRecord milkRecord=mapper.map(milkRecordsDto, MilkRecord.class);
////					milkRecord.setUser(farmer);
//////					milkRecord.setId(farmer.getId());
////					
////					MilkRecord savedRecord=milkRecordRepo.save(milkRecord);
////					if(!ObjectUtils.isEmpty(savedRecord)) {
////						mail(savedRecord);	
////						return true;
////					}	
////				}
////			}
////			return false;
////		}
//	
//	
//	
//	
//	
//	
//	
//	
//	
//	
//	
//	
//	
//	
//	
//	
////	{
////		  "cattleId": "12345",        
////		  
////		    "farmerId": "7"              
////		  
////		  "district": "Some District", 
////		  "village": "Some Village",   
////		  "addharNo": "987654321012",  
////		  "breed": "Jersey",           
////		  "price": 15000,              
////		  "image": "cattle_image.jpg"  
////		}
//}
