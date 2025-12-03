package com.example.sucursal.infrastructure.controller;
import com.example.sucursal.application.dto.PersonalDTO;
import com.example.sucursal.application.service.PersonalService;
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
@RequestMapping("/api/personal")
@Tag(name = "Personal")
public class PersonalController {
    private final PersonalService personalService;

    public PersonalController(PersonalService personalService) {
        this.personalService = personalService;
    }

    @GetMapping
    @Operation(summary = "Listar personal", description = "Devuelve todo el personal")
    @ApiResponse(responseCode = "200", description = "Listado de personal",
            content = @Content(mediaType = "application/json", schema = @Schema(implementation = PersonalDTO.class)))
    public ResponseEntity<List<PersonalDTO>> getAll() {
        return ResponseEntity.ok(personalService.getAll());
    }

    @GetMapping("/{id}")
    @Operation(summary = "Obtener personal por id", description = "Devuelve un personal por su id")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Personal encontrado",
                    content = @Content(mediaType = "application/json", schema = @Schema(implementation = PersonalDTO.class))),
            @ApiResponse(responseCode = "404", description = "Personal no encontrado")
    })
    public ResponseEntity<PersonalDTO> getById(
            @Parameter(description = "Id del personal", required = true) @PathVariable Long id) {
        return ResponseEntity.ok(personalService.getById(id));
    }

    @GetMapping("/sucursal/{sucursalId}")
    @Operation(summary = "Obtener personal por sucursal", description = "Devuelve todo el personal de una sucursal")
    @ApiResponse(responseCode = "200", description = "Listado de personal de la sucursal")
    public ResponseEntity<List<PersonalDTO>> getBySucursalId(
            @Parameter(description = "Id de la sucursal", required = true) @PathVariable Long sucursalId) {
        return ResponseEntity.ok(personalService.getBySucursalId(sucursalId));
    }

    @PostMapping
    @Operation(summary = "Crear personal", description = "Crea un nuevo personal")
    @ApiResponse(responseCode = "200", description = "Personal creado",
            content = @Content(mediaType = "application/json", schema = @Schema(implementation = PersonalDTO.class)))
    public ResponseEntity<PersonalDTO> save(
            @io.swagger.v3.oas.annotations.parameters.RequestBody(description = "Personal a crear")
            @RequestBody PersonalDTO personalDTO) {
        return ResponseEntity.ok(personalService.save(personalDTO));
    }

    @PutMapping("/{id}")
    @Operation(summary = "Actualizar personal", description = "Actualiza un personal existente")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Personal actualizado"),
            @ApiResponse(responseCode = "404", description = "Personal no encontrado")
    })
    public ResponseEntity<PersonalDTO> update(
            @PathVariable Long id,
            @RequestBody PersonalDTO personalDTO) {
        return ResponseEntity.ok(personalService.update(id, personalDTO));
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Eliminar personal", description = "Elimina un personal por id")
    @ApiResponse(responseCode = "204", description = "Personal eliminado")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        personalService.delete(id);
        return ResponseEntity.noContent().build();
    }

    @PatchMapping("/{personalId}/reasignar/{nuevaSucursalId}")
    @Operation(summary = "Reasignar personal a otra sucursal",
            description = "Reasigna un personal a una nueva sucursal (el número corporativo NO se mueve)")
    @ApiResponse(responseCode = "200", description = "Personal reasignado exitosamente")
    public ResponseEntity<PersonalDTO> reasignar(
            @Parameter(description = "Id del personal", required = true) @PathVariable Long personalId,
            @Parameter(description = "Id de la nueva sucursal", required = true) @PathVariable Long nuevaSucursalId) {
        return ResponseEntity.ok(personalService.reasignarSucursal(personalId, nuevaSucursalId));
    }
}
