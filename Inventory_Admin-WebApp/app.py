import json
import pyrebase
from flask import Flask, render_template, request, redirect, url_for, flash, session, escape
from werkzeug.utils import redirect, secure_filename
import pdb
# from collections import OrderedDict
import collections
app = Flask(__name__)
app.secret_key = "super secret key"

config = {
    "apiKey": "AIzaSyCwK6HiS7WyCCmNdpXi745RVwGFmCE6zcs",
    "authDomain": "inventory-management-rfid.firebaseapp.com",
    "databaseURL": "https://inventory-management-rfid.firebaseio.com",
    "projectId": "inventory-management-rfid",
    "storageBucket": "inventory-management-rfid.appspot.com",
    "messagingSenderId": "74669584401",
    "appId": "1:74669584401:web:769b35aaf0ecfa730341b0",
    "measurementId": "G-EVP92VYWZ2"
}
firebase = pyrebase.initialize_app(config)
auth = firebase.auth()

# insilized the database
db = firebase.database()


def convert(data):
    if isinstance(data, basestring):
        return str(data)
    elif isinstance(data, collections.Mapping):
        return dict(map(convert, data.iteritems()))
    elif isinstance(data, collections.Iterable):
        return type(data)(map(convert, data))
    else:
        return data


@app.route('/', methods=['GET', 'POST'])
#  fucntion for login page
def login():
    unsuccessful = "Check you information"
    successful = 'Login successful'

    if request.method == "POST":
        email = request.form['name']
        password = request.form['pass']
        try:
            auth.sign_in_with_email_and_password(email, password)
            return render_template('inventory.html')
        except:
            return render_template('login.html', us=unsuccessful)

    return render_template('login.html')

# function for homePage


@app.route('/home', methods=['GET'])
def homePage():
    unsuccessful = "Check you information"
    if request.method == "GET":
        try:
            return render_template('inventory.html')
        except Exception as e:
            return unsuccessful

# function adding inventory


@app.route('/inventory', methods=['GET'])
def stock():
    try:
        if request.method == "GET":
            return render_template('inventory.html')

    except Exception as e:
        flash(e)
        return render_template('home.html')

    # return render_template('inventory.html')


@app.route('/insert', methods=['POST'])
def insert():
    try:
        prodname = request.form['addname']
        prodprice = request.form['addprice']
        prodquant = request.form['addquantity']

        if prodname == '':
            return render_template('inventory.html')
        elif prodprice == '':
            return render_template('inventory.html')
        elif prodquant == '':
            return render_template('inventory.html')
        else:
            if request.method == 'POST':
                name_exist = db.child("Product Name").get()
                name = name_exist.val()
                dct = convert(name)
                # pdb.set_trace()
                if prodname.encode("utf-8") not in dct.keys():

                    # pdb.set_trace()
                    data = {"Name": prodname, "Price": prodprice,
                            "Quantity": prodquant}

                    db.child("Product Name").child(prodname).set(data)
                    flash(prodname + ', ' + prodprice + ', ' +
                          prodquant + ', Successfully saved!')
                    return render_template('inventory.html')

                else:
                    flash("item already exists")
                    return render_template('inventory.html')
                    # pdb.set_trace()

            else:
                return render_template('inventory.html')
    except Exception as e:
        flash(e)
        return render_template('inventory.html')


@app.route('/delete', methods=['POST'])
def delete():
    try:
        name = request.form['prodsname']
        if name == "":
            return render_template('inventory.html')
        else:
            if request.method == 'POST':
                name_exist = db.child("Product Name").get()
                dct = convert(name_exist.val())
                # pdb.set_trace()
                if name.encode("utf-8") not in dct.keys():
                    flash('Product ' +
                          request.form['prodsname'] + ' is not on the List')
                else:
                    users = db.child("Product Name").child(name).remove()
                    flash(
                        'Product ' + request.form['prodsname'] + ' is removed from the List')
                    return render_template('inventory.html')
        return render_template('inventory.html')
    except Exception as e:
        flash(e)
        return render_template('inventory.html')


@app.route('/search', methods=['GET', 'POST'])
def search():
    print("helooooooo")
    try:
        if request.method == 'POST':
            # db = firebase.database()
            name = request.form['name']
            name_exist = db.child("Product Name").get()
            name = name_exist.val()
            dct = convert(name)

            # print(dct)
            Table = []
            for key, value in dct.iteritems():    # or .items() in Python 3
                temp = []
                # Note that this will change depending on the structure of your dictionary
                temp.extend([key, value])
                Table.append(temp)
                print(Table)

            items = dct.keys()

            vals = dct.values()

            return render_template('inventory.html', products=items,  vals=vals, dct=dct, name=Table)
    except Exception as e:
        flash(e)
        return render_template('inventory.html')


@app.route('/update', methods=['POST'])
def update():
    try:

        prod_name = request.form['namess']
        prod_price = request.form['pricee']
        prod_quant = request.form['quantityy']

        if prod_name == "":
            return render_template('inventory.html')
        elif prod_price == "":
            return render_template('inventory.html')
        elif prod_quant == "":
            return render_template('inventory.html')
        else:
            if request.method == 'POST':
                name = db.child("Product Name").get()
                quantity1 = db.child("Product Name").child(
                    prod_name).child("Quantity").get()
                quantity = quantity1.val()

                name2 = name.val()
                dct = convert(name2)

                pdb.set_trace()
                if prod_name.encode("utf-8") in dct:

                    # if quantity < 0:
                    #     flash('insufficient quantity')
                    #     return render_template('inventory.html')
                    # else:

                    db.child("Product Name").child(
                        prod_name).update({'Price': prod_price})
                    sum = int(prod_quant) + int(quantity)
                    db.child("Product Name").child(
                        prod_name).update({'Quantity': sum})
                    flash('successfully updated')
                    return render_template('inventory.html')
                else:
                    flash("Item does not exist")
                    return render_template('inventory.html')
    except Exception as e:
        flash(e)
        return render_template('inventory.html')


if __name__ == '__main__':
    app.run(debug=True)
