package com.dairyfarm.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CattleDto {
    private Integer cattleId;
//    private Integer farmerId; // Or userId, be consistent
    private String district;
    private String village;
    private String addharNo;
    private String breed;
    private Double price;
//    private String image; // File name
    private String imageUrl; // Full URL
}