try:
    with open('output.txt', 'r') as file:
        # Read the entire content of the file
        content = file.read()
        print(content)
except FileNotFoundError:
    print("The specified file was not found.")
except Exception as e:
    print(f"An error occurred: {e}")

# print('hello')
