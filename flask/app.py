from flask import Flask, json, request
from flask_cors import CORS
from bson import json_util, ObjectId
from decouple import config
import atexit
from data.mongoDataLayer import MongoDataLayer
from data.mySqlDataLayer import MySqlDataLayer


app = Flask(__name__)
CORS(app)

if config("DB") == "Mysql":
    dataLayer = MySqlDataLayer()
else:
    dataLayer = MongoDataLayer()

@app.route("/admins")
def get_all_admins():
    admins = dataLayer.get_all_admins()
    return app.response_class(response=json.dumps(admins, default=json_util.default))

@app.route("/students")
def get_all_students():
    students = dataLayer.get_all_students()
    return app.response_class(response=json.dumps(students, default=json_util.default))

@app.route("/admins/add", methods=["POST"])
def add_admin():
    data = request.get_json()
    dataLayer.add_admin(data)
    return app.response_class(response=json.dumps({"status": "ok"}))

@app.route("/students/add", methods=["POST"])
def add_student():
    data = request.get_json()
    dataLayer.add_student(data)
    return app.response_class(response=json.dumps({"status": "ok"}))

@app.route("/admins/update", methods=["PUT"])
def update_admin():
    data = request.get_json()
    dataLayer.update_admin(data)
    return app.response_class(response=json.dumps({"status": "ok"}))

@app.route("/students/update", methods=["PUT"])
def update_student():
    data = request.get_json()
    dataLayer.update_student(data)
    return app.response_class(response=json.dumps({"status": "ok"}))

@app.route("/admins/delete", methods=["PUT"])
def delete_admin():
    data = request.get_json()
    dataLayer.delete_admin(data)
    return app.response_class(response=json.dumps({"status": "ok"}))

@app.route("/students/delete", methods=["PUT"])
def delete_student():
    data = request.get_json()
    dataLayer.delete_student(data)
    return app.response_class(response=json.dumps({"status": "ok"}))

@app.route("/skills")
def get_skills_list():
    skills = dataLayer.get_skills_list()
    return app.response_class(response=json.dumps(skills, default=json_util.default))

@atexit.register
def goodbye():
    dataLayer.shutdown()