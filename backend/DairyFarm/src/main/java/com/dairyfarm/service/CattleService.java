package com.dairyfarm.service;

import java.io.IOException;
import java.nio.file.FileAlreadyExistsException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.List;
import java.util.Optional;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.dairyfarm.config.security.CustomUserDetails;
import com.dairyfarm.dao.CattleRepository;
import com.dairyfarm.dao.UserRepository;
import com.dairyfarm.dto.CattleDto;
import com.dairyfarm.entity.Cattle;
import com.dairyfarm.entity.User;
import com.dairyfarm.exception.ResourceNotFoundException;


@Service
public class CattleService implements ICattleService{

	@Autowired
	private UserRepository userRepo;
	@Autowired
	private CattleRepository cattleRepo;
	
	@Autowired
	private CattleImageService imageService;
	@Value("${file.upload.path}")
    private String uploadPath;
	
	@Autowired
	private ModelMapper mapper;

	@Override
	public CattleDto addCattle(CattleDto cattleDto, MultipartFile cattleImage) throws IOException {
		
		CustomUserDetails userDetails=(CustomUserDetails)SecurityContextHolder.getContext().getAuthentication().getPrincipal();
		Integer id = userDetails.getUser().getId();
		System.out.println("Farmer id:"+id);
		// 1. Upload cattle image
        String originalFilename = cattleImage.getOriginalFilename();
        String storePath = uploadPath + "/" + originalFilename;

        if (Files.exists(Paths.get(storePath))) {
            throw new FileAlreadyExistsException("Cattle image already exists! Please provide a different image.");
        }

        String uploadedFilePath = imageService.upload(cattleImage);
        
        // Set image file name and full URL
//        cattleDto.setImage(originalFilename);
        cattleDto.setImageUrl(uploadedFilePath);
//        cattleDto.setImage(originalFilename);
        
        Cattle cattle = mapper.map(cattleDto, Cattle.class);
//        Integer farmerId= cattleDto.getFarmerId();
        User user = userRepo.findById(id).orElseThrow(()-> new ResourceNotFoundException("User not found"));
        cattle.setUser(user);
//      Optional<User> farmerId = userRepo.findById(cattleDto.getFarmerId()); //Use farmerId from DTO
//      cattle.setId(farmerId);
//      if (userOptional.isPresent()) {
//          cattle.setUser(userOptional.get());
//      } else {
//          throw new RuntimeException("User not found!"); // Or handle appropriately
//      }
        
        Cattle savedCattle = cattleRepo.save(cattle);
		return convertCattleToDto(savedCattle);
	}

	private CattleDto convertCattleToDto(Cattle savedCattle) {
		Optional<User> userId = userRepo.findById(savedCattle.getUser().getId());
		User user=userId.get();
		return CattleDto.builder()
				.cattleId(savedCattle.getCattleId())
//				.farmerId(user.getId())
				.district(savedCattle.getDistrict())
				.village(savedCattle.getVillage())
				.addharNo(savedCattle.getAddharNo())
				.breed(savedCattle.getBreed())
				.price(savedCattle.getPrice())
//				.image(savedCattle.getImage())
				.imageUrl("http://localhost:6969/api/cattle/"+savedCattle.getImage())
				.build();
	}

	@Override
	public List<CattleDto> allCattle() {
		List<Cattle> cattles = cattleRepo.findAll();
		return cattles.stream().map(cattle -> convertCattleToDto(cattle)).toList();
	}
}

