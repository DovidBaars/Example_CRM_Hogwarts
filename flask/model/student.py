import datetime
import json




class Student(User):
    def __init__(self,
                 first_name: str,
                 last_name: str,
                 email: str,
                 skills: dict,
                 created_time,
                 updated_time
                ):
        super().__init__(email)
        self._skills = skills
        self._first_name = first_name,
        self._last_name = last_name
        self._created_time = created_time
        self._updated_time = updated_time

