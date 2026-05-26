package com.onebarangay.service;

import com.onebarangay.dto.ResidentRequest;
import com.onebarangay.model.Resident;
import com.onebarangay.repository.ResidentRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ResidentService {

    private final ResidentRepository repository;

    public ResidentService(ResidentRepository repository) {
        this.repository = repository;
    }

    // create resident
    public Resident addResident(ResidentRequest req) {

        Resident resident = new Resident(
                req.getFullName(),
                req.getAge(),
                req.getCivilStatus(),
                req.getAddress(),
                req.registeredVoter()
        );

        return repository.save(resident);
    }

    // get resident
    public List<Resident> getAllResidents() {
        return repository.findAll();
    }

    // get resident by id
    public Resident getResidentById(Long id) {
        return repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Resident not found"));
    }

    // update resident
    public Resident updateResident(Long id, ResidentRequest update) {

        Resident existing = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Resident not found"));

        existing.setFullName(
                update.getFullName() != null ? update.getFullName() : existing.getFullName()
        );

        existing.setAge(
                update.getAge() != 0 ? update.getAge() : existing.getAge()
        );

        existing.setCivilStatus(
                update.getCivilStatus() != null ? update.getCivilStatus() : existing.getCivilStatus()
        );

        existing.setAddress(
                update.getAddress() != null ? update.getAddress() : existing.getAddress()
        );

        existing.setRegisteredVoter(
                update.registeredVoter()
        );

        return repository.save(existing);
    }

    // delete resident by id
    public void deleteResident(Long id) {
        repository.deleteById(id);
    }
}