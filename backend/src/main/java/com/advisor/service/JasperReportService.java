<<<<<<< HEAD
package com.advisor.service;

import net.sf.jasperreports.engine.*;
import net.sf.jasperreports.engine.data.JRBeanCollectionDataSource;

import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Service;

import com.advisor.entity.CareerSuggestion;

import javax.servlet.http.HttpServletResponse;
import java.io.InputStream;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class JasperReportService {

    public void exportPdf(String templatePath, Map<String, Object> data, jakarta.servlet.http.HttpServletResponse response) {
        try {
            InputStream inputStream = new ClassPathResource(templatePath).getInputStream();
            JasperReport jasperReport = JasperCompileManager.compileReport(inputStream);
            JasperPrint jasperPrint = JasperFillManager.fillReport(jasperReport, data, new JREmptyDataSource());

            response.setContentType("application/pdf");
            response.setHeader("Content-Disposition", "attachment; filename=career_report.pdf");
            JasperExportManager.exportReportToPdfStream(jasperPrint, response.getOutputStream());

        } catch (Exception e) {
            e.printStackTrace();
            throw new RuntimeException("Failed to export PDF");
        }
    }
    public void exportPdfWithList(List<CareerSuggestion> suggestions, String templatePath, jakarta.servlet.http.HttpServletResponse response) {
        try {
            InputStream inputStream = new ClassPathResource(templatePath).getInputStream();
            JasperReport jasperReport = JasperCompileManager.compileReport(inputStream);

            JRBeanCollectionDataSource dataSource = new JRBeanCollectionDataSource(suggestions);
            Map<String, Object> parameters = new HashMap<>();
            // You can pass title or logo if needed

            JasperPrint jasperPrint = JasperFillManager.fillReport(jasperReport, parameters, dataSource);

            response.setContentType("application/pdf");
            response.setHeader("Content-Disposition", "attachment; filename=career_table_report.pdf");
            JasperExportManager.exportReportToPdfStream(jasperPrint, response.getOutputStream());
        } catch (Exception e) {
            e.printStackTrace();
            throw new RuntimeException("PDF generation failed.");
        }
    }

}
=======
package com.advisor.service;

import net.sf.jasperreports.engine.*;
import net.sf.jasperreports.engine.data.JRBeanCollectionDataSource;

import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Service;

import com.advisor.entity.CareerSuggestion;

import javax.servlet.http.HttpServletResponse;
import java.io.InputStream;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class JasperReportService {

    public void exportPdf(String templatePath, Map<String, Object> data, jakarta.servlet.http.HttpServletResponse response) {
        try {
            InputStream inputStream = new ClassPathResource(templatePath).getInputStream();
            JasperReport jasperReport = JasperCompileManager.compileReport(inputStream);
            JasperPrint jasperPrint = JasperFillManager.fillReport(jasperReport, data, new JREmptyDataSource());

            response.setContentType("application/pdf");
            response.setHeader("Content-Disposition", "attachment; filename=career_report.pdf");
            JasperExportManager.exportReportToPdfStream(jasperPrint, response.getOutputStream());

        } catch (Exception e) {
            e.printStackTrace();
            throw new RuntimeException("Failed to export PDF");
        }
    }
    public void exportPdfWithList(List<CareerSuggestion> suggestions, String templatePath, jakarta.servlet.http.HttpServletResponse response) {
        try {
            InputStream inputStream = new ClassPathResource(templatePath).getInputStream();
            JasperReport jasperReport = JasperCompileManager.compileReport(inputStream);

            JRBeanCollectionDataSource dataSource = new JRBeanCollectionDataSource(suggestions);
            Map<String, Object> parameters = new HashMap<>();
            // You can pass title or logo if needed

            JasperPrint jasperPrint = JasperFillManager.fillReport(jasperReport, parameters, dataSource);

            response.setContentType("application/pdf");
            response.setHeader("Content-Disposition", "attachment; filename=career_table_report.pdf");
            JasperExportManager.exportReportToPdfStream(jasperPrint, response.getOutputStream());
        } catch (Exception e) {
            e.printStackTrace();
            throw new RuntimeException("PDF generation failed.");
        }
    }

}
>>>>>>> 9c3495dfddaf30f5f49bcae2a62b9d6f7d0a15ca
