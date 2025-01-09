All Deliveribles We are Planning for First Iteration
* backend development with scratch with spec related to frontend
* roles [ super_admin, admin ( organization ), teacher, student )
* super_admin develop later , 
* admin => features we had in first iteration
* create account for student and teacher
* manage student and teacher and classes
* teacher => features we had in first iteration
* create account for student
* create assigment for class with co-teacher
* upload sheets and making marking with co-teacher and evaluate on digievaluator
* marking status for  test 
* download mark sheets
* student => features we had in first iteration
* check assigment and download self grade sheet 
Every thing has Dashboard which are created based on suggestion and data we can use for it , from the board.

this are deliverible we are giving upon delivery date [ 7th jan ]

every thing are adoptable for future changes

# color 
bg-color = #F5F5F5,
brand color = #0C9A78

add
338585,


<!--  pending to tommorow -->
1 . create function to create class ,subject ,section ,student ,teacher ,assignment  ( first backend , second frontent)
----------------------
section => name,description;
subject => name,description;
class => name,subject(fk) multiple,section(fk) multiple;
....
student => name,email,password,organizationid;
student_class(stuid,class_id);
....
teacher => name,email,password,organizationid;
teacher_class(tid,class,subject,section);
....
assignment(name,description,questionpaper,answersheet,totalmarks,struture,clasid);
answer_sheets(assignmentid(fk),studentid,answersheet_file,scoredmarks,comments);
----------------------
2 . create layout for use them in individual page
3 . make role management
4 . create evaluation model 
5 . check up and submit
