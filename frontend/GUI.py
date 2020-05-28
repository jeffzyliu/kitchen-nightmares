#This is the frontend user interface for our project
import requests
import tkinter as tk
from tkinter import *
from tkinter import messagebox
from tkinter import ttk
from functools import partial
from tkcalendar import DateEntry
from datetime import datetime as dt
import json
from PIL import ImageTk,Image 
from viz import Viz

#some global variables we need
login_info = {}
restaurants = ["Courtyard Cafe", "Foco", "Collis Cafe", "KAF", "Novack Cafe", "Tuk Tuk", "Mollys", "Pine", "Han Fusion", "Dominos"]
food_ID = {}
restaurant = ""
date = dt.today().strftime('%Y-%m-%d')
url = "http://localhost:3000/"


def back_selection():
    u.withdraw()
    user.deiconify()

def back_login():
    global user
    user.withdraw()
    log.deiconify()

def back2():
    global d
    d.withdraw()
    u.deiconify()

def foods(event):
    global restaurant
    restaurant = r.get()
    
def changeFoods():
    global food_ID
    resp = requests.get(url+"foods/"+restaurant, json = login_info)
    if resp.json()['status']!= 200:
        messagebox.showerror("Error", "Error")
    else:
        food_list = []
        for foods in resp.json()["response"]:
            food_ID[foods["FoodName"]] = foods["FoodID"]
            food_list.append(foods["FoodName"])
        food["values"] = food_list

def addFoods():
    data = login_info.copy()
    data["TransactionDate"]= date
    data["TransactionCategory"]=category.get()
    data["FoodID"]= food_ID[food.get()]
    resp = requests.post(url+"meals", json = data)
    if resp.json()["status"] != 201:
        messagebox.showerror("Error", "Error")
    else:
        messagebox.showinfo("Added", "Meal Successfully Added")


def getdate(event):
    global date
    date = cal.get_date()
    date = date.strftime('%Y-%m-%d')

def addmeal():
    global r, food, u, cal, category
    user.withdraw()
    u = Toplevel()
    u.geometry('400x200')
    Label(u, text = "Food Category").grid(row = 0, column = 0)
    category = ttk.Combobox(u, values=["Breakfast", "Lunch", "Dinner", "Late Night"], state = "readonly")
    category.grid(row = 1, column = 0)
    Label(u, text = "Restaurant").grid(row = 2, column = 0)
    r = ttk.Combobox(u, values=restaurants, state = "readonly")
    r.grid(row = 3, column = 0)
    r.bind("<<ComboboxSelected>>", foods)
    Label(u, text = "Foods").grid(row = 0, column = 1)
    food = ttk.Combobox(u, values = "Nothing", state = "readonly", postcommand=changeFoods)
    food.grid(row = 1, column = 1)
    Label(u, text = "Date").grid(row = 2, column = 1)
    cal = DateEntry(u)
    cal.grid(row = 3, column = 1)
    cal._top_cal.overrideredirect(False)
    cal.bind("<<DateEntrySelected>>", getdate)
    Button(u, text = "Add", command = addFoods).grid(row = 4, column = 0)
    Button(u, text = "Back", command = back_selection).grid(row = 4, column =1)

def update_api():
    data = login_info.copy()
    id = food_ID[food.get()]
    data["FoodID"]=id
    resp = requests.put(url+"meals/"+str(Transactionid.get()), json = data)
    if resp.json()["status"] != 201:
        messagebox.showerror("error", "Error")
    else:
        messagebox.showinfo("Update", "Update Successful")

def update_meals():
    global foods, food, restaurant
    user_foods={}
    foods = []
    for x in meal_dates:
        if x["TransactionID"] == Transactionid.get():
            user_foods = x 
            break 
    restaurant = user_foods["RestaurantName"]
    x = Toplevel()
    Label(x, text = "New Food").pack()
    food = ttk.Combobox(x, values = "Foods", state = "readonly", postcommand=changeFoods)
    food.pack()
    Button(x, text = "Update", command = update_api).pack()

def delete_api():
    resp = requests.delete(url + "meals/"+str(Transactionid.get()), json=login_info)
    if resp.json()["status"] != 201:
        messagebox.showerror("error", "Error")
    else:
        messagebox.showinfo("Update", "Delete Successful")

def meal_date(b):
    global d, Transactionid, meal_dates
    u.withdraw()
    d = Toplevel()
    d.geometry('600x300')
    if b.get() == 2:
        resp = requests.get(url+"expenditures", json=login_info)
        resp2 = requests.get(url+"meals/", json=login_info)
        if resp.json()["status"]!= 200 or resp2.json()["status"]!= 201:
            messagebox.showerror("Error", "error")
        else:
            meals = resp2.json()["response"]
            c2 = Frame(d, width = 500, height = 50)
            Label(c2, text = "Date", width = 15).grid(row = 0, column = 1)
            Label(c2, text = "Category", width = 15).grid(row = 0, column = 2)
            Label(c2, text = "Restaurant", width =15).grid(row = 0, column = 3)
            Label(c2, text = "Cost", width = 15).grid(row = 0, column = 4)
            c2.pack()
            container = ttk.Frame(d, width = 500)
            canvas = tk.Canvas(container, width = 500)
            scrollbar = ttk.Scrollbar(container, orient = "vertical", command = canvas.yview)
            scrollable_frame = ttk.Frame(canvas, width = 500)
            scrollable_frame.bind("<Configure>", lambda e: canvas.configure(scrollregion=canvas.bbox("all")))
            canvas.create_window((0,0), window=scrollable_frame, anchor="nw")
            canvas.configure(yscrollcommand = scrollbar.set)
            Transactionid = IntVar()
            r = 1
            for i in range(len(meals)):
                Label(scrollable_frame, text=meals[i]["Date"], width = 15).grid(row = r, column = 1)
                Label(scrollable_frame, text = meals[i]["MealCategory"], width = 15).grid(row = r, column = 2)
                Label(scrollable_frame, text = meals[i]["RestaurantName"], width = 15).grid(row = r, column =3)
                Label(scrollable_frame, text = meals[i]["Cost"], width = 15).grid(row = r, column = 4)
                r+=1
            container.pack()
            c3 = Frame(d)
            Label(c3, text = "Total Expenditures").grid(row = 5, column = 0)
            Label(c3, text = resp.json()["TotalExpenditures"]).grid(row = 5, column = 1)
            Button(c3, text = "Back", command = back2).grid(row = 6, column = 0)
            canvas.pack(side = "left", fill="both", expand=True)
            scrollbar.pack(side="right", fill="y")
            c3.pack()
    else:
        meal_dates = []
        if b.get() == 0:
            resp = requests.get(url+"mealfoods", json = login_info)
            if resp.json()["status"]!= 200:
                messagebox.showerror("Error", "error")
            else:
                meal_dates = resp.json()["response"]
        else:
            resp=requests.get(url+"mealfoods/"+date, json = login_info)
            if resp.json()["status"]!= 200:
                messagebox.showerror("Error", "error")
            else:
                meal_dates = resp.json()["response"]
        c2 = Frame(d, width = 500, height = 50)
        Label(c2, text = "Fetched Data").grid(row = 0, column = 3)
        Label(c2, text = "Restaurant", width = 13).grid(row = 1, column = 1)
        Label(c2, text = "Food", width = 13).grid(row = 1, column = 2)
        Label(c2, text = "Date", width =13).grid(row = 1, column = 3)
        Label(c2, text = "Category", width = 10).grid(row = 1, column = 4)
        c2.pack()
        container = ttk.Frame(d, width = 500)
        canvas = tk.Canvas(container, width = 500)
        scrollbar = ttk.Scrollbar(container, orient = "vertical", command = canvas.yview)
        scrollable_frame = ttk.Frame(canvas, width = 500)
        scrollable_frame.bind("<Configure>", lambda e: canvas.configure(scrollregion=canvas.bbox("all")))
        canvas.create_window((0,0), window=scrollable_frame, anchor="nw")
        canvas.configure(yscrollcommand = scrollbar.set)
        Transactionid = IntVar()
        r = 2
        for i in range(len(meal_dates)):
            Radiobutton(scrollable_frame,variable = Transactionid, value = meal_dates[i]["TransactionID"]).grid(row = r, column = 0)
            Label(scrollable_frame, text=meal_dates[i]["RestaurantName"], width = 13).grid(row = r, column = 1)
            Label(scrollable_frame, text = meal_dates[i]["FoodName"], width = 13).grid(row = r, column = 2)
            Label(scrollable_frame, text = meal_dates[i]["Date"], width = 13).grid(row = r, column =3)
            Label(scrollable_frame, text = meal_dates[i]["TransactionCategory"], width = 10).grid(row = r, column = 4)
            r+=1
        container.pack()
        c3 = Frame(d)
        Button(c3, text = "Update", command = update_meals).grid(row = 5, column = 0)
        Button(c3, text = "Delete", command = delete_api).grid(row = 5, column = 1)
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
    cal._top_cal.overrideredirect(False)
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

def data_vis_spend():
    global img
    resp = requests.get(url+"meals/data/0", json = login_info)
    data1 = resp.json()["response"]
    myviz = Viz()
    myviz.viz_user_spending(str(data1))
    img = ImageTk.PhotoImage(Image.open("viz.png"))  
    data = Toplevel()
    panel = Label(data, image = img)
    panel.image = img
    panel.pack()

def data_vis_freq():
    global img
    resp = requests.get(url+"meals/data/1", json = login_info)
    data1 = resp.json()["response"]
    myviz2 = Viz()
    myviz2.viz_user_freq(str(data1))
    img = ImageTk.PhotoImage(Image.open("viz.png"))  
    data = Toplevel()
    panel = Label(data, image = img)
    panel.image = img
    panel.pack()

def user_page():
    global user
    log.withdraw()
    user = Toplevel()
    user.geometry('400x200')

    user.title("User Selection Page")
    Button (user, text = "Add a Meal",command = addmeal).pack(anchor = CENTER)
    Button(user, text = "View Transactions", command = get_meal).pack()
    Button(user, text = "Data Visualization (Spending)", command = data_vis_spend).pack()
    Button(user, text = "Data Visualization (Freq)", command = data_vis_freq).pack()
    Button(user, text = "Back", command = back_login).pack()
    
def add_food_api():
    data = login_info.copy()
    data["FoodName"] = name.get()
    data["FoodPrice"] = price.get()
    resp = requests.post(url+"restaurants/foods", json = data)
    if resp.json()["status"] != 201:
        messagebox.showerror("error", resp.json()["error"])
    else:
        messagebox.showinfo("Success", "Food Successfully Added")

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
    Button(u, text = "Add", command = add_food_api).grid(row = 2, column = 0)
    Button(u, text = "Back", command = back_selection).grid(row = 2, column = 1)

def update_food_api():
    data = login_info.copy()
    data["NewPrice"] = price.get()
    resp = requests.put(url+"restaurants/foods/" + str(Restaurant_foodID.get()), json = data)
    if resp.json()["status"] != 200:
        messagebox.showerror("error", resp.json()["error"])
    else:
        messagebox.showinfo("Success", "Food Price Successfully Updated")

def update_food():
    global updatefood, price
    updatefood = Toplevel()
    updatefood.geometry('400x100')
    price = DoubleVar()
    Label(updatefood, text = "New Price").pack(side = LEFT)
    Entry(updatefood, textvariable = price).pack(side = LEFT)
    Button(updatefood, text = "Update", command = update_food_api).pack(anchor = W, side = BOTTOM)

def delete_food_api():
    resp = requests.delete(url+"restaurants/foods/"+str(Restaurant_foodID.get()), json = login_info)
    if resp.json()["status"] != 200:
        messagebox.showerror("error", resp.json()["error"])
    else:
        messagebox.showinfo("Success", "Food Successfully Deleted")

def view_menu():
    global u, Restaurant_foodID
    user.withdraw()
    u = Toplevel()
    u.geometry('400x400')
    resp = requests.get(url+"restaurants/foods", json=login_info)
    if resp.json()["status"] != 200:
        messagebox.showerror("error", resp.json()["error"])
    else:
        menu_items=resp.json()["response"]
        c2 = Frame(u, width = 300, height = 50)
        Label(c2, text = login_info["RestaurantName"]).grid(row = 0, column = 1)
        Label(c2, text = "", width = 3).grid(row = 1, column =0)
        Label(c2, text = "Food", width = 15).grid(row = 1, column = 1)
        Label(c2, text = "Price", width = 15).grid(row = 1, column = 2)
        c2.pack()
        container = ttk.Frame(u, width = 300)
        canvas = tk.Canvas(container, width = 300)
        scrollbar = ttk.Scrollbar(container, orient = "vertical", command = canvas.yview)
        scrollable_frame = ttk.Frame(canvas, width = 300)
        scrollable_frame.bind("<Configure>", lambda e: canvas.configure(scrollregion=canvas.bbox("all")))
        canvas.create_window((0,0), window=scrollable_frame, anchor="nw")
        canvas.configure(yscrollcommand = scrollbar.set)
        Restaurant_foodID = IntVar()
        r = 2
        for i in range(len(menu_items)):
            Radiobutton(scrollable_frame,variable = Restaurant_foodID, value = menu_items[i]["FoodID"]).grid(row = r, column = 0)
            Label(scrollable_frame, text=menu_items[i]["FoodName"], width = 15).grid(row = r, column = 1)
            Label(scrollable_frame, text = menu_items[i]["FoodPrice"], width = 15).grid(row = r, column = 2)
            r+=1
        container.pack()
        c3 = Frame(u)
        Button(c3, text = "Update", command = update_food).grid(row = 5, column = 0)
        Button(c3, text = "Delete", command = delete_food_api).grid(row = 5, column = 1)
        Button(c3, text = "Back", command = back_selection).grid(row = 5, column = 2)
        canvas.pack(side = "left", fill="both", expand=True)
        scrollbar.pack(side="right", fill="y")
        c3.pack()

def owner_data_quantity():
    global img
    resp = requests.get(url+"restaurants/data/0", json = login_info)
    data1 = resp.json()["response"]
    print(data1)
    myviz = Viz()
    myviz.viz_rez_quantity(str(data1))
    img = ImageTk.PhotoImage(Image.open("viz.png"))  
    data = Toplevel()
    panel = Label(data, image = img)
    panel.image = img
    panel.pack()

def owner_data_money():
    global img
    resp = requests.get(url+"restaurants/data/1", json = login_info)
    data1 = resp.json()["response"]
    print(data1)
    myviz = Viz()
    myviz.viz_rest_money(str(data1))
    img = ImageTk.PhotoImage(Image.open("viz.png"))  
    data = Toplevel()
    panel = Label(data, image = img)
    panel.image = img
    panel.pack()


def owner_page():
    global user
    log.withdraw()
    user = Toplevel()
    user.geometry('350x200')
    user.title("Owner Selection Page")
    Button(user, text = "Add Food", command = add_food).pack()
    Button(user, text = "View Menu", command = view_menu).pack()
    Button(user, text = "Data Visualization (Quantity)", command = owner_data_quantity).pack()
    Button(user, text = "Data Visualization (Money)", command = owner_data_money).pack()
    Button(user, text = "Back", command = back_login).pack()


def validate(username, password, ID, owner):
    global login_info, ID_info
    info = {"isOwnerLogin": owner, "Username": username.get(), "Password": password.get()}
    if owner == 0:
        resp = requests.get(url+"userlogin", json=info)
        if resp.json()['status']!= 200:
            messagebox.showerror("Error", "Failed to login")
        else:
            login_info={"Username": username.get(), "Password": password.get()}
            user_page()
    else:
        info["RestaurantID"] = ID.get()
        resp = requests.get(url+"ownerlogin", json = info)
        if resp.json()['status']!= 200:
            messagebox.showerror("Error", "Failed to login")
        else:
            login_info={"Username": username.get(), "Password": password.get(), "RestaurantID":resp.json()["RestaurantID"], "RestaurantName":resp.json()["RestaurantName"]}
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
    log.geometry('400x300')
    log.title("User Login")
    usernameLabel = Label(log, text = "User Name").pack()
    username = StringVar()
    usernameEntry = Entry(log, textvariable = username)
    usernameEntry.pack()

    passwordLabel = Label(log,text="Password").pack()  
    password = StringVar()
    passwordEntry = Entry(log, textvariable=password, show='*')
    passwordEntry.pack()
    RestaurantLabel = Label(log, text = "RestaurantID")
    ID = IntVar()
    if owner.get() == 1:
        RestaurantLabel.pack()
        IDentry = Entry(log, textvariable = ID)
        IDentry.pack()
    v = partial(validate, username, password, ID, owner.get())
    LoginButton = Button(log, text="Login", command=v).pack() 
    w = partial(delete, usernameEntry, passwordEntry)
    Clear = Button(log, text = "clear", command = w).pack()
    Button(log, text = "back", command = back).pack()

def create_account(username, password, first, middle, last):
    data = {"Username": username.get(), "Password": password.get(), "FirstName": first.get(), "MiddleInitial": middle.get(), "LastName": last.get()}
    resp = requests.post("http://localhost:3000/register", json = data)
    if resp.json()['status'] == 1000:
        messagebox.showerror("Error", "Duplicate username")
    elif resp.json()['status'] == 500:
        messagebox.showerror("Error", "Other Error")
    else:
        messagebox.showinfo("Success", "User Successfully Created")

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