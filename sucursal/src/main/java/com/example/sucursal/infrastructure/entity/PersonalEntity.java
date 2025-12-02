package com.example.sucursal.infrastructure.entity;

import jakarta.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "personal",
        uniqueConstraints = @UniqueConstraint(
                name = "uk_personal_correo",
                columnNames = {"correo_institucional"}
        ),
        indexes = {
                @Index(name = "ix_personal_sucursal", columnList = "sucursal_id"),
                @Index(name = "ix_personal_nombre", columnList = "nombre_completo")
        })
public class PersonalEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "nombre_completo", nullable = false, length = 150)
    private String nombreCompleto;

    @Column(name = "correo_institucional", nullable = false, length = 100)
    private String correoInstitucional;

    @ElementCollection
    @CollectionTable(name = "personal_telefonos",
            joinColumns = @JoinColumn(name = "personal_id"))
    @Column(name = "numero_telefono", length = 20)
    private List<String> numerosTelefono = new ArrayList<>();

    @ManyToOne(optional = false, fetch = FetchType.LAZY)
    @JoinColumn(name = "sucursal_id", nullable = false,
            foreignKey = @ForeignKey(name = "fk_personal_sucursal"))
    private SucursalEntity sucursal;

    protected PersonalEntity() { }

    public PersonalEntity(
            String nombreCompleto,
            String correoInstitucional,
            List<String> numerosTelefono,
            SucursalEntity sucursal
    ) {
        this.nombreCompleto = nombreCompleto;
        this.correoInstitucional = correoInstitucional;
        this.numerosTelefono = numerosTelefono != null ? numerosTelefono : new ArrayList<>();
        this.sucursal = sucursal;
    }
    public Long getId() {
        return id;
    }

    public String getNombreCompleto() {
        return nombreCompleto;
    }

    public String getCorreoInstitucional() {
        return correoInstitucional;
    }

    public List<String> getNumerosTelefono() {
        return numerosTelefono;
    }

    public SucursalEntity getSucursal() {
        return sucursal;
    }

    // Setters
    public void setNombreCompleto(String nombreCompleto) {
        this.nombreCompleto = nombreCompleto;
    }

    public void setCorreoInstitucional(String correoInstitucional) {
        this.correoInstitucional = correoInstitucional;
    }

    public void setNumerosTelefono(List<String> numerosTelefono) {
        this.numerosTelefono = numerosTelefono;
    }

    public void setSucursal(SucursalEntity sucursal) {
        this.sucursal = sucursal;
    }
}
