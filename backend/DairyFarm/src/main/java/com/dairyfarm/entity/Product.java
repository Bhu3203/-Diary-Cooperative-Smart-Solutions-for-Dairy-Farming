//package com.dairyfarm.entity;
//
//
//
//import jakarta.persistence.Entity;
//import jakarta.persistence.GeneratedValue;
//import jakarta.persistence.GenerationType;
//import jakarta.persistence.Id;
//import jakarta.persistence.JoinColumn;
//import jakarta.persistence.ManyToOne;
//import lombok.AllArgsConstructor;
//import lombok.Builder;
//import lombok.Getter;
//import lombok.NoArgsConstructor;
//import lombok.Setter;
//
//@Entity
//@NoArgsConstructor
//@AllArgsConstructor
//@Getter
//@Setter
//@Builder
//public class Product {
//	@Id
//	@GeneratedValue(strategy = GenerationType.IDENTITY)
//	private Integer productId;
//	private String name;
//	
//	private double price;
//	 private String image;
//	 private boolean isDeleted;
//	  @ManyToOne
//	    @JoinColumn(name = "category_id")
//	    private ProductCategory category;
//}
