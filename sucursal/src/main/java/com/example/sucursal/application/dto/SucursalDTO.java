package com.example.sucursal.application.dto;

import java.util.List;

public class SucursalDTO {
    private Long id;
    private String direccion;
    private String telefono;
    private Double latitud;
    private Double longitud;
    private boolean activa;
    private String imagenUrl;
    private List<String> numerosContacto;
    private List<String> numerosCorporativos;

    public SucursalDTO(
            Long id,
            String direccion,
            String telefono,
            Double latitud,
            Double longitud,
            boolean activa,
            String imagenUrl,
            List<String> numerosContacto,
            List<String> numerosCorporativos
    ) {
        this.id = id;
        this.direccion = direccion;
        this.telefono = telefono;
        this.latitud = latitud;
        this.longitud = longitud;
        this.activa = activa;
        this.imagenUrl = imagenUrl;
        this.numerosContacto = numerosContacto;
        this.numerosCorporativos = numerosCorporativos;
    }

    public Long getId() {
        return id;
    }

    public String getDireccion() {
        return direccion;
    }

    public String getTelefono() {
        return telefono;
    }

    public Double getLatitud() {
        return latitud;
    }

    public Double getLongitud() {
        return longitud;
    }

    public boolean isActiva() {
        return activa;
    }

    public String getImagenUrl() {
        return imagenUrl;
    }

    public List<String> getNumerosContacto() {
        return numerosContacto;
    }

    public List<String> getNumerosCorporativos() {
        return numerosCorporativos;
    }
}
