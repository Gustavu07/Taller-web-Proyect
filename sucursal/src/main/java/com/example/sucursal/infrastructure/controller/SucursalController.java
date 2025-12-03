package com.example.sucursal.infrastructure.controller;


import com.example.sucursal.application.dto.SucursalDTO;
import com.example.sucursal.application.service.SucursalService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/sucursales")
@Tag(name = "Sucursales")
public class SucursalController {
    private final SucursalService sucursalService;

    public SucursalController(SucursalService sucursalService) {
        this.sucursalService = sucursalService;
    }
    @GetMapping
    @Operation(summary = "Listar sucursales", description = "Devuelve todas las sucursales")
    @ApiResponse(responseCode = "200", description = "Listado de sucursales",
            content = @Content(mediaType = "application/json", schema = @Schema(implementation = SucursalDTO.class)))
    public ResponseEntity<List<SucursalDTO>> getAll() {
        return ResponseEntity.ok(sucursalService.getAll());
    }

    @GetMapping("/{id}")
    @Operation(summary = "Obtener sucursal por id", description = "Devuelve una sucursal por su id")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Sucursal encontrada",
                    content = @Content(mediaType = "application/json", schema = @Schema(implementation = SucursalDTO.class))),
            @ApiResponse(responseCode = "404", description = "Sucursal no encontrada")
    })
    public ResponseEntity<SucursalDTO> getById(
            @Parameter(description = "Id de la sucursal", required = true) @PathVariable Long id) {
        return ResponseEntity.ok(sucursalService.getById(id));
    }

    @PostMapping
    @Operation(summary = "Crear sucursal", description = "Crea una nueva sucursal")
    @ApiResponse(responseCode = "200", description = "Sucursal creada",
            content = @Content(mediaType = "application/json", schema = @Schema(implementation = SucursalDTO.class)))
    public ResponseEntity<SucursalDTO> save(
            @io.swagger.v3.oas.annotations.parameters.RequestBody(description = "Sucursal a crear")
            @RequestBody SucursalDTO sucursalDTO) {
        return ResponseEntity.ok(sucursalService.save(sucursalDTO));
    }

    @PutMapping("/{id}")
    @Operation(summary = "Actualizar sucursal", description = "Actualiza una sucursal existente")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Sucursal actualizada"),
            @ApiResponse(responseCode = "404", description = "Sucursal no encontrada")
    })
    public ResponseEntity<SucursalDTO> update(
            @PathVariable Long id,
            @RequestBody SucursalDTO sucursalDTO) {
        return ResponseEntity.ok(sucursalService.update(id, sucursalDTO));
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Eliminar sucursal", description = "Elimina una sucursal por id")
    @ApiResponse(responseCode = "204", description = "Sucursal eliminada")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        sucursalService.delete(id);
        return ResponseEntity.noContent().build();
    }

    @PatchMapping("/{id}/activar")
    @Operation(summary = "Activar sucursal", description = "Activa una sucursal por id")
    @ApiResponse(responseCode = "200", description = "Sucursal activada")
    public ResponseEntity<SucursalDTO> activar(@PathVariable Long id) {
        return ResponseEntity.ok(sucursalService.activar(id));
    }

    @PatchMapping("/{id}/desactivar")
    @Operation(summary = "Desactivar sucursal", description = "Desactiva una sucursal por id")
    @ApiResponse(responseCode = "200", description = "Sucursal desactivada")
    public ResponseEntity<SucursalDTO> desactivar(@PathVariable Long id) {
        return ResponseEntity.ok(sucursalService.desactivar(id));
    }
}

