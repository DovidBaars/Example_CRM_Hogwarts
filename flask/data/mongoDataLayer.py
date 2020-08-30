import pymongo
from data.baseDataLayer import BaseDataLayer

class MongoDataLayer(BaseDataLayer):

    def get_all_admins(self):
        admins = list(self.__db["admins"].find())
        admin_dict = {}
        for admin in admins:
            admin_dict[admin['email']] = {
                    "id": str(admin["_id"]),
                    "email": admin["email"],
                    "name": admin["name"],
                    "password": admin["password"]
                    }
        return admin_dict

    def get_all_students(self):
        students = list(self.__db["students"].find())
        student_dict = {}
        for student in students:
                student_dict[student["email"]] = {
                        "id": str(student["_id"]),
                        "email": student["email"],
                        "first_name": student["first_name"],
                        "last_name": student["last_name"],
                        "skills": student['skills']
                    }
        return student_dict

    def add_admin(self, admin):
        for entry in admin:
            newEntry = self.__db["admins"].insert_one(entry)
            print(newEntry.inserted_id)

    def add_student(self, student):
        for entry in student:
            newEntry = self.__db["students"].insert_one(entry)
            print(newEntry.inserted_id)

    def update_admin(self, data):
        for entry in data:
            query = {
                "_id": ObjectId(entry["id"])
                }
            admin = {
            "name": entry["name"],
            "email": entry["email"],
            "password": entry["password"]
            }
            self.__db["admins"].update(query, admin)

    def update_student(self, data):
        for entry in data:
            query = {
                "_id": ObjectId(entry["id"])
                }
            student = {
            "first_name": entry["first_name"],
            "last_name": entry["last_name"],
            "email": entry["email"],
            "skills": entry["skills"]
            }
            self.__db["students"].update(query, student)

    def delete_admin(self, data):
        query = {
            "_id": ObjectId(data["id"])
            }
        self.__db["admins"].remove(query)

    def delete_student(self, data):
        query = {
            "_id": ObjectId(data["id"])
            }
        self.__db["students"].remove(query)

    def get_skills_list(self):
        skills = list(self.__db["students"].aggregate([ {"$project":{"arrayofkeyvalue":{"$objectToArray":"$skills"}}}, {"$unwind":"$arrayofkeyvalue"}, {"$group":{"_id":None,"allkeys":{"$addToSet":"$arrayofkeyvalue.k"}}} ]))

        skillsListOfLists = [[x] for x in skills[0]["allkeys"]]
        return skillsListOfLists

    def __connect(self):
        self.__client = pymongo.MongoClient('localhost', 27017)
        self.__db = self.__client["hogwarts_db"]

    def shutdown(self):
        self.__client.close()

    def __init__(self):
        super().__init__()
        self.__connect()




