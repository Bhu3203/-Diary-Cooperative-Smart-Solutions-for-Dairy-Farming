package com.dairyfarm.dto;

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
public class BankDetailDto {

	private Integer id;
	private User user;
	
	private String accountHolderName;
	
	private String bankName;
	
	private String branchName;
	
	private Long accountNo;
	
	private String ifscNo;
}
