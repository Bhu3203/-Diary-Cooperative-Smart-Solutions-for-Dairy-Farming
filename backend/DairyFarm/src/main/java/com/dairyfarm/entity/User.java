package com.dairyfarm.entity;

import java.util.Date;
import java.util.List;



import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
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
@Setter
@Getter
@Builder
public class User {

	@Id
	@GeneratedValue(strategy =GenerationType.IDENTITY )
	private Integer id;
	private String firstName;
	private String lastName;
	private String email;
	private String mobile;
	private String password;
	 @Temporal(TemporalType.TIMESTAMP)
	    @Column(nullable = false, updatable = false)
	    private Date registrationDate;

	    @PrePersist
	    protected void onCreate() {
	        registrationDate = new Date();
	    }
	
	@OneToMany(cascade = CascadeType.ALL, fetch = FetchType.EAGER)
	private List<Role> roles;
	
	@OneToOne(cascade = CascadeType.ALL, fetch = FetchType.EAGER)
	@JoinColumn(name = "status_id")
	private AccountStatus status;
	
	//Soft DeLETE
	private Boolean isDeleted;
}
