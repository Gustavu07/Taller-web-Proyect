package com.example.sucursal.domain.valueobjects;

public class DireccionValue {
    private String value;

    public DireccionValue(String value) {
        if (value == null || value.trim().isEmpty()) {
            throw new IllegalArgumentException("La dirección no puede estar vacía");
        }
        if (value.length() < 8) {
            throw new IllegalArgumentException("La dirección debe tener al menos 8 caracteres");
        }
        if (value.length() > 200) {
            throw new IllegalArgumentException("La dirección no puede exceder 200 caracteres");
        }
        this.value = value.trim();
    }

    public String getValue() {
        return value;
    }
}
