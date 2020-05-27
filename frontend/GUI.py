#This is the frontend user interface for our project
import requests
import tkinter as tk
from tkinter import *
from tkinter import messagebox
from tkinter import ttk
from functools import partial
from tkcalendar import DateEntry
from datetime import datetime as dt

login_info = {}
login_validation = True
dictionary = {"HOP": ["Chicken Burger", "Grilled Cheese"], "Collis": ["Omelete", "Stir Fry"], "TukTuk": ["Pad Thai", "Fried Rice"]}
restaurant = ""
date = dt.today().strftime('%Y-%m-%d')

def back_selection():
    u.withdraw()
    user.deiconify()

def foods(event):
    global restaurant
    restaurant = r.get()
    
def changeFoods():
    food["values"] = dictionary[restaurant]

def getdate(event):
    global date
    date = cal.get_date()

def addmeal():
    global r, food, u, cal
    user.withdraw()
    u = Toplevel()
    u.geometry('400x200')
    Label(u, text = "Food Category").grid(row = 0, column = 0)
    category = ttk.Combobox(u, values=["Breakfast", "Lunch", "Dinner", "Late Night"], state = "readonly").grid(row = 1, column = 0)
    Label(u, text = "Restaurant").grid(row = 2, column = 0)
    r = ttk.Combobox(u, values=dictionary.keys(), state = "readonly")
    r.grid(row = 3, column = 0)
    r.bind("<<ComboboxSelected>>", foods)
    Label(u, text = "Foods").grid(row = 0, column = 1)
    food = ttk.Combobox(u, values = dictionary["HOP"], state = "readonly", postcommand=changeFoods)
    food.grid(row = 1, column = 1)
    Label(u, text = "Date").grid(row = 2, column = 1)
    cal = DateEntry(u)
    cal.grid(row = 3, column = 1)
    cal.bind("<<DateEntrySelected>>", getdate)
    Button(u, text = "Add").grid(row = 4, column = 0)
    Button(u, text = "Back", command = back_selection).grid(row = 4, column =1)

def back2():
    global d
    d.withdraw()
    u.deiconify()

def update_meals():
    x = Toplevel()
    Label(x, text = "Food Category").grid(row = 0, column = 0)
    category = ttk.Combobox(x, values=["Breakfast", "Lunch", "Dinner", "Late Night"], state = "readonly").grid(row = 1, column = 0)
    Label(x, text = "Restaurant").grid(row = 2, column = 0)
    r = ttk.Combobox(x, values=dictionary.keys(), state = "readonly")
    r.grid(row = 3, column = 0)
    r.bind("<<ComboboxSelected>>", foods)
    Label(x, text = "Foods").grid(row = 0, column = 1)
    food = ttk.Combobox(x, values = dictionary["HOP"], state = "readonly", postcommand=changeFoods)
    food.grid(row = 1, column = 1)
    Label(x, text = "Date").grid(row = 2, column = 1)
    cal = DateEntry(x)
    cal.grid(row = 3, column = 1)
    cal.bind("<<DateEntrySelected>>", getdate)
    Button(x, text = "Update").grid(row = 4, column = 0)

def meal_date(b):
    global d, TransactioniD
    u.withdraw()
    d = Toplevel()
    d.geometry('400x300')
    if b.get() == 2:
        # resp = requests.get("url", json=login_info)
        Label(d, text = "transactions").pack()
    else:
        # url = url + date.strftime('%Y-%m-%d')
        # resp = requests.get(url, json=login_info)
        data = [{"TransactionID": 0, "TransactionCategory": "Breakfast", "RestaurantName": "FOCO", "FoodName": "Breakfast"}, {"TransactionID": 1, "TransactionCategory": "Lunch", "RestaurantName": "HOP", "FoodName": "Burger"}]
        c2 = Frame(d, width = 300, height = 50)
        Label(c2, text = "Fetched Data").grid(row = 0, column = 3)
        Label(c2, text = "", width = 5).grid(row = 1, column =1)
        Label(c2, text = "Restaurant", width = 10).grid(row = 1, column = 2)
        Label(c2, text = "Food Name", width = 10).grid(row = 1, column = 3)
        Label(c2, text = "Date", width =10).grid(row = 1, column = 4)
        c2.pack()
        container = ttk.Frame(d)
        canvas = tk.Canvas(container)
        scrollbar = ttk.Scrollbar(container, orient = "vertical", command = canvas.yview)
        scrollable_frame = ttk.Frame(canvas)
        scrollable_frame.bind("<Configure>", lambda e: canvas.configure(scrollregion=canvas.bbox("all")))
        canvas.create_window((0,0), window=scrollable_frame, anchor="nw")
        canvas.configure(yscrollcommand = scrollbar.set)
        Transactionid = IntVar()
        r = 2
        for i in range(len(data)):
            Radiobutton(scrollable_frame,variable = Transactionid, value = data[i]["TransactionID"]).grid(row = r, column = 0)
            Label(scrollable_frame, text=data[i]["RestaurantName"], width = 10).grid(row = r, column = 1)
            Label(scrollable_frame, text = data[i]["FoodName"], width = 10).grid(row = r, column = 2)
            r+=1
        container.pack()
        c3 = Frame(d)
        Button(c3, text = "Update", command = update_meals).grid(row = 5, column = 0)
        Button(c3, text = "Delete").grid(row = 5, column = 1)
        Button(c3, text = "Back", command = back2).grid(row = 5, column = 2)
        canvas.pack(side = "left", fill="both", expand=True)
        scrollbar.pack(side="right", fill="y")
        c3.pack()


def get_meal():
    global cal, u
    user.withdraw()
    u = Toplevel()
    u.geometry('420x200')
    id = IntVar()
    Label(u, text = "Date").grid(row = 0, column = 0)
    cal = DateEntry(u)
    cal.grid(row = 1, column = 0)
    cal.bind("<<DateEntrySelected>>", getdate)
    a = Radiobutton(u, text = "By Date", variable = id, value = 1)
    a.grid(row = 0, column = 1)
    a.select()
    all = Radiobutton(u, text = "Get All", variable = id, value = 0)
    all.grid(row = 1, column = 1)
    e = Radiobutton(u, text = "Expenditure", variable = id, value = 2)
    e.grid(row = 2, column = 1)
    md = partial(meal_date, id)
    Button(u, text = "go", command = md).grid(row = 3, column = 0)
    Button(u, text = "Back", command = back_selection).grid(row = 3, column = 1)

def user_page():
    global user
    log.withdraw()
    user = Toplevel()
    user.geometry('400x100')

    user.title("User Selection Page")
    Button (user, text = "Add a Meal",command = addmeal).pack(anchor = CENTER)
    Button(user, text = "View Transactions", command = get_meal).pack()

def addapi():
    data = login_info.copy()
    data["FoodName"] = name.get()
    data["FoodPrice"] = price.get()
    resp = reponse.get("url", json = data)
    

def add_food():
    global u, name, price
    user.withdraw()
    u = Toplevel()
    u.geometry('400x200')
    Label(u, text = "Food Name").grid(row = 0, column = 0)
    name = StringVar()
    Entry(u, textvariable = name).grid(row = 0, column = 1)
    Label(u, text = "Food Price").grid(row = 1, column = 0)
    price = DoubleVar()
    Entry(u, textvariable = price).grid(row = 1, column = 1)
    Button(u, text = "Add").grid(row = 2, column = 0)
    Button(u, text = "Back", command = back_selection).grid(row = 2, column = 1)

def food_update():
    global u
    user.withdraw()
    u = Toplevel()
    u.geometry('400x200')
    #do another grid of radiobuttons
    price = DoubleVar()
    Button(u, text = "Delete").pack()
    Label(u, text = "New Price").pack()
    Entry(u, textvariable = price).pack()
    Button(u, text = "Update").pack()
    Button(u, text = "Back", command = back_selection).pack()

def view_transaction():
    global u
    user.withdraw()
    u = Toplevel()
    u.geometry('400x200')


def owner_page():
    global user
    log.withdraw()
    user = Toplevel()
    user.geometry('350x200')
    user.title("Owner Selection Page")
    Button(user, text = "Add Food", command = add_food).pack()
    Button(user, text = "Delete food", command = food_update).pack()
    Button(user, text = "Change Price", command = food_update).pack()
    Button(user, text = "View Transactions", command = view_transaction).pack()


def validate(username, password, owner):
    global login_validation
    info = {"isOwnerLogin": owner, "Username": username.get(), "Password": password.get()}
    print(info)
    # resp = requests.get(login, json=login_info)
    if not login_validation:
        messagebox.showerror("Error", "Failed to login")
    else:
        login_validation={"Username":username.get(), "Password":password.get()}
        if info["isOwnerLogin"] == 0:
            user_page()
        else:
            # restaurantID = resp.json()['RestaurantID']
            # login_validation["RestaurantID"] = restaurantID
            owner_page()

def delete(u, p):
    u.delete(0, END)
    p.delete(0, END)

def back():
    global log, root
    log.withdraw()
    root.deiconify()

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
    Button(log, text = "back", command = back).pack()

def create_account(username, password, first, middle, last):
    data = {"Username": username.get(), "Password": password.get(), "FirstName": first.get(), "MiddleInitial": middle.get(), "LastName": last.get()}
    # resp = requests.get("post/user", json = data)
    print(data)
    messagebox.showinfo("Success", "User Successfully Created")
    # if resp.json()['status'] == 1000:
    #     messagebox.showerror("Error", "Duplicate username")
    # elif resp.json()['status'] == 500:
    #     messagebox.showerror("Error", "Other Error")
    # else:
    #     messagebox.showinfo("Success", "User Successfully Created")

def delete2(a, b, c, d, e):
    a.delete(0, END)
    b.delete(0, END)
    c.delete(0, END)
    d.delete(0, END)
    e.delete(0, END)


def new_account():
    global log
    root.withdraw()
    log = Toplevel()
    log.geometry('400x400')
    log.title("New Account")
    usernameLabel = Label(log, text = "User Name").pack()
    username = StringVar()
    usernameEntry = Entry(log, textvariable = username)
    usernameEntry.pack()

    passwordLabel = Label(log,text="Password").pack()  
    password = StringVar()
    passwordEntry = Entry(log, textvariable=password)
    passwordEntry.pack() 

    Label(log, text = "First Name").pack()
    first = StringVar()
    a = Entry(log, textvariable = first)
    a.pack()

    Label(log, text = "Middle Initial").pack()
    middle = StringVar()
    b = Entry(log, textvariable = middle)
    b.pack()

    Label(log, text = "Last Name").pack()
    last = StringVar()
    d = Entry(log, textvariable = last)
    d.pack()

    c = partial(create_account, username, password, first, middle, last)
    d = partial(delete2, usernameEntry, passwordEntry, a, b, d)
    Button(log, text = "Create", command = c).pack()
    Button(log, text = "clear", command = d).pack()
    Button(log, text = "Back", command = back).pack()


#Starting the GUI
root = tk.Tk()
root.geometry('400x200')
root.title("Welcome")

l = Label(root, text="Welcome to our program", font = ("Times New Roman", 28)).pack()
l2 = Label(root, text = "Please select if you would like to log in as a regular User or a Restaurant Owner or create a new account", font = ("Times New Roman", 15), wraplength = 400).pack()
owner = BooleanVar()
b1 = Radiobutton(root, text = "Owner", variable=owner, value = 1).pack(anchor=W)
b2 = Radiobutton(root, text = "User", variable = owner, value = 0).pack(anchor=W)
l = partial(login, owner)
Button(root, text ="Continue", command =l).pack(side = tk.LEFT)
Button(root, text = "Create New Account", command = new_account).pack(side = tk.LEFT)

root.mainloop()