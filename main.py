from flask import Flask,jsonify,request
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS

app=Flask(__name__)
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///database.db"
db = SQLAlchemy(app)
CORS(app)

#----------------------------------------------------------------------

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    userName = db.Column(db.String(80), unique=True, nullable=False)
    password= db.Column(db.String(130), nullable=False) 

    def toJson(self):
        return{
            "id":self.id,
            "userName": self.userName,
            "password":self.password
        }

class InventoryItem(db.Model):
    id=db.Column(db.Integer, primary_key=True)
    itemName=db.Column(db.String(100),unique=False,nullable=False)
    itemType=db.Column(db.String(100),unique=False,nullable=False)
    quantity=db.Column(db.Integer,unique=False,nullable=False)

    def toJson(self):
        return{
            "id":self.id,
            "itemName": self.itemName,
            "itemType":self.itemType
            ,"quantity": self.quantity
        }
#--------------------------------------------------------------------------------

# get users
@app.route("/user", methods=["GET"])
def get_user():
    users=User.query.all()
    json_user = [user.toJson() for user in users]
    return jsonify({"USERS" : json_user}),200
#-------------------------------------------------------------------------------

#creat users
@app.route("/user", methods=["POST"])
def createUser():
    userName =request.json.get("userName")
    password=request.json.get("password")

    if not userName or not password :
        return (
           jsonify( {"message" : "You must include userName and password"}),400
        ) 
    new_user=User(userName=userName , password = password)

    try:
        db.session.add(new_user)
        db.session.commit()
    except Exception as e:
        return( jsonify({"message": str(e)}))
    
    return( jsonify({"message": "User created "}))
#------------------------------------------------------------------------------------
# create item
@app.route("/item", methods=["POST"])
def create_item():
 try:
    itemName = request.json.get("itemName")
    itemType = request.json.get("itemType")
    quantity = request.json.get("quantity")

    if not itemName or not itemType or not quantity :
        return jsonify({"message": "You must include item Name and item Type"}), 400

    # Create a new InventoryItem instance
    new_item = InventoryItem(itemName=itemName, itemType=itemType , quantity=quantity)

   
        # Add the new item to the session and commit to the database
    db.session.add(new_item)
    db.session.commit()
    return jsonify({"message": "Item created"}), 201
 except Exception as e:
        db.session.rollback()
        return jsonify({"message": str(e)}), 400
#---------------------------------------------------------------------------------

# get items
@app.route("/item", methods=["GET"])
def get_item():
    items=InventoryItem.query.all()
    json_item = [item.toJson() for item in items]
    return jsonify({"ITEMS" : json_item}),200
#---------------------------------------------------------------------------------
# Delete a friend
@app.route("/delete/<int:id>",methods=["DELETE"])
def delete_item(id):
  try:
    item = InventoryItem.query.get(id)
    if item is None:
      return jsonify({"error":"Item not found"}), 404
    
    db.session.delete(item)
    db.session.commit()
    return jsonify({"msg":"Item deleted"}), 200
  except Exception as e:
    db.session.rollback()
    return jsonify({"error":str(e)}),500
  

@app.route("/user/<int:id>",methods=["DELETE"])
def delete_user(id):
  try:
    user = User.query.get(id)
    if user is None:
      return jsonify({"error":"user not found"}), 404
    
    db.session.delete(user)
    db.session.commit()
    return jsonify({"msg":"user deleted"}), 200
  except Exception as e:
    db.session.rollback()
    return jsonify({"error":str(e)}),500




if __name__ == '__main__':
    with app.app_context():
      db.create_all() 
    app.run(debug=True)