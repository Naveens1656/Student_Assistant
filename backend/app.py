from flask import Flask, request, jsonify
from flask_cors import CORS
import datetime
import os


app = Flask(__name__)
CORS(app)  # Enable CORS if your frontend is on a different port

# Predefined Q&A dict
qa_dict = {

    "hi": "Hello! How can I assist you today?",
    "hello": "Hi there! What would you like to learn?",
    "hey": "Hey! Need help with a topic?",
    "good morning": "Good morning! Ready to learn something new?",
    "good night": "Good night! Keep coding strong tomorrow!",
    "bye": "Goodbye! Come back soon to learn more.",
    "thanks": "You're welcome!",
    "thank you": "Glad to help!"

}
python_qa = {
    "what is python": "Python is a high-level, interpreted programming language known for readability and versatility.",
    "how to print in python": "Use print(), e.g., print('Hello World').",
    "how to create a list in python": "Lists use square brackets: my_list = [1, 2, 3].",
    "how to create a dictionary in python": "Use curly braces: my_dict = {'key': 'value'}.",
    "how to write a function in python": "Use def keyword: def func_name():",
    "what are python tuples": "Tuples are immutable sequences, e.g., (1, 2, 3).",
    "how to handle exceptions in python": "Use try-except blocks.",
    "what is a lambda function": "An anonymous function defined with lambda, e.g., lambda x: x + 1.",
    "how to import modules": "Use import module_name or from module_name import something.",
    "what are list comprehensions": "A concise way to create lists, e.g., [x for x in range(5)].",
    "how to read a file in python": "Use open() and read() functions.",
    "how to write to a file": "Use open() with 'w' mode and write() method.",
    "what is a class in python": "Blueprint for creating objects, defined with class keyword.",
    "what is inheritance": "A class can inherit properties/methods from another class.",
    "how to create a virtual environment": "Use python -m venv env_name.",
    "what is pep8": "PEP 8 is the style guide for Python code.",
    "how to install packages": "Use pip install package_name.",
    "what are decorators": "Functions that modify other functions.",
    "what is the difference between list and tuple": "Lists are mutable, tuples are immutable.",
    "how to convert types in python": "Use int(), str(), float(), etc.",
    "what is slicing": "Extracting parts of lists/strings, e.g., a[1:3].",
    "how to use if-else statements": "Use if condition:, else:, elif: blocks.",
    "how to loop over a list": "Use for item in list: loops.",
    "what is the global keyword": "Used to modify global variables inside functions.",
    "how to create generators": "Use yield keyword to create iterators.",
    "what are python sets": "Unordered collections of unique items.",
    "how to use map()": "Applies a function to all items in an iterable.",
    "how to use filter()": "Filters items based on a function returning True/False.",
    "what are docstrings": "Documentation strings inside functions/classes.",
    "how to use assertions": "Used for debugging to check conditions with assert.",
}
java_qa = {
    "what is java": "Java is a high-level, object-oriented programming language.",
    "how to print in java": "Use System.out.println(\"Hello World\");",
    "what is jvm": "Java Virtual Machine runs Java bytecode on any platform.",
    "how to create a class": "Use class keyword, e.g., public class MyClass {}",
    "what are java methods": "Functions defined inside a class.",
    "what is inheritance": "Allows one class to inherit properties from another.",
    "what is polymorphism": "Ability of objects to take many forms.",
    "what is encapsulation": "Wrapping data and methods into a single unit.",
    "what is abstraction": "Hiding internal implementation details.",
    "what are interfaces": "Abstract types specifying method signatures.",
    "how to handle exceptions": "Use try-catch blocks.",
    "what is the difference between checked and unchecked exceptions": "Checked are checked at compile-time, unchecked at runtime.",
    "what is the main method": "Entry point: public static void main(String[] args).",
    "how to declare variables": "Specify type, e.g., int num = 5;",
    "what are constructors": "Special methods to initialize objects.",
    "what is static keyword": "Belongs to the class, not instances.",
    "what are arrays": "Fixed-size collections of elements of the same type.",
    "what is a package": "Namespace that organizes classes and interfaces.",
    "how to use loops": "Use for, while, and do-while loops.",
    "what is method overloading": "Multiple methods with same name but different parameters.",
    "what is method overriding": "Subclass provides its own implementation of a superclass method.",
    "what is final keyword": "Used to declare constants or prevent inheritance/overriding.",
    "what is garbage collection": "Automatic memory management process.",
    "what are access modifiers": "public, private, protected keywords control access.",
    "what is the difference between == and equals()": "== checks reference equality, equals() checks value equality.",
    "what is an abstract class": "Cannot be instantiated, may contain abstract methods.",
    "what is multithreading": "Concurrent execution of two or more threads.",
    "what are wrappers classes": "Classes like Integer, Double to wrap primitive types.",
    "how to read input from user": "Use Scanner class from java.util package.",
    "what is synchronization": "Controlling access to shared resources in threads.",
}
c_qa = {
    "what is c": "C is a procedural programming language.",
    "how to print in c": "Use printf(\"Hello World\\n\");",
    "what is a pointer": "Variable storing memory address of another variable.",
    "how to declare variables": "Specify type, e.g., int a = 5;",
    "what are arrays": "Collection of elements of the same type.",
    "what is a function": "Block of code performing a task, defined with return type and name.",
    "how to write a function": "Specify return type, name, and parameters.",
    "what is a struct": "User-defined data type grouping variables.",
    "how to allocate memory dynamically": "Use malloc() and free().",
    "what is a null pointer": "Pointer pointing to nothing.",
    "what are header files": "Files containing function declarations and macros.",
    "how to use loops": "Use for, while, and do-while loops.",
    "what is recursion": "Function calling itself.",
    "what is the difference between call by value and call by reference": "Call by value copies, call by reference uses pointers.",
    "how to handle strings": "Strings are arrays of characters ending with null '\\0'.",
    "what are macros": "Preprocessor directives using #define.",
    "what is the difference between stack and heap": "Stack stores local variables, heap stores dynamic allocations.",
    "what is a segmentation fault": "Accessing invalid memory causing a crash.",
    "how to use pointers with arrays": "Array name acts as pointer to first element.",
    "what is a union": "Data structure sharing memory for all members.",
    "what is typecasting": "Converting one data type to another.",
    "how to use enums": "Define named integer constants.",
    "what is volatile keyword": "Tells compiler variable can change unexpectedly.",
    "how to do file I/O": "Use fopen(), fread(), fwrite(), fclose().",
    "what is preprocessor": "Processes directives before compilation.",
    "what is a static variable": "Variable retaining value between function calls.",
    "how to use command line arguments": "Use argc and argv parameters in main.",
    "what is a function pointer": "Pointer pointing to a function.",
    "what are typedefs": "Create new names for existing types.",
    "how to prevent memory leaks": "Free dynamically allocated memory.",
}
javascript_qa = {
    "what is javascript": "JavaScript is a programming language for web development.",
    "how to print in javascript": "Use console.log('Hello World');",
    "what are variables in javascript": "Containers to store data, declared with var, let, or const.",
    "what are functions": "Blocks of code to perform tasks.",
    "how to create a function": "Use function keyword or arrow functions, e.g., function myFunc() {} or const f = () => {}.",
    "what is hoisting": "Variable and function declarations moved to top of their scope.",
    "what are closures": "Functions with access to outer scope variables.",
    "how to handle errors": "Use try-catch blocks.",
    "what is event bubbling": "Events propagate from target up through DOM tree.",
    "what are promises": "Objects representing eventual completion of async operations.",
    "what is async-await": "Syntax to write asynchronous code like synchronous.",
    "what is the difference between == and ===": "== does type coercion, === is strict equality.",
    "what are objects": "Collections of key-value pairs.",
    "what is the DOM": "Document Object Model representing HTML structure.",
    "how to manipulate DOM": "Use document.querySelector, createElement, appendChild, etc.",
    "what are arrays": "Ordered lists of values.",
    "how to loop over arrays": "Use for, forEach(), map(), filter().",
    "what is JSON": "JavaScript Object Notation for data exchange.",
    "how to use localStorage": "Stores data in browser persistently.",
    "what are callbacks": "Functions passed as arguments to other functions.",
    "what is the event loop": "Handles asynchronous events in JavaScript runtime.",
    "what are modules": "Files exporting/importing code.",
    "how to debug javascript": "Use browser developer tools and console.",
    "what is strict mode": "Enforces stricter parsing and error handling.",
    "what is prototype": "Object that other objects inherit properties from.",
    "what are classes": "Syntactic sugar over prototypes for OOP.",
    "how to create promises": "Use new Promise() constructor.",
    "what is destructuring": "Extracting values from arrays or objects.",
    "how to use template literals": "Use backticks and ${} for interpolation.",
    "what are symbols": "Unique and immutable primitive values.",
}
mongodb_qa = {
    "what is mongodb": "MongoDB is a NoSQL document database storing data in BSON format.",
    "how to insert a document": "Use db.collection.insertOne({ key: 'value' }).",
    "what is a collection": "A group of MongoDB documents, like a table.",
    "how to query documents": "Use db.collection.find({ query }).",
    "what is aggregation": "Processes data records and returns computed results.",
    "how to update documents": "Use db.collection.updateOne() or updateMany().",
    "what is a replica set": "Group of MongoDB servers maintaining same data for high availability.",
    "what is sharding": "Distributes data across multiple servers for scalability.",
    "how to delete documents": "Use db.collection.deleteOne() or deleteMany().",
    "what is BSON": "Binary JSON, MongoDB's data storage format.",
    "how to create indexes": "Use db.collection.createIndex().",
    "what is a schema": "Defines structure of data in collections (optional in MongoDB).",
    "what are capped collections": "Fixed-size collections that behave like circular buffers.",
    "how to connect to mongodb": "Use connection string URI with MongoDB drivers.",
    "what is a document": "A JSON-like object stored in a collection.",
    "how to use findOne()": "Retrieves the first document matching criteria.",
    "what is the difference between find() and findOne()": "find() returns cursor to multiple docs, findOne() returns single doc.",
    "how to use projections": "Specify which fields to include or exclude in query results.",
    "what is the use of $match in aggregation": "Filters documents to pass to next stage.",
    "how to use $group": "Groups documents by specified keys and performs aggregations.",
    "what are transactions": "Multi-document ACID operations.",
    "how to backup mongodb": "Use mongodump utility.",
    "how to restore mongodb": "Use mongorestore utility.",
    "what is mongo shell": "Interactive JavaScript interface to MongoDB.",
    "how to update nested fields": "Use dot notation in update queries.",
    "what is TTL index": "Index that automatically removes documents after a specified time.",
    "how to perform text search": "Use text indexes and $text operator.",
    "what is a mongo client": "Tool or library used to connect to MongoDB.",
    "how to monitor mongodb performance": "Use mongostat and mongotop utilities.",
    "what is the WiredTiger storage engine": "Default high-performance storage engine for MongoDB.",
}
basic_qa = {
    "hi": "Hello! How can I assist you today?",
    "hello": "Hi there! What would you like to learn?",
    "hey": "Hey! Need help with a topic?",
    "yes": "Great! Let me know your question.",
    "yeah": "Awesome! Ask away.",
    "yup": "Sure! What would you like to know?",
    "ok": "Alright! Type in your question.",
    "okay": "Got it! I'm here to help.",
    "good morning": "Good morning! Ready to learn something new?",
    "good night": "Good night! Keep coding strong tomorrow!",
    "bye": "Goodbye! Come back soon to learn more.",
    "thanks": "You're welcome!",
    "thank": "Glad to help!"
}

qa_dict = {}
qa_dict.update(python_qa)
qa_dict.update(java_qa)
qa_dict.update(c_qa)
qa_dict.update(javascript_qa)
qa_dict.update(mongodb_qa)
qa_dict.update(basic_qa)



def is_ordered_subsequence(query_words, question_words):
    """Check if all query_words appear in question_words in the same order (not necessarily consecutive)."""
    it = iter(question_words)
    return all(any(qw == w for w in it) for qw in query_words)

@app.route('/api/chat', methods=['POST'])
def chat():
    data = request.get_json()
    user_message = data.get('message', '').lower().strip()

    if not user_message:
        return jsonify({'response': "Please ask a question."})

    # Exact match
    if user_message in qa_dict:
        return jsonify({'response': qa_dict[user_message]})

    # Partial ordered match (recommendations)
    user_words = user_message.split()

    for question, answer in qa_dict.items():
        question_words = question.split()
        if is_ordered_subsequence(user_words, question_words):
            return jsonify({'response': f"Did you mean: '{question}'?\nAnswer: {answer}"})

    # Default fallback
    return jsonify({'response': "Sorry, I don't have an answer to that question."})


@app.route('/api/feedback', methods=['POST'])
def receive_feedback():
    data = request.get_json()
    name = data.get("name", "Anonymous")
    email = data.get("email", "unknown@example.com")
    message = data.get("message", "")

    
    os.makedirs("feedback", exist_ok=True)
    filename = f"feedback/feedback_{datetime.datetime.now().strftime('%Y%m%d%H%M%S')}.txt"
    with open(filename, "w") as f:
        f.write(f"From: {name} <{email}>\n\n")
        f.write(message)

    return jsonify({"message": "Thank you for your feedback!"})

if __name__ == '__main__':
    app.run(debug=True)