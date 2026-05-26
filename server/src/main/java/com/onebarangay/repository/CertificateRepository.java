package com.onebarangay.repository;

import com.onebarangay.model.Certificate;
import org.springframework.data.jpa.repository.JpaRepository;

// database
public interface CertificateRepository extends JpaRepository<Certificate, Long> {
}