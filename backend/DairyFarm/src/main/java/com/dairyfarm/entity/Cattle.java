package com.dairyfarm.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Cattle {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer cattleId;

    @ManyToOne(fetch = FetchType.LAZY) 
    @JoinColumn(name = "user_id") 
    private User user;

    private String district;
    private String village;
    private String addharNo;
    private String breed;
    private Double price;
    private String image; // Store only the file name
    private boolean isDeleted=false;
}