//package com.dairyfarm.service;
//
//import java.io.IOException;
//
//import org.modelmapper.ModelMapper;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.beans.factory.annotation.Value;
//import org.springframework.stereotype.Service;
//import org.springframework.web.multipart.MultipartFile;
//
//import com.dairyfarm.dao.ProductCategoryRepository;
//import com.dairyfarm.dao.ProductRepository;
//import com.dairyfarm.dao.UserRepository;
//import com.dairyfarm.dto.ProductDto;
//
//@Service
//public class ProductService implements IProductService {
//
//	@Autowired
//	private UserRepository userRepo;
//	@Autowired
//	private ProductCategoryRepository categoryRepo;
//	
//	@Autowired
//	private ProductRepository productRepo;
//	
//	@Autowired
//	private CattleImageService imageService;
//	@Value("${file.upload.path}")
//    private String uploadPath;
//	
//	@Autowired
//	private ModelMapper mapper;
//	
//	@Override
//	public ProductDto addProduct(ProductDto productDto, MultipartFile cattleImage) throws IOException {
//		
//		return null;
//	}
//
//}
