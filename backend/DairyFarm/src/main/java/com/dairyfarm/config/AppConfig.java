package com.dairyfarm.config;

import org.modelmapper.ModelMapper;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.domain.AuditorAware;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
//@EnableWebSecurity
public class AppConfig {
@Bean
public ModelMapper modelMapper() {
	return new ModelMapper();
}

@Bean
public AuditorAware<Integer> auditorAware(){
	return new AuditorAwareConfig();
}

}



