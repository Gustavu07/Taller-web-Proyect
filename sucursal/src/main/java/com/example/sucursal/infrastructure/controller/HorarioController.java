package com.example.sucursal.controller;

import com.example.sucursal.application.dto.HorarioDTO;

import com.example.sucursal.application.usecase.HorarioUseCase;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/horarios")
public class HorarioController {

    @Autowired
    private HorarioUseCase horarioUseCase;

    @GetMapping("/{id}")
    public HorarioDTO obtenerHorario(@PathVariable Long id) {
        return horarioUseCase.obtener(id);
    }

    // Crear horario
    @PostMapping("/{sucursalId}")
    public HorarioDTO crearHorario(@PathVariable Long sucursalId, @RequestBody HorarioDTO dto) {
        return horarioUseCase.crear(sucursalId, dto);
    }

    // Listar todos los horarios
    @GetMapping
    public List<HorarioDTO> listarHorarios() {
        return horarioUseCase.listar();
    }

    // Listar por sucursal
    @GetMapping("/sucursal/{sucursalId}")
    public List<HorarioDTO> listarPorSucursal(@PathVariable Long sucursalId) {
        return horarioUseCase.listarPorSucursal(sucursalId);
    }

    // Editar horario
    @PutMapping("/{id}")
    public HorarioDTO editarHorario(@PathVariable Long id, @RequestBody HorarioDTO dto) {
        return horarioUseCase.editar(id, dto);
    }

    // Eliminar horario
    @DeleteMapping("/{id}")
    public void eliminarHorario(@PathVariable Long id) {
        horarioUseCase.eliminar(id);
    }
}
