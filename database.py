import sqlite3

# Создание базы данных и таблицы
def create_database():
    conn = sqlite3.connect('chatbot.db')  # Создание базы данных
    cursor = conn.cursor()
    
    # Создание таблицы для хранения сообщений
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS messages (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            user_input TEXT NOT NULL,
            bot_response TEXT NOT NULL,
            timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
        )
    ''')
    
    conn.commit()  # Сохранение изменений
    conn.close()   # Закрытие соединения

if __name__ == '__main__':
    create_database()  # Создание базы данных
