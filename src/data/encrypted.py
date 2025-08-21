#this imports the cryptography package
from cryptography.fernet import Fernet

#this generates a key and opens a file 'key.key' and writes the key there
key = Fernet.generate_key()
with open('key.key','wb') as file:
    file.write(key)

#this just opens our 'key.key' and assings the key stored there as 'key'
with open('key.key','rb') as file:
    key = file.read()

#this opens our json and reads its data into a new variable called 'data'
with open('laura.martin.json','rb') as f:
    data = f.read()

#this encrypts the data read from your json and stores it in 'encrypted'
fernet = Fernet(key)
encrypted = fernet.encrypt(data)

#this writes your new, encrypted data into a new JSON file
with open('laura.martin.json','wb') as f:
    f.write(encrypted)

    