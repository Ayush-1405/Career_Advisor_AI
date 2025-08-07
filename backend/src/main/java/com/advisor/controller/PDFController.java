<<<<<<< HEAD
package com.advisor.controller;

import com.advisor.entity.CareerSuggestion;
import com.advisor.service.JasperReportService;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/pdf")
public class PDFController {

    @Autowired
    private JasperReportService reportService;

    @GetMapping("/download")
    public void downloadPdf(@RequestParam String name, @RequestParam String path, HttpServletResponse response) {
        Map<String, Object> data = new HashMap<>();
        data.put("userName", name);
        data.put("careerPath", path);

        reportService.exportPdf("reports/career_report.jrxml", data, response);
    }
    @GetMapping("/career-table")
    public void generateCareerTablePdf(HttpServletResponse response) {
        List<CareerSuggestion> list = List.of(
                new CareerSuggestion("Java Developer", "Java, Spring Boot", "₹6 LPA", "High"),
                new CareerSuggestion("Data Analyst", "Python, Excel, SQL", "₹5.5 LPA", "Medium"),
                new CareerSuggestion("Web Developer", "HTML, CSS, JS", "₹4 LPA", "High")
        );

        reportService.exportPdfWithList(list, "reports/career_report_with_table.jrxml", response);
    }

}
=======
package com.advisor.controller;

import com.advisor.entity.CareerSuggestion;
import com.advisor.service.JasperReportService;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/pdf")
public class PDFController {

    @Autowired
    private JasperReportService reportService;

    @GetMapping("/download")
    public void downloadPdf(@RequestParam String name, @RequestParam String path, HttpServletResponse response) {
        Map<String, Object> data = new HashMap<>();
        data.put("userName", name);
        data.put("careerPath", path);

        reportService.exportPdf("reports/career_report.jrxml", data, response);
    }
    @GetMapping("/career-table")
    public void generateCareerTablePdf(HttpServletResponse response) {
        List<CareerSuggestion> list = List.of(
                new CareerSuggestion("Java Developer", "Java, Spring Boot", "₹6 LPA", "High"),
                new CareerSuggestion("Data Analyst", "Python, Excel, SQL", "₹5.5 LPA", "Medium"),
                new CareerSuggestion("Web Developer", "HTML, CSS, JS", "₹4 LPA", "High")
        );

        reportService.exportPdfWithList(list, "reports/career_report_with_table.jrxml", response);
    }

}
>>>>>>> 9c3495dfddaf30f5f49bcae2a62b9d6f7d0a15ca
