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
@Getter
@Setter
@Builder
public class MilkRecordsDto {
	
    private Integer id;
	
    private Integer farmerId;
    private String farmerName;
//	private UserDto user;
	
	private String time;
	
	private String cattle;
	
	private Double litre;
	
	private Double fat;
	
	private Double snf;
	private  Date date;
	
//	public MilkRecordsDtoBuilder farmerId(Integer id2) {
//		// TODO Auto-generated method stub
//		return null;
//	}
}
