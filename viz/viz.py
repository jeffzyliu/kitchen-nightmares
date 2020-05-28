# Viz.py
# Class with functions for creating visualizations of Kitchen Nightmares data
# Arjun Srinivasan, May 21 2020
# 
# Here's an exmaple to demostrate how to use it.
# 
#       myviz = Viz()                       # instantiate a Viz object
#       myviz.viz_user_spending(data)       # call the appropriate viz method (could use one of other three)
#       # Do something with "viz.png"       # note that visualization is saved as "viz.png" in the current directory
#
# Imports for basic visualizations
import re
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns

# Ended up not using map-based visualizations:

# Imports for map-based viz - 1
# import geopandas as gpd

# Imports for map-based viz - 2
# import geoviews as gv
# import geoviews.title_sources as gvts
# from geoviews import dim, opts
# gv.extension('bokeh')

# Constants for maps
# get longitude, latitude
# loc_foco = [43.703022, -72.291034]
# loc_hop = []
# loc_lous = [43.702674, -72.289859]
# loc_pine = [43.702224, -72.289156]

class Viz:
    pass

    # Generic object initialization
    def __init__(self):
        pass

    '''
    Function to parse JSON string and return X and Y lists representing data values.
    Input:
        jsonstring - JSON string with the relevant data
        type - 'f' if float data, 'i' if int data
    Output: 
        X = X data (RestaurantNames or FoodNames)
        Y = Y data (MoneySpent, MealCount, FoodCount, or FoodRevenue)
    '''
    def customJSONparse(self, jsonstring, type):

        X = []
        Y = []
        
        if (jsonstring[0] != "["):
            print("JSON Parse error: no open bracket [")
        else:
            items = re.split("{",jsonstring)
            for i in range(0,len(items)):
                
                attrs = re.split(",", items[i])
                
                for j in range(0,len(attrs)):
                    
                    if ((i > 0) and ((j == 0) or (j == 1))):
                        
                        ones = re.split("'",attrs[j])
                        
                        if j == 0:
                            X.append(ones[3])
                        elif j == 1:
                            if type == 'f':
                                ys = re.findall("\d+\.\d+",ones[2])
                            else:
                                ys = re.findall("\d+",ones[2])
                            Y.append(ys[0])

        return X,Y

    '''
    Function to create bar graph ("viz.png") of restaurants weighted by sum of money spent at each restaurant.
    Input: 
     X = restaurants
     Y = sum of money spent at each restaurant 
    Output: Bar graph (see above)
    '''
    # Input:
    def viz_user_spending(self, data):

        # Convert JSON data to Python list
        X,Y = self.customJSONparse(data,'f')

        # Plot
        sns.set_palette("Paired")
        ax = sns.barplot(X, Y)
        ax.set(ylabel='Money Spent')

        #plt.show()
        plt.savefig('viz.png',bbox_inches='tight')  # Save the final pie chart
        plt.clf()

        return

    '''
    Function to create bar graph ("viz.png") of restaurants weighted by frequency of meals at each restaurant.
    Input: 
     X = restaurants
     Y = number of meals at each restaurant 
    Output: Bar graph (above)
    '''
    def viz_user_freq(self, data):

        # Convert JSON data to Python list (fill in later)
        X,Y = self.customJSONparse(data,'i')

        # Plot
        sns.set_palette("Paired")
        ax = sns.barplot(X, Y)
        ax.set(ylabel='No. of Meals')

        #plt.show()
        plt.savefig('viz.png',bbox_inches='tight')  # Save the final pie chart
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

        # Convert JSON data to Python list
        labels,wedges = self.customJSONparse(data, 'i')

        # Consider removing foods that never have been purchased

        sns.set_palette("Paired")
        plt.pie(wedges, labels=labels, labeldistance=None, shadow=True, startangle=90)
        # Removed options: autopct=lambda p: '{:.1f}%'.format(round(p)) if p > 0 else ''
        plt.axis('equal')   # Equal aspect ratio (pie drawn as a circle)
        plt.legend(loc="best")
        plt.title("Relative quantities of each food purchased")

        #plt.show()
        plt.savefig('viz.png',bbox_inches='tight')  # Save the final pie chart
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

        # Convert JSON data to Python list
        labels,wedges = self.customJSONparse(data, 'f')

        # Consider removing foods that have zero money spent on them

        sns.set_palette("Paired")
        plt.pie(wedges, labels=labels, labeldistance=None, shadow=True, startangle=90)
        # Removed options: autopct=lambda p: '{:.1f}%'.format(round(p)) if p > 0 else ''
        plt.axis('equal')   # Equal aspect ratio (pie drawn as a circle)
        plt.legend(loc="best")
        plt.title("Share of money spent on each food")

        #plt.show()
        plt.savefig('viz.png',bbox_inches='tight')  # Save the final pie chart
        plt.clf()

        return 

# # Testing!

# # Raw data to visualize
# data_1 = [["Indian Rest 1", "Indian Rest 2", "Indian Rest 3"], [100.35,22.67,36.34]]
# data_2 = [["Indian Rest 1", "Indian Rest 2", "Indian Rest 3"], [30,25,69]]
# data_3 = [["Naan","Dosa","Paneer","Bhatura","Butter chicken","Chana masala","Chaat"],[1,5,3,4,0,2,6]]
# data_4 = [["Naan","Dosa","Paneer","Bhatura","Butter chicken","Chana masala","Chaat"],[85.30,60.25,12.53,4.56,0,40.30,20.05]]

# # JSON strings passed into viz.py
# array of [ { RestaurantName, MoneySpent } ... ]
# array of [ { RestaurantName, MealCount } ... ]
# array of [ { FoodName, FoodCount } ... ]
# array of [ { FoodName, FoodRevenue } ... ]

# # Example JSON string data to visualize
# data_1 = "[{u'RestaurantName': u'Courtyard Cafe', u'MoneySpent': 14.5}, {u'RestaurantName': u'Foco', u'MoneySpent': 7.75}]"
# data_2 = "[{u'RestaurantName': u'Courtyard Cafe', u'MealCount': 13}, {u'RestaurantName': u'Foco', u'MealCount': 20}]"
# data_3 = "[{u'FoodName': u'Pizza', u'FoodCount': 13}, {u'FoodName': u'Hamburger', u'FoodCount': 20}]"
# data_4 = "[{u'FoodName': u'Pizza Cafe', u'FoodRevenue': 13.87}, {u'FoodName': u'Hamburger', u'FoodRevenue': 84.28}]"

# myviz = Viz()                       # instantiate a Viz object
# myviz.viz_user_spending(data_1)     # call viz method 1
# myviz.viz_user_freq(data_2)         # call viz method 2
# myviz.viz_rez_quantity(data_3)      # call viz method 3
# myviz.viz_rest_money(data_4)        # call viz method 4