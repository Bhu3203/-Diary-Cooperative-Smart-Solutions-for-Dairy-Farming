package com.dairyfarm.entity;

import java.util.Date;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.PrePersist;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Builder
public class MilkRecord {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;
	
    @ManyToOne(fetch = FetchType.LAZY)
	 @JoinColumn(name = "farmer_id", nullable = false)
	private User user;
	
	private String time;
	
	private String cattle;
	
	private Double litre;
	
	private Double fat;
	
	private Double snf;
	
	private Boolean isDeleted=false;
	 @Temporal(TemporalType.DATE)
	    @Column(nullable = false, updatable = false)
	    private Date date;

	    @PrePersist
	    protected void onCreate() {
	        date = new Date();
	    }
}
