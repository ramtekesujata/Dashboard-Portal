from sys import exec_prefix
from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework import status
from rest_framework.response import Response
from dashboard.serializers import databaseConnector
# Create your views here.

@api_view(['GET'])
def studentDetails(request):
    if request.user.is_authenticated:
        try:
            query1="select count(*) from student_details"
            query2="select count(distinct(location)) from student_details"
            studentCount=databaseConnector(query1)[0][query1.split(" ")[1]]
            location=databaseConnector(query2)[0][query2.split(" ")[1]]
            data={"count":studentCount,"locations":location,"subject":7}
            return Response(data, status=status.HTTP_200_OK)
        except:
            return Response({"message":"Something went Wrong"}, status=status.HTTP_400_BAD_REQUEST)
    else:
         return Response({"message": "User is not authenticated"}, status=status.HTTP_403_FORBIDDEN)

@api_view(['GET'])
def FailandPass(request):
    if request.user.is_authenticated:
        try:
            try:
                params=dict(request.GET)
                city=params["city"]
                data=databaseConnector("select * from student_details where location = '"+city[0]+"'")
                fail=0
                passed=0
                for i in data:
                    marks=[i["english"],i["maths"],i["chemistry"],i["physics"],i["biology"],i["history"],i["geography"]]
                    if (sum(marks) / len(marks)) > 3.5:
                        passed=passed+1
                    else:
                        fail=fail+1
                data={"pass":passed,"fail":fail}
                return Response(data, status=status.HTTP_200_OK)
            except:
                query1="select * from student_details"
                data=databaseConnector(query1)
                fail=0
                passed=0
                for i in data:
                    marks=[i["english"],i["maths"],i["chemistry"],i["physics"],i["biology"],i["history"],i["geography"]]
                    if (sum(marks) / len(marks)) > 3.5:
                        passed=passed+1
                    else:
                        fail=fail+1
                data={"pass":passed,"fail":fail}
                return Response(data, status=status.HTTP_200_OK)
        except:
            return Response({"message":"Something went Wrong"}, status=status.HTTP_400_BAD_REQUEST)
    else:
         return Response({"message": "User is not authenticated"}, status=status.HTTP_403_FORBIDDEN)

@api_view(['GET'])
def Results(request):
    if request.user.is_authenticated:
        try:
            data=databaseConnector("select distinct(location) from student_details")
            location=[]
            for i in data:
                location.append(i["location"])
            data=databaseConnector("select * from student_details")
            locationDict={}
            for i,loc in enumerate(location):
                locationDict[loc]=i
            passed=[0]*len(location)
            failed=[0]*len(location)
            for i in data:
                marks=[i["english"],i["maths"],i["chemistry"],i["physics"],i["biology"],i["history"],i["geography"]]
                if (sum(marks) / len(marks)) > 3.5:
                    passed[locationDict[i["location"]]]=passed[locationDict[i["location"]]]+1
                else:
                    failed[locationDict[i["location"]]]=failed[locationDict[i["location"]]]+1
            return Response({"lables":location,"passed":passed,"failed":failed}, status=status.HTTP_200_OK)
        except:
            return Response({"message":"Something went Wrong"}, status=status.HTTP_400_BAD_REQUEST)
    else:
         return Response({"message": "User is not authenticated"}, status=status.HTTP_403_FORBIDDEN)

@api_view(['GET'])
def Locations(request):
    if request.user.is_authenticated:
        try:
            data=databaseConnector("select distinct(location) from student_details")
            location=[]
            for i in data:
                location.append(i["location"])
            return Response({"location":location}, status=status.HTTP_200_OK)
        except:
            return Response({"message":"Something went Wrong"}, status=status.HTTP_400_BAD_REQUEST)
    else:
         return Response({"message": "User is not authenticated"}, status=status.HTTP_403_FORBIDDEN)