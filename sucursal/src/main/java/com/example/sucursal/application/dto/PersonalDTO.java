package com.example.sucursal.application.dto;

import java.util.List;

public class PersonalDTO {
    private Long id;
    private String nombreCompleto;
    private String correoInstitucional;
    private List<String> numerosTelefono;
    private Long sucursalId;

    public PersonalDTO(
            Long id,
            String nombreCompleto,
            String correoInstitucional,
            List<String> numerosTelefono,
            Long sucursalId
    ) {
        this.id = id;
        this.nombreCompleto = nombreCompleto;
        this.correoInstitucional = correoInstitucional;
        this.numerosTelefono = numerosTelefono;
        this.sucursalId = sucursalId;
    }
    public Long getId() {
        return id;
    }

    public String getNombreCompleto() {
        return nombreCompleto;
    }

    public String getCorreoInstitucional() {
        return correoInstitucional;
    }

    public List<String> getNumerosTelefono() {
        return numerosTelefono;
    }

    public Long getSucursalId() {
        return sucursalId;
    }
}
