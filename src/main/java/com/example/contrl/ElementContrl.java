package com.example.contrl;

import java.io.BufferedOutputStream;
import java.io.File;
import java.io.FileOutputStream;

import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;

import org.springframework.data.domain.PageRequest;

import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PathVariable;

import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;

import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.example.dao.ElementRepository;
import com.example.entities.Element;

@RestController
public class ElementContrl {
	@Autowired
	private Environment env;

	Model model;
	private String filename;
	@Autowired
	private ElementRepository elementRepository;

	// get fils of asset parent
	@RequestMapping(value = "/getAllAsset/{assetassocie}", method = RequestMethod.GET)
	public List<Element> getElementByAssetassocie(@PathVariable("assetassocie") String assetassocie) {
		return (List<Element>) elementRepository.findByAssetassocie(assetassocie);

	}

	// get asset parent
	@RequestMapping(value = "/getImageAsset/{asset}", method = RequestMethod.GET)
	public Element getElementByAsset(@PathVariable("asset") String asset) {
		return elementRepository.findByAsset(asset);

	}

	// get last element inserted and has no assetassocie
	@RequestMapping(value = "/getLast", method = RequestMethod.GET)
	public List<Element> getLastElement() {
		return elementRepository.findLimited(new PageRequest(0, 1));

	}

	// chek if asset is a leaf(feuille) or node
	@RequestMapping(value = "/checkAsset/{assetassocie}", method = RequestMethod.GET)
	public Boolean checkByasset(@PathVariable("assetassocie") String assetassocie) {

		ArrayList<?> l = new ArrayList<>();
		l = (ArrayList<?>) elementRepository.findByAssetassocie(assetassocie);
		return l.isEmpty();
	}

	// delete par asset
	@RequestMapping(value = "/delete/{asset}", method = RequestMethod.DELETE)
	public Long deleteElement(@PathVariable("asset") String asset) {
		Long delElm = elementRepository.findByID(asset);
		elementRepository.delete(delElm);
		;
		return delElm;
	}

	@RequestMapping(value = "/uploadFile", method = RequestMethod.POST)
	@ResponseBody
	public String uploadFile(@RequestParam("uploadfile") MultipartFile uploadfile) {

		try {
			// Get the filename and build the local file path
			filename = uploadfile.getOriginalFilename();
			String directory = env.getProperty("uploadedFiles");
			String filepath = Paths.get(directory, filename).toString();
			System.out.println(filename);

			// Save the file locally
			BufferedOutputStream stream = new BufferedOutputStream(new FileOutputStream(new File(filepath)));
			stream.write(uploadfile.getBytes());
			stream.close();
			return filename;
		} catch (Exception e) {
			System.out.println(e.getMessage());
			return "error";
		}
	} // method uploadFile
		// méthode insert in DB

	@RequestMapping(value = "/save", method = RequestMethod.POST)
	public Element saveElement(@RequestBody Element elm) {

		elm.setFiles(filename);
		elementRepository.save(elm);
		return (elm);
	}

	// get id_asset for updating par id
	@RequestMapping(value = "/getId/{asset}", method = RequestMethod.GET)
	public Long getId(@PathVariable("asset") String asset) {

		Long id = elementRepository.findByID(asset);
		return id;
	}

	// update a specified fields "asset,assetassocie,files"
	@RequestMapping(value = "/update/{id_asset}/{asset}/{assetassocie}", method = RequestMethod.PUT)
	public Element updateElement(@Valid Element elm, @PathVariable("id_asset") Long id_asset,
			@PathVariable("asset") String asset, @PathVariable("assetassocie") String assetassocie) {
		System.out.println(id_asset);
		System.out.println(asset);
		System.out.println(assetassocie);
		elm.setFiles("hello");
		elm.setAsset(asset);
		elm.setAssetAssocie(assetassocie);
		elementRepository.update(id_asset, asset, assetassocie);

		return elm;

	}

}
