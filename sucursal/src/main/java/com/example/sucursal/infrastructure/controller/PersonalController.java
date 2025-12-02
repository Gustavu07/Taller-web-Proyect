package com.example.sucursal.infrastructure.controller;

import com.example.sucursal.application.dto.PersonalDTO;

import com.example.sucursal.application.usecase.PersonalUseCase;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/personal")
public class PersonalController {

    @Autowired
    private PersonalUseCase personalUseCase;

    @GetMapping("/{id}")
    public PersonalDTO obtenerPersonal(@PathVariable Long id) {
        return personalUseCase.obtener(id);
    }

        // Crear personal
    @PostMapping("/{sucursalId}")
    public PersonalDTO crearPersonal(@PathVariable Long sucursalId, @RequestBody PersonalDTO dto) {
        return personalUseCase.crear(sucursalId, dto);
    }
    // Editar personal0+-22

    @PutMapping("/{id}")
    public PersonalDTO editarPersonal(@PathVariable Long id, @RequestBody PersonalDTO dto) {
        return personalUseCase.editar(id, dto);
    }

    // Eliminar personal
    @DeleteMapping("/{id}")
    public void eliminarPersonal(@PathVariable Long id) {
        personalUseCase.eliminar(id);
    }

    // Listar todo el personal
    @GetMapping
    public List<PersonalDTO> listarPersonal() {
        return personalUseCase.listar();
    }

    // Reasignar personal a otra sucursal
    @PutMapping("/{id}/reasignar")
    public PersonalDTO reasignarSucursal(@PathVariable Long id, @RequestParam Long nuevaSucursalId) {
        return personalUseCase.reasignarSucursal(id, nuevaSucursalId);
    }

    // Asignar a una sucursal (nuevo)
    @PutMapping("/{id}/asignar")
    public PersonalDTO asignarSucursal(@PathVariable Long id, @RequestParam Long sucursalId) {
        return personalUseCase.asignarSucursal(id, sucursalId);
    }
}
