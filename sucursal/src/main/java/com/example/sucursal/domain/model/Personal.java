package com.example.sucursal.domain.model;

import com.example.sucursal.domain.valueobjects.EmailValue;
import com.example.sucursal.domain.valueobjects.TelefonoValue;

import java.util.List;
import java.util.stream.Collectors;

public class Personal {

    private long id;
    private String nombreCompleto;
    private EmailValue correoInstitucional;
    private List<TelefonoValue> numerosTelefono;
    private Long sucursalId;

    public Personal() {
    }

    public Personal(
            long id,
            String nombreCompleto,
            String correoInstitucional,
            List<String> numerosTelefono,
            Long sucursalId
    ) {
        this.id = id;
        this.nombreCompleto = nombreCompleto;
        this.correoInstitucional = new EmailValue(correoInstitucional);
        this.numerosTelefono = numerosTelefono.stream()
                .map(TelefonoValue::new)
                .collect(Collectors.toList());
        this.sucursalId = sucursalId;
    }

    public long getId() {
        return id;
    }

    public String getNombreCompleto() {
        return nombreCompleto;
    }

    public String getCorreoInstitucional() {
        return correoInstitucional.getValue();
    }

    public List<String> getNumerosTelefono() {
        return numerosTelefono.stream()
                .map(TelefonoValue::getValue)
                .collect(Collectors.toList());
    }

    public Long getSucursalId() {
        return sucursalId;
    }
}

