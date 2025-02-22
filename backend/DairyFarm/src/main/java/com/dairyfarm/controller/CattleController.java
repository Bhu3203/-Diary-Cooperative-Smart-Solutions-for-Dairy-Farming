package com.dairyfarm.controller;

import java.io.IOException;
import java.io.InputStream;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.util.CollectionUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import com.dairyfarm.dto.CattleDto;
import com.dairyfarm.service.CattleImageService;
import com.dairyfarm.service.ICattleService;
import com.fasterxml.jackson.databind.ObjectMapper;


import org.springframework.http.MediaType;

@RestController
@RequestMapping("/api/cattle")
@CrossOrigin("*")
public class CattleController {

    @Autowired
    private ICattleService cattleService;

    @Autowired
    private ObjectMapper objectMapper;

    @Autowired
    private CattleImageService imageService;

//    http://localhost:6969/api/cattle/add
    @PostMapping( "/add") 
    @PreAuthorize("hasRole('Farmer')")
    public ResponseEntity<CattleDto> addCattle(
            @RequestPart("cattleDto") String cattleDto,
            @RequestPart("image") MultipartFile image) throws IOException {

        if (image == null || image.isEmpty()) { // Check for null as well
            return ResponseEntity.badRequest().body(null);
        }

        CattleDto dto = objectMapper.readValue(cattleDto, CattleDto.class);
        CattleDto savedCattle = cattleService.addCattle(dto, image);

        return ResponseEntity.status(HttpStatus.CREATED).body(savedCattle);
    }

//    http://localhost:6969/api/cattle/all
    @GetMapping("/all")
    public ResponseEntity<?> getAllCattles(){
    	List<CattleDto> cattleDto = cattleService.allCattle();
    	if(CollectionUtils.isEmpty(cattleDto)) {
    		throw new RuntimeException("No Movie Available");
    	}
    	return ResponseEntity.ok(cattleDto);
    }
//    @GetMapping("/image/{imageName}") // New endpoint to serve images
//    public ResponseEntity<byte[]> getImage(@PathVariable String imageName) throws IOException {
//        try {
//            InputStream imageStream = imageService.getCattle(imageName);
//            byte[] imageBytes = org.apache.commons.io.IOUtils.toByteArray(imageStream); // Use Apache Commons IO
//            return ResponseEntity.ok().contentType(MediaType.IMAGE_JPEG).body(imageBytes); // Set correct content type
//        } catch (IOException e) {
//            return ResponseEntity.notFound().build();
//        }
//    }
}