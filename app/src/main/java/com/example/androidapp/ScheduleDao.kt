package com.example.androidapp
import androidx.room.Dao
import androidx.room.Insert
import androidx.room.Query

@Dao
interface ScheduleDao {
    @Query("SELECT * FROM schedule WHERE groupName = :groupName AND dayOfWeek = :dayOfWeek")
    suspend fun getScheduleForGroupAndDay(groupName: String, dayOfWeek: String): List<ScheduleEntity>

    @Insert
    suspend fun insertSchedule(vararg schedule: ScheduleEntity) // Вставка расписания
}
