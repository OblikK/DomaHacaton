package com.example.androidapp

import androidx.room.Dao
import androidx.room.Insert
import androidx.room.Query

@Dao
interface GroupDao {
    @Query("SELECT * FROM groups")
    suspend fun getAllGroups(): List<GroupEntity> // Получение всех групп

    @Insert
    suspend fun insertGroups(vararg groups: GroupEntity) // Вставка групп
}
