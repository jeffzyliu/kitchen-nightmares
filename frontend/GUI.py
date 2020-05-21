#This is the frontend user interface for our project

import tkinter as tk
from tkinter import *
from tkinter import messagebox
from tkinter import ttk
from functools import partial
from tkcalendar import DateEntry

login_info = {}
login_validation = True
dictionary = {"HOP": ["Chicken Burger", "Grilled Cheese"], "Collis": ["Omelete", "Stir Fry"], "TukTuk": ["Pad Thai", "Fried Rice"]}
restaurant = ""

def foods(event):
    global restaurant
    restaurant = r.get()
    
def changeFoods():
    food["values"] = dictionary[restaurant]

def addmeal():
    global r, food
    user.withdraw()
    addmeal = Toplevel()
    addmeal.geometry('400x200')
    Label(addmeal, text = "Food Category").grid(row = 0, column = 0)
    category = ttk.Combobox(addmeal, values=["Breakfast", "Lunch", "Dinner", "Late Night"], state = "readonly").grid(row = 1, column = 0)
    Label(addmeal, text = "Restaurant").grid(row = 3, column = 0)
    r = ttk.Combobox(addmeal, values=dictionary.keys(), state = "readonly")
    r.grid(row = 4, column = 0)
    r.bind("<<ComboboxSelected>>", foods)
    Label(addmeal, text = "Foods").grid(row = 5, column = 0)
    food = ttk.Combobox(addmeal, values = dictionary["HOP"], state = "readonly", postcommand=changeFoods)
    food.grid(row = 6, column = 0)
    Button(addmeal, text = "Add").grid(row = 7, column = 0)

def update_meal():
    user.withdraw()
    u = Toplevel()
    u.geometry('400x200')

def get_meal():
    user.withdraw()
    u = Toplevel()
    u.geometry('400x200')
    Label(u, text = "Get the last 20 meals or filter by date", font = ("Times New Roman", 18)).grid(row = 0, column = 2)
    Button(u, text = "Get All").grid(row = 2, column = 0)
    cal = DateEntry(u)
    cal.grid(row = 1, column = 0)
    print(cal.get_date())


def user_page():
    global user
    log.withdraw()
    user = Toplevel()
    user.geometry('400x200')
    user.title("User Selection Page")
    Label(user, text = "Choose one of the following commands", font = ("Times New Roman", 24)).pack()
    Button (user, text = "Add a Meal", command = addmeal).pack(fill = BOTH, expand = True)
    Button(user, text = "Update a Previous Transaction", command = update_meal).pack(fill=BOTH, expand = True)
    Button(user, text = "Delete a Previous Transaction").pack(fill = BOTH, expand = True)
    Button(user, text = "View Transactions", command = get_meal).pack(fill=BOTH, expand = True)

def owner_page():
    global user
    log.withdraw()
    user = Toplevel()
    user.geometry('400x200')
    user.title("Owner Selection Page")


def validate(username, password, owner):
    global login_info, login_validation
    login_info = {"username": username.get(), "password": password.get(), "owner": owner}
    print(login_info)
    if not login_validation:
        messagebox.showerror("Error", "Failed to login")
    else:
        if login_info["owner"] == 0:
            user_page()
        else:
            owner_page()

def delete(u, p):
    u.delete(0, END)
    p.delete(0, END)

def login(owner):
    global login_info, log
    root.withdraw()
    log = Toplevel()
    log.geometry('400x200')
    log.title("User Login")
    usernameLabel = Label(log, text = "User Name").pack()
    username = StringVar()
    usernameEntry = Entry(log, textvariable = username)
    usernameEntry.pack()

    passwordLabel = Label(log,text="Password").pack()  
    password = StringVar()
    passwordEntry = Entry(log, textvariable=password, show='*')
    passwordEntry.pack() 

    v = partial(validate, username, password, owner.get())
    LoginButton = Button(log, text="Login", command=v).pack() 
    w = partial(delete, usernameEntry, passwordEntry)
    Clear = Button(log, text = "clear", command = w).pack()

#Starting the GUI
root = tk.Tk()
root.geometry('400x200')
root.title("Welcome")

l = Label(root, text="Welcome to our program", font = ("Times New Roman", 28)).pack()
l2 = Label(root, text = "Please select if you would like to log in as a regular User or a Restaurant Owner", font = ("Times New Roman", 15), wraplength = 400).pack()
owner = IntVar()
b1 = Radiobutton(root, text = "Owner", variable=owner, value = 1).pack(anchor=W)
b2 = Radiobutton(root, text = "User", variable = owner, value = 0).pack(anchor=W)
l = partial(login, owner)
Button(root, text ="Continue", command =l).pack(anchor = W)

root.mainloop()