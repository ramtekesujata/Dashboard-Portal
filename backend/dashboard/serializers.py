from dashboard.models import StudentDetails
from rest_framework import serializers, validators
from authenticate.models import RenewAccessToken
from dashboard.models import StudentDetails
import portal.settings as settings
import json
import mysql.connector

def databaseConnector(query):
    db = mysql.connector.connect(host=settings.DATABASES['default']['HOST'],user=settings.DATABASES['default']['USER'],passwd=settings.DATABASES['default']['PASSWORD'],db=settings.DATABASES['default']['NAME'],port=settings.DATABASES['default']['PORT'])
    cursor = db.cursor(dictionary=True)
    cursor.execute(query)
    result = cursor.fetchall()
    data=json.dumps(result)
    data=json.loads(data)
    return data