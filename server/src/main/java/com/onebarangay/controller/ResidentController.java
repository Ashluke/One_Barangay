package com.onebarangay.controller;

import com.onebarangay.dto.ResidentRequest;
import com.onebarangay.model.Resident;
import com.onebarangay.service.ResidentService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/residents")
@CrossOrigin(origins = "*")
public class ResidentController {

    private final ResidentService service;

    public ResidentController(ResidentService service) {
        this.service = service;
    }

    // CREATE
    @PostMapping
    public Resident addResident(@RequestBody ResidentRequest req) {
        return service.addResident(req);
    }

    // READ ALL
    @GetMapping
    public List<Resident> getAll() {
        return service.getAllResidents();
    }

    // READ BY ID
    @GetMapping("/{id}")
    public Resident getById(@PathVariable Long id) {
        return service.getResidentById(id);
    }

    // DELETE
    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        service.deleteResident(id);
    }

    @PutMapping("/{id}")
    public Resident update(@PathVariable Long id, @RequestBody ResidentRequest req) {
        return service.updateResident(id, req);
    }
}