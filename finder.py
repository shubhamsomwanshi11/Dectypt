import csv
import os

def search_word_in_files(directory, word):
    for filename in os.listdir(directory):
        if filename.endswith(".csv"):
            with open(os.path.join(directory, filename), 'r', encoding='utf-8') as file:
                csv_reader = csv.reader(file)
                for row in csv_reader:
                    if word in row:
                        index = row.index(word)
                        if index < len(row) - 1:
                            value_next_column = row[index + 1]
                            print(value_next_column)
                            return value_next_column
                        else:
                            break  
                else:
                    continue 
                break
    print("Not Found")
              

directory_path = './Password'
word_to_search = 'ec65c0dd0ecbb46313085defd788acb6'

search_word_in_files(directory_path, word_to_search)