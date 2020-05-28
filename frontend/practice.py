import tkinter as tk
import tkinter.ttk as ttk
import tkcalendar as tkc

def main():
    root = tk.Tk()
    style = ttk.Style(root)
    style.theme_use('clam')

    test_frame = ttk.Frame(root)
    test_frame.pack(side='top', fill='both', expand=True)

    test_date_entry = tkc.DateEntry(test_frame, locale='en_US')
    test_date_entry.pack(padx=10, pady=10)
    test_date_entry._top_cal.overrideredirect(False)
    root.after(100, test_date_entry.drop_down)

    root.mainloop()

if __name__ == '__main__':
    main()