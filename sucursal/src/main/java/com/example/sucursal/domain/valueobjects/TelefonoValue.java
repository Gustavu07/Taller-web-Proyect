package com.example.sucursal.domain.valueobjects;

public class TelefonoValue {
    private String value;

    public TelefonoValue(String value) {
        if (value == null || value.isEmpty()) {
            throw new IllegalArgumentException("El teléfono no puede estar vacío");
        }
        // Eliminar espacios y guiones
        String cleaned = value.replaceAll("[\\s-]", "");

        if (!cleaned.matches("^\\+?[0-9]{8,15}$")) {
            throw new IllegalArgumentException("El teléfono debe tener entre 8 y 15 dígitos");
        }
        this.value = cleaned;
    }

    public String getValue() {
        return value;
    }
}
