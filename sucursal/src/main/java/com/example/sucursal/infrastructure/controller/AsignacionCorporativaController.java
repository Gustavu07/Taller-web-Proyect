package com.example.sucursal.infrastructure.controller;
import com.example.sucursal.application.dto.AsignacionCorporativaDTO;
import com.example.sucursal.application.service.AsignacionCorporativaService;
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
@RequestMapping("/api/asignaciones-corporativas")
@Tag(name = "Asignaciones Corporativas")
public class AsignacionCorporativaController {
    private final AsignacionCorporativaService asignacionService;

    public AsignacionCorporativaController(AsignacionCorporativaService asignacionService) {
        this.asignacionService = asignacionService;
    }

    @GetMapping
    @Operation(summary = "Listar asignaciones corporativas", description = "Devuelve todas las asignaciones")
    @ApiResponse(responseCode = "200", description = "Listado de asignaciones",
            content = @Content(mediaType = "application/json", schema = @Schema(implementation = AsignacionCorporativaDTO.class)))
    public ResponseEntity<List<AsignacionCorporativaDTO>> getAll() {
        return ResponseEntity.ok(asignacionService.getAll());
    }

    @GetMapping("/{id}")
    @Operation(summary = "Obtener asignación por id", description = "Devuelve una asignación por su id")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Asignación encontrada",
                    content = @Content(mediaType = "application/json", schema = @Schema(implementation = AsignacionCorporativaDTO.class))),
            @ApiResponse(responseCode = "404", description = "Asignación no encontrada")
    })
    public ResponseEntity<AsignacionCorporativaDTO> getById(
            @Parameter(description = "Id de la asignación", required = true) @PathVariable Long id) {
        return ResponseEntity.ok(asignacionService.getById(id));
    }

    @GetMapping("/personal/{personalId}/activa")
    @Operation(summary = "Obtener asignación activa de un personal",
            description = "Devuelve la asignación corporativa activa de un personal")
    @ApiResponse(responseCode = "200", description = "Asignación activa encontrada")
    public ResponseEntity<AsignacionCorporativaDTO> getByPersonalIdAndActivo(
            @Parameter(description = "Id del personal", required = true) @PathVariable Long personalId) {
        return ResponseEntity.ok(asignacionService.getByPersonalIdAndActivo(personalId));
    }

    @GetMapping("/sucursal/{sucursalId}")
    @Operation(summary = "Obtener asignaciones por sucursal",
            description = "Devuelve todas las asignaciones de una sucursal")
    @ApiResponse(responseCode = "200", description = "Listado de asignaciones de la sucursal")
    public ResponseEntity<List<AsignacionCorporativaDTO>> getBySucursalId(
            @Parameter(description = "Id de la sucursal", required = true) @PathVariable Long sucursalId) {
        return ResponseEntity.ok(asignacionService.getBySucursalId(sucursalId));
    }

    @PostMapping
    @Operation(summary = "Crear asignación corporativa", description = "Asigna un número corporativo a un personal")
    @ApiResponse(responseCode = "200", description = "Asignación creada",
            content = @Content(mediaType = "application/json", schema = @Schema(implementation = AsignacionCorporativaDTO.class)))
    public ResponseEntity<AsignacionCorporativaDTO> save(
            @io.swagger.v3.oas.annotations.parameters.RequestBody(description = "Asignación a crear")
            @RequestBody AsignacionCorporativaDTO asignacionDTO) {
        return ResponseEntity.ok(asignacionService.save(asignacionDTO));
    }

    @PutMapping("/{id}")
    @Operation(summary = "Actualizar asignación", description = "Actualiza una asignación existente")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Asignación actualizada"),
            @ApiResponse(responseCode = "404", description = "Asignación no encontrada")
    })
    public ResponseEntity<AsignacionCorporativaDTO> update(
            @PathVariable Long id,
            @RequestBody AsignacionCorporativaDTO asignacionDTO) {
        return ResponseEntity.ok(asignacionService.update(id, asignacionDTO));
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Eliminar asignación", description = "Elimina una asignación por id")
    @ApiResponse(responseCode = "204", description = "Asignación eliminada")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        asignacionService.delete(id);
        return ResponseEntity.noContent().build();
    }

    @PatchMapping("/{id}/desactivar")
    @Operation(summary = "Desactivar asignación",
            description = "Desactiva una asignación corporativa (libera el número)")
    @ApiResponse(responseCode = "204", description = "Asignación desactivada")
    public ResponseEntity<Void> desactivar(@PathVariable Long id) {
        asignacionService.desactivarAsignacion(id);
        return ResponseEntity.noContent().build();
    }
}