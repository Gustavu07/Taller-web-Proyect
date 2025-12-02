package com.example.sucursal.infrastructure.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "asignaciones_corporativas",
        indexes = {
                @Index(name = "ix_asignacion_personal", columnList = "personal_id"),
                @Index(name = "ix_asignacion_sucursal", columnList = "sucursal_id"),
                @Index(name = "ix_asignacion_activo", columnList = "activo")
        })
public class AsignacionCorporativaEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(optional = false, fetch = FetchType.LAZY)
    @JoinColumn(name = "personal_id", nullable = false,
            foreignKey = @ForeignKey(name = "fk_asignacion_personal"))
    private PersonalEntity personal;

    @ManyToOne(optional = false, fetch = FetchType.LAZY)
    @JoinColumn(name = "sucursal_id", nullable = false,
            foreignKey = @ForeignKey(name = "fk_asignacion_sucursal"))
    private SucursalEntity sucursal;

    @Column(name = "numero_corporativo", nullable = false, length = 20)
    private String numeroCorporativo;

    @Column(nullable = false)
    private boolean activo = true;

    protected AsignacionCorporativaEntity() { }

    public AsignacionCorporativaEntity(
            PersonalEntity personal,
            SucursalEntity sucursal,
            String numeroCorporativo,
            boolean activo
    ) {
        this.personal = personal;
        this.sucursal = sucursal;
        this.numeroCorporativo = numeroCorporativo;
        this.activo = activo;
    }
    public Long getId() {
        return id;
    }

    public PersonalEntity getPersonal() {
        return personal;
    }

    public SucursalEntity getSucursal() {
        return sucursal;
    }

    public String getNumeroCorporativo() {
        return numeroCorporativo;
    }

    public boolean isActivo() {
        return activo;
    }

    // Setters
    public void setPersonal(PersonalEntity personal) {
        this.personal = personal;
    }

    public void setSucursal(SucursalEntity sucursal) {
        this.sucursal = sucursal;
    }

    public void setNumeroCorporativo(String numeroCorporativo) {
        this.numeroCorporativo = numeroCorporativo;
    }

    public void setActivo(boolean activo) {
        this.activo = activo;
    }
}
