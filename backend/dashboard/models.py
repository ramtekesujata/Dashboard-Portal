# This is an auto-generated Django model module.
# You'll have to do the following manually to clean this up:
#   * Rearrange models' order
#   * Make sure each model has one field with primary_key=True
#   * Make sure each ForeignKey and OneToOneField has `on_delete` set to the desired behavior
#   * Remove `managed = False` lines if you wish to allow Django to create, modify, and delete the table
# Feel free to rename the models, but don't rename db_table values or field names.
from django.db import models

class StudentDetails(models.Model):
    studentid = models.CharField(db_column='studentId', primary_key=True, max_length=255)  # Field name made lowercase.
    firstname = models.CharField(db_column='firstName', max_length=255)  # Field name made lowercase.
    lastname = models.CharField(db_column='lastName', max_length=255, blank=True, null=True)  # Field name made lowercase.
    location = models.CharField(max_length=255)
    english = models.IntegerField()
    maths = models.IntegerField()
    chemistry = models.IntegerField()
    physics = models.IntegerField()
    biology = models.IntegerField()
    history = models.IntegerField()
    geography = models.IntegerField()

    class Meta:
        managed = False
        db_table = 'student_details'
