import Database from 'better-sqlite3';
const db = new Database('chat.db');

// Create tables if they don't exist
db.exec(`
    CREATE TABLE IF NOT EXISTS chatrooms (
        id TEXT PRIMARY KEY,
        title TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS messages (
        id TEXT PRIMARY KEY,
        chatroom_id TEXT NOT NULL,
        role TEXT CHECK (role IN ('user', 'assistant')),
        content TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (chatroom_id) REFERENCES chatrooms (id) ON DELETE CASCADE
    );

    CREATE TRIGGER IF NOT EXISTS update_chatroom_timestamp
    AFTER INSERT ON messages
    FOR EACH ROW
    BEGIN
        UPDATE chatrooms SET updated_at = CURRENT_TIMESTAMP WHERE id = NEW.chatroom_id;
    END;
`);
export default db;
