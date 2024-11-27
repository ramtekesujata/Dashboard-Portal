import pymysql
pymysql.install_as_MySQLdb()
import MySQLdb
import xlrd

database = MySQLdb.connect (host="127.0.0.1" , user="root" , passwd="testing" ,db="wematter",port=3308)
cursor = database.cursor()

student_details_table = ("CREATE TABLE IF NOT EXISTS student_details(studentId varchar(255),firstName varchar(255) NOT NULL,lastName varchar(255),location varchar(255) NOT NULL,english int NOT NULL,maths int NOT NULL,chemistry int NOT NULL,physics int NOT NULL,biology int NOT NULL,history int NOT NULL,geography int NOT NULL, PRIMARY KEY (studentId))")
cursor.execute(student_details_table)

excel_sheet = xlrd.open_workbook('20220810_Dummy_Assignment_Data.xlsx')
sheet_name = excel_sheet.sheet_names()
insert_query = "INSERT INTO student_details (studentId,firstName,lastName,location,english,maths,chemistry,physics,biology,history,geography) VALUES (%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s)"

for sh in range(0,len(sheet_name)):
    sheet= excel_sheet.sheet_by_index(sh)
    
    for r in range(1,sheet.nrows):
        studentId = sheet.cell(r,0).value

        firstName = sheet.cell(r,1).value

        lastName = sheet.cell(r,2).value
     
        location = sheet.cell(r,3).value
      
        english = sheet.cell(r,4).value
        
        maths = sheet.cell(r,5).value

        chemistry = sheet.cell(r,5).value

        physics = sheet.cell(r,5).value

        biology = sheet.cell(r,5).value

        history = sheet.cell(r,5).value

        geography = sheet.cell(r,5).value
        
        student_details_value = (studentId,firstName,lastName,location,english,maths,chemistry,physics,biology,history,geography)
        
        
        cursor.execute(insert_query,student_details_value)
        database.commit()