package com.dairyfarm.service;

import java.security.Key;
import java.security.NoSuchAlgorithmException;
import java.util.Base64;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
//import java.util.UUID;

import javax.crypto.KeyGenerator;
import javax.crypto.SecretKey;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import com.dairyfarm.entity.User;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;   
@Service
public class JwtService implements IJwtService{

	private String secretKey="";
	public JwtService() throws NoSuchAlgorithmException {
		//generate key
		KeyGenerator  keyGenerator=	KeyGenerator.getInstance("HmacSHA256");
		SecretKey key=keyGenerator.generateKey();
		//convert key into string
		secretKey=Base64.getEncoder().encodeToString(key.getEncoded());
		
	}
	@Override
	public String generateJwToken(User user) {
		Map<String, Object> claims= new HashMap<String, Object>();
		claims.put("id", user.getId());
		claims.put("role", user.getRoles());
		claims.put("status", user.getStatus().getIsActive());
		String token=Jwts.builder()
		.claims().add(claims)
		.subject(user.getEmail())
		.issuedAt(new Date(System.currentTimeMillis()))
		.expiration(new Date(System.currentTimeMillis()+60*60*60*10))
		.and()
		.signWith(getKey())
		.compact();
		return token;
	}

	private Key getKey() {
		System.out.println(secretKey);
		//conevrting Key String to byte
		byte[] key=Base64.getDecoder().decode(secretKey);
		return Keys.hmacShaKeyFor(key);
	}
	// from frontend token madun aale la uaername or token Extract information  karnya ssathi method
	@Override
	public String extractUserName(String token) {
		Claims claims= extractClaims(token);
		String userName=claims.getSubject();
		return userName;
	}
	private Claims extractClaims(String token) {
		//Jwt Exception
		try {
			return	Jwts.parser()
			.verifyWith((SecretKey)getKey())
			.build()
			.parseSignedClaims(token)
			.getPayload();
		} catch ( ExpiredJwtException e) {
			
			throw new ExpiredJwtException(null, null, "Token is Expired..");
		} catch (JwtException e) {
			throw new JwtException("Invalid Token");
		}
		 
	}
	@Override
	public Boolean validateToken(String token, UserDetails userDetails) {
		String userName=extractUserName(token);
		Claims claims= extractClaims(token);
		Boolean isExpried= isTokenExpired(claims);
		if(userName.equalsIgnoreCase(userDetails.getUsername())&& !isExpried) {
			return true;
		}
		return false;
	}
	private Boolean isTokenExpired(Claims claims) {
		Date expireDate=claims.getExpiration();
		return expireDate.before(new Date());
	}

}
