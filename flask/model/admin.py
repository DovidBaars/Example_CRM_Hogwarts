from model.user import User


class Admin(User):
    def __init__(self, name, email, password, created_time, updated_time):
        super().__init__(email, created_time, updated_time)
        self._password = password
        self._name = name
        self._created_time = created_time
        self._updated_time = updated_time
    