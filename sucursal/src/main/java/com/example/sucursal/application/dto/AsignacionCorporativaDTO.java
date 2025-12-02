package com.example.sucursal.application.dto;

public class AsignacionCorporativaDTO {
    private Long id;
    private Long personalId;
    private Long sucursalId;
    private String numeroCorporativo;
    private boolean activo;

    public AsignacionCorporativaDTO(
            Long id,
            Long personalId,
            Long sucursalId,
            String numeroCorporativo,
            boolean activo
    ) {
        this.id = id;
        this.personalId = personalId;
        this.sucursalId = sucursalId;
        this.numeroCorporativo = numeroCorporativo;
        this.activo = activo;
    }

    // Solo getters (sin setters)
    public Long getId() {
        return id;
    }

    public Long getPersonalId() {
        return personalId;
    }

    public Long getSucursalId() {
        return sucursalId;
    }

    public String getNumeroCorporativo() {
        return numeroCorporativo;
    }

    public boolean isActivo() {
        return activo;
    }
}
