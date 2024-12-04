package com.example.androidapp

import androidx.room.Entity
import androidx.room.PrimaryKey

@Entity(tableName = "groups")
data class GroupEntity(
    @PrimaryKey(autoGenerate = true) val id: Int = 0,
    val groupName: String // Название группы (например, "ИП244")
)

@Entity(tableName = "schedule")
data class ScheduleEntity(
    @PrimaryKey(autoGenerate = true) val id: Int = 0,
    val groupName: String,  // Название группы
    val dayOfWeek: String,  // День недели (например, "Пн")
    val time: String,       // Время занятия (например, "9.10-10.10")
    val subject: String,    // Название пары (например, "Мдк 03")
    val teacher: String     // Имя преподавателя (например, "Петров И.И.")
)
