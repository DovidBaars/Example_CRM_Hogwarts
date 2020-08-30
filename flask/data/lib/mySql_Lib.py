def skill_list_update_or_add(cursor, skill):
    id = create_skill_in_skill_list(cursor, skill)
    if id == 0:
        sql = "SELECT id FROM skills WHERE name = %s"
        cursor.execute( sql, (skill,))
        id = cursor.fetchone()[0]
    return id

def create_skill_in_skill_list(cursor, skill):
    sql = "INSERT INTO skills SET name=%s ON DUPLICATE KEY UPDATE name=name"
    cursor.execute(sql, (skill,))
    return cursor.lastrowid

def fetch_admins_and_return_dict(cursor):
    admin_dict = {}
    sql = "SELECT * FROM admins"
    cursor.execute(sql)
    admins = cursor.fetchall()
    for admin in admins:
            admin_dict[admin[1]] = {
                "id": str(admin[0]),
                "email": admin[1],
                "name": admin[2],
                "password": admin[3]
                }
    return admin_dict

def fetch_students_and_return_dict(cursor):
    sql = "SELECT student_id, first_name, last_name, email, current_lvl, desired_lvl, name FROM students st INNER JOIN student_status ss ON ss.student_id = st.id INNER JOIN skills sk ON sk.id = ss.skill_code"
    cursor.execute(sql)
    students = cursor.fetchall()
    student_dict = populate_student_dict(students)
    return student_dict

def populate_student_dict(students):
    student_dict = {}
    student_dict = iterate_students_to_populate(students, student_dict)
    return student_dict

def iterate_students_to_populate(students, s_dict):
    for student in students:
        if not student[3] in s_dict:
            s_dict = populate_round_one(student, s_dict)
        else:
            s_dict = populate_round_two(student, s_dict)
    return s_dict

def populate_round_one(student, s_dict):
    s_dict[student[3]] = {
            "id": str(student[0]),
            "first_name": student[1],
            "last_name": student[2],
            "email": student[3],
            "skills": {
                student[6]: {
                    "current": student[4],
                    "desired": student[5]
                    }
            }}
    return s_dict

def populate_round_two(student, s_dict):
    s_dict[student[3]]["skills"][student[6]] = {
            "current": student[4],
            "desired": student[5]
            }
    return s_dict

def insert_admin_into_sql_table(cursor, admin):
    sql = "INSERT INTO admins (name, email, password) VALUES (%s, %s, %s)"
    val = (admin["name"], admin["email"], admin["password"])
    cursor.execute(sql, val)

def insert_data_into_students_table_skills_table_and_student_status_table(cursor, student):
    student_id = insert_student_into_students_table(cursor, student["first_name"], student["last_name"], student["email"])
    insert_into_skills_table_and_student_status_table(cursor, student, student_id)

def insert_student_into_students_table(cursor, first_name, last_name, email):
        sql = "INSERT INTO students (first_name, last_name, email) VALUES (%s, %s, %s)"
        val = (first_name, last_name, email)
        cursor.execute(sql, val)
        return cursor.lastrowid

def insert_into_skills_table_and_student_status_table(cursor, student, student_id):
    for key, value in student["skills"].items():
        if type(value) is dict:
            skill_code = skill_list_update_or_add(cursor, key)
            insert_in_student_status_list(cursor, value, skill_code, student_id)

def insert_in_student_status_list(cursor, value, skill_code, student_id):
    sql = "INSERT INTO student_status (current_lvl, desired_lvl, student_id, skill_code) VALUES (%s, %s, %s, %s)"
    val = (value["current"], value["desired"], student_id, skill_code)
    cursor.execute(sql, val)

def update_admin_in_admins_table_by_id(cursor, admin):
    sql = "UPDATE admins SET name=%s, email=%s, password=%s WHERE id=%s"
    val = (admin["name"], admin["email"], admin["password"], int(admin["id"]))
    cursor.execute(sql, val)

def delete_admin_from_admins_table_by_id(cursor, admin):
    sql = "DELETE FROM admins WHERE id = %s"
    cursor.execute(sql, (int(admin["id"]),))

def update_student_by_id(cursor, student):
    update_students_table_by_id(cursor, student)
    update_skills_table_and_student_status_table(cursor, student)


def update_students_table_by_id(cursor, student):
    sql = "UPDATE students SET email=%s, first_name=%s, last_name=%s WHERE id=%s"
    val = (student["email"], student["first_name"], student["last_name"], int(student["id"]))
    cursor.execute(sql, val)


def update_skills_table_and_student_status_table(cursor, student):
    student_id = int(student["id"])
    for key, value in student["skills"].items():
        unpack_skills_and_update_tables(cursor, key, value, student_id)

def unpack_skills_and_update_tables(cursor, key, value, student_id):
    if type(value) is dict:
        add_to_skill_and_status_lists(cursor, key, value, student_id)


def add_to_skill_and_status_lists(cursor, key, value, student_id):
    skill_code = skill_list_update_or_add(cursor, key)
    status_list_update_or_add(cursor, key, value, student_id, skill_code)

def status_list_update_or_add(cursor, key, value, student_id, skill_code):
    sql = "SELECT student_id FROM student_status WHERE skill_code=%s AND student_id=%s"
    val = (skill_code, student_id)
    cursor.execute( sql, val)
    res = cursor.fetchone()
    if type(res) != tuple:
        insert_in_student_status_list(cursor, value, student_id, skill_code)
    else:
        update_student_status_list(cursor, key, value, student_id, skill_code)

def update_student_status_list(cursor, key, value, student_id, skill_code):
    sql = "UPDATE student_status SET current_lvl=%s, desired_lvl=%s WHERE student_id=%s"
    val = (value["current"], value["desired"], student_id)
    cursor.execute(sql, val)

def delete_student_from_lists(cursor, student):
    id = int(student["id"])
    sql = "DELETE FROM students WHERE id=%s"
    cursor.execute(sql, (id,))
