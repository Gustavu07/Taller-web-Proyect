package com.example.sucursal.domain.valueobjects;

public class EmailValue {
    private String value;

    public EmailValue(String value) {
        if (value == null || value.isEmpty()) {
            throw new IllegalArgumentException("El correo no puede estar vacío");
        }
        if (!value.matches("^[A-Za-z0-9+_.-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,}$")) {
            throw new IllegalArgumentException("El formato del correo es inválido");
        }
        this.value = value.toLowerCase(); // Normalizar
    }

    public String getValue() {
        return value;
    }
}
