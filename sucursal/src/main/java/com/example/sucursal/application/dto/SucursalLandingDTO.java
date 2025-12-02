package com.example.sucursal.application.dto;

import java.util.List;

public class SucursalLandingDTO {
    private Long id;
    private String direccion;
    private Double latitud;
    private Double longitud;
    private List<String> imagenes;          // URLs de varias imágenes
    private List<String> numerosContacto;
    private List<HorarioDTO> horarios;      // Horarios completos de la sucursal
    private String descripcion;            // opcional, texto corto para landing


    public SucursalLandingDTO(
            Long id,
            String direccion,
            Double latitud,
            Double longitud,
            List<String> imagenes,
            List<String> numerosContacto,
            List<HorarioDTO> horarios,
            String descripcion
    ) {
        this.id = id;
        this.direccion = direccion;
        this.latitud = latitud;
        this.longitud = longitud;
        this.imagenes = imagenes;
        this.numerosContacto = numerosContacto;
        this.horarios = horarios;
        this.descripcion = descripcion;
    }

    public Long getId() {
        return id;
    }

    public String getDireccion() {
        return direccion;
    }

    public Double getLatitud() {
        return latitud;
    }

    public Double getLongitud() {
        return longitud;
    }

    public List<String> getImagenes() {
        return imagenes;
    }

    public List<String> getNumerosContacto() {
        return numerosContacto;
    }

    public List<HorarioDTO> getHorarios() {
        return horarios;
    }

    public String getDescripcion() {
        return descripcion;
    }
}
