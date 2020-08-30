import datetime
import json


class User:
    def __init__(self,
                 email: str,
                 created_time,
                 updated_time
                 ):
        self._email = email
        self._created_time = datetime.datetime.now().strftime("%y_%m_%d")
        self._updated_time = self._created_time

 
