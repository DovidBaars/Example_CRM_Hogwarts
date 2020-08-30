import mysql.connector
from decouple import config
from data.baseDataLayer import BaseDataLayer
from data.lib.mySql_Lib import *

class MySqlDataLayer(BaseDataLayer):

    def get_all_admins(self):
        try:
            cursor = self.__mydb.cursor()
            self.__mydb.start_transaction()
            admin_dict = fetch_admins_and_return_dict(cursor)
            self.__mydb.commit()
            print("Admins retrieved Successfully")
            return admin_dict
        except mysql.connector.Error as error:
            print("Failed to update record to database rollback: {}".format(error))
            self.__mydb.rollback()
        finally:
            cursor.close()

    def get_all_students(self):
        try:
            cursor = self.__mydb.cursor()
            self.__mydb.start_transaction()
            student_dict = fetch_students_and_return_dict(cursor)
            self.__mydb.commit()
            print("Students Retrieved Successfully")
            return student_dict
        except mysql.connector.Error as error:
            print("Failed to update record to database rollback: {}".format(error))
            self.__mydb.rollback()
        finally:
            cursor.close()

    def add_admin(self, admin):
        try:
            cursor = self.__mydb.cursor()
            self.__mydb.start_transaction()
            insert_admin_into_sql_table(cursor, admin)
            self.__mydb.commit()
            print("Admin Added Successfully")
        except mysql.connector.Error as error:
            print("Failed to update record to database rollback: {}".format(error))
            self.__mydb.rollback()
        finally:
            cursor.close()

    def add_student(self, student):
        try:
            cursor = self.__mydb.cursor()
            self.__mydb.start_transaction()
            insert_data_into_students_table_skills_table_and_student_status_table(cursor, student)
            self.__mydb.commit()
            print("Student Added Successfully")
        except mysql.connector.Error as error:
            print("Failed to update record to database rollback: {}".format(error))
            self.__mydb.rollback()
        finally:
            cursor.close()

    def update_admin(self, admin):
        try:
            cursor = self.__mydb.cursor()
            self.__mydb.start_transaction()
            update_admin_in_admins_table_by_id(cursor, admin)
            self.__mydb.commit()
            print("Admin Updated Successfully")
        except mysql.connector.Error as error:
            print("Failed to update record to database rollback: {}".format(error))
            self.__mydb.rollback()
        finally:
            cursor.close()

    def update_student(self, student):
        try:
            cursor = self.__mydb.cursor()
            self.__mydb.start_transaction()
            update_student_by_id(cursor, student)
            self.__mydb.commit()
            print("Student Updated Successfully")
        except mysql.connector.Error as error:
            print("Failed to update record to database rollback: {}".format(error))
            self.__mydb.rollback()
        finally:
            cursor.close()

    def delete_admin(self, admin):
        try:
            cursor = self.__mydb.cursor()
            self.__mydb.start_transaction()
            delete_admin_from_admins_table_by_id(cursor, admin)
            self.__mydb.commit()
            print("Admin Deleted Successfully")
        except mysql.connector.Error as error:
            print("Failed to update record to database rollback: {}".format(error))
            self.__mydb.rollback()
        finally:
            cursor.close()

    def delete_student(self, student):
            try:
                cursor = self.__mydb.cursor()
                self.__mydb.start_transaction()
                delete_student_from_lists(cursor, student)
                self.__mydb.commit()
                print("Student Deleted Successfully")
            except mysql.connector.Error as error:
                print("Failed to update record to database rollback: {}".format(error))
                self.__mydb.rollback()
            finally:
                cursor.close()

    def get_skills_list(self):
            try:
                cursor = self.__mydb.cursor()
                self.__mydb.start_transaction()
                sql = "SELECT name FROM skills"
                cursor.execute(sql)
                skills = cursor.fetchall()
                self.__mydb.commit()
                print("Skills retrieved Successfully")
                return skills
            except mysql.connector.Error as error:
                print("Failed to update record to database rollback: {}".format(error))
                self.__mydb.rollback()
            finally:
                cursor.close()

    def shutdown(self):
        self.__mydb.close()

    def __connect(self):
        try:
            self.__mydb = mysql.connector.connect(
                host="localhost",
                user=config('MYSQL_USER'),
                passwd=config('PASSWORD'),
                database="Hogwarts"
            )
            self.__mydb.autocommit = False
        except Exception as e:
            print(e)

    def __init__(self):
        super().__init__()
        self.__connect()

