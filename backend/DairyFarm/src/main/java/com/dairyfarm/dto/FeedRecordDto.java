package com.dairyfarm.dto;

import java.util.Date;

import com.dairyfarm.entity.User;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
@NoArgsConstructor
@AllArgsConstructor
@Setter
@Getter
@Builder
public class FeedRecordDto {

	private Integer id;
	
	 private Integer farmerId;
	 private String farmerName;
//	private User user;
	
	private String feedName;
	
	private Integer quantity;
	
	private String supplierName;
	private Date date;
}
