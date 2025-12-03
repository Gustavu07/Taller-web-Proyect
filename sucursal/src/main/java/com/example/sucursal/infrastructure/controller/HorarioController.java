package com.example.sucursal.infrastructure.controller;

import com.example.sucursal.application.dto.HorarioDTO;
import com.example.sucursal.application.service.HorarioService;
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
@RequestMapping("/api/horarios")
@Tag(name = "Horarios")
public class HorarioController {
    private final HorarioService horarioService;

    public HorarioController(HorarioService horarioService) {
        this.horarioService = horarioService;
    }

    @GetMapping
    @Operation(summary = "Listar horarios", description = "Devuelve todos los horarios")
    @ApiResponse(responseCode = "200", description = "Listado de horarios",
            content = @Content(mediaType = "application/json", schema = @Schema(implementation = HorarioDTO.class)))
    public ResponseEntity<List<HorarioDTO>> getAll() {
        return ResponseEntity.ok(horarioService.getAll());
    }

    @GetMapping("/{id}")
    @Operation(summary = "Obtener horario por id", description = "Devuelve un horario por su id")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Horario encontrado",
                    content = @Content(mediaType = "application/json", schema = @Schema(implementation = HorarioDTO.class))),
            @ApiResponse(responseCode = "404", description = "Horario no encontrado")
    })
    public ResponseEntity<HorarioDTO> getById(
            @Parameter(description = "Id del horario", required = true) @PathVariable Long id) {
        return ResponseEntity.ok(horarioService.getById(id));
    }

    @GetMapping("/sucursal/{sucursalId}")
    @Operation(summary = "Obtener horarios por sucursal", description = "Devuelve todos los horarios de una sucursal")
    @ApiResponse(responseCode = "200", description = "Listado de horarios de la sucursal")
    public ResponseEntity<List<HorarioDTO>> getBySucursalId(
            @Parameter(description = "Id de la sucursal", required = true) @PathVariable Long sucursalId) {
        return ResponseEntity.ok(horarioService.getBySucursalId(sucursalId));
    }

    @PostMapping
    @Operation(summary = "Crear horario", description = "Crea un nuevo horario")
    @ApiResponse(responseCode = "200", description = "Horario creado",
            content = @Content(mediaType = "application/json", schema = @Schema(implementation = HorarioDTO.class)))
    public ResponseEntity<HorarioDTO> save(
            @io.swagger.v3.oas.annotations.parameters.RequestBody(description = "Horario a crear")
            @RequestBody HorarioDTO horarioDTO) {
        return ResponseEntity.ok(horarioService.save(horarioDTO));
    }

    @PutMapping("/{id}")
    @Operation(summary = "Actualizar horario", description = "Actualiza un horario existente")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Horario actualizado"),
            @ApiResponse(responseCode = "404", description = "Horario no encontrado")
    })
    public ResponseEntity<HorarioDTO> update(
            @PathVariable Long id,
            @RequestBody HorarioDTO horarioDTO) {
        return ResponseEntity.ok(horarioService.update(id, horarioDTO));
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Eliminar horario", description = "Elimina un horario por id")
    @ApiResponse(responseCode = "204", description = "Horario eliminado")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        horarioService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
