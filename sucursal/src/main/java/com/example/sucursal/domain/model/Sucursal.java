package com.example.sucursal.domain.model;

import com.example.sucursal.domain.valueobjects.DireccionValue;
import com.example.sucursal.domain.valueobjects.TelefonoValue;

import java.util.List;
import java.util.stream.Collectors;

public class Sucursal {

    private long id;
    private DireccionValue direccion;
    private TelefonoValue telefono;
    private Double latitud;
    private Double longitud;
    private String imagenUrl;
    private boolean activa;
    private List<TelefonoValue> numerosContacto;
    private List<TelefonoValue> numerosCorporativos;

    private List<Long> horariosIds;
    private List<Long> personalIds;

    public Sucursal() {
    }

    public Sucursal(
            long id,
            String direccion,
            String telefono,
            Double latitud,
            Double longitud,
            String imagenUrl,
            boolean activa,
            List<String> numerosContacto,
            List<String> numerosCorporativos,
            List<Long> horariosIds,
            List<Long> personalIds
    ) {
        this.id = id;
        this.direccion = new DireccionValue(direccion);
        this.telefono = new TelefonoValue(telefono);
        this.latitud = latitud;
        this.longitud = longitud;
        this.imagenUrl = imagenUrl;
        this.activa = activa;
        this.numerosContacto = numerosContacto.stream()
                .map(TelefonoValue::new)
                .collect(Collectors.toList());
        this.numerosCorporativos = numerosCorporativos.stream()
                .map(TelefonoValue::new)
                .collect(Collectors.toList());
        this.horariosIds = horariosIds;
        this.personalIds = personalIds;
    }

    public long getId() { return id; }
    public String getDireccion() {
        return direccion.getValue();
    }
    public String getTelefono() {
        return telefono.getValue();
    }
    public Double getLatitud() { return latitud; }
    public Double getLongitud() { return longitud; }
    public String getImagenUrl() { return imagenUrl; }
    public boolean isActiva() { return activa; }
    public List<String> getNumerosContacto() {
        return numerosContacto.stream()
                .map(TelefonoValue::getValue)
                .collect(Collectors.toList());
    }
    public List<String> getNumerosCorporativos() {
        return numerosCorporativos.stream()
                .map(TelefonoValue::getValue)
                .collect(Collectors.toList());
    }
    public List<Long> getHorariosIds() { return horariosIds; }
    public List<Long> getPersonalIds() { return personalIds; }
}
