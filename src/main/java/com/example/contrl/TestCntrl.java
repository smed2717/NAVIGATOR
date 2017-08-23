package com.example.contrl;


import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

@RestController
public class TestCntrl {

	/*Web service pour récuperation des asset num,item, location*/
	
	@RequestMapping(value = "/AllAssetNum", method = RequestMethod.GET)
	public @ResponseBody
	ResponseEntity<String> getAsset() {
	ResponseEntity<String>  response = null;
	
	try {
	RestTemplate restTemplate = new RestTemplate();
		String url="http://192.168.1.204:9081/maxrest/rest/mbo/asset?_lid=maxadmin&_lpwd=maxadmin&_format=json&_compact=1"; 
	   	response = restTemplate.getForEntity(
	   			url,
	   	       String.class);

	   


	} catch (Exception e) {
	e.printStackTrace();
	}
	return(response);
	}
	
	
	
	@RequestMapping(value = "/AllItemNum", method = RequestMethod.GET)
	public @ResponseBody
	ResponseEntity<String> getItem() {
	ResponseEntity<String>  response = null;
	
	try {
	RestTemplate restTemplate = new RestTemplate();
	String url="http://192.168.1.204:9081/maxrest/rest/mbo/item?_lid=maxadmin&_lpwd=maxadmin&_format=json&_compact=1";
	   	response = restTemplate.getForEntity(
	   	       url,String.class);

	   


	} catch (Exception e) {
	e.printStackTrace();
	}
	return(response);
	}
	
	
	
	
	@RequestMapping(value = "/AllLocation", method = RequestMethod.GET)
	public @ResponseBody
	ResponseEntity<String> getLocations() {
	ResponseEntity<String>  response = null;
	
	try {
	RestTemplate restTemplate = new RestTemplate();
	   	response = restTemplate.getForEntity(
	   	       "http://192.168.1.204:9081/maxrest/rest/mbo/locations?_lid=maxadmin&_lpwd=maxadmin&_format=json&_compact=1",
	   	       String.class);

	   


	} catch (Exception e) {
	e.printStackTrace();
	}
	return(response);
	}
}
