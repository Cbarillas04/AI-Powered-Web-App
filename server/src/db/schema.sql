CREATE DATABASE AI_Web_App;

CREATE TABLE Documents (
	id INT auto_increment PRIMARY KEY,
    title VARCHAR(255),
    src_path VARCHAR(512),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    doc_date DATE NULL
);

CREATE TABLE Chunks (
	id INT auto_increment PRIMARY KEY,
    doc_id INT,
    chunk_index INT,
    content TEXT,
    embedding JSON,
    created_at TIMESTAMP,
    FOREIGN KEY (doc_id) REFERENCES Documents(id)
    ON DELETE CASCADE
);