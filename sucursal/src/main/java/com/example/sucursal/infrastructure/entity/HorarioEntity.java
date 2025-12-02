package com.example.sucursal.infrastructure.entity;

import jakarta.persistence.*;
import java.time.DayOfWeek;
import java.time.LocalTime;

@Entity
@Table(name = "horarios",
        uniqueConstraints = @UniqueConstraint(
                name = "uk_horario_sucursal_dia",
                columnNames = {"sucursal_id", "dia_semana"}
        ),
        indexes = {
                @Index(name = "ix_horario_sucursal", columnList = "sucursal_id"),
                @Index(name = "ix_horario_dia", columnList = "dia_semana")
        })
public class HorarioEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Enumerated(EnumType.STRING)
    @Column(name = "dia_semana", nullable = false, length = 20)
    private DayOfWeek diaSemana;

    @Column(name = "hora_apertura", nullable = false)
    private LocalTime horaApertura;

    @Column(name = "hora_cierre", nullable = false)
    private LocalTime horaCierre;

    @ManyToOne(optional = false, fetch = FetchType.LAZY)
    @JoinColumn(name = "sucursal_id", nullable = false,
            foreignKey = @ForeignKey(name = "fk_horario_sucursal"))
    private SucursalEntity sucursal;

    protected HorarioEntity() { }

    public HorarioEntity(
            DayOfWeek diaSemana,
            LocalTime horaApertura,
            LocalTime horaCierre,
            SucursalEntity sucursal
    ) {
        this.diaSemana = diaSemana;
        this.horaApertura = horaApertura;
        this.horaCierre = horaCierre;
        this.sucursal = sucursal;
    }
    public Long getId() {
        return id;
    }

    public DayOfWeek getDiaSemana() {
        return diaSemana;
    }

    public LocalTime getHoraApertura() {
        return horaApertura;
    }

    public LocalTime getHoraCierre() {
        return horaCierre;
    }

    public SucursalEntity getSucursal() {
        return sucursal;
    }

    // Setters
    public void setDiaSemana(DayOfWeek diaSemana) {
        this.diaSemana = diaSemana;
    }

    public void setHoraApertura(LocalTime horaApertura) {
        this.horaApertura = horaApertura;
    }

    public void setHoraCierre(LocalTime horaCierre) {
        this.horaCierre = horaCierre;
    }

    public void setSucursal(SucursalEntity sucursal) {
        this.sucursal = sucursal;
    }
}
