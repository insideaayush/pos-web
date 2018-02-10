from pos_api.settings.common import *

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = 'b8&k!skhmvvm@^7h%cj^0snc!av5*w6rr!f#d@^(@cpj#q)1l8'

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True

ALLOWED_HOSTS = []

# Database
# https://docs.djangoproject.com/en/2.0/ref/settings/#databases

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': os.path.join(BASE_DIR, 'db.sqlite3'),
    }
}
