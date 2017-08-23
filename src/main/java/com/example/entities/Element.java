package com.example.entities;

import java.io.Serializable;


import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import org.springframework.web.multipart.MultipartFile;






@Entity
public class Element implements Serializable{
	
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private Long id_asset;
	
	private String asset;
	private String assetassocie;
	private String description;
	private long topper;
	private long lefter;
	private long largeur;
	private long hauteur;
	 private String files;
	
	public Element() {
		super();
		// TODO Auto-generated constructor stub
	}
	
	

	public Element(String asset, String assetassocie, String description, long topper, long lefter, long largeur,
			long hauteur, String files) {
		super();
		this.asset = asset;
		this.assetassocie = assetassocie;
		this.description = description;
		this.topper = topper;
		this.lefter = lefter;
		this.largeur = largeur;
		this.hauteur = hauteur;
		this.files = files;
	}



	public Long getId_asset() {
		return id_asset;
	}
	public void setId_asset(Long id_asset) {
		this.id_asset = id_asset;
	}
	public String getAsset() {
		return asset;
	}
	public void setAsset(String asset) {
		this.asset = asset;
	}
	public String getAssetassocie() {
		return assetassocie;
	}
	public void setAssetAssocie(String assetassocie) {
		this.assetassocie = assetassocie;
	}
	public long getTopper() {
		return topper;
	}
	public void setTopper(long topper) {
		this.topper = topper;
	}
	public long getLefter() {
		return lefter;
	}
	public void setLefter(long lefter) {
		this.lefter = lefter;
	}
	public long getLargeur() {
		return largeur;
	}
	public void setLargeur(long largeur) {
		this.largeur = largeur;
	}
	public long getHauteur() {
		return hauteur;
	}
	public void setHauteur(long hauteur) {
		this.hauteur = hauteur;
	}
	
	public String getFiles() {
		return files;
	}

	public void setFiles(String files) {
		this.files = files;
	}

	

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}



	@Override
	public String toString() {
		return "Element [id_asset=" + id_asset + ", asset=" + asset + ", assetassocie=" + assetassocie
				+ ", description=" + description + ", topper=" + topper + ", lefter=" + lefter + ", largeur=" + largeur
				+ ", hauteur=" + hauteur + ", files=" + files + "]";
	}

	

	
	
	
	 
}
