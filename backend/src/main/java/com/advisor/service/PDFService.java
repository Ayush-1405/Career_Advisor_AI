<<<<<<< HEAD
package com.advisor.service;

import com.advisor.entity.CareerPath;
import com.advisor.entity.UserEntity;
import com.advisor.repository.UserRepository;
import com.advisor.repository.CareerPathRepository;

import net.sf.jasperreports.engine.*;
import net.sf.jasperreports.engine.data.JRBeanCollectionDataSource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ClassPathResource;
import org.springframework.http.*;
import org.springframework.stereotype.Service;

import java.io.InputStream;
import java.util.*;

@Service
public class PDFService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private CareerPathRepository careerPathRepository;

    public ResponseEntity<byte[]> generateCareerPdf(String userEmail) {
        try {
            // 1. Get user details
            UserEntity user = userRepository.findByEmail(userEmail)
                    .orElseThrow(() -> new RuntimeException("User not found with email: " + userEmail));

            // 2. Get user's career paths (replace this with your logic if career paths are linked to user)
            List<CareerPath> careerList = careerPathRepository.findAll();

            // 3. Load and compile .jrxml file
            InputStream inputStream = new ClassPathResource("templates/career_report.jrxml").getInputStream();
            JasperReport jasperReport = JasperCompileManager.compileReport(inputStream);

            // 4. Prepare data source
            JRBeanCollectionDataSource dataSource = new JRBeanCollectionDataSource(careerList);

            // 5. Prepare parameters
            Map<String, Object> parameters = new HashMap<>();
            parameters.put("username", user.getName());
            parameters.put("email", user.getEmail());

            // 6. Fill report
            JasperPrint jasperPrint = JasperFillManager.fillReport(jasperReport, parameters, dataSource);

            // 7. Export to PDF
            byte[] pdfBytes = JasperExportManager.exportReportToPdf(jasperPrint);

            // 8. Return as HTTP response
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_PDF);
            headers.setContentDisposition(ContentDisposition.attachment().filename("career_report.pdf").build());

            return new ResponseEntity<>(pdfBytes, headers, HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(("Error generating PDF: " + e.getMessage()).getBytes());
        }
    }
}
=======
package com.advisor.service;

import com.advisor.entity.CareerPath;
import com.advisor.entity.UserEntity;
import com.advisor.repository.UserRepository;
import com.advisor.repository.CareerPathRepository;

import net.sf.jasperreports.engine.*;
import net.sf.jasperreports.engine.data.JRBeanCollectionDataSource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ClassPathResource;
import org.springframework.http.*;
import org.springframework.stereotype.Service;

import java.io.InputStream;
import java.util.*;

@Service
public class PDFService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private CareerPathRepository careerPathRepository;

    public ResponseEntity<byte[]> generateCareerPdf(String userEmail) {
        try {
            // 1. Get user details
            UserEntity user = userRepository.findByEmail(userEmail)
                    .orElseThrow(() -> new RuntimeException("User not found with email: " + userEmail));

            // 2. Get user's career paths (replace this with your logic if career paths are linked to user)
            List<CareerPath> careerList = careerPathRepository.findAll();

            // 3. Load and compile .jrxml file
            InputStream inputStream = new ClassPathResource("templates/career_report.jrxml").getInputStream();
            JasperReport jasperReport = JasperCompileManager.compileReport(inputStream);

            // 4. Prepare data source
            JRBeanCollectionDataSource dataSource = new JRBeanCollectionDataSource(careerList);

            // 5. Prepare parameters
            Map<String, Object> parameters = new HashMap<>();
            parameters.put("username", user.getName());
            parameters.put("email", user.getEmail());

            // 6. Fill report
            JasperPrint jasperPrint = JasperFillManager.fillReport(jasperReport, parameters, dataSource);

            // 7. Export to PDF
            byte[] pdfBytes = JasperExportManager.exportReportToPdf(jasperPrint);

            // 8. Return as HTTP response
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_PDF);
            headers.setContentDisposition(ContentDisposition.attachment().filename("career_report.pdf").build());

            return new ResponseEntity<>(pdfBytes, headers, HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(("Error generating PDF: " + e.getMessage()).getBytes());
        }
    }
}
>>>>>>> 9c3495dfddaf30f5f49bcae2a62b9d6f7d0a15ca
