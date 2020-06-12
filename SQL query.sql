CREATE TABLE IF NOT EXISTS questions_base
    (id INTEGER PRIMARY KEY,
	question VARCHAR(255),
    category VARCHAR(255),
    'type' VARCHAR(255),
    difficulty VARCHAR(255),
    correct_answer VARCHAR(255),
    incorrect_answers VARCHAR(255)
);

INSERT INTO questions_base
    (id, question, category, type, difficulty, correct_answer, incorrect_answers)
    VALUES(3, 'quel fruit', 'religion', 'multiple', 'ez', 'pomme','["pomme", "poire"]')