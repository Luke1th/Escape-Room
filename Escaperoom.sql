Create schema Escaperoom;
use Escaperoom;
create table ACTS(
ACTS_ID int primary key,
ACT_NO int,
Description text);
CREATE TABLE clues (
clue_id INTEGER PRIMARY KEY,
act_id INTEGER,
clue_text TEXT NOT NULL,
is_solved INTEGER DEFAULT 0,
FOREIGN KEY(act_id) REFERENCES ACTS(ACTS_ID));
CREATE TABLE locks (
lock_id INTEGER PRIMARY KEY,
act_id INTEGER,
question TEXT NOT NULL,
answer TEXT NOT NULL,
is_unlocked INTEGER DEFAULT 0,
FOREIGN KEY (act_id) REFERENCES ACTS(ACTS_ID));
CREATE TABLE players (
player_id INTEGER PRIMARY KEY,
name TEXT NOT NULL,
current_act INTEGER,
FOREIGN KEY (current_act) REFERENCES ACTS(ACTS_ID));
