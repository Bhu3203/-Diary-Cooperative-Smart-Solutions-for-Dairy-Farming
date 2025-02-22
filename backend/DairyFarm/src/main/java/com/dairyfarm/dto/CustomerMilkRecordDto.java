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
public class CustomerMilkRecordDto {

	private Integer id;
	
	private Integer CustomerId;
    private String CustomerName;
//	private User user;
	
	private String time;
	
	private String cattle;
	
	private Double litre;
	
	private  Date date;
}
