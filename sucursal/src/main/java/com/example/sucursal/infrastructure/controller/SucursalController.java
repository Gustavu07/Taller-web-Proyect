package com.example.sucursal.infrastructure.controller;


import com.example.sucursal.application.dto.SucursalDTO;
import com.example.sucursal.application.usecase.SucursalUseCase;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/sucursales")
public class SucursalController {

    @Autowired
    private SucursalUseCase sucursalUseCase;

    // Crear sucursal
    @PostMapping
    public SucursalDTO crearSucursal(@RequestBody SucursalDTO dto) {
        return sucursalUseCase.crear(dto);
    }

    // Editar sucursal
    @PutMapping("/{id}")
    public SucursalDTO editarSucursal(@PathVariable Long id, @RequestBody SucursalDTO dto) {
        return sucursalUseCase.editar(id, dto);
    }

    // Activar o desactivar sucursal
    @PutMapping("/{id}/estado")
    public SucursalDTO cambiarEstadoSucursal(@PathVariable Long id, @RequestParam boolean activa) {
        return sucursalUseCase.cambiarEstado(id, activa);
    }

    // Listar todas
    @GetMapping
    public List<SucursalDTO> listarSucursales() {
        return sucursalUseCase.listar();
    }

    // Eliminar
    @DeleteMapping("/{id}")
    public void eliminarSucursal(@PathVariable Long id) {
        sucursalUseCase.eliminar(id);
    }

    // Obtener detalle por ID (para landing por ejemplo)
    @GetMapping("/{id}")
    public SucursalDTO obtenerSucursal(@PathVariable Long id) {
        return sucursalUseCase.obtener(id);
    }
}
