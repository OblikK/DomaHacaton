package com.example.androidapp

import android.os.Bundle
import android.widget.Button
import androidx.appcompat.app.AppCompatActivity
import android.widget.TextView
import android.widget.Toast
import androidx.activity.ComponentActivity
import com.example.androidapp.R

class ItemsActivity : ComponentActivity() {

    private lateinit var textGroup: TextView
    private lateinit var textDay: TextView

    private var currentGroupIndex = 0
    private var currentDayIndex = 0

    // Список групп и дней недели
    private val groups = listOf("ИП243", "ИП244", "ИП245")
    private val days = listOf("Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс")

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_items)

        textGroup = findViewById(R.id.text_group)
        textDay = findViewById(R.id.text_day)

        // Устанавливаем начальные значения
        textGroup.text = groups[currentGroupIndex]
        textDay.text = days[currentDayIndex]

        // Обработчик для кнопки "Предыдущая группа"
        findViewById<Button>(R.id.button_previous_group).setOnClickListener {
            currentGroupIndex = if (currentGroupIndex - 1 < 0) groups.size - 1 else currentGroupIndex - 1
            textGroup.text = groups[currentGroupIndex]
        }

        // Обработчик для кнопки "Следующая группа"
        findViewById<Button>(R.id.button_next_group).setOnClickListener {
            currentGroupIndex = (currentGroupIndex + 1) % groups.size
            textGroup.text = groups[currentGroupIndex]
        }

        // Обработчик для кнопки "Предыдущий день"
        findViewById<Button>(R.id.button_previous_day).setOnClickListener {
            currentDayIndex = if (currentDayIndex - 1 < 0) days.size - 1 else currentDayIndex - 1
            textDay.text = days[currentDayIndex]
        }

        // Обработчик для кнопки "Следующий день"
        findViewById<Button>(R.id.button_next_day).setOnClickListener {
            currentDayIndex = (currentDayIndex + 1) % days.size
            textDay.text = days[currentDayIndex]
        }

    }
}
