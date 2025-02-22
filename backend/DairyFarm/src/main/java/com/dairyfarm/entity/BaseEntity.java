package com.dairyfarm.entity;

import java.time.LocalDateTime;

import org.springframework.data.annotation.CreatedBy;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedBy;
import org.springframework.data.annotation.LastModifiedDate;

import jakarta.persistence.Column;
import jakarta.persistence.MappedSuperclass;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
@NoArgsConstructor
@AllArgsConstructor
@Setter
@Getter
@MappedSuperclass
public class BaseEntity {
	@CreatedBy
	@Column(updatable = false)
	private Integer createdBy;
	  
	@CreatedDate
	@Column(updatable = false)
	private LocalDateTime createdOn;
	  
	@LastModifiedBy
	@Column(insertable = false)
	private Integer updatedBy;
	
	@LastModifiedDate
	@Column(insertable = false)
	private LocalDateTime updatedOn;
	
}
