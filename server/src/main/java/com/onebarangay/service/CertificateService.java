package com.onebarangay.service;

import com.deepoove.poi.XWPFTemplate;
import com.onebarangay.dto.CertificateRequest;
import com.onebarangay.model.Certificate;
import com.onebarangay.repository.CertificateRepository;
import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Service;

import java.io.ByteArrayOutputStream;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.HashMap;
import java.util.Map;

@Service
public class CertificateService {

    private final CertificateRepository repository;

    public CertificateService(CertificateRepository repository) {
        this.repository = repository;
    }

    public byte[] createIndigency(CertificateRequest req) {

        try {
            // save to database
            Certificate cert = new Certificate(
                    req.getFullName(),
                    req.getAge(),
                    req.getCivilStatus(),
                    req.getIncome()
            );

            repository.save(cert);

            // load template
            ClassPathResource resource =
                    new ClassPathResource("templates/brgy_indigency.docx");

            // date values
            LocalDate today = LocalDate.now();
            DateTimeFormatter formatter =
                    DateTimeFormatter.ofPattern("MMMM");

            // placeholder data
            Map<String, Object> data = new HashMap<>();

            data.put("FULL_NAME", req.getFullName());
            data.put("AGE", req.getAge());
            data.put("CIVIL_STATUS", req.getCivilStatus());
            data.put("INCOME", req.getIncome());

            data.put("DAY", today.getDayOfMonth());
            data.put("MONTH", today.format(formatter));
            data.put("YEAR", today.getYear());

            // generate docx
            XWPFTemplate template =
                    XWPFTemplate.compile(resource.getInputStream())
                            .render(data);

            ByteArrayOutputStream out =
                    new ByteArrayOutputStream();

            template.write(out);
            template.close();

            return out.toByteArray();

        } catch (Exception e) {
            throw new RuntimeException(
                    "Failed to generate certificate", e
            );
        }
    }
}