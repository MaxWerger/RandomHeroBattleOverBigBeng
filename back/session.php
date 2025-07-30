<?php
header('Content-Type: text/event-stream');
header('Cache-Control: no-cache');
header('Connection: keep-alive');

session_start();

// Глобальный файл для хранения количества подключений
$file = "counter.txt";
if (!file_exists($file)) {
    file_put_contents($file, "0");
}

// Увеличиваем счётчик при подключении
$counter = (int)file_get_contents($file) + 1;
file_put_contents($file, $counter);

// Отправляем данные каждые 2 секунды
while (true) {
    echo "data: " . file_get_contents($file) . "\n\n";
    flush();
    sleep(2);

    // Если клиент закрыл соединение – уменьшаем счётчик и выходим
    if (connection_aborted()) {
        $counter = (int)file_get_contents($file) - 1;
        if ($counter < 0) $counter = 0;
        file_put_contents($file, $counter);
        exit;
    }
}