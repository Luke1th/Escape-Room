import time

# === Global session timer ===
def start_session():
    return time.time()

def end_session(start_time):
    elapsed = time.time() - start_time
    minutes, seconds = divmod(int(elapsed), 60)
    return f"Total Game Session Time: {minutes}m {seconds}s"

# === Act timing ===
def start_act():
    return time.time()

def end_act(start_time, act_name):
    elapsed = time.time() - start_time
    minutes, seconds = divmod(int(elapsed), 60)
    print(f"{act_name} completed in {minutes}m {seconds}s\n")

# === Example Game Flow ===
def play_game():
    session_start = start_session()
    
    # Act 1
    act1_start = start_act()
    input("Act 1: Press Enter once you finish...")  # waits until user finishes
    end_act(act1_start, "Act 1")
    
    # Act 2
    act2_start = start_act()
    input("Act 2: Press Enter once you finish...")
    end_act(act2_start, "Act 2")
    
    # Act 3
    act3_start = start_act()
    input("Act 3: Press Enter once you finish...")
    end_act(act3_start, "Act 3")
    
    # End Session
    print(end_session(session_start))

# Run game
play_game()
