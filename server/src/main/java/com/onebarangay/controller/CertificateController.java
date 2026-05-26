package com.onebarangay.controller;

import com.onebarangay.dto.CertificateRequest;
import com.onebarangay.service.CertificateService;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/certificates")
@CrossOrigin(origins = "*")
public class CertificateController {

    private final CertificateService service;

    public CertificateController(CertificateService service) {
        this.service = service;
    }

    // create cert
    @PostMapping("/indigency")
    public ResponseEntity<byte[]> generateIndigency(@RequestBody CertificateRequest req) {

        byte[] file = service.createIndigency(req);

        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION,
                        "attachment; filename=barangay_indigency.docx")
                .contentType(MediaType.parseMediaType(
                    "application/vnd.openxmlformats-officedocument.wordprocessingml.document")
                )
                .body(file);
    }
}