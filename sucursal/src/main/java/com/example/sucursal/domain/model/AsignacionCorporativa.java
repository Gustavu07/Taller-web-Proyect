package com.example.sucursal.domain.model;

import com.example.sucursal.domain.valueobjects.TelefonoValue;

public class AsignacionCorporativa {

    private long id;
    private Long personalId;
    private Long sucursalId;
    private TelefonoValue numeroCorporativo;
    private boolean activo;

    public AsignacionCorporativa() {
    }

    public AsignacionCorporativa(
            long id,
            Long personalId,
            Long sucursalId,
            String numeroCorporativo,
            boolean activo
    ) {
        this.id = id;
        this.personalId = personalId;
        this.sucursalId = sucursalId;
        this.numeroCorporativo = new TelefonoValue(numeroCorporativo);
        this.activo = activo;
    }

    public long getId() {
        return id;
    }

    public Long getPersonalId() {
        return personalId;
    }

    public Long getSucursalId() {
        return sucursalId;
    }
    public String getNumeroCorporativo() {
        return numeroCorporativo.getValue();
    }

    public boolean isActivo() {
        return activo;
    }
}

