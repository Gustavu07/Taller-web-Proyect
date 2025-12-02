package com.example.sucursal.infrastructure.entity;

import jakarta.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "sucursales",
        indexes = {
                @Index(name = "ix_sucursal_activa", columnList = "activa"),
                @Index(name = "ix_sucursal_direccion", columnList = "direccion")
        })
public class SucursalEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 200)
    private String direccion;

    @Column(nullable = false, length = 20)
    private String telefono;

    @Column(nullable = false)
    private Double latitud;

    @Column(nullable = false)
    private Double longitud;

    @Column(length = 500)
    private String imagenUrl;

    @Column(nullable = false)
    private boolean activa = true;

    @ElementCollection
    @CollectionTable(name = "sucursal_numeros_contacto",
            joinColumns = @JoinColumn(name = "sucursal_id"))
    @Column(name = "numero_contacto", length = 20)
    private List<String> numerosContacto = new ArrayList<>();

    @ElementCollection
    @CollectionTable(name = "sucursal_numeros_corporativos",
            joinColumns = @JoinColumn(name = "sucursal_id"))
    @Column(name = "numero_corporativo", length = 20)
    private List<String> numerosCorporativos = new ArrayList<>();

    protected SucursalEntity() { }

    public SucursalEntity(
            String direccion,
            String telefono,
            Double latitud,
            Double longitud,
            String imagenUrl,
            boolean activa,
            List<String> numerosContacto,
            List<String> numerosCorporativos
    ) {
        this.direccion = direccion;
        this.telefono = telefono;
        this.latitud = latitud;
        this.longitud = longitud;
        this.imagenUrl = imagenUrl;
        this.activa = activa;
        this.numerosContacto = numerosContacto != null ? numerosContacto : new ArrayList<>();
        this.numerosCorporativos = numerosCorporativos != null ? numerosCorporativos : new ArrayList<>();
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

    public String getImagenUrl() {
        return imagenUrl;
    }

    public boolean isActiva() {
        return activa;
    }

    public List<String> getNumerosContacto() {
        return numerosContacto;
    }

    public List<String> getNumerosCorporativos() {
        return numerosCorporativos;
    }

    // Setters
    public void setDireccion(String direccion) {
        this.direccion = direccion;
    }

    public void setTelefono(String telefono) {
        this.telefono = telefono;
    }

    public void setLatitud(Double latitud) {
        this.latitud = latitud;
    }

    public void setLongitud(Double longitud) {
        this.longitud = longitud;
    }

    public void setImagenUrl(String imagenUrl) {
        this.imagenUrl = imagenUrl;
    }

    public void setActiva(boolean activa) {
        this.activa = activa;
    }

    public void setNumerosContacto(List<String> numerosContacto) {
        this.numerosContacto = numerosContacto;
    }

    public void setNumerosCorporativos(List<String> numerosCorporativos) {
        this.numerosCorporativos = numerosCorporativos;
    }
}
