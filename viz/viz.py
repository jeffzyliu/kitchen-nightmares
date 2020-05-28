# Viz.py
# Class with functions for creating visualizations of Kitchen Nightmares data
# Arjun Srinivasan, May 21 2020
# 
# Here's an exmaple to demostrate how to use it.
# 
#       myviz = Viz()                       # instantiate a Viz object
#       myviz.viz_user_spending(data)       # call the appropriate viz method (could use one of other three)
#       # Do something with "viz.png"       # note that visualization is saved as "viz.png" in the current directory
#       myviz.delete()                      # deletes "viz.png" from the current directory and then deletes Viz object
#
import json
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns

import geoview as gv
import geoview.title_sources as gvts
from geoviews import dim, opts
gv.extension('bokeh')

# Note to future Arjun - loading in json data
# look here: https://realpython.com/python-json/#a-simple-deserialization-example


# Constants for maps
# get longitude, latitude
loc_foco = [43.703022, -72.291034]
loc_lous = [43.702674, -72.289859]
loc_pine = [43.702224, -72.289156]


class Viz:
    pass

    def __init__(self):
        pass

    '''
    Function to create heatmap ("viz.png") of restaurants weighted by sum of money spent at each restaurant.
    Input: 
     X = restaurants
     Y = sum of money spent at each restaurant 
    Output: Pie chart percent of revenue each food item brings in
    '''
    # Input:
    def viz_user_spending(self, data):

        # Convert JSON data to Python list (fill in later)


        # For now assume data is array of y, x
        labels = data[0]
        cost = data[1]
        
        # Create pandas dataframe
        labeled_data = pd.DataFrame(cost).T
        labeled_data.columns = labels

        # set plot backgorund
        sns.set(style="white", font_scale=.8)

        # Set up the matplotlib figure
        f, ax = plt.subplots(figsize=(15, 20))

        # Generate a custom diverging colormap
        cmap = sns.light_palette((210, 90, 60), input="husl", as_cmap=True)

        #cbar_kws{"shrink": .25}
        ax = sns.heatmap(labeled_data, cmap=cmap, linewidths=.01)

        #plt.show()
        plt.savefig('viz1.png',bbox_inches='tight')  # Save the final pie chart
        plt.clf()

        return

    '''
    Function to create heatmap ("viz.png") of restaurants weighted by frequency of meals at each restaurant.
    Input: 
     X = restaurants
     Y = number of meals at each restaurant 
    Output: Pie chart percent of revenue each food item brings in
    '''
    def viz_user_freq(self, data):

        # Convert JSON data to Python list (fill in later)


        # For now assume data is array of y, x
        labels = data[0]
        freq = data[1]
        
        # Create pandas dataframe
        labeled_data = pd.DataFrame(freq).T
        labeled_data.columns = labels

        # set plot backgorund
        sns.set(style="white", font_scale=.8)

        # Set up the matplotlib figure
        f, ax = plt.subplots(figsize=(15, 20))

        # Generate a custom diverging colormap
        cmap = sns.light_palette((210, 90, 60), input="husl", as_cmap=True)

        #cbar_kws{"shrink": .25}
        ax = sns.heatmap(labeled_data, cmap=cmap, linewidths=.01)

        #plt.show()
        plt.savefig('viz2.png',bbox_inches='tight')  # Save the final pie chart
        plt.clf()

        return

    '''
    Function to create visualization ("viz.png") of food items weighted by number purchased.
    Input: 
     X = food items
     Y = number of purchases of each food item 
    Output: Pie chart percent of revenue each food item brings in
    '''
    def viz_rez_quantity(self, data):

        # Convert JSON data to Python list (fill in later)

        # Consider removing foods that never have been purchased

        # For now assume data is array of y, x
        labels = data[0]
        wedges = data[1]

        plt.pie(wedges, labels=labels, labeldistance=None, shadow=True, startangle=90)
        # Removed options: autopct=lambda p: '{:.1f}%'.format(round(p)) if p > 0 else ''
        plt.axis('equal')   # Equal aspect ratio (pie drawn as a circle)
        plt.legend(loc="best")
        plt.title("Relative quantities of each food purchased")

        #plt.show()
        plt.savefig('viz3.png',bbox_inches='tight')  # Save the final pie chart
        plt.clf()

        return 

    '''
    Function to create visualization ("viz.png") of food items weighted by total sum of money spent on food item.
    Input: 
     X = food items
     Y = total sum of money spent on that food item 
    Output: Pie chart percent of revenue each food item brings in
    '''
    def viz_rest_money(self, data):

        # Convert JSON data to Python list (fill in later)

        # Consider removing foods that have zero money spent on them

        # For now assume data is array of y, x
        labels = data[0]
        wedges = data[1]

        plt.pie(wedges, labels=labels, labeldistance=None, shadow=True, startangle=90)
        # Removed options: autopct=lambda p: '{:.1f}%'.format(round(p)) if p > 0 else ''
        plt.axis('equal')   # Equal aspect ratio (pie drawn as a circle)
        plt.legend(loc="best")
        plt.title("Share of money spent on each food")

        #plt.show()
        plt.savefig('viz4.png',bbox_inches='tight')  # Save the final pie chart
        plt.clf()

        return 

# Testing!

# Some fake data to visualize
data_1 = [["Indian Rest 1", "Indian Rest 2", "Indian Rest 3"], [100.35,22.67,36.34]]
data_2 = [["Indian Rest 1", "Indian Rest 2", "Indian Rest 3"], [30,25,69]]
data_3 = [["Naan","Dosa","Paneer","Bhatura","Butter chicken","Chana masala","Chaat"],[1,5,3,4,0,2,6]]
data_4 = [["Naan","Dosa","Paneer","Bhatura","Butter chicken","Chana masala","Chaat"],[85.30,60.25,12.53,4.56,0,40.30,20.05]]

myviz = Viz()                       # instantiate a Viz object
myviz.viz_user_spending(data_1)     # call viz method 1
myviz.viz_user_freq(data_2)         # call viz method 2
myviz.viz_rez_quantity(data_3)      # call viz method 3
myviz.viz_rest_money(data_4)        # call viz method 4